import nodemailer from "nodemailer";

export const sendEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.BREVO_USER,
        pass: process.env.BREVO_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"Error-Tracker" <${process.env.BREVO_USER}>`,
      to: email,
      subject: "Error-Tracker - OTP Verification",
      text: `Your OTP is: ${otp}`,
    });

    console.log("✅ Email sent successfully:", info.response);

  } catch (error) {
    console.log("❌ EMAIL ERROR:", error.message);
    throw error;
  }
};