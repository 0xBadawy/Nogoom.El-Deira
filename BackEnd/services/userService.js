import CategoryModel from "../models/category.js";
import UserModal from "../models/userModel.js";
import bcrypt from "bcryptjs";
import {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
  createOneUser,
  updateOneParam,
  getAllAdmins,
} from "../services/handler.js";
import asyncHandler from "express-async-handler";

export const getUsers = getAll(UserModal);
export const getUsersAdmin = getAllAdmins(UserModal);
export const createUser = createOneUser(UserModal);
export const getUserById = getOne(UserModal);
export const deleteUser = deleteOne(UserModal);

export const updateUser = updateOneParam(UserModal);

export const changePassword = async (req, res, next) => {
  try {
    const doc = await UserModal.findOneAndUpdate(
      { _id: req.params.id }, // Use an object with `_id`
      { password: await bcrypt.hash(req.body.password, 10) },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!doc) {
      return next(
        new ApiError(`No document found with that id => ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  } catch (error) {
    next(error); // Pass errors to your error-handling middleware
  }
};

export const getLoggedInUser = asyncHandler(async (req, res, next) => {
  req.params.id = req.user.id;

  const user = await UserModal.findByIdAndUpdate(
    req.user.id,
    { lastSeen: Date.now() },
    { new: true }
  );
 
  next();
});






export const updateLogedUser = asyncHandler(async (req, res, next) => {
  const user = await UserModal.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.selectedAddress,
      profileImage: req.body.profilePicture,
      social: req.body.socialLinks,
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: user,
  });
});

export const getStarsUsers = asyncHandler(async (req, res, next) => {
  const users = await UserModal.find({ role: "star", verified: true });
  res.status(200).json({
    status: "success",
    data: users,
  });
});
