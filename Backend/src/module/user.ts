import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true},
    password: { type: String, required: true, select:false },
    avatar:{ public_id:{type:String,require:true},product_URL:{type:String,require:true,default:"https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"}},
    isAdmin: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
})

const User =  mongoose.model("User",userSchema);
export default User;