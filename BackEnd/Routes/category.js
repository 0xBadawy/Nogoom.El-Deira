import express from "express";
import {
  createCategory,
  getCategories,
  deleteCategory,
  updateCategory,
  getCategoryById,
} from "../services/catagory.js";
import { body, validationResult } from "express-validator";
import { protect, authorize } from "../services/authService.js";

const router = express.Router();

router.post("/add_cat", protect,authorize( "user")  , createCategory);
router.get("/get_cat", getCategories);
router.get("/get_one_cat/:id", getCategoryById);

router.delete("/delete_cat", deleteCategory);
router.put("/update_cat/:id", updateCategory);


export default router;

// admin   adsssmin@example.com  adminadmin
