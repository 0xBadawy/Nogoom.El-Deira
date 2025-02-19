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
