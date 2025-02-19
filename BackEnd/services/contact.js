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
import Contact from "../models/contact.js";

// export const getUsers = getAll(UserModal);
// export const createUser = createOne(UserModal);
// export const getUserById = getOne(UserModal);
// export const deleteUser = deleteOne(UserModal);


export const sendMessages = createOne(Contact);
export const getMessages = getAll(Contact);
export const updateMessage = updateOne(Contact); 