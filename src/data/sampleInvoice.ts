export interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
  total: number;
}

export interface InvoiceCustomer {
  name: string;
  email: string;
  address: string;
}

export interface InvoiceData {
  customer: InvoiceCustomer;
  date: string;
  paymentMethod: string;
  items: InvoiceItem[];
  total: number;
}

export const sampleInvoiceData: InvoiceData = {
  customer: {
    name: "أحمد محمد",
    email: "ahmed@example.com",
    address: "الرياض، المملكة العربية السعودية",
  },
  date: new Date().toLocaleDateString("ar-SA"),
  paymentMethod: "دفع إلكتروني",
  items: [
    {
      description: "منتج A - عبوة 500 مل",
      quantity: 3,
      price: 25.0,
      total: 75.0,
    },
    {
      description: "منتج B - عبوة 1 لتر",
      quantity: 2,
      price: 40.0,
      total: 80.0,
    },
    {
      description: "منتج ج - مكعبات تمثيلية",
      quantity: 1,
      price: 150.0,
      total: 150.0,
    },
  ],
  total: 305.0,
};