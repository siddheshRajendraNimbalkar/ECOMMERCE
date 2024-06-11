"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        require: [true, "please enter product name"]
    },
    description: {
        type: String,
        require: [true, "please enter product description"]
    },
    price: {
        type: Number,
        require: [true, "please enter the price"]
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [
        { public_id: {
                type: String,
                require: true
            },
            product_URL: {
                type: String,
                require: true
            } }
    ],
    category: {
        type: String,
        require: [true, "please enter product category"]
    },
    stock: {
        type: Number,
        require: [true, "please enter product stock"],
        maxLength: [4, "stock cannot be greater then 9999"]
    },
    numOfReview: {
        type: Number,
        default: 0
    },
    review: [
        {
            name: {
                type: String,
                require: true,
            },
            rating: {
                type: Number,
                require: true
            },
            Comment: {
                type: String,
                require: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const Product = mongoose_1.default.model("Product", productSchema);
exports.default = Product;
