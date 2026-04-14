import nodemailer from "nodemailer";
import dns from "dns";

dns.setDefaultResultOrder("ipv4first");

export const sendEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false, // TLS
      auth: {
        user: process.env.BREVO_USER,
        pass: process.env.BREVO_PASS,
      },
    });

    // 🎨 Professional Email HTML Template
    const emailHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OTP Verification</title>
      </head>
      <body style="margin:0;padding:0;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background-color:#f5f5f5;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f5f5f5;padding:20px;">
          <tr>
            <td align="center">
              <!-- Email Container -->
              <table width="100%" max-width="600px" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff;border-radius:12px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -1px rgba(0,0,0,0.06);overflow:hidden;">
                
                <!-- Header -->
                <tr>
                  <td style="background:linear-gradient(135deg,#6d28d9,#7c3aed);padding:30px 20px;text-align:center;">
                    <!-- 🔄 Replace with your logo -->
                    <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:600;letter-spacing:0.5px;">
                      🔐 Error Tracker
                    </h1>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding:40px 30px;">
                    <h2 style="margin:0 0 16px;color:#1f2937;font-size:22px;font-weight:600;text-align:center;">
                      Verify Your Email
                    </h2>
                    <p style="margin:0 0 24px;color:#4b5563;font-size:16px;line-height:1.6;text-align:center;">
                      Hello! 👋<br>
                      You requested to verify your email address. Please use the OTP below to complete the process.
                    </p>

                    <!-- OTP Box -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center">
                          <div style="background:linear-gradient(135deg,#f3f4f6,#e5e7eb);border:2px dashed #6d28d9;border-radius:10px;padding:20px 30px;margin:0 auto 24px;max-width:fit-content;">
                            <span style="font-size:32px;font-weight:700;color:#6d28d9;letter-spacing:8px;font-family:monospace;">
                              ${otp}
                            </span>
                          </div>
                        </td>
                      </tr>
                    </table>

                    <p style="margin:0 0 8px;color:#6b7280;font-size:14px;text-align:center;">
                      ⏱️ This OTP will expire in <strong>5 minutes</strong>
                    </p>
                    <p style="margin:0 0 24px;color:#6b7280;font-size:14px;text-align:center;">
                      If you didn't request this, please ignore this email.
                    </p>

                    <!-- CTA Button -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center">
                          <a href="#" style="display:inline-block;background:linear-gradient(135deg,#6d28d9,#7c3aed);color:#ffffff;text-decoration:none;padding:12px 32px;border-radius:8px;font-weight:600;font-size:15px;box-shadow:0 4px 14px 0 rgba(109,40,217,0.39);">
                            Verify Now
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color:#f9fafb;padding:20px 30px;border-top:1px solid #e5e7eb;">
                    <p style="margin:0 0 8px;color:#6b7280;font-size:13px;text-align:center;">
                      Need help? <a href="mailto:support@yourdomain.com" style="color:#6d28d9;text-decoration:none;">Contact Support</a>
                    </p>
                    <p style="margin:0;color:#9ca3af;font-size:12px;text-align:center;">
                      © ${new Date().getFullYear()} Error Tracker. All rights reserved.<br>
                      <span style="font-size:11px;">This is an automated email, please do not reply.</span>
                    </p>
                  </td>
                </tr>

              </table>
              
              <!-- Unsubscribe/Preferences -->
              <p style="margin:20px 0 0;color:#9ca3af;font-size:12px;text-align:center;">
                <a href="#" style="color:#6b7280;text-decoration:none;margin:0 8px;">Privacy Policy</a>
                <a href="#" style="color:#6b7280;text-decoration:none;margin:0 8px;">Terms of Service</a>
              </p>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const info = await transporter.sendMail({
      from: `"Error Tracker" <${process.env.BREVO_USER}>`,
      to: email,
      subject: "🔐 Verify Your Email - OTP Inside",
      html: emailHTML,
      text: `Your OTP is: ${otp}. This OTP will expire in 5 minutes. If you didn't request this, please ignore this email.` // Fallback for plain text clients
    });

    console.log("✅ Email sent:", info.response);
    return true;

  } catch (error) {
    console.log("❌ EMAIL ERROR:", error.message);
    return false; // ❗ flow break nahi karega
  }
};