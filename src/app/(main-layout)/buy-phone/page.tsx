"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { mockProducts } from "@/lib/mock-data";
import ProductCard from "../(home)/_components/ProductCard";
import FilterSidebar from "../shop/_components/FilterSidebar";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, Search, RotateCcw, ChevronDown } from "lucide-react";

const sortOptions = [
  { value: "latest", label: "Default" },
  { value: "price-low", label: "Low to High" },
  { value: "price-high", label: "High to Low" },
];

// Brand-specific banner gradients
const brandBanners: Record<string, { gradient: string }> = {
  all: { gradient: "from-blue-700 via-indigo-700 to-violet-700" },
  Apple: { gradient: "from-gray-800 via-gray-700 to-gray-600" },
  Samsung: { gradient: "from-blue-600 via-blue-700 to-indigo-800" },
  Google: { gradient: "from-red-500 via-yellow-500 to-green-500" },
  OnePlus: { gradient: "from-red-600 via-red-700 to-orange-700" },
  Xiaomi: { gradient: "from-orange-500 via-orange-600 to-red-600" },
  Others: { gradient: "from-teal-600 via-cyan-600 to-sky-600" },
};

export default function BuyPhonePage() {
  const [sortBy, setSortBy] = useState("latest");
  const [sortOpen, setSortOpen] = useState(false);
  const [activeBrand, setActiveBrand] = useState("all");

  const brandCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    mockProducts.filter((p) => p.category === "Phone").forEach((p) => {
      counts[p.brand] = (counts[p.brand] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredProducts = useMemo(() => {
    let phones = mockProducts.filter((p) => p.category === "Phone");
    if (activeBrand !== "all") phones = phones.filter((p) => p.brand === activeBrand);
    return [...phones].sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return 0;
    });
  }, [sortBy, activeBrand]);

  const banner = brandBanners[activeBrand] || brandBanners.all;
  const brandLabel = activeBrand === "all" ? "Phones" : activeBrand;

  return (
    <div>
      {/* Hero Banner — changes per brand */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeBrand}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className={`w-full h-30 md:h-38 bg-gradient-to-r ${banner.gradient} overflow-hidden relative`}
        >
          <div className="absolute inset-0 flex items-end p-8 max-w-7xl mx-auto">
            <div>
              <p className="text-white/60 text-sm mb-1">Mobile Phone</p>
              <h1 className="text-white text-3xl md:text-4xl font-bold">{brandLabel}</h1>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
        </motion.div>
      </AnimatePresence>

      {/* Brand Chips */}
      <div className="border-b border-border/40 bg-background">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveBrand("all")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${activeBrand === "all"
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border/60 hover:bg-accent"
                }`}
            >
              All
            </button>
            {Object.entries(brandCounts).map(([brand, count]) => (
              <button
                key={brand}
                onClick={() => setActiveBrand(brand)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${activeBrand === brand
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border/60 hover:bg-accent"
                  }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-6 lg:gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <Card className="rounded-xl border-border/60 overflow-hidden">
                <div className="px-4 py-3 border-b">
                  <h3 className="font-bold text-sm flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                  </h3>
                </div>
                <CardContent className="p-0">
                  <FilterSidebar />
                </CardContent>
              </Card>
            </div>
          </aside>

          {/* Products Area */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="lg:hidden gap-2 rounded-lg">
                      <SlidersHorizontal className="h-4 w-4" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 overflow-y-auto">
                    <FilterSidebar isMobile onClose={() => { }} />
                  </SheetContent>
                </Sheet>
                <p className="text-sm text-muted-foreground">
                  Showing: <span className="font-semibold text-foreground">({filteredProducts.length} Items)</span>
                </p>
              </div>

              {/* Sort By */}
              <div className="relative">
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  className="flex items-center gap-2 text-sm font-medium border border-border/60 rounded-lg px-3 py-2 hover:bg-accent transition-colors"
                >
                  Sort By
                  <ChevronDown className={`h-4 w-4 transition-transform ${sortOpen ? "rotate-180" : ""}`} />
                </button>
                {sortOpen && (
                  <div className="absolute right-0 top-full mt-1 bg-popover border rounded-lg shadow-lg z-10 min-w-36 overflow-hidden">
                    {sortOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => { setSortBy(opt.value); setSortOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-accent transition-colors ${sortBy === opt.value ? "bg-primary/10 text-primary font-medium" : ""}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <motion.div
                key={sortBy + activeBrand}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              >
                {filteredProducts.map((product, idx) => (
                  <ProductCard key={product.id} product={product} index={idx} />
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-16">
                <Search className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">No phones found</p>
                <Button onClick={() => { setSortBy("latest"); setActiveBrand("all"); }} variant="outline" className="gap-2">
                  <RotateCcw className="h-4 w-4" />Reset
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
