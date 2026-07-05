import { Request, Response } from "express";


export interface IAuthController{
    signin(req:Request,res:Response):Promise<Response>
    signup(req:Request,res:Response):Promise<Response>
    
}