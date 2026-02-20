// import Razorpay from "razorpay";
// import crypto from "crypto";
// import dotenv from "dotenv";
// import Payment from "../models/Payment.js";  // Import Payment Model

// dotenv.config();

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // ✅ 1️⃣ Create Razorpay Order
// export const createOrder = async (req, res) => {
//   try {
//     const { amount, userId, repairId } = req.body;

//     const options = {
//       amount: amount * 100, // Convert INR to paise
//       currency: "INR",
//       receipt: `repair_${repairId}`,
//     };

//     const order = await razorpay.orders.create(options);
//     res.status(201).json(order);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // ✅ 2️⃣ Verify Razorpay Payment
// export const verifyPayment = async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//     // 🔹 Create HMAC Hash for Signature Verification
//     const body = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//                                      .update(body)
//                                      .digest("hex");

//     if (expectedSignature === razorpay_signature) {
//       // ✅ Payment Verified → Save to DB
//       const newPayment = new Payment({
//         userId: req.body.userId,
//         repairId: req.body.repairId,
//         amount: req.body.amount,
//         transactionId: razorpay_order_id,
//         paymentId: razorpay_payment_id,
//         status: "success",
//       });

//       await newPayment.save();
//       res.json({ message: "✅ Payment verified successfully", success: true });
//     } else {
//       res.status(400).json({ message: "❌ Invalid payment signature" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };







import Razorpay from "razorpay";

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create order
export const createOrder = async (req, res) => {
    const { amount } = req.body;

    try {
        const order = await razorpayInstance.orders.create({
            amount: amount * 100, // Razorpay expects amount in paise
            currency: "INR",
            receipt: "order_receipt_123",
        });
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Capture payment
export const capturePayment = async (req, res) => {
    const { payment_id, order_id } = req.body;

    try {
        const capture = await razorpayInstance.payments.capture(payment_id, order_id);
        res.status(200).json(capture);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
