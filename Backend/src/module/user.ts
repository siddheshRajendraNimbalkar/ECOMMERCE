import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, Selection:false },
    avatar:{ public_id:{type:String,require:true},product_URL:{type:String,require:true,default:"https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"}},
    isAdmin: { type: Boolean, default: false },
    resetPasswordToken: String,
    resetPasswordExpire:Date,
    createdAt: { type: Date, default: Date.now }
})

const User =  mongoose.model("User",userSchema);
export default User;