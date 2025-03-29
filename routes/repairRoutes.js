import express from 'express';
import { createRepairRequest, verifyOtp, updateRepairStatus } from '../controllers/repairController.js';

const router = express.Router();

router.post('/request', createRepairRequest);
router.post('/verify-otp', verifyOtp);
router.put('/update-status/:id', updateRepairStatus);

export default router;
