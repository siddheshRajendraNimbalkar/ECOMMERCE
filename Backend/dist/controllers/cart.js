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
exports.deleteCartItem = exports.getCartItemByUserId = exports.addToCart = void 0;
const cart_1 = __importDefault(require("../module/cart"));
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    const user = req.user;
    try {
        let cart = yield cart_1.default.findOne({ userId: user._id.toString() });
        if (!cart) {
            cart = new cart_1.default({
                userId: user._id.toString(),
                items: [{ productId }]
            });
        }
        else {
            cart.items.push({ productId });
        }
        yield cart.save();
        res.status(200).json({
            success: true,
            cart
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
});
exports.addToCart = addToCart;
const getCartItemByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    try {
        const cartItems = yield cart_1.default.find({ userId: user._id.toString() });
        if (!cartItems) {
            res.json({
                success: false,
                message: "items not found",
            });
        }
        res.json({
            success: true,
            items: cartItems,
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Internal server error",
        });
    }
});
exports.getCartItemByUserId = getCartItemByUserId;
const deleteCartItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const productId = req.params.id;
    try {
        const cart = yield cart_1.default.findOne({ userId: user._id.toString() });
        if (!cart) {
            res.json({
                success: false,
                message: "items not found",
            });
        }
        const itemIndex = cart === null || cart === void 0 ? void 0 : cart.items.findIndex((item) => item.productId.toString() === productId);
        if (itemIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Item not found in cart",
            });
        }
        cart === null || cart === void 0 ? void 0 : cart.items.splice(itemIndex, 1);
        yield (cart === null || cart === void 0 ? void 0 : cart.save());
        return res.status(200).json({
            success: true,
            message: "Item removed from cart",
            cart,
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Internal server error",
        });
    }
});
exports.deleteCartItem = deleteCartItem;
