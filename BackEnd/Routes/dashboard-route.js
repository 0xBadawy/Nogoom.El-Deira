import express from "express";
import { body, validationResult } from "express-validator";
import { protect, authorize } from "../services/authService.js";
import {
  getSettings,
  updateSettings,
  addSettings,
} from "../services/settings.js";

const router = express.Router();

router.get("/get", getSettings);

export default router;
