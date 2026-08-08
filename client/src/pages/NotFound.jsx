import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

const NotFound = () => {
  useDocumentTitle('404 Not Found');

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <h1 className="text-9xl font-extrabold text-slate-200 dark:text-slate-800">
          404
        </h1>
        <div className="-mt-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            Page Not Found
          </h2>
          <p className="mt-4 max-w-md text-slate-600 dark:text-slate-400">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/"
              className="btn-primary"
            >
              Go Home
            </Link>
            <Link
              to="/dashboard"
              className="btn-ghost"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
