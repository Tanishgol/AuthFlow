import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import FullPageLoader from '../components/FullPageLoader.jsx';

// Redirects authenticated users away from auth pages (login, register, etc.)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <FullPageLoader />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
