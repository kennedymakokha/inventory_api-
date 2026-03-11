import mongoose, { Schema } from "mongoose";

const RefundSchema = new mongoose.Schema({
  refund_id: {
    type: String,
    required: true,
    unique: true,
  },
  sale_id: String,
  sale: {
    type: Schema.Types.ObjectId,
    ref: 'sales_tb'
  },
  cashier_id: {
    type: Schema.Types.ObjectId,
    ref: 'user_tb'
  },
  receipt_number: String,
  reason: String,
  total_refund: Number,
  synced: Boolean,
  created_at: Date,
   updatedAt: { type: Date, default: new Date().toISOString() },

  business: {
    type: Schema.Types.ObjectId,
    ref: 'business_tb'
  },

  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user_tb'
  },
}, );


export const RefundModel = mongoose.model("Refund_tb", RefundSchema);

