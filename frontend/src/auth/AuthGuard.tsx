import { useAuthStore } from './useAuthStore';
import { Navigate } from 'react-router-dom';

interface AuthGuardProps {
  children: React.ReactNode;
}

function AuthGuard({ children }: AuthGuardProps) {
  const token = useAuthStore(state => state.token); 

  console.log('🔐 当前 token:', token); 

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default AuthGuard;
