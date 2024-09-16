import app from "./app";
import dotenv from "dotenv";
import connectDB from "./utils/database";

// Handeling uncaught exception
process.on("uncaughtException", (err) => {
  console.error(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});

// config
dotenv.config({ path: "./config/config.env" });
const PORT = process.env.PORT;

// connect DATABASE
connectDB();

const server = app.listen(PORT, (): void => {
  console.log(`Server is connected to port ${PORT}`);
});

process.on("unhandleRejection", (err) => {
  console.error(`Unhandel Promice Rejaction: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
