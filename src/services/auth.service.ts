import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { prisma } from "../database/database";

//AQUI ACCEDEMOS A LA BASE DE DATOS

//MAL usar un patron singleton

const TOKEN_PASSWORD = process.env.TOKEN_PASSWORD || 'pass'

//Insertamos la información en la base de datos
export class AuthService{
    //Ahora el servicio tiene que acceder a la bbdd de prisma para registras al usuario
    static async register(user:User){ 
    //Prisma genera una interfaz asique se puede usar User en vez de poner todos los 
    //atributos a mano como parametros

        //ver si el usuario no existe (email para la comprobación)
        //SELECT id, nombre FROM user WHERE email=user.email
        const findUser = await prisma.user.findUnique(
            {
                where: {
                    email:user.email
                }
            }
        )
        //Lanzamos un error si el email ya existe
        if (findUser) throw new Error(`User ${user.email} already exists`)

        //encriptar el password (libreria externa  bcrypt)
        const passwordEncrypted = await bcrypt.hash(user.password, 10) //numero de veces que se repite el algoritmo

        //guardar el usuario en la bd
        return await prisma.user.create({
            data:{
                ...user, //usamos destructuring para no tener que escribir todos los datos
                password:passwordEncrypted, //guardamos la contraseña ENCRIPTADA
                //LINEA MUY IMPORTANTE!!!!!
                role:null //es importante ponerlo como null para que nadie pueda cambiarlo
            },
            omit:{
                //omite la contraseña cuando se la devuelve al usuario
                password:true
            }
        })

    }

    static async login(email:string, password:string){

        // Comprobar si el usuario existe
        //const query=`SELECT id, email, role, password FROM user WHERE email='${email}' AND password='${password}'`
        //const findUsers = await prisma.$queryRawUnsafe(query) as User[]
        //const findUser = findUsers[0]

        const findUser = await prisma.user.findUnique({where: {email:email}})
        //Lanzamos un error si el email ya existe
        // IMPORTANTE QUE EL MENSAJE NO DE MUCHA INFORMACION
        if (!findUser) throw new Error('Invalid user or password')
            
        // Comprobar que coincida el password
        
        const isPasswordCorrect = await bcrypt.compare(password, findUser.password)
        if(!isPasswordCorrect) throw new Error('Invalid user or password')

        // Generar el token de autenticación
        const token = jwt.sign(
            {colorFavorito:'Azul', id:findUser.id, email:findUser.email, role:findUser.role}, 
            TOKEN_PASSWORD, 
            {expiresIn:"1h"}
        ) 
        // lo que se guarda dentro del token
        // clave privada con la que se va a firmar el token
        // parametros de configuracion para el token -> expiracion del token, refresh token 

        // Devolver el token de atenticación
        return token
    }
}