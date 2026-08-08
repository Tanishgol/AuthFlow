// Shared client-side validation rules for react-hook-form

export const emailRules = {
  required: 'Email is required',
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address',
  },
};

export const passwordRules = {
  required: 'Password is required',
  minLength: {
    value: 8,
    message: 'Password must be at least 8 characters',
  },
  validate: {
    hasUpper: (v) =>
      /[A-Z]/.test(v) || 'Must contain at least one uppercase letter',
    hasLower: (v) =>
      /[a-z]/.test(v) || 'Must contain at least one lowercase letter',
    hasNumber: (v) => /\d/.test(v) || 'Must contain at least one number',
    hasSpecial: (v) =>
      /[@$!%*?&#]/.test(v) || 'Must contain at least one special character',
  },
};

export const nameRules = {
  required: 'Full name is required',
  minLength: { value: 2, message: 'Name must be at least 2 characters' },
  maxLength: { value: 50, message: 'Name cannot exceed 50 characters' },
};

export const getPasswordStrength = (password) => {
  if (!password) return { score: 0, label: '', color: '' };

  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[@$!%*?&#]/.test(password)) score++;

  const levels = [
    { label: '', color: '' },
    { label: 'Very Weak', color: 'bg-red-500' },
    { label: 'Weak', color: 'bg-orange-500' },
    { label: 'Fair', color: 'bg-yellow-500' },
    { label: 'Good', color: 'bg-lime-500' },
    { label: 'Strong', color: 'bg-green-500' },
  ];

  return { score, ...levels[score] };
};

export const getInitials = (name) => {
  if (!name) return '?';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (
    parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
  ).toUpperCase();
};
