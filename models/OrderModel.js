import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customerName: String,
  address: String,
  items: Array,
  totalPrice: Number,
  deliveryOption: String,
});

export default mongoose.model("Order", orderSchema);
