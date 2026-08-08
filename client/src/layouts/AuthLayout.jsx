import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle.jsx';

const AuthLayout = ({ children }) => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 px-4 py-12 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary-400/30 blur-3xl dark:bg-primary-600/20" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-purple-400/30 blur-3xl dark:bg-purple-600/20" />

      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>

      <Link
        to="/"
        className="absolute left-4 top-4 text-lg font-extrabold tracking-tight text-primary-700 dark:text-primary-300"
      >
        AuthFlow
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default AuthLayout;
