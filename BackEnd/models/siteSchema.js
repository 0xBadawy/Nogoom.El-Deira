const siteSchema = new mongoose.Schema({
  _id: { type: String, default: "singleton" }, // Enforce a single record
  mainTitle: { type: String, required: true },
  subTitle: { type: String, required: true },
  adTitle: { type: String, required: true },
  adDescription: { type: String, required: true },
  campaignCount: { type: Number, required: true, default: 0 },
  clientCount: { type: Number, required: true, default: 0 },
  satisfactionRate: { type: Number, required: true, default: 100 },
  viewCount: { type: String, required: true, default: "0" },
  starAd1: { type: String, required: true, default: "" },
  starAd2: { type: String, required: true, default: "" },
  starAd3: { type: String, required: true, default: "" },
  starAd4: { type: String, required: true, default: "" },
  image1: { type: String, default: "" },
  image2: { type: String, default: "" },
});

const Site = mongoose.model("Site", siteSchema);
export default Site;
