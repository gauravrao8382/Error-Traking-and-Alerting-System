import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
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
    minlength: 6
  },

  location: {
    type: String
  },

  experience: {
    type: Number,
    min: 0
  },

  otp: String,
  otpExpiry: Date,

  isVerified: {
    type: Boolean,
    default: false
  },

  projects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
  }]

}, { timestamps: true });

export default mongoose.model("User", userSchema);