// src/auth/useAuthStore.ts
import { create } from 'zustand';

interface AuthState {
  currentUser: string | null;         // current username
  loggedIn: boolean;                  
  login: (username: string) => void;  
  logout: () => void;                 
}

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: null,
  loggedIn: false,

  login: (username) =>
    set(() => ({
      currentUser: username,
      loggedIn: true,
    })),

  logout: () =>
    set(() => ({
      currentUser: null,
      loggedIn: false,
    })),
}));
