import mongoose, { Schema } from "mongoose";

const businessScema = new mongoose.Schema({
  business_name: { type: String, required: true },
  postal_address: { type: String },
  phone_number: { type: String },
  working_hrs: { type: String },
  contact_number: { type: String },
  printQr: { type: Boolean },
  kra_pin: { type: String },
  expiryDate: { type: Date },
  latitude: Number,
  longitude: Number,
  state: { type: String, enum: ["active", "inactive"], default: "inactive" },
  created_at: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  api_key: { type: String, },
  master_ke: { type: String, default: "k3f9Jq8sT1vQmZ0uLx7Y2pV+5A1bF4Hq0r9N2wT+6GQ=" },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user_tb'
  },
  deletedAt: { type: Date, default: null }
}, { timestamps: true });


export const BusinessModel = mongoose.model("business_tb", businessScema);

