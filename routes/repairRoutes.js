import express from "express";
import { requestRepairService, verifyOtp, updateRepairStatus } from "../controllers/repairController.js";

const router = express.Router();

// Request Repair Service
router.post("/request", requestRepairService);

// OTP Verification
router.post("/verify-otp", verifyOtp);

// Update Repair Status
router.put("/update-status/:id", updateRepairStatus);

export default router;
