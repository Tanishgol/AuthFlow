import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';

import config from './config/env.js';
import connectDB from './config/db.js';
import sanitize from './middleware/sanitize.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import errorHandler from './middleware/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

// Connect to database
connectDB();

const app = express();

// Trust proxy (required for secure cookies behind reverse proxies like Render)
app.set('trust proxy', 1);

// Security middleware
app.use(helmet());

// CORS configuration
// CLIENT_URL may hold a comma-separated list, e.g.
// "https://my-app.vercel.app,http://localhost:5173"
// Trailing slashes are stripped because browser Origin headers never have one.
const stripTrailingSlash = (url) => url.replace(/\/+$/, '');

const allowedOrigins = config.clientUrl
  .split(',')
  .map((origin) => stripTrailingSlash(origin.trim()))
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (health checks, curl, mobile apps)
      if (!origin || allowedOrigins.includes(stripTrailingSlash(origin))) {
        return callback(null, true);
      }
      // Deny gracefully: do NOT throw. Throwing here propagates to the error
      // handler as a 500 with no CORS headers. Returning false simply omits
      // Access-Control-Allow-Origin, so the browser blocks it (correct) while
      // the server stays healthy and never 500s on an unknown origin.
      console.warn(`⚠️  Blocked CORS request from origin: ${origin}`);
      return callback(null, false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Body parsers
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Cookie parser
app.use(cookieParser());

// Data sanitization against NoSQL injection
app.use(sanitize);

// Compression
app.use(compression());

// Logging
if (config.nodeEnv === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Rate limiting for all API routes
app.use('/api', apiLimiter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Global error handler
app.use(errorHandler);

const PORT = config.port;

const server = app.listen(PORT, () => {
  console.log(
    `🚀 Server running in ${config.nodeEnv} mode on port ${PORT}`
  );
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`❌ Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated');
  });
});

export default app;
