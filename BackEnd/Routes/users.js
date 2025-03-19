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
  getUsersAdmin,
  getStarsUsers,
 } from "../services/userService.js";
import { lastSeen, protect } from "../services/authService.js";

const router = express.Router();

router.post("/add_user",lastSeen, createUser);                                       // Create a new user
router.get("/all_users_admin", lastSeen, getUsersAdmin);                                         // Get all users
router.get("/all_users", lastSeen, getUsers);                                         // Get all users
router.get("/user_by_id/:id", lastSeen, getUserById);                                 // Get a user by ID
router.put("/update_user/:id", lastSeen, updateUser);                                 // Update a user by ID
router.delete("/delete_user", lastSeen, deleteUser);                              // Delete a user by ID
router.put("/change_password/:id", lastSeen, changePassword);                         // Change a user's password
router.get("/me", protect, getLoggedInUser, lastSeen, getUserById);            // Get logged-in user's details
router.put("/update_loggedin_user", protect, lastSeen, updateLogedUser);             // Update logged-in user's details

router.get("/stars_users", lastSeen, getStarsUsers);                                         // Get all users

router.get("/", (req, res) => {
  res.send("Heddddddddddddllo, Express!");
});

export default router;