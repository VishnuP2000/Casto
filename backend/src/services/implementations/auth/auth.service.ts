import { signinDto } from "../../../dto/user/auth.dtos";
import { HttpStatus } from "../../../enum/httpStatus";
import { AuthResponse, signinResult } from "../../../interfaces/interfaces";
import { UserRepository } from "../../../repositories/implementations/user.repository";
import { IUserRepository } from "../../../repositories/interface/user/user.Irepository";
import { AppError } from "../../../validations/customError";
import { IAuthService } from "../../interface/auth/auth.Iservice";
import Container, { Inject, Service } from "typedi";
import bcrypt from "bcrypt";
import { IBaseRepository } from "../../../repositories/interface/base.IRepository";
import { IUser } from "../../../models/userModel";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../utils/jwt";
import { hashedPassword } from "../../../utils/password.hash";
@Service()
export class AuthService implements IAuthService {
  constructor(
    @Inject(() => UserRepository)
    private readonly userRepository: IUserRepository,
    // private readonly baseRepository:IBaseRepository<IUser>
  ) {}

  async signin(data: signinDto): Promise<signinResult> {
    try {
      console.log("AuthService", data);
      const exist = await this.userRepository.findUserByEmail(data.email);
      console.log("exist", exist);
      if (!exist) {
        throw new AppError("Invalid userName", HttpStatus.UNAUTHORIZED);
      }

      const isMatch = await bcrypt.compare(data.password, exist.password);
      if (!isMatch) {
        throw new AppError("Invalid password", HttpStatus.UNAUTHORIZED);
      }

      const accessToken = generateAccessToken(exist._id.toString());

      const refreshToken = generateRefreshToken(exist._id.toString());
      return {
        success: true,
        message: "Login successful",
        user: exist,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      console.log("error", error);

      throw new AppError(
        "An error occurred while signing in. Please try again later.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async signup(userData: signinDto): Promise<AuthResponse> {
    try {
      console.log("userData", userData);
      const { name, email, password } = userData;
      const pass = password;

      const isExist = await this.userRepository.findUserByEmail(email);
      if (isExist) {
        throw new AppError("User already exists", HttpStatus.BAD_REQUEST);
      }
      const hashedPasswordResult = await hashedPassword(password)
      console.log(hashedPasswordResult);

      const user = await this.userRepository.create({
        name: name,
        email: email,
        password: hashedPasswordResult,
      });

      return {
        success: true,
        message: "successfull register",
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError("Signup failed", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
export const authService = Container.get(AuthService);
console.log(authService);
console.log(typeof authService.signin);
