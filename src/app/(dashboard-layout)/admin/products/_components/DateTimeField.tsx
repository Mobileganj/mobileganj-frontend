'use client';

import { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

// Format: YYYY-MM-DDTHH:MM (required by datetime-local input)
function getNow() {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
}

interface DateTimeFieldProps {
  label?: string;
  className?: string;
}

export default function DateTimeField({ label = 'Date & Time', className }: DateTimeFieldProps) {
  const [value, setValue] = useState('');

  // Set current date/time on mount
  useEffect(() => {
    setValue(getNow());
  }, []);

  return (
    <div className={className}>
      <Label>{label}</Label>
      <div className="flex gap-2 mt-1">
        <Input
          type="datetime-local"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="flex-1"
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          title="Reset to current time"
          onClick={() => setValue(getNow())}
          className="shrink-0"
        >
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
