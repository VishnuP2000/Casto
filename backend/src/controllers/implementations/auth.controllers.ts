import { Request, Response } from "express";
import { IAuthController } from "../interface/auth.Icontrollers";
import Container, {Inject,Service} from 'typedi'
import { AuthService } from "../../services/implementations/auth/auth.service";
import { IAuthService } from "../../services/interface/auth/auth.Iservice";
import { HttpStatus } from "../../enum/httpStatus";

@Service()
export class AuthController implements IAuthController{
    constructor(
        @Inject(()=>AuthService)
        private  authService :IAuthService
    ){}
    async signin(req:Request,res:Response):Promise<Response>{
        try {
            console.log('signin Controller',req.body)
        const user = await this.authService.signin(req.body)
        console.log('user',user)
        return res.status(HttpStatus.OK).json({
            success:true,
            message: "successs to fetch chats",
            user
        })

        } catch (error) {
            console.log('error',error)
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success:false,
                message: "Failed to fetch chats",
            })
        }
    }
    async signup(req:Request,res:Response):Promise<Response>{
        try {
            console.log('signup',req.body)
            const datas=await this.authService.signup(req.body)
            
            return res.status(HttpStatus.OK).json({
                datas:datas
            })
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success:false,
                meassage:"Failed to signup"
            })
        }
    }
}
export const authController = Container.get(AuthController)