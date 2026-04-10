import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    // 👤 kis user ka project hai
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // 📛 project ka naam
    name: {
      type: String,
      required: true,
      trim: true
    },
    // 🔑 API Key (IMPORTANT)
    apiKey: {
      type: String,
      required: true,
      unique: true
    },
    color:{
      type: String
    },
    totalErrors: {
      type: Number,
      default: 0
    },
    activeErrors: {
      type: Number,
      default: 0
    },
    resolvedErrors: {
      type: Number,
      default: 0
    }

  },
  {
    timestamps: true // createdAt, updatedAt auto
  }
);

export default mongoose.model("Project", projectSchema);