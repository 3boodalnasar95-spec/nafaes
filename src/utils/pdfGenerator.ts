import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { InvoiceData } from './invoiceGenerator';

export async function generatePDF(elementId: string, orderNumber: string): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Element not found');
    return;
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#FFFFFF',
    });

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
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

    pdf.save(`NAFAES-${orderNumber}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}

export async function downloadInvoicePDF(orderData: InvoiceData): Promise<void> {
  // Create a temporary container
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

  const formatPrice = (price: number) => `${price.toFixed(3)} د.ك`;
  const paymentMethodText = orderData.paymentMethod === 'cash' ? '💵 كاش عند الاستلام' : '💳 رابط دفع إلكتروني';

  container.innerHTML = `
    <div style="max-width: 170mm; margin: 0 auto; padding: 10px;">
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 3px solid #C9A96E;">
        <div style="display: inline-flex; align-items: center; gap: 15px; margin-bottom: 8px;">
          <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #C9A96E, #D4AF37); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
            <span style="color: white; font-size: 24px; font-weight: bold;">ن</span>
          </div>
          <div style="text-align: right;">
            <h1 style="margin: 0; font-size: 24px; color: #1A1A1A; letter-spacing: 2px;">NAFAES</h1>
            <p style="margin: 0; font-size: 8px; color: #6B6B6B; letter-spacing: 2px;">ESSENCE OF ELEGANCE</p>
          </div>
        </div>
        <p style="margin: 3px 0; color: #6B6B6B; font-size: 10px;">العطور الذكية والهدايا العطرية الفاخرة - الكويت</p>
        <p style="margin: 3px 0; color: #6B6B6B; font-size: 10px;">واتساب: +965 66377312 | @nafaes.q8</p>
      </div>

      <!-- Invoice Title -->
      <div style="background: linear-gradient(135deg, #C9A96E, #D4AF37); color: white; padding: 10px 20px; border-radius: 8px; text-align: center; margin-bottom: 15px;">
        <h2 style="margin: 0; font-size: 18px;">فاتورة ضريبية | TAX INVOICE</h2>
      </div>

      <!-- Order Info -->
      <div style="display: flex; gap: 10px; margin-bottom: 15px;">
        <div style="flex: 1; background: #FAF8F5; padding: 10px; border-radius: 8px;">
          <h3 style="margin: 0 0 8px 0; color: #C9A96E; font-size: 12px;">معلومات الفاتورة</h3>
          <p style="margin: 3px 0; font-size: 10px; color: #1A1A1A;"><strong>رقم الفاتورة:</strong> ${orderData.orderNumber}</p>
          <p style="margin: 3px 0; font-size: 10px; color: #1A1A1A;"><strong>التاريخ:</strong> ${orderData.date}</p>
          <p style="margin: 3px 0; font-size: 10px; color: #1A1A1A;"><strong>حالة الطلب:</strong> قيد المراجعة</p>
        </div>
        <div style="flex: 1; background: #FAF8F5; padding: 10px; border-radius: 8px;">
          <h3 style="margin: 0 0 8px 0; color: #C9A96E; font-size: 12px;">طريقة الدفع</h3>
          <p style="margin: 3px 0; font-size: 12px; color: #1A1A1A; font-weight: bold;">${paymentMethodText}</p>
        </div>
      </div>

      <!-- Customer Info -->
      <div style="background: #F5F0E8; padding: 15px; border-radius: 8px; margin-bottom: 15px; border-right: 4px solid #C9A96E;">
        <h3 style="margin: 0 0 10px 0; color: #C9A96E; font-size: 14px;">👤 بيانات العميل</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 5px; font-size: 10px;">
          <p style="margin: 3px 0; color: #1A1A1A;"><strong>الاسم:</strong> ${orderData.customerName}</p>
          <p style="margin: 3px 0; color: #1A1A1A;"><strong>الهاتف:</strong> +965 ${orderData.customerPhone}</p>
          <p style="margin: 3px 0; color: #1A1A1A;"><strong>المحافظة:</strong> ${orderData.governorate}</p>
          <p style="margin: 3px 0; color: #1A1A1A;"><strong>المنطقة:</strong> ${orderData.area}</p>
        </div>
        <p style="margin: 5px 0 0 0; font-size: 10px; color: #1A1A1A;"><strong>العنوان:</strong> ${orderData.address}</p>
        ${orderData.notes ? `<p style="margin: 3px 0 0 0; font-size: 10px; color: #6B6B6B;"><strong>ملاحظات:</strong> ${orderData.notes}</p>` : ''}
      </div>

      <!-- Items Table -->
      <div style="margin-bottom: 15px;">
        <h3 style="margin: 0 0 10px 0; color: #C9A96E; font-size: 14px;">🛒 تفاصيل المنتجات</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 10px;">
          <thead>
            <tr style="background: linear-gradient(135deg, #C9A96E, #D4AF37); color: white;">
              <th style="padding: 8px; text-align: right;">المنتج</th>
              <th style="padding: 8px; text-align: center;">الكمية</th>
              <th style="padding: 8px; text-align: center;">السعر</th>
              <th style="padding: 8px; text-align: left;">الإجمالي</th>
            </tr>
          </thead>
          <tbody>
            ${orderData.items.map((item, index) => `
              <tr style="background: ${index % 2 === 0 ? '#FFFFFF' : '#FAF8F5'}; border-bottom: 1px solid #E8E0D5;">
                <td style="padding: 8px;">
                  <strong style="color: #1A1A1A;">${item.nameAr}</strong><br/>
                  <span style="color: #6B6B6B; font-size: 8px;">${item.nameEn}</span>
                </td>
                <td style="padding: 8px; text-align: center; color: #1A1A1A;">${item.quantity}</td>
                <td style="padding: 8px; text-align: center; color: #1A1A1A;">${formatPrice(item.unitPrice)}</td>
                <td style="padding: 8px; text-align: left; color: #C9A96E; font-weight: bold;">${formatPrice(item.totalPrice)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- Summary -->
      <div style="background: #FAF8F5; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
        <div style="display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px dashed #E8E0D5; font-size: 10px;">
          <span style="color: #6B6B6B;">المجموع الفرعي:</span>
          <span style="color: #1A1A1A;">${formatPrice(orderData.subtotal)}</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px dashed #E8E0D5; font-size: 10px;">
          <span style="color: #6B6B6B;">رسوم التوصيل:</span>
          <span style="color: #1A1A1A;">${formatPrice(orderData.deliveryFee)}</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 10px; background: linear-gradient(135deg, #C9A96E, #D4AF37); border-radius: 6px; margin-top: 8px;">
          <span style="color: white; font-size: 12px; font-weight: bold;">الإجمالي النهائي:</span>
          <span style="color: white; font-size: 16px; font-weight: bold;">${formatPrice(orderData.total)}</span>
        </div>
      </div>

      <!-- Footer -->
      <div style="text-align: center; padding-top: 15px; border-top: 2px solid #E8E0D5;">
        <p style="margin: 3px 0; color: #6B6B6B; font-size: 10px;">شكراً لتعاملكم مع نفائس 🕌</p>
        <p style="margin: 3px 0; color: #C9A96E; font-size: 12px; font-weight: bold;">NAFAES | نفائس - فخامة المكان تبدأ من رائحته</p>
        <div style="margin-top: 10px; display: flex; justify-content: center; gap: 15px;">
          <span style="color: #6B6B6B; font-size: 9px;">📱 واتساب: 66377312</span>
          <span style="color: #6B6B6B; font-size: 9px;">📸 @nafaes.q8</span>
        </div>
      </div>
    </div>
  `;

  try {
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
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

    pdf.save(`NAFAES-${orderData.orderNumber}.pdf`);
  } finally {
    document.body.removeChild(container);
  }
}