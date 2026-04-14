// import nodemailer from "nodemailer";

// export const sendEmail = async (email, otp) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const info = await transporter.sendMail({
//       from: `"Error Tracker" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "Your Verification Code",
//       text: `Your OTP is: ${otp}`, // 🔥 simple rakho
//     });

//     console.log("✅ Email sent:", info.response);
//     return true;

//   } catch (error) {
//     console.log("❌ EMAIL ERROR:", error);
//     return false;
//   }
// };


import axios from "axios";

export const sendEmail = async (email, otp) => {
  try {
    const res = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Error Tracker",
          email: process.env.BREVO_USER,
        },
        to: [{ email }],
        subject: "Your Verification Code",
        htmlContent: `<h2>Your OTP is: ${otp}</h2>`,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Email sent:", res.data);
    return true;

  } catch (error) {
    console.log("❌ EMAIL ERROR:", error.response?.data || error.message);
    return false;
  }
};