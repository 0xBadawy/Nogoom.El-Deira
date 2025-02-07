import mongoose from "mongoose";

const advertisementSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "Unknown",
  },
  description: {
    type: String,
    default: "Unknown",
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    default: Date.now,
  },
  Images: {
    type: Array,
    default: [],
  },
  videos: {
    type: Array,
    default: [],
  },
  address: {
    area: {
      type: String,
      default: "no country",
    },
    govern: {
      type: [String],
      default: [],
    },
  },
  links: {
    type: [
      {
        type: {
          type: String,
          default: "general",
        },
        link: {
          type: String,
          default: "",
        },
      },
    ],
    default: [],
  },
  users: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "user", 
    default: [],
  },
});

const Advertisement = mongoose.model("advertisement", advertisementSchema);

export default Advertisement;
