import express from "express";
import Notification from "../models/notificationSchema.js";

const router = express.Router();

console.log("Notification Route");

router.get("/", (req, res) => {
  res.send("Hello, Express!");
});


router.get("/notifications", async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: "يجب توفير معرف المستخدم" });
    }
    const notifications = await Notification.find({ userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: "خطأ في جلب الإشعارات" });
  }
});



router.post('/notifications', async (req, res) => {
  try {
    const { userId, title, message } = req.body;
    const notification = new Notification({ userId, title, message });
    await notification.save();
    res.status(201).json({ success: true, notification });
  } catch (error) {
    res.status(500).json({ error: 'خطأ في إضافة الإشعار' });
  }
});






export default router;
