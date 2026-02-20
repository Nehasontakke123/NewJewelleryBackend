import express from "express";
import { getAllNotifications, createNotification } from "../controllers/notificationController.js";

const router = express.Router();

// ✅ Get all notifications
router.get("/", getAllNotifications);

// ✅ Create a new notification
router.post("/", createNotification);

export default router;
