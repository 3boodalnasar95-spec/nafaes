export interface InvoiceData {
  orderNumber: string;
  date: string;
  customerName: string;
  customerPhone: string;
  governorate: string;
  area: string;
  address: string;
  notes: string;
  paymentMethod: 'cash' | 'link';
  items: {
    nameAr: string;
    nameEn: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
}

// Generate FIXED WhatsApp message for ADMIN - customer cannot edit
export function generateAdminWhatsAppMessage(orderData: InvoiceData): string {
  const paymentMethodText = orderData.paymentMethod === 'cash' 
    ? '💵 كاش عند الاستلام' 
    : '💳 رابط دفع إلكتروني';

  let message = `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `🏪 NAFAES | نفائس - طلب جديد 🕌\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  
  message += `📋 ═══ بيانات الطلب ═══ 📋\n\n`;
  message += `🔢 رقم الطلب: ${orderData.orderNumber}\n`;
  message += `📅 التاريخ: ${orderData.date}\n`;
  message += `⏰ الحالة: ⏳ قيد المراجعة\n\n`;
  
  message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `👤 ═══ بيانات العميل ═══ 👤\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  message += `👤 الاسم: ${orderData.customerName}\n`;
  message += `📞 الهاتف: +965 ${orderData.customerPhone}\n`;
  message += `📍 المحافظة: ${orderData.governorate}\n`;
  message += `📍 المنطقة: ${orderData.area}\n`;
  message += `🏠 العنوان: ${orderData.address}\n`;
  if (orderData.notes && orderData.notes.trim()) {
    message += `📝 ملاحظات: ${orderData.notes}\n`;
  }
  
  message += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `🛒 ═══ تفاصيل المنتجات ═══ 🛒\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  
  orderData.items.forEach((item, index) => {
    message += `${index + 1}. ${item.nameAr}\n`;
    message += `   📦 ${item.nameEn}\n`;
    message += `   الكمية: ${item.quantity} وحدة\n`;
    message += `   السعر: ${item.unitPrice.toFixed(3)} د.ك/وحدة\n`;
    message += `   ━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `   💰 المجموع: ${item.totalPrice.toFixed(3)} د.ك\n\n`;
  });
  
  message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `💰 ═══ ملخص الفاتورة ═══ 💰\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  message += `📦 المجموع الفرعي: ${orderData.subtotal.toFixed(3)} د.ك\n`;
  message += `🚚 رسوم التوصيل: ${orderData.deliveryFee.toFixed(3)} د.ك\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `💵 الإجمالي النهائي: ${orderData.total.toFixed(3)} د.ك\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  
  message += `💳 طريقة الدفع: ${paymentMethodText}\n\n`;
  
  message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `✅ شكراً لتعاملكم مع نفائس 🕌\n`;
  message += `📱 للمتابعة: 66377312\n`;
  message += `📸 @nafaes.q8\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  
  return message; // Return un-encoded for now, we'll encode when sending
}

// Alias for the same function
export function generateFixedWhatsAppMessage(orderData: InvoiceData): string {
  return generateAdminWhatsAppMessage(orderData);
}

export const WHATSAPP_NUMBER = '96566377312';
export const WHATSAPP_BASE_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

export function getWhatsAppLink(message: string): string {
  return `${WHATSAPP_BASE_LINK}?text=${encodeURIComponent(message)}`;
}