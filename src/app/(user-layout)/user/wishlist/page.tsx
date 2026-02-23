"use client";

import { Heart } from "lucide-react";
import Link from "next/link";

export default function UserWishlistPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">উইশলিস্ট</h1>
        <p className="text-muted-foreground mt-1">আপনার পছন্দের পণ্যসমূহ</p>
      </div>

      <div className="bg-card border border-border rounded-xl p-12 text-center">
        <Heart className="h-12 w-12 mx-auto mb-3 text-muted-foreground/30" />
        <p className="font-medium">উইশলিস্ট খালি</p>
        <p className="text-sm text-muted-foreground mt-1">পছন্দের পণ্য সেভ করুন</p>
        <Link href="/shop"
          className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
          পণ্য দেখুন
        </Link>
      </div>
    </div>
  );
}
