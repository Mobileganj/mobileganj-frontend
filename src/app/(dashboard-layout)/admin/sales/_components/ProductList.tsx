"use client";

import { useState } from "react";
import { Package, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  imei?: string;
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    price: 145000,
    stock: 5,
    category: "Phone",
    imei: "123456789012345",
  },
  {
    id: "2",
    name: "Samsung S24 Ultra",
    price: 135000,
    stock: 3,
    category: "Phone",
    imei: "987654321098765",
  },
  {
    id: "3",
    name: "AirPods Pro 2",
    price: 25500,
    stock: 15,
    category: "Accessories",
  },
  {
    id: "4",
    name: "iPhone 15 Pro",
    price: 125000,
    stock: 8,
    category: "Phone",
    imei: "456789012345678",
  },
  {
    id: "5",
    name: "20W USB-C Charger",
    price: 2500,
    stock: 50,
    category: "Accessories",
  },
  {
    id: "6",
    name: "Google Pixel 8 Pro",
    price: 89000,
    stock: 7,
    category: "Phone",
    imei: "111222333444555",
  },
  {
    id: "7",
    name: "Samsung Buds 2 Pro",
    price: 18000,
    stock: 12,
    category: "Accessories",
  },
];

interface ProductListProps {
  onAddToCart: (product: Product) => void;
}

export default function ProductList({ onAddToCart }: ProductListProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts = mockProducts.filter((p) => {
    const searchLower = search.toLowerCase();
    const matchesSearch = 
      p.name.toLowerCase().includes(searchLower) || 
      (p.imei && p.imei.toLowerCase().includes(searchLower));
      
    const matchesCategory =
      selectedCategory === "all" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product: Product) => {
    onAddToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="card-base p-4 space-y-4 sticky top-6">
      <h3 className="font-semibold">Products</h3>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, IMEI or barcode..."
          className="pl-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant={selectedCategory === "all" ? "default" : "outline"}
          onClick={() => setSelectedCategory("all")}
          className="text-xs"
        >
          All
        </Button>
        <Button
          size="sm"
          variant={selectedCategory === "Phone" ? "default" : "outline"}
          onClick={() => setSelectedCategory("Phone")}
          className="text-xs"
        >
          Phones
        </Button>
        <Button
          size="sm"
          variant={selectedCategory === "Accessories" ? "default" : "outline"}
          onClick={() => setSelectedCategory("Accessories")}
          className="text-xs"
        >
          Accessories
        </Button>
      </div>

      {/* Product List */}
      <ScrollArea className="h-[calc(100vh-400px)]">
        <div className="space-y-2">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="p-3 rounded-lg border hover:border-primary cursor-pointer transition-colors group"
              onClick={() => handleAddToCart(product)}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center shrink-0">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                    {product.name}
                  </p>
                  <p className="text-sm font-semibold text-primary">
                    ৳{product.price.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Stock: {product.stock}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {filteredProducts.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No products found</p>
        </div>
      )}
    </div>
  );
}
