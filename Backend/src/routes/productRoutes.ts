import express  from "express";
import { getAllProduct,createProduct, updateproduct, getproduct, updateOrCreateProductReview, deleteProductReview, ratingProduct } from "../controllers/product";
import { getProductByKey } from "../controllers/feacture";
import { isAuthUser } from "../middleware/auth";
import { isAdmin } from "../middleware/isAdmin";

const routes = express.Router();


// http://localhost:4000/api/v1/product/new

routes.get('/productByKey',getProductByKey)
routes.get('/allproducts', getAllProduct);
routes.get('/getproduct/:id',getproduct)


// Auth Routes
routes.use(isAuthUser);
routes.put('/:id/review',updateOrCreateProductReview)
routes.put('/:id/delete',deleteProductReview)
routes.put('/:id/rating',ratingProduct)

routes.use(isAdmin);

routes.post('/new', createProduct);
routes.put('/:id',updateproduct)


export default routes;