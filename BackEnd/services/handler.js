import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import ApiFeatures from "../utils/apiFeatures.js";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";
import mongoose from "mongoose";
import Notification from "../models/notificationSchema.js";
import {
  createNotification,
  sendNotificationToRoles,
} from "../functions/notification.js";

export const deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const categoryId = req.query.id;
    console.log("req", categoryId);
    const category = await Model.findByIdAndDelete(categoryId);

    if (!category) return next(new ApiError("Category not found", 404));
    res.status(204).json({ status: "success", data: null });
  });


  export const deleteOneParam = (Model) =>
    asyncHandler(async (req, res, next) => {
      const { id } = req.params;
      console.log("req", id);
      const category = await Model.findByIdAndDelete(id);

      if (!category) return next(new ApiError("Category not found", 404));
      res.status(204).json({ status: "success", data: null });
    });

// export const updateOne = (Model) =>
//   asyncHandler(async (req, res, next) => {
//     console.log("Request Params:", req.params); // Debugging
//     console.log("Request Body:", req.body); // Debugging
//     // console.log("ID:", id);
//     console.log("Body:", req.body);
//     console.log("Headers:", req.headers);
//     console.log("Original URL:", req.originalUrl);

//     const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });

//     if (!doc) {
//       return next(
//         new ApiError(`No document found with that id => ${req.params.id}`, 404)
//       );
//     }

//     res.status(200).json({
//       status: "success",
//       data: doc,
//     });
//   });

export const updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const id = req.query.id;

    // Debugging
    console.log("Request ID:", id);
    console.log("Request Body:", req.body);

    if (!id) {
      return next(new ApiError("No ID provided", 400));
    }

    // Validate the ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ApiError(`Invalid ID format: ${id}`, 400));
    }

    const doc = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new ApiError(`No document found with that id => ${id}`, 404));
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

export const updateOneParam = (Model) =>
  asyncHandler(async (req, res, next) => {
    // console.log("Model ////////////  ");

    const id = req.params.id;

    // check if the Model is UserModal
    if (Model === UserModel) {
      console.log("Model is UserModel");
      // check if the update in user balance
      if (req.body.balance) {
        const user = await UserModel.findById(id);

        if (!user) {
          return next(new ApiError(`No user found with that id => ${id}`, 404));
        }
        const oldBalance = user.balance;
        const newBalance = req.body.balance;
        const balanceDifference = newBalance - oldBalance;

        let message = "";
        if (balanceDifference > 0) {
          message = `تم إيداع مبلغ ${balanceDifference} ريال. رصيدك الحالي هو ${newBalance} ريال.`;
        } else {
          message = `تم سحب مبلغ ${Math.abs(balanceDifference)} ريال. رصيدك الحالي هو ${newBalance} ريال.`;
        }

        createNotification(
          user._id,
          "تم تحديث الرصيد",
          message,
          user._id,
          "balance"
        );
      }
    }

    // Debugging
    console.log("Request ID:", id);
    console.log("Request Body:", req.body);

    if (!id) {
      return next(new ApiError("No ID provided", 400));
    }

    // Validate the ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ApiError(`Invalid ID format: ${id}`, 400));
    }

    const doc = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new ApiError(`No document found with that id => ${id}`, 404));
    }

    console.log("Document: ---------- ", doc);

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

// const updateHomeDisplay = (Model) =>
//   asyncHandler(async (req, res, next) => {
//     try {
//       const token = req.headers.authorization.split(" ")[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       const user = await UserModel.findById(decoded.userId);
//       const home = await Model.findById(req.params.id);
//       if (!home) {
//         return res
//           .status(404)
//           .json({ status: "error", message: "Home not found" });
//       }
//       if (home.owner.toString() !== user._id.toString()) {
//         return res
//           .status(403)
//           .json({ status: "error", message: "Forbidden: You can't update this home" });
//       }
//       const updatedHome = await Model.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//         runValidators: true,
//       });
//       res.json({

// export const createOne = (Model) =>
//   asyncHandler(async (req, res, next) => {
//     const doc = await Model.create(req.body);

//     res.status(201).json({
//       status: "success",
//       data: doc,
//     });
//   });

export const createOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    try {
      console.log("Request Body:", req.body); // Log the incoming data
      const doc = await Model.create(req.body);
      console.log("Document Created:", doc); // Log the created document
      res.status(201).json({
        status: "success",
        data: doc,
      });
    } catch (err) {
      console.error("Error in createOne:", err); // Log the error details
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  });

