import User from "../models/user.js";
import { sendEmail } from "../utils/sendEmail.js";
import { generateToken } from "../utils/signin.js";

export const signup = async (req, res) => {
  try {
    const { email } = req.body;

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        otp,
        otpExpiry: Date.now() + 5 * 60 * 1000
      });
    } else {
      user.otp = otp;
      user.otpExpiry = Date.now() + 5 * 60 * 1000;
      await user.save();
    }

    await sendEmail(email, otp);

    res.json({ message: "OTP sent successfully" });

  } catch (err) {
    res.status(500).json({ message: "Error sending OTP" });
  }
};


export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    res.json({ message: "OTP verified" });

  } catch (err) {
    res.status(500).json({ message: "Error verifying OTP" });
  }
};


export const completeSignup = async (req, res) => {
  try {
    const { email, name, college, passingYear, skills } = req.body;

    const user = await User.findOne({ email });

    user.name = name;
    user.college = college;
    user.passingYear = passingYear;
    user.skills = skills;
    user.isVerified = true;
    user.otp = null;

    await user.save();
    const  token = generateToken(user);
      res.json({ message: "Signup completed", token, user} );

  } catch (err) {
    res.status(500).json({ message: "Error completing signup" });
  }
};


export const login = async (req, res) => {
  try {

    const { email } = req.body;
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