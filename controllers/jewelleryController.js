import Jewellery from "../models/Jewellery.js";
import twilio from "twilio";
import axios from "axios"; // Gold Price Fetching API

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const client = twilio(accountSid, authToken);

const otpStore = {};

export const sellJewellery = async (req, res) => {
  const { customerName, phoneNumber, jewelleryType, weight, purity } = req.body;

  const goldPricePerGram = 6000;
  const priceOffered = weight * goldPricePerGram * (purity === "24K" ? 1 : 0.92);

  const jewellery = new Jewellery({ customerName, phoneNumber, jewelleryType, weight, purity, priceOffered });
  await jewellery.save();

  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  otpStore[phoneNumber] = otp;

  try {
    await client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: twilioPhoneNumber,
      to: phoneNumber,
    });

    res.json({ message: "OTP Sent Successfully!", priceOffered });
  } catch (error) {
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

export const verifyOTP = (req, res) => {
  const { phone, otp } = req.body;
  if (otpStore[phone] === otp) {
    delete otpStore[phone];
    res.json({ message: "OTP Verified Successfully!" });
  } else {
    res.status(400).json({ message: "Invalid OTP" });
  }
};

export const acceptOffer = async (req, res) => {
  const { phoneNumber } = req.body;

  await Jewellery.findOneAndUpdate({ phoneNumber }, { status: "Approved" });

  res.json({ message: "Payment Processed Successfully!" });
};

// ✅ **ADD getGoldPrice FUNCTION**


export const getGoldPrice = async (req, res) => {
    try {
      const apiKey = process.env.GOLDAPI_KEY; // Use environment variable
      const url = `https://www.goldapi.io/api/XAU/INR`;
  
      const response = await axios.get(url, {
        headers: {
          "x-access-token": apiKey,
          "Content-Type": "application/json",
        },
      });
  
      res.json({
        goldPricePerGram: response.data.price_gram_24k, // 24K सोन्याचा दर
        goldPricePerGram22K: response.data.price_gram_22k, // 22K सोन्याचा दर
      });
    } catch (error) {
      console.error("Error fetching gold price:", error.message);
      res.status(500).json({ message: "Error fetching gold price" });
    }
  };
