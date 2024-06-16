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
exports.logoutRoute = exports.loginUser = exports.registerUser = void 0;
const asyncError_1 = __importDefault(require("../middleware/asyncError"));
const user_1 = __importDefault(require("../module/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.registerUser = (0, asyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, isAdmin } = req.body;
    var salt = bcryptjs_1.default.genSaltSync(10);
    var hash = bcryptjs_1.default.hashSync(password, salt);
    if (!username || !email || !password) {
        res.json({
            success: "false",
            message: "enter username email password"
        });
    }
    const Email = yield user_1.default.findOne({ email });
    if (Email) {
        return res.json({
            success: false,
            message: "user exist"
        });
    }
    ;
    const user = yield user_1.default.create({
        username,
        password: hash,
        email,
        avatar: {
            public_id: "123123"
        },
        isAdmin
    });
    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ success: false, message: 'JWT secret is not defined' });
    }
    const tocken = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES
    });
    res.cookie("token", tocken, {
        expires: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
        httpOnly: true
    });
    return res.status(201).json({
        success: true,
    });
}));
exports.loginUser = (0, asyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: "Please Enter Email and Password"
        });
    }
    const user = yield user_1.default.findOne({ email });
    if (!user) {
        return res.status(400).json({
            success: false,
            message: "Invalid Email or Password",
        });
    }
    ;
    const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
    if (isPasswordValid) {
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ success: false, message: 'JWT secret is not defined' });
        }
        const tocken = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES
        });
        res.cookie("token", tocken, {
            expires: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
            httpOnly: true
        });
        return res.json({
            success: true,
        });
    }
    return res.json({
        success: false,
        message: "Invalid Password"
    });
}));
const logoutRoute = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.json({
        success: true,
        message: "Logged out"
    });
});
exports.logoutRoute = logoutRoute;
