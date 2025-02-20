import express from "express";
import Notification from "../models/notificationSchema.js";
import { getUserSentNotifications, storeUserSentNotification } from "../functions/notification.js";

const router = express.Router();

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

router.put("/read-notification", async (req, res) => {
  try {
    const { notificationId } = req.body;
    await Notification.findByIdAndUpdate(notificationId, { isRead: true });
    res.status(200).json({
      success: true,
      message: "تم تحديث الإشعار بنجاح",
      data: { notificationId },
    });
  } catch (error) {
    res.status(500).json({ error: "خطأ في تحديث الإشعار" });
  }
});

router.post("/notifications", async (req, res) => {
  try {
    const { userId, title, message } = req.body;
    const notification = new Notification({ userId, title, message });
    await notification.save();
    res.status(201).json({ success: true, notification });
  } catch (error) {
    res.status(500).json({ error: "خطأ في إضافة الإشعار" });
  }
});

router.post("/group-notifications", async (req, res) => {
  try {
    const { title, message, userIds } = req.body;

     const response = await storeUserSentNotification(
       userId,
       title,
       message,
       sendedUsersId
     );
    sendNotificationToUsers(userIds, title, message, null, "info");
    res
      .status(201)
      .json({ success: true, message: "تم إرسال الإشعارات بنجاح" });
  } catch (error) {
    res.status(500).json({ error: "خطأ في إرسال الإشعارات" });
  }
});



// // 🔹 إرسال إشعار جديد وحفظه في قاعدة البيانات
// router.post("/send", async (req, res) => {
//   const { userId, title, message, sendedUsersId } = req.body;

//   const response = await storeUserSentNotification(userId, title, message, sendedUsersId);

//   res.status(response.success ? 200 : 400).json(response);
// });

// router.get("/:userId", async (req, res) => {
//   const { userId } = req.params;

//   const response = await getUserSentNotifications(userId);

//   res.status(response.success ? 200 : 400).json(response);
// });



export default router;
