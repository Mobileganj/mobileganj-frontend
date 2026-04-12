'use client';

import { useState } from 'react';
import { Plus, Minus, X, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const mockWarranties = [
  { id: '1', name: '1 Year Official Warranty', months: 12 },
  { id: '2', name: '6 Months Warranty', months: 6 },
  { id: '3', name: '3 Months Warranty', months: 3 },
  { id: '4', name: 'No Warranty', months: 0 },
];

interface CartItem {
  id: string;
  name: string;
  imei?: string;
  qty: number;
  price: number;
  stock: number;
  warrantyId?: string;
  batteryHealth?: number;
}

interface ProductCartProps {
  cart: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onUpdateWarranty?: (id: string, warrantyId: string) => void;
  onUpdateBatteryHealth?: (id: string, batteryHealth: number) => void;
}

export default function ProductCart({ cart, onUpdateQty, onRemoveItem, onUpdateWarranty, onUpdateBatteryHealth }: ProductCartProps) {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);


  return (
    <div className="bg-card border rounded-lg p-3 sm:p-6 space-y-3 sm:space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-base sm:text-lg">Cart Items</h3>
        <span className="text-xs sm:text-sm text-muted-foreground">{cart.length} items</span>
      </div>


      {/* Cart Items */}
      {cart.length > 0 ? (
        <div className="space-y-2 sm:space-y-3">
          {cart.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 p-3 rounded-lg bg-muted/30">
              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm sm:text-base truncate">{item.name}</p>
                {item.imei && (
                  <p className="text-xs text-muted-foreground">IMEI: {item.imei}</p>
                )}
                <div className="mt-2 w-full max-w-[450px] flex items-center gap-2">
                  <Select
                    value={item.warrantyId}
                    onValueChange={(val) => onUpdateWarranty && onUpdateWarranty(item.id, val)}
                  >
                    <SelectTrigger className="h-7 text-xs sm:h-8 flex-1">
                      <SelectValue placeholder="Select warranty" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockWarranties.map(w => (
                        <SelectItem key={w.id} value={w.id} className="text-xs">
                          {w.name} ({w.months} m)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {/* Conditional Battery Health Input */}
                  {(item.name.toLowerCase().includes('iphone') || item.name.toLowerCase().includes('apple')) && (
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-xs text-muted-foreground whitespace-nowrap">BH %:</span>
                      <Input 
                        type="number" 
                        min="1" 
                        max="100" 
                        placeholder="100"
                        className="h-7 text-xs sm:h-8 w-16 text-center px-1"
                        value={item.batteryHealth || ''}
                        onChange={(e) => onUpdateBatteryHealth && onUpdateBatteryHealth(item.id, parseInt(e.target.value) || 0)}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Quantity Controls & Price - Mobile: Row, Desktop: Separate */}
              <div className="flex items-center justify-between sm:justify-end gap-3">
                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7 sm:h-8 sm:w-8"
                    onClick={() => onUpdateQty(item.id, -1)}
                    disabled={item.qty === 1}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="w-6 sm:w-8 text-center font-medium text-sm">{item.qty}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7 sm:h-8 sm:w-8"
                    onClick={() => onUpdateQty(item.id, 1)}
                    disabled={item.qty >= item.stock}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>

                {/* Price */}
                <div className="text-right min-w-[90px] sm:min-w-[100px]">
                  <p className="font-semibold text-sm sm:text-base">৳{(item.price * item.qty).toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">৳{item.price.toLocaleString()} each</p>
                </div>

                {/* Remove Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive h-7 w-7 sm:h-8 sm:w-8"
                  onClick={() => onRemoveItem(item.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 sm:py-12 text-muted-foreground">
          <p className="text-sm">No items in cart</p>
          <p className="text-xs mt-1">Add products to get started</p>
        </div>
      )}

      {/* Subtotal */}
      {cart.length > 0 && (
        <div className="pt-3 border-t">
          <div className="flex justify-between text-base sm:text-lg font-semibold">
            <span>Subtotal</span>
            <span>৳{subtotal.toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
}
