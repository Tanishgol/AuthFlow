import jwt from 'jsonwebtoken';
import config from '../config/env.js';

// Generate JWT token
export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, config.jwtSecret, {
    expiresIn: config.jwtExpire,
  });
};

// Verify JWT token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.jwtSecret);
  } catch (error) {
    return null;
  }
};

// Shared cookie options.
// Cross-site (frontend and backend on different domains) requires
// sameSite: 'none' + secure: true, which only works over HTTPS in production.
// Locally we use 'lax' so cookies work over plain http on localhost.
export const getCookieOptions = () => {
  const isProd = config.nodeEnv === 'production';
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
  };
};

// Send token response with cookie
export const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken(user._id);

  const cookieOptions = {
    ...getCookieOptions(),
    expires: new Date(
      Date.now() + config.jwtCookieExpire * 24 * 60 * 60 * 1000
    ),
  };

  res.status(statusCode).cookie('token', token, cookieOptions).json({
    success: true,
    token,
    user,
  });
};
