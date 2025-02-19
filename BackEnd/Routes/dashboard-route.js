import express from "express";
import { body, validationResult } from "express-validator";
import { protect, authorize } from "../services/authService.js";
import { getCountes } from "../services/dashboard.js";

const router = express.Router();

router.get("/get", getCountes);

export default router;
