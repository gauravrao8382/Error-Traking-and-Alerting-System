import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    otp: {
      type: String,
    },
    otpExpiry: {
      type: Date,
    },

    name: {
      type: String,
      trim: true,
    },

    password: {
      type: String,
      minlength: 6,
    },

    userType: {
      type: String,
      enum: ["student", "employee"],
      default: "student",
    },

    college: {
      type: String,
      trim: true,
    },

    course: {
      type: String,
      trim: true,
    },

    company: {
      type: String,
      trim: true,
    },

    experience: {
      type: Number, // years
    },

    address: {
      type: String,
      trim: true,
    },

    // 🔐 Extra useful fields
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // ✅ createdAt, updatedAt auto milenge
  }
);

export default mongoose.model("User", userSchema);