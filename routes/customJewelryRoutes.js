import express from "express";
import multer from "multer";
import CustomJewelry from "../models/CustomJewelryModel.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.get("/", async (req, res) => {
  const jewelry = await CustomJewelry.find();
  res.json(jewelry);
});

router.post("/", upload.single("image"), async (req, res) => {
  const { name, price, material, size } = req.body;
  const newJewelry = new CustomJewelry({
    name,
    price,
    material,
    size,
    image: req.file.path,
  });
  await newJewelry.save();
  res.status(201).json(newJewelry);
});

export default router;
