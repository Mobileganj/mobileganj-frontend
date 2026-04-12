"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Phone,
  ChevronDown,
  ChevronRight,
  Smartphone,
  Headphones,
  ShieldCheck,
  Zap,
  Tag,
  Gift,
  RefreshCw,
  Package,
  CreditCard,
  Star,
  Sparkles,
  Heart,
  MapPin,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/hooks/use-cart";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/hooks/use-auth-store";
import { useLogout } from "@/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MegaMenuColumn {
  title: string;
  icon?: React.ReactNode;
  links: { href: string; label: string; badge?: string }[];
}

interface NavItem {
  label: string;
  href?: string;
  highlight?: boolean;
  icon?: React.ReactNode;
  megaMenu?: {
    columns: MegaMenuColumn[];
    featured?: { title: string; description: string; href: string };
  };
}

const navItems: NavItem[] = [
  {
    label: "Phones",
    icon: <Smartphone className="h-4 w-4" />,
    megaMenu: {
      columns: [
        {
          title: "By Brand",
          icon: <Star className="h-4 w-4" />,
          links: [
            { href: "/shop?brand=Apple", label: "Apple iPhone" },
            { href: "/shop?brand=Samsung", label: "Samsung Galaxy" },
            { href: "/shop?brand=Google", label: "Google Pixel" },
            { href: "/shop?brand=OnePlus", label: "OnePlus" },
            { href: "/shop?brand=Xiaomi", label: "Xiaomi / Redmi" },
            { href: "/shop?brand=Nothing", label: "Nothing" },
            { href: "/shop?brand=Vivo", label: "Vivo" },
            { href: "/shop", label: "All Brands →" },
          ],
        },
      ],
      featured: {
        title: "🔥 iPhone 15 Pro Max",
        description: "Dubai Import - 1 Year Warranty | Only ৳1,39,000",
        href: "/product/iphone-15-pro-max",
      },
    },
  },
  {
    label: "Accessories",
    icon: <Headphones className="h-4 w-4" />,
    megaMenu: {
      columns: [
        {
          title: "Brand",
          icon: <Star className="h-4 w-4" />,
          links: [
            { href: "/accessories?brand=Apple", label: "Apple Accessories" },
            {
              href: "/accessories?brand=Samsung",
              label: "Samsung Accessories",
            },
            { href: "/accessories?brand=Others", label: "Third Party" },
            { href: "/accessories", label: "View All →" },
          ],
        },
      ],
    },
  },
  {
    label: "Used Phone",
    href: "/buy-phone",
    icon: <RefreshCw className="h-4 w-4" />,
  },
  {
    label: "Sell Phone",
    href: "/sell-phone",
    icon: <Tag className="h-4 w-4" />,
  },

  { label: "EMI", href: "/emi", icon: <CreditCard className="h-4 w-4" /> },
  { label: "Contact", href: "/contact", icon: <MapPin className="h-4 w-4" /> },
];

