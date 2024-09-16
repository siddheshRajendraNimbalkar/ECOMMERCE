import express from "express";
import { findOrder, getAllOrderProduct  } from "../controllers/order";
import { isAuthUser } from "../middleware/auth";
const orderRoute = express.Router();

orderRoute.put('/:orderid',findOrder);

orderRoute.use(isAuthUser);
orderRoute.get('/orders',getAllOrderProduct);

export default orderRoute;