import CategoryModel from "../models/category.js";
import UserModal from "../models/userModel.js";
import bcrypt from "bcryptjs";
import {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} from "../services/handler.js";
import asyncHandler from "express-async-handler";
import Settings from "../models/settings.js";


export const getSettings = getAll(Settings);
export const updateSettings = updateOne(Settings); 
export const addSettings = createOne(Settings);
