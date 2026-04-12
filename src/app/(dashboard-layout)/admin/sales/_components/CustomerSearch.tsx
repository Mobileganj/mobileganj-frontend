'use client';

import { useState } from 'react';
import { Search, Plus, UserPlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

export default function CustomerSearch() {
  const [phone, setPhone] = useState('');
  const [showNewCustomer, setShowNewCustomer] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newCustomerPhone, setNewCustomerPhone] = useState('');
  const [newCustomerAddress, setNewCustomerAddress] = useState('');

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    setShowNewCustomer(value.length === 11);
  };

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomerName.trim() || !newCustomerPhone.trim()) {
      toast.error('Name and phone are required');
      return;
    }
    toast.success('Customer created successfully');
    setPhone(newCustomerPhone);
    setIsModalOpen(false);
    setNewCustomerName('');
    setNewCustomerPhone('');
    setNewCustomerAddress('');
  };

  return (
    <div className="card-base p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-base">Customer Information</h3>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline" className="h-8 text-xs">
              <UserPlus className="w-3.5 h-3.5 mr-1.5" />
              Add Customer
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateCustomer} className="space-y-4">
              <div>
                <Label htmlFor="name">Customer Name *</Label>
                <Input
                  id="name"
                  value={newCustomerName}
                  onChange={(e) => setNewCustomerName(e.target.value)}
                  placeholder="Enter customer name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={newCustomerPhone}
                  onChange={(e) => setNewCustomerPhone(e.target.value)}
                  placeholder="Enter phone number"
                  required
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={newCustomerAddress}
                  onChange={(e) => setNewCustomerAddress(e.target.value)}
                  placeholder="Enter address (optional)"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Create Customer
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="space-y-1.5">
          <Label className="text-xs">Customer Phone *</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Enter phone number"
              className="pl-9 h-9 text-sm"
              value={phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              required
            />
          </div>
          {showNewCustomer && (
            <p className="text-[10px] text-primary mt-0.5 absolute font-medium animate-in fade-in">New customer detected</p>
          )}
        </div>

        {showNewCustomer && (
          <>
            <div className="space-y-1.5 animate-in fade-in slide-in-from-left-2 md:slide-in-from-bottom-2">
              <Label className="text-xs">Customer Name *</Label>
              <Input placeholder="Enter customer name" required className="h-9 text-sm" />
            </div>
            <div className="space-y-1.5 animate-in fade-in slide-in-from-left-2 md:slide-in-from-bottom-2">
              <Label className="text-xs">Address</Label>
              <Input placeholder="Enter address (optional)" className="h-9 text-sm" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
