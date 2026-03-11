import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
const UserSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true,
  },
  phone_number: { type: String, required: true, unique: true },
  name: { type: String, },
  email: { type: String, },
  activationCode: { type: String, },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user_tb'
  },
  business: {
    type: Schema.Types.ObjectId,
    ref: 'business_tb'
  },
  role: {
    type: String,
    enum: ["superadmin", "admin", "sales",],
    default: "sales"
  },
  activated: { type: Boolean, default: true },
  password: { type: String, required: true },
  updatedAt: { type: Date, default: new Date().toISOString() },
},);
// UserSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

export const User = mongoose.model("user_tb", UserSchema);
