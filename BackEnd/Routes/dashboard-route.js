import express from "express";
import { body, validationResult } from "express-validator";
import { protect, authorize } from "../services/authService.js";
import { getCountes, fetch } from "../services/dashboard.js";

const router = express.Router();

router.get("/get", getCountes);
router.get("/defult", fetch);
router.put("/update", update);

export default router;
