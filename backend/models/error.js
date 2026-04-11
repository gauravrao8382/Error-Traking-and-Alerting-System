import mongoose from "mongoose";

const errorSchema = new mongoose.Schema({
  userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true
  },
  
  message: {
    type: String,
    required: true
  },

  severity: {
    type: String,
    enum: ["Low", "Medium", "High", "Critical"],
    default: "Low"
  },
  source: String,
  lineno: Number,
  colno: Number,
  stack: String,
  status: {
    type: String,
    enum: ["Active", "Resolved"],
    default: "Active"
  }

}, { timestamps: true });

export default mongoose.model("Error", errorSchema);