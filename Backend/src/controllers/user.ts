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

    if(!username || !email || !password){
        res.json({
            success:"false",
            message:"enter username email password"
        })
    }

    const Email = await User.find({email:email})

    if(Email){
        return res.json({
            success:false,
            message:"user exist"
        })
    };

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

    res.cookie("token",tocken,{
        expires:new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
        httpOnly:true   
    })

    return res.status(201).json({
        success:true,
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
            message:"Invalid Email or Password",

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

    res.cookie("token",tocken,{
        expires:new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
        httpOnly:true   
    })
        return res.json({
            success:true,
        })
    }
    return  res.json({
        success:false,
        message:"Invalid Password"
    })
  })


 export const logoutRoute = async(req:Request,res:Response)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true   
    })

    res.json({
        success:true,
        message:"Logged out"
    })
  }