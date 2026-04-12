"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Shield, Plus, CheckCircle2, Lock, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PERMISSION_GROUPS, MOCK_ROLES } from "@/data/mock-staff";
import { Role } from "@/types/staff";
import { cn } from "@/lib/utils";
import { showToast } from "@/lib/toast";

export default function RolesAndPermissionsPage() {
  const [activeRole, setActiveRole] = useState<Role>(MOCK_ROLES[1]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedRole, setEditedRole] = useState<Role | null>(null);

  const startEdit = (role: Role) => {
    setActiveRole(role);
    setEditedRole({ ...role, permissions: [...role.permissions] });
    setIsEditing(role.id !== "r1"); // Prevent editing Super Admin
  };

  const handlePermissionToggle = (permissionId: string) => {
    if (!editedRole) return;
    const hasPerm = editedRole.permissions.includes(permissionId);
    if (hasPerm) {
      setEditedRole({
        ...editedRole,
        permissions: editedRole.permissions.filter(p => p !== permissionId)
      });
    } else {
      setEditedRole({
        ...editedRole,
        permissions: [...editedRole.permissions, permissionId]
      });
    }
  };

  const toggleGroupPermissions = (groupPermIds: string[]) => {
    if (!editedRole) return;
    const allSelected = groupPermIds.every(id => editedRole.permissions.includes(id));
    if (allSelected) {
      setEditedRole({
        ...editedRole,
        permissions: editedRole.permissions.filter(id => !groupPermIds.includes(id))
      });
    } else {
      const newPerms = new Set([...editedRole.permissions, ...groupPermIds]);
      setEditedRole({
        ...editedRole,
        permissions: Array.from(newPerms)
      });
    }
  };

  const handleSave = () => {
    // API mock save
    setIsEditing(false);
    setActiveRole(editedRole as Role);
    showToast.success(`Role '${editedRole?.name}' updated successfully!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/staff">
            <Button variant="ghost" size="icon" className="shrink-0">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Roles & Permissions</h1>
            <p className="text-muted-foreground">Define what your staff can access in the system</p>
          </div>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create New Role
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* Roles Sidebar */}
        <div className="card-base p-4 lg:col-span-1 border">
          <h3 className="font-semibold text-sm text-muted-foreground mb-4 px-2 uppercase tracking-wider">Available Roles</h3>
          <div className="space-y-1">
            {MOCK_ROLES.map(role => (
              <button
                key={role.id}
                onClick={() => startEdit(role)}
                className={cn(
                  "w-full text-left px-3 py-2.5 rounded-md flex justify-between items-center transition-colors text-sm",
                  activeRole.id === role.id 
                    ? "bg-primary text-primary-foreground font-medium shadow-sm" 
                    : "hover:bg-muted text-foreground"
                )}
              >
                {role.name}
                {role.isSystem && (
                  <Shield className={cn("w-3.5 h-3.5", activeRole.id === role.id ? "text-primary-foreground/70" : "text-muted-foreground")} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Edit Role Panel */}
        <div className="card-base lg:col-span-3 border overflow-hidden">
          {/* Header */}
          <div className="border-b bg-muted/10 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              {isEditing ? (
                <div className="space-y-4 max-w-sm">
                  <div>
                    <Label>Role Name</Label>
                    <Input 
                      value={editedRole?.name || ""} 
                      onChange={(e) => setEditedRole({ ...editedRole!, name: e.target.value })}
                      className="font-semibold"
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Input 
                      value={editedRole?.description || ""} 
                      onChange={(e) => setEditedRole({ ...editedRole!, description: e.target.value })}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-bold">{activeRole.name}</h2>
                    {activeRole.isSystem && (
                      <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                        <Lock className="w-3 h-3" /> System Role
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm">{activeRole.description}</p>
                </>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {activeRole.id === "r1" ? (
                <div className="text-sm text-muted-foreground flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-lg">
                  <Lock className="w-4 h-4" />
                  Super Admin role cannot be edited
                </div>
              ) : isEditing ? (
                <>
                  <Button variant="ghost" onClick={() => startEdit(activeRole)}>Cancel</Button>
                  <Button onClick={handleSave}>
                    <Save className="w-4 h-4 mr-2" /> Save Changes
                  </Button>
                </>
              ) : (
                <>
                  {!activeRole.isSystem && (
                    <Button variant="ghost" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                      <Trash2 className="w-4 h-4 mr-2" /> Delete
                    </Button>
                  )}
                  <Button onClick={() => setIsEditing(true)}>
                    Edit Role
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Permissions Grid */}
          <ScrollArea className="h-[600px] bg-card">
            <div className="p-6 space-y-8">
              {PERMISSION_GROUPS.map((group, gIndex) => {
                const groupPermIds = group.permissions.map(p => p.id);
                const currentPerms = isEditing ? editedRole?.permissions || [] : activeRole.permissions;
                const allSelected = groupPermIds.every(id => currentPerms.includes(id));
                const someSelected = groupPermIds.some(id => currentPerms.includes(id));
                
                return (
                  <div key={gIndex} className="space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b">
                      <h4 className="font-semibold text-foreground flex items-center gap-2">
                        {group.groupName}
                      </h4>
                      {/* Select All Checkbox for the group */}
                      {isEditing && (
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id={`group-${gIndex}`} 
                            checked={allSelected ? true : someSelected ? "indeterminate" : false}
                            onCheckedChange={() => toggleGroupPermissions(groupPermIds)}
                          />
                          <label htmlFor={`group-${gIndex}`} className="text-sm font-medium leading-none cursor-pointer">
                            Select All
                          </label>
                        </div>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {group.permissions.map((perm) => {
                        const isSelected = currentPerms.includes(perm.id);
                        return (
                          <div 
                            key={perm.id} 
                            className={cn(
                              "flex items-start space-x-3 p-3 rounded-lg border transition-colors",
                              isSelected ? "bg-primary/5 border-primary/20" : "bg-card border-border",
                              isEditing ? "cursor-pointer hover:border-primary/50" : "opacity-80"
                            )}
                            onClick={() => isEditing && handlePermissionToggle(perm.id)}
                          >
                            {isEditing ? (
                              <Checkbox 
                                id={perm.id} 
                                checked={isSelected} 
                                onCheckedChange={() => handlePermissionToggle(perm.id)}
                                className="mt-0.5 mt-1"
                              />
                            ) : (
                              <div className="mt-1">
                                {isSelected ? (
                                  <CheckCircle2 className="w-4 h-4 text-primary" />
                                ) : (
                                  <div className="w-4 h-4 rounded-full border opacity-20" />
                                )}
                              </div>
                            )}
                            <div className="space-y-1">
                              <label htmlFor={perm.id} className={cn(
                                "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                                isEditing && "cursor-pointer"
                              )}>
                                {perm.label}
                              </label>
                              <p className="text-xs text-muted-foreground cursor-pointer">
                                {perm.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>

      </div>
    </div>
  );
}
