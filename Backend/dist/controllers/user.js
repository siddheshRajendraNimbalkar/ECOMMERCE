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
exports.updateRole = exports.getProductCreatedByUser = exports.deleteUser = exports.updateUser = exports.changepassword = exports.userDetails = exports.logoutRoute = exports.loginUser = exports.registerUser = void 0;
const user_1 = __importDefault(require("../module/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const productModule_1 = __importDefault(require("../module/productModule"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, isAdmin } = req.body;
    var salt = bcryptjs_1.default.genSaltSync(10);
    var hash = bcryptjs_1.default.hashSync(password, salt);
    if (!username || !email || !password) {
        res.json({
            success: "false",
            message: "enter username email password",
        });
    }
    try {
        const Email = yield user_1.default.findOne({ email });
        if (Email) {
            return res.json({
                success: false,
                message: "user exist",
            });
        }
        const user = yield user_1.default.create({
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
        const tocken = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES,
        });
        res.cookie("token", tocken, {
            expires: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        });
        return res.status(201).json({
            success: true,
        });
    }
    catch (error) {
        console.log("Error" + error.message);
        res.json({
            success: false,
            message: "Internal server error",
            errorm: error,
            error: error.message
        });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Please Enter Email and Password",
            });
        }
        const user = yield user_1.default.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email or Password",
            });
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (isPasswordValid) {
            if (!process.env.JWT_SECRET) {
                return res
                    .status(500)
                    .json({ success: false, message: "JWT secret is not defined" });
            }
            const tocken = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, {
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
    }
    catch (error) {
        console.log("error:", error);
        res.json({
            success: true,
            message: "server error",
        });
    }
});
exports.loginUser = loginUser;
const logoutRoute = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.json({
        success: true,
        message: "Logged out",
    });
});
exports.logoutRoute = logoutRoute;
const userDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        res.status(200).json({
            success: true,
            user: user,
        });
    }
});
exports.userDetails = userDetails;
const changepassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const findUser = yield user_1.default.findOne({
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
        const correctPassword = yield bcryptjs_1.default.compare(current, findUser.password);
        if (!correctPassword) {
            return res.json({
                success: false,
                message: "Invalid password",
            });
        }
        const hashpassword = yield bcryptjs_1.default.hash(newpass, 10);
        findUser.password = hashpassword;
        const done = yield findUser.save();
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
    }
    catch (error) {
        console.log(`error:${error}`);
        res.json({
            success: false,
            message: "server error",
        });
    }
});
exports.changepassword = changepassword;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email } = req.body;
        if (!username && !email) {
            return res.json({
                success: false,
                message: "Please provide a username or email",
            });
        }
        const user = req.user;
        const emailError = yield user_1.default.findOne({ email });
        if (emailError && emailError._id.toString() != user._id.toString()) {
            return res.json({
                success: false,
                message: "Email already exists",
            });
        }
        const nowUser = yield user_1.default.findOne({ email: user.email });
        if (!nowUser) {
            return res.json({
                success: false,
                message: "user not found",
            });
        }
        nowUser.username = username;
        nowUser.email = email;
        const done = yield nowUser.save();
        return res.json({
            success: true,
            message: "User updated successfully",
            user: done,
        });
    }
    catch (error) {
        console.log(`Error:${error}`);
        res.json({
            success: false,
            message: "server error",
        });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const deleteProduct = yield productModule_1.default.deleteMany({ author: user._id.toString() });
        if (deleteProduct) {
            const userDelete = yield user_1.default.findByIdAndDelete(user._id);
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
    }
    catch (error) {
        console.log(`Error:${error}`);
        res.json({
            success: false,
            message: "server error",
        });
    }
});
exports.deleteUser = deleteUser;
const getProductCreatedByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const allProduct = yield productModule_1.default.find({ author: user._id.toString() });
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
    }
    catch (error) {
        console.log(`Error:${error}`);
        res.json({
            success: false,
            message: "server error",
        });
    }
});
exports.getProductCreatedByUser = getProductCreatedByUser;
const updateRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (user.isAdmin) {
            const id = req.params.id;
            const { isAdmin } = req.body;
            if (!isAdmin) {
                return res.json({
                    success: false,
                    message: "please enter the isAdmin"
                });
            }
            ;
            const changeRole = yield user_1.default.findByIdAndUpdate(id, { isAdmin: isAdmin }, {
                new: true,
                runValidators: true
            });
            if (!changeRole) {
                return res.json({
                    success: false,
                    message: "role is not updated"
                });
            }
            return res.json({
                success: true,
                message: "role updated success fully",
                changeRole
            });
        }
        return res.json({
            success: false,
            message: "you are not admin"
        });
    }
    catch (error) {
        console.log(`Error:${error}`);
        res.json({
            success: false,
            message: "server error",
        });
    }
});
exports.updateRole = updateRole;
