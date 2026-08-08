import nodemailer from "nodemailer";
import config from "../config/env.js";

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: config.email.host,
    port: config.email.port,
    secure: false,
    auth: {
      user: config.email.user,
      pass: config.email.password,
    },
  });
};

// Send OTP email
export const sendOTPEmail = async (email, name, otp) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: `"Authentication App" <${config.email.from}>`,
    to: email,
    subject: "Password Reset OTP",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .container {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              border-radius: 10px;
              padding: 40px;
              color: white;
            }
            .content {
              background: white;
              border-radius: 8px;
              padding: 30px;
              margin-top: 20px;
              color: #333;
            }
            .otp-code {
              background: #f7fafc;
              border: 2px dashed #667eea;
              border-radius: 8px;
              padding: 20px;
              text-align: center;
              font-size: 32px;
              font-weight: bold;
              letter-spacing: 8px;
              color: #667eea;
              margin: 20px 0;
            }
            .warning {
              background: #fff5f5;
              border-left: 4px solid #fc8181;
              padding: 15px;
              margin-top: 20px;
              border-radius: 4px;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              font-size: 14px;
              opacity: 0.8;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1 style="margin: 0; font-size: 28px;">🔐 Password Reset Request</h1>
            <div class="content">
              <p>Hello <strong>${name}</strong>,</p>
              <p>We received a request to reset your password. Use the OTP code below to proceed:</p>

              <div class="otp-code">${otp}</div>

              <p><strong>This OTP will expire in 10 minutes.</strong></p>

              <div class="warning">
                <p style="margin: 0;"><strong>⚠️ Security Notice</strong></p>
                <p style="margin: 5px 0 0 0;">If you didn't request a password reset, please ignore this email. Your account remains secure.</p>
              </div>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Authentication App. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ OTP email sent to ${email}`);
  } catch (error) {
    console.error(`❌ Email sending failed: ${error.message}`);
    throw new Error("Failed to send OTP email");
  }
};

// Send welcome email
export const sendWelcomeEmail = async (email, name) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: `"Authentication App" <${config.email.from}>`,
    to: email,
    subject: "Welcome to Our Platform!",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .container {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              border-radius: 10px;
              padding: 40px;
              color: white;
            }
            .content {
              background: white;
              border-radius: 8px;
              padding: 30px;
              margin-top: 20px;
              color: #333;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🎉 Welcome Aboard!</h1>
            <div class="content">
              <p>Hi <strong>${name}</strong>,</p>
              <p>Thank you for registering with us! Your account has been successfully created.</p>
              <p>You can now log in and explore all the features we offer.</p>
              <p>If you have any questions, feel free to reach out to our support team.</p>
              <p>Best regards,<br>The Team</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(`Email error: ${error.message}`);
  }
};
