import mongoose, { Schema } from "mongoose";

const SalesSchema = new mongoose.Schema(
  {
    sale_id: {
      type: String,
      required: true,
      
    },

    receipt_number: {
      type: String, // 👈 CHANGE THIS
      required: true,
    },

    total: Number,
    phone: String,
    payment_method: String,

    createdBy: {
      type: String, // 👈 CHANGE THIS TOO
      required: true,
    },
    business: {
      type: Schema.Types.ObjectId,
      ref: 'business_tb'
    },
    deletedAt: { type: Date, default: null },
  },
  
);

export const Sales = mongoose.model("sales_tb", SalesSchema);