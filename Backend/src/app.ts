import express,{Express} from "express";
import cookieParser from "cookie-parser"
const app: Express = express();
app.use(express.json());
app.use(cookieParser())


console.log("HELLO")


// routes
import product from "./routes/productRoutes"
import user from "./routes/userRoutes"
import order from "./routes/orderRoute"

app.use("/api/v1/product",product)
app.use("/api/v1/User",user);
app.use("/api/v1/order",order);

export default app;