export const createOneUser = (Model) =>
  asyncHandler(async (req, res, next) => {
    try {
      console.log("Request Body:", req.body); // Log the incoming data
      const doc = await Model.create(req.body);
      console.log("Document Created:", doc); // Log the created document
      res.status(201).json({
        status: "success",
        data: doc,
      });

      //  const targetUsers = await Model.find({
      //    role: { $in: ["admin", "manager", "editor"] },
      //  });

      //  // إنشاء إشعارات للمستخدمين
      //  const notifications = targetUsers.map((user) => ({
      //    userId: user._id,
      //    title: "مستخدم جديد",
      //    message: `تمت إضافة المستخدم ${req.body.name} (${req.body.email})`,
      //  }));
      //  console.log("Notifications:", notifications);

      //  // حفظ الإشعارات في قاعدة البيانات
      //  await Notification.insertMany(notifications);

      // sendNotificationToRoles(
      //   ["admin", "manager", "editor"],
      //   "مستخدم جديد",
      //   `تمت إضافة المستخدم ${req.body.name} (${req.body.email})`,
      //   doc._id,
      //   "newAdmin"
      // );
    } catch (err) {
      console.error("Error in createOne:", err); // Log the error details
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  });

export const createHomeHandeler = (Model) =>
  asyncHandler(async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await UserModel.findById(decoded.userId);
      console.log("Request Body:", req.body); // Log the incoming data
      const body = req.body;
      body.owner = user._id;
      const doc = await Model.create(body);
      console.log("Document Created:", doc); // Log the created document
      res.status(201).json({
        status: "success",
        data: doc,
      });
    } catch (err) {
      console.error("Error in createOne:", err); // Log the error details
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  });

export const getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    // console.log("Request ID:", id);
    const doc = await Model.findById(id);
    // console.log("Document:", doc);
    if (!doc) {
      return next(new ApiError(`No document found with that id => ${id}`, 404));
    }

    res.status(200).json({ status: "success", data: doc });
  });

export const getOneHomeM = (Model) =>
  asyncHandler(async (req, res, next) => {
    try {
      // const { id } = req.params;
      const id = req.query.id;

      // console.log("Request ID:", id);
      // Validate MongoDB ObjectId format
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ApiError(`Invalid ID format: ${id}`, 400));
      }

      // Fetch document by ID
      const document = await Model.findById(id)
        .populate("propertyType")
        .populate("locationCity")
        .populate("owner");
      // console.log("Document  :", document);

      // Handle not found case
      if (!document) {
        return next(new ApiError(`No document found with ID: ${id}`, 404));
      }

      // Respond with success
      res.status(200).json({
        status: "success",
        data: document,
      });
    } catch (error) {
      // Log server errors for debugging
      console.error("Error fetching document:", error);
      return next(new ApiError("Internal server error", 500));
    }
  });

export const getAll = (Model) =>
  asyncHandler(async (req, res, next) => {
    const apiFeatures = new ApiFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .search()
      .paginate();

    const { mongooseQuery, paginationResult } = apiFeatures;
    const category = await mongooseQuery;
    res.json({
      paginationResult,
      results: category.length,
      data: category,
    });
  });

export const getAllAdmins = (Model) =>
  asyncHandler(async (req, res, next) => {
    const apiFeatures = new ApiFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .search()
      .paginate();

    const { mongooseQuery, paginationResult } = apiFeatures;
    const category = await mongooseQuery;
    res.json({
      paginationResult,
      results: category.length,
      data: category,
    });
  });

export const getCurruntUserHomes = (Model) =>
  asyncHandler(async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res
          .status(401)
          .json({ status: "error", message: "Unauthorized: Token missing" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await UserModel.findById(decoded.userId);
      if (!user) {
        return res
          .status(404)
          .json({ status: "error", message: "User not found" });
      }

      const homes = await Model.find({ owner: user._id })
        .populate("propertyType")
        .populate("locationCity")
        .populate("owner");

      res.json({
        status: "success",
        data: homes,
      });
    } catch (err) {
      console.error("Error in getCurruntUserHomes:", err);
      res.status(500).json({
        status: "error",
        message: err.message || "Internal Server Error",
      });
    }
  });

export const getAllHomes = (Model) =>
  asyncHandler(async (req, res, next) => {
    const apiFeatures = new ApiFeatures(
      Model.find()
        .populate("propertyType")
        .populate("locationCity")
        .populate("owner"),

      req.query
    )
      .filter()
      .sort()
      .limitFields()
      .search()
      .paginate();

    const { mongooseQuery, paginationResult } = apiFeatures;
    const category = await mongooseQuery;
    res.json({
      paginationResult,
      results: category.length,
      data: category,
    });
  });
