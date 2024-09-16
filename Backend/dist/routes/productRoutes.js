"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = require("../controllers/product");
const feacture_1 = require("../controllers/feacture");
const auth_1 = require("../middleware/auth");
const isAdmin_1 = require("../middleware/isAdmin");
const order_1 = require("../controllers/order");
const cart_1 = require("../controllers/cart");
const routes = express_1.default.Router();
// http://localhost:4000/api/v1/product/new
routes.get('/productByKey', feacture_1.getProductByKey);
routes.get('/allproducts', product_1.getAllProduct);
routes.get('/getproduct/:id', product_1.getProduct);
// Auth Routes
routes.use(auth_1.isAuthUser);
routes.put('/:id/review', product_1.updateOrCreateProductReview);
routes.put('/:id/delete', product_1.deleteProductReview);
routes.put('/:id/rating', product_1.ratingProduct);
//order routes 
routes.put('/:id/order', order_1.createOrder);
// cart route
routes.get('/:id/cart', cart_1.addToCart);
routes.put('/cart/items', cart_1.getCartItemByUserId);
routes.put('/:id/cart/delete', cart_1.deleteCartItem);
// Auth + Admin
routes.use(isAdmin_1.isAdmin);
routes.post('/new', product_1.createProduct);
routes.put('/:id', product_1.updateProduct);
exports.default = routes;
