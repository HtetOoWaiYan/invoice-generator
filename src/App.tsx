import { useState, useRef, useCallback } from 'react';
import { nanoid } from 'nanoid';
import { toPng } from 'html-to-image';
import { Download } from 'lucide-react';
import { InvoiceEditor } from './components/InvoiceEditor';
import { InvoicePreview } from './components/InvoicePreview';
import { businesses } from './config/businesses';
import type { InvoiceData } from './types';

const initialData: InvoiceData = {
  id: nanoid(8),
  date: new Date(),
  businessId: businesses[0].id,
  customerName: '',
  customerPhone: '',
  customerAddress: '',
  items: [{ id: '1', description: 'Item 1', quantity: 1, unitPrice: 0 }],
  discount: 0,
  discountType: 'amount',
  deliveryFee: 0,
  collectDelivery: true,
  payment: {
    type: 'Prepaid',
    provider: 'KBZPay',
  },
};

function App() {
  const [data, setData] = useState<InvoiceData>(initialData);
  const previewRef = useRef<HTMLDivElement>(null);

  const currentBusiness =
    businesses.find((b) => b.id === data.businessId) || businesses[0];

  const handleDownload = useCallback(async () => {
    if (previewRef.current === null) {
      return;
    }

    try {
      const dataUrl = await toPng(previewRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      });
      const link = document.createElement('a');
      link.download = `invoice-${data.id}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to generate image', err);
    }
  }, [data.id]);

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="max-w-[1600px] mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-slate-800">
            Invoice Generator
          </h1>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Download size={20} />
            <span className="hidden sm:inline">Download Image</span>
          </button>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_auto] gap-8">
          <div className="order-1">
            <InvoiceEditor data={data} onChange={setData} />
          </div>

          <div className="order-2 fixed left-[-9999px] lg:static lg:left-auto">
            <div className="sticky top-8 overflow-auto max-h-[calc(100vh-8rem)] rounded-lg shadow-lg">
              <InvoicePreview
                ref={previewRef}
                data={data}
                business={currentBusiness}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
