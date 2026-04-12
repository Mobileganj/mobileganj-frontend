"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Truck,
  DollarSign,
  TrendingUp,
  Wrench,
  Plane,
  Settings,
  LogOut,
  X,
  Home,
  ExternalLink,
  GitBranch,
  ChevronDown,
  ChevronRight,
  Plus,
  List,
  Tag,
  Layers,
  AlertTriangle,
  Barcode,
  FolderTree,
  Settings2,
  Receipt,
  Shield,
  RotateCcw,
  UserPlus,
  UserCog,
  UsersRound,
  Wallet,
  TruckIcon,
  FileText,
  BookOpen,
  BarChart3,
  FolderOpen,
  UserCircle,
  CheckCircle,
  PackageCheck,
  Box,
  Archive,
  ClipboardList,
  Bell,
  ArrowRightLeft,
  Send,
  History,
  BookText,
  Warehouse,
  LayoutGrid,
  ArrowDownUp,
  FileBarChart,
  Calculator,
  FileSpreadsheet,
  TrendingDown,
  Scale,
  PieChart,
  Globe,
  Image,
  Megaphone,
  Star,
  MessageSquare,
  ShieldCheck,
  RefreshCw,
  CreditCard,
  Info,
  Phone,
  Store,
  Smartphone,
  Headphones,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/use-auth";
