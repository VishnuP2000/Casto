
import { Router } from "express";
import { authController } from "../controllers/implementations/auth.controllers";

const router = Router()

router.post("/signIn",authController.signin.bind(authController))   
router.post("/signUp",authController.signup.bind(authController))   

export default router;