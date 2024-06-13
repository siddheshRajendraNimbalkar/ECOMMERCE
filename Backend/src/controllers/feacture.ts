import {Response,Request,NextFunction} from 'express'
import Product from '../module/productModule';
import asyncHandler from '../middleware/asyncError'

export const getProductByKey = asyncHandler(async(req:Request,res:Response) =>{
    const productByKey = await Product.find(req.query)
    if(!productByKey.length){
      return res.json({
        sucess:false,
        message: "result not found"
      })
    }
    res.json({
      success:true,
      product:productByKey
    })
});