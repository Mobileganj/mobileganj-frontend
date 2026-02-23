"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, ArrowRight, Minus, Plus, Trash2, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/hooks/use-cart";
import Image from "next/image";
import Link from "next/link";

export default function CartDrawer() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCartStore();
  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();
  const deliveryCharge = totalPrice >= 5000 ? 0 : 80;
  const grandTotal = totalPrice + deliveryCharge;

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") router.back(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [router]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => router.back()}
        />

        {/* Drawer */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
          className="relative w-full max-w-md bg-background h-full flex flex-col shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b shrink-0">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-primary" />
              <h2 className="font-bold text-lg">শপিং কার্ট</h2>
              {totalItems > 0 && (
                <span className="text-xs bg-primary text-primary-foreground rounded-full px-2 py-0.5 font-semibold">
                  {totalItems}
                </span>
              )}
            </div>
            <button
              onClick={() => router.back()}
              className="p-2 rounded-full hover:bg-accent transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-16">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <ShoppingCart className="h-10 w-10 text-primary/40" />
                </div>
                <div>
                  <p className="font-semibold text-lg">কার্ট খালি!</p>
                  <p className="text-sm text-muted-foreground mt-1">পণ্য যোগ করুন</p>
                </div>
                <Button onClick={() => router.back()} variant="outline" className="rounded-full">
                  শপিং করুন
                </Button>
              </div>
            ) : (
              items.map((item) => {
                const unitPrice = item.offerPrice || item.price;
                return (
                  <div key={item.id} className="flex gap-3 bg-card border border-border/60 rounded-xl p-3">
                    <Link href={`/product/${item.slug}`} onClick={() => router.push(`/product/${item.slug}`)} className="shrink-0">
                      <div className="relative w-20 h-20 bg-muted/50 rounded-lg overflow-hidden">
                        <Image
                          src={item.images[0] || "/placeholder.jpg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </Link>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold line-clamp-2 leading-tight">{item.name}</p>
                      {item.selectedVariant && (
                        <div className="flex gap-1 mt-1 flex-wrap">
                          {item.selectedVariant.storage && (
                            <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded-full">{item.selectedVariant.storage}</span>
                          )}
                          {item.selectedVariant.color && (
                            <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded-full">{item.selectedVariant.color}</span>
                          )}
                        </div>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-0.5 bg-muted/50 rounded-full p-0.5">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="h-6 w-6 rounded-full flex items-center justify-center hover:bg-background disabled:opacity-40 transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-7 text-center text-xs font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.stock}
                            className="h-6 w-6 rounded-full flex items-center justify-center hover:bg-background disabled:opacity-40 transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-primary">
                            ৳{(unitPrice * item.quantity).toLocaleString("bn-BD")}
                          </p>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t px-5 py-4 space-y-3 shrink-0 bg-background">
              {/* Free delivery progress */}
              {totalPrice < 5000 && (
                <div className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400">
                  <Truck className="h-3.5 w-3.5 shrink-0" />
                  <span>আরো ৳{(5000 - totalPrice).toLocaleString("bn-BD")} অর্ডারে ফ্রি ডেলিভারি</span>
                </div>
              )}

              {/* Totals */}
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>ডেলিভারি</span>
                  <span className={deliveryCharge === 0 ? "text-emerald-500" : ""}>
                    {deliveryCharge === 0 ? "ফ্রি" : `৳${deliveryCharge}`}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-base">
                  <span>সর্বমোট</span>
                  <span className="text-primary">৳{grandTotal.toLocaleString("bn-BD")}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="w-full rounded-xl text-sm" onClick={() => { window.location.href = "/cart"; }}>
                  কার্ট দেখুন
                </Button>
                <Button className="w-full rounded-xl gap-1.5 text-sm font-semibold" onClick={() => { window.location.href = "/checkout"; }}>
                  চেকআউট
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
