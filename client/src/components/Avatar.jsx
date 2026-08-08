import { getInitials } from '../utils/validators.js';

const Avatar = ({ name, size = 'md', className = '' }) => {
  const sizes = {
    sm: 'h-9 w-9 text-sm',
    md: 'h-12 w-12 text-base',
    lg: 'h-20 w-20 text-2xl',
  };

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-purple-600 font-bold text-white shadow-lg ${sizes[size]} ${className}`}
      aria-hidden="true"
    >
      {getInitials(name)}
    </div>
  );
};

export default Avatar;
