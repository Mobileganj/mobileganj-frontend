"use client";

import { useState } from "react";
import { User, Mail, Phone, Save } from "lucide-react";
import { useAuthStore } from "@/hooks/use-auth-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function UserProfilePage() {
  const { user } = useAuthStore();
  const [form, setForm] = useState({ name: user?.name || "", phone: user?.phone || "", email: user?.email || "" });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">প্রোফাইল</h1>
        <p className="text-muted-foreground mt-1">আপনার তথ্য আপডেট করুন</p>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 max-w-lg">
        {/* Avatar */}
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-2xl">
            {user?.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-lg">{user?.name}</p>
            <p className="text-sm text-muted-foreground capitalize">{user?.role}</p>
          </div>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">নাম</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="name" className="pl-10 h-11" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">ফোন নম্বর</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="phone" type="tel" className="pl-10 h-11" value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">ইমেইল</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="email" type="email" className="pl-10 h-11" value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
          </div>

          <Button type="submit" className="w-full h-11">
            <Save className="h-4 w-4 mr-2" /> সেভ করুন
          </Button>
        </form>
      </div>
    </div>
  );
}
