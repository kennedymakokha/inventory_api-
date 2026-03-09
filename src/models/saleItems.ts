import mongoose, { Schema } from "mongoose";
 
const SaleItemSchema = new mongoose.Schema({
  sale_item_id: {
    type: String,
    required: true,
  },
  sale_id: String,
  product_id: String,
  sale: {
    type: Schema.Types.ObjectId,
    ref: 'sales_tb'
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'products_tb'
  },
  product_name: String,
  price: Number,
  refunded_quantity: Number,
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


export const SaleItemModel = mongoose.model("SaleItem_tb", SaleItemSchema);

