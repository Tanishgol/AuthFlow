import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { authService } from '../services/authService.js';
import AuthLayout from '../layouts/AuthLayout.jsx';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';
import { passwordRules } from '../utils/validators.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

const ResetPassword = () => {
  useDocumentTitle('Reset Password');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const otp = location.state?.otp;

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch('password', '');

  useEffect(() => {
    if (!email || !otp) {
      navigate('/forgot-password');
    }
  }, [email, otp, navigate]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await authService.resetPassword({
        email,
        otp,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
      toast.success('Password reset successful! Please log in.');
      navigate('/login');
    } catch (error) {
      const message =
        error.response?.data?.message || 'Password reset failed. Try again.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="auth-card">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="h-7 w-7 text-green-600 dark:text-green-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">
            Reset Password
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Enter your new password below
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="New Password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            showToggle
            error={errors.password?.message}
            {...register('password', passwordRules)}
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            showToggle
            error={errors.confirmPassword?.message}
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (val) => val === password || 'Passwords do not match',
            })}
          />

          <Button type="submit" loading={loading} className="w-full">
            Reset Password
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
          Remember your password?{' '}
          <button
            onClick={() => navigate('/login')}
            className="font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400"
          >
            Back to login
          </button>
        </p>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
