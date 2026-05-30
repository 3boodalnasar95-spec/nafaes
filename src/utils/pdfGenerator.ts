import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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

export async function generateInvoicePDF(data: InvoiceData): Promise<Blob> {
  // Create a temporary container for the invoice
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.top = '0';
  container.style.width = '210mm';
  container.style.minHeight = '297mm';
  container.style.backgroundColor = '#FFFFFF';
  container.style.fontFamily = 'Tajawal, Arial, sans-serif';
  container.style.direction = 'rtl';
  document.body.appendChild(container);

  // Build the invoice HTML
  container.innerHTML = `
    <div style="padding: 40px; box-sizing: border-box;">
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 3px solid #C9A96E;">
        <div style="display: inline-flex; align-items: center; gap: 15px; margin-bottom: 10px;">
          <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #C9A96E, #D4AF37); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
            <span style="color: white; font-size: 32px; font-weight: bold;">ن</span>
          </div>
          <div style="text-align: right;">
            <h1 style="margin: 0; font-size: 28px; color: #1A1A1A; letter-spacing: 2px;">NAFAES</h1>
            <p style="margin: 0; font-size: 10px; color: #6B6B6B; letter-spacing: 3px;">ESSENCE OF ELEGANCE</p>
          </div>
        </div>
        <p style="margin: 5px 0; color: #6B6B6B; font-size: 12px;">العطور الذكية والهدايا العطرية الفاخرة - الكويت</p>
        <p style="margin: 5px 0; color: #6B6B6B; font-size: 12px;">واتساب: +965 66377312 | @nafaes.q8</p>
      </div>

      <!-- Invoice Title -->
      <div style="background: linear-gradient(135deg, #C9A96E, #D4AF37); color: white; padding: 15px 30px; border-radius: 10px; text-align: center; margin-bottom: 25px;">
        <h2 style="margin: 0; font-size: 24px;">فاتورة ضريبية / TAX INVOICE</h2>
      </div>

      <!-- Order Info -->
      <div style="display: flex; justify-content: space-between; margin-bottom: 25px;">
        <div style="background: #FAF8F5; padding: 15px; border-radius: 10px; flex: 1; margin-left: 15px;">
          <h3 style="margin: 0 0 10px 0; color: #C9A96E; font-size: 14px;">معلومات الفاتورة</h3>
          <p style="margin: 5px 0; font-size: 12px; color: #1A1A1A;"><strong>رقم الفاتورة:</strong> ${data.orderNumber}</p>
          <p style="margin: 5px 0; font-size: 12px; color: #1A1A1A;"><strong>التاريخ:</strong> ${data.date}</p>
          <p style="margin: 5px 0; font-size: 12px; color: #1A1A1A;"><strong>حالة الطلب:</strong> قيد المراجعة</p>
        </div>
        <div style="background: #FAF8F5; padding: 15px; border-radius: 10px; flex: 1;">
          <h3 style="margin: 0 0 10px 0; color: #C9A96E; font-size: 14px;">طريقة الدفع</h3>
          <p style="margin: 5px 0; font-size: 14px; color: #1A1A1A; font-weight: bold;">
            ${data.paymentMethod === 'cash' ? '💵 كاش عند الاستلام' : '💳 رابط دفع إلكتروني'}
          </p>
        </div>
      </div>

      <!-- Customer Info -->
      <div style="background: #F5F0E8; padding: 20px; border-radius: 10px; margin-bottom: 25px; border-right: 4px solid #C9A96E;">
        <h3 style="margin: 0 0 15px 0; color: #C9A96E; font-size: 16px;">👤 بيانات العميل</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          <p style="margin: 5px 0; font-size: 12px; color: #1A1A1A;"><strong>الاسم:</strong> ${data.customerName}</p>
          <p style="margin: 5px 0; font-size: 12px; color: #1A1A1A;"><strong>الهاتف:</strong> +965 ${data.customerPhone}</p>
          <p style="margin: 5px 0; font-size: 12px; color: #1A1A1A;"><strong>المحافظة:</strong> ${data.governorate}</p>
          <p style="margin: 5px 0; font-size: 12px; color: #1A1A1A;"><strong>المنطقة:</strong> ${data.area}</p>
        </div>
        <p style="margin: 10px 0 0 0; font-size: 12px; color: #1A1A1A;"><strong>العنوان:</strong> ${data.address}</p>
        ${data.notes ? `<p style="margin: 5px 0 0 0; font-size: 12px; color: #6B6B6B;"><strong>ملاحظات:</strong> ${data.notes}</p>` : ''}
      </div>

      <!-- Items Table -->
      <div style="margin-bottom: 25px;">
        <h3 style="margin: 0 0 15px 0; color: #C9A96E; font-size: 16px;">🛒 تفاصيل المنتجات</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
          <thead>
            <tr style="background: linear-gradient(135deg, #C9A96E, #D4AF37); color: white;">
              <th style="padding: 12px; text-align: right;">المنتج</th>
              <th style="padding: 12px; text-align: center;">الكمية</th>
              <th style="padding: 12px; text-align: center;">السعر</th>
              <th style="padding: 12px; text-align: left;">الإجمالي</th>
            </tr>
          </thead>
          <tbody>
            ${data.items.map((item, index) => `
              <tr style="background: ${index % 2 === 0 ? '#FFFFFF' : '#FAF8F5'}; border-bottom: 1px solid #E8E0D5;">
                <td style="padding: 12px;">
                  <strong style="color: #1A1A1A;">${item.nameAr}</strong><br/>
                  <span style="color: #6B6B6B; font-size: 10px;">${item.nameEn}</span>
                </td>
                <td style="padding: 12px; text-align: center; color: #1A1A1A;">${item.quantity}</td>
                <td style="padding: 12px; text-align: center; color: #1A1A1A;">${item.unitPrice.toFixed(3)} د.ك</td>
                <td style="padding: 12px; text-align: left; color: #C9A96E; font-weight: bold;">${item.totalPrice.toFixed(3)} د.ك</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- Summary -->
      <div style="background: #FAF8F5; padding: 20px; border-radius: 10px; margin-bottom: 25px;">
        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px dashed #E8E0D5;">
          <span style="color: #6B6B6B;">المجموع الفرعي:</span>
          <span style="color: #1A1A1A;">${data.subtotal.toFixed(3)} د.ك</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px dashed #E8E0D5;">
          <span style="color: #6B6B6B;">رسوم التوصيل:</span>
          <span style="color: #1A1A1A;">${data.deliveryFee.toFixed(3)} د.ك</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 15px 0; background: linear-gradient(135deg, #C9A96E, #D4AF37); border-radius: 8px; margin-top: 10px; padding: 15px;">
          <span style="color: white; font-size: 16px; font-weight: bold;">الإجمالي النهائي:</span>
          <span style="color: white; font-size: 20px; font-weight: bold;">${data.total.toFixed(3)} د.ك</span>
        </div>
      </div>

      <!-- Footer -->
      <div style="text-align: center; padding-top: 20px; border-top: 2px solid #E8E0D5;">
        <p style="margin: 5px 0; color: #6B6B6B; font-size: 11px;">شكراً لتعاملكم مع نفائس 🕌</p>
        <p style="margin: 5px 0; color: #C9A96E; font-size: 12px; font-weight: bold;">NAFAES | نفائس - فخامة المكان تبدأ من رائحته</p>
        <div style="margin-top: 15px; display: flex; justify-content: center; gap: 20px;">
          <span style="color: #6B6B6B; font-size: 10px;">📱 واتساب: 66377312</span>
          <span style="color: #6B6B6B; font-size: 10px;">📸 @nafaes.q8</span>
        </div>
      </div>
    </div>
  `;

  try {
    // Use html2canvas to render the container
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#FFFFFF',
    });

    // Calculate PDF dimensions
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // Add image to PDF
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add new pages if content is longer than one page
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Clean up
    document.body.removeChild(container);

    return pdf.output('blob');
  } catch (error) {
    document.body.removeChild(container);
    throw error;
  }
}

export async function downloadInvoicePDF(data: InvoiceData): Promise<void> {
  const pdfBlob = await generateInvoicePDF(data);
  const url = URL.createObjectURL(pdfBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `فاتورة-${data.orderNumber}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}