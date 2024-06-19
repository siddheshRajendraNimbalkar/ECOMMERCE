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
exports.getAllOrderProduct = exports.findOrder = exports.createOrder = void 0;
const orderModel_1 = __importDefault(require("../module/orderModel"));
const productModule_1 = __importDefault(require("../module/productModule"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const productId = req.params.id;
        const { shippingAddress, qty, paymentMethod, paymentResult, taxPrice, shippingPrice, Status, totalPrice, isPaid, paidAt, } = req.body;
        if (!shippingAddress &&
            !qty &&
            !paymentMethod &&
            !paymentResult &&
            !taxPrice &&
            !shippingPrice &&
            !Status &&
            !totalPrice &&
            !isPaid &&
            !paidAt) {
            return res.json({
                success: false,
                message: "please enter shippingAddress qty paymentMethod paymentResult taxPrice shippingPrice Status totalPrice isPaid paidAt",
            });
        }
        const product = yield productModule_1.default.findById(productId);
        if (!product || product.stock == null) {
            return res.status(400).json({
                success: false,
                message: "Product not found or out of stock",
            });
        }
        if (product.stock < qty) {
            return res.status(400).json({
                success: false,
                message: `Available quantity: ${product.stock}`,
            });
        }
        const newOrder = yield orderModel_1.default.create({
            user: user._id.toString(),
            orderItems: {
                name: product.name,
                qty: qty,
                image: product.images[0],
                price: product.price,
                product: productId,
            },
            shippingAddress,
            paymentMethod,
            paymentResult,
            taxPrice,
            shippingPrice,
            Status,
            totalPrice,
            isPaid,
            paidAt,
        });
        product.stock -= qty;
        yield product.save();
        return res.status(201).json({
            success: true,
            message: "Order created successfully",
            order: newOrder,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});
exports.createOrder = createOrder;
const findOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderid } = req.params;
    orderModel_1.default.findById(orderid)
        .then((order) => {
        if (!order) {
            return res.json({
                success: false,
                message: "Order not found",
            });
        }
        return res.json({
            success: true,
            order,
        });
    })
        .catch((error) => {
        console.log(error);
        return res.json({
            success: false,
            message: "Internal Server Error",
        });
    });
});
exports.findOrder = findOrder;
const getAllOrderProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    orderModel_1.default.find({ user: user._id.toString() }).then((order) => {
        if (!order) {
            res.json({
                success: false,
                message: "order not found"
            });
        }
        res.json({
            success: true,
            order: order
        });
    }).catch((error) => {
        console.log(error);
        return res.json({
            success: false,
            message: "Internal Server Error",
        });
    });
});
exports.getAllOrderProduct = getAllOrderProduct;
