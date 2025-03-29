import Repair from '../models/RepairModel.js';
import otpGenerator from 'otp-generator';
import { sendOtp } from '../services/twilioService.js';

export const createRepairRequest = async (req, res) => {
    const { customerName, phoneNumber, jewelleryType, issueDescription } = req.body;
    const otp = otpGenerator.generate(6, { digits: true });

    try {
        const repair = new Repair({ customerName, phoneNumber, jewelleryType, issueDescription, otp });
        await repair.save();

        // OTP SMS पाठवण्यासाठी Twilio वापर
        await sendOtp(phoneNumber, otp);

        res.status(201).json({ message: "Repair request created", repairId: repair._id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const verifyOtp = async (req, res) => {
    const { repairId, enteredOtp } = req.body;

    try {
        const repair = await Repair.findById(repairId);
        if (!repair) return res.status(404).json({ message: "Repair request not found" });

        if (repair.otp === enteredOtp) {
            res.json({ message: "OTP verified successfully" });
        } else {
            res.status(400).json({ message: "Invalid OTP" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateRepairStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const repair = await Repair.findById(id);
        if (!repair) return res.status(404).json({ message: "Repair request not found" });

        repair.status = status;
        await repair.save();

        res.json({ message: "Repair status updated", updatedRepair: repair });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
