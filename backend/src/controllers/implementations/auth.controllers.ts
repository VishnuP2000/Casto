import { Request, Response } from "express";
import { IAuthController } from "../interface/auth.Icontrollers";
import { Container, Inject, Service } from "typedi";
import { AuthService } from "../../services/implementations/auth/auth.service";
import { IAuthService } from "../../services/interface/auth/auth.Iservice";
import { HttpStatus } from "../../enum/httpStatus";
import { setCookies } from "../../utils/cookies.utils";

@Service()
export class AuthController implements IAuthController {
  constructor(
    @Inject(() => AuthService)
    private readonly authService: AuthService,
  ) {}

  async signin(req: Request, res: Response): Promise<Response> {
    try {
      console.log("signin Controller", req.body);
      console.log("=== DEBUG ===");
      console.log("authService value:", this.authService);
      console.log("authService typeof:", typeof this.authService);
      console.log(
        "authService constructor name:",
        this.authService?.constructor?.name,
      );
      console.log(
        "authService own keys:",
        this.authService ? Object.keys(this.authService) : "N/A",
      );
      console.log(
        "authService prototype methods:",
        this.authService
          ? Object.getOwnPropertyNames(Object.getPrototypeOf(this.authService))
          : "N/A",
      );
      console.log("=============");

      const user = await this.authService.signin(req.body);
      console.log("user", user);

      setCookies(res, user.refreshToken);

      return res.status(HttpStatus.OK).json({
        success: true,
        message: "Signed in successfully",
        accessToken: user.accessToken,
      });
    } catch (error) {
      console.log("signin backend error", error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Failed to sign in",
      });
    }
  }
  async signup(req: Request, res: Response): Promise<Response> {
    try {
      console.log("signup", req.body);
      const datas = await this.authService.signup(req.body);
      console.log('datas',datas)
      return res.status(HttpStatus.OK).json({
        datas: datas,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        meassage: "Failed to signup",
      });
    }
  }
}
export const authController = Container.get(AuthController);
