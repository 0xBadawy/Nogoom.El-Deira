import express from "express";


import {
  signUp,
  signIn,
  forgotPassword,
  verifyPasswordResetCode,
  resetPassword,
} from "../services/authService.js";

const router = express.Router();


router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/forgotpassword", forgotPassword);
router.post("/verifypasswordresetcode", verifyPasswordResetCode);
router.post("/resetpassword", resetPassword);

// Endpoint to get current user data
// router.get("/me", protect, getMe);


router.get("/", (req, res) => {res.send("Auth Route");
});

export default router;
