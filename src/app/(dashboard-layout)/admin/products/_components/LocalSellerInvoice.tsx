'use client';

import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Printer, Download, X } from 'lucide-react';

export interface LocalSellerInvoiceData {
  invoiceNo: string;
  date: string;
  sellerName: string;
  fatherName?: string;
  motherName?: string;
  mobileNumber: string;
  address: string;
  nidNumber: string;
  productTitle: string;
  brand?: string;
  imeis: { imei1: string; imei2?: string }[];
  purchasePrice: number;
  sellingPrice: number;
  shopName?: string;
  shopAddress?: string;
  shopPhone?: string;
}

interface Props {
  data: LocalSellerInvoiceData;
  onClose: () => void;
}

export default function LocalSellerInvoice({ data, onClose }: Props) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printContent = printRef.current?.innerHTML;
    if (!printContent) return;
    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(`
      <html>
        <head>
          <title>Invoice - ${data.invoiceNo}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Arial', sans-serif; font-size: 14px; color: #111; padding: 40px; }
            .invoice-wrap { max-width: 700px; margin: auto; }
            .shop-header { text-align: center; border-bottom: 2px solid #111; padding-bottom: 16px; margin-bottom: 20px; }
            .shop-header h1 { font-size: 24px; font-weight: bold; }
            .shop-header p { font-size: 13px; color: #444; }
            .invoice-meta { display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 13px; }
            h2 { font-size: 16px; font-weight: bold; border-bottom: 1px solid #ddd; padding-bottom: 6px; margin-bottom: 10px; margin-top: 20px; }
            .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 24px; font-size: 13px; }
            .info-item { display: flex; gap: 6px; }
            .info-label { font-weight: 600; min-width: 110px; }
            table { width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 13px; }
            th { background: #f3f4f6; text-align: left; padding: 8px 12px; font-weight: 600; border: 1px solid #e5e7eb; }
            td { padding: 7px 12px; border: 1px solid #e5e7eb; }
            .declaration { margin-top: 28px; font-size: 13px; line-height: 1.8; border: 1px solid #ddd; padding: 16px; border-radius: 6px; background: #fafafa; }
            .signature-area { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 50px; }
            .signature-box { text-align: center; }
            .signature-line { border-top: 1px solid #111; margin-top: 60px; padding-top: 6px; font-size: 12px; color: #555; }
            @media print { body { padding: 20px; } }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);
    win.document.close();
    win.focus();
    win.print();
    win.close();
  };

  const allImeis = data.imeis.flatMap((d, i) => [
    { label: `Device ${i + 1} - IMEI 1`, value: d.imei1 },
    ...(d.imei2 ? [{ label: `Device ${i + 1} - IMEI 2`, value: d.imei2 }] : []),
  ]);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">ডিজিটাল ইনভয়েস</h2>
          <div className="flex gap-2">
            <Button size="sm" onClick={handlePrint} className="gap-2">
              <Printer className="w-4 h-4" /> প্রিন্ট করুন
            </Button>
            <Button size="sm" variant="outline" onClick={onClose} className="gap-2">
              <X className="w-4 h-4" /> বন্ধ করুন
            </Button>
          </div>
        </div>

        {/* Printable Content */}
        <div ref={printRef} className="invoice-wrap p-8">
          {/* Shop Header */}
          <div className="shop-header text-center border-b-2 border-gray-800 pb-4 mb-5">
            <h1 className="text-2xl font-bold">{data.shopName || 'MobileGanj'}</h1>
            <p className="text-sm text-gray-600 mt-1">{data.shopAddress || 'মোবাইল ফোনের দোকান'}</p>
            {data.shopPhone && <p className="text-sm text-gray-600">ফোন: {data.shopPhone}</p>}
          </div>

          {/* Invoice Meta */}
          <div className="flex justify-between text-sm mb-5 text-gray-700">
            <div><span className="font-semibold">ইনভয়েস নং:</span> {data.invoiceNo}</div>
            <div><span className="font-semibold">তারিখ:</span> {data.date}</div>
          </div>

          {/* Seller Info */}
          <h2 className="text-sm font-bold border-b border-gray-200 pb-1 mb-3 mt-5 uppercase tracking-wide">বিক্রেতার তথ্য</h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-800">
            <div className="flex gap-2"><span className="font-semibold min-w-[110px]">পূর্ণ নাম:</span> {data.sellerName}</div>
            {data.fatherName && <div className="flex gap-2"><span className="font-semibold min-w-[110px]">পিতার নাম:</span> {data.fatherName}</div>}
            {data.motherName && <div className="flex gap-2"><span className="font-semibold min-w-[110px]">মাতার নাম:</span> {data.motherName}</div>}
            <div className="flex gap-2"><span className="font-semibold min-w-[110px]">মোবাইল:</span> {data.mobileNumber}</div>
            <div className="flex gap-2 col-span-2"><span className="font-semibold min-w-[110px]">ঠিকানা:</span> {data.address}</div>
            <div className="flex gap-2"><span className="font-semibold min-w-[110px]">NID নম্বর:</span> {data.nidNumber}</div>
          </div>

          {/* Phone Info */}
          <h2 className="text-sm font-bold border-b border-gray-200 pb-1 mb-3 mt-6 uppercase tracking-wide">ফোনের তথ্য</h2>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left px-3 py-2 border border-gray-200 font-semibold">পণ্য</th>
                <th className="text-left px-3 py-2 border border-gray-200 font-semibold">ব্র্যান্ড</th>
                <th className="text-left px-3 py-2 border border-gray-200 font-semibold">IMEI</th>
                <th className="text-right px-3 py-2 border border-gray-200 font-semibold">ক্রয়মূল্য (৳)</th>
              </tr>
            </thead>
            <tbody>
              {allImeis.map((imei, i) => (
                <tr key={i}>
                  <td className="px-3 py-2 border border-gray-200">{i === 0 ? data.productTitle : ''}</td>
                  <td className="px-3 py-2 border border-gray-200">{i === 0 ? (data.brand || '—') : ''}</td>
                  <td className="px-3 py-2 border border-gray-200 font-mono text-xs">{imei.label}: {imei.value}</td>
                  <td className="px-3 py-2 border border-gray-200 text-right">{i === 0 ? data.purchasePrice.toLocaleString('bn-BD') : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Declaration */}
          <div className="mt-7 border border-gray-300 rounded-lg p-4 bg-gray-50 text-sm leading-relaxed text-gray-800">
            <p>
              আমি এই মর্মে স্বীকার করছি যে, আমি <strong>{data.sellerName}</strong>{' '}
              (পিতা: {data.fatherName || '—'}, মোবাইল: {data.mobileNumber}), ঠিকানা: <strong>{data.address}</strong>;
              আমার সম্পূর্ণ ব্যক্তিগত সম্পত্তি হিসেবে নিম্নলিখিত মোবাইল ফোন —{' '}
              <strong>{data.productTitle}</strong>{' '}
              (IMEI: {allImeis.map(i => i.value).join(', ')}) —
              {' '}<strong>{data.shopName || 'MobileGanj'}</strong>-এর নিকট{' '}
              <strong>৳ {data.purchasePrice.toLocaleString('bn-BD')}</strong> টাকায় বিক্রয় করছি।
              উক্ত ফোনটি কোনো মামলা, বিরোধ বা অবৈধ কার্যক্রমের সাথে সংশ্লিষ্ট নয় মর্মে আমি নিশ্চিত করছি।
            </p>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-2 gap-10 mt-14">
            <div className="text-center">
              <div className="border-t border-gray-700 pt-2 text-xs text-gray-600 mt-16">
                বিক্রেতার স্বাক্ষর<br />
                <span className="font-medium">{data.sellerName}</span>
              </div>
            </div>
            <div className="text-center">
              <div className="border-t border-gray-700 pt-2 text-xs text-gray-600 mt-16">
                ক্রেতার স্বাক্ষর<br />
                <span className="font-medium">{data.shopName || 'MobileGanj'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
