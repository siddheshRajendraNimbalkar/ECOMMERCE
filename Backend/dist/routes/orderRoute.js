"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_1 = require("../controllers/order");
const auth_1 = require("../middleware/auth");
const orderRoute = express_1.default.Router();
orderRoute.put('/:orderid', order_1.findOrder);
orderRoute.use(auth_1.isAuthUser);
orderRoute.get('/orders', order_1.getAllOrderProduct);
exports.default = orderRoute;
