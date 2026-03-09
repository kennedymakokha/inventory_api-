import mongoose, { Schema } from "mongoose";

const RefundSchema = new mongoose.Schema({
  refund_item_id: {
    type: String,
    required: true,
    unique: true,
  },
  refund_id: String,
  product_id: String,
  refund: {
    type: Schema.Types.ObjectId,
    ref: 'refunds_tb'
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'products_tb'
  },
  product_name: String,
  price: Number,
  total: Number,
  quantity: Number,
  synced: Boolean,
  created_at: Date,
  updatedAt: Date,

  business: {
    type: Schema.Types.ObjectId,
    ref: 'business_tb'
  },

  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user_tb'
  },
}, );


export const RefundItemModel = mongoose.model("RefundItem_tb", RefundSchema);

