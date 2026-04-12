'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { Plus, Search, Eye, Edit, Trash2, AlertTriangle, Smartphone, Headphones, Globe, Package, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

type ProductStatus = 'In Stock' | 'Out of Stock' | 'Low Stock';
type ProductCategory = 'Phone' | 'Accessories' | 'Others';
type ProductType = 'Overseas' | 'Local' | '—';

interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  type: ProductType;
  imei: string;
  purchase: number;
  selling: number;
  stock: number;
  status: ProductStatus;
}

const products: Product[] = [
  { id: '1', name: 'iPhone 15 Pro Max', category: 'Phone', type: 'Overseas', imei: '123456789012345', purchase: 139000, selling: 145000, stock: 5, status: 'In Stock' },
  { id: '2', name: 'Samsung S24 Ultra', category: 'Phone', type: 'Overseas', imei: '987654321098765', purchase: 129000, selling: 135000, stock: 3, status: 'In Stock' },
  { id: '3', name: 'iPhone 14 Pro', category: 'Phone', type: 'Local', imei: '456789012345678', purchase: 95000, selling: 105000, stock: 0, status: 'Out of Stock' },
  { id: '4', name: 'Samsung A54', category: 'Phone', type: 'Local', imei: '321098765432109', purchase: 32000, selling: 38000, stock: 7, status: 'In Stock' },
  { id: '5', name: 'AirPods Pro 2', category: 'Accessories', type: '—', imei: '—', purchase: 22000, selling: 25500, stock: 15, status: 'In Stock' },
  { id: '6', name: 'Samsung Earbuds', category: 'Accessories', type: '—', imei: '—', purchase: 8000, selling: 9500, stock: 2, status: 'Low Stock' },
  { id: '7', name: 'Phone Case (Universal)', category: 'Others', type: '—', imei: '—', purchase: 300, selling: 500, stock: 50, status: 'In Stock' },
  { id: '8', name: 'Screen Protector', category: 'Others', type: '—', imei: '—', purchase: 150, selling: 300, stock: 100, status: 'In Stock' },
];

type TabKey = 'all' | 'overseas' | 'local' | 'accessories' | 'others';

const TABS: { key: TabKey; label: string; icon: React.ReactNode; color: string }[] = [
  { key: 'all',         label: 'All Products',    icon: <Package className="w-4 h-4" />,     color: 'text-foreground' },
  { key: 'overseas',   label: 'Overseas Phone',   icon: <Globe className="w-4 h-4" />,       color: 'text-blue-600 dark:text-blue-400' },
  { key: 'local',      label: 'Local Phone',      icon: <Smartphone className="w-4 h-4" />,  color: 'text-green-600 dark:text-green-400' },
  { key: 'accessories',label: 'Accessories',      icon: <Headphones className="w-4 h-4" />,  color: 'text-purple-600 dark:text-purple-400' },
  { key: 'others',     label: 'Others',           icon: <ChevronRight className="w-4 h-4" />, color: 'text-orange-600 dark:text-orange-400' },
];

