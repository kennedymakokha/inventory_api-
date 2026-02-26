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
  deletedAt: { type: Date, default: null }
}, { timestamps: true });


export const categoryModel = mongoose.model("category_tb", categoryScema);

