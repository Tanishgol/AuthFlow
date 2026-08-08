import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext.jsx';
import ThemeToggle from '../components/ThemeToggle.jsx';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

const Home = () => {
  const { isAuthenticated } = useAuth();
  useDocumentTitle('Home');

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-primary-400/30 blur-3xl dark:bg-primary-600/20" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-purple-400/30 blur-3xl dark:bg-purple-600/20" />

      <div className="absolute right-4 top-4 z-10">
        <ThemeToggle />
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              AuthFlow
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            A production-ready MERN authentication system with JWT, secure OTP
            password reset, protected routes, and modern UI design. hello
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn-primary">
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn-primary">
                  Get Started
                </Link>
                <Link to="/login" className="btn-ghost">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3"
        >
          {[
            {
              icon: '🔐',
              title: 'Secure',
              desc: 'JWT & bcrypt encryption',
            },
            {
              icon: '⚡',
              title: 'Fast',
              desc: 'Optimized performance',
            },
            {
              icon: '🎨',
              title: 'Modern',
              desc: 'Beautiful UI & UX',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/20 bg-white/60 p-6 backdrop-blur-lg dark:border-slate-700/50 dark:bg-slate-900/60"
            >
              <div className="text-4xl">{item.icon}</div>
              <h3 className="mt-3 font-semibold text-slate-900 dark:text-white">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                {item.desc}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
