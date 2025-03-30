import mongoose from "mongoose";

const jewellerySchema = new mongoose.Schema({
  customerName: String,
  phoneNumber: String,
  jewelleryType: String,
  weight: Number,
  purity: String, // 22K, 24K, etc.
  priceOffered: Number,
  status: { type: String, default: "Pending" }, // Pending, Approved, Rejected
});

export default mongoose.model("Jewellery", jewellerySchema);