import { useAuthStore } from "@/hooks/use-auth-store";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: GitBranch, label: "Branches", href: "/admin/branches", adminOnly: true },
  { 
    icon: Package, 
    label: "Products", 
    href: "/admin/products",
    submenu: [
      { icon: Plus, label: "Add New Product", href: "/admin/products/new" },
      { icon: List, label: "All Products", href: "/admin/products" },
      { icon: Tag, label: "Brands", href: "/admin/products/brands" },
      { icon: FolderTree, label: "Categories", href: "/admin/products/categories" },
      { icon: AlertTriangle, label: "Damages", href: "/admin/products/damage" },
      { icon: Barcode, label: "Print Barcode", href: "/admin/products/barcode" },
      { icon: Settings2, label: "Settings", href: "/admin/products/settings" },
    ]
  },
  { 
    icon: ShoppingCart, 
    label: "Sales", 
    href: "/admin/sales",
    submenu: [
      { icon: Plus, label: "New Sale", href: "/admin/sales/new" },
      { icon: Receipt, label: "All Sales", href: "/admin/sales" },
      { icon: FileText, label: "Invoice Settings", href: "/admin/sales/invoice-settings" },
      { icon: RotateCcw, label: "Returns", href: "/admin/sales/returns" },
    ]
  },
  { 
    icon: Users, 
    label: "Customers", 
    href: "/admin/customers",
    submenu: [
      { icon: UserPlus, label: "Add Customer", href: "/admin/customers/new" },
      { icon: Users, label: "All Customers", href: "/admin/customers" },
      { icon: Wallet, label: "Due Collection", href: "/admin/customers/due-collection" },
      { icon: UserCog, label: "Customer Types", href: "/admin/customers/types" },
      { icon: UsersRound, label: "Customer Groups", href: "/admin/customers/groups" },
    ]
  },
  { 
    icon: Truck, 
    label: "Suppliers", 
    href: "/admin/suppliers",
    submenu: [
      { icon: Plus, label: "Add Overseas Supplier", href: "/admin/suppliers/new" },
      { icon: Plus, label: "Add Local Seller", href: "/admin/suppliers/local/new" },
      { icon: Plane, label: "Overseas Suppliers", href: "/admin/suppliers" },
      { icon: Home, label: "Local Sellers", href: "/admin/suppliers/local" },
      { icon: DollarSign, label: "Payment Due", href: "/admin/suppliers/payment-due" },
      { icon: FileText, label: "Purchase History", href: "/admin/suppliers/purchase-history" },
      { icon: BookOpen, label: "Supplier Ledger", href: "/admin/suppliers/ledger" },
    ]
  },
  { 
    icon: DollarSign, 
    label: "Expense", 
    href: "/admin/expense",
    submenu: [
      { icon: Plus, label: "Add Expense", href: "/admin/expense/new" },
      { icon: Receipt, label: "All Expenses", href: "/admin/expense" },
      { icon: FolderOpen, label: "Categories", href: "/admin/expense/categories" },
      { icon: BarChart3, label: "Reports", href: "/admin/expense/reports" },
    ]
  },
  { 
    icon: TrendingUp, 
    label: "Investment", 
    href: "/admin/investment",
    submenu: [
      { icon: Plus, label: "Add Investment", href: "/admin/investment/new" },
      { icon: TrendingUp, label: "All Investments", href: "/admin/investment" },
      { icon: UserCircle, label: "Investors", href: "/admin/investment/investors" },
      { icon: BarChart3, label: "Reports", href: "/admin/investment/reports" },
    ]
  },
  { 
    icon: Wrench, 
    label: "Servicing", 
    href: "/admin/servicing",
    submenu: [
      { icon: Plus, label: "Add Service Job", href: "/admin/servicing/new" },
      { icon: Wrench, label: "All Service Jobs", href: "/admin/servicing" },
      { icon: CheckCircle, label: "Due Collection", href: "/admin/servicing/due-collection" },
      { icon: BarChart3, label: "Reports", href: "/admin/servicing/reports" },
    ]
  },
  { 
    icon: Plane,
    label: "Overseas Tracking",
    href: "/admin/overseas-tracking",
    adminOnly: true,
    submenu: [
      { icon: Plus, label: "Add Shipment", href: "/admin/overseas-tracking/new" },
      { icon: Plane, label: "All Shipments", href: "/admin/overseas-tracking" },
      { icon: Plane, label: "In Transit", href: "/admin/overseas-tracking/in-transit" },
      { icon: PackageCheck, label: "Delivered", href: "/admin/overseas-tracking/delivered" },
      { icon: DollarSign, label: "Payment Status", href: "/admin/overseas-tracking/payment-status" },
    ]
  },
  { divider: true },
  { 
    icon: Box,
    label: "Inventory",
    href: "/admin/inventory",
    submenu: [
      { 
        icon: Archive, 
        label: "Opening & Own Stock",
        submenu: [
          { icon: Package, label: "Own Stock", href: "/admin/inventory/own-stock" },
          { icon: Package, label: "Opening Stock", href: "/admin/inventory/opening-stock" },
          { icon: ClipboardList, label: "Set Bulk Opening Stock", href: "/admin/inventory/bulk-opening-stock" },
        ]
      },
      { icon: Package, label: "Product Stocks", href: "/admin/inventory/product-stocks" },
      { icon: ClipboardList, label: "Product Summary", href: "/admin/inventory/product-summary" },
      { icon: Bell, label: "Stock Alert Quantity", href: "/admin/inventory/stock-alert" },
      { 
        icon: ArrowRightLeft, 
        label: "Product Transfer",
        submenu: [
          { icon: Send, label: "Create Transfer [B2B, B2G]", href: "/admin/inventory/create-transfer" },
          { icon: ArrowRightLeft, label: "Stock Transfer [G2B]", href: "/admin/inventory/stock-transfer" },
          { icon: History, label: "Transferred Histories", href: "/admin/inventory/transfer-history" },
        ]
      },
      { icon: BookText, label: "Product Ledger Table", href: "/admin/inventory/product-ledger" },
      { 
        icon: AlertTriangle, 
        label: "Add Damage Product",
        submenu: [
          { icon: Plus, label: "Add Damage Product", href: "/admin/inventory/add-damage" },
          { icon: AlertTriangle, label: "All Damage Products", href: "/admin/inventory/all-damage" },
        ]
      },
    ]
  },
  { divider: true },
  { 
    icon: Warehouse,
    label: "Godown",
    href: "/admin/godown",
    submenu: [
      { icon: LayoutGrid, label: "Godown Dashboard", href: "/admin/godown/dashboard" },
      { icon: Package, label: "Current Stock Info", href: "/admin/godown/current-stock" },
      { icon: ArrowDownUp, label: "Stock Transfer [G2B]", href: "/admin/godown/stock-transfer" },
      { icon: Receipt, label: "Stock Transfer Invoices", href: "/admin/godown/transfer-invoices" },
      { icon: FileBarChart, label: "Stock In Out Report", href: "/admin/godown/stock-report" },
    ]
  },
  { divider: true },
  { 
    icon: Calculator,
    label: "Acc & Transaction",
    href: "/admin/accounting",
    submenu: [
      { 
        icon: BarChart3, 
        label: "Reports",
        submenu: [
          { icon: FileBarChart, label: "Sales Report", href: "/admin/accounting/reports/sales" },
          { icon: ShoppingCart, label: "Purchase Report", href: "/admin/accounting/reports/purchase" },
          { icon: TrendingDown, label: "Expense Report", href: "/admin/accounting/reports/expense" },
          { icon: TrendingUp, label: "Profit & Loss", href: "/admin/accounting/reports/profit-loss" },
          { icon: Users, label: "Customer Due Report", href: "/admin/accounting/reports/customer-due" },
          { icon: Truck, label: "Supplier Due Report", href: "/admin/accounting/reports/supplier-due" },
          { icon: Wrench, label: "Service Report", href: "/admin/accounting/reports/service" },
          { icon: Package, label: "Stock Report", href: "/admin/accounting/reports/stock" },
          { icon: DollarSign, label: "Payment Report", href: "/admin/accounting/reports/payment" },
        ]
      },
      { 
        icon: FileSpreadsheet, 
        label: "Account Statement",
        submenu: [
          { icon: BookOpen, label: "Day Book", href: "/admin/accounting/statement/day-book" },
          { icon: BookText, label: "Ledger Report", href: "/admin/accounting/statement/ledger" },
          { icon: Receipt, label: "Expense Ledger", href: "/admin/accounting/statement/expense-ledger" },
          { icon: Scale, label: "Trial Balance", href: "/admin/accounting/statement/trial-balance" },
          { icon: TrendingUp, label: "Income & Expenditure", href: "/admin/accounting/statement/income-expenditure" },
          { icon: PieChart, label: "Balance Sheet", href: "/admin/accounting/statement/balance-sheet" },
        ]
      },
    ]
  },
  { divider: true },
  {
    icon: ShieldCheck,
    label: "Staff Management",
    href: "/admin/staff",
    submenu: [
      { icon: UserPlus, label: "Invite Staff", href: "/admin/staff/new" },
      { icon: Users, label: "All Staffs", href: "/admin/staff" },
      { icon: Shield, label: "Roles & Permissions", href: "/admin/staff/roles" },
    ]
  },
  { divider: true },
  { 
    icon: Globe,
    label: "Website",
    href: "/admin/website",
    submenu: [
      { 
        icon: Home, 
        label: "Pages",
        submenu: [
          { icon: Home, label: "Home Page", href: "/admin/website/pages/home" },
          { icon: Store, label: "Shop Page", href: "/admin/website/pages/shop" },
          { icon: Smartphone, label: "Buy Phone Page", href: "/admin/website/pages/buy-phone" },
          { icon: DollarSign, label: "Sell Phone Page", href: "/admin/website/pages/sell-phone" },
          { icon: Headphones, label: "Accessories Page", href: "/admin/website/pages/accessories" },
          { icon: Plane, label: "Pre-Order Page", href: "/admin/website/pages/pre-order" },
          { icon: Tag, label: "Offers Page", href: "/admin/website/pages/offers" },
          { icon: Info, label: "About Us", href: "/admin/website/pages/about" },
          { icon: Phone, label: "Contact Us", href: "/admin/website/pages/contact" },
        ]
      },
      { 
        icon: Image, 
        label: "Banners & Sliders",
        submenu: [
          { icon: Image, label: "Hero Banners", href: "/admin/website/banners/hero" },
          { icon: Megaphone, label: "Promotional Banners", href: "/admin/website/banners/promotional" },
          { icon: Tag, label: "Category Banners", href: "/admin/website/banners/category" },
        ]
      },
      { icon: FolderTree, label: "Featured Categories", href: "/admin/website/featured-categories" },
      { icon: Tag, label: "Brands Management", href: "/admin/website/brands" },
      { icon: Star, label: "Featured Products", href: "/admin/website/featured-products" },
      { icon: Megaphone, label: "Deals & Offers", href: "/admin/website/deals" },
      { icon: MessageSquare, label: "Testimonials", href: "/admin/website/testimonials" },
      { 
        icon: FileText, 
        label: "Policies & Info",
        submenu: [
          { icon: CreditCard, label: "EMI Information", href: "/admin/website/policies/emi" },
          { icon: ShieldCheck, label: "Warranty Policy", href: "/admin/website/policies/warranty" },
          { icon: RefreshCw, label: "Return Policy", href: "/admin/website/policies/return" },
          { icon: FileText, label: "Terms & Conditions", href: "/admin/website/policies/terms" },
          { icon: ShieldCheck, label: "Privacy Policy", href: "/admin/website/policies/privacy" },
        ]
      },
      { icon: ShoppingCart, label: "Cart Settings", href: "/admin/website/cart-settings" },
      { icon: Settings2, label: "Website Settings", href: "/admin/website/settings" },
    ]
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const logout = useLogout();
  const { user } = useAuthStore();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleMenu = (label: string) => {
    setExpandedMenus(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-50 bg-card border-r h-screen flex flex-col transition-all duration-300 shrink-0",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          isCollapsed ? "lg:w-20 w-64" : "w-64"
        )}
      >
        {/* Header */}
        <div className={cn("p-4 border-b flex items-center relative overflow-hidden min-h-[80px]", isCollapsed ? "justify-center px-0" : "justify-between")}>
          <div className={cn("transition-all duration-300 overflow-hidden flex flex-col items-center", isCollapsed ? "w-0 opacity-0" : "flex-1 opacity-100")}>
            <Link href="/admin/dashboard" className="flex items-center justify-center w-full">
              <img src="/logo.png" alt="Mobile GANJ" className="h-10 w-auto object-contain scale-125 logo-adaptive" />
            </Link>
            <span className="text-[10px] text-muted-foreground font-medium mt-2">POS SYSTEM</span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className={cn("hidden lg:flex shrink-0 z-10 text-muted-foreground hover:text-foreground", isCollapsed ? "mx-auto" : "absolute right-2")}
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </Button>

          <Button variant="ghost" size="icon" className="lg:hidden absolute right-2 bg-background/80" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Menu */}
        <nav className={cn("flex-1 overflow-y-auto overflow-x-hidden p-2 text-sm", isCollapsed && "[&::-webkit-scrollbar]:!hidden [-ms-overflow-style:none] [scrollbar-width:none]")}>
          {menuItems.map((item, index) => {
            // Render divider
            if ('divider' in item && item.divider) {
              return (
                <div key={`divider-${index}`} className="my-2 mx-4 border-t border-border" />
              );
            }

            if (!('icon' in item) || !item.icon) return null;

            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname?.startsWith((item.href ?? '') + "/");
            const isExpanded = expandedMenus.includes(item.label ?? '');
            const hasSubmenu = 'submenu' in item && item.submenu && item.submenu.length > 0;

            return (
              <div key={item.href ?? `item-${index}`}>
                {hasSubmenu ? (
                  <>
                    <button
                      onClick={() => {
                        if (isCollapsed) setIsCollapsed(false);
                        toggleMenu(item.label ?? '');
                      }}
                      className={cn(
                        "flex items-center rounded-lg transition-all duration-200",
                        isCollapsed ? "w-11 h-11 mx-auto justify-center px-0" : "w-full px-4 py-3 gap-3",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent text-muted-foreground hover:text-foreground",
                      )}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <Icon className={cn("shrink-0", isCollapsed ? "w-5 h-5" : "w-5 h-5")} />
                      <div className={cn("flex items-center overflow-hidden transition-all duration-300", isCollapsed ? "w-0 opacity-0" : "flex-1 opacity-100 ml-3")}>
                        <span className="font-medium flex-1 text-left whitespace-nowrap">{item.label ?? ''}</span>
                        <ChevronDown className={cn(
                          "w-4 h-4 shrink-0 transition-transform duration-200",
                          isExpanded && !isCollapsed ? "rotate-0" : "-rotate-90"
                        )} />
                      </div>
                    </button>
                    <div className={cn(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      (isExpanded && !isCollapsed) ? "max-h-[800px] opacity-100 mt-1" : "max-h-0 opacity-0"
                    )}>
                      <div className="ml-4 space-y-1">
                        {'submenu' in item && item.submenu?.map((subItem: any, subIndex: number) => {
                          const SubIcon = subItem.icon;
                          const hasNestedSubmenu = subItem.submenu && subItem.submenu.length > 0;
                          
                          if (hasNestedSubmenu && subItem.submenu) {
                            const isNestedExpanded = expandedMenus.includes(subItem.label ?? '');
                            return (
                              <div key={`${item.label}-${subIndex}`}>
                                <button
                                  onClick={() => toggleMenu(subItem.label ?? '')}
                                  className="w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-150 text-sm hover:bg-accent text-muted-foreground hover:text-foreground"
                                >
                                  <SubIcon className="w-4 h-4 shrink-0" />
                                  <span className="flex-1 text-left">{subItem.label ?? ''}</span>
                                  <ChevronRight className={cn(
                                    "w-3 h-3 transition-transform duration-200",
                                    isNestedExpanded ? "rotate-90" : "rotate-0"
                                  )} />
                                </button>
                                <div className={cn(
                                  "overflow-hidden transition-all duration-300 ease-in-out",
                                  isNestedExpanded ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"
                                )}>
                                  <div className="ml-4 space-y-1">
                                    {subItem.submenu?.map((nestedItem: any) => {
                                      const NestedIcon = nestedItem.icon;
                                      const isNestedActive = pathname === nestedItem.href;
                                      return (
                                        <Link
                                          key={nestedItem.href ?? `nested-${subIndex}`}
                                          href={nestedItem.href ?? '#'}
                                          onClick={onClose}
                                          className={cn(
                                            "flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-150 text-sm",
                                            isNestedActive
                                              ? "bg-primary/10 text-primary font-medium"
                                              : "hover:bg-accent text-muted-foreground hover:text-foreground hover:translate-x-1",
                                          )}
                                        >
                                          <NestedIcon className="w-4 h-4 shrink-0" />
                                          <span>{nestedItem.label ?? ''}</span>
                                        </Link>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            );
                          }
                          
                          const isSubActive = pathname === subItem.href;
                          return (
                            <Link
                              key={subItem.href ?? `sub-${subIndex}`}
                              href={subItem.href ?? '#'}
                              onClick={onClose}
                              className={cn(
                                "flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-150 text-sm",
                                isSubActive
                                  ? "bg-primary/10 text-primary font-medium"
                                  : "hover:bg-accent text-muted-foreground hover:text-foreground hover:translate-x-1",
                              )}
                            >
                              <SubIcon className="w-4 h-4 shrink-0" />
                              <span>{subItem.label ?? ''}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href ?? '#'}
                    onClick={onClose}
                    title={isCollapsed ? item.label : undefined}
                    className={cn(
                      "flex items-center rounded-lg transition-all duration-200",
                      isCollapsed ? "w-11 h-11 mx-auto justify-center px-0" : "w-full px-4 py-3 gap-3",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <Icon className={cn("shrink-0", isCollapsed ? "w-5 h-5" : "w-5 h-5")} />
                    <div className={cn("flex items-center overflow-hidden transition-all duration-300", isCollapsed ? "w-0 opacity-0" : "flex-1 opacity-100 ml-3")}>
                      <span className="font-medium flex-1 whitespace-nowrap">{item.label ?? ''}</span>
                      {'adminOnly' in item && item.adminOnly && (
                        <span className="ml-auto shrink-0 text-[10px] bg-orange-500 text-white px-1.5 py-0.5 rounded">
                          Admin
                        </span>
                      )}
                    </div>
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t text-sm space-y-2">
          <Link
            href="/"
            target="_blank"
            onClick={onClose}
            title={isCollapsed ? "Visit Website" : undefined}
            className={cn(
              "flex items-center rounded-lg transition-colors",
              isCollapsed ? "w-11 h-11 mx-auto justify-center p-0 hover:bg-primary/10 text-primary" : "px-4 py-2 gap-3 hover:bg-primary/10 text-primary hover:text-primary",
            )}
          >
            <Home className={cn("shrink-0", isCollapsed ? "w-5 h-5" : "w-5 h-5")} />
            <div className={cn("flex items-center overflow-hidden transition-all duration-300", isCollapsed ? "w-0 opacity-0" : "flex-1 opacity-100 ml-3")}>
               <span className="font-medium whitespace-nowrap">Visit Website</span>
               <ExternalLink className="w-3.5 h-3.5 ml-auto opacity-50 shrink-0" />
            </div>
          </Link>
          <Link
            href="/admin/settings"
            onClick={onClose}
            title={isCollapsed ? "Settings" : undefined}
            className={cn(
               "flex items-center rounded-lg transition-colors",
               isCollapsed ? "w-11 h-11 mx-auto justify-center p-0 hover:bg-accent text-muted-foreground hover:text-foreground" : "px-4 py-2 gap-3 hover:bg-accent text-muted-foreground hover:text-foreground",
            )}
          >
            <Settings className={cn("shrink-0", isCollapsed ? "w-5 h-5" : "w-5 h-5")} />
            <div className={cn("flex items-center overflow-hidden transition-all duration-300", isCollapsed ? "w-0 opacity-0" : "flex-1 opacity-100 ml-3")}>
               <span className="font-medium whitespace-nowrap">Settings</span>
            </div>
          </Link>
          <button
            onClick={() => logout.mutate()}
            title={isCollapsed ? "Logout" : undefined}
            className={cn(
               "w-full flex items-center rounded-lg transition-colors",
               isCollapsed ? "w-11 h-11 mx-auto justify-center p-0 hover:bg-destructive/10 text-destructive" : "px-4 py-2 gap-3 hover:bg-destructive/10 text-destructive",
            )}
          >
            <LogOut className={cn("shrink-0", isCollapsed ? "w-5 h-5" : "w-5 h-5")} />
            <div className={cn("flex items-center overflow-hidden transition-all duration-300", isCollapsed ? "w-0 opacity-0" : "flex-1 opacity-100 ml-3")}>
               <span className="font-medium whitespace-nowrap">Logout</span>
            </div>
          </button>
        </div>
      </aside>
    </>
  );
}
