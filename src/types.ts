export interface BusinessProfile {
  id: string;
  name: string;
  phone: string;
  description?: string;
  logoUrl?: string;
  themeColor?: string;
}

export type PaymentType = 'COD' | 'Prepaid';

export type PrepaidProvider =
  | 'KBZPay'
  | 'CBPay'
  | 'Wave Money'
  | 'Mobile Banking'
  | 'Others';

export interface PaymentDetails {
  type: PaymentType;
  provider?: PrepaidProvider;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface InvoiceData {
  id: string;
  date: Date;
  businessId: string;

  customerName: string;
  customerPhone: string;
  customerAddress: string;

  items: InvoiceItem[];

  discount: number;
  discountType: 'amount' | 'percentage';
  deliveryFee: number;
  collectDelivery?: boolean;

  payment: PaymentDetails;
  notes?: string;
}
