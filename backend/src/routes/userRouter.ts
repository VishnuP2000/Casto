
import { Router } from "express";
import { authController } from "../controllers/implementations/auth.controllers";

const router = Router()

router.post("/sinIn",authController.signin.bind(authController))   
router.post("/sinUp",authController.signup.bind(authController))   

export default router;