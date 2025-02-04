import { Response, Request, NextFunction } from 'express'
import {UserService} from "../services/user.service"

export class UserController{
    static async profile(req:Request, res:Response, next: NextFunction){
        try {
            //Saber quien se ha logeado
            const {email} = req.body.user
            const user = await UserService.getUserByEmail(email)
            res.status(200).json(user)
        } catch (error) {
            next(error)
        }
        
    }

    static async getAll (req:Request, res:Response, next: NextFunction){
        try{
            const user = await UserService.getAll()
            res.status(200).json(user)
        } catch(error){
            next(error)
        }
    }
}