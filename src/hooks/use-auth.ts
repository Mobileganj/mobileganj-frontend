'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';
import { useAuthStore } from './use-auth-store';
import { LoginPayload, RegisterPayload, UserRole } from '@/types/auth';
import { showToast } from '@/lib/toast';
import { setAuthCookies, clearAuthCookies } from '@/lib/auth-cookies';

const ADMIN_ROLES: UserRole[] = ['superadmin', 'admin', 'staff'];

export function useLogin() {
  const { setAuth } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginPayload) => authService.login(data),
    onSuccess: (res) => {
      setAuth(res.user, { accessToken: res.accessToken, refreshToken: res.refreshToken });
      setAuthCookies(res.accessToken, res.user.role);
      showToast.success('সফলভাবে লগইন হয়েছে!');
      if (ADMIN_ROLES.includes(res.user.role)) {
        router.push('/admin/dashboard');
      } else {
        router.push('/user/dashboard');
      }
    },
    onError: (err: Error) => {
      showToast.error(err.message || 'লগইন ব্যর্থ হয়েছে');
    },
  });
}

export function useRegisterUser() {
  const { setAuth } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterPayload) => authService.registerUser(data),
    onSuccess: (res) => {
      setAuth(res.user, { accessToken: res.accessToken, refreshToken: res.refreshToken });
      setAuthCookies(res.accessToken, res.user.role);
      showToast.success('অ্যাকাউন্ট তৈরি হয়েছে!');
      router.push('/user/dashboard');
    },
    onError: (err: Error) => {
      showToast.error(err.message || 'রেজিস্ট্রেশন ব্যর্থ হয়েছে');
    },
  });
}

export function useLogout() {
  const { clearAuth, accessToken, refreshToken } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: () => authService.logout(refreshToken!, accessToken!),
    onSettled: () => {
      clearAuth();
      clearAuthCookies();
      showToast.success('লগআউট হয়েছে');
      router.push('/');
    },
  });
}

export function useProfile() {
  const { accessToken, isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ['profile'],
    queryFn: () => authService.getProfile(accessToken!),
    enabled: isAuthenticated && !!accessToken,
    staleTime: 5 * 60 * 1000,
  });
}
