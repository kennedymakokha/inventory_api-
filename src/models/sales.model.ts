import mongoose, { Schema } from "mongoose";

const SalesSchema = new mongoose.Schema({
  quantity: { type: Number, },
  soldprice: { type: Number, },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user_tb'
  },
  product_id: {
    type: Schema.Types.ObjectId,
    ref: 'product_tb'
  },

  deletedAt: { type: Date, default: null }
}, { timestamps: true });


export const Sales = mongoose.model("sales_tb", SalesSchema);

