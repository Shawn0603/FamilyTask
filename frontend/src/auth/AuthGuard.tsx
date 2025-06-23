import { useAuthStore } from './useAuthStore';
import { Navigate } from 'react-router-dom';

interface AuthGuardProps {
  children: React.ReactNode;
}

function AuthGuard({ children }: AuthGuardProps) {
  const token = useAuthStore(state => state.token); // ✅ 读取 token 判断登录状态

  console.log('🔐 当前 token:', token); // ✅ 打印当前 token，调试用

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default AuthGuard;
