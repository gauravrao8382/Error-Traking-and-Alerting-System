import nodemailer from "nodemailer";

export const sendEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"Error Tracker" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Verification Code",
      text: `Your OTP is: ${otp}`, // 🔥 simple rakho
    });

    console.log("✅ Email sent:", info.response);
    return true;

  } catch (error) {
    console.log("❌ EMAIL ERROR:", error);
    return false;
  }
};