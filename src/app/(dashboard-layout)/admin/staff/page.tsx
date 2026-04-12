"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, MoreVertical, Edit, Trash2, Mail, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MOCK_STAFF, MOCK_ROLES } from "@/data/mock-staff";
import { Staff } from "@/types/staff";
import { cn } from "@/lib/utils";

export default function StaffPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStaff = MOCK_STAFF.filter((staff) => 
    staff.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    staff.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleName = (roleId: string) => {
    return MOCK_ROLES.find(r => r.id === roleId)?.name || "Unknown Role";
  };

  const getStatusBadge = (status: Staff["status"]) => {
    switch (status) {
      case "Active":
        return <span className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2.5 py-0.5 rounded-full text-xs font-medium">Active</span>;
      case "Invited":
        return <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-2.5 py-0.5 rounded-full text-xs font-medium">Invited</span>;
      case "Suspended":
        return <span className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 px-2.5 py-0.5 rounded-full text-xs font-medium">Suspended</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Staff Management</h1>
          <p className="text-muted-foreground">Manage your employees securely</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/staff/roles">
            <Button variant="outline">
              <ShieldAlert className="w-4 h-4 mr-2" />
              Roles & Permissions
            </Button>
          </Link>
          <Link href="/admin/staff/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Invite Staff
            </Button>
          </Link>
        </div>
      </div>

      <div className="card-base overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between bg-muted/20">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search by name or email..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/40 text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Email & Phone</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Joined On</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredStaff.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                    No staff found matching your search.
                  </td>
                </tr>
              ) : (
                filteredStaff.map((staff) => (
                  <tr key={staff.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary shrink-0">
                          {staff.name.charAt(0)}
                        </div>
                        <div className="font-medium text-foreground">{staff.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-foreground">{staff.email}</div>
                      <div className="text-muted-foreground text-xs mt-0.5">{staff.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground font-medium text-xs">
                        {getRoleName(staff.roleId)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {staff.joinedAt === "—" ? "—" : new Date(staff.joinedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(staff.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {staff.status === 'Invited' && (
                          <Button variant="ghost" size="icon" title="Resend Invite">
                            <Mail className="w-4 h-4 text-blue-500" />
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" className="hover:text-primary">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
