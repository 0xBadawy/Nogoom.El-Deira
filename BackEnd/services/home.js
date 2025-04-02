import homeModel from "../models/homeSchema.js";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import ApiFeatures from "../utils/apiFeatures.js";
import {
  deleteOne,
  updateOne,
  createOne,
  createHomeHandeler,
  getCurruntUserHomes,
  getOne,
  getAll,
  getAllHomes,
  getOneHomeM,
} from "../services/handler.js";

export const createHome = createHomeHandeler(homeModel);
export const getHomes = getAllHomes(homeModel);
export const getUserHome = getCurruntUserHomes(homeModel);
export const updateHomeDisplay = updateOne(homeModel);
export const getOneHome = getOneHomeM(homeModel);

// asyncHandler(async (req, res, next) => {
//   const id = req.query.id;
 //   const home = await homeModel.findById(id);
//   if (!home) {
//     return next(new ApiError("Home not found", 404));
//   }
//   res.status(200).json({
//     status: "success",
//     data: home,
//   });
// }
// );
