import express from 'express';
import {
  register,
  login,
  logout,
  forgotPassword,
  verifyOTP,
  resetPassword,
  getMe,
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { authLimiter, otpLimiter } from '../middleware/rateLimiter.js';
import {
  validate,
  registerValidator,
  loginValidator,
  forgotPasswordValidator,
  verifyOTPValidator,
  resetPasswordValidator,
} from '../validators/authValidator.js';

const router = express.Router();

router.post('/register', registerValidator, validate, register);
router.post('/login', authLimiter, loginValidator, validate, login);
router.post('/logout', logout);
router.post(
  '/forgot-password',
  otpLimiter,
  forgotPasswordValidator,
  validate,
  forgotPassword
);
router.post('/verify-otp', verifyOTPValidator, validate, verifyOTP);
router.post(
  '/reset-password',
  resetPasswordValidator,
  validate,
  resetPassword
);
router.get('/me', protect, getMe);

export default router;
