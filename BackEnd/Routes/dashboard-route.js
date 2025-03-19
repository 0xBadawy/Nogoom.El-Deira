import express from "express";
import { body, validationResult } from "express-validator";
import { protect, authorize, lastSeen } from "../services/authService.js";
import {
  getCountes,
  fetch,
  update,

} from "../services/dashboard.js";

const router = express.Router();

router.get("/get",lastSeen, getCountes);
router.get("/defult",lastSeen, fetch);
router.post("/update", lastSeen,update);
// router.post("/update-contact", updateContact);
// router.get("/contact", fetchContact);

export default router;
