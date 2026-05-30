export function formatPrice(price: number): string {
  return `${price.toFixed(3)} د.ك`;
}

export function generateOrderNumber(): string {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `NAF-${year}${month}${day}-${random}`;
}

export function generateWhatsAppMessage(
  orderData: {
    orderNumber: string;
    customerName: string;
    customerPhone: string;
    governorate: string;
    area: string;
    fullAddress: string;
    notes: string;
    paymentMethod: 'cash' | 'link';
    items: { name_ar: string; name_en: string; quantity: number; price: number }[];
    subtotal: number;
    deliveryFee: number;
    total: number;
  }
): string {
  let message = `طلب جديد من موقع nafaes.Q8\n\n`;
  message += `بيانات العميل:\n`;
  message += `الاسم: ${orderData.customerName}\n`;
  message += `الهاتف: ${orderData.customerPhone}\n`;
  message += `المحافظة: ${orderData.governorate}\n`;
  message += `المنطقة: ${orderData.area}\n`;
  message += `العنوان: ${orderData.fullAddress}\n`;
  if (orderData.notes) {
    message += `ملاحظات: ${orderData.notes}\n`;
  }
  message += `\nالمنتجات:\n`;
  orderData.items.forEach((item, index) => {
    message += `${index + 1}. ${item.name_ar} / ${item.name_en}\n`;
    message += `   الكمية: ${item.quantity}\n`;
    message += `   سعر الوحدة: ${formatPrice(item.price)}\n`;
    message += `   الإجمالي: ${formatPrice(item.price * item.quantity)}\n\n`;
  });
  message += `ملخص الطلب:\n`;
  message += `المجموع الفرعي: ${formatPrice(orderData.subtotal)}\n`;
  message += `رسوم التوصيل: ${formatPrice(orderData.deliveryFee)}\n`;
  message += `الإجمالي النهائي: ${formatPrice(orderData.total)}\n\n`;
  message += `طريقة الدفع: ${orderData.paymentMethod === 'cash' ? 'كاش عند الاستلام' : 'رابط دفع إلكتروني'}\n\n`;
  message += `يرجى تأكيد توفر الطلب وإرسال تفاصيل الدفع إن لزم.`;
  return encodeURIComponent(message);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06FF]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}