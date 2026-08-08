import crypto from 'crypto';

// Generate 6-digit OTP
export const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

// Calculate OTP expiry (10 minutes from now)
export const getOTPExpiry = () => {
  return new Date(Date.now() + 10 * 60 * 1000);
};

// Check if OTP is expired
export const isOTPExpired = (otpExpiry) => {
  return new Date() > otpExpiry;
};
