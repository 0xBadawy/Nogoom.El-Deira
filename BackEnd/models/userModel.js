import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    // userName: {
    //   type: String,
    //   trim: true,
    //   default: "no username",
    //   // unique: [true, "UserName already exists"],

    // },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exists"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      default: "no phone",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    role: {
      type: String,
      enum: ["star", "admin", "manager", "editor", "user"],
      default: "star",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    about: {
      type: String,
      trim: true,
    },
    address: {
      area: {
        type: String,
        default: "no country",
      },
      govern: {
        type: [String],
        default: [],
      },
    },
    social: {
      type: [
        {
          type: {
            type: String,
            default: "general",
          },
          link: {
            type: String,
            default: "",
          },
        },
      ],
      default: [],
    },
    profileImage: {
      type: String,
      default: "https://avatar.iran.liara.run/public/2",
    },
    balance: {
      type: Number,
      default: 50,
    },
    ads: [
      {
        adId: { type: mongoose.Schema.Types.ObjectId, ref: "advertisement" },
        links: [String], // User-specific links for that ad
      },
    ],
    accountType: {
      type: String,
      enum: ["gold", "silver", "bronze", "none"],
      default: "none",
    },

    passwordChangedAt: Date,
    passwordResetCode: String,
    passwordResetExpires: Date,
    passwordResetVerified: Boolean,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("user", userSchema);
export default User;
