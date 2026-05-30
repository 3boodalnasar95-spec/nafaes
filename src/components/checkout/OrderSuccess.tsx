import React from 'react';
import { Download, CheckCircle } from 'lucide-react';
import { InvoiceData } from '@/utils/invoiceGenerator';
import { formatPrice } from '@/data/products';
import { downloadInvoicePDF } from '@/utils/pdfGenerator';

interface OrderSuccessProps {
  orderData: InvoiceData;
  onDownloadPdf: () => void;
}

export default function OrderSuccess({ orderData }: OrderSuccessProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#E8E0D5] p-8 text-center shadow-lg">
      {/* Success Icon */}
      <div className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
        <CheckCircle className="w-12 h-12 text-green-500" />
      </div>
      
      <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">🎉 تم استلام طلبك بنجاح!</h2>
      
      {/* Order Number */}
      <div className="bg-gradient-to-r from-[#C9A96E] to-[#D4AF37] text-white rounded-xl p-6 mb-6">
        <p className="text-sm opacity-90 mb-1">رقم الطلب</p>
        <p className="text-3xl font-bold tracking-wider">{orderData.orderNumber}</p>
      </div>
      
      {/* Order Summary */}
      <div className="bg-[#F5F0E8] rounded-xl p-6 text-right mb-6">
        <h3 className="font-bold text-[#1A1A1A] mb-4 text-center">📋 ملخص الطلب</h3>
        
        {orderData.items.map((item, index) => (
          <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg mb-2">
            <div className="flex-1">
              <p className="text-[#1A1A1A] font-medium">{item.nameAr}</p>
              <p className="text-[#6B6B6B] text-sm">{item.quantity} × {formatPrice(item.unitPrice)}</p>
            </div>
            <p className="text-[#C9A96E] font-bold">{formatPrice(item.totalPrice)}</p>
          </div>
        ))}
        
        <div className="mt-4 pt-4 border-t border-[#E8E0D5] space-y-2">
          <div className="flex justify-between text-[#6B6B6B]">
            <span>المجموع الفرعي</span>
            <span>{formatPrice(orderData.subtotal)}</span>
          </div>
          <div className="flex justify-between text-[#6B6B6B]">
            <span>رسوم التوصيل</span>
            <span>{formatPrice(orderData.deliveryFee)}</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-[#E8E0D5]">
            <span className="font-bold text-[#1A1A1A] text-lg">الإجمالي</span>
            <span className="font-bold text-[#C9A96E] text-2xl">{formatPrice(orderData.total)}</span>
          </div>
        </div>
      </div>
      
      {/* Customer Info */}
      <div className="bg-blue-50 rounded-xl p-4 mb-6 text-right">
        <h4 className="font-bold text-[#1A1A1A] mb-2 text-center">👤 بيانات التوصيل</h4>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <p><strong>الاسم:</strong> {orderData.customerName}</p>
          <p><strong>الهاتف:</strong> +965 {orderData.customerPhone}</p>
          <p><strong>المحافظة:</strong> {orderData.governorate}</p>
          <p><strong>المنطقة:</strong> {orderData.area}</p>
        </div>
        <p className="text-sm mt-2"><strong>العنوان:</strong> {orderData.address}</p>
        <p className="text-sm"><strong>الدفع:</strong> {orderData.paymentMethod === 'cash' ? '💵 كاش عند الاستلام' : '💳 رابط دفع'}</p>
      </div>
      
      {/* PDF Download Button */}
      <button 
        onClick={() => downloadInvoicePDF(orderData)}
        className="w-full flex items-center justify-center gap-3 bg-[#C9A96E] hover:bg-[#D4AF37] text-white font-bold py-4 rounded-xl transition-colors"
      >
        <Download className="w-6 h-6" />
        📄 تحميل فاتورة PDF
      </button>
      
      <p className="text-[#6B6B6B] text-sm mt-4">
        ✅ تم إرسال الطلب إليك تلقائياً عبر واتساب
      </p>
    </div>
  );
}