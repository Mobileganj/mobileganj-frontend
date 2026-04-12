'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown, X } from 'lucide-react';

const mockWarranties = [
  { id: '1', name: '1 Year Official Warranty', months: 12 },
  { id: '2', name: '6 Months Warranty', months: 6 },
  { id: '3', name: '3 Months Warranty', months: 3 },
  { id: '4', name: 'No Warranty', months: 0 },
];

const mockTermsAndConditions = [
  { id: '1', name: 'Goods once sold cannot be returned' },
  { id: '2', name: 'No warranty on physical or liquid damage' },
  { id: '3', name: 'Preserve receipt for warranty claim' },
  { id: '4', name: 'Service warranty covers labor, not parts' },
];

export default function WarrantySettings() {
  const [selectedWarranties, setSelectedWarranties] = useState<string[]>([]);
  const [selectedTerms, setSelectedTerms] = useState<string[]>([]);

  const toggleWarranty = (id: string) => {
    setSelectedWarranties(prev => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id]);
  };

  const toggleTerm = (id: string) => {
    setSelectedTerms(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]);
  };

  const getSelectedWarrantiesText = () => {
    if (selectedWarranties.length === 0) return "Select warranties...";
    if (selectedWarranties.length === 1) {
      return mockWarranties.find(w => w.id === selectedWarranties[0])?.name;
    }
    return `${selectedWarranties.length} selected`;
  };

  const getSelectedTermsText = () => {
    if (selectedTerms.length === 0) return "Select terms and condition...";
    if (selectedTerms.length === 1) {
      return mockTermsAndConditions.find(t => t.id === selectedTerms[0])?.name;
    }
    return `${selectedTerms.length} selected`;
  };

  return (
    <div className="card-base p-6 space-y-5">
      <h3 className="font-semibold text-lg">Warranty & Terms</h3>

      <div>
        <Label>Warranty Template (Multiple)</Label>
        <div className="mt-1.5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" role="combobox" className="w-full justify-between font-normal text-left h-auto min-h-10 py-2">
                <span className="truncate">{getSelectedWarrantiesText()}</span>
                <ChevronDown className="h-4 w-4 shrink-0 opacity-50 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] max-h-60 overflow-y-auto" align="start">
              {mockWarranties.map((warranty) => (
                <DropdownMenuCheckboxItem
                  key={warranty.id}
                  checked={selectedWarranties.includes(warranty.id)}
                  onCheckedChange={() => toggleWarranty(warranty.id)}
                  onSelect={(e) => e.preventDefault()}
                >
                  {warranty.name} ({warranty.months} months)
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Badges for selected warranties */}
          {selectedWarranties.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {selectedWarranties.map(id => {
                const item = mockWarranties.find(w => w.id === id);
                if (!item) return null;
                return (
                  <Badge key={id} variant="secondary" className="pl-3 pr-2 py-1 flex items-center gap-1.5 font-normal text-sm">
                    {item.name}
                    <div
                      className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20 cursor-pointer text-muted-foreground transition-colors"
                      onClick={() => toggleWarranty(id)}
                    >
                      <X className="h-3 w-3" />
                    </div>
                  </Badge>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div>
        <Label>Terms and Condition (Multiple)</Label>
        <div className="mt-1.5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" role="combobox" className="w-full justify-between font-normal text-left h-auto min-h-10 py-2">
                <span className="truncate">{getSelectedTermsText()}</span>
                <ChevronDown className="h-4 w-4 shrink-0 opacity-50 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] max-h-60 overflow-y-auto" align="start">
              {mockTermsAndConditions.map((term) => (
                <DropdownMenuCheckboxItem
                  key={term.id}
                  checked={selectedTerms.includes(term.id)}
                  onCheckedChange={() => toggleTerm(term.id)}
                  onSelect={(e) => e.preventDefault()}
                  className="py-2.5"
                >
                  <span className="leading-snug">{term.name}</span>
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Badges for selected terms */}
          {selectedTerms.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {selectedTerms.map(id => {
                const item = mockTermsAndConditions.find(w => w.id === id);
                if (!item) return null;
                return (
                  <Badge key={id} variant="secondary" className="pl-3 pr-2 py-1 flex items-center gap-1.5 font-normal text-sm">
                    <span className="truncate max-w-[200px]">{item.name}</span>
                    <div
                      className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20 cursor-pointer text-muted-foreground transition-colors"
                      onClick={() => toggleTerm(id)}
                    >
                      <X className="h-3 w-3 shrink-0" />
                    </div>
                  </Badge>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div>
        <Label>Note</Label>
        <Textarea
          placeholder="Enter additional notes..."
          rows={3}
          className="mt-1.5"
        />
      </div>
    </div>
  );
}
