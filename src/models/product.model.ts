import mongoose, { Schema } from "mongoose";

const productScema = new mongoose.Schema({
  product_name: String,
  product_id: String,
  price: Number,
  Bprice: Number,
  stock:Number,
  description: String,
  expiryDate: Date,
  synced: Boolean,
  created_at: Date,
  updatedAt: Date,
  category_id:String,
  quantity: { type: Number, },
  sellingPrice: { type: Number },
  business: {
    type: Schema.Types.ObjectId,
    ref: 'business_tb'
  },
   category: {
    type: Schema.Types.ObjectId,
    ref: 'category_tb'
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user_tb'
  },
  deletedAt: { type: Date, default: null }
});


export const ProductModel = mongoose.model("product_tb", productScema);

