import express from "express";
import { changepassword, deleteUser, getProductCreatedByUser, loginUser, logoutRoute, registerUser, updateRole, updateUser, userDetails } from "../controllers/user";
import { isAuthUser } from "../middleware/auth";
import { getAllReview } from "../controllers/product";

const userRoutes = express.Router()

// http://localhost:4000/api/v1/User/register

userRoutes.post('/register', registerUser);
userRoutes.post('/login',loginUser);
userRoutes.post('/logout',logoutRoute);


userRoutes.use(isAuthUser);
userRoutes.put('/me',userDetails);
userRoutes.post('/change/password',changepassword);
userRoutes.post('/update/user',updateUser);
userRoutes.delete('/delete/user',deleteUser);
userRoutes.put('/product',getProductCreatedByUser);
userRoutes.put('/role/update/:id',updateRole);
userRoutes.put('/review/:id',getAllReview);

export default userRoutes;