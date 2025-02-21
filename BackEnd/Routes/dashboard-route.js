import express from "express";
import { body, validationResult } from "express-validator";
import { protect, authorize } from "../services/authService.js";
import {
  getCountes,
  fetch,
  update,

} from "../services/dashboard.js";

const router = express.Router();

router.get("/get", getCountes);
router.get("/defult", fetch);
router.post("/update", update);
// router.post("/update-contact", updateContact);
// router.get("/contact", fetchContact);

export default router;
