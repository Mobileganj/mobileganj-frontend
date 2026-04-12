'use client';

import { Bell, ChevronDown, User, Menu, LogOut, Settings, LayoutDashboard, Plus, ShoppingCart, Package, CreditCard, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/shared/ThemeToggle';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthStore } from '@/hooks/use-auth-store';
import { useLogout } from '@/hooks/use-auth';

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

export default function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const { user } = useAuthStore();
  const logout = useLogout();

  return (
    <header className="h-16 border-b bg-card sticky top-0 z-10 flex items-center justify-between px-4 md:px-6">
      {/* Left */}
      <div className="flex items-center gap-2 md:gap-4 flex-1">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick}>
          <Menu className="w-5 h-5" />
        </Button>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:flex">
            <a href="/admin/sales/new" className="gap-2">
              <Plus className="w-4 h-4" />
              New Sale
            </a>
          </Button>
          <Button asChild variant="outline" size="sm" className="hidden md:flex">
            <a href="/admin/products/new" className="gap-2">
              <Package className="w-4 h-4" />
              Add Product
            </a>
          </Button>
          <Button asChild variant="outline" size="sm" className="hidden lg:flex">
            <a href="/admin/customers/due-collection" className="gap-2">
              <CreditCard className="w-4 h-4" />
              Due Paid
            </a>
          </Button>
          <Button asChild variant="outline" size="sm" className="hidden xl:flex">
            <a href="/admin/expense/new" className="gap-2">
              <DollarSign className="w-4 h-4" />
              Add Expense
            </a>
          </Button>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 md:gap-3">
        <ThemeToggle />

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 px-2 md:px-3">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                {user?.name?.charAt(0).toUpperCase() ?? <User className="w-4 h-4" />}
              </div>
              <div className="text-left hidden md:block">
                <p className="text-sm font-medium">{user?.name ?? 'Admin'}</p>
                <p className="text-xs text-muted-foreground capitalize">{user?.role ?? ''}</p>
              </div>
              <ChevronDown className="w-4 h-4 hidden md:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <div className="px-3 py-2">
              <p className="text-sm font-semibold truncate">{user?.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <a href="/admin/dashboard" className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" />Dashboard
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href="/admin/settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />Settings
              </a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => logout.mutate()}
              className="text-destructive focus:text-destructive flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
