import express,{Express} from "express";

const app: Express = express();
app.use(express.json());

// routes
import product from "./routes/productRoutes"
import errorMiddleware from "./middleware/error";
app.use(errorMiddleware)
app.use("/api/v1/product",product)



export default app;