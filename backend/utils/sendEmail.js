import nodemailer from "nodemailer";
import dns from "dns";

// 🔥 IMPORTANT FIX (Render IPv6 issue)
dns.setDefaultResultOrder("ipv4first");

export const sendEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // STARTTLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Gmail App Password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const info = await transporter.sendMail({
      from: `"Error Tracker" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Error Tracker - Email Verification OTP",
      text: `Your OTP is: ${otp}`,
    });

    console.log("✅ Email sent:", info.response);
    return info;

  } catch (error) {
    console.log("❌ EMAIL ERROR:", error);
    throw error;
  }
};