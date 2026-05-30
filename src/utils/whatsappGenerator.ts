import { InvoiceData } from './pdfGenerator';

export function generateWhatsAppMessage(data: InvoiceData): string {
  const paymentMethodText = data.paymentMethod === 'cash' 
    ? '💵 كاش عند الاستلام' 
    : '💳 رابط دفع إلكتروني';

  let message = `━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `    🏪 NAFAES | نفائس 🕌\n`;
  message += `   ✨ فخامة العطور الذكية ✨\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  
  message += `📋 ═══ طلب جديد ═══ 📋\n\n`;
  message += `🔢 رقم الطلب: ${data.orderNumber}\n`;
  message += `📅 التاريخ: ${data.date}\n`;
  
  message += `\n━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `   👤 بيانات العميل\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  message += `👤 الاسم: ${data.customerName}\n`;
  message += `📞 الهاتف: +965 ${data.customerPhone}\n`;
  message += `📍 المحافظة: ${data.governorate}\n`;
  message += `📍 المنطقة: ${data.area}\n`;
  message += `🏠 العنوان: ${data.address}\n`;
  if (data.notes) {
    message += `📝 ملاحظات: ${data.notes}\n`;
  }
  
  message += `\n━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `   🛒 تفاصيل المنتجات\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  
  data.items.forEach((item, index) => {
    message += `${index + 1}. ${item.nameAr}\n`;
    message += `   📦 ${item.nameEn}\n`;
    message += `   الكمية: ${item.quantity} × ${item.unitPrice.toFixed(3)} د.ك\n`;
    message += `   💰 المجموع: ${item.totalPrice.toFixed(3)} د.ك\n\n`;
  });
  
  message += `━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `   💰 ملخص الطلب\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  message += `📦 المجموع الفرعي: ${data.subtotal.toFixed(3)} د.ك\n`;
  message += `🚚 رسوم التوصيل: ${data.deliveryFee.toFixed(3)} د.ك\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `💵 الإجمالي النهائي: ${data.total.toFixed(3)} د.ك\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  
  message += `💳 طريقة الدفع: ${paymentMethodText}\n\n`;
  
  message += `━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `✅ شكراً لتعاملكم مع نفائس 🕌\n`;
  message += `📱 للمتابعة: 66377312\n`;
  message += `📸 @nafaes.q8\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━\n`;
  
  return encodeURIComponent(message);
}

export function generateAdminWhatsAppMessage(data: InvoiceData): string {
  let message = `🔔 *إشعار طلب جديد - NAFAES*\n\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  message += `📋 رقم الطلب: *${data.orderNumber}*\n`;
  message += `📅 التاريخ: ${data.date}\n\n`;
  message += `👤 العميل: ${data.customerName}\n`;
  message += `📞 الهاتف: +965 ${data.customerPhone}\n`;
  message += `📍 العنوان: ${data.area} - ${data.address}\n\n`;
  message += `🛒 المنتجات (${data.items.length}):\n`;
  data.items.forEach((item, index) => {
    message += `  ${index + 1}. ${item.nameAr} x${item.quantity}\n`;
  });
  message += `\n💰 الإجمالي: *${data.total.toFixed(3)} د.ك*\n`;
  message += `💳 الدفع: ${data.paymentMethod === 'cash' ? 'كاش' : 'رابط'}\n\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━\n`;
  
  return encodeURIComponent(message);
}

export const WHATSAPP_ADMIN_NUMBER = '96566377312';
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_ADMIN_NUMBER}`;

export function getWhatsAppLink(message: string): string {
  return `${WHATSAPP_LINK}?text=${message}`;
}