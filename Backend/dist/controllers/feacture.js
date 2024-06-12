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
const asyncError_1 = __importDefault(require("../middleware/asyncError"));
exports.getProductByKey = (0, asyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productByKey = yield productModule_1.default.find(req.query);
    console.log(productByKey.length);
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
}));
