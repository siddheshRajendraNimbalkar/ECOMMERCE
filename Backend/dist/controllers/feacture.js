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
exports.getProductByKey = void 0;
const productModule_1 = __importDefault(require("../module/productModule"));
const getProductByKey = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.query.key;
    const str = name === null || name === void 0 ? void 0 : name.toString().substring(0, 6);
    const price = name === null || name === void 0 ? void 0 : name.toString().substring(6, 10);
    console.log(name, price, str);
    if (price) {
        let productByKey = yield productModule_1.default.find({
            name: str,
            price: price
        });
        if (!productByKey.length) {
            const category = req.query.key;
            productByKey = yield productModule_1.default.find({ category,
                price: price
            });
        }
        console.log(req.query.key);
        if (!productByKey.length) {
            return res.json({
                sucess: false,
                message: "result not found"
            });
        }
        res.json({
            success: true,
            product: productByKey
        });
    }
    let productByKey = yield productModule_1.default.find({ name });
    if (!productByKey.length) {
        const category = req.query.key;
        productByKey = yield productModule_1.default.find({ category });
    }
    console.log(req.query.key);
    if (!productByKey.length) {
        return res.json({
            sucess: false,
            message: "result not found"
        });
    }
    res.json({
        success: true,
        product: productByKey
    });
});
exports.getProductByKey = getProductByKey;
