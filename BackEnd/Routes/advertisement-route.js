import express from "express";
import asyncHandler from "express-async-handler";
import Advertisement from "../models/advertisementSchema.js";
import Notification from "../models/notificationSchema.js";
import User from "../models/userModel.js";

const router = express.Router();

router.post(
  "/add",
  asyncHandler(async (req, res) => {
    try {
      const { title, users, ...otherData } = req.body;

      if (!users || users.length === 0) {
        return res
          .status(400)
          .json({ message: "يجب تحديد مستخدم واحد على الأقل" });
      }

      // Map users to ensure each entry has userId and optional links
      const formattedUsers = users.map((user) => {
        if (typeof user === "string") {
          return { userId: user, links: [] };
        }
        return user;
      });

      const advertisementData = {
        title,
        users: formattedUsers,
        ...otherData,
      };

      // Create the advertisement
      const advertisement = await Advertisement.create(advertisementData);

      // Assign adId to each user and create notifications
      const adId = advertisement._id;
      const userUpdates = formattedUsers.map(async (user) => {
        // Update the user's ads list in the User collection
        await User.findByIdAndUpdate(
          user.userId,
          { $push: { ads: { adId, links: user.links || [] } } },
          { new: true }
        );

        return {
          userId: user.userId,
          title: "إعلان جديد",
          message: `تم إضافة إعلان جديد بعنوان: ${title || "بدون عنوان"}`,
        };
      });

      const notifications = await Promise.all(userUpdates);

      await Notification.insertMany(notifications);

      res.status(201).json({
        message: "تم إضافة الإعلان وتحديث المستخدمين وإرسال الإشعارات بنجاح",
        advertisement,
      });
    } catch (error) {
      console.error("خطأ أثناء إضافة الإعلان:", error);
      res.status(500).json({ message: "حدث خطأ أثناء إضافة الإعلان." });
    }
  })
);




router.get(
  "/user-ads/:userId",
  asyncHandler(async (req, res) => {
    try {
      const { userId } = req.params;

      const userWithAds = await User.findById(userId)
        .populate({
          path: "ads.adId",
          model: Advertisement,
          select: "title description", // Adjust the fields to return only necessary details
        })
        .exec();

      if (!userWithAds) {
        return res.status(404).json({ message: "لم يتم العثور على المستخدم" });
      }

      res.status(200).json({
        message: "تم جلب الإعلانات الخاصة بالمستخدم بنجاح",
        ads: userWithAds.ads,
      });
    } catch (error) {
      console.error("خطأ أثناء جلب إعلانات المستخدم:", error);
      res.status(500).json({ message: "حدث خطأ أثناء جلب إعلانات المستخدم." });
    }
  })
);














export default router;
