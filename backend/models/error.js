import mongoose from "mongoose";

const errorSchema = new mongoose.Schema({
  
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
  stack: String

}, { timestamps: true });

export default mongoose.model("Error", errorSchema);