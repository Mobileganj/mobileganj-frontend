"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Heart, Bookmark, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/product";
import { motion } from "framer-motion";
import { useCartStore } from "@/hooks/use-cart";
import { toast } from "sonner";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const hasOffer = product.offerPrice && product.offerPrice < product.price;
  const discount = hasOffer
    ? Math.round(((product.price - product.offerPrice!) / product.price) * 100)
    : 0;
  const savedAmount = hasOffer ? product.price - product.offerPrice! : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.name} added to cart`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const isOutOfStock = product.stock === 0 && !product.isPreOrder;
  const isLowStock = product.stock > 0 && product.stock <= 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: "easeOut" }}
      className="group h-full"
    >
      <Link href={`/product/${product.slug}`} className="block h-full">
        <div className="relative h-full rounded-xl border border-border/60 bg-card overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-1">
          {/* ── Image Section ── */}
          <div className="relative aspect-square bg-muted/30 overflow-hidden">
            {/* Skeleton loader */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-muted animate-pulse" />
            )}

            <Image
              src={product.images[0] || "/placeholder.jpg"}
              alt={product.name}
              fill
              className={`object-cover transition-all duration-500 group-hover:scale-105 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />

            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* ── Top Left Badges ── */}
            <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
              {hasOffer && (
                <Badge className="bg-red-500 hover:bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 shadow-sm">
                  -{discount}%
                </Badge>
              )}
              {product.tags?.includes("New Arrival") && (
                <Badge className="bg-blue-500 hover:bg-blue-500 text-white text-[10px] font-medium px-2 py-0.5 shadow-sm">
                  নতুন
                </Badge>
              )}
              {product.tags?.includes("Hot") && (
                <Badge className="bg-orange-500 hover:bg-orange-500 text-white text-[10px] font-medium px-2 py-0.5 shadow-sm">
                  <Zap className="h-2.5 w-2.5 mr-0.5 fill-current" />
                  হট
                </Badge>
              )}
              {product.tags?.includes("Best Deal") && (
                <Badge className="bg-emerald-500 hover:bg-emerald-500 text-white text-[10px] font-medium px-2 py-0.5 shadow-sm">
                  বেস্ট ডিল
                </Badge>
              )}
              {product.isPreOrder && (
                <Badge className="bg-violet-500 hover:bg-violet-500 text-white text-[10px] font-medium px-2 py-0.5 shadow-sm">
                  প্রি-অর্ডার
                </Badge>
              )}
            </div>

            {/* ── Condition Badge (Top Right) ── */}
            {product.condition !== "Brand New" && (
              <div className="absolute top-2.5 right-2.5">
                <Badge
                  variant="outline"
                  className={`text-[10px] font-medium backdrop-blur-sm shadow-sm ${
                    product.condition === "Used"
                      ? "bg-amber-500/90 text-white border-amber-500"
                      : "bg-teal-500/90 text-white border-teal-500"
                  }`}
                >
                  {product.condition === "Used" ? "ইউজড" : "লাইক নিউ"}
                </Badge>
              </div>
            )}

            {/* ── Hover Action Buttons ── */}
            <div className="absolute right-2.5 top-2.5 flex flex-col gap-1.5">
              <button
                className={`h-8 w-8 rounded-full shadow-md flex items-center justify-center transition-colors ${
                  isWishlisted
                    ? "bg-red-500 text-white"
                    : "bg-white/90 hover:bg-white dark:bg-gray-800/90 text-foreground"
                }`}
                onClick={handleWishlist}
              >
                <Heart className={`h-3.5 w-3.5 ${isWishlisted ? "fill-white" : ""}`} />
              </button>
              <button
                className="h-8 w-8 rounded-full shadow-md bg-white/90 hover:bg-white dark:bg-gray-800/90 flex items-center justify-center transition-colors"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
              >
                <Bookmark className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* ── Out of Stock Overlay ── */}
            {isOutOfStock && (
              <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center">
                <span className="bg-red-500 text-white text-xs font-bold px-4 py-1.5 rounded-full">
                  স্টক শেষ
                </span>
              </div>
            )}
          </div>

          {/* ── Content Section ── */}
          <div className="p-3.5 flex flex-col gap-1.5">
            {/* Brand */}
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
              {product.brand}
            </span>

            {/* Product Name */}
            <h3 className="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-200">
              {product.name}
            </h3>

            {/* Price Section */}
            <div className="flex flex-col gap-0.5 mt-2">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-foreground">
                  ৳{(hasOffer ? product.offerPrice! : product.price).toLocaleString()}
                </span>
                {hasOffer && (
                  <span className="text-xs text-muted-foreground line-through">
                    ৳{product.price.toLocaleString()}
                  </span>
                )}
              </div>
              {hasOffer && (
                <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                  ৳{savedAmount.toLocaleString()} OFF
                </span>
              )}
            </div>


          </div>
        </div>
      </Link>
    </motion.div>
  );
}
