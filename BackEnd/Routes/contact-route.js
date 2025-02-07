import express from "express";
import { body, validationResult } from "express-validator";
import { protect, authorize } from "../services/authService.js";
import {
  sendMessages,
  getMessages,
  updateMessage,
} from "../services/contact.js";

const router = express.Router();

router.post("/send", sendMessages);
router.get("/get", getMessages);
router.put("/update", updateMessage);
// router.post("/addLocation", addPreferenceLocation);
// router.get("/getLocations", getPreferenceLocation);
// router.post("/addDealType", addPreferenceDealType);
// router.get("/getDealTypes", getPreferenceDealType);


export default router;
