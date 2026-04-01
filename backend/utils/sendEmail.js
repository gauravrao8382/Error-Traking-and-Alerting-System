import nodemailer from "nodemailer";
export const sendEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    });

    const info = await transporter.sendMail({
      from: `"Collab-Hub" <${process.env.EMAIL_USER}>`, // ✅ FIXED
      to: email,
      subject: "Collab-Hub - Email Verification OTP",
      text: `Your OTP is: ${otp}`
    });

    console.log("✅ Email sent:", info.response);

  } catch (error) {
    console.log("❌ EMAIL ERROR:", error); // 🔥 THIS WILL SHOW REAL ISSUE
    throw error;
  }
};