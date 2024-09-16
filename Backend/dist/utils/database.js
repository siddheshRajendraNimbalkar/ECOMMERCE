"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
function connectDB() {
    const db = process.env.DBURL;
    console.log(`Database URL: ${db}`);
    if (!db) {
        console.error('Database URL not provided in environment variables');
        process.exit(1);
    }
    mongoose_1.default.connect(`${db}`)
        .then((data) => {
        console.log(`MongoDB is connected to server ${data.connection.host}`);
    })
        .catch((error) => {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    });
}
exports.default = connectDB;
