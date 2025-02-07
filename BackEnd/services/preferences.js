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
} from "../services/handler.js";
import { PropertyDeal, PropertyLocation, PropertyType } from "../models/preferences.js";

export const addPreferenceType = asyncHandler(async (req, res, next) => {
  const { name } = req.body;

  // Check if name is provided
  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Type name is required",
    });

  }

  // Create a new type (home type or other type)
  const preference = await PropertyType.create({
    name,
  });

  res.status(201).json({
    success: true,
    data: preference,
  });
});



export const getPreferenceType = asyncHandler(async (req, res, next) => {
  const preference = await PropertyType.find();

  res.status(200).json({
    success: true,
    data: preference,
  });
});

export const addPreferenceLocation = asyncHandler(async (req, res, next) => {
  const { name } = req.body;

  // Check if name is provided
  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Location name is required",
    });
  }

  // Create a new location
  const preference = await PropertyLocation.create({
    name,
  });

  res.status(201).json({
    success: true,
    data: preference,
  });
});

export const getPreferenceLocation = asyncHandler(async (req, res, next) => {
  const preference = await PropertyLocation.find();

  res.status(200).json({
    success: true,
    data: preference,
  });
});


export const addPreferenceDealType = asyncHandler(async (req, res, next) => {
  const { name } = req.body;

  // Check if name is provided
  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Deal type name is required",
    });
  }

  // Create a new deal type
  const preference = await PropertyDeal.create({
    name,
  });

  res.status(201).json({
    success: true,
    data: preference,
  });
});

export const getPreferenceDealType = asyncHandler(async (req, res, next) => {
  const preference = await PropertyDeal.find();

  res.status(200).json({
    success: true,
    data: preference,
  });
});



