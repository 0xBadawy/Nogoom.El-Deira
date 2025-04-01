import express from "express";
import { body, validationResult } from "express-validator";
import { protect, authorize } from "../services/authService.js";
import {
  addSponser,
  deleteSponser,
  updateSponser,
  getSponser,
} from "../services/sponser.js";
const router = express.Router();

router.get("/", getSponser);
router.post("/", addSponser);
router.put("/:id", updateSponser);
router.delete("/:id", deleteSponser);



export default router;
