import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient()

export class UserService{
    static async getUserByEmail(email:string){
        const findUser = await prisma.user.findUnique({where: {email}, omit:{password:true}})
        if(!findUser) throw new Error('User not found')
            return findUser
    }

    static async getUserById(id:number){
        const findUser = await prisma.user.findUnique({where: {id}, omit:{password:true}})
        if(!findUser) throw new Error('User not found')
            return findUser
    }

    static async getAll(){
        const users = await prisma.user.findMany({
            omit:{password:true}
        })
        return users
    }
}