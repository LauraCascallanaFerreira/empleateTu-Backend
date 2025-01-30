import { AuthService } from "../services/auth.service";
import { Response, Request, NextFunction} from 'express'

export class AuthController {
    //el controlador nunca deberia acceder a la bd

    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const userData = req.body
            //TODO validar el body (opcional pero interesante)
            const newUser = await AuthService.register(userData)
            res.status(201).json({ message: 'User register successfuly ', newUser })
        } catch (error) {
            next(error)
        }

    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const userData = req.body
            //TODO validar el body (opcional pero interesante)
            const token = await AuthService.login(userData.email, userData.password)
            //TODO inyectar una cookie al cliente
            res.cookie('token', token, {
                maxAge: 60*60*100,
                httpOnly: true, //no se puede acceder mediante JS
                secure: false, //solo se envia si usas https
                sameSite: 'strict' //evita el ataque CSRF
            }) //informacion de la cookie donde vamos a guardar el token

            res.status(201).json({ message: 'User login successfuly ', token })
        } catch (error) {
            next(error)
        }
    }

}
