"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../module/user"));
const isAuthUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access denied. No token provided."
        });
    }
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        return res.status(500).json({
            success: false,
            message: 'JWT secret is not defined'
        });
    }
    try {
        const verifyJWT = jsonwebtoken_1.default.verify(token, jwtSecret);
        const user = yield user_1.default.findById(verifyJWT.userId);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Access denied. User not found."
            });
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Invalid token."
        });
    }
});
exports.isAuthUser = isAuthUser;
