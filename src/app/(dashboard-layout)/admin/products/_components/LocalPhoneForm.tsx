'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ScanLine } from 'lucide-react';
import DateTimeField from './DateTimeField';
import LocalSellerInvoice, { LocalSellerInvoiceData } from './LocalSellerInvoice';
import { MultiImageUpload } from './MultiImageUpload';

// Mock data - Replace with API
const mockBrands = [
  { id: '1', name: 'Apple' },
  { id: '2', name: 'Samsung' },
  { id: '3', name: 'Google' },
];

export default function LocalPhoneForm() {
  const [stockQty, setStockQty] = useState(1);
  const [showInvoice, setShowInvoice] = useState(false);
  const [invoiceData, setInvoiceData] = useState<LocalSellerInvoiceData | null>(null);
  const [barcodeStrategy, setBarcodeStrategy] = useState<'imei' | 'single' | 'unique'>('imei');
  const [singleBarcode, setSingleBarcode] = useState('');

  // Form fields
  const [sellerName, setSellerName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');
  const [nidNumber, setNidNumber] = useState('');
  const [productTitle, setProductTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [imeis, setImeis] = useState<{ imei1: string; imei2: string; barcode?: string }[]>([{ imei1: '', imei2: '', barcode: '' }]);

  const updateImei = (index: number, field: 'imei1' | 'imei2' | 'barcode', value: string) => {
    setImeis(prev => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleStockChange = (val: number) => {
    setStockQty(val);
    setImeis(prev => {
      const next = [...prev];
      while (next.length < val) next.push({ imei1: '', imei2: '', barcode: '' });
      return next.slice(0, val);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const brandLabel = mockBrands.find(b => b.id === brand)?.name;
    const data: LocalSellerInvoiceData = {
      invoiceNo: `INV-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' }),
      sellerName,
      fatherName,
      motherName,
      mobileNumber,
      address,
      nidNumber,
      productTitle,
      brand: brandLabel,
      imeis: imeis.map(i => ({ imei1: i.imei1, imei2: i.imei2 || undefined })),
      purchasePrice: parseFloat(purchasePrice) || 0,
      sellingPrice: parseFloat(sellingPrice) || 0,
      shopName: 'MobileGanj',
      shopAddress: 'মোবাইলগঞ্জ, বাংলাদেশ',
      shopPhone: '01700-000000',
    };
    setInvoiceData(data);
    setShowInvoice(true);
  };

  return (
    <>
      {showInvoice && invoiceData && (
        <LocalSellerInvoice data={invoiceData} onClose={() => setShowInvoice(false)} />
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Local Seller Info */}
        <div className="card-base p-6 space-y-4">
          <h3 className="font-semibold text-lg">Local Seller Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Seller Full Name *</Label>
              <Input placeholder="Enter full name" required value={sellerName} onChange={e => setSellerName(e.target.value)} />
            </div>
            <div>
              <Label>Father's Name</Label>
              <Input placeholder="Enter father's name" value={fatherName} onChange={e => setFatherName(e.target.value)} />
            </div>
            <div>
              <Label>Mother's Name</Label>
              <Input placeholder="Enter mother's name" value={motherName} onChange={e => setMotherName(e.target.value)} />
            </div>
            <div>
              <Label>Mobile Number *</Label>
              <Input placeholder="Enter mobile number" required value={mobileNumber} onChange={e => setMobileNumber(e.target.value)} />
            </div>
            <div className="col-span-2">
              <Label>Full Address *</Label>
              <Textarea placeholder="Enter complete address" rows={2} required value={address} onChange={e => setAddress(e.target.value)} />
            </div>
            <div>
              <Label>NID Number *</Label>
              <Input placeholder="Enter NID number" required value={nidNumber} onChange={e => setNidNumber(e.target.value)} />
            </div>
            <div>
              <Label>NID Front Photo</Label>
              <Input
                type="file"
                accept="image/*"
                capture="environment"
                className="h-11 pt-1.5 file:h-8 file:inline-flex file:items-center file:bg-primary file:text-primary-foreground file:border-0 file:rounded-md file:px-4 file:mr-4 file:cursor-pointer hover:file:bg-primary/90 file:font-medium cursor-pointer"
              />
            </div>
            <div>
              <Label>NID Back Photo</Label>
              <Input
                type="file"
                accept="image/*"
                capture="environment"
                className="h-11 pt-1.5 file:h-8 file:inline-flex file:items-center file:bg-primary file:text-primary-foreground file:border-0 file:rounded-md file:px-4 file:mr-4 file:cursor-pointer hover:file:bg-primary/90 file:font-medium cursor-pointer"
              />
            </div>
            <div>
              <Label>Seller Photo</Label>
              <Input
                type="file"
                accept="image/*"
                capture="user"
                className="h-11 pt-1.5 file:h-8 file:inline-flex file:items-center file:bg-primary file:text-primary-foreground file:border-0 file:rounded-md file:px-4 file:mr-4 file:cursor-pointer hover:file:bg-primary/90 file:font-medium cursor-pointer"
              />
            </div>
            <div className="col-span-2">
              <DateTimeField label="Purchase Date & Time" />
            </div>
          </div>
        </div>

        {/* Phone Info */}
        <div className="card-base p-6 space-y-4">
          <h3 className="font-semibold text-lg">Phone Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label>Product Title *</Label>
              <Input placeholder="e.g., iPhone 14 Pro" required value={productTitle} onChange={e => setProductTitle(e.target.value)} />
            </div>
            <div>
              <Label>Brand *</Label>
              <Select required onValueChange={setBrand}>
                <SelectTrigger>
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  {mockBrands.map(b => (
                    <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Stock Qty</Label>
              <Input
                type="number"
                min="1"
                value={stockQty}
                onChange={e => handleStockChange(Math.max(1, parseInt(e.target.value) || 1))}
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
                          <Input
                            placeholder={`Device ${index + 1} - IMEI 1`}
                            required
                            className="pr-10"
                            value={imeis[index]?.imei1 || ''}
                            onChange={e => updateImei(index, 'imei1', e.target.value)}
                          />
                          <Button type="button" size="icon" variant="ghost" className="absolute right-0 top-0 h-full text-muted-foreground hover:text-primary">
                            <ScanLine className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Label>IMEI 2</Label>
                        <div className="relative mt-1">
                          <Input
                            placeholder={`Device ${index + 1} - IMEI 2`}
                            className="pr-10"
                            value={imeis[index]?.imei2 || ''}
                            onChange={e => updateImei(index, 'imei2', e.target.value)}
                          />
                          <Button type="button" size="icon" variant="ghost" className="absolute right-0 top-0 h-full text-muted-foreground hover:text-primary">
                            <ScanLine className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      {barcodeStrategy === 'unique' && (
                        <div>
                          <Label>Custom Barcode *</Label>
                          <div className="relative mt-1">
                            <Input
                              placeholder={`Device ${index + 1} - Barcode`}
                              className="pr-10"
                              value={imeis[index]?.barcode || ''}
                              onChange={e => updateImei(index, 'barcode', e.target.value)}
                            />
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
              <Input type="number" placeholder="0" required value={purchasePrice} onChange={e => setPurchasePrice(e.target.value)} />
            </div>
            <div>
              <Label>Selling Price (৳) *</Label>
              <Input type="number" placeholder="0" required value={sellingPrice} onChange={e => setSellingPrice(e.target.value)} />
            </div>
            <div>
              <Label>Offer Price (৳)</Label>
              <Input type="number" placeholder="0" value={offerPrice} onChange={e => setOfferPrice(e.target.value)} />
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
              <Checkbox id="local-featured" />
              <label htmlFor="local-featured" className="text-sm cursor-pointer">Featured Product</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="local-newArrival" />
              <label htmlFor="local-newArrival" className="text-sm cursor-pointer">New Arrival</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="local-trending" />
              <label htmlFor="local-trending" className="text-sm cursor-pointer">Trending</label>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button type="submit" className="flex-1">Save & Generate Invoice</Button>
          <Button type="button" variant="outline">Cancel</Button>
        </div>
      </form>
    </>
  );
}
