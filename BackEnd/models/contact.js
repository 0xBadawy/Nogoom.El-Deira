import mongoose from "mongoose";
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Unknown",
  },
  email: {
    type: String,
    default: "Unknown",
  },
  subject: {
    type: String,
    default: "Unknown",
  },

  message: {
    type: String,
    default: "Unknown",
  },
  readed:{
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
