"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = require("../controllers/product");
const routes = express_1.default.Router();
routes.post('/new', product_1.createProduct);
routes.get('/allproducts', product_1.getAllProduct);
routes.get('/getproduct/:id', product_1.getproduct);
routes.put('/:id', product_1.updateproduct);
routes.put('/delete/:id', product_1.deleteProduct);
exports.default = routes;
