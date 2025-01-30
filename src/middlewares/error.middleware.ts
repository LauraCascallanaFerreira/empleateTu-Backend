import {HttpException} from "../exceptions/httpExceptions";
import { Request, Response, NextFunction } from "express";

export const ErrorMiddleware = (error: HttpException, req:Request, res:Response, next: NextFunction) => {
    try{
        const status = error.status || 500
        const message = error.message || 'Something went wrong'
        res.status(status).json({message})
    } catch(error){
        next(error)
    }
}