import mongoose, { Schema } from "mongoose";

const productSchema =  new mongoose.Schema({
    author:{
        type:Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    name:{
        type:String,
        require:[true,"please enter product name"]
    },
    description:{
        type:String,
        require:[true,"please enter product description"]
    },
    price:{
        type:Number,
        require:[true,"please enter the price"]
    },
    rating:{
        type:Number,
        default:0
    },
    images:[
       { public_id:{
        type:String,
        require:true
    },
    product_URL:{
        type:String,
        require:true
    }}
    ],
    category:{
        type:String,
        require:[true,"please enter product category"]
    },
    stock:{
        type:Number,
        require:[true,"please enter product stock"],
        maxLength:[4,"stock cannot be greater then 9999"]
    },
    numOfReview:{
        type:Number,
        default:0
    },
    review:[
        {
            id:{
                type:Schema.Types.ObjectId,
                required:true
            },
            name:{
                type:String,
                require:true,
            },
            rating:{
                type:Number,
                require:true
            },
            Comment:{
                type:String,
                require:true
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Product = mongoose.model("Product",productSchema);
export default Product;