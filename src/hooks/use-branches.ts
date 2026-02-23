'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { branchService } from '@/services/branch.service';
import { CreateBranchPayload, UpdateBranchPayload } from '@/types/branch';
import { showToast } from '@/lib/toast';

export const BRANCHES_KEY = ['branches'];

export function useBranches() {
  return useQuery({
    queryKey: BRANCHES_KEY,
    queryFn: branchService.getAll,
  });
}

export function useBranch(id: string) {
  return useQuery({
    queryKey: [...BRANCHES_KEY, id],
    queryFn: () => branchService.getById(id),
    enabled: !!id,
  });
}

export function useCreateBranch() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateBranchPayload) => branchService.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: BRANCHES_KEY });
      showToast.success('Branch তৈরি হয়েছে');
    },
    onError: (err: Error) => showToast.error(err.message || 'Branch তৈরি ব্যর্থ'),
  });
}

export function useUpdateBranch() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBranchPayload }) =>
      branchService.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: BRANCHES_KEY });
      showToast.success('Branch আপডেট হয়েছে');
    },
    onError: (err: Error) => showToast.error(err.message || 'আপডেট ব্যর্থ'),
  });
}

export function useDeleteBranch() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => branchService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: BRANCHES_KEY });
      showToast.success('Branch মুছে ফেলা হয়েছে');
    },
    onError: (err: Error) => showToast.error(err.message || 'মুছতে ব্যর্থ'),
  });
}
