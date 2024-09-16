import { Request, Response } from "express";
import Order from "../module/orderModel";
import Product from "../module/productModule";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const productId = req.params.id;
    const {
      shippingAddress,
      qty,
      paymentMethod,
      paymentResult,
      taxPrice,
      shippingPrice,
      Status,
      totalPrice,
      isPaid,
      paidAt,
    } = req.body;
    if (
      !shippingAddress &&
      !qty &&
      !paymentMethod &&
      !paymentResult &&
      !taxPrice &&
      !shippingPrice &&
      !Status &&
      !totalPrice &&
      !isPaid &&
      !paidAt
    ) {
      return res.json({
        success: false,
        message:
          "please enter shippingAddress qty paymentMethod paymentResult taxPrice shippingPrice Status totalPrice isPaid paidAt",
      });
    }
    const product = await Product.findById(productId);
    if (!product || product.stock == null) {
      return res.status(400).json({
        success: false,
        message: "Product not found or out of stock",
      });
    }

    if (product.stock < qty) {
      return res.status(400).json({
        success: false,
        message: `Available quantity: ${product.stock}`,
      });
    }
    const newOrder = await Order.create({
      user: user._id.toString(),
      orderItems: {
        name: product.name,
        qty: qty,
        image: product.images[0],
        price: product.price,
        product: productId,
      },
      shippingAddress,
      paymentMethod,
      paymentResult,
      taxPrice,
      shippingPrice,
      Status,
      totalPrice,
      isPaid,
      paidAt,
    });
    product.stock -= qty;
    await product.save();
    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const findOrder = async (req: Request, res: Response) => {
  const { orderid } = req.params;
  Order.findById(orderid)
    .then((order) => {
      if (!order) {
        return res.json({
          success: false,
          message: "Order not found",
        });
      }
      return res.json({
        success: true,
        order,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.json({
        success: false,
        message: "Internal Server Error",
      });
    });
};


export const getAllOrderProduct = async(req: Request,res: Response) =>{
  const user = (req as any).user;
  Order.find({user:user._id.toString()}).then((order)=>{
    if(!order){
      res.json({
        success:false,
        message:"order not found"
      })
    }
    res.json({
      success:true,
      order:order
    })
  }).catch((error)=>{
    console.log(error);
    return res.json({
      success: false,
      message: "Internal Server Error",
    });
  })

}