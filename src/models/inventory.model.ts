import mongoose, { Schema } from "mongoose";

const InventorySchema = new mongoose.Schema({
  quantity: { type: Number, },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user_tb'
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'product_tb'
  },
  expiryDate: { type: Date, default: null },
  deletedAt: { type: Date, default: null }
}, { timestamps: true });


export const Inventory = mongoose.model("inventory_tb", InventorySchema);

