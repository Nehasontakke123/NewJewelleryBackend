import mongoose from 'mongoose';

const repairSchema = new mongoose.Schema({
    customerName: String,
    phoneNumber: String,
    jewelleryType: String,
    issueDescription: String,
    status: { type: String, default: "Pending" },
    otp: String,
    assignedKaragir: String,
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Repair', repairSchema);
