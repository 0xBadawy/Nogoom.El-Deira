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

router.get("/all", asyncHandler(async (req, res) => { // Get all advertisements
  try {
    const advertisements = await Advertisement.find().exec();

    res.status(200).json({
      message: "تم جلب الإعلانات بنجاح",
      advertisements,
    });
  } catch (error) {
    console.error("خطأ أثناء جلب الإعلانات:", error);
    res.status(500).json({ message: "حدث خطأ أثناء جلب الإعلانات." });
  }
}));



router.get(
  "/get_one/:adId",
  asyncHandler(async (req, res) => {
    try {
      const { adId } = req.params;

      // Find advertisement and populate user information
      const advertisement = await Advertisement.findById(adId)
        .populate({
          path: "users.userId",
          model: User,
          select: "name email", // Adjust fields as necessary
        })
        .exec();

      if (!advertisement) {
        return res.status(404).json({ message: "لم يتم العثور على الإعلان" });
      }

      res.status(200).json({
        message: "تم جلب الإعلان بنجاح",
        advertisement,
      });
    } catch (error) {
      console.error("خطأ أثناء جلب الإعلان:", error);
      res.status(500).json({ message: "حدث خطأ أثناء جلب الإعلان." });
    }
  })
);

router.delete(
  "/delete/:adId",
  asyncHandler(async (req, res) => {
    try {
      const { adId } = req.params;

      // Find and delete the advertisement
      const advertisement = await Advertisement.findByIdAndDelete(adId);

      if (!advertisement) {
        return res.status(404).json({ message: "لم يتم العثور على الإعلان" });
      }

      // Remove the ad reference from all users
      const userUpdates = advertisement.users.map(async (user) => {
        await User.findByIdAndUpdate(
          user.userId,
          { $pull: { ads: { adId } } },
          { new: true }
        );
      });

      await Promise.all(userUpdates);

      res.status(200).json({
        message: "تم حذف الإعلان وجميع المراجع بنجاح",
        advertisement,
      });
    } catch (error) {
      console.error("خطأ أثناء حذف الإعلان:", error);
      res.status(500).json({ message: "حدث خطأ أثناء حذف الإعلان." });
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
          // select: "title description ", // Adjust the fields to return only necessary details
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



router.post(
  "/edit-links/:adId/:userId",
  asyncHandler(async (req, res) => {
    try {
      const { adId, userId } = req.params;
      const { links } = req.body;

      if (!Array.isArray(links)) {
        return res.status(400).json({ message: "يجب إرسال قائمة بالروابط" });
      }

      // Find the advertisement and update the user's links
      const advertisement = await Advertisement.findOneAndUpdate(
        {
          _id: adId,
          "users.userId": userId,
        },
        {
          $set: { "users.$.links": links },
        },
        { new: true }
      );

      if (!advertisement) {
        return res
          .status(404)
          .json({ message: "لم يتم العثور على الإعلان أو المستخدم" });
      }

      // Update the user's links in their profile as well
      await User.findOneAndUpdate(
        { _id: userId, "ads.adId": adId },
        { $set: { "ads.$.links": links } },
        { new: true }
      );

      res.status(200).json({
        message: "تم تحديث الروابط بنجاح",
        advertisement,
      });
    } catch (error) {
      console.error("خطأ أثناء تحديث الروابط:", error);
      res.status(500).json({ message: "حدث خطأ أثناء تحديث الروابط." });
    }
  })
);




router.put(
  "/edit/:adId",
  asyncHandler(async (req, res) => {
    try {
      const { adId } = req.params;
      const { title, users, ...otherData } = req.body;

      // Find the existing advertisement
      const advertisement = await Advertisement.findById(adId);

      if (!advertisement) {
        return res.status(404).json({ message: "لم يتم العثور على الإعلان" });
      }

      // Update advertisement details
      advertisement.title = title || advertisement.title;
      Object.assign(advertisement, otherData);

      if (users && Array.isArray(users)) {
        const existingUsersMap = new Map(
          advertisement.users.map((user) => [
            user.userId.toString(),
            user.links,
          ])
        );

        const updatedUsers = users.map((user) => {
          const userId = typeof user === "string" ? user : user.userId;
          const newLinks = user.links || existingUsersMap.get(userId) || [];

          return { userId, links: newLinks };
        });

        advertisement.users = updatedUsers;

        // Sync user references without creating duplicates
        for (const user of updatedUsers) {
          await User.findByIdAndUpdate(
            user.userId,
            {
              $set: {
                "ads.$[elem].links": user.links || [],
              },
            },
            {
              arrayFilters: [{ "elem.adId": adId }],
              new: true,
              upsert: true,
            }
          );
        }
      }

      // Save the updated advertisement
      const updatedAd = await advertisement.save();

      res.status(200).json({
        message: "تم تعديل الإعلان بنجاح",
        advertisement: updatedAd,
      });
    } catch (error) {
      console.error("خطأ أثناء تعديل الإعلان:", error);
      res.status(500).json({ message: "حدث خطأ أثناء تعديل الإعلان." });
    }
  })
);








export default router;
