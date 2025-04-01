import mongoose from "mongoose";

const customJewelrySchema = new mongoose.Schema({
  name: String,
  price: Number,
  material: String,
  size: String,
  image: String,
});

export default mongoose.model("CustomJewelry", customJewelrySchema);
