// utils/jwt.ts

import jwt, { Secret } from "jsonwebtoken";
import { StringValue } from "ms";
import dotenv from "dotenv";

dotenv.config();

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as Secret;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as Secret;

console.log("ACCESS_SECRET:", process.env.JWT_ACCESS_SECRET);
console.log("REFRESH_SECRET:", process.env.JWT_REFRESH_SECRET);

export const generateAccessToken = (userId: string) => {
    return jwt.sign(
        { id: userId },ACCESS_SECRET,
        {
           expiresIn: (process.env.ACCESS_TOKEN_EXPIRES ?? "15m") as StringValue,
        }
    );
};

export const generateRefreshToken = (userId: string) => {
    return jwt.sign(
        { id: userId },REFRESH_SECRET,
        {
            expiresIn: (process.env.REFRESH_TOKEN_EXPIRES ?? "7d") as StringValue,
        }
    );
};