import { NextFunction, Request, Response } from "express";

export const isAdmin = (req:Request,res:Response,next:NextFunction) => {
    const isAuth = (req as any).user;
    if(isAuth.isAdmin){
        return next();
    }
    return res.json({
        success:false,
        message:"you are not admin"
    })
}