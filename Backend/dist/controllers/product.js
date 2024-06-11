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
exports.deleteProduct = exports.updateproduct = exports.getproduct = exports.getAllProduct = exports.createProduct = void 0;
const productModule_1 = __importDefault(require("../module/productModule"));
const asyncError_1 = __importDefault(require("../middleware/asyncError"));
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, price, rating, images, category, stock, numOfReview, review } = req.body;
        if (!name || !description || !price) {
            return res.status(400).json({ success: false, message: 'Name, description, and price are required' });
        }
        const product = yield productModule_1.default.create({
            name,
            description,
            price,
            rating,
            images,
            category,
            stock,
            numOfReview,
            review,
        });
        return res.status(201).json({
            success: true,
            product,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.createProduct = createProduct;
exports.getAllProduct = (0, asyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getallproduct = yield productModule_1.default.find();
    if (getallproduct) {
        return res.json({
            success: true,
            getallproduct
        });
    }
    return res.json({
        success: false
    });
}));
exports.getproduct = (0, asyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield productModule_1.default.findById(req.params.id);
    if (!product) {
        return res.json({
            message: "product not found"
        });
    }
    res.json({
        success: true,
        product: product
    });
}));
exports.updateproduct = (0, asyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let product = yield productModule_1.default.findById(req.params.id);
    if (!product) {
        return res.status(500).json({
            success: false,
            message: "something went wrong"
        });
    }
    product = yield productModule_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!product) {
        return res.json({
            message: "some thing went wrong"
        });
    }
    return res.status(200).json({
        success: true,
        updateProduct: product
    });
}));
exports.deleteProduct = (0, asyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let product = yield productModule_1.default.findById(req.params.id);
    if (!product) {
        return res.json({
            message: "invalid product"
        });
    }
    yield productModule_1.default.findByIdAndDelete(req.params.id);
    return res.json({
        success: true
    });
}));
