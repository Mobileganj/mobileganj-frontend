"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function UserOrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">আমার অর্ডার</h1>
        <p className="text-muted-foreground mt-1">আপনার সকল অর্ডারের তালিকা</p>
      </div>

      <div className="bg-card border border-border rounded-xl p-12 text-center">
        <ShoppingBag className="h-12 w-12 mx-auto mb-3 text-muted-foreground/30" />
        <p className="font-medium">কোনো অর্ডার নেই</p>
        <p className="text-sm text-muted-foreground mt-1">আপনার প্রথম অর্ডার করুন</p>
        <Link href="/shop"
          className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
          শপ করুন
        </Link>
      </div>
    </div>
  );
}
