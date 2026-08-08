import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../layouts/DashboardLayout.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import Avatar from '../components/Avatar.jsx';
import { formatDate } from '../utils/formatDate.js';
import { SkeletonCard } from '../components/Skeleton.jsx';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

const Profile = () => {
  useDocumentTitle('Profile');
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <SkeletonCard />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-3xl"
      >
        <h1 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
          My Profile
        </h1>

        {/* Profile Card */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {/* Header with Avatar */}
          <div className="border-b border-slate-200 bg-gradient-to-br from-primary-50 to-purple-50 p-8 dark:border-slate-800 dark:from-primary-950/30 dark:to-purple-950/30">
            <div className="flex items-center gap-6">
              <Avatar name={user?.name} size="lg" />
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {user?.name}
                </h2>
                <p className="mt-1 text-slate-600 dark:text-slate-400">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-8">
            <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
              Account Details
            </h3>
            <div className="space-y-4">
              <DetailRow label="User ID" value={user?._id} mono />
              <DetailRow label="Full Name" value={user?.name} />
              <DetailRow label="Email Address" value={user?.email} />
              <DetailRow
                label="Email Status"
                value={
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    <svg
                      className="h-3 w-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Verified
                  </span>
                }
              />
              <DetailRow
                label="Member Since"
                value={formatDate(user?.createdAt)}
              />
              <DetailRow
                label="Last Updated"
                value={formatDate(user?.updatedAt)}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
            Account Actions
          </h3>
          <div className="space-y-3">
            <button className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">
              Change Password
            </button>
            <button className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">
              Update Email
            </button>
            <button className="w-full rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-left text-sm font-medium text-red-700 transition-colors hover:bg-red-100 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-950/50">
              Delete Account
            </button>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

const DetailRow = ({ label, value, mono = false }) => (
  <div className="flex flex-col gap-1 border-b border-slate-100 pb-3 last:border-0 last:pb-0 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
      {label}
    </span>
    <span
      className={`text-sm font-semibold text-slate-900 dark:text-white ${
        mono ? 'font-mono text-xs' : ''
      } ${typeof value === 'string' ? 'break-all' : ''}`}
    >
      {value}
    </span>
  </div>
);

export default Profile;
