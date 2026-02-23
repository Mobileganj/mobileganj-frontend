export interface Branch {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBranchPayload {
  name: string;
  address?: string;
  phone?: string;
}

export type UpdateBranchPayload = Partial<CreateBranchPayload> & { isActive?: boolean };