/* ─── Desktop Mega Menu ─── */
function DesktopMegaMenu({
  item,
  isOpen,
  onOpen,
  onClose,
  cancelClose,
}: {
  item: NavItem;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  cancelClose: () => void;
}) {
  const pathname = usePathname();
  const isActive = item.href ? pathname === item.href : false;

  if (!item.megaMenu) {
    return (
      <Link
        href={item.href || "#"}
        className={cn(
          "relative flex items-center gap-1.5 px-3.5 py-3 text-[13px] font-semibold transition-all duration-200 whitespace-nowrap",
          item.highlight
            ? "text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300"
            : isActive
              ? "text-primary"
              : "text-foreground/70 hover:text-foreground",
        )}
      >
        {item.icon}
        {item.label}
        {isActive && (
          <motion.div
            layoutId="nav-active"
            className="absolute bottom-0 left-3 right-3 h-[2.5px] bg-primary rounded-full"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        onOpen();
      }}
      onMouseLeave={onClose}
    >
      <button
        className={cn(
          "relative flex items-center gap-1.5 px-3.5 py-3 text-[13px] font-semibold transition-all duration-200 whitespace-nowrap",
          isOpen ? "text-primary" : "text-foreground/70 hover:text-foreground",
        )}
      >
        {item.icon}
        {item.label}
        <ChevronDown
          className={cn(
            "h-3 w-3 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
        {isOpen && (
          <motion.div
            layoutId="nav-active"
            className="absolute bottom-0 left-3 right-3 h-[2.5px] bg-primary rounded-full"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full z-50"
            onMouseEnter={() => {
              cancelClose();
              onOpen();
            }}
            onMouseLeave={onClose}
          >
            <div className="h-2" />
            <div className="rounded-xl border bg-popover shadow-2xl ring-1 ring-black/5 dark:ring-white/5 p-6 min-w-[600px]">
              <div className="flex gap-8">
                <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-1 lg:grid-cols-3">
                  {item.megaMenu.columns.map((col) => (
                    <div key={col.title}>
                      <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                        {col.icon}
                        {col.title}
                      </h4>
                      <ul className="space-y-1">
                        {col.links.map((link) => (
                          <li key={link.href + link.label}>
                            <Link
                              href={link.href}
                              className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-foreground/80 hover:text-foreground hover:bg-accent transition-colors"
                              onClick={onClose}
                            >
                              {link.label}
                              {link.badge && (
                                <span className="text-xs">{link.badge}</span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              {item.megaMenu.featured && (
                <Link
                  href={item.megaMenu.featured.href}
                  className="mt-5 block rounded-lg bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-100 dark:border-blue-900/30 p-4 hover:shadow-md transition-shadow"
                  onClick={onClose}
                >
                  <p className="font-semibold text-sm">
                    {item.megaMenu.featured.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {item.megaMenu.featured.description}
                  </p>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Mobile Menu Item ─── */
function MobileMenuItem({
  item,
  onClose,
}: {
  item: NavItem;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  if (!item.megaMenu) {
    return (
      <Link
        href={item.href || "#"}
        className={cn(
          "flex items-center gap-3 py-3 px-4 rounded-lg text-sm font-medium transition-colors",
          item.highlight
            ? "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/10"
            : "hover:bg-accent",
        )}
        onClick={onClose}
      >
        {item.icon}
        {item.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full py-3 px-4 rounded-lg text-sm font-medium hover:bg-accent transition-colors"
      >
        <span className="flex items-center gap-3">
          {item.icon}
          {item.label}
        </span>
        <ChevronRight
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            expanded && "rotate-90",
          )}
        />
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pl-4 pb-2 space-y-1">
              {item.megaMenu.columns.map((col) => (
                <div key={col.title} className="py-2">
                  <p className="px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    {col.title}
                  </p>
                  {col.links.map((link) => (
                    <Link
                      key={link.href + link.label}
                      href={link.href}
                      className="flex items-center gap-2 py-2 px-4 text-sm text-foreground/80 hover:text-foreground rounded-md hover:bg-accent transition-colors"
                      onClick={onClose}
                    >
                      {link.label}
                      {link.badge && (
                        <span className="text-xs">{link.badge}</span>
                      )}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── User Button ─── */
function UserButton() {
  const { user, isAuthenticated } = useAuthStore();
  const logout = useLogout();
  const ADMIN_ROLES = ["superadmin", "admin", "staff"];
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <Button
        variant="ghost"
        size="default"
        className="hidden md:inline-flex opacity-0"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted">
          <User className="h-4 w-4" />
        </div>
      </Button>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <Link href="/login" className="hidden md:inline-flex">
        <Button
          variant="ghost"
          size="default"
          className="gap-2 text-sm rounded-full hover:bg-accent px-3 text-white"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted">
            <User className="h-4 w-4" />
          </div>
          <span className="hidden lg:inline text-xs font-semibold">
            Login / Register
          </span>
        </Button>
      </Link>
    );
  }

  const dashboardHref = ADMIN_ROLES.includes(user.role)
    ? "/admin/dashboard"
    : "/user/dashboard";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="default"
          className="hidden md:inline-flex gap-2 text-sm rounded-full hover:bg-accent px-3 text-white"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <span className="hidden lg:inline text-xs font-semibold max-w-20 truncate">
            {user.name}
          </span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="dark w-48 bg-popover text-popover-foreground">
        <div className="px-3 py-2">
          <p className="text-sm font-semibold truncate">{user.name}</p>
          <p className="text-xs text-muted-foreground truncate">
            {user.email || user.phone}
          </p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={dashboardHref}>Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/user/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => logout.mutate()}
          className="text-destructive focus:text-destructive"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* ─── Main Header ─── */
export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMegaMenu, setOpenMegaMenu] = useState<string | null>(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { user, isAuthenticated } = useAuthStore();
  const logout = useLogout();
  const ADMIN_ROLES = ["superadmin", "admin", "staff"];
  const [isMounted, setIsMounted] = useState(false);

  const scheduleClose = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => setOpenMegaMenu(null), 150);
  };

  const cancelClose = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  return (
    <>
      <header className="dark text-foreground sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 ">
        {/* ─── Top Bar ─── */}
        <div className="bg-primary text-primary-foreground ">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-xs h-9">
            <div className="flex items-center gap-2">
              <Zap className="h-3.5 w-3.5" />
              <p className="hidden sm:block">
                Dubai Import | 7-Day Delivery | EMI Available | Warranty
              </p>
              <p className="sm:hidden">🚀 EMI Available | 7-Day Delivery</p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/pre-order"
                className="hidden sm:inline font-semibold hover:underline"
              >
                🔥 Pre-Order
              </Link>
              <Link
                href="/offers"
                className="hidden sm:inline font-semibold hover:underline"
              >
                ✨ Offers
              </Link>
              <span className="hidden sm:inline text-primary-foreground/50">
                |
              </span>
              <a
                href="tel:+8801234567890"
                className="flex items-center gap-1 hover:underline"
              >
                <Phone className="h-3 w-3" />
                <span className="hidden sm:inline">+880 1234-567890</span>
                <span className="sm:hidden">Call Us</span>
              </a>
              <span className="hidden sm:inline text-primary-foreground/50">
                |
              </span>
              <Link href="/shop" className="hidden sm:inline hover:underline">
                Track Order
              </Link>
            </div>
          </div>
        </div>

        {/* ─── Main Header ─── */}
        <div className="border-b bg-background">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center">
            <Link href="/" className="shrink-0 mr-8 scale-200 ml-10">
              <img
                src="/logo.png"
                alt="Mobile GANJ"
                className="h-9 w-auto logo-adaptive"
              />
            </Link>

            <div className="hidden md:flex flex-1 justify-center">
              <div className="relative w-full max-w-xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search iPhone, Samsung, AirPods..."
                  className={cn(
                    "pl-11 pr-24 h-11 rounded-full border-2 transition-all duration-200 bg-muted/30",
                    searchFocused
                      ? "border-cyan-500 ring-2 ring-cyan-500/20 bg-background"
                      : "border-cyan-500/30 hover:border-cyan-500/60",
                  )}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
                <Button
                  size="sm"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full h-8 px-5 text-xs font-semibold"
                >
                  Search
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0 ml-auto">
              <ThemeToggle className="text-white" />

              <Link href="/offers" className="hidden md:inline-flex">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative rounded-full hover:bg-accent text-white"
                >
                  <Heart className="h-[18px] w-[18px]" />
                </Button>
              </Link>

              <div className="hidden lg:block w-px h-6 bg-border mx-1" />

              <UserButton />

              <div className="hidden md:block w-px h-6 bg-border mx-1" />

              <Link href="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative rounded-full hover:bg-accent text-white"
                >
                  <ShoppingCart className="h-[18px] w-[18px]" />
                  {isMounted && totalItems > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 h-[18px] min-w-[18px] rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold px-1">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden rounded-full text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          <div className="md:hidden px-4 pb-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search phones, accessories..."
                className="pl-10 h-10 rounded-full bg-muted/40 border-transparent"
              />
            </div>
          </div>
        </div>

        {/* ─── Desktop Nav ─── */}
        <nav className="hidden md:block border-b bg-background/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-center gap-2">
              {navItems.map((item) => (
                <DesktopMegaMenu
                  key={item.label}
                  item={item}
                  isOpen={openMegaMenu === item.label}
                  onOpen={() => {
                    cancelClose();
                    setOpenMegaMenu(item.label);
                  }}
                  onClose={scheduleClose}
                  cancelClose={cancelClose}
                />
              ))}
            </div>
          </div>
        </nav>
      </header>

      {/* ─── Mobile Slide-in Menu ─── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-60 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="dark fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-background text-foreground z-70 md:hidden overflow-y-auto"
            >
              <div className="flex items-center justify-between p-4 border-b">
                <Link
                  href="/"
                  className="flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <span className="text-lg font-bold">
                    Mobile<span className="text-primary">GANJ</span>
                  </span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="p-4 border-b">
                {isMounted && isAuthenticated && user ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-accent/50">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">
                          {user.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {user.email || user.phone}
                        </p>
                      </div>
                    </div>
                    <Link
                      href={
                        ADMIN_ROLES.includes(user.role)
                          ? "/admin/dashboard"
                          : "/user/dashboard"
                      }
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-colors text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        logout.mutate();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-2 w-full p-3 rounded-xl text-sm text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center gap-3 p-3 rounded-xl bg-accent/50 hover:bg-accent transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Login / Register</p>
                      <p className="text-xs text-muted-foreground">
                        Access your account
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 ml-auto text-muted-foreground" />
                  </Link>
                )}
              </div>

              <div className="p-3 space-y-0.5">
                <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Menu
                </p>
                {navItems.map((item) => (
                  <MobileMenuItem
                    key={item.label}
                    item={item}
                    onClose={() => setMobileMenuOpen(false)}
                  />
                ))}
              </div>

              <div className="p-3 border-t">
                <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Quick Links
                </p>
                {[
                  {
                    href: "/warranty",
                    icon: <ShieldCheck className="h-4 w-4" />,
                    label: "Warranty Check",
                  },
                  {
                    href: "/emi",
                    icon: <CreditCard className="h-4 w-4" />,
                    label: "EMI Calculator",
                  },
                  {
                    href: "/return",
                    icon: <RefreshCw className="h-4 w-4" />,
                    label: "Return Policy",
                  },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 py-3 px-4 rounded-lg text-sm hover:bg-accent transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
