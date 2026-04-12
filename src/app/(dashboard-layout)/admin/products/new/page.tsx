'use client';

import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import CategoryStep from '../_components/CategoryStep';
import PhoneTypeStep from '../_components/PhoneTypeStep';
import OverseasPhoneForm from '../_components/OverseasPhoneForm';
import LocalPhoneForm from '../_components/LocalPhoneForm';
import AccessoriesForm from '../_components/AccessoriesForm';

export default function NewProductPage() {
  const [category, setCategory] = useState<'phone' | 'accessories' | null>(null);
  const [phoneType, setPhoneType] = useState<'overseas' | 'local' | null>(null);

  const handleCategorySelect = (cat: 'phone' | 'accessories') => {
    setCategory(cat);
    setPhoneType(null);
  };

  const handleReset = () => {
    setCategory(null);
    setPhoneType(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start md:items-center gap-2 md:gap-4">
          <Link href="/admin/products" className="mt-1 md:mt-0">
            <Button variant="ghost" size="icon" className="shrink-0">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Add New Product</h1>
            <p className="text-sm md:text-base text-muted-foreground">Stock in new product to inventory</p>
          </div>
        </div>
        {category && (
          <Button variant="outline" onClick={handleReset} className="w-full md:w-auto">
            Reset Selection
          </Button>
        )}
      </div>

      {/* Step 1: Category Selection */}
      {!category && (
        <CategoryStep selected={category} onSelect={handleCategorySelect} />
      )}

      {/* Step 2: Phone Type (Only for Phone) */}
      {category === 'phone' && !phoneType && (
        <PhoneTypeStep selected={phoneType} onSelect={setPhoneType} />
      )}

      {/* Step 3: Forms */}
      {category === 'phone' && phoneType === 'overseas' && <OverseasPhoneForm />}
      {category === 'phone' && phoneType === 'local' && <LocalPhoneForm />}
      {category === 'accessories' && <AccessoriesForm />}
    </div>
  );
}
