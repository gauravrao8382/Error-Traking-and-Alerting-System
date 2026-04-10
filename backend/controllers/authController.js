import bcrypt from "bcryptjs";

import User from "../models/user.js";
import Project from "../models/project.js";
import Error from "../models/error.js";

import { sendEmail } from "../utils/sendEmail.js";
import { generateToken } from "../utils/signin.js";
import { generateApiKey } from "../utils/generateAPI.js";

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    console.log("Generated OTP:", otp);
    let user = await User.findOne({ email });
    console.log("User found:", user);
    if (!user) {
      user = await User.create({
        email,
        otp,
        otpExpiry: Date.now() + 5 * 60 * 1000
      });
      console.log("New user created:", user);
    } else {
      user.otp = otp;
      user.otpExpiry = Date.now() + 5 * 60 * 1000;
      await user.save();
    }
    console.log("1");
    await sendEmail(email, otp);
    console.log("2");
    res.json({ message: "OTP sent successfully" });

  } catch (err) {
    res.status(500).json({ message: "Error sending OTP" });
  }
};


export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Incorrect OTP" });
    }

    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;

    await user.save();
    res.json({ message: "OTP verified successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error verifying OTP" });
  }
};


export const completeSignup = async (req, res) => {
  try {
    const { email, name, password, location, experience } = req.body;

    // 🔍 check user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔒 check OTP verified
    if (!user.isVerified) {
      return res.status(400).json({ message: "Please verify OTP first" });
    }

    // 🚫 prevent re-signup
    if (user.name) {
      return res.status(400).json({ message: "Signup already completed" });
    }

    // 🔐 hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🧠 update user fields (only schema fields)
    user.name = name;
    user.password = hashedPassword;
    user.location = location;
    user.experience = experience;

    // 🧹 clear OTP
    user.otp = undefined;
    user.otpExpiry = undefined;

    await user.save();

    // 🎟️ generate token
    const token = generateToken(user);

    res.status(200).json({
      message: "Signup completed successfully ✅",
      token,
      user
    });

  } catch (err) {
    res.status(500).json({ message: "Error completing signup" });
  }
};

export const login = async (req, res) => {
  try {

    const { email } = req.body;
    console.log("Login attempt for email:", email);
    const user = await User.findOne({ email });
    if (!user) {
        console.log("User not found");
      return res.status(400).json({ message: "User not found" });
    }

    if (!user.isVerified) {
      return res.status(400).json({ message: "Please verify your email first" });
    }

    const token = generateToken(user);

    res.json({
      message: "Login successful",
      token,
      user
    });

  } catch (err) {
    res.status(500).json({ message: "Login error" });
  }
};

export const getProjects = async (req, res) => {
  try {
    const userId = req.params.userId;
    const projects = await Project.find({ userId });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Error fetching projects" });
  }
};

export const createProject = async (req, res) => {
  try {
    const { name, userId } = req.body;

    const apiKey = generateApiKey(); // 🔥

    const project = await Project.create({
      name,
      userId,
      apiKey
    });

    const projects = await Project.find({ userId });

    // ✅ Step 3: Send all projects
    res.status(201).json(projects);

  } catch (err) {
    res.status(500).json({ message: "Error creating project" });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    // 1️⃣ Delete project
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // // 2️⃣ Delete all related errors
    // await Error.deleteMany({ projectId: project._id });

    res.status(200).json({
      message: "Project & related errors deleted successfully"
    });

  } catch (error) {
    console.error("Delete Project Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const logError = async (req, res) => {
  try {
    const { apiKey,message,source,lineno,colno,stack } = req.body;
    const project = await Project.findOne({ apiKey });
    if (!project) {
      return res.status(400).json({ message: "Invalid API key" });
    }
    const error = await Error.create({
      projectId: project._id,
      message,
      severity: "Low",
      source,
      lineno,
      colno,
      stack
    });
    res.status(201).json({ message: "Error logged successfully", error });
  } catch (err) {
    res.status(500).json({ message: "Error logging error" });
  }
};
   