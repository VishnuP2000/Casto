import { signinDto } from "../../../dto/user/auth.dtos";
import { AuthResponse, signinResult } from "../../../interfaces/interfaces";


export interface IAuthService{
    signin(data:signinDto):Promise<signinResult>
    signup(data:signinDto):Promise<AuthResponse>
}