import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authService } from '../services/authService.js';
import AuthLayout from '../layouts/AuthLayout.jsx';
import Button from '../components/Button.jsx';
import useCountdown from '../hooks/useCountdown.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

const VerifyOTP = () => {
  useDocumentTitle('Verify OTP');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const { seconds, isActive, start } = useCountdown(60);

  useEffect(() => {
    if (!email) {
      navigate('/forgot-password');
    }
  }, [email, navigate]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split('').concat(Array(6).fill('')).slice(0, 6);
    setOtp(newOtp);

    const nextEmptyIndex = newOtp.findIndex((val) => !val);
    if (nextEmptyIndex === -1) {
      inputRefs.current[5]?.focus();
    } else {
      inputRefs.current[nextEmptyIndex]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');

    if (otpValue.length !== 6) {
      toast.error('Please enter the complete 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      await authService.verifyOTP({ email, otp: otpValue });
      toast.success('OTP verified!');
      navigate('/reset-password', { state: { email, otp: otpValue } });
    } catch (error) {
      const message =
        error.response?.data?.message || 'Invalid or expired OTP';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await authService.forgotPassword(email);
      toast.success('OTP resent to your email');
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
      start();
    } catch (error) {
      toast.error('Failed to resend OTP. Try again.');
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
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
          </div>
          <h1 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">
            Check Your Email
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            We've sent a 6-digit code to
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
            {email}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="label mb-3">Enter OTP</label>
            <div className="flex gap-2 justify-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="h-14 w-12 rounded-xl border-2 border-slate-300 bg-white text-center text-xl font-bold text-slate-900 transition-all focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  aria-label={`Digit ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <Button type="submit" loading={loading} className="w-full">
            Verify OTP
          </Button>
        </form>

        <div className="mt-6 text-center">
          {isActive ? (
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Resend OTP in{' '}
              <span className="font-semibold text-primary-600 dark:text-primary-400">
                {seconds}s
              </span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="text-sm font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400"
            >
              Resend OTP
            </button>
          )}
        </div>

        <p className="mt-4 text-center text-sm text-slate-600 dark:text-slate-400">
          <Link
            to="/forgot-password"
            className="font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400"
          >
            Use a different email
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default VerifyOTP;
