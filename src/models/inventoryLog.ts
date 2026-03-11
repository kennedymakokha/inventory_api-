import mongoose, { Schema } from "mongoose";

const InventoryLogScema = new mongoose.Schema({
  inventory_log_id: {
    type: String,
    required: true,
    unique: true,
  },
  product_id: String,
  product: {
    type: Schema.Types.ObjectId,
    ref: 'product_tb'
  },
  note: String,
  synced: Boolean,
  createdAt: Date,
  updatedAt: { type: Date, default: new Date().toISOString() },
  reference_id: String,
  reference_type: {
    type: String,
    enum: ["SALE", "REFUND", "RESTOCK", "INITIAL_STOCK"],
    default: "INITIAL_STOCK"
  },
  quantity: { type: Number, },
  business: {
    type: Schema.Types.ObjectId,
    ref: 'business_tb'
  },

  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user_tb'
  },
});


export const InventoryLog = mongoose.model("inventoryLog_tb", InventoryLogScema);

