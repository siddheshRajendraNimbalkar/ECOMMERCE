import mongoose, { Schema } from 'mongoose';

const cartSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      }
    }
  ]
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;