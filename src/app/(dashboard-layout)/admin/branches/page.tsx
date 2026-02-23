'use client';

import { useState } from 'react';
import { Plus, Pencil, Trash2, GitBranch, Phone, MapPin, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useBranches, useCreateBranch, useUpdateBranch, useDeleteBranch } from '@/hooks/use-branches';
import { Branch, CreateBranchPayload } from '@/types/branch';

/* ─── Modal ─── */
function BranchModal({
  branch,
  onClose,
}: {
  branch?: Branch;
  onClose: () => void;
}) {
  const isEdit = !!branch;
  const create = useCreateBranch();
  const update = useUpdateBranch();

  const [form, setForm] = useState<CreateBranchPayload & { isActive: boolean }>({
    name: branch?.name ?? '',
    address: branch?.address ?? '',
    phone: branch?.phone ?? '',
    isActive: branch?.isActive ?? true,
  });

  const isPending = create.isPending || update.isPending;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit) {
      update.mutate({ id: branch.id, data: form }, { onSuccess: onClose });
    } else {
      create.mutate(form, { onSuccess: onClose });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-background rounded-2xl border shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="font-bold text-lg">{isEdit ? 'Branch সম্পাদনা' : 'নতুন Branch'}</h2>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-accent transition-colors text-muted-foreground">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Branch নাম *</label>
            <Input
              placeholder="যেমন: Mirpur Branch"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">ঠিকানা</label>
            <Input
              placeholder="সম্পূর্ণ ঠিকানা"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">ফোন নম্বর</label>
            <Input
              placeholder="01XXXXXXXXX"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg border border-border/60 bg-muted/30">
            <input
              type="checkbox"
              id="isActive"
              checked={form.isActive}
              onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
              className="h-4 w-4 rounded"
            />
            <label htmlFor="isActive" className="text-sm font-medium cursor-pointer select-none">
              Branch সক্রিয়
            </label>
            <span className={`ml-auto text-xs font-medium ${form.isActive ? 'text-emerald-600' : 'text-muted-foreground'}`}>
              {form.isActive ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
            </span>
          </div>
          <div className="flex gap-3">
            <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
              বাতিল
            </Button>
            <Button type="submit" className="flex-1" disabled={isPending || !form.name.trim()}>
              {isPending ? 'সংরক্ষণ হচ্ছে...' : isEdit ? 'আপডেট করুন' : 'তৈরি করুন'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ─── Delete Confirm ─── */
function DeleteConfirm({ branch, onClose }: { branch: Branch; onClose: () => void }) {
  const deleteBranch = useDeleteBranch();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-background rounded-2xl border shadow-2xl w-full max-w-sm p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center">
            <Trash2 className="h-5 w-5 text-destructive" />
          </div>
          <div>
            <p className="font-semibold">Branch মুছবেন?</p>
            <p className="text-sm text-muted-foreground">"{branch.name}" স্থায়ীভাবে মুছে যাবে</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onClose}>বাতিল</Button>
          <Button
            variant="destructive"
            className="flex-1"
            disabled={deleteBranch.isPending}
            onClick={() => deleteBranch.mutate(branch.id, { onSuccess: onClose })}
          >
            {deleteBranch.isPending ? 'মুছছে...' : 'মুছুন'}
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function BranchesPage() {
  const { data: branches, isLoading, isError } = useBranches();
  const [modalOpen, setModalOpen] = useState(false);
  const [editBranch, setEditBranch] = useState<Branch | undefined>();
  const [deleteBranch, setDeleteBranch] = useState<Branch | undefined>();

  const activeBranches = branches?.filter((b) => b.isActive).length ?? 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <GitBranch className="h-6 w-6 text-primary" />
            Branches
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">সকল শাখা পরিচালনা করুন</p>
        </div>
        <Button onClick={() => { setEditBranch(undefined); setModalOpen(true); }} className="gap-2">
          <Plus className="h-4 w-4" />
          নতুন Branch
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">মোট Branch</p>
          <p className="text-2xl font-bold mt-1">{branches?.length ?? 0}</p>
        </div>
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">সক্রিয়</p>
          <p className="text-2xl font-bold mt-1 text-emerald-600">{activeBranches}</p>
        </div>
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">নিষ্ক্রিয়</p>
          <p className="text-2xl font-bold mt-1 text-muted-foreground">{(branches?.length ?? 0) - activeBranches}</p>
        </div>
      </div>

      {/* Table */}
      <div className="card-base overflow-hidden p-0">
        {isLoading ? (
          <div className="p-12 text-center text-muted-foreground">লোড হচ্ছে...</div>
        ) : isError ? (
          <div className="p-12 text-center text-destructive">ডেটা লোড ব্যর্থ হয়েছে</div>
        ) : !branches?.length ? (
          <div className="p-12 text-center space-y-3">
            <GitBranch className="h-12 w-12 text-muted-foreground/30 mx-auto" />
            <p className="text-muted-foreground">কোনো Branch নেই। প্রথম Branch তৈরি করুন।</p>
            <Button onClick={() => setModalOpen(true)} variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />নতুন Branch
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b">
                <tr>
                  <th className="text-left px-5 py-3.5 text-sm font-semibold">Branch নাম</th>
                  <th className="text-left px-5 py-3.5 text-sm font-semibold">ঠিকানা</th>
                  <th className="text-left px-5 py-3.5 text-sm font-semibold">ফোন</th>
                  <th className="text-center px-5 py-3.5 text-sm font-semibold">স্ট্যাটাস</th>
                  <th className="text-center px-5 py-3.5 text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {branches.map((branch) => (
                  <tr key={branch.id} className="border-t hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-4 font-medium">{branch.name}</td>
                    <td className="px-5 py-4 text-muted-foreground text-sm">
                      {branch.address ? (
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 shrink-0" />{branch.address}
                        </span>
                      ) : '—'}
                    </td>
                    <td className="px-5 py-4 text-muted-foreground text-sm">
                      {branch.phone ? (
                        <span className="flex items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5 shrink-0" />{branch.phone}
                        </span>
                      ) : '—'}
                    </td>
                    <td className="px-5 py-4 text-center">
                      {branch.isActive ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1 rounded-full">
                          <CheckCircle className="h-3.5 w-3.5" />সক্রিয়
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                          <XCircle className="h-3.5 w-3.5" />নিষ্ক্রিয়
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => { setEditBranch(branch); setModalOpen(true); }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => setDeleteBranch(branch)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modals */}
      {modalOpen && (
        <BranchModal
          branch={editBranch}
          onClose={() => { setModalOpen(false); setEditBranch(undefined); }}
        />
      )}
      {deleteBranch && (
        <DeleteConfirm
          branch={deleteBranch}
          onClose={() => setDeleteBranch(undefined)}
        />
      )}
    </div>
  );
}
