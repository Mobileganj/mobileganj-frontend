'use client';

import { useState, useRef, useEffect } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, X, ScanLine, ChevronDown, Check } from 'lucide-react';
import DateTimeField from './DateTimeField';
import { MultiImageUpload } from './MultiImageUpload';

// Mock data - Replace with API
const mockBrands = [
  { id: '1', name: 'Apple' },
  { id: '2', name: 'Samsung' },
  { id: '3', name: 'Google' },
];

const mockRegions = [
  { value: 'usa', label: 'USA' },
  { value: 'japan', label: 'Japan' },
  { value: 'australia', label: 'Australia' },
  { value: 'uk', label: 'UK' },
  { value: 'european', label: 'European' },
  { value: 'other', label: 'Other' },
];

function RegionCombobox() {
  const [regions, setRegions] = useState(mockRegions.map(r => r.label));
  const [selected, setSelected] = useState<string>('');
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = regions.filter(r =>
    r.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleSelect = (region: string) => {
    setSelected(region);
    setInputValue(region);
    setIsOpen(false);
  };

  const handleAdd = () => {
    const trimmed = inputValue.trim();
    if (!trimmed || regions.map(r => r.toLowerCase()).includes(trimmed.toLowerCase())) return;
    setRegions(prev => [...prev, trimmed]);
    setSelected(trimmed);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered.length === 1) {
        handleSelect(filtered[0]);
      } else if (!filtered.some(r => r.toLowerCase() === inputValue.toLowerCase())) {
        handleAdd();
      }
    }
    if (e.key === 'Escape') setIsOpen(false);
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const showAddOption =
    inputValue.trim() &&
    !regions.some(r => r.toLowerCase() === inputValue.toLowerCase());

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <Input
          placeholder="Type or select a region..."
          value={inputValue}
          onChange={e => {
            setInputValue(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="pr-8"
        />
        <ChevronDown
          className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground cursor-pointer"
          onClick={() => setIsOpen(o => !o)}
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-border bg-popover shadow-lg">
          <ul className="max-h-52 overflow-y-auto py-1">
            {filtered.map(region => (
              <li
                key={region}
                className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground"
                onMouseDown={e => { e.preventDefault(); handleSelect(region); }}
              >
                {region === selected && <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />}
                <span className={region === selected ? 'ml-0' : 'ml-5.5'}>{region}</span>
              </li>
            ))}

            {filtered.length === 0 && !showAddOption && (
              <li className="px-3 py-2 text-sm text-muted-foreground">No regions found</li>
            )}

            {showAddOption && (
              <li
                className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer text-primary hover:bg-primary/10 border-t border-border"
                onMouseDown={e => { e.preventDefault(); handleAdd(); }}
              >
                <Plus className="w-4 h-4" />
                Add "{inputValue.trim()}"
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

const mockSuppliers = [
  { id: '1', name: 'Karim Phones', phone: '01711111111' },
  { id: '2', name: 'Rahim Telecom', phone: '01822222222' },
];



export default function OverseasPhoneForm() {
  const [isNewSupplier, setIsNewSupplier] = useState(false);
  const [stockQty, setStockQty] = useState(1);
  const [barcodeStrategy, setBarcodeStrategy] = useState<'imei' | 'single' | 'unique'>('imei');
  const [singleBarcode, setSingleBarcode] = useState('');

  return (
    <div className="space-y-6">
      {/* Supplier Info */}
      <div className="card-base p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">Supplier Information</h3>
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
              <Label>New Supplier Name *</Label>
              <Input placeholder="Enter supplier name" required />
            </div>
            <div>
              <Label>Supplier Phone</Label>
              <Input placeholder="Enter phone number" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2">
            <div className="col-span-2">
              <Label>Select Supplier *</Label>
              <Select required>
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

      {/* Phone Info */}
      <div className="card-base p-6 space-y-4">
        <h3 className="font-semibold text-lg">Phone Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Label>Product Title *</Label>
            <Input placeholder="e.g., iPhone 15 Pro Max" required />
          </div>
          <div>
            <Label>Brand *</Label>
            <Select required>
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
            <Label>Region</Label>
            <RegionCombobox />
          </div>
          <div>
            <Label>Stock Qty</Label>
            <Input 
              type="number" 
              min="1"
              value={stockQty}
              onChange={(e) => setStockQty(Math.max(1, parseInt(e.target.value) || 1))}
            />
          </div>
          
          <div className="col-span-2 space-y-4 border-t pt-4">
            <h4 className="font-medium text-sm">Barcode Strategy</h4>
            <div className="flex flex-col sm:flex-row gap-4">
              <label className="flex items-center space-x-3 border p-3 rounded-md cursor-pointer flex-1 transition-colors hover:bg-accent/50">
                <input 
                  type="radio" 
                  checked={barcodeStrategy === 'imei'} 
                  onChange={() => setBarcodeStrategy('imei')}
                  className="w-4 h-4 text-primary accent-primary"
                />
                <div className="text-sm">
                  <p className="font-medium">Use IMEI 1 as Barcode</p>
                  <p className="text-muted-foreground text-xs">Standard for tracking phones</p>
                </div>
              </label>
              <label className="flex items-center space-x-3 border p-3 rounded-md cursor-pointer flex-1 transition-colors hover:bg-accent/50">
                <input 
                  type="radio" 
                  checked={barcodeStrategy === 'single'} 
                  onChange={() => setBarcodeStrategy('single')}
                  className="w-4 h-4 text-primary accent-primary"
                />
                <div className="text-sm">
                  <p className="font-medium">Single Model Barcode</p>
                  <p className="text-muted-foreground text-xs">All devices share 1 barcode</p>
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
                  <p className="font-medium">Custom Distinct Barcode</p>
                  <p className="text-muted-foreground text-xs">A custom barcode per device</p>
                </div>
              </label>
            </div>
            {barcodeStrategy === 'single' && (
              <div className="mt-4 bg-muted/30 border rounded-lg p-4">
                <Label>Model Barcode (Skip to auto-generate)</Label>
                <div className="flex gap-2 mt-1">
                  <Input 
                    placeholder="Enter barcode or scan..." 
                    value={singleBarcode}
                    onChange={e => setSingleBarcode(e.target.value)}
                  />
                  <Button type="button" variant="outline" onClick={() => setSingleBarcode('PHN' + Math.floor(Math.random() * 1000000))}>Auto Generate</Button>
                </div>
              </div>
            )}
          </div>

          <div className="col-span-2 space-y-4 border-t pt-4">
            <h4 className="font-medium text-sm">IMEI & Device Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: stockQty }).map((_, index) => (
                <div key={index} className="p-4 border rounded-md space-y-4 bg-muted/10">
                  <h5 className="font-medium text-sm text-foreground/80">Device {index + 1}</h5>
                  <div className="space-y-4">
                    <div>
                      <Label>IMEI 1 *</Label>
                      <div className="relative mt-1">
                        <Input placeholder={`Device ${index + 1} - IMEI 1`} required className="pr-10" />
                        <Button type="button" size="icon" variant="ghost" className="absolute right-0 top-0 h-full text-muted-foreground hover:text-primary">
                          <ScanLine className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label>IMEI 2</Label>
                      <div className="relative mt-1">
                        <Input placeholder={`Device ${index + 1} - IMEI 2`} className="pr-10" />
                        <Button type="button" size="icon" variant="ghost" className="absolute right-0 top-0 h-full text-muted-foreground hover:text-primary">
                          <ScanLine className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    {barcodeStrategy === 'unique' && (
                      <div>
                        <Label>Custom Barcode *</Label>
                        <div className="relative mt-1">
                          <Input placeholder={`Device ${index + 1} - Barcode`} required className="pr-10" />
                          <Button type="button" size="icon" variant="ghost" className="absolute right-0 top-0 h-full text-muted-foreground hover:text-primary">
                            <ScanLine className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
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
          <div className="col-span-2">
            <Label>Phone Photos</Label>
            <MultiImageUpload />
          </div>
          <div className="col-span-2">
            <Label>Note</Label>
            <Textarea placeholder="Additional notes..." rows={3} />
          </div>
        </div>
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
          <div className="flex items-center space-x-2">
            <Checkbox id="preOrder" />
            <label htmlFor="preOrder" className="text-sm cursor-pointer">Pre-Order</label>
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
