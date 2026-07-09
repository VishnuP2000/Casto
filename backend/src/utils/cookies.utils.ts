import { Request, Response } from "express";
import { HttpStatus } from "../enum/httpStatus";
import { AppError } from "../validations/customError";

export const setCookies = (res:Response,token:string) => {
  try {
    res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: true, 
    sameSite: 'none', 
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
});
  } catch (error) {
    throw new AppError(
          "setCookies failed",
          HttpStatus.INTERNAL_SERVER_ERROR
        );
  }
}
