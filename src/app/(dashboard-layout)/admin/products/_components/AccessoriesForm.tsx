'use client';

import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import DateTimeField from './DateTimeField';
import { MultiImageUpload } from './MultiImageUpload';

// Mock data - Replace with API
const mockBrands = [
  { id: '1', name: 'Apple' },
  { id: '2', name: 'Samsung' },
  { id: '3', name: 'Anker' },
  { id: '4', name: 'Baseus' },
];

const mockAccessoryTypes = [
  { value: 'charger', label: 'Charger' },
  { value: 'earphone', label: 'Earphone' },
  { value: 'cover', label: 'Cover' },
  { value: 'glass', label: 'Glass' },
  { value: 'power_bank', label: 'Power Bank' },
];



const mockUnits = [
  { value: 'piece', label: 'Piece' },
  { value: 'box', label: 'Box' },
  { value: 'set', label: 'Set' },
  { value: 'pair', label: 'Pair' },
];

const mockSuppliers = [
  { id: '1', name: 'Karim Accessories', phone: '01711111111' },
  { id: '2', name: 'Global Tech', phone: '01822222222' },
];

export default function AccessoriesForm() {
  const [isNewSupplier, setIsNewSupplier] = useState(false);
  const [stockQty, setStockQty] = useState(1);
  const [barcodeStrategy, setBarcodeStrategy] = useState<'single' | 'unique'>('single');
  const [singleBarcode, setSingleBarcode] = useState('');
  const [barcodePrefix, setBarcodePrefix] = useState('ACC-');

  return (
    <div className="space-y-6">
      {/* Accessories Info */}
      <div className="card-base p-6 space-y-4">
        <h3 className="font-semibold text-lg">Accessories Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Label>Product Name *</Label>
            <Input placeholder="e.g., AirPods Pro 2" required />
          </div>
          <div>
            <Label>Accessory Type *</Label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {mockAccessoryTypes.map(type => (
                  <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Brand</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select brand" />
              </SelectTrigger>
              <SelectContent>
                {mockBrands.map(brand => (
                  <SelectItem key={brand.id} value={brand.id}>{brand.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Purchase Price (৳) *</Label>
            <Input type="number" placeholder="0" required />
          </div>
          <div>
            <Label>Selling Price (৳) *</Label>
            <Input type="number" placeholder="0" required />
          </div>
          <div>
            <Label>Offer Price (৳)</Label>
            <Input type="number" placeholder="0" />
          </div>
          <div>
            <Label>Unit Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                {mockUnits.map(unit => (
                  <SelectItem key={unit.value} value={unit.value}>{unit.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Stock Qty *</Label>
            <Input 
              type="number" 
              placeholder="0" 
              required 
              value={stockQty}
              onChange={(e) => setStockQty(Math.max(1, parseInt(e.target.value) || 1))}
            />
          </div>
          <div>
            <Label>Low Stock Alert Qty</Label>
            <Input type="number" placeholder="5" />
          </div>
          <div className="col-span-2 space-y-4 border-t pt-4">
            <h4 className="font-medium text-sm">Barcode Strategy</h4>
            <div className="flex flex-col sm:flex-row gap-4">
              <label className="flex items-center space-x-3 border p-3 rounded-md cursor-pointer flex-1 transition-colors hover:bg-accent/50">
                <input 
                  type="radio" 
                  checked={barcodeStrategy === 'single'} 
                  onChange={() => setBarcodeStrategy('single')}
                  className="w-4 h-4 text-primary accent-primary"
                />
                <div className="text-sm">
                  <p className="font-medium">Single Barcode Tracker</p>
                  <p className="text-muted-foreground text-xs">All physical items share one barcode</p>
                </div>
              </label>
              <label className="flex items-center space-x-3 border p-3 rounded-md cursor-pointer flex-1 transition-colors hover:bg-accent/50">
                <input 
                  type="radio" 
                  checked={barcodeStrategy === 'unique'} 
                  onChange={() => setBarcodeStrategy('unique')}
                  className="w-4 h-4 text-primary accent-primary"
                />
                <div className="text-sm">
                  <p className="font-medium">Unique Barcode per Item</p>
                  <p className="text-muted-foreground text-xs">Auto-generate distinct barcode for each</p>
                </div>
              </label>
            </div>
            
            {barcodeStrategy === 'single' ? (
              <div>
                <Label>Barcode (Skip to auto-generate)</Label>
                <div className="flex gap-2 mt-1">
                  <Input 
                    placeholder="Enter barcode or scan..." 
                    value={singleBarcode}
                    onChange={e => setSingleBarcode(e.target.value)}
                  />
                  <Button type="button" variant="outline" onClick={() => setSingleBarcode('ACC' + Math.floor(Math.random() * 1000000))}>Auto Generate</Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 bg-muted/30 border rounded-lg p-4">
                <div>
                  <Label>Barcode Prefix / Brand Code</Label>
                  <Input 
                    value={barcodePrefix}
                    onChange={e => setBarcodePrefix(e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1.5">This prefix will be used to generate distinct barcodes based on stock quantity ({stockQty}).</p>
                </div>
                {stockQty > 0 && (
                  <div>
                    <p className="text-xs font-semibold mb-2 text-muted-foreground">Generated Preview:</p>
                    <div className="flex flex-wrap gap-2">
                      {Array.from({ length: Math.min(stockQty, 10) }).map((_, i) => (
                         <span key={i} className="text-xs bg-background px-2 py-1 rounded border font-mono">
                           {barcodePrefix}{String(i + 1).padStart(3, '0')}
                         </span>
                      ))}
                      {stockQty > 10 && <span className="text-xs px-2 py-1 text-muted-foreground">...and {stockQty - 10} more</span>}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="col-span-2">
            <Label>Product Photos</Label>
            <MultiImageUpload />
          </div>
          <div className="col-span-2">
            <Label>Note</Label>
            <Textarea placeholder="Additional notes..." rows={3} />
          </div>
        </div>
      </div>

      {/* Optional Supplier */}
      <div className="card-base p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">Supplier (Optional)</h3>
          <Button 
            type="button" 
            variant="ghost" 
            size="sm" 
            className="text-primary hover:bg-primary/10"
            onClick={() => setIsNewSupplier(!isNewSupplier)}
          >
            {isNewSupplier ? 'Select Existing Supplier' : '+ Add New Supplier'}
          </Button>
        </div>
        
        {isNewSupplier ? (
          <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2">
            <div>
              <Label>New Supplier Name</Label>
              <Input placeholder="Enter supplier name" />
            </div>
            <div>
              <Label>Supplier Phone</Label>
              <Input placeholder="Enter phone number" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2">
            <div className="col-span-2">
              <Label>Select Supplier</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select existing supplier" />
                </SelectTrigger>
                <SelectContent>
                  {mockSuppliers.map(supplier => (
                    <SelectItem key={supplier.id} value={supplier.id}>
                      {supplier.name} {supplier.phone ? `(${supplier.phone})` : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
        
        <div>
          <Label>Invoice/Reference No</Label>
          <Input placeholder="Enter invoice or reference no" />
        </div>
        <DateTimeField label="Purchase Date & Time" />
      </div>

      {/* Marketing Flags */}
      <div className="card-base p-6 space-y-4">
        <h3 className="font-semibold text-lg">Marketing Options</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="featured" />
            <label htmlFor="featured" className="text-sm cursor-pointer">Featured Product</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="newArrival" />
            <label htmlFor="newArrival" className="text-sm cursor-pointer">New Arrival</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="trending" />
            <label htmlFor="trending" className="text-sm cursor-pointer">Trending</label>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit" className="flex-1">Save Product</Button>
        <Button type="button" variant="outline">Cancel</Button>
      </div>
    </div>
  );
}
