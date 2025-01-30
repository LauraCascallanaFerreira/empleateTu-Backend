import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import {isAuthenticated} from "../middlewares/auth.middleware"
import { isAdmin } from "../middlewares/isAdmin.middleware";

const router = Router()

router.get('/profile', isAuthenticated ,UserController.profile)
//router.get('/', isAuthenticate , UserController.profile)
//GET localhot:3000/api/users/
router.get('/', isAuthenticated, isAdmin, UserController.getAll)

export default router