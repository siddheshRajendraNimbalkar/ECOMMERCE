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
exports.isUserAdmin = void 0;
const user_1 = __importDefault(require("../module/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isUserAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.token;
    if (!token) {
        res.json({
            success: false,
            message: "login first"
        });
    }
    const id = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    const user = yield user_1.default.findById(id.userId);
    if (user && !user.isAdmin) {
        res.json({
            success: false,
            message: "you are not admin"
        });
    }
    next();
});
exports.isUserAdmin = isUserAdmin;
