import { Response, Request, NextFunction } from "express";
import Product from "../module/productModule";

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
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
    return res.status(500).json({
      success: false,
      message:"Internal server error"
    });
  }
};

export const getAllProduct = async (req: Request, res: Response) => {
  try {
    const getallproduct = await Product.find();

    if (getallproduct.length > 0) {
      return res.status(200).json({
        success: true,
        getallproduct,
      });
    }

    return res.status(404).json({
      success: false,
      message: "No products found",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      updatedProduct: product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

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

    return res.status(200).json({
      success: true,
      reviews: product.review,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
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

    if(product.review.length === 0){
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
    
    return res.status(200).json({
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

    return res.status(200).json({
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
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let avg = 0;
    product?.review.map((e: any) => avg += e.rating)
    product.rating = avg / product.review.length;;
    await product.save();

    return res.status(200).json({
      success: true,
      rating: product.rating
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: (error as any).message
    });
  }
};
