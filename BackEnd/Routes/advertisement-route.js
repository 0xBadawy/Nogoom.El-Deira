import express from "express";
import asyncHandler from "express-async-handler";
import Advertisement from "../models/advertisementSchema.js";
import Notification from "../models/notificationSchema.js"; // استدعاء نموذج الإشعار

const router = express.Router();

router.post(
  "/add",
  asyncHandler(async (req, res) => {
    // إنشاء الإعلان
    const advertisement = await Advertisement.create(req.body);
    res.status(201).json(advertisement);

    // إرسال إشعارات للمستخدمين المرتبطين بالإعلان
    if (advertisement.users && advertisement.users.length > 0) {
      const notifications = advertisement.users.map((userId) => ({
        userId,
        title: "إعلان جديد",
        message: `تم إضافة إعلان جديد بعنوان: ${advertisement.title || "بدون عنوان"}`,
      }));

      // حفظ الإشعارات في قاعدة البيانات
      await Notification.insertMany(notifications);
      console.log("تم إرسال الإشعارات بنجاح");
    }
  })
);

export default router;
