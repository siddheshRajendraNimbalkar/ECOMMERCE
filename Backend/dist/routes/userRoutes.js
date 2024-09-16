"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const auth_1 = require("../middleware/auth");
const product_1 = require("../controllers/product");
const userRoutes = express_1.default.Router();
// http://localhost:4000/api/v1/User/register
userRoutes.post('/register', user_1.registerUser);
userRoutes.post('/login', user_1.loginUser);
userRoutes.post('/logout', user_1.logoutRoute);
userRoutes.use(auth_1.isAuthUser);
userRoutes.put('/me', user_1.userDetails);
userRoutes.post('/change/password', user_1.changepassword);
userRoutes.post('/update/user', user_1.updateUser);
userRoutes.delete('/delete/user', user_1.deleteUser);
userRoutes.put('/product', user_1.getProductCreatedByUser);
userRoutes.put('/role/update/:id', user_1.updateRole);
userRoutes.put('/review/:id', product_1.getAllReview);
exports.default = userRoutes;
