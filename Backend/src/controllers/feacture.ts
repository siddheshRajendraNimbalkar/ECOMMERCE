import {Response,Request,NextFunction} from 'express'
import Product from '../module/productModule';

export const getProductByKey = async(req:Request,res:Response) =>{
  const name = req.query.key;
  
  const str = name?.toString().substring(0,6);
  const price = name?.toString().substring(6,10);
  console.log(name, price, str)
    if(price){
      let productByKey = await Product.find({
        name:str,
        price:price
      })
      
    
    if(!productByKey.length){
      const category = req.query.key;
      productByKey = await Product.find({category,
        price:price
      })
    }
    
    console.log(req.query.key)
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
    }
    let productByKey = await Product.find({name})
    
    if(!productByKey.length){
      const category = req.query.key;
      productByKey = await Product.find({category})
    }
    
    console.log(req.query.key)
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
};