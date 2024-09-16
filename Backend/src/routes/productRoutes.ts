import express  from "express";
import { getAllProduct,createProduct, updateOrCreateProductReview, deleteProductReview, ratingProduct, getProduct, updateProduct } from "../controllers/product";
import { getProductByKey } from "../controllers/feacture";
import { isAuthUser } from "../middleware/auth";
import { isAdmin } from "../middleware/isAdmin";
import { createOrder } from "../controllers/order";
import { addToCart, deleteCartItem, getCartItemByUserId } from "../controllers/cart";

const routes = express.Router();


// http://localhost:4000/api/v1/product/new

routes.get('/productByKey',getProductByKey)
routes.get('/allproducts', getAllProduct);
routes.get('/getproduct/:id',getProduct)


// Auth Routes
routes.use(isAuthUser);
routes.put('/:id/review',updateOrCreateProductReview)
routes.put('/:id/delete',deleteProductReview)
routes.put('/:id/rating',ratingProduct)

//order routes 
routes.put('/:id/order',createOrder);

// cart route
routes.get('/:id/cart',addToCart);
routes.put('/cart/items',getCartItemByUserId);
routes.put('/:id/cart/delete',deleteCartItem);



// Auth + Admin
routes.use(isAdmin);

routes.post('/new', createProduct);
routes.put('/:id',updateProduct)


export default routes;