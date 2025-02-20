import Notification from "../models/notificationSchema.js";
import SendedNotification from "../models/sendedNotificationSchema.js";
import User from "../models/userModel.js";

const createNotification = async (
  userId,
  title,
  message,
  messageUserId,
  type = "info"
) => {
  try {
    // Validate title and message
    if (!title || !message) {
      throw new Error("Title and message are required");
    }

    // Check for duplicate notifications (e.g., the same title and message for a user)
    const existingNotification = await Notification.findOne({
      userId,
      title,
      message,
    });
    if (existingNotification) {
      return {
        success: false,
        message: "Duplicate notification. No new notification created.",
      };
    }

    // Create the new notification
    const newNotification = new Notification({
      userId,
      title,
      message,
      messageUserId,
      type,
    });

    await newNotification.save();

    // Optionally, you could send an email or SMS here

    return {
      success: true,
      message: "Notification created successfully",
      notification: newNotification,
    };
  } catch (error) {
    console.error("Error creating notification:", error);
    return {
      success: false,
      message: "Failed to create notification",
      error: error.message,
    };
  }
};

const sendNotificationToRoles = async (
  roles,
  title,
  message,
  messageUserId,
  type = "info"
) => {
  try {
    // console.log("Debugging sendNotificationToRoles", roles, title, message, type);

    const users = await User.find({ role: { $in: roles } });
    if (!users.length) {
      console.log(
        "Debugging sendNotificationToRoles",
        "No users found with roles: ",
        roles
      );
      return {
        success: false,
        message: `No users found with roles: ${roles.join(", ")}`,
      };
    }

    //  console.log("Debugging sendNotificationToRoles", users);
    // Send the notification to each user
    const notifications = [];
    for (const user of users) {
      const result = await createNotification(
        user._id,
        title,
        message,
        messageUserId,
        type
      );
      if (result.success) {
        notifications.push(result.notification);
      }
    }

    //  console.log("Debugging sendNotificationToRoles", notifications);

    return {
      success: true,
      message: `${notifications.length} notifications sent to users with roles: ${roles.join(", ")}`,
      notifications,
    };
  } catch (error) {
    console.error("Error sending notifications to roles:", error);
    return {
      success: false,
      message: "Failed to send notifications",
      error: error.message,
    };
  }
};

const sendNotificationToUsers = async (
  userIds,
  title,
  message,
  messageUserId,
  type = "info"
) => {
  try {
    if (!userIds.length) {
      return {
        success: false,
        message: "User ID list is empty.",
      };
    }

    // تحضير بيانات الإشعارات لكل مستخدم
    const notificationsData = userIds.map((userId) => ({
      userId,
      title,
      message,
      messageUserId,
      type,
    }));

    // إدخال جميع الإشعارات دفعة واحدة لتحسين الأداء
    const notifications = await Notification.insertMany(notificationsData);

    return {
      success: true,
      message: `${notifications.length} notifications sent successfully.`,
      notifications,
    };
  } catch (error) {
    console.error("Error sending notifications to users:", error);
    return {
      success: false,
      message: "Failed to send notifications.",
      error: error.message,
    };
  }
};

// const storeUserSentNotification = async (
//   userId,
//   title,
//   message,
//   sendedUsersId
// ) => {
//   try {
//     if (!userId || !title || !message || !sendedUsersId.length) {
//       return {
//         success: false,
//         message:
//           "All fields (userId, title, message, sendedUsersId) are required.",
//       };
//     }

//     const newNotification = new SendedNotification({
//       userId,
//       title,
//       message,
//       sendedUsersId,
//     });

//     await newNotification.save();

//     return {
//       success: true,
//       message: "Notification stored successfully.",
//       notification: newNotification,
//     };
//   } catch (error) {
//     console.error("Error storing user sent notification:", error);
//     return {
//       success: false,
//       message: "Failed to store notification.",
//       error: error.message,
//     };
//   }
// };




// ✅ دالة لحفظ الإشعار عند الإرسال


const storeUserSentNotification = async (userId, title, message, sendedUsersId) => {
  console.log("storeUserSentNotification", userId, title, message, sendedUsersId);
  try {
    if (!userId || !title || !message || !sendedUsersId.length) {
      return { success: false, message: "كل الحقول مطلوبة." };
    }

    const newNotification = new SendedNotification({ userId, title, message, sendedUsersId });
    await newNotification.save();

    return { success: true, message: "تم إرسال الإشعار بنجاح.", notification: newNotification };
  } catch (error) {
    console.error("خطأ أثناء حفظ الإشعار:", error);
    return { success: false, message: "فشل في إرسال الإشعار.", error: error.message };
  }
};

// ✅ دالة لجلب جميع الإشعارات التي أرسلها مستخدم معين
const getUserSentNotifications = async (userId) => {
  try {
    const notifications = await SendedNotification.find({ userId })
      .populate("sendedUsersId", "name email") // جلب بيانات المستخدمين المستلمين
      .sort({ createdAt: -1 }); // ترتيب حسب الأحدث

    if (!notifications.length) {
      return { success: false, message: "لا يوجد إشعارات مرسلة لهذا المستخدم." };
    }

    return { success: true, message: "تم جلب الإشعارات بنجاح.", notifications };
  } catch (error) {
    console.error("خطأ أثناء جلب الإشعارات:", error);
    return { success: false, message: "فشل في جلب الإشعارات.", error: error.message };
  }
};





export {
  createNotification,
  sendNotificationToRoles,
  sendNotificationToUsers,
  storeUserSentNotification,
  getUserSentNotifications,
};
