import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import CryptoJS from "crypto-js";
import sendEmail, { sendEmailHTML } from "../utils/sendEmail.js";
import Notification from "../models/notificationSchema.js";
import { sendNotificationToRoles } from "../functions/notification.js";

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
      console.log("UserExists");
      return res.status(400).json({ message: "UserExists" });
    }

    // Password confirmation validation
    if (password !== confirmPassword) {
      console.log("PasswordNotMatch");
      return res.status(400).json({ message: "PasswordNotMatch" });
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

    if (user) console.log("UserCreated", user);
    // const targetUsers = await UserModel.find({
    //   role: { $in: ["admin", "manager", "editor"] },
    // });

    // // Create notifications for users
    // const notifications = targetUsers.map((targetUser) => ({
    //   userId: targetUser._id,
    //   title: "مستخدم جديد",
    //   message: `تمت إضافة المستخدم ${req.body.name} (${req.body.email})`,
    // }));

    // if (notifications.length > 0) {
    //   await Notification.insertMany(notifications);
    // }

    sendNotificationToRoles(
      ["admin", "manager", "editor"],
      "تم إنشاء حساب جديد",
      `قام المستخدم ${req.body.name} (${req.body.email}) بإنشاء حساب جديد.`,
      user._id,
      "newUser"
    );

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
    console.error("Signup Error:", err);
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
    data: user,
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
    await sendEmailHTML({
      email: user.email,
      subject: "رمز إعادة تعيين كلمة المرور - نجوم الديرة",
      message: `
    <html>
      <body style="direction: rtl; text-align: right; font-family: Tahoma, Arial, sans-serif; background-color: #f8f9fa; padding: 20px;">
        <div style="max-width: 500px; margin: auto; background: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #007bff; text-align: center;">إعادة تعيين كلمة المرور</h2>
          <p style="font-size: 16px; color: #333;">مرحبًا <strong>${user.name}</strong>,</p>
          <p style="font-size: 14px; color: #555;">لقد طلبت إعادة تعيين كلمة المرور الخاصة بك على <strong>نجوم الديرة</strong>. يرجى استخدام الرمز أدناه خلال <strong>10 دقائق</strong> لإكمال العملية:</p>
          <div style="text-align: center; margin: 20px 0;">
            <span style="font-size: 20px; font-weight: bold; color: #d32f2f; background: #ffecec; padding: 10px 20px; border-radius: 5px; display: inline-block;">
              ${resetCode}
            </span>
          </div>
          <p style="font-size: 14px; color: #555;">إذا لم تطلب إعادة تعيين كلمة المرور، يمكنك تجاهل هذه الرسالة بأمان.</p>
          <p style="text-align: center; font-size: 14px; color: #777; margin-top: 20px;">شكرًا لاستخدامك <strong>نجوم الديرة</strong>.</p>
        </div>
      </body>
    </html>
  `,
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
  console.log(req.body.email);
  console.log(req.body.password);

  const user = await UserModel.findOne({ email: req.body.email });


  if (!user) {
    return next(new ApiError("No user found with this email", 404));
  }

  if (!user.passwordResetVerified) {
    return next(new ApiError("Password reset code not verified", 400));
  }

  user.password = req.body.password;//await bcrypt.hash(req.body.password, 10);
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
