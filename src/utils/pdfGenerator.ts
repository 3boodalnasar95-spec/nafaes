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
  container.style.minHeight = '297mm';
  container.style.backgroundColor = '#FFFFFF';
  container.style.fontFamily = 'Tajawal, Arial, sans-serif';
  container.style.direction = 'rtl';
  container.style.padding = '20px';
  document.body.appendChild(container);

  const fmt = (price: number) => price.toFixed(3) + ' د.ك';
  const payMethod = orderData.paymentMethod === 'cash' ? 'كاش عند الاستلام' : 'رابط دفع الكتروني';

  const itemsHtml = orderData.items.map((item, idx) => 
    '<tr style="background:' + (idx % 2 === 0 ? '#FFFFFF' : '#FAF8F5') + '; border-bottom:1px solid #E8E0D5;">' +
    '<td style="padding:10px;"><strong style="color:#1A1A1A;font-size:11px;">' + item.nameAr + '</strong>' + (item.variantLabel ? '<br/><span style="color:#C9A96E;font-size:9px;">' + item.variantLabel + '</span>' : '') + '<br/><span style="color:#6B6B6B;font-size:9px;">' + item.nameEn + '</span></td>' +
    '<td style="padding:10px;text-align:center;color:#1A1A1A;font-weight:bold;">' + item.quantity + '</td>' +
    '<td style="padding:10px;text-align:center;color:#1A1A1A;">' + fmt(item.unitPrice) + '</td>' +
    '<td style="padding:10px;text-align:left;color:#C9A96E;font-weight:bold;font-size:12px;">' + fmt(item.totalPrice) + '</td>' +
    '</tr>'
  ).join('');

  container.innerHTML = 
    '<div style="max-width:170mm;margin:0 auto;padding:10px;">' +
    '<div style="text-align:center;margin-bottom:20px;padding-bottom:15px;border-bottom:3px solid #C9A96E;">' +
    '<div style="display:flex;align-items:center;justify-content:center;gap:15px;margin-bottom:10px;">' +
    '<div style="width:60px;height:60px;background:linear-gradient(135deg,#C9A96E,#D4AF37);border-radius:50%;display:flex;align-items:center;justify-content:center;">' +
    '<span style="color:white;font-size:28px;font-weight:bold;">ن</span></div>' +
    '<div style="text-align:right;">' +
    '<h1 style="margin:0;font-size:28px;color:#1A1A1A;letter-spacing:3px;font-weight:bold;">NAFAES</h1>' +
    '<p style="margin:0;font-size:10px;color:#6B6B6B;letter-spacing:2px;">ESSENCE OF ELEGANCE</p></div></div>' +
    '<p style="margin:5px 0;color:#1A1A1A;font-size:11px;">العطور الذكية والهدايا العطرية الفاخرة - الكويت</p>' +
    '<p style="margin:3px 0;color:#C9A96E;font-size:10px;">واتساب: 66377312 | @nafaes.q8</p></div>' +

    '<div style="background:linear-gradient(135deg,#C9A96E,#D4AF37);color:white;padding:12px 20px;border-radius:8px;text-align:center;margin-bottom:15px;">' +
    '<h2 style="margin:0;font-size:20px;font-weight:bold;">🧾 فاتورة | INVOICE</h2></div>' +

    '<div style="display:flex;gap:15px;margin-bottom:15px;">' +
    '<div style="flex:1;background:#FAF8F5;padding:12px;border-radius:8px;border:2px solid #C9A96E;">' +
    '<h3 style="margin:0 0 8px 0;color:#C9A96E;font-size:12px;font-weight:bold;">معلومات الفاتورة</h3>' +
    '<p style="margin:4px 0;font-size:11px;color:#1A1A1A;"><strong>رقم الفاتورة:</strong> <span style="color:#C9A96E;font-weight:bold;font-size:14px;">' + orderData.orderNumber + '</span></p>' +
    '<p style="margin:4px 0;font-size:11px;color:#1A1A1A;"><strong>التاريخ:</strong> ' + orderData.date + '</p>' +
    '<p style="margin:4px 0;font-size:11px;color:#1A1A1A;"><strong>الحالة:</strong> <span style="background:#FFA500;color:white;padding:2px 8px;border-radius:4px;">قيد المراجعة</span></p></div>' +
    '<div style="flex:1;background:#FAF8F5;padding:12px;border-radius:8px;border:2px solid #C9A96E;">' +
    '<h3 style="margin:0 0 8px 0;color:#C9A96E;font-size:12px;font-weight:bold;">طريقة الدفع</h3>' +
    '<p style="margin:4px 0;font-size:14px;color:#1A1A1A;font-weight:bold;">' + payMethod + '</p></div></div>' +

    '<div style="background:#F5F0E8;padding:15px;border-radius:8px;margin-bottom:15px;border-right:4px solid #C9A96E;">' +
    '<h3 style="margin:0 0 10px 0;color:#C9A96E;font-size:14px;font-weight:bold;">بيانات العميل</h3>' +
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;font-size:11px;">' +
    '<p style="margin:3px 0;color:#1A1A1A;"><strong>الاسم:</strong> ' + orderData.customerName + '</p>' +
    '<p style="margin:3px 0;color:#1A1A1A;"><strong>الهاتف:</strong> +965 ' + orderData.customerPhone + '</p>' +
    '<p style="margin:3px 0;color:#1A1A1A;"><strong>المحافظة:</strong> ' + orderData.governorate + '</p>' +
    '<p style="margin:3px 0;color:#1A1A1A;"><strong>المنطقة:</strong> ' + orderData.area + '</p></div>' +
    '<p style="margin:6px 0 0 0;font-size:11px;color:#1A1A1A;"><strong>العنوان:</strong> ' + orderData.address + '</p>' +
    (orderData.notes ? '<p style="margin:4px 0 0 0;font-size:10px;color:#6B6B6B;"><strong>ملاحظات:</strong> ' + orderData.notes + '</p>' : '') + '</div>' +

    '<div style="margin-bottom:15px;background:white;">' +
    '<h3 style="margin:0 0 10px 0;color:#C9A96E;font-size:14px;font-weight:bold;">تفاصيل المنتجات (' + orderData.items.length + ')</h3>' +
    '<table style="width:100%;border-collapse:collapse;font-size:10px;">' +
    '<thead><tr style="background:linear-gradient(135deg,#C9A96E,#D4AF37);color:white;">' +
    '<th style="padding:10px;text-align:right;font-weight:bold;">المنتج</th>' +
    '<th style="padding:10px;text-align:center;font-weight:bold;">الكمية</th>' +
    '<th style="padding:10px;text-align:center;font-weight:bold;">السعر</th>' +
    '<th style="padding:10px;text-align:left;font-weight:bold;">الاجمالي</th></tr></thead>' +
    '<tbody>' + itemsHtml + '</tbody></table></div>' +

    '<div style="background:#FAF8F5;padding:15px;border-radius:8px;margin-bottom:15px;">' +
    '<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px dashed #E8E0D5;font-size:11px;">' +
    '<span style="color:#6B6B6B;">المجموع الفرعي:</span>' +
    '<span style="color:#1A1A1A;font-weight:bold;">' + fmt(orderData.subtotal) + '</span></div>' +
    '<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px dashed #E8E0D5;font-size:11px;">' +
    '<span style="color:#6B6B6B;">رسوم التوصيل:</span>' +
    '<span style="color:#1A1A1A;font-weight:bold;">' + fmt(orderData.deliveryFee) + '</span></div>' +
    '<div style="display:flex;justify-content:space-between;padding:12px;background:linear-gradient(135deg,#C9A96E,#D4AF37);border-radius:8px;margin-top:10px;">' +
    '<span style="color:white;font-size:14px;font-weight:bold;">الاجمالي النهائي:</span>' +
    '<span style="color:white;font-size:18px;font-weight:bold;">' + fmt(orderData.total) + '</span></div></div>' +

    '<div style="text-align:center;padding-top:15px;border-top:3px solid #C9A96E;">' +
    '<p style="margin:5px 0;color:#6B6B6B;font-size:11px;">شكراً لتعاملكم مع نفائس</p>' +
    '<p style="margin:5px 0;color:#C9A96E;font-size:14px;font-weight:bold;">NAFAES | نفائس - فخامة المكان تبدأ من رائحته</p>' +
    '<div style="margin-top:10px;display:flex;justify-content:center;gap:20px;">' +
    '<span style="color:#6B6B6B;font-size:10px;">واتساب: 66377312</span>' +
    '<span style="color:#6B6B6B;font-size:10px;">@nafaes.q8</span></div></div></div>';

  try {
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: true,
      backgroundColor: '#FFFFFF',
    });

    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save('NAFAES-' + orderData.orderNumber + '.pdf');
    console.log('PDF saved: NAFAES-' + orderData.orderNumber + '.pdf');
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  } finally {
    document.body.removeChild(container);
  }
}
