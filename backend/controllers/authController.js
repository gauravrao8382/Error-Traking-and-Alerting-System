import bcrypt from "bcryptjs";

import User from "../models/user.js";
import { sendEmail } from "../utils/sendEmail.js";
import { generateToken } from "../utils/signin.js";

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