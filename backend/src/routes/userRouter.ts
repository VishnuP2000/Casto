
import { Router } from "express";
import { authController } from "../controllers/implementations/auth.controllers";
import { upload } from "../middleware/multer";
import { verifyToken } from "../middleware/auth.middleware";

const router = Router()

router.post("/signIn",authController.signin.bind(authController))   
router.post("/signUp",upload.single("image"),authController.signup.bind(authController)) 
router.get("/profile", verifyToken, authController.getProfile.bind(authController));  

export default router;