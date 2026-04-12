'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, Save, Printer, Package, CreditCard, X } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import CustomerSearch from '../../_components/CustomerSearch';
import ProductList from '../../_components/ProductList';
import ProductCart from '../../_components/ProductCart';
import PaymentSummary from '../../_components/PaymentSummary';
import WarrantySettings from '../../_components/WarrantySettings';

// Inline compact date-time field for sale
function getNow() {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
}

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

export default function EditSalePage() {
  const params = useParams();
  const invoiceId = params.id as string;

  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeDrawer, setActiveDrawer] = useState<'products' | 'cart' | 'payment' | null>(null);
  const [saleDateTime, setSaleDateTime] = useState('');

  // Simulate fetching data on mount
  useEffect(() => { 
    // In a real app, you would fetch invoice details by `invoiceId`
    setSaleDateTime('2024-01-29T10:30');
    setCart([
      {
        id: '1',
        name: 'iPhone 15 Pro Max',
        imei: '123456789012345',
        qty: 1,
        price: 145000,
        stock: 5,
        warrantyId: '1',
        batteryHealth: 100
      }
    ]);
  }, [invoiceId]);

  const addToCart = (product: { id: string; name: string; price: number; stock: number; imei?: string }) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      if (existing.qty < product.stock) {
        setCart(cart.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        ));
      }
    } else {
      setCart([...cart, {
        id: product.id,
        name: product.name,
        imei: product.imei,
        qty: 1,
        price: product.price,
        stock: product.stock,
      }]);
    }
  };

  const updateQty = (id: string, delta: number) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, qty: Math.max(1, Math.min(item.stock, item.qty + delta)) } : item
    ));
  };

  const updateWarranty = (id: string, warrantyId: string) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, warrantyId } : item
    ));
  };

  const updateBatteryHealth = (id: string, batteryHealth: number) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, batteryHealth } : item
    ));
  };

  const removeItem = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const handleUpdate = () => {
    console.log('Updating sale...', { invoiceId, cart, subtotal, saleDateTime });
    window.location.href = `/admin/sales/invoice/${invoiceId}`;
  };

  const handleUpdateAndPrint = () => {
    console.log('Updating and printing...', { invoiceId, cart, subtotal, saleDateTime });
    window.location.href = `/admin/sales/invoice/${invoiceId}`;
  };

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/sales">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Edit Sale</h1>
            <p className="text-muted-foreground text-sm sm:text-base">Update existing invoice</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm text-muted-foreground">Invoice No:</span>
          <span className="font-mono font-bold text-sm sm:text-base">{invoiceId}</span>
        </div>
      </div>

      {/* Customer Search */}
      <CustomerSearch />

      {/* Sale Date & Time */}
      <div className="card-base p-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <label className="text-sm font-medium shrink-0">Sale Date &amp; Time</label>
          <div className="flex gap-2 flex-1">
            <input
              type="datetime-local"
              value={saleDateTime}
              onChange={(e) => setSaleDateTime(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
            />
            <button
              type="button"
              title="Reset to now"
              onClick={() => setSaleDateTime(getNow())}
              className="inline-flex items-center justify-center h-10 w-10 rounded-md border border-input bg-background hover:bg-accent text-muted-foreground hover:text-foreground transition-colors shrink-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile: Cart visible on screen */}
      <div className="lg:hidden space-y-4">
        <ProductCart
          cart={cart}
          onUpdateQty={updateQty}
          onRemoveItem={removeItem}
          onUpdateWarranty={updateWarranty}
          onUpdateBatteryHealth={updateBatteryHealth}
        />
        <WarrantySettings />
      </div>

      {/* Mobile: Floating Action Buttons */}
      <div className="lg:hidden fixed bottom-4 right-4 flex flex-col gap-3 z-40">
        <Button
          size="lg"
          className="rounded-full w-14 h-14 shadow-lg"
          onClick={() => setActiveDrawer('products')}
        >
          <Package className="w-6 h-6" />
        </Button>
        <Button
          size="lg"
          className="rounded-full w-14 h-14 shadow-lg"
          onClick={() => setActiveDrawer('payment')}
        >
          <CreditCard className="w-6 h-6" />
        </Button>
      </div>

      {/* Mobile: Drawer Overlay */}
      {activeDrawer && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-50"
          onClick={() => setActiveDrawer(null)}
        />
      )}

      {/* Mobile: Product List Drawer */}
      <div className={`lg:hidden fixed top-0 left-0 h-full w-[85%] max-w-sm bg-background shadow-xl z-50 transform transition-transform duration-300 ${activeDrawer === 'products' ? 'translate-x-0' : '-translate-x-full'
        }`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold">Products</h2>
          <Button variant="ghost" size="icon" onClick={() => setActiveDrawer(null)}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        <div className="overflow-y-auto h-[calc(100%-64px)]">
          <ProductList onAddToCart={addToCart} />
        </div>
      </div>

      {/* Mobile: Payment Drawer */}
      <div className={`lg:hidden fixed top-0 right-0 h-full w-[85%] max-w-sm bg-background shadow-xl z-50 transform transition-transform duration-300 ${activeDrawer === 'payment' ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold">Payment</h2>
          <Button variant="ghost" size="icon" onClick={() => setActiveDrawer(null)}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        <div className="overflow-y-auto h-[calc(100%-64px)] p-4 space-y-4">
          <PaymentSummary subtotal={subtotal} />
          <div className="space-y-3">
            <Button className="w-full" size="lg" onClick={handleUpdate}>
              <Save className="w-4 h-4 mr-2" />
              Update Sale
            </Button>
            <Button variant="outline" className="w-full" size="lg" onClick={handleUpdateAndPrint}>
              <Printer className="w-4 h-4 mr-2" />
              Update & Print
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop: 3 Column Layout */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-6">
        {/* Left: Product List */}
        <div className="lg:col-span-3">
          <ProductList onAddToCart={addToCart} />
        </div>

        {/* Middle: Cart & Warranty */}
        <div className="lg:col-span-6 space-y-6">
          <ProductCart
            cart={cart}
            onUpdateQty={updateQty}
            onRemoveItem={removeItem}
            onUpdateWarranty={updateWarranty}
            onUpdateBatteryHealth={updateBatteryHealth}
          />
          <WarrantySettings />
        </div>

        {/* Right: Payment Summary */}
        <div className="lg:col-span-3 space-y-6">
          <PaymentSummary subtotal={subtotal} />

          {/* Actions */}
          <div className="space-y-3">
            <Button className="w-full" size="lg" onClick={handleUpdate}>
              <Save className="w-4 h-4 mr-2" />
              Update Sale
            </Button>
            <Button variant="outline" className="w-full" size="lg" onClick={handleUpdateAndPrint}>
              <Printer className="w-4 h-4 mr-2" />
              Update & Print
            </Button>
            <Link href="/admin/sales" className="block">
              <Button variant="ghost" className="w-full">
                Cancel
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
