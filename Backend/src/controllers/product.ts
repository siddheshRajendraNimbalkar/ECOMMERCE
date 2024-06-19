import { Response, Request, NextFunction } from "express";
import Product from "../module/productModule";
import asyncHandler from "../middleware/asyncError";

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (req as any).user;
    const {
      name,
      description,
      price,
      rating,
      images,
      category,
      stock,
      numOfReview,
      review,
    } = req.body;

    if (!name || !description || !price) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Name, description, and price are required",
        });
    }

    const product = await Product.create({
      author: user._id,
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
};

export const getAllProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const getallproduct = await Product.find();

    if (getallproduct) {
      return res.json({
        success: true,
        getallproduct,
      });
    }

    return res.json({
      success: false,
    });
  }
);

export const getproduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.json({
      message: "product not found",
    });
  }

  res.json({
    success: true,
    product: product,
  });
});

export const updateproduct = asyncHandler(
  async (req: Request, res: Response) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(500).json({
        success: false,
        message: "something went wrong",
      });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.json({
        message: "some thing went wrong",
      });
    }
    return res.status(200).json({
      success: true,
      updateProduct: product,
    });
  }
);

export const deleteProduct = asyncHandler(
  async (req: Request, res: Response) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.json({
        message: "invalid product",
      });
    }
    await Product.findByIdAndDelete(req.params.id);
    return res.json({
      success: true,
    });
  }
);

export const getAllReview = async (req: Request, res: Response) => {
  const productId = req.params.id;

  if (!productId) {
    return res.status(400).json({
      success: false,
      message: "Product ID is required",
    });
  }

  try {
    const product = await Product.findById(productId).populate("review"); 
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.json({
      success: true,
      reviews: product.review,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching the product",
    });
  }
};

export const updateOrCreateProductReview = async (req: Request, res: Response) => {
  const productId = req.params.id;
  const user = (req as any).user;
  const { rating, comment } = req.body;

  if (!productId) {
    return res.status(400).json({
      success: false,
      message: "Product ID is required"
    });
  }

  if (!rating && !comment) {
    return res.status(400).json({
      success: false,
      message: "Rating or Comment are required to update the review"
    });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    if (!user || !user._id) {
      return res.status(400).json({
        success: false,
        message: "User information is required"
      });
    }

    if(product.review.length == 0){
      const newReview = {
        id: user._id,
        name: user.username,
        rating: rating,
        Comment: comment
      };
      product.review.push(newReview as any);
      product.numOfReview = product.review.length;
    }

    let review = product.review.find((review) => {
      return review.id && review.id.toString() === user._id.toString();
    });

    if (review) {
      if (rating !== undefined) {
        review.rating = rating;
      }
      if (comment !== undefined) {
        review.Comment = comment;
      }
    } else {
      const newReview = {
        id: user._id,
        name: user.username,
        rating: rating,
        Comment: comment
      };
      product.review.push(newReview as any);
      product.numOfReview = product.review.length;
    }

    await product.save();
    
    return res.json({
      success: true,
      message: review ? "Review updated successfully" : "Review created successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating/creating the review",
      error: (error as any).message
    });
  }
};


export const deleteProductReview = async (req: Request, res: Response) => {
  const productId = req.params.id;
  const user = (req as any).user;
  const { reviewId } = req.query;
  if (!productId) {
    return res.status(400).json({
      success: false,
      message: "Product ID is required"
    });
  }

  if (!reviewId) {
    return res.status(400).json({
      success: false,
      message: "Review ID is required"
    });
  }

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    if (!user || !user._id) {
      return res.status(400).json({
        success: false,
        message: "User information is required"
      });
    }

    const review = product.review.id(reviewId);

    if (!review || review.id.toString() !== user._id.toString()) {
      return res.status(404).json({
        success: false,
        message: "Review not found or user not authorized"
      });
    }

    product.review.pull(reviewId);
    product.numOfReview = product.review.length;

    await product.save();

    return res.json({
      success: true,
      message: "Review deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the review",
      error: (error as any).message
    });
  }
};

export const ratingProduct = async(req:Request,res:Response) =>{
  await Product.findById(req.params.id)
  .then((product: any)=>{
    // if(product){
    //   return res.json({
    //     success:false,
    //     message:"product not found",
    //   })
    // }
    let avg = 0;
    product?.review.map((e: any) => avg += e.rating)
    product.rating = avg / product.review.length;;
    product.save();
    return res.json({
      success:true,
      rating:product.rating
    });
  }).catch((error) => {
    return res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
    });
});
};