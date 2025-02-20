import mongoose from "mongoose";

const sendedNotificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  sendedUsersId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  }],
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const SendedNotification = mongoose.model(
  "sendedNotification",
  sendedNotificationSchema
);
export default SendedNotification;
