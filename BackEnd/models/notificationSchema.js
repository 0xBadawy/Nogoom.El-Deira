import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  messageUserId: { type: String ,default: ''},
  createdAt: { type: Date, default: Date.now },
});

const Notification = mongoose.model("notification", notificationSchema);
export default Notification;
