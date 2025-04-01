import express from "express";
import multer from "multer";
import { getCustomJewelry, createCustomJewelry } from "../controllers/customJewelryController.js";

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Routes
router.get("/", getCustomJewelry);
router.post("/", upload.single("image"), createCustomJewelry);

export default router;
