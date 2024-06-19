"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
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
            id: {
                type: mongoose_1.Schema.Types.ObjectId,
                required: true
            },
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
