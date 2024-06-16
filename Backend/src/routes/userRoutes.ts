import express from "express";
import { changepassword, loginUser, logoutRoute, registerUser, userDetails } from "../controllers/user";
import { isAuthUser } from "../middleware/auth";
const userRoutes = express.Router()

// http://localhost:4000/api/v1/User/register

userRoutes.post('/register', registerUser);
userRoutes.post('/login',loginUser)
userRoutes.post('/logout',logoutRoute)

userRoutes.use(isAuthUser);
userRoutes.put('/me',userDetails);
userRoutes.post('/updatepassword',changepassword)

export default userRoutes;