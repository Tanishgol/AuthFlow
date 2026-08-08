# MERN Authentication System

A production-ready, full-stack authentication system built with the MERN stack (MongoDB, Express, React, Node.js). Features secure JWT authentication, OTP-based password reset, protected routes, and a modern, responsive UI.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## ✨ Features

### Authentication & Security
- 🔐 **JWT Authentication** with HTTP-only cookies
- 🔒 **bcrypt Password Hashing** (12 rounds)
- 🛡️ **Secure Password Reset** with 6-digit OTP (10-minute expiry)
- ✅ **Input Validation** on client and server
- 🚫 **Rate Limiting** to prevent brute-force attacks
- 🔑 **Protected Routes** with automatic redirect
- 🍪 **Secure Cookie Policy** (HttpOnly, SameSite, Secure in production)
- 🛡️ **MongoDB Injection Protection**
- 🔐 **XSS Protection** via Helmet
- ⚡ **Auto-login on page refresh**

### User Interface
- 🎨 **Modern SaaS Design** with Tailwind CSS
- 🌓 **Dark Mode Toggle** with system preference detection
- 📱 **Fully Responsive** (mobile, tablet, desktop)
- ⚡ **Smooth Animations** with Framer Motion
- 🎯 **Auto-focus & Auto-paste** for OTP inputs
- 🔄 **Loading States** and skeleton loaders
- 🎉 **Toast Notifications** for user feedback
- 🎭 **Password Strength Indicator**
- 👁️ **Password Visibility Toggle**
- 🚀 **Lazy Loading & Code Splitting**

### Backend Infrastructure
- 📧 **Email Service** with beautiful HTML templates (Nodemailer)
- 📊 **Request Logging** (Morgan)
- 🗜️ **Response Compression** (gzip)
- ❌ **Global Error Handling**
- 🏥 **Health Check Endpoint**
- 🔄 **Graceful Shutdown**
- 🌍 **CORS Configuration**
- 📝 **Environment Variables** with validation

### Developer Experience
- ⚡ **Vite** for blazing-fast development
- 🎨 **ESLint & Prettier** for code quality
- 🔥 **Hot Module Replacement**
- 📦 **Optimized Production Build**
- 🧩 **Modular Architecture**
- 🎯 **Custom Hooks**
- 🔄 **Axios Interceptors** for global error handling

---

## 🛠️ Tech Stack

### Frontend
- **React 18** — UI library
- **Vite** — Build tool
- **Tailwind CSS** — Styling
- **React Router DOM** — Navigation
- **React Hook Form** — Form handling
- **Axios** — HTTP client
- **Context API** — State management
- **React Hot Toast** — Notifications
- **Framer Motion** — Animations

### Backend
- **Node.js** — Runtime
- **Express.js** — Web framework
- **MongoDB & Mongoose** — Database
- **JWT** — Authentication tokens
- **bcryptjs** — Password hashing
- **Nodemailer** — Email service
- **Express Validator** — Input validation
- **Helmet** — Security headers
- **Morgan** — HTTP logging
- **Express Rate Limit** — Rate limiting
- **Compression** — Response compression
- **Cookie Parser** — Cookie handling
- **CORS** — Cross-origin support

---

## 📁 Project Structure

```
root/
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React Context providers
│   │   ├── hooks/          # Custom React hooks
│   │   ├── layouts/        # Layout components
│   │   ├── pages/          # Page components
│   │   ├── routes/         # Route guards
│   │   ├── services/       # API services
│   │   ├── utils/          # Helper functions
│   │   ├── App.jsx         # Root component
│   │   ├── main.jsx        # Entry point
│   │   └── index.css       # Global styles
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── .env.example
│
└── server/                  # Express backend
    ├── config/             # Configuration files
    │   ├── db.js          # MongoDB connection
    │   └── env.js         # Environment config
    ├── controllers/        # Route controllers
    │   ├── authController.js
    │   └── userController.js
    ├── middleware/         # Custom middleware
    │   ├── auth.js        # JWT verification
    │   ├── errorHandler.js
    │   ├── rateLimiter.js
    │   └── sanitize.js    # NoSQL injection protection
    ├── models/             # Mongoose models
    │   └── User.js
    ├── routes/             # API routes
    │   ├── authRoutes.js
    │   └── userRoutes.js
    ├── services/           # Business logic
    │   └── email.js       # Email service
    ├── utils/              # Helper functions
    │   ├── jwt.js         # JWT utilities
    │   └── otp.js         # OTP utilities
    ├── validators/         # Input validation
    │   └── authValidator.js
    ├── server.js           # Entry point
    ├── package.json
    └── .env.example
```

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** v16+ and npm/yarn
- **MongoDB Atlas** account (or local MongoDB)
- **Gmail** account (for Nodemailer, or use another SMTP provider)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/mern-auth.git
cd mern-auth
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create `.env` file in `server/` directory:
```env
# Server
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mern_auth?retryWrites=true&w=majority

# JWT
JWT_SECRET=your_super_secure_jwt_secret_minimum_32_characters_long
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7

# Email (Gmail example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_specific_password
EMAIL_FROM=noreply@yourapp.com

# Frontend URL
CLIENT_URL=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

**Gmail App Password Setup:**
1. Enable 2FA on your Google account
2. Go to https://myaccount.google.com/apppasswords
3. Generate an app password
4. Use that password in `EMAIL_PASSWORD`

### 3. Frontend Setup

```bash
cd ../client
npm install
```

Create `.env` file in `client/` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Run the Application

**Backend (from `server/` directory):**
```bash
npm run dev
```
Server runs on http://localhost:5000

**Frontend (from `client/` directory):**
```bash
npm run dev
```
Client runs on http://localhost:5173

---

## 📋 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "confirmPassword": "SecurePass123!"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

#### Logout
```http
POST /auth/logout
```

#### Forgot Password (Request OTP)
```http
POST /auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

