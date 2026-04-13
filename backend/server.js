import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(authRoutes);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🌐 Atlas DB connected");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log("Server running on", PORT);
    });

  } catch (err) {
    console.error("❌ DB Error:", err);
    process.exit(1); 
  }
};

startServer();

