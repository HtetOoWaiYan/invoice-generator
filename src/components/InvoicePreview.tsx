import { forwardRef } from 'react';
import type { InvoiceData, BusinessProfile } from '../types';
import { formatCurrency } from '../lib/utils';

interface InvoicePreviewProps {
  data: InvoiceData;
  business: BusinessProfile;
}

export const InvoicePreview = forwardRef<HTMLDivElement, InvoicePreviewProps>(
  ({ data, business }, ref) => {
    const subtotal = data.items.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0
    );

    const discountAmount =
      data.discountType === 'percentage'
        ? (subtotal * data.discount) / 100
        : data.discount;

    const total = subtotal - discountAmount + data.deliveryFee;

    return (
      <div
        ref={ref}
        className="bg-white p-6 sm:p-8 w-full mx-auto shadow-lg min-h-[520px] text-slate-800"
      >
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
            <div>
              <h1
                className="text-2xl sm:text-3xl font-semibold mb-0"
                style={{ color: business.themeColor || '#1f2937' }}
              >
                {business.name}
              </h1>
              <p className="text-sm text-slate-600 italic mt-1">
                Ph - {business.phone}
              </p>
              {business.description && (
                <p className="text-sm text-slate-700 font-medium mt-2">
                  {business.description}
                </p>
              )}
            </div>

            <div className="text-right">
              <div className="text-3xl sm:text-4xl font-bold text-slate-800">
                Invoice
              </div>
              <div className="text-sm text-slate-500 mt-1">
                Submitted on {data.date.toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="mb-8">
          {/* Customer Info - Full Width */}
          <div className="mb-6 border-b border-slate-100 pb-6">
            <h3 className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-3">
              Invoice for
            </h3>
            <div className="text-slate-900">
              <p className="font-bold text-xl mb-1">
                {data.customerName || 'Guest Customer'}
              </p>
              <p className="text-slate-600 font-medium mb-2">
                {data.customerPhone}
              </p>
              <p className="text-slate-600 whitespace-pre-wrap leading-relaxed">
                {data.customerAddress || 'No address provided'}
              </p>
            </div>
          </div>

          {/* Payment & Invoice Details - Grid */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2">
                Payable to
              </h3>
              <p className="font-medium text-slate-800">
                {data.payment.type === 'COD'
                  ? 'Cash on delivery'
                  : `${data.payment.provider} (Prepaid)`}
              </p>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2">
                Invoice #
              </h3>
              <p className="font-medium text-slate-800">{data.id}</p>
            </div>
          </div>
        </div>

        <hr className="border-slate-800 mb-8" />

        {/* Items Table */}
        <div className="mb-8">
          <div className="grid grid-cols-12 gap-4 mb-4 text-[#1e3a8a] font-bold">
            <div className="col-span-6">Description</div>
            <div className="col-span-2 text-center">Qty</div>
            <div className="col-span-2 text-right">Unit price</div>
            <div className="col-span-2 text-right">Total price</div>
          </div>

          <div className="space-y-4">
            {data.items.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-12 gap-4 py-2 border-b border-slate-100 last:border-0"
              >
                <div className="col-span-6 font-medium">{item.description}</div>
                <div className="col-span-2 text-center text-slate-500">
                  {item.quantity}
                </div>
                <div className="col-span-2 text-right text-slate-500">
                  {formatCurrency(item.unitPrice)}
                </div>
                <div className="col-span-2 text-right text-slate-500 font-medium">
                  {formatCurrency(item.quantity * item.unitPrice)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Section */}
        <div className="bg-slate-50 p-4 rounded-lg mt-auto">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="w-full sm:w-1/2">
              {data.notes && (
                <div className="mb-4">
                  <span className="text-slate-400 font-medium mr-2">
                    Notes:
                  </span>
                  <span className="text-slate-600">{data.notes}</span>
                </div>
              )}

              {data.collectDelivery && (
                <div className="text-sm text-slate-700">Deli ခကောက်ရန်: ✓</div>
              )}
            </div>

            <div className="w-full sm:w-1/2 pl-0 sm:pl-8">
              <div className="flex justify-between mb-2">
                <span className="text-slate-700">Subtotal</span>
                <span className="font-bold">{formatCurrency(subtotal)}</span>
              </div>

              {data.discount > 0 && (
                <div className="flex justify-between mb-2 text-slate-500 text-sm">
                  <span>
                    Discount
                    {data.discountType === 'percentage' &&
                      ` (${data.discount}%)`}
                  </span>
                  <span>-{formatCurrency(discountAmount)}</span>
                </div>
              )}

              {data.deliveryFee > 0 && (
                <div className="flex justify-between mb-2 text-slate-500 text-sm">
                  <span>Delivery Fee</span>
                  <span>+{formatCurrency(data.deliveryFee)}</span>
                </div>
              )}

              <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-200">
                <span className="text-pink-600 font-bold text-2xl ml-auto">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

InvoicePreview.displayName = 'InvoicePreview';
