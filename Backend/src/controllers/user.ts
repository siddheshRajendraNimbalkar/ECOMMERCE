import ErrorHandler from "../utils/errorhandeler";
import asyncHandler from "../middleware/asyncError";
import { Request,Response } from "express";
import User from "../module/user";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'; 

export const registerUser = asyncHandler(async(req: Request,res: Response) =>{
    const { username,email,password} = req.body;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    const user = await User.create({
        username,
        password:hash,
        email,
        avatar:{
            public_id:"123123"
        }
    })

    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ success: false, message: 'JWT secret is not defined' });
    }
    
    const tocken = jwt.sign({userId:user._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES
    })
    return res.status(201).json({
        success:true,
        token:tocken
    })
  })

  export const loginUser = asyncHandler(async(req: Request,res: Response)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({
            message:"Please Enter Email and Password"
        })
    }
    

    const user = await User.findOne({ email });

    if(!user){
        return res.status(400).json({
            success:false,
            message:"Invalid Email"
        })
    };

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(isPasswordValid){
    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ success: false, message: 'JWT secret is not defined' });
    }
    
    const tocken = jwt.sign({userId:user._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES
    })

        return res.json({
            success:true,
            token:tocken
        })
    }
    return  res.json({
        success:false,
        message:"Invalid Password"
    })
  })