import { Request, Response } from "express";
import User from "../module/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Product from "../module/productModule";

export const registerUser = async (req: Request, res: Response) => {
    const { username, email, password, isAdmin } = req.body;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    if (!username || !email || !password) {
      res.json({
        success: "false",
        message: "enter username email password",
      });
    }

    try {
      const Email = await User.findOne({ email });

    if (Email) {
      return res.json({
        success: false,
        message: "user exist",
      });
    }

    const user = await User.create({
      username,
      password: hash,
      email,
      avatar: {
        public_id: "123123",
      },
      isAdmin,
    });

    if (!process.env.JWT_SECRET) {
      return res
        .status(500)
        .json({ success: false, message: "JWT secret is not defined" });
    }

    const tocken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    res.cookie("token", tocken, {
      expires: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });

    return res.status(201).json({
      success: true,
    });
    } catch (error: any) {
      console.log("Error"+error.message)
      res.json({
        success:false,
        message:"Internal server error",
        errorm:error,
        error:error.message
      })
    }
  };

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Please Enter Email and Password",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      if (!process.env.JWT_SECRET) {
        return res
          .status(500)
          .json({ success: false, message: "JWT secret is not defined" });
      }

      const tocken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES,
      });

      res.cookie("token", tocken, {
        expires: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      });
      return res.json({
        success: true,
      });
    }
    return res.json({
      success: false,
      message: "Invalid Password",
    });
  } catch (error) {
    console.log("error:", error);
    res.json({
      success: true,
      message: "server error",
    });
  }
};

export const logoutRoute = async (req: Request, res: Response) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.json({
    success: true,
    message: "Logged out",
  });
};

export const userDetails = async (req: Request, res: Response) => {
  const user = (req as any).user;
  if (user) {
    res.status(200).json({
      success: true,
      user: user,
    });
  }
};

export const changepassword = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const findUser: any | null = await User.findOne({
      email: user.email,
    }).select("+password");
    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const { current, newpass } = req.body;
    if (!current || !newpass) {
      return res.status(400).json({
        success: false,
        message: "Current password and new password are required",
      });
    }
    const correctPassword = await bcrypt.compare(current, findUser.password);
    if (!correctPassword) {
      return res.json({
        success: false,
        message: "Invalid password",
      });
    }
    const hashpassword = await bcrypt.hash(newpass, 10);
    findUser.password = hashpassword;
    const done = await findUser.save();
    if (!done) {
      return res.status(200).json({
        success: false,
        message: "fail to change password",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log(`error:${error}`);
    res.json({
      success: false,
      message: "server error",
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { username, email } = req.body;
    if (!username && !email) {
      return res.json({
        success: false,
        message: "Please provide a username or email",
      });
    }
    const user = (req as any).user;
    const emailError = await User.findOne({ email });
    if (emailError && emailError._id.toString() != user._id.toString()) {
      return res.json({
        success: false,
        message: "Email already exists",
      });
    }
    const nowUser = await User.findOne({ email: user.email });
    if (!nowUser) {
      return res.json({
        success: false,
        message: "user not found",
      });
    }

    nowUser.username = username;
    nowUser.email = email;

    const done = await nowUser.save();

    return res.json({
      success: true,
      message: "User updated successfully",
      user: done,
    });
  } catch (error) {
    console.log(`Error:${error}`);
    res.json({
      success: false,
      message: "server error",
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
  const deleteProduct = await Product.deleteMany({ author: user._id.toString() });
  if(deleteProduct){
    const userDelete = await User.findByIdAndDelete(user._id);
    if (!userDelete) {
      return res.json({
        success: false,
        message: "Failed to delete user",
      });
    }

    return res.json({
      success: true,
      message: "User and associated products deleted successfully",
    });
  }
  if (!deleteProduct) {
    return res.json({
      success: false,
      message: "Failed to delete products",
    });
  }
  } catch (error) {
    console.log(`Error:${error}`);
    res.json({
      success: false,
      message: "server error",
    });
  }
};

export const getProductCreatedByUser = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const allProduct = await Product.find({ author: user._id.toString() });
    if (!allProduct) {
      return res.json({
        success: false,
        message: "error while faching product",
      });
    }
    return res.json({
      success: true,
      product: [allProduct],
    });
  } catch (error) {
    console.log(`Error:${error}`);
    res.json({
      success: false,
      message: "server error",
    });
  }
};


export const updateRole = async(req:Request,res:Response) => {
  try{
    const user = (req as any).user;
    if(user.isAdmin){
        const id = req.params.id;
        const { isAdmin }= req.body;
        if(!isAdmin){
          return res.json({
            success:false,
            message:"please enter the isAdmin"
          });
        };
        const changeRole = await User.findByIdAndUpdate(id,{isAdmin:isAdmin},{
          new:true,
          runValidators:true
        });
        if(!changeRole){
          return res.json({
            success:false,
            message:"role is not updated"
          })
        }
        return res.json({
          success:true,
          message:"role updated success fully",
          changeRole
        })
    }

    return res.json({
      success:false,
      message:"you are not admin"
    })
  }catch (error) {
    console.log(`Error:${error}`);
    res.json({
      success: false,
      message: "server error",
    });
  }
}