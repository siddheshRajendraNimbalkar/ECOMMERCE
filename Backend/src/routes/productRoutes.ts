import express  from "express";
import { getAllProduct,createProduct, updateproduct, deleteProduct, getproduct } from "../controllers/product";
import { getProductByKey } from "../controllers/feacture";

const routes = express.Router();

routes.post('/new', createProduct);
routes.get('/productByKey',getProductByKey)
routes.get('/allproducts', getAllProduct);
routes.get('/getproduct/:id',getproduct)
routes.put('/:id',updateproduct)
routes.put('/delete/:id',deleteProduct)


export default routes;