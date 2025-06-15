import { useAuthStore } from './useAuthStore';
import { Navigate } from 'react-router-dom';

interface AuthGuardProps {
  children: React.ReactNode;
}

function AuthGuard({ children }: AuthGuardProps) {
  const loggedIn = useAuthStore(state => state.loggedIn);

  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default AuthGuard;
