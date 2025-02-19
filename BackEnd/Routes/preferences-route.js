import express from "express";
import { body, validationResult } from "express-validator";
import { protect, authorize } from "../services/authService.js";
import {
  addPreferenceType,
  getPreferenceType,
  addPreferenceLocation,
    getPreferenceLocation,
    addPreferenceDealType,
    getPreferenceDealType,
} from "../services/preferences.js";

const router = express.Router();

router.post("/addType", addPreferenceType);
router.get("/getTypes", getPreferenceType);
router.post("/addLocation", addPreferenceLocation);
router.get("/getLocations", getPreferenceLocation);
router.post("/addDealType", addPreferenceDealType);
router.get("/getDealTypes", getPreferenceDealType);


export default router;
