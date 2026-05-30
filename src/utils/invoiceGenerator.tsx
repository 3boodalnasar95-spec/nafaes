import { CheckCircle } from 'lucide-react';

interface OrderItem {
  nameAr: string;
  nameEn: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface InvoiceData {
  orderNumber: string;
  date: string;
  customerName: string;
  customerPhone: string;
  governorate: string;
  area: string;
  address: string;
  notes: string;
  paymentMethod: 'cash' | 'link';
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
}

export default function InvoicePreview({ orderData }: { orderData: InvoiceData }) {
  const formatPrice = (price: number) => `${price.toFixed(3)} د.ك`;

  return (
    <div className="bg-white rounded-2xl border border-[#E8E0D5] p-8 text-center shadow-lg">
      {/* Logo Header */}
      <div className="mb-6 pb-6 border-b-2 border-[#C9A96E]">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C9A96E] to-[#D4AF37] flex items-center justify-center">
            <span className="text-white font-bold text-3xl">ن</span>
          </div>
          <div className="text-right">
            <h1 className="text-3xl font-bold text-[#1A1A1A] tracking-wide">NAFAES</h1>
            <span className="text-xs text-[#6B6B6B] tracking-widest">ESSENCE OF ELEGANCE</span>
          </div>
        </div>
        <p className="text-sm text-[#6B6B6B]">العطور الذكية والهدايا العطرية الفاخرة - الكويت</p>
        <p className="text-xs text-[#6B6B6B]">واتساب: +965 66377312 | @nafaes.q8</p>
      </div>

      {/* Success Icon */}
      <div className="w-20 h-20 mx-auto mb-4 bg-[#7C9A6E]/10 rounded-full flex items-center justify-center">
        <CheckCircle className="w-10 h-10 text-[#7C9A6E]" />
      </div>
      
      <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">تم استلام طلبك بنجاح! 🎉</h2>
      <p className="text-[#6B6B6B] mb-2">رقم الطلب: <strong className="text-[#C9A96E] text-xl">{orderData.orderNumber}</strong></p>
      <p className="text-[#6B6B6B] text-sm mb-6">سيتم التواصل معك قريباً لتأكيد الطلب</p>

      {/* Customer Info */}
      <div className="bg-[#F5F0E8] rounded-xl p-4 mb-6 text-right">
        <h3 className="font-semibold text-[#1A1A1A] mb-3 text-center">👤 بيانات العميل</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <p><strong>الاسم:</strong> {orderData.customerName}</p>
          <p><strong>الهاتف:</strong> +965 {orderData.customerPhone}</p>
          <p><strong>المحافظة:</strong> {orderData.governorate}</p>
          <p><strong>المنطقة:</strong> {orderData.area}</p>
        </div>
        <p className="text-sm mt-2"><strong>العنوان:</strong> {orderData.address}</p>
        {orderData.notes && <p className="text-sm text-[#6B6B6B]"><strong>ملاحظات:</strong> {orderData.notes}</p>}
      </div>

      {/* Order Items */}
      <div className="bg-[#F5F0E8] rounded-xl p-4 mb-6">
        <h3 className="font-semibold text-[#1A1A1A] mb-3 text-center">🛒 المنتجات ({orderData.items.length})</h3>
        {orderData.items.map((item, index) => (
          <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg mb-2">
            <div className="flex-1 text-right">
              <p className="text-[#1A1A1A] font-medium text-sm">{item.nameAr}</p>
              <p className="text-[#6B6B6B] text-xs">{item.nameEn}</p>
              <p className="text-xs text-[#6B6B6B]">{item.quantity} × {formatPrice(item.unitPrice)}</p>
            </div>
            <p className="text-[#C9A96E] font-bold">{formatPrice(item.totalPrice)}</p>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-[#F5F0E8] rounded-xl p-4 mb-6">
        <h3 className="font-semibold text-[#1A1A1A] mb-3 text-center">💰 ملخص الفاتورة</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-[#6B6B6B]">المجموع الفرعي:</span>
            <span>{formatPrice(orderData.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6B6B6B]">رسوم التوصيل:</span>
            <span>{formatPrice(orderData.deliveryFee)}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-[#E8E0D5]">
            <span className="font-bold text-[#1A1A1A]">الإجمالي النهائي:</span>
            <span className="font-bold text-[#C9A96E] text-xl">{formatPrice(orderData.total)}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-[#E8E0D5]">
            <span className="font-bold text-[#1A1A1A]">طريقة الدفع:</span>
            <span>{orderData.paymentMethod === 'cash' ? '💵 كاش عند الاستلام' : '💳 رابط دفع'}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-[#6B6B6B] text-sm border-t border-[#E8E0D5] pt-4">
        <p className="text-[#C9A96E] font-semibold">شكراً لتعاملكم مع نفائس 🕌</p>
        <p>NAFAES | نفائس - فخامة المكان تبدأ من رائحته</p>
      </div>
    </div>
  );
}

export type { InvoiceData, OrderItem };