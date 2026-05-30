import React, { useState } from 'react';
import { CheckCircle, MessageCircle, Loader } from 'lucide-react';
import { InvoiceData } from '@/utils/invoiceGenerator';
import { formatPrice } from '@/data/products';
import { downloadInvoicePDF } from '@/utils/pdfGenerator';
import { generateFixedWhatsAppMessage, getWhatsAppLink } from '@/utils/whatsappGenerator';

interface OrderSuccessProps {
  orderData: InvoiceData;
}

export default function OrderSuccess({ orderData }: OrderSuccessProps) {
  const [orderSent, setOrderSent] = useState(false);
  const [pdfGenerating, setPdfGenerating] = useState(false);

  const handleSendToWhatsApp = async () => {
    setPdfGenerating(true);
    try {
      await downloadInvoicePDF(orderData);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
    setPdfGenerating(false);
    
    const fixedMessage = generateFixedWhatsAppMessage(orderData);
    window.open(getWhatsAppLink(fixedMessage), '_blank');
    
    setOrderSent(true);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E8E0D5] p-8 text-center shadow-lg">
      <div className="w-20 h-20 mx-auto mb-6 bg-[#7C9A6E]/10 rounded-full flex items-center justify-center">
        <CheckCircle className="w-10 h-10 text-[#7C9A6E]" />
      </div>
      <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">تم استلام طلبك بنجاح! 🎉</h2>
      <p className="text-[#6B6B6B] mb-2">رقم الطلب: <strong className="text-[#C9A96E]">{orderData.orderNumber}</strong></p>
      <p className="text-[#6B6B6B] text-sm mb-6">سيتم التواصل معك قريباً لتأكيد الطلب</p>
      
      <div className="bg-[#F5F0E8] rounded-xl p-6 text-right mb-6">
        <h3 className="font-semibold text-[#1A1A1A] mb-4 text-center">ملخص الطلب:</h3>
        {orderData.items.map((item, index) => (
          <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg mb-2">
            <div className="flex-1">
              <p className="text-[#1A1A1A] font-medium text-sm">{item.nameAr}</p>
              <p className="text-[#6B6B6B] text-xs">الكمية: {item.quantity} × {formatPrice(item.unitPrice)}</p>
            </div>
            <p className="text-[#C9A96E] font-bold">{formatPrice(item.totalPrice)}</p>
          </div>
        ))}
        <div className="flex justify-between items-center pt-4 mt-4 border-t border-[#E8E0D5]">
          <span className="font-bold text-[#1A1A1A]">المجموع الكلي</span>
          <span className="font-bold text-[#C9A96E] text-xl">{formatPrice(orderData.total)}</span>
        </div>
      </div>

      {!orderSent ? (
        <button 
          onClick={handleSendToWhatsApp}
          disabled={pdfGenerating}
          className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold py-4 rounded-xl text-lg transition-colors disabled:opacity-50"
        >
          {pdfGenerating ? (
            <>
              <Loader className="w-6 h-6 animate-spin" />
              جاري إنشاء الفاتورة...
            </>
          ) : (
            <>
              <MessageCircle className="w-6 h-6" />
              تأكيد الطلب + تحميل فاتورة PDF
            </>
          )}
        </button>
      ) : (
        <div className="mt-4 p-4 bg-green-50 rounded-xl text-green-700">
          <p className="font-medium">✅ تم إرسال الطلب بنجاح!</p>
          <p className="text-sm mt-1">تم تحميل الفاتورة PDF وأرسلت رسالة الواتساب</p>
        </div>
      )}
    </div>
  );
}