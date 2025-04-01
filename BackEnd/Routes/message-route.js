import express from "express";
import { body, validationResult } from "express-validator";
import { protect, authorize } from "../services/authService.js";
import {
  addMessage,
  deleteMessage,
  updateMessage,
  getMessage,
} from "../services/message.js";
const router = express.Router();

router.get("/", getMessage);
router.post("/", addMessage);
router.put("/:id", updateMessage);
router.delete("/:id", deleteMessage);



export default router;
