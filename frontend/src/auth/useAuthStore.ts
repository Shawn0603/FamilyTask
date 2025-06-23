import { create } from 'zustand';

interface AuthState {
  token: string | null;             // 保存 JWT token
  login: (token: string) => void;   // 设置 token
  logout: () => void;               // 清除 token
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('token'), // 初始时尝试从本地恢复登录状态

  login: (token) => {
    localStorage.setItem('token', token); // 本地存储 token
    set({ token });
  },

  logout: () => {
    localStorage.removeItem('token'); // 清除本地存储
    set({ token: null });
  },
}));
