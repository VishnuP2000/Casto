import bcrypt from "bcrypt";
import { HttpStatus } from "../enum/httpStatus";
import { AppError } from "../validations/customError";

export const hashedPassword = async (password: string): Promise<string> => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    throw new AppError(
      "Password hashing failed",
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
};