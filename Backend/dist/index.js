"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./utils/database"));
// Handeling uncaught exception
process.on("uncaughtException", (err) => {
    console.error(`Uncaught Exception: ${err.message}`);
    process.exit(1);
});
// config
dotenv_1.default.config({ path: "./config/config.env" });
const PORT = process.env.PORT;
// connect DATABASE
(0, database_1.default)();
const server = app_1.default.listen(PORT, () => {
    console.log(`Server is connected to port ${PORT}`);
});
process.on("unhandleRejection", (err) => {
    console.error(`Unhandel Promice Rejaction: ${err.message}`);
    server.close(() => {
        process.exit(1);
    });
});
