import express from "express";
import { body, validationResult } from "express-validator";
import { protect, authorize } from "../services/authService.js";
import { getCountes, fetch, update } from "../services/dashboard.js";

const router = express.Router();

router.get("/get", getCountes);
router.get("/defult", fetch);
router.post("/update", update);

export default router;
