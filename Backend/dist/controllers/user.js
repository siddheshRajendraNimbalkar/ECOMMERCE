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
exports.loginUser = exports.registerUser = void 0;
const asyncError_1 = __importDefault(require("../middleware/asyncError"));
const user_1 = __importDefault(require("../module/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.registerUser = (0, asyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    var salt = bcryptjs_1.default.genSaltSync(10);
    var hash = bcryptjs_1.default.hashSync(password, salt);
    const user = yield user_1.default.create({
        username,
        password: hash,
        email,
        avatar: {
            public_id: "123123"
        }
    });
    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ success: false, message: 'JWT secret is not defined' });
    }
    const tocken = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES
    });
    return res.status(201).json({
        success: true,
        token: tocken
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
            message: "Invalid Email"
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
        return res.json({
            success: true,
            token: tocken
        });
    }
    return res.json({
        success: false,
        message: "Invalid Password"
    });
}));
