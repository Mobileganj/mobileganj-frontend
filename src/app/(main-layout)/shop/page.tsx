"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { mockProducts } from "@/lib/mock-data";
import ProductCard from "../(home)/_components/ProductCard";
import FilterSidebar from "./_components/FilterSidebar";
import { motion } from "framer-motion";
import { SlidersHorizontal, Search, RotateCcw, ChevronDown } from "lucide-react";

const sortOptions = [
  { value: "latest", label: "Default" },
  { value: "price-low", label: "Low to High" },
  { value: "price-high", label: "High to Low" },
];

export default function ShopPage() {
  const [sortBy, setSortBy] = useState("latest");
  const [sortOpen, setSortOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return [...mockProducts].sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return 0;
    });
  }, [sortBy]);

  return (
    <div>
      {/* Hero Banner — just a visual banner, no text */}
      <div className="w-full h-30 md:h-38 bg-gradient-to-r from-emerald-700 via-teal-600 to-cyan-600 overflow-hidden relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />
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
                key={sortBy}
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
                <p className="text-muted-foreground mb-4">No products found</p>
                <Button onClick={() => setSortBy("latest")} variant="outline" className="gap-2">
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
