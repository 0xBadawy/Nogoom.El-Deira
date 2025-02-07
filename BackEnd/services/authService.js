import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import CryptoJS from "crypto-js";
import sendEmail from "../utils/sendEmail.js";
import Notification from "../models/notificationSchema.js";

// Helper function to generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// SignUp function
export const signUp = asyncHandler(async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      confirmPassword,
      phone,
      social,
      profileImage,
      about,
      address = {},
    } = req.body;

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "UserExists" });
    }

    // Password confirmation validation
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "PasswordNotMatch" });
    }

    // Create user
    const user = await UserModel.create({
      name,
      email,
      password,
      phone: phone || "no phone",
      social,
      profileImage,
      about,
      address: {
        area: address.area || "no country",
        govern: address.govern || [],
      },
    });

    const targetUsers = await UserModel.find({
      role: { $in: ["admin", "manager", "editor"] },
    });

    // Create notifications for users
    const notifications = targetUsers.map((targetUser) => ({
      userId: targetUser._id,
      title: "مستخدم جديد",
      message: `تمت إضافة المستخدم ${req.body.name} (${req.body.email})`,
    }));

    if (notifications.length > 0) {
      await Notification.insertMany(notifications);
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      status: "success",
      token,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(new ApiError(err.message || "حدث خطأ أثناء معالجة الطلب", 500));
  }
});



// SignIn function
export const signIn = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;

  // Find user by email
  const user = await UserModel.findOne({ email });
  console.log("user", user);
  if (!user) {
    return next(new ApiError("Invalid email or password 1", 401));
  }

  // Compare the provided password with the stored hashed password
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return next(new ApiError("Invalid email or password 2", 401));
  }

  // Generate token
  const token = generateToken(user._id);

  res.status(200).json({
    status: "success",
    token,
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

// protected route

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ApiError("Not authorized to access this route", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(decoded.userId);

    if (!user) {
      return next(new ApiError("No user found with this id", 404));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new ApiError("Not authorized to access this route", 401));
  }
});

// authorize route

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError("You are not authorized to access this route", 403)
      );
    }
    next();
  };
};


export const forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findOne({ email: req.body.email });

  if (!user) {
    return next(new ApiError("No user found with this email", 404));
  }

  const resetCode = Math.floor(100000 + Math.random() * 900000);
  const hashedResetCode = CryptoJS.SHA256(resetCode.toString()).toString(
    CryptoJS.enc.Hex
  );
  user.passwordResetCode = hashedResetCode;
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  user.passwordResetVerified = false;
  await user.save();

  try {
    await sendEmail({
      email: user.email,
      subject: "Password reset code",
      message: ` Hi ${user.name}, \n
    Your password reset code will expire in 10 minutes. \n     
    Your password reset code is ${resetCode}`,
    });
  } catch (error) {
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetVerified = false;
    await user.save();
    return next(new ApiError("Email could not be sent", 500));
  }

  res.status(200).json({
    status: "success",
    message: "Password reset code sent to your email",
  });
});

export const verifyPasswordResetCode = asyncHandler(async (req, res, next) => {
  const hashedResetCode = CryptoJS.SHA256(
    req.body.resetCode.toString()
  ).toString(CryptoJS.enc.Hex);
  const user = await UserModel.findOne({
    passwordResetCode: hashedResetCode,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ApiError("Invalid reset code or expired", 400));
  }

  user.passwordResetVerified = true;
  // user.password = await bcrypt.hash(req.body.password, 10);
  await user.save();

  res.status(200).json({
    status: "success",
    message: "Password reset successful",
  });
});

export const resetPassword = asyncHandler(async (req, res, next) => {

  const user = await UserModel.findOne({ email: req.body.email });
   
  if (!user) {
    return next(new ApiError("No user found with this email", 404));
  }

  if (!user.passwordResetVerified) {
    return next(new ApiError("Password reset code not verified", 400));
  }

  user.password = await bcrypt.hash(req.body.password, 10);
  user.passwordResetCode = undefined;
  user.passwordResetExpires = undefined;
  user.passwordResetVerified = false;
  await user.save();  


  const token = generateToken(user._id);

  res.status(200).json({
    status: "success",
    token,
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});



// {
//         "email": "mohmaaaaed222@ssqmm.com",
//   "password": "userpassword123"

//     }