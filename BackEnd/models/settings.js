import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      default: "اسم الشركة",
    },
    email: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    whatsapp: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "الرياض، المملكة العربية السعودية",
    },
    workHours: {
      type: String,
      default: "السبت - الخميس: 9 صباحًا - 5 مساءً",
    },

    socialMedia: {
      facebook: {
        type: String,
        default: "https://facebook.com/",
      },
      instagram: {
        type: String,
        default: "https://instagram.com/",
      },
      twitter: {
        type: String,
        default: "https://twitter.com/",
      },
      linkedin: {
        type: String,
        default: "https://linkedin.com/",
      },
    },
  },
  {
    timestamps: true,
  }
);
const Settings = mongoose.model("Settings", settingsSchema);
export default Settings;
