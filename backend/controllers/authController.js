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
//middleware
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
<<<<<<< HEAD
    const { email, name, password, location, experience } = req.body;
=======
    const {
      email,
      name,
      password,
      userType,
      college,
      course,
      company,
      experience,
      address,
    } = req.body;
>>>>>>> 0f5f3c2ec6ed9ce15abb36f9233fc8f6426f5771

    // 🔍 check user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

<<<<<<< HEAD
    // 🔒 check OTP verified
=======
>>>>>>> 0f5f3c2ec6ed9ce15abb36f9233fc8f6426f5771
    if (!user.isVerified) {
      return res.status(400).json({ message: "Please verify OTP first" });
    }

<<<<<<< HEAD
    // 🚫 prevent re-signup
=======
>>>>>>> 0f5f3c2ec6ed9ce15abb36f9233fc8f6426f5771
    if (user.name) {
      return res.status(400).json({ message: "Signup already completed" });
    }

<<<<<<< HEAD
    // 🔐 hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🧠 update user fields (only schema fields)
    user.name = name;
    user.password = hashedPassword;
    user.location = location;
    user.experience = experience;

    // 🧹 clear OTP
=======
    const hashedPassword = await bcrypt.hash(password, 10);

    user.name = name;
    user.password = hashedPassword;
    user.userType = userType;
    user.college = college;
    user.course = course;
    user.company = company;
    user.experience = experience;
    user.address = address;
>>>>>>> 0f5f3c2ec6ed9ce15abb36f9233fc8f6426f5771
    user.otp = undefined;
    user.otpExpiry = undefined;

    await user.save();

<<<<<<< HEAD
    // 🎟️ generate token
=======
>>>>>>> 0f5f3c2ec6ed9ce15abb36f9233fc8f6426f5771
    const token = generateToken(user);

    res.status(200).json({
      message: "Signup completed successfully ✅",
      token,
<<<<<<< HEAD
      user
=======
      user,
>>>>>>> 0f5f3c2ec6ed9ce15abb36f9233fc8f6426f5771
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error completing signup" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login attempt for email:", email);

<<<<<<< HEAD
    const { email } = req.body;
    console.log("Login attempt for email:", email);
=======
>>>>>>> 0f5f3c2ec6ed9ce15abb36f9233fc8f6426f5771
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (!user.isVerified) {
      return res.status(400).json({ message: "Please verify your email first" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.json({
      message: "Login successful",
      token,
      user
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Login error" });
  }
};


export const updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const {
      name,
      userType,
      college,
      course,
      company,
      experience,
      address,
    } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.userType = userType || user.userType;

    if (userType === "student") {
      user.college = college;
      user.course = course;
      user.company = undefined;
      user.experience = undefined;
    }

    if (userType === "employee") {
      user.company = company;
      user.experience = experience;
      user.college = undefined;
      user.course = undefined;
    }

    user.address = address || user.address;

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully ✅",
      user,
    });

  } catch (err) {
    console.error("Update Profile Error:", err);
    res.status(500).json({ message: "Server error" });
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

    const apiKey = generateApiKey(); 

    const project = await Project.create({
      name,
      userId,
      apiKey
    });

    const projects = await Project.find({ userId });

    res.status(201).json(projects);

  } catch (err) {
    res.status(500).json({ message: "Error creating project" });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    await Error.deleteMany({ projectId: project._id });

    res.status(200).json({
      message: "Project & related errors deleted successfully"
    });

  } catch (error) {
    console.error("Delete Project Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserErrors = async (req, res) => {
  try {
    const { userId } = req.params;

    const userErrors = await Error.find({ userId });

    res.json(userErrors);

  } catch (err) {
    console.error("Error fetching errors:", err);
    res.status(500).json({ message: "Error fetching errors" });
  }
};

export const getErrors = async (req, res) => {
  try {
    const { projectId } = req.params;
    const errors = await Error.find({ projectId });
    res.json(errors);
  } catch (err) {
    res.status(500).json({ message: "Error fetching errors" });
  }
};

export const logError = async (req, res) => {
  try {
    const { apiKey, message, source, lineno, colno, stack } = req.body;

    const project = await Project.findOne({ apiKey });
    if (!project) {
      return res.status(400).json({ message: "Invalid API key" });
    }
    const existingError = await Error.findOne({
      projectId: project._id,
      message,
      source,
      lineno,
      colno
    });

    if (existingError) {
      existingError.count = (existingError.count || 1) + 1;
      existingError.status = "Active";
      project.activeErrors = (project.activeErrors || 0) + 1;
      project.resolvedErrors = Math.max(0, project.resolvedErrors || 0 - 1);
      await existingError.save();
      await project.save();
      return res.status(200).json({
        message: "Existing error updated",
        error: existingError
      });
    }

    const userId= project.userId;
    const error = await Error.create({
      userId,
      projectId: project._id,
      message,
      severity: "Low",
      source,
      lineno,
      colno,
      stack,
      count: 1
    });
   
    project.totalErrors = (project.totalErrors || 0) + 1;
    project.activeErrors = (project.activeErrors || 0) + 1;
    await project.save();
    res.status(201).json({
      message: "New error logged",
      error
    });

  } catch (err) {
    res.status(500).json({ message: "Error logging error" });
  }
};

export const resolveError = async (req, res) => {
  try {
    const { id } = req.params;  
    const error = await Error.findById(id);

    if (!error) {
      return res.status(404).json({ message: "Error not found" });
    }
    error.status = "Resolved";
    await error.save();

    const project = await Project.findById(error.projectId);
    if (project) {
      project.activeErrors = Math.max(0, project.activeErrors - 1);
      project.resolvedErrors = (project.resolvedErrors || 0) + 1;
      await project.save();
    }
    res.status(200).json({ message: "Error resolved successfully" });
  } catch (error) {
    console.error("Resolve Error Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Change Password Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};  

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    console.error("Reset Password Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

