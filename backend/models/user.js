import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // 🔐 Basic Auth
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true,
    minlength: 6
  },

  // 📍 Extra Fields (Step 3)
  location: {
    type: String,
    required: true
  },

  experience: {
    type: Number,
    required: true,
    min: 0
  },

  // 🔢 OTP System
  otp: {
    type: String
  },

  otpExpiry: {
    type: Date
  },

  isVerified: {
    type: Boolean,
    default: false
  },

  // 🧠 Error Tracking System Specific (future use)
  projects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
  }],

}, {
  timestamps: true
});

export default mongoose.model("User", userSchema);