import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { authService } from '../services/authService.js';
import AuthLayout from '../layouts/AuthLayout.jsx';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';
import { emailRules } from '../utils/validators.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

const ForgotPassword = () => {
  useDocumentTitle('Forgot Password');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await authService.forgotPassword(data.email);
      toast.success('OTP sent to your email!');
      navigate('/verify-otp', { state: { email: data.email } });
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to send OTP. Try again.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="auth-card">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="h-7 w-7 text-primary-600 dark:text-primary-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </div>
          <h1 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">
            Forgot Password?
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            No worries, we'll send you a reset OTP
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            error={errors.email?.message}
            {...register('email', emailRules)}
          />

          <Button type="submit" loading={loading} className="w-full">
            Send OTP
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

export default ForgotPassword;
