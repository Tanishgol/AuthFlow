import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../layouts/DashboardLayout.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import Avatar from '../components/Avatar.jsx';
import { formatDate, formatDateTime } from '../utils/formatDate.js';
import { SkeletonCard } from '../components/Skeleton.jsx';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

const Dashboard = () => {
  useDocumentTitle('Dashboard');
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state
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
        className="space-y-6"
      >
        {/* Welcome Section */}
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-primary-50 to-purple-50 p-8 dark:border-slate-800 dark:from-primary-950/30 dark:to-purple-950/30">
          <div className="flex items-center gap-6">
            <Avatar name={user?.name} size="lg" />
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Welcome back, {user?.name?.split(' ')[0]} 👋
              </h1>
              <p className="mt-1 text-slate-600 dark:text-slate-400">
                Great to see you again!
              </p>
            </div>
          </div>
        </div>

        {/* User Info Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-6 text-xl font-bold text-slate-900 dark:text-white">
            Account Information
          </h2>
          <div className="space-y-4">
            <InfoRow label="Full Name" value={user?.name} />
            <InfoRow label="Email Address" value={user?.email} />
            <InfoRow label="Account Created" value={formatDate(user?.createdAt)} />
            {user?.lastLogin && (
              <InfoRow label="Last Login" value={formatDateTime(user?.lastLogin)} />
            )}
            <InfoRow
              label="Account Status"
              value={
                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-600 dark:bg-green-400" />
                  Active
                </span>
              }
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            icon="🔐"
            title="Secure Authentication"
            value="JWT Enabled"
            color="blue"
          />
          <StatCard
            icon="✅"
            title="Email Verified"
            value={user?.isVerified ? 'Verified' : 'Pending'}
            color="green"
          />
          <StatCard
            icon="🛡️"
            title="Security Level"
            value="High"
            color="purple"
          />
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0 dark:border-slate-800">
    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
      {label}
    </span>
    <span className="text-sm font-semibold text-slate-900 dark:text-white">
      {value}
    </span>
  </div>
);

const StatCard = ({ icon, title, value, color }) => {
  const colors = {
    blue: 'from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30',
    green: 'from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30',
    purple: 'from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30',
  };

  return (
    <div
      className={`rounded-xl border border-slate-200 bg-gradient-to-br p-6 dark:border-slate-800 ${colors[color]}`}
    >
      <div className="text-3xl">{icon}</div>
      <h3 className="mt-3 text-sm font-medium text-slate-600 dark:text-slate-400">
        {title}
      </h3>
      <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
        {value}
      </p>
    </div>
  );
};

export default Dashboard;
