"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const auth_1 = require("../middleware/auth");
const userRoutes = express_1.default.Router();
// http://localhost:4000/api/v1/User/register
userRoutes.post('/register', user_1.registerUser);
userRoutes.post('/login', user_1.loginUser);
userRoutes.post('/logout', user_1.logoutRoute);
userRoutes.use(auth_1.isAuthUser);
userRoutes.put('/me', user_1.userDetails);
userRoutes.post('/updatepassword', user_1.changepassword);
exports.default = userRoutes;
