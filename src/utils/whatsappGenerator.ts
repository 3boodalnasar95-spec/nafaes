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

// Sanitize user input to prevent injection
function sanitizeInput(input: string): string {
  if (!input) return '';
  
  return input
    .trim()
    // Remove or escape potentially dangerous characters
    .replace(/[\n\r\t]/g, ' ') // Replace newlines/tabs with space
    .replace(/\u200B/g, '') // Remove zero-width spaces
    .replace(/[^\u0600-\u06FF\u0750-\u077F\w\s.,!?؟\-]/g, '') // Keep only Arabic, basic Latin, numbers, punctuation
    .slice(0, 500); // Limit length to prevent abuse
}

// Mask phone number for privacy (show only last 4 digits)
function maskPhoneNumber(phone: string): string {
  if (!phone || phone.length < 4) return '****';
  return phone.slice(-4).padStart(phone.length, '*');
}

// Mask address for privacy (show only area)
function maskAddress(address: string, area: string): string {
  if (!address) return '';
  // Only show the area, not full address in WhatsApp
  return `${area}`;
}

// Generate FIXED WhatsApp message for ADMIN - customer cannot edit
export function generateAdminWhatsAppMessage(orderData: InvoiceData): string {
  const paymentMethodText = orderData.paymentMethod === 'cash' 
    ? 'كاش عند الاستلام 💵' 
    : 'رابط دفع إلكتروني 💳';

  // Sanitize all user inputs
  const sanitizedName = sanitizeInput(orderData.customerName);
  const sanitizedAddress = maskAddress(sanitizeInput(orderData.address), orderData.area);
  const sanitizedNotes = orderData.notes ? sanitizeInput(orderData.notes) : '';
  const maskedPhone = maskPhoneNumber(orderData.customerPhone);

  let message = '';
  message += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
  message += '🏪 NAFAES | نفائس - طلب جديد 🕌\n';
  message += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
  
  message += '📋═══ بيانات الطلب ═══📋\n\n';
  message += `🔢 رقم الطلب: ${orderData.orderNumber}\n`;
  message += `📅 التاريخ: ${orderData.date}\n`;
  message += `⏰ الحالة: قيد المراجعة\n\n`;
  
  message += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
  message += '👤═══ بيانات العميل ═══👤\n';
  message += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
  message += `👤 الاسم: ${sanitizedName}\n`;
  message += `📞 الهاتف: +965 ${maskedPhone}\n`;
  message += `📍 المحافظة: ${orderData.governorate}\n`;
  message += `📍 المنطقة: ${orderData.area}\n`;
  message += `🏠 العنوان: ${sanitizedAddress}\n`;
  if (sanitizedNotes) {
    message += `📝 ملاحظات: ${sanitizedNotes}\n`;
  }
  
  message += '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
  message += '🛒═══ تفاصيل المنتجات ═══🛒\n';
  message += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
  
  orderData.items.forEach((item, index) => {
    const sanitizedNameAr = sanitizeInput(item.nameAr);
    const sanitizedNameEn = sanitizeInput(item.nameEn);
    
    message += `${index + 1}. ${sanitizedNameAr}\n`;
    message += `   📦 ${sanitizedNameEn}\n`;
    message += `   الكمية: ${item.quantity} وحدة\n`;
    message += `   السعر: ${item.unitPrice.toFixed(3)} د.ك/وحدة\n`;
    message += `   ━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `   💰 المجموع: ${item.totalPrice.toFixed(3)} د.ك\n\n`;
  });
  
  message += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
  message += '💰═══ ملخص الفاتورة ═══💰\n';
  message += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
  message += `📦 المجموع الفرعي: ${orderData.subtotal.toFixed(3)} د.ك\n`;
  message += `🚚 رسوم التوصيل: ${orderData.deliveryFee.toFixed(3)} د.ك\n`;
  message += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
  message += `💵 الإجمالي النهائي: ${orderData.total.toFixed(3)} د.ك\n`;
  message += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
  
  message += `💳 طريقة الدفع: ${paymentMethodText}\n\n`;
  
  message += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
  message += '✅ شكراً لتعاملكم مع نفائس 🕌\n';
  message += '📱 للمتابعة: 66377312\n';
  message += '📸 @nafaes.q8\n';
  message += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
  
  return message;
}

// Alias for the same function
export function generateFixedWhatsAppMessage(orderData: InvoiceData): string {
  return generateAdminWhatsAppMessage(orderData);
}

// Validate and format Kuwaiti phone number
export function validateKuwaitiPhone(phone: string): { valid: boolean; formatted: string; error?: string } {
  if (!phone) {
    return { valid: false, formatted: '', error: 'رقم الهاتف مطلوب' };
  }

  // Remove any non-digit characters
  const digitsOnly = phone.replace(/\D/g, '');

  // Check length (should be 8 digits for Kuwait)
  if (digitsOnly.length !== 8) {
    return { 
      valid: false, 
      formatted: '', 
      error: 'رقم الهاتف يجب أن يكون 8 أرقام' 
    };
  }

  // Check prefix (Kuwaiti numbers start with 5, 6, or 9)
  const firstDigit = digitsOnly[0];
  if (!['5', '6', '9'].includes(firstDigit)) {
    return { 
      valid: false, 
      formatted: '', 
      error: 'رقم الهاتف يجب أن يبدأ بـ 5 أو 6 أو 9' 
    };
  }

  // Check for valid second digit based on prefix
  const secondDigit = digitsOnly[1];
  const validPrefixes: Record<string, string[]> = {
    '5': ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'], // Mobile
    '6': ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'], // Mobile
    '9': ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'], // Mobile/Satellite
  };

  if (!validPrefixes[firstDigit]?.includes(secondDigit)) {
    return { 
      valid: false, 
      formatted: '', 
      error: 'رقم الهاتف غير صحيح' 
    };
  }

  return {
    valid: true,
    formatted: digitsOnly,
  };
}

export const WHATSAPP_NUMBER = '96566377312';
export const WHATSAPP_BASE_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

export function getWhatsAppLink(message: string): string {
  return `${WHATSAPP_BASE_LINK}?text=${encodeURIComponent(message)}`;
}