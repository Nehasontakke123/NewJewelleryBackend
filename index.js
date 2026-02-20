// import dotenv from "dotenv";
// dotenv.config();
// import express from "express";
// import cors from "cors";
// import dbConnect from "./db/connectDB.js";
// import repairRoutes from "./routes/repairRoutes.js";
// // import paymentRoutes from "./routes/paymentRoutes.js";
// import jewelleryRoutes from "./routes/customJewelryRoutes.js";
// import customJewelryRoutes from "./routes/customJewelryRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js";
// import productRoutes from "./routes/productRoutes.js";
// import videoRoutes from './routes/videoRoutes.js'
// import notificationRoutes from "./routes/notificationRoutes.js";
// // ✅ Connect to MongoDB
// dbConnect(process.env.DBURL, process.env.DBNAME);

// const app = express();
// app.use(express.json());
// app.use(cors());

// // ✅ Routes
// app.use("/api/repair", repairRoutes);
// app.use("/api/notifications", notificationRoutes);
// // app.use("/api/payment", paymentRoutes);
// app.use("/api/jewellery", jewelleryRoutes);
// app.use("/api/jewelryitem", customJewelryRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/products", productRoutes)
// app.use('/api/videos', videoRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));





import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import dbConnect from "./db/connectDB.js";
import repairRoutes from "./routes/repairRoutes.js";
import jewelleryRoutes from "./routes/customJewelryRoutes.js";
import customJewelryRoutes from "./routes/customJewelryRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

// ✅ Connect to MongoDB
dbConnect(process.env.DBURL, process.env.DBNAME);

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.json());
app.use(cors());

// ✅ Routes
app.use("/api/repair", repairRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/jewellery", jewelleryRoutes);
app.use("/api/jewelryitem", customJewelryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/videos", videoRoutes);

// ✅ WebSocket Connection for Live Tracking
io.on("connection", (socket) => {
    console.log("Client connected");
    socket.on("vanLocation", (data) => {
        io.emit("updateLocation", data);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));