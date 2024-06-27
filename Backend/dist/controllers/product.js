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
exports.ratingProduct = exports.deleteProductReview = exports.updateOrCreateProductReview = exports.getAllReview = exports.deleteProduct = exports.updateProduct = exports.getProduct = exports.getAllProduct = exports.createProduct = void 0;
const productModule_1 = __importDefault(require("../module/productModule"));
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const { name, description, price, rating, images, category, stock, numOfReview, review, } = req.body;
        if (!name || !description || !price) {
            return res
                .status(400)
                .json({
                success: false,
                message: "Name, description, and price are required",
            });
        }
        const product = yield productModule_1.default.create({
            author: user._id,
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
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});
exports.createProduct = createProduct;
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getallproduct = yield productModule_1.default.find();
        if (getallproduct.length > 0) {
            return res.status(200).json({
                success: true,
                getallproduct,
            });
        }
        return res.status(404).json({
            success: false,
            message: "No products found",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});
exports.getAllProduct = getAllProduct;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productModule_1.default.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        return res.status(200).json({
            success: true,
            product,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
exports.getProduct = getProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let product = yield productModule_1.default.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        product = yield productModule_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        return res.status(200).json({
            success: true,
            updatedProduct: product,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productModule_1.default.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        yield productModule_1.default.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
exports.deleteProduct = deleteProduct;
const getAllReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    if (!productId) {
        return res.status(400).json({
            success: false,
            message: "Product ID is required",
        });
    }
    try {
        const product = yield productModule_1.default.findById(productId).populate("review");
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        return res.status(200).json({
            success: true,
            reviews: product.review,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
exports.getAllReview = getAllReview;
const updateOrCreateProductReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    const user = req.user;
    const { rating, comment } = req.body;
    if (!productId) {
        return res.status(400).json({
            success: false,
            message: "Product ID is required"
        });
    }
    if (!rating && !comment) {
        return res.status(400).json({
            success: false,
            message: "Rating or Comment are required to update the review"
        });
    }
    try {
        const product = yield productModule_1.default.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        if (!user || !user._id) {
            return res.status(400).json({
                success: false,
                message: "User information is required"
            });
        }
        if (product.review.length === 0) {
            const newReview = {
                id: user._id,
                name: user.username,
                rating: rating,
                Comment: comment
            };
            product.review.push(newReview);
            product.numOfReview = product.review.length;
        }
        let review = product.review.find((review) => {
            return review.id && review.id.toString() === user._id.toString();
        });
        if (review) {
            if (rating !== undefined) {
                review.rating = rating;
            }
            if (comment !== undefined) {
                review.Comment = comment;
            }
        }
        else {
            const newReview = {
                id: user._id,
                name: user.username,
                rating: rating,
                Comment: comment
            };
            product.review.push(newReview);
            product.numOfReview = product.review.length;
        }
        yield product.save();
        return res.status(200).json({
            success: true,
            message: review ? "Review updated successfully" : "Review created successfully"
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating/creating the review",
            error: error.message
        });
    }
});
exports.updateOrCreateProductReview = updateOrCreateProductReview;
const deleteProductReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    const user = req.user;
    const { reviewId } = req.query;
    if (!productId) {
        return res.status(400).json({
            success: false,
            message: "Product ID is required"
        });
    }
    if (!reviewId) {
        return res.status(400).json({
            success: false,
            message: "Review ID is required"
        });
    }
    try {
        const product = yield productModule_1.default.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        if (!user || !user._id) {
            return res.status(400).json({
                success: false,
                message: "User information is required"
            });
        }
        const review = product.review.id(reviewId);
        if (!review || review.id.toString() !== user._id.toString()) {
            return res.status(404).json({
                success: false,
                message: "Review not found or user not authorized"
            });
        }
        product.review.pull(reviewId);
        product.numOfReview = product.review.length;
        yield product.save();
        return res.status(200).json({
            success: true,
            message: "Review deleted successfully"
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting the review",
            error: error.message
        });
    }
});
exports.deleteProductReview = deleteProductReview;
const ratingProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productModule_1.default.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        let avg = 0;
        product === null || product === void 0 ? void 0 : product.review.map((e) => avg += e.rating);
        product.rating = avg / product.review.length;
        ;
        yield product.save();
        return res.status(200).json({
            success: true,
            rating: product.rating
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
});
exports.ratingProduct = ratingProduct;
