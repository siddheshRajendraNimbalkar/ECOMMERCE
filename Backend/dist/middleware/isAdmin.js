"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const isAdmin = (req, res, next) => {
    const isAuth = req.user;
    if (isAuth.isAdmin) {
        return next();
    }
    return res.json({
        success: false,
        message: "you are not admin"
    });
};
exports.isAdmin = isAdmin;
