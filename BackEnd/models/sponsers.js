import mongoose from "mongoose";

const sponserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "Unknown",
    },
    logo: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);
const Sponser = mongoose.model("Sponser", sponserSchema);
export default Sponser;
