"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Smartphone, FileText, Eye, Wallet, CheckCircle2, Star, HandCoins, BadgeCheck, Zap, ShieldCheck, Banknote } from "lucide-react";

const steps = [
  { icon: FileText, label: "Provide Info", color: "text-blue-500" },
  { icon: Eye, label: "Get Price", color: "text-emerald-500" },
  { icon: Wallet, label: "Get Paid", color: "text-amber-500" },
];

export default function SellPhonePage() {
  const [formData, setFormData] = useState({
    name: "", phone: "", email: "",
    phoneBrand: "", phoneModel: "", storage: "", condition: "",
    accessories: "", expectedPrice: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Your request has been submitted! We'll contact you shortly.");
    setFormData({ name: "", phone: "", email: "", phoneBrand: "", phoneModel: "", storage: "", condition: "", accessories: "", expectedPrice: "" });
  };

  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-br from-orange-600 via-rose-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-14 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl font-bold mb-4"
          >
            Sell Your Old Phone in Just 3 Steps
          </motion.h1>

          {/* Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex items-center justify-center gap-4 mt-8 flex-wrap"
          >
            {steps.map((step, idx) => (
              <div key={step.label} className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-5 py-2.5 border border-white/20">
                  <step.icon className="h-4 w-4" />
                  <span className="text-sm font-semibold">{step.label}</span>
                </div>
                {idx < steps.length - 1 && (
                  <span className="text-white/40 text-lg">→</span>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-5 gap-6">

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-3"
          >
            <Card className="rounded-2xl border-border/60 overflow-hidden">
              <div className="bg-muted/30 px-5 py-4 border-b flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Smartphone className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h2 className="font-bold text-lg">Phone Details</h2>
                  <p className="text-xs text-muted-foreground">Provide accurate info for the best valuation</p>
                </div>
              </div>
              <CardContent className="p-5 sm:p-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Personal Info */}
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-1.5">
                      <BadgeCheck className="h-4 w-4 text-primary" />
                      Personal Information
                    </p>
                    <div className="space-y-3.5">
                      <div>
                        <Label htmlFor="name">Your Name *</Label>
                        <Input id="name" placeholder="Full name" value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="mt-1.5 rounded-xl" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input id="phone" type="tel" placeholder="01XXXXXXXXX" value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required className="mt-1.5 rounded-xl" />
                        </div>
                        <div>
                          <Label htmlFor="email">Email (Optional)</Label>
                          <Input id="email" type="email" placeholder="example@email.com" value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="mt-1.5 rounded-xl" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Phone Details */}
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-1.5">
                      <Smartphone className="h-4 w-4 text-primary" />
                      Phone Information
                    </p>
                    <div className="space-y-3.5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <Label>Brand *</Label>
                          <Select value={formData.phoneBrand} onValueChange={(v) => setFormData({ ...formData, phoneBrand: v })}>
                            <SelectTrigger className="mt-1.5 rounded-xl"><SelectValue placeholder="Select brand" /></SelectTrigger>
                            <SelectContent>
                              {["Apple", "Samsung", "Google", "OnePlus", "Xiaomi", "Vivo", "Oppo", "Realme", "Others"].map((b) => (
                                <SelectItem key={b} value={b.toLowerCase()}>{b}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="phoneModel">Model *</Label>
                          <Input id="phoneModel" placeholder="e.g. iPhone 14 Pro" value={formData.phoneModel}
                            onChange={(e) => setFormData({ ...formData, phoneModel: e.target.value })} required className="mt-1.5 rounded-xl" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <Label>Storage *</Label>
                          <Select value={formData.storage} onValueChange={(v) => setFormData({ ...formData, storage: v })}>
                            <SelectTrigger className="mt-1.5 rounded-xl"><SelectValue placeholder="Select storage" /></SelectTrigger>
                            <SelectContent>
                              {["64GB", "128GB", "256GB", "512GB", "1TB"].map((s) => (
                                <SelectItem key={s} value={s.toLowerCase()}>{s}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Condition *</Label>
                          <Select value={formData.condition} onValueChange={(v) => setFormData({ ...formData, condition: v })}>
                            <SelectTrigger className="mt-1.5 rounded-xl"><SelectValue placeholder="Select condition" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="excellent">Excellent (Like New)</SelectItem>
                              <SelectItem value="good">Good (Minor Scratches)</SelectItem>
                              <SelectItem value="fair">Fair (Visible Wear)</SelectItem>
                              <SelectItem value="poor">Poor (Damaged)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="accessories">Included Accessories (Optional)</Label>
                        <Input id="accessories" placeholder="e.g. Box, Charger, Earphone" value={formData.accessories}
                          onChange={(e) => setFormData({ ...formData, accessories: e.target.value })} className="mt-1.5 rounded-xl" />
                      </div>
                      <div>
                        <Label htmlFor="expectedPrice">Expected Price (Optional)</Label>
                        <Input id="expectedPrice" type="number" placeholder="৳ Amount" value={formData.expectedPrice}
                          onChange={(e) => setFormData({ ...formData, expectedPrice: e.target.value })} className="mt-1.5 rounded-xl" />
                      </div>
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full rounded-xl gap-2">
                    <HandCoins className="h-4 w-4" />
                    Submit for Valuation
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar — Why Sell */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="rounded-2xl border-border/60 overflow-hidden sticky top-24">
              <div className="bg-muted/30 px-5 py-4 border-b">
                <h3 className="font-bold flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary" />
                  Why Sell to Us?
                </h3>
              </div>
              <CardContent className="p-5">
                <ul className="space-y-2.5">
                  {[
                    { icon: Zap, text: "Instant Cash Payment" },
                    { icon: Banknote, text: "Best Market Price Guaranteed" },
                    { icon: ShieldCheck, text: "100% Safe & Secure Process" },
                  ].map((item) => (
                    <li key={item.text} className="flex items-center gap-2.5 p-3 rounded-xl bg-muted/40">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span className="text-sm font-medium">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
