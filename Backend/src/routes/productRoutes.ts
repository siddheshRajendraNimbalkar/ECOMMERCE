import express  from "express";
import { getAllProduct,createProduct, updateproduct, deleteProduct, getproduct } from "../controllers/product";

const routes = express.Router();

routes.post('/new', createProduct);
routes.get('/allproducts', getAllProduct);
routes.get('/getproduct/:id',getproduct)
routes.put('/:id',updateproduct)
routes.put('/delete/:id',deleteProduct)


export default routes;