
import axios from "axios";

export const sendEmail = async (email, otp) => {
  try {
    console.log("API KEY:", process.env.BREVO_API_KEY);
    
    // ✅ Professional OTP Email HTML Template
    const emailHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Verify Email</title>
      <style>
        body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f4f6f9; }
        .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #4361ee, #3a0ca3); padding: 30px 20px; text-align: center; }
        .header h1 { margin: 0; color: #fff; font-size: 24px; font-weight: 600; }
        .header p { margin: 8px 0 0; color: rgba(255,255,255,0.9); font-size: 14px; }
        .content { padding: 40px 30px; text-align: center; }
        .content h2 { margin: 0 0 15px; color: #1a1a2e; font-size: 22px; }
        .content p { margin: 0 0 25px; color: #555; font-size: 15px; line-height: 1.6; }
        .otp-box { background: #f8f9fc; border: 2px dashed #4361ee; border-radius: 10px; padding: 20px; margin: 25px 0; display: inline-block; }
        .otp-code { font-size: 32px; font-weight: 700; letter-spacing: 8px; color: #3a0ca3; font-family: monospace; }
        .note { background: #eef7ff; border-left: 4px solid #4361ee; padding: 12px 15px; border-radius: 0 8px 8px 0; margin: 20px 0; text-align: left; font-size: 13px; color: #444; }
        .footer { background: #f8f9fc; padding: 20px; text-align: center; font-size: 12px; color: #888; border-top: 1px solid #eee; }
        .footer a { color: #4361ee; text-decoration: none; }
        @media (max-width: 600px) {
          .container { margin: 20px; border-radius: 10px; }
          .content { padding: 30px 20px; }
          .otp-code { font-size: 28px; letter-spacing: 5px; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔐 Error Tracker</h1>
          <p>Email Verification</p>
        </div>
        <div class="content">
          <h2>Verify Your Email Address</h2>
          <p>Hello,</p>
          <p>Please use the One-Time Password (OTP) below to verify your email address.</p>
          
          <div class="otp-box">
            <div class="otp-code">${otp}</div>
          </div>
          
          <p><strong>This OTP is valid for 5 minutes.</strong></p>
          
          <div class="note">
            💡 <strong>Tip:</strong> If you didn't request this code, please ignore this email. Your account remains secure.
          </div>
          
          <p style="margin-top: 30px; font-size: 14px; color: #666;">
            Having trouble? <a href="mailto:support@errortracker.com" style="color: #4361ee;">Contact Support</a>
          </p>
        </div>
        <div class="footer">
          <p>© 2026 Error Tracker. All rights reserved.</p>
          <p><a href="#">Privacy Policy</a> • <a href="#">Terms of Service</a></p>
        </div>
      </div>
    </body>
    </html>
    `;

    const res = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Error Tracker",
          email: process.env.BREVO_USER,
        },
        to: [{ email }],
        subject: "🔐 Your Verification Code - Error Tracker",
        htmlContent: emailHTML,
        textContent: `Your OTP is: ${otp}\n\nThis code is valid for 10 minutes. If you didn't request this, please ignore.`,
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