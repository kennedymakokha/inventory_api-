import mongoose, { Schema } from "mongoose";

const PaymentSchema = new mongoose.Schema({
  payment_id: {
    type: String,
    required: true,
    unique: true,
  },
  sale_id: String,
  sale: {
    type: Schema.Types.ObjectId,
    ref: 'sales_tb'
  },
  method: String,
  amount: Number,
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
});


export const PaymentModel = mongoose.model("Payment_tb", PaymentSchema);

