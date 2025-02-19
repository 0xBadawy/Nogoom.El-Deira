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


export const getCategories = getAll(CategoryModel);
export const createCategory = createOne(CategoryModel);
export const getCategoryById = getOne(CategoryModel);
export const deleteCategory = deleteOne(CategoryModel);
export const updateCategory = updateOne(CategoryModel);