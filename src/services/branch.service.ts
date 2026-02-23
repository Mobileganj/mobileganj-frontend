import { Branch, CreateBranchPayload, UpdateBranchPayload } from '@/types/branch';
import { useAuthStore } from '@/hooks/use-auth-store';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

function getToken() {
  return useAuthStore.getState().accessToken;
}

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = getToken();
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Request failed');
  }
  return res.json();
}

export const branchService = {
  getAll: () => request<Branch[]>('/branches'),
  getById: (id: string) => request<Branch>(`/branches/${id}`),
  create: (data: CreateBranchPayload) =>
    request<Branch>('/branches', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: UpdateBranchPayload) =>
    request<Branch>(`/branches/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (id: string) =>
    request<void>(`/branches/${id}`, { method: 'DELETE' }),
};
