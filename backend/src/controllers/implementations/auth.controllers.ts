import { Request, response, Response } from "express";
import { IAuthController } from "../interface/auth.Icontrollers";
import Container, {Inject,Service} from 'typedi'
import { AuthService } from "../../services/implementations/auth/auth.service";
import { IAuthService } from "../../services/interface/auth/auth.Iservice";
import { HttpStatus } from "../../enum/httpStatus";
import { setCookies } from "../../utils/cookies.utils";

@Service()
export class AuthController implements IAuthController{
    constructor(
        @Inject(()=>AuthService)
        private readonly authService :AuthService
    ){}
    async signin(req:Request,res:Response):Promise<Response>{
        try {
            console.log('signin Controller',req.body)
            console.log("authService:", this.authService);
console.log("signin:", this.authService?.signin);
console.log("typeof signin:", typeof this.authService?.signin);
            
        const user = await this.authService.signin(req.body)
        console.log('user',user)
        setCookies(res, user.refreshToken);
        return res.status(HttpStatus.OK).json({
            success:true,
            message: "successs to fetch chats",
            user:user,
            accessToken:user.accessToken,
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