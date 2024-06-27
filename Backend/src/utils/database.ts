import mongoose from "mongoose";

function connectDB() {
    const db = process.env.DBURL || "mongodb://localhost:27017/ECOMMERCE"
    if(!db){
        console.log('Database URL not provided in environment variables');
        process.exit(1);
    }
    mongoose.connect(db).then((data:any)=>{
        console.log(`mongodb is connected to server ${data}`)
    }).catch((error:any)=>{
        console.log(error)
    })
}

export default connectDB;