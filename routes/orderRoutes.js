import express from "express";
import Order from "../models/OrderModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { customerName, address, items, totalPrice, deliveryOption } = req.body;
  const newOrder = new Order({ customerName, address, items, totalPrice, deliveryOption });
  await newOrder.save();
  res.status(201).json(newOrder);
});

export default router;
