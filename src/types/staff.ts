export type PermissionItem = {
  id: string;
  label: string;
  description: string;
};

export type PermissionGroup = {
  groupName: string;
  permissions: PermissionItem[];
};

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[]; // array of permission ids
  isSystem?: boolean; // system roles cannot be deleted
}

export type StaffStatus = 'Active' | 'Suspended' | 'Invited';

export interface Staff {
  id: string;
  name: string;
  email: string;
  phone: string;
  roleId: string;
  status: StaffStatus;
  joinedAt: string;
  avatar?: string;
}
