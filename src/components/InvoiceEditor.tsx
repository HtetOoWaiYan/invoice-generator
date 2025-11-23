import { Plus, Trash2 } from 'lucide-react';
import type {
  InvoiceData,
  InvoiceItem,
  PrepaidProvider,
  BusinessProfile,
} from '../types';
import { businesses } from '../config/businesses';

interface InvoiceEditorProps {
  data: InvoiceData;
  onChange: (data: InvoiceData) => void;
}

export function InvoiceEditor({ data, onChange }: InvoiceEditorProps) {
  const updateField = (
    field: keyof InvoiceData,
    value: string | number | Date | boolean
  ) => {
    onChange({ ...data, [field]: value } as InvoiceData);
  };

  const updatePayment = (
    field: keyof InvoiceData['payment'],
    value: string
  ) => {
    onChange({
      ...data,
      payment: { ...data.payment, [field]: value },
    });
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: crypto.randomUUID(),
      description: '',
      quantity: 1,
      unitPrice: 0,
    };
    onChange({ ...data, items: [...data.items, newItem] });
  };

  const updateItem = (
    id: string,
    field: keyof InvoiceItem,
    value: string | number
  ) => {
    onChange({
      ...data,
      items: data.items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  };

  const removeItem = (id: string) => {
    onChange({
      ...data,
      items: data.items.filter((item) => item.id !== id),
    });
  };

  return (
    <div className="space-y-8 p-6 bg-white rounded-lg shadow-sm border border-slate-200">
      {/* Business Selection */}
      <section>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Business Profile
        </label>
        <select
          value={data.businessId}
          onChange={(e) => updateField('businessId', e.target.value)}
          className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {businesses.map((b: BusinessProfile) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      </section>

      {/* Customer Details */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">
          Customer Details
        </h3>
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={data.customerName}
              onChange={(e) => updateField('customerName', e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-md"
              placeholder="Customer Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={data.customerPhone}
              onChange={(e) => updateField('customerPhone', e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-md"
              placeholder="09..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Address
            </label>
            <textarea
              value={data.customerAddress}
              onChange={(e) => updateField('customerAddress', e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-md"
              rows={3}
              placeholder="Address..."
            />
          </div>
        </div>
      </section>

      {/* Items */}
      <section className="space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="text-lg font-semibold text-slate-800">Items</h3>
          <button
            onClick={addItem}
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            <Plus size={16} /> Add Item
          </button>
        </div>

        <div className="space-y-4">
          {data.items.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 gap-2 items-start bg-slate-50 p-3 rounded-md"
            >
              <div className="col-span-12 sm:col-span-5">
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) =>
                    updateItem(item.id, 'description', e.target.value)
                  }
                  className="w-full p-2 border border-slate-300 rounded-md text-sm"
                  placeholder="Item description"
                />
              </div>
              <div className="col-span-4 sm:col-span-2">
                <input
                  type="number"
                  value={item.quantity || ''}
                  onChange={(e) =>
                    updateItem(item.id, 'quantity', Number(e.target.value))
                  }
                  className="w-full p-2 border border-slate-300 rounded-md text-sm"
                  placeholder="Qty"
                  min="1"
                />
              </div>
              <div className="col-span-6 sm:col-span-4">
                <input
                  type="number"
                  value={item.unitPrice || ''}
                  onChange={(e) =>
                    updateItem(item.id, 'unitPrice', Number(e.target.value))
                  }
                  className="w-full p-2 border border-slate-300 rounded-md text-sm"
                  placeholder="Price"
                  min="0"
                />
              </div>
              <div className="col-span-2 sm:col-span-1 flex justify-end pt-2">
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Notes */}
      <section>
        <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">
          Notes
        </h3>
        <div className="mt-2">
          <textarea
            value={data.notes || ''}
            onChange={(e) => updateField('notes', e.target.value)}
            className="w-full p-2 border border-slate-300 rounded-md"
            rows={3}
            placeholder="Add any note to appear on the invoice"
          />
        </div>
      </section>

      {/* Financials */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">
          Financials
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Discount
            </label>
            <div className="flex gap-2 mb-2">
              <button
                onClick={() => updateField('discountType', 'amount')}
                className={`flex-1 py-1 text-xs rounded border ${
                  data.discountType === 'amount'
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'bg-white border-slate-300 text-slate-600'
                }`}
              >
                Amount
              </button>
              <button
                onClick={() => updateField('discountType', 'percentage')}
                className={`flex-1 py-1 text-xs rounded border ${
                  data.discountType === 'percentage'
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'bg-white border-slate-300 text-slate-600'
                }`}
              >
                %
              </button>
            </div>
            <input
              type="number"
              value={data.discount || ''}
              onChange={(e) => updateField('discount', Number(e.target.value))}
              className="w-full p-2 border border-slate-300 rounded-md"
              min="0"
              placeholder={
                data.discountType === 'percentage' ? '0-100' : 'Amount'
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Delivery Fee
            </label>
            <input
              type="number"
              value={data.deliveryFee || ''}
              onChange={(e) =>
                updateField('deliveryFee', Number(e.target.value))
              }
              className="w-full p-2 border border-slate-300 rounded-md"
              min="0"
            />

            <label className="flex items-center gap-2 mt-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={!!data.collectDelivery}
                onChange={(e) =>
                  updateField('collectDelivery', e.target.checked)
                }
                className="w-4 h-4"
              />
              <span> Deli ခကောက်ရန်</span>
            </label>
          </div>
        </div>
      </section>

      {/* Payment */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">
          Payment Method
        </h3>
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => updatePayment('type', 'COD')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              data.payment.type === 'COD'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Cash on Delivery
          </button>
          <button
            onClick={() => updatePayment('type', 'Prepaid')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              data.payment.type === 'Prepaid'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Prepaid
          </button>
        </div>

        {data.payment.type === 'Prepaid' && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Provider
            </label>
            <select
              value={data.payment.provider}
              onChange={(e) =>
                updatePayment('provider', e.target.value as PrepaidProvider)
              }
              className="w-full p-2 border border-slate-300 rounded-md"
            >
              <option value="KBZPay">KBZPay</option>
              <option value="CBPay">CBPay</option>
              <option value="Wave Money">Wave Money</option>
              <option value="Mobile Banking">Mobile Banking</option>
              <option value="Others">Others</option>
            </select>
          </div>
        )}
      </section>

      {/* Invoice ID & Date */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">
          Invoice Details
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Invoice #
            </label>
            <input
              type="text"
              value={data.id}
              onChange={(e) => updateField('id', e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Date
            </label>
            <input
              type="date"
              value={data.date.toISOString().split('T')[0]}
              onChange={(e) => updateField('date', new Date(e.target.value))}
              className="w-full p-2 border border-slate-300 rounded-md"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
