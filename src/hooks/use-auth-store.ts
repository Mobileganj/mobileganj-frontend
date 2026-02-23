import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, AuthUser, AuthTokens } from '@/types/auth';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      setAuth: (user: AuthUser, tokens: AuthTokens) =>
        set({ user, accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, isAuthenticated: true }),

      clearAuth: () =>
        set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false }),

      setUser: (user: AuthUser) => set({ user }),
    }),
    { name: 'auth-storage' }
  )
);
