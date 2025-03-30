import express from "express";
import { sellJewellery, verifyOTP, getGoldPrice, acceptOffer } from "../controllers/jewelleryController.js";

const router = express.Router();

router.post("/sell", sellJewellery); // Customer requests sale/exchange
router.post("/verify-otp", verifyOTP); // OTP verification
router.post("/accept-offer", acceptOffer); // Accept price & process payment
router.get("/gold-price", getGoldPrice); // Get real-time gold price

export default router;
