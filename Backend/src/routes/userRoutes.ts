import express from "express";
import { loginUser, logoutRoute, registerUser } from "../controllers/user";
const userRoutes = express.Router()

// http://localhost:4000/api/v1/User/register

userRoutes.post('/register', registerUser);
userRoutes.post('/login',loginUser)
userRoutes.post('/logout',logoutRoute)

export default userRoutes;