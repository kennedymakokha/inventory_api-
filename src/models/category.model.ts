import mongoose, { Schema } from "mongoose";

const categoryScema = new mongoose.Schema({
  category_name: String,
  category_id: String,
  description: String,
  created_at: Date,
  updatedAt: Date,
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user_tb'
  },
  business: {
    type: Schema.Types.ObjectId,
    ref: 'business_tb'
  },
  deleted_at: { type: Date, default: null }
});


export const categoryModel = mongoose.model("category_tb", categoryScema);