function getStatusBadge(status: ProductStatus) {
  switch (status) {
    case 'In Stock':
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">In Stock</span>;
    case 'Out of Stock':
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">Out of Stock</span>;
    case 'Low Stock':
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">Low Stock</span>;
  }
}

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const availableProducts = useMemo(() => products.filter(p => p.status !== 'Out of Stock'), []);

  const filteredProducts = useMemo(() => {
    let result = availableProducts;

    // Filter by tab
    switch (activeTab) {
      case 'overseas':
        result = result.filter(p => p.category === 'Phone' && p.type === 'Overseas');
        break;
      case 'local':
        result = result.filter(p => p.category === 'Phone' && p.type === 'Local');
        break;
      case 'accessories':
        result = result.filter(p => p.category === 'Accessories');
        break;
      case 'others':
        result = result.filter(p => p.category === 'Others');
        break;
      // 'all' — no filter
    }

    // Filter by search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.imei.toLowerCase().includes(q)
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      const map: Record<string, ProductStatus> = {
        'in-stock': 'In Stock',
        'out-of-stock': 'Out of Stock',
        'low-stock': 'Low Stock',
      };
      result = result.filter(p => p.status === map[statusFilter]);
    }

    return result;
  }, [activeTab, searchQuery, statusFilter]);

  // Summary counts
  const counts = useMemo(() => ({
    all: availableProducts.length,
    overseas: availableProducts.filter(p => p.category === 'Phone' && p.type === 'Overseas').length,
    local: availableProducts.filter(p => p.category === 'Phone' && p.type === 'Local').length,
    accessories: availableProducts.filter(p => p.category === 'Accessories').length,
    others: availableProducts.filter(p => p.category === 'Others').length,
  }), [availableProducts]);

  // Show IMEI column only for phone tabs
  const showImei = activeTab === 'all' || activeTab === 'overseas' || activeTab === 'local';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Products</h1>
          <p className="text-sm md:text-base text-muted-foreground">Manage your inventory</p>
        </div>
        <div className="flex flex-wrap sm:flex-nowrap gap-2">
          <Link href="/admin/products/damage" className="flex-1 sm:flex-none">
            <Button variant="outline" className="w-full">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Damage Tracking
            </Button>
          </Link>
          <Link href="/admin/products/new" className="flex-1 sm:flex-none">
            <Button className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Total Products</p>
          <h3 className="text-2xl font-bold mt-1">{availableProducts.length}</h3>
        </div>
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">In Stock</p>
          <h3 className="text-2xl font-bold mt-1 text-green-600">{availableProducts.filter(p => p.status === 'In Stock').length}</h3>
        </div>
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Low Stock</p>
          <h3 className="text-2xl font-bold mt-1 text-yellow-600">{availableProducts.filter(p => p.status === 'Low Stock').length}</h3>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="card-base overflow-hidden">
        <div className="flex overflow-x-auto border-b scrollbar-hide">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                'relative flex items-center gap-2 px-5 py-3.5 text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0',
                activeTab === tab.key
                  ? 'text-primary border-b-2 border-primary bg-primary/5'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              )}
            >
              <span className={activeTab === tab.key ? 'text-primary' : tab.color}>
                {tab.icon}
              </span>
              {tab.label}
              <span className={cn(
                'inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold',
                activeTab === tab.key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              )}>
                {counts[tab.key]}
              </span>
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="p-4 border-b bg-muted/20">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={showImei ? 'Search by name, IMEI...' : 'Search by name...'}
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="in-stock">In Stock</SelectItem>
                <SelectItem value="low-stock">Low Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-muted/40 whitespace-nowrap">
              <tr>
                <th className="text-left p-4 font-semibold text-sm">SL</th>
                <th className="text-left p-4 font-semibold text-sm">Product Name</th>
                {activeTab === 'all' && (
                  <th className="text-left p-4 font-semibold text-sm">Category</th>
                )}
                {(activeTab === 'all' || activeTab === 'overseas' || activeTab === 'local') && (
                  <th className="text-left p-4 font-semibold text-sm">Type</th>
                )}
                {showImei && (
                  <th className="text-left p-4 font-semibold text-sm">IMEI</th>
                )}
                <th className="text-right p-4 font-semibold text-sm">Purchase</th>
                <th className="text-right p-4 font-semibold text-sm">Selling</th>
                <th className="text-center p-4 font-semibold text-sm">Stock</th>
                <th className="text-center p-4 font-semibold text-sm">Status</th>
                <th className="text-center p-4 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="wait">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="text-center py-12 text-muted-foreground">
                      <Package className="w-10 h-10 mx-auto mb-3 opacity-30" />
                      <p className="text-sm">No products found</p>
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product, index) => (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ delay: index * 0.04 }}
                      className="border-t hover:bg-muted/30 transition-colors"
                    >
                      <td className="p-4 text-sm text-muted-foreground whitespace-nowrap">{index + 1}</td>
                      <td className="p-4 font-medium min-w-[180px]">{product.name}</td>
                      {activeTab === 'all' && (
                        <td className="p-4 text-sm">{product.category}</td>
                      )}
                      {(activeTab === 'all' || activeTab === 'overseas' || activeTab === 'local') && (
                        <td className="p-4">
                          <span className={cn(
                            'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium',
                            product.type === 'Overseas'
                              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                              : product.type === 'Local'
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                              : 'bg-muted text-muted-foreground'
                          )}>
                            {product.type}
                          </span>
                        </td>
                      )}
                      {showImei && (
                        <td className="p-4 text-sm text-muted-foreground font-mono">{product.imei}</td>
                      )}
                      <td className="p-4 text-right text-sm">৳{product.purchase.toLocaleString()}</td>
                      <td className="p-4 text-right text-sm font-medium">৳{product.selling.toLocaleString()}</td>
                      <td className="p-4 text-center text-sm font-semibold">{product.stock}</td>
                      <td className="p-4 text-center">{getStatusBadge(product.status)}</td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-1">
                          <Link href={`/admin/products/${product.id}`}>
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-blue-600">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Link href={`/admin/products/${product.id}`}>
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-green-600">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        {filteredProducts.length > 0 && (
          <div className="px-4 py-3 border-t bg-muted/20 text-sm text-muted-foreground">
            Showing {filteredProducts.length} of {counts[activeTab]} products
          </div>
        )}
      </div>
    </div>
  );
}
