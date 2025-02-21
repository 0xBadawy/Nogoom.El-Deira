import CategoryModel from "../models/category.js";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import ApiFeatures from "../utils/apiFeatures.js";
import {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} from "../services/handler.js";
import Advertisement from "../models/advertisementSchema.js";
import User from "../models/userModel.js";
import Site from "../models/siteSchema.js";


export const getCountes = asyncHandler(async (req, res, next) => {
  const advertisementCount = await Advertisement.countDocuments();
  const userCount = await User.countDocuments();

  res.status(200).json({
    status: "success",
    data: {
      advertisementCount,
      userCount,
    },
  });
} );




export const fetch = asyncHandler(async (req, res) => {
  try {
    const site = await Site.findOne(); // Get the only record
    if (!site) {
      return res.status(404).json({ message: "No site data found." });
    }
    res.json(site);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});


export const update = asyncHandler(async (req, res) => {
  console.log("req.body ------------ ", req.body);

  try {
    // تحويل القيم النصية إلى أرقام عند الحاجة
    const updatedData = {
      ...req.body,
      campaignCount: Number(req.body.campaignCount) || 0,
      clientCount: Number(req.body.clientCount) || 0,
      satisfactionRate: Number(req.body.satisfactionRate) || 100,
      viewCount: Number(req.body.viewCount) || 0,
    };

    const updatedSite = await Site.findOneAndUpdate(
      {}, // لا يوجد فلتر، لذا سيتم تحديث أول مستند
      updatedData,
      { upsert: true, new: true }
    );

    res.json(updatedSite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});




