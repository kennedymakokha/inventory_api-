import mongoose, { Schema } from "mongoose";

const productScema = new mongoose.Schema({
  product_name: { type: String, required: true, unique: true },
  description: { type: String, },
  price: { type: Number },
  Bprice: { type: Number },
  quantity: { type: Number, },
  expiryDate: { type: String },
  sellingPrice: { type: Number },
  // sellingPrice: { type: Number },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user_tb'
  },
  deletedAt: { type: Date, default: null }
}, { timestamps: true });


export const ProductModel = mongoose.model("product_tb", productScema);

