'use client';

import { useState } from 'react';
import { Search, Eye, RotateCcw, Plus, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

const mockReturns = [
  { id: 'RET-001', invoiceNo: 'INV-001', date: '2024-01-29', customer: 'Karim Ahmed', product: 'iPhone 15 Pro', amount: 145000, reason: 'Defective', status: 'Pending' },
  { id: 'RET-002', invoiceNo: 'INV-005', date: '2024-01-28', customer: 'Fatima Rahman', product: 'AirPods Pro 2', amount: 25500, reason: 'Changed Mind', status: 'Approved' },
  { id: 'RET-003', invoiceNo: 'INV-012', date: '2024-01-27', customer: 'Rahim Khan', product: 'Samsung S24', amount: 135000, reason: 'Wrong Product', status: 'Refunded' },
];

export default function ReturnsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredReturns = mockReturns.filter(ret => {
    const matchesSearch = ret.invoiceNo.toLowerCase().includes(search.toLowerCase()) ||
                         ret.customer.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ret.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Returns & Refunds</h1>
          <p className="text-muted-foreground">Manage product returns and refunds</p>
        </div>
        
        {/* ADD NEW RETURN MODAL */}
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Return Request
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create Return Request</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Invoice Number</Label>
                <div className="flex gap-2">
                  <Input placeholder="Enter INV-XXX" />
                  <Button variant="secondary">Fetch Data</Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Select Product to Return</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select product" /></SelectTrigger>
                  <SelectContent>
                     {/* Mock products that would be loaded from invoice */}
                    <SelectItem value="p1">iPhone 15 Pro Max</SelectItem>
                    <SelectItem value="p2">Apple Charger 20W</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Return Reason</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select reason" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="defective">Defective / Damaged</SelectItem>
                    <SelectItem value="wrong">Wrong Product Shipped</SelectItem>
                    <SelectItem value="changed_mind">Changed Mind</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Refund Amount (৳)</Label>
                  <Input type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label>Deduct from Stock?</Label>
                  <Select defaultValue="yes">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes, restock it</SelectItem>
                      <SelectItem value="no">No, mark as damage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Additional Notes</Label>
                <Textarea placeholder="Any remarks..." />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Submit Request</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Total Returns</p>
          <h3 className="text-2xl font-bold mt-1">{mockReturns.length}</h3>
        </div>
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Pending</p>
          <h3 className="text-2xl font-bold mt-1 text-yellow-600">
            {mockReturns.filter(r => r.status === 'Pending').length}
          </h3>
        </div>
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Approved</p>
          <h3 className="text-2xl font-bold mt-1 text-blue-600">
            {mockReturns.filter(r => r.status === 'Approved').length}
          </h3>
        </div>
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Refunded</p>
          <h3 className="text-2xl font-bold mt-1 text-green-600">
            {mockReturns.filter(r => r.status === 'Refunded').length}
          </h3>
        </div>
      </div>

      <div className="card-base p-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by invoice or customer..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="card-base overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-semibold">Return ID</th>
                <th className="text-left p-4 font-semibold">Invoice No</th>
                <th className="text-left p-4 font-semibold">Date</th>
                <th className="text-left p-4 font-semibold">Customer</th>
                <th className="text-left p-4 font-semibold">Product</th>
                <th className="text-right p-4 font-semibold">Amount</th>
                <th className="text-left p-4 font-semibold">Reason</th>
                <th className="text-center p-4 font-semibold">Status</th>
                <th className="text-center p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReturns.map((ret, index) => (
                <motion.tr
                  key={ret.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-t hover:bg-muted/30 transition-colors"
                >
                  <td className="p-4 font-mono font-medium">{ret.id}</td>
                  <td className="p-4 font-mono">{ret.invoiceNo}</td>
                  <td className="p-4">{ret.date}</td>
                  <td className="p-4 font-medium">{ret.customer}</td>
                  <td className="p-4">{ret.product}</td>
                  <td className="p-4 text-right font-semibold">৳{ret.amount.toLocaleString()}</td>
                  <td className="p-4">{ret.reason}</td>
                  <td className="p-4 text-center">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      ret.status === 'Refunded' ? 'bg-green-100 text-green-700' :
                      ret.status === 'Approved' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {ret.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <Button variant="ghost" size="icon" title="View details">
                        <Eye className="w-4 h-4" />
                      </Button>
                      
                      {/* EDIT RETURN MODAL */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-blue-600" title="Process / Edit Return">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Process Return ({ret.id})</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label>Update Status</Label>
                              <Select defaultValue={ret.status.toLowerCase()}>
                                <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="approved">Approved</SelectItem>
                                  <SelectItem value="refunded">Refunded (Completed)</SelectItem>
                                  <SelectItem value="rejected">Rejected</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label>Refund Amount (৳)</Label>
                              <Input type="number" defaultValue={ret.amount} />
                            </div>
                            <div className="space-y-2">
                              <Label>Admin Notes</Label>
                              <Textarea placeholder="Notes regarding the refund..." />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit">Update Return</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
