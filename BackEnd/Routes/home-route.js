import express from "express";
import { body, validationResult } from "express-validator";
import { protect, authorize } from "../services/authService.js";
import {
  createHome,
  getUserHome,
  getHomes,
  updateHomeDisplay,
  getOneHome,
} from "../services/home.js";

const router = express.Router();

router.post("/add_home", createHome);
router.get("/get_user_home", getUserHome);
router.get("/get_all_home", getHomes);
router.put("/update_home", updateHomeDisplay);
router.get("/get_home_by_id", getOneHome);





export default router;
"67962ca64e8491ad2d57ba6b";