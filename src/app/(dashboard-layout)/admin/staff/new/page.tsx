"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, UserPlus, Mail, Phone, User, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MOCK_ROLES } from "@/data/mock-staff";
import { showToast } from "@/lib/toast";

export default function InviteStaffPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      showToast.success("Invitation sent successfully! The staff will receive an email shortly.");
      router.push("/admin/staff");
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/admin/staff">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Invite New Staff</h1>
          <p className="text-muted-foreground">Send an email invitation to add a new team member</p>
        </div>
      </div>

      <div className="card-base p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="space-y-4">
            <div>
              <Label className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-muted-foreground" />
                Full Name *
              </Label>
              <Input placeholder="e.g. John Doe" required />
            </div>

            <div>
              <Label className="flex items-center gap-2 mb-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                Email Address *
              </Label>
              <Input type="email" placeholder="john@example.com" required />
              <p className="text-xs text-muted-foreground mt-1.5">
                The invitation link and login credentials will be sent to this email.
              </p>
            </div>

            <div>
              <Label className="flex items-center gap-2 mb-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                Phone Number (Optional)
              </Label>
              <Input type="tel" placeholder="01XXXXXXXXX" />
            </div>

            <div className="pt-2">
              <Label className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-muted-foreground" />
                Assign Role *
              </Label>
              <Select required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a role for this staff" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_ROLES.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      <div className="py-1">
                        <div className="font-medium text-foreground">{role.name}</div>
                        <div className="text-xs text-muted-foreground">{role.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="pt-4 border-t flex justify-end gap-3">
            <Link href="/admin/staff">
              <Button type="button" variant="ghost">Cancel</Button>
            </Link>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                "Sending Invite..."
              ) : (
                <>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Send Invitation
                </>
              )}
            </Button>
          </div>
          
        </form>
      </div>
    </div>
  );
}
