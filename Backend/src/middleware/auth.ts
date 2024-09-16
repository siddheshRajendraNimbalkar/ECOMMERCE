import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import User from "../module/user";

interface DecodedJWT {
    userId: string;
}

export const isAuthUser = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access denied. No token provided."
        });
    }

    const jwtSecret: Secret = process.env.JWT_SECRET as Secret;
    if (!jwtSecret) {
        return res.status(500).json({ 
            success: false, 
            message: 'JWT secret is not defined' 
        });
    }

    try {
        const verifyJWT = jwt.verify(token, jwtSecret) as DecodedJWT;

        const user = await User.findById(verifyJWT.userId);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Access denied. User not found."
            });
        }

        (req as any).user = user;
        next();
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success: false,
            message: "Invalid token."
        });
    }
};
