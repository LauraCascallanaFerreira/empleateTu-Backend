import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import {registerValidation, loginValidation} from "../middlewares/validators.middleware"
import {ValidationMiddleware} from "../middlewares/validation.middleware"

const router = Router()

//Listar todas las ofertas --> localhost:3000/api/offerts/?title=react&category=dam
//router.get('/', OffertController.getAll)
//Guardar ofertas localhost:3000/api/offerts/ {body}
//router.post('/', OffertController.save)
//Borrar una oferta localhost:3000/api/offerts/XXXX
//router.delete('/:id', OffertController.delete)
//Modificar una oferta localhost:3000/api/offerts/XXXX {body}
//router.put('/:id', OffertController.update)

//Calificamos una oferta x {body}
//router.post('/:id/rate', OffertController.rate)
//Vemos que calificacion (total) se le ha dado a una oferta
//router.get('/:id/rate/', OffertController.getRate)

export default router

