import { Request, Response } from "express";
import Cart from "../module/cart";

export const addToCart = async (req: Request, res: Response) => {
  const productId = req.params.id;
  const user = (req as any).user;

  try {
    let cart = await Cart.findOne({ userId: user._id.toString() });

    if (!cart) {
      cart = new Cart({
        userId: user._id.toString(),
        items: [{ productId }]
      });
    } else {
      cart.items.push({ productId });
    }

    await cart.save();

    res.status(200).json({
      success: true,
      cart
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};
export const getCartItemByUserId = async (req: Request, res: Response) => {
  const user = (req as any).user;
  try {
    const cartItems = await Cart.find({ userId: user._id.toString() });
    if (!cartItems) {
      res.json({
        success: false,
        message: "items not found",
      });
    }

    res.json({
      success: true,
      items: cartItems,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteCartItem = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const productId = req.params.id;
  try {
    const cart = await Cart.findOne({ userId: user._id.toString() });
    if (!cart) {
      res.json({
        success: false,
        message: "items not found",
      });
    }
    const itemIndex: Number | null | any = cart?.items.findIndex(
      (item: any) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }
    cart?.items.splice(itemIndex, 1);
    await cart?.save();

    return res.status(200).json({
      success: true,
      message: "Item removed from cart",
      cart,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Internal server error",
    });
  }
};
