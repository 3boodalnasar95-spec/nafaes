import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export interface InvoiceItem {
  nameAr: string;
  nameEn: string;
  variantLabel?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

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
  orderStatus?: string;
  paymentStatus?: 'pending' | 'paid' | 'partial' | 'failed' | 'refunded';
  paidAmount?: number;
  items: InvoiceItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
}

export async function downloadInvoicePDF(orderData: InvoiceData): Promise<void> {
  console.log('Starting PDF generation for order:', orderData.orderNumber);
  
  const container = document.createElement('div');
  container.id = 'invoice-pdf-container';
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.top = '0';
  container.style.width = '210mm';
  container.style.minHeight = 'auto';
  container.style.backgroundColor = '#FFFFFF';
  container.style.fontFamily = 'Tahoma, Arial, sans-serif';
  container.style.direction = 'rtl';
  container.style.padding = '12px';
  document.body.appendChild(container);

  const safe = (value?: string | number | null) => value === undefined || value === null || value === '' ? '-' : String(value);
  const rtl = (value?: string | number | null) => '<span dir="rtl" style="font-family:Tahoma,Arial,sans-serif;unicode-bidi:isolate;letter-spacing:0;word-spacing:normal;white-space:normal;line-height:1.7;">' + safe(value) + '</span>';
  const fmt = (price: number) => (Number(price) || 0).toFixed(3) + ' د.ك';
  const payMethod = orderData.paymentMethod === 'cash' ? 'كاش عند الاستلام' : 'رابط دفع الكتروني';
  const payStatus = orderData.paymentStatus === 'paid' ? 'مدفوعة' : orderData.paymentStatus === 'partial' ? 'مدفوعة جزئياً' : 'غير مدفوعة';
  const payStatusColor = orderData.paymentStatus === 'paid' ? '#16A34A' : orderData.paymentStatus === 'partial' ? '#D97706' : '#DC2626';
  const orderStatusLabels: Record<string, string> = {
    pending: 'قيد المراجعة',
    confirmed: 'مؤكد',
    preparing: 'قيد التجهيز',
    shipped: 'تم الشحن',
    delivered: 'مكتمل',
    cancelled: 'ملغي',
  };
  const orderStatus = orderStatusLabels[orderData.orderStatus || 'pending'] || safe(orderData.orderStatus) || 'قيد المراجعة';

  const itemsHtml = orderData.items.map((item, idx) => 
    '<tr style="background:' + (idx % 2 === 0 ? '#FFFFFF' : '#FAF8F5') + '; border-bottom:1px solid #E8E0D5;">' +
    '<td style="padding:7px;"><strong style="color:#1A1A1A;font-size:10px;">' + rtl(item.nameAr) + '</strong>' + (item.variantLabel ? '<br/><span style="color:#C9A96E;font-size:8px;">' + rtl(item.variantLabel) + '</span>' : '') + '<br/><span dir="ltr" style="color:#6B6B6B;font-size:8px;">' + safe(item.nameEn) + '</span></td>' +
    '<td style="padding:7px;text-align:center;color:#1A1A1A;font-weight:bold;">' + item.quantity + '</td>' +
    '<td style="padding:7px;text-align:center;color:#1A1A1A;">' + fmt(item.unitPrice) + '</td>' +
    '<td style="padding:7px;text-align:left;color:#C9A96E;font-weight:bold;font-size:11px;">' + fmt(item.totalPrice) + '</td>' +
    '</tr>'
  ).join('');

  container.innerHTML = 
    '<div style="max-width:178mm;margin:0 auto;padding:6px;font-family:Tahoma,Arial,sans-serif;direction:rtl;">' +
    '<div style="text-align:center;margin-bottom:10px;padding-bottom:8px;border-bottom:3px solid #C9A96E;">' +
    '<div style="display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:6px;">' +
    '<div style="width:48px;height:48px;background:linear-gradient(135deg,#C9A96E,#D4AF37);border-radius:50%;display:flex;align-items:center;justify-content:center;">' +
    '<span style="color:white;font-size:24px;font-weight:bold;">ن</span></div>' +
    '<div style="text-align:right;">' +
    '<h1 style="margin:0;font-size:24px;color:#1A1A1A;letter-spacing:3px;font-weight:bold;">NAFAES</h1>' +
    '<p style="margin:0;font-size:8px;color:#6B6B6B;letter-spacing:2px;">ESSENCE OF ELEGANCE</p></div></div>' +
    '<p style="margin:3px 0;color:#1A1A1A;font-size:9px;">العطور الذكية والهدايا العطرية الفاخرة - الكويت</p>' +
    '<p style="margin:2px 0;color:#C9A96E;font-size:8px;">واتساب: 66377312 | @nafaes.q8</p></div>' +

    '<div style="background:linear-gradient(135deg,#C9A96E,#D4AF37);color:white;padding:8px 16px;border-radius:8px;text-align:center;margin-bottom:9px;">' +
    '<h2 style="margin:0;font-size:16px;font-weight:bold;">فاتورة | INVOICE</h2></div>' +

    '<div style="display:flex;gap:10px;margin-bottom:9px;">' +
    '<div style="flex:1;background:#FAF8F5;padding:8px;border-radius:8px;border:2px solid #C9A96E;">' +
    '<h3 style="margin:0 0 5px 0;color:#C9A96E;font-size:10px;font-weight:bold;">معلومات الفاتورة</h3>' +
    '<p style="margin:3px 0;font-size:9px;color:#1A1A1A;"><strong>رقم الفاتورة:</strong> <span style="color:#C9A96E;font-weight:bold;font-size:11px;">' + safe(orderData.orderNumber) + '</span></p>' +
    '<p style="margin:3px 0;font-size:9px;color:#1A1A1A;"><strong>التاريخ:</strong> ' + safe(orderData.date) + '</p>' +
    '<p style="margin:3px 0;font-size:9px;color:#1A1A1A;"><strong>الحالة:</strong> <span style="background:#FFA500;color:white;padding:2px 8px;border-radius:4px;">' + rtl(orderStatus) + '</span></p>' +
    '<p style="margin:3px 0;font-size:9px;color:#1A1A1A;"><strong>الدفع:</strong> <span style="background:' + payStatusColor + ';color:white;padding:2px 8px;border-radius:4px;">' + rtl(payStatus) + '</span></p></div>' +
    '<div style="flex:1;background:#FAF8F5;padding:8px;border-radius:8px;border:2px solid #C9A96E;">' +
    '<h3 style="margin:0 0 5px 0;color:#C9A96E;font-size:10px;font-weight:bold;">طريقة الدفع</h3>' +
    '<p style="margin:3px 0;font-size:12px;color:#1A1A1A;font-weight:bold;">' + rtl(payMethod) + '</p></div></div>' +

    '<div style="background:#F5F0E8;padding:10px;border-radius:8px;margin-bottom:9px;border-right:4px solid #C9A96E;">' +
    '<h3 style="margin:0 0 6px 0;color:#C9A96E;font-size:12px;font-weight:bold;">بيانات العميل</h3>' +
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;font-size:9px;">' +
    '<p style="margin:2px 0;color:#1A1A1A;"><strong>الاسم:</strong> ' + rtl(orderData.customerName) + '</p>' +
    '<p style="margin:2px 0;color:#1A1A1A;"><strong>الهاتف:</strong> <span dir="ltr">+965 ' + safe(orderData.customerPhone) + '</span></p>' +
    '<p style="margin:2px 0;color:#1A1A1A;"><strong>المحافظة:</strong> ' + rtl(orderData.governorate) + '</p>' +
    '<p style="margin:2px 0;color:#1A1A1A;"><strong>المنطقة:</strong> ' + rtl(orderData.area) + '</p></div>' +
    '<p style="margin:4px 0 0 0;font-size:9px;color:#1A1A1A;"><strong>العنوان:</strong> ' + rtl(orderData.address) + '</p>' +
    (orderData.notes ? '<p style="margin:3px 0 0 0;font-size:8px;color:#6B6B6B;"><strong>ملاحظات:</strong> ' + rtl(orderData.notes) + '</p>' : '') + '</div>' +

    '<div style="margin-bottom:9px;background:white;">' +
    '<h3 style="margin:0 0 6px 0;color:#C9A96E;font-size:12px;font-weight:bold;">تفاصيل المنتجات (' + orderData.items.length + ')</h3>' +
    '<table style="width:100%;border-collapse:collapse;font-size:9px;">' +
    '<thead><tr style="background:linear-gradient(135deg,#C9A96E,#D4AF37);color:white;">' +
    '<th style="padding:7px;text-align:right;font-weight:bold;">المنتج</th>' +
    '<th style="padding:7px;text-align:center;font-weight:bold;">الكمية</th>' +
    '<th style="padding:7px;text-align:center;font-weight:bold;">السعر</th>' +
    '<th style="padding:7px;text-align:left;font-weight:bold;">الاجمالي</th></tr></thead>' +
    '<tbody>' + itemsHtml + '</tbody></table></div>' +

    '<div style="background:#FAF8F5;padding:10px;border-radius:8px;margin-bottom:8px;">' +
    '<div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px dashed #E8E0D5;font-size:9px;">' +
    '<span style="color:#6B6B6B;">المجموع الفرعي:</span>' +
    '<span style="color:#1A1A1A;font-weight:bold;">' + fmt(orderData.subtotal) + '</span></div>' +
    '<div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px dashed #E8E0D5;font-size:9px;">' +
    '<span style="color:#6B6B6B;">رسوم التوصيل:</span>' +
    '<span style="color:#1A1A1A;font-weight:bold;">' + fmt(orderData.deliveryFee) + '</span></div>' +
    '<div style="display:flex;justify-content:space-between;padding:8px;background:linear-gradient(135deg,#C9A96E,#D4AF37);border-radius:8px;margin-top:6px;">' +
    '<span style="color:white;font-size:12px;font-weight:bold;">الاجمالي النهائي:</span>' +
    '<span style="color:white;font-size:15px;font-weight:bold;">' + fmt(orderData.total) + '</span></div></div>' +

    '<div style="text-align:center;padding-top:8px;border-top:3px solid #C9A96E;">' +
    '<p style="margin:3px 0;color:#6B6B6B;font-size:9px;">شكراً لتعاملكم مع نفائس</p>' +
    '<p style="margin:3px 0;color:#C9A96E;font-size:11px;font-weight:bold;">NAFAES | نفائس - فخامة المكان تبدأ من رائحته</p>' +
    '<div style="margin-top:5px;display:flex;justify-content:center;gap:16px;">' +
    '<span style="color:#6B6B6B;font-size:8px;">واتساب: 66377312</span>' +
    '<span style="color:#6B6B6B;font-size:8px;">@nafaes.q8</span></div></div></div>';

  try {
    const canvas = await html2canvas(container, {
      scale: 3,
      useCORS: true,
      logging: true,
      backgroundColor: '#FFFFFF',
    });

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 8;
    const maxWidth = pageWidth - margin * 2;
    const maxHeight = pageHeight - margin * 2;
    const imageRatio = canvas.width / canvas.height;
    let renderWidth = maxWidth;
    let renderHeight = renderWidth / imageRatio;
    if (renderHeight > maxHeight) {
      renderHeight = maxHeight;
      renderWidth = renderHeight * imageRatio;
    }
    const x = (pageWidth - renderWidth) / 2;
    const y = margin;

    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', x, y, renderWidth, renderHeight);

    pdf.save('NAFAES-' + orderData.orderNumber + '.pdf');
    console.log('PDF saved: NAFAES-' + orderData.orderNumber + '.pdf');
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  } finally {
    document.body.removeChild(container);
  }
}
