"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = require("../controllers/product");
const feacture_1 = require("../controllers/feacture");
const auth_1 = require("../middleware/auth");
const routes = express_1.default.Router();
// http://localhost:4000/api/v1/product/new
routes.get('/productByKey', feacture_1.getProductByKey);
routes.get('/allproducts', product_1.getAllProduct);
routes.get('/getproduct/:id', product_1.getproduct);
// Auth Routes
routes.use(auth_1.isAuthUser);
routes.post('/new', product_1.createProduct);
routes.put('/:id', product_1.updateproduct);
routes.put('/delete/:id', product_1.deleteProduct);
exports.default = routes;
