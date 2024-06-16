import {Response,Request,NextFunction} from 'express'
import Product from '../module/productModule';
import asyncHandler from '../middleware/asyncError'

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (req as any).user;
      const { name, description, price, rating, images, category, stock, numOfReview, review } = req.body;
      
      if (!name || !description || !price) {
        return res.status(400).json({ success: false, message: 'Name, description, and price are required' });
      }
  
      const product = await Product.create({
        author:user._id,
        name,
        description,
        price,
        rating,
        images,
        category,
        stock,
        numOfReview,
        review,
      });
  
      return res.status(201).json({
        success: true,
        product,
      });
    } catch (error) {
      console.log(error); 
    }
  }



export const getAllProduct = asyncHandler(async(req: Request,res: Response) =>{
  const getallproduct = await Product.find();

  if(getallproduct){
    return res.json({
      success: true,
      getallproduct
    });
  }

  return res.json({
    success:false
  })
})

export const getproduct =asyncHandler(async(req:Request,res:Response) => {
    const product = await Product.findById(req.params.id)
    if(!product){
      return res.json({
        message:"product not found"
      })
    }

    res.json({
      success: true,
      product:product
    })
})

export const updateproduct =asyncHandler(async(req: Request,res: Response) => {

  let product = await Product.findById(req.params.id);

  if(!product){
    return res.status(500).json({
      success:false,
      message:"something went wrong"
    })
  }

  product = await Product.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runValidators:true,
  })

  if(!product){
    return res.json({
      message:"some thing went wrong"
    })
  }
  return res.status(200).json({
    success: true,
    updateProduct: product
  })
});

export const deleteProduct =asyncHandler(async(req: Request,res:Response) =>{
  let product = await Product.findById(req.params.id);

  if(!product){
    return res.json({
      message:"invalid product"
    })
  }
  await Product.findByIdAndDelete(req.params.id)
  return res.json({
    success:true
  })
});