#### Verify OTP
```http
POST /auth/verify-otp
Content-Type: application/json

{
  "email": "john@example.com",
  "otp": "123456"
}
```

#### Reset Password
```http
POST /auth/reset-password
Content-Type: application/json

{
  "email": "john@example.com",
  "otp": "123456",
  "password": "NewSecurePass123!",
  "confirmPassword": "NewSecurePass123!"
}
```

#### Get Current User
```http
GET /auth/me
Authorization: Bearer <token>
```

### User Endpoints

#### Get Profile
```http
GET /user/profile
Authorization: Bearer <token>
```

### Health Check
```http
GET /api/health
```

---

## 🔒 Security Features

1. **Password Requirements:**
   - Minimum 8 characters
   - At least one uppercase letter
   - At least one lowercase letter
   - At least one number
   - At least one special character (@$!%*?&#)

2. **Rate Limiting:**
   - General API: 100 requests per 15 minutes
   - Auth routes: 5 failed attempts per 15 minutes
   - OTP requests: 3 per minute

3. **JWT Configuration:**
   - 7-day expiry (configurable)
   - HttpOnly cookies
   - Secure flag in production
   - SameSite=strict

4. **OTP Security:**
   - 6-digit random code
   - 10-minute expiry
   - One-time use

---

## 🎨 Pages

| Page | Route | Description |
|------|-------|-------------|
| **Home** | `/` | Landing page with feature overview |
| **Register** | `/register` | User registration form |
| **Login** | `/login` | User login form |
| **Forgot Password** | `/forgot-password` | Request OTP for password reset |
| **Verify OTP** | `/verify-otp` | Enter 6-digit OTP |
| **Reset Password** | `/reset-password` | Set new password |
| **Dashboard** | `/dashboard` | Protected - user dashboard |
| **Profile** | `/profile` | Protected - user profile |
| **404** | `*` | Page not found |

---

## 🌐 Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Import project in Vercel
3. Set build settings:
   - **Framework:** Vite
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Add environment variable:
   ```
   VITE_API_URL=https://your-backend-url.com/api
   ```

### Backend (Render / Railway)

**Render:**
1. Create new Web Service
2. Connect GitHub repository
3. Set:
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Add environment variables from `.env.example`
5. Set `NODE_ENV=production`

**Railway:**
1. Create new project
2. Connect GitHub repository
3. Set root directory to `server`
4. Add environment variables
5. Deploy

### Database (MongoDB Atlas)

1. Create a cluster at https://cloud.mongodb.com
2. Create database user
3. Whitelist IP: `0.0.0.0/0` (allow from anywhere)
4. Copy connection string to `MONGODB_URI`

### Production Environment Variables

**Backend:**
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=<your-production-mongodb-uri>
JWT_SECRET=<strong-random-secret>
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=<your-email>
EMAIL_PASSWORD=<your-app-password>
EMAIL_FROM=<your-from-email>
CLIENT_URL=https://your-frontend-vercel-url.vercel.app
```

**Frontend:**
```env
VITE_API_URL=https://your-backend-render-url.onrender.com/api
```

---

## 🧪 Testing

Test the application locally:

1. **Register a new user**
2. **Log in** with credentials
3. **Access dashboard** (should redirect if not logged in)
4. **Log out** and try accessing dashboard (should redirect to login)
5. **Forgot password** flow:
   - Request OTP
   - Check email for OTP
   - Verify OTP
   - Reset password
6. **Log in** with new password

---

## 🛠️ Scripts

### Backend
```bash
npm start          # Production mode
npm run dev        # Development mode (nodemon)
```

### Frontend
```bash
npm run dev        # Development server
npm run build      # Production build
npm run preview    # Preview production build
npm run lint       # Run ESLint
npm run format     # Format with Prettier
```

---

## 📸 Screenshots

*Add screenshots of your application here after deployment*

1. Home Page
2. Register Page
3. Login Page
4. Dashboard
5. OTP Verification
6. Profile Page
7. Dark Mode

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/)
- [React](https://react.dev/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Framer Motion](https://www.framer.com/motion/)

---

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Email: your.email@example.com

---

## 🚀 Future Enhancements

- [ ] Email verification on registration
- [ ] Social OAuth (Google, GitHub)
- [ ] Two-factor authentication (2FA)
- [ ] User profile editing
- [ ] Password change from dashboard
- [ ] Account deletion
- [ ] Activity logs
- [ ] Session management (view all active sessions)
- [ ] Admin panel
- [ ] Role-based access control (RBAC)

---

**Built with ❤️ using the MERN Stack**
