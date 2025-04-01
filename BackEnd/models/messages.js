import mongoose from "mongoose";

const MessagesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "Unknown",
    },
    description: {
      type: String,
      default: "",
    },
    rating: {
      type: Number,
      default: 0,
    },
    

    

  },
  {
    timestamps: true,
  }
);
const Messages = mongoose.model("Messages", MessagesSchema);
export default Messages;
