import mongoose, { Schema } from "mongoose";

const productScema = new mongoose.Schema({
  product_name: String,
  price: Number,
  Bprice: Number,
  description: String,
  expiryDate: Date,
  synced: Boolean,
  created_at: Date,
  updatedAt: Date,
  quantity: { type: Number, },
  sellingPrice: { type: Number },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user_tb'
  },
  deletedAt: { type: Date, default: null }
}, { timestamps: true });


export const ProductModel = mongoose.model("product_tb", productScema);

