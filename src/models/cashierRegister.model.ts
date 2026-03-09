import mongoose, { Schema } from "mongoose";
const CashierRegisterSchema = new mongoose.Schema(
  {
    register_id: {
      type: String,
      required: true,
      unique: true,
    },
    opening_float: {
      type: Number, // 👈 CHANGE THIS
      required: true,
    },
    closing_cash: Number,
    expected_cash: Number,
    difference: String,
    opened_at: String,
    closed_at: String,
    status: String,
    synced: Boolean,
    createdBy: {
      type: String, // 👈 CHANGE THIS TOO
      required: true,
    },
    cashier_id: {
      type: Schema.Types.ObjectId,
      ref: 'business_tb'
    },
    business: {
      type: Schema.Types.ObjectId,
      ref: 'business_tb'
    },
    deletedAt: { type: Date, default: null },
  }
);

export const CashierRegisterModel = mongoose.model("CashierRegister_tb", CashierRegisterSchema);
