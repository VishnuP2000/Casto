import { signinDto } from "../../../dto/user/auth.dtos"
import { HttpStatus } from "../../../enum/httpStatus";
import { signinResult } from "../../../interfaces/interfaces"
import { UserRepository } from "../../../repositories/implementations/user.repository";
import { IUserRepository } from "../../../repositories/interface/user/user.Irepository";
import { AppError } from "../../../validations/customError";
import { IAuthService } from "../../interface/auth/auth.Iservice"
import Container, {Inject,Service} from 'typedi'
import bcrypt from 'bcrypt'
import { IBaseRepository } from "../../../repositories/interface/base.IRepository";
import { IUser } from "../../../models/userModel";
@Service()
export class AuthService implements IAuthService{
    constructor(
        @Inject(()=>UserRepository)
    private readonly userRepository:IUserRepository
    // private readonly baseRepository:IBaseRepository<IUser>
    ){}

    async signin(data: signinDto): Promise<signinResult> {
        try {
            console.log('AuthService',data)
            const exist = await this.userRepository.findUserByEmail(data.email)
            console.log('exist',exist)
            if(!exist){
                throw new Error('Invalid username ')
            }
            
            // const isMatch = await 

            return {
                success:true,
                message:'succefull login',
                user:exist
            }

        } catch (error) {
            console.log('error',error)
            // return{
            //     success:false,
            //     message:'login fail',
            // }
            throw new AppError("An error occurred while signing in. Please try again later.",
                HttpStatus.INTERNAL_SERVER_ERROR)
            
        }
    }
    async signup(userData:signinDto):Promise<signinResult>{
        try {
            console.log('userData',userData)
            const {name,email,password}=userData
             const pass=password

             

             const isExist= await this.userRepository.findUserByEmail(email)
             if (isExist) {
            throw new AppError(
                "User already exists",
                HttpStatus.BAD_REQUEST
            );
        }
        const hashedPassword = await bcrypt.hash(pass, 10);
             console.log(hashedPassword)

             const user=await this.userRepository.create({
                name:name,
                email:email,
                password:hashedPassword
             })

             return {
                success:true,
                // accessToken
                // refreshToken
                user:{
                    name:user.name,
                    email:user.email
                },
                message:'successfull register'
             }

             
        } catch (error) {
             if (error instanceof AppError) {
            throw error;
        }
            throw new AppError('Signup failed',HttpStatus.INTERNAL_SERVER_ERROR)
                
        }
    }
}
export const authService = Container.get(AuthService) 
