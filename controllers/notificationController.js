import Notification from "../models/NotificationModel.js";

// ✅ Get all notifications
export const getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find();
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Create a new notification
export const createNotification = async (req, res) => {
    const { title, message, recipient } = req.body;
    
    try {
        const newNotification = new Notification({ title, message, recipient });
        await newNotification.save();
        res.status(201).json({ message: "Notification sent successfully", notification: newNotification });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
