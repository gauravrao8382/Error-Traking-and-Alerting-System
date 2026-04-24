import mongoose from "mongoose";

<<<<<<< HEAD
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
=======
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
>>>>>>> 0f5f3c2ec6ed9ce15abb36f9233fc8f6426f5771

export default mongoose.model("User", userSchema);