import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    _id: { type: String, default: "singleton" }, // Enforce a single record

    phone: { type: String, default: "" },
    email: { type: String, default: "" },
    whatsapp: { type: String, default: "" },
    facebook: { type: String, default: "" },
    instagram: { type: String, default: "" },
    twitter: { type: String, default: "" },
    snapchat: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    youtube: { type: String, default: "" },
    tiktok: { type: String, default: "" },
    telegram: { type: String, default: "" },
    googlePlay: { type: String, default: "" },
    appStore: { type: String, default: "" },
  },
  { timestamps: true }
);

const Contact =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);
export default Contact;
