"use client";

import { ShoppingBag, Heart, Package, Clock } from "lucide-react";
import { useAuthStore } from "@/hooks/use-auth-store";
import Link from "next/link";

const stats = [
  { label: "মোট অর্ডার", value: "০", icon: ShoppingBag, href: "/user/orders", color: "text-blue-500 bg-blue-500/10" },
  { label: "চলমান অর্ডার", value: "০", icon: Package, href: "/user/orders", color: "text-orange-500 bg-orange-500/10" },
  { label: "উইশলিস্ট", value: "০", icon: Heart, href: "/user/wishlist", color: "text-red-500 bg-red-500/10" },
  { label: "সাম্প্রতিক", value: "০", icon: Clock, href: "/user/orders", color: "text-green-500 bg-green-500/10" },
];

export default function UserDashboardPage() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold">স্বাগতম, {user?.name}! 👋</h1>
        <p className="text-muted-foreground mt-1">আপনার অ্যাকাউন্টের সারসংক্ষেপ</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}
            className="bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className={`inline-flex p-2 rounded-lg ${stat.color} mb-3`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-muted-foreground mt-0.5">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">দ্রুত অ্যাকশন</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { label: "ফোন কিনুন", href: "/shop", emoji: "📱" },
            { label: "Pre-Order", href: "/pre-order", emoji: "🚀" },
            { label: "অফার দেখুন", href: "/offers", emoji: "🔥" },
            { label: "ফোন বিক্রি", href: "/sell-phone", emoji: "💰" },
            { label: "EMI সুবিধা", href: "/emi", emoji: "💳" },
            { label: "যোগাযোগ", href: "/contact", emoji: "📞" },
          ].map((action) => (
            <Link key={action.href} href={action.href}
              className="flex items-center gap-2 p-3 rounded-lg border border-border hover:bg-accent transition-colors text-sm font-medium">
              <span>{action.emoji}</span>
              {action.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Orders placeholder */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">সাম্প্রতিক অর্ডার</h2>
          <Link href="/user/orders" className="text-sm text-primary hover:underline">সব দেখুন</Link>
        </div>
        <div className="text-center py-8 text-muted-foreground">
          <ShoppingBag className="h-10 w-10 mx-auto mb-2 opacity-30" />
          <p className="text-sm">এখনো কোনো অর্ডার নেই</p>
          <Link href="/shop" className="text-sm text-primary hover:underline mt-1 inline-block">
            এখনই কিনুন →
          </Link>
        </div>
      </div>
    </div>
  );
}
