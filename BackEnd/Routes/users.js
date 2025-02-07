import express from "express";


import {
  getUsers,
  createUser,
  getUserById,
  deleteUser,
  updateUser,
  changePassword,
  getLoggedInUser,
  updateLogedUser,
} from "../services/userService.js";
import { protect } from "../services/authService.js";

const router = express.Router();

router.post("/add_user", createUser);                                       // Create a new user
router.get("/all_users", getUsers);                                         // Get all users
router.get("/user_by_id/:id", getUserById);                                 // Get a user by ID
router.put("/update_user/:id", updateUser);                                 // Update a user by ID
router.delete("/delete_user/:id", deleteUser);                              // Delete a user by ID
router.put("/change_password/:id", changePassword);                         // Change a user's password
router.get("/me", protect, getLoggedInUser, getUserById);            // Get logged-in user's details
router.put("/update_loggedin_user", protect, updateLogedUser);             // Update logged-in user's details

router.get("/", (req, res) => {
  res.send("Heddddddddddddllo, Express!");
});

export default router;