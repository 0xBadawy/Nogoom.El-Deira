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


export const update = asyncHandler( async (req, res) => {
  try {
    const updatedSite = await Site.findOneAndUpdate(
      {}, // No filter, so it updates the first document
      req.body, // New data from request
      { upsert: true, new: true } // Create if not exists, return updated
    );
    res.json(updatedSite);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});




export default router;


