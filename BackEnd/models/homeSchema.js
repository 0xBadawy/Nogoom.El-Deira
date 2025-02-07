import mongoose from "mongoose";

const homeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    add_Type: {
      type: String,
      // enum: ["sell", "rent", "lease"],
      default: "sell",
    },
    description: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "Unknown",
    },
    propertyType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "propertyType",
      default: null,
    },
    locationCity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "propertyLocation",
      default: null,
    },
    images: {
      type: [String],
      default: [
        "https://firebasestorage.googleapis.com/v0/b/uae-realestate.firebasestorage.app/o/default%2FUntitled%20design%20(1).png?alt=media&token=8de2efd4-2a8b-4009-9cac-50fc15aac769",
      ],
    },
    videos: {
      type: [String],
      default: [
        "https://firebasestorage.googleapis.com/v0/b/uae-realestate.firebasestorage.app/o/default%2Fvideo_1737821797194.mp4?alt=media&token=ea67849e-0159-4a2a-9dae-1fe0001b626c",
      ],
    },
    location: {
      country: {
        type: String,
        default: "Unknown",
      },
      city: {
        type: String,
        default: "Unknown",
      },
      district: {
        type: String,
        default: "Unknown",
      },
      lat: {
        type: Number,
        default: 0,
      },
      lng: {
        type: String,
        default: 0,
      },
      link: {
        type: String,
        default: "",
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    display: {
      type: Boolean,
      default: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    price: {
      amount: {
        type: Number,
        default: 0,
      },
      currency: {
        type: String,
        default: "USD",
      },
    },
    premium: {
      type: Boolean,
      default: false,
    },
    floor_number: {
      type: Number,
      default: 0,
    },
    rooms: {
      type: Number,
      default: 0,
    },
    bathrooms: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Home = mongoose.model("Home", homeSchema);
export default Home;
