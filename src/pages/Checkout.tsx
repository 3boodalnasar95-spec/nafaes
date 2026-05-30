import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle, MessageCircle, AlertCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import Layout from '../components/Layout';
import { formatPrice, deliveryFee, whatsappLink, generateWhatsAppMessage } from '../data/products';
import { Order } from '../data/products';

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, clearCart, cartTotal } = useStore();
  const [formData, setFormData] = useState<Order>({
    name: '',
    phone: '',
    area: '',
    address: '',
    notes: '',
    paymentMethod: 'cash',
  });
  const [submitted, setSubmitted] = useState(false);

  const subtotal = cartTotal();
  const total = subtotal + deliveryFee;

  if (cartItems.length === 0 && !submitted) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">السلة فارغة</h2>
          <Link to="/products" className="text-[#C9A96E] hover:text-[#1A1A1A]">
            تصفح المنتجات
          </Link>
        </div>
      </Layout>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const sendToWhatsApp = () => {
    const message = generateWhatsAppMessage(cartItems, formData);
    window.open(`${whatsappLink}?text=${message}`, '_blank');
    clearCart();
  };

  if (submitted) {
    return (
      <Layout>
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="bg-white rounded-2xl border border-[#E8E0D5] p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-[#7C9A6E]/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-[#7C9A6E]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">تم استلام طلبك!</h2>
              <p className="text-[#6B6B6B] mb-6">
                سيتم تأكيد الطلب والتوفر عبر واتساب
              </p>
              
              <div className="bg-[#F5F0E8] rounded-xl p-6 text-right mb-6">
                <h3 className="font-semibold text-[#1A1A1A] mb-4">ملخص الطلب:</h3>
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex justify-between py-2 border-b border-[#E8E0D5] last:border-0">
                    <span className="text-[#6B6B6B]">{item.product.nameAr} × {item.quantity}</span>
                    <span className="text-[#1A1A1A] font-medium">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-2 mt-2">
                  <span className="font-bold text-[#1A1A1A]">الإجمالي</span>
                  <span className="font-bold text-[#C9A96E]">{formatPrice(total)}</span>
                </div>
              </div>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={sendToWhatsApp}
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold py-4 rounded-xl transition-colors"
              >
                <MessageCircle className="w-6 h-6" />
                <span>إرسال الطلب عبر واتساب</span>
              </a>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#F5F0E8] to-[#FAF8F5] py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-2">إتمام الطلب</h1>
          <p className="text-[#6B6B6B]">أكمل بياناتك لإتمام الطلب</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#E8E0D5] p-6 md:p-8">
                <h2 className="text-xl font-bold text-[#1A1A1A] mb-6">بيانات العميل</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-[#1A1A1A] font-medium mb-2">الاسم الكامل *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E8E0D5] rounded-xl text-[#1A1A1A] focus:outline-none focus:border-[#C9A96E] transition-colors"
                      placeholder="أدخل اسمك الكامل"
                    />
                  </div>

                  <div>
                    <label className="block text-[#1A1A1A] font-medium mb-2">رقم الهاتف *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E8E0D5] rounded-xl text-[#1A1A1A] focus:outline-none focus:border-[#C9A96E] transition-colors"
                      placeholder="رقم الهاتف"
                    />
                  </div>

                  <div>
                    <label className="block text-[#1A1A1A] font-medium mb-2">المنطقة *</label>
                    <input
                      type="text"
                      required
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E8E0D5] rounded-xl text-[#1A1A1A] focus:outline-none focus:border-[#C9A96E] transition-colors"
                      placeholder="مثال: حولي، الفروانية، الجهراء"
                    />
                  </div>

                  <div>
                    <label className="block text-[#1A1A1A] font-medium mb-2">العنوان بالتفصيل *</label>
                    <textarea
                      required
                      rows={3}
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E8E0D5] rounded-xl text-[#1A1A1A] focus:outline-none focus:border-[#C9A96E] transition-colors resize-none"
                      placeholder="القطعة، الشارع، رقم المبنى، الدور، الشقة..."
                    />
                  </div>

                  <div>
                    <label className="block text-[#1A1A1A] font-medium mb-2">ملاحظات إضافية (اختياري)</label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E8E0D5] rounded-xl text-[#1A1A1A] focus:outline-none focus:border-[#C9A96E] transition-colors resize-none"
                      placeholder="أي ملاحظات خاصة بالطلب..."
                    />
                  </div>

                  <div>
                    <label className="block text-[#1A1A1A] font-medium mb-4">طريقة الدفع *</label>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 p-4 bg-[#FAF8F5] border border-[#E8E0D5] rounded-xl cursor-pointer hover:border-[#C9A96E] transition-colors">
                        <input
                          type="radio"
                          name="payment"
                          value="cash"
                          checked={formData.paymentMethod === 'cash'}
                          onChange={() => setFormData({ ...formData, paymentMethod: 'cash' })}
                          className="w-5 h-5 accent-[#C9A96E]"
                        />
                        <span className="text-[#1A1A1A]">كاش عند الاستلام</span>
                      </label>
                      <label className="flex items-center gap-3 p-4 bg-[#FAF8F5] border border-[#E8E0D5] rounded-xl cursor-pointer hover:border-[#C9A96E] transition-colors">
                        <input
                          type="radio"
                          name="payment"
                          value="link"
                          checked={formData.paymentMethod === 'link'}
                          onChange={() => setFormData({ ...formData, paymentMethod: 'link' })}
                          className="w-5 h-5 accent-[#C9A96E]"
                        />
                        <span className="text-[#1A1A1A]">رابط دفع</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Note */}
                <div className="flex items-start gap-2 mt-6 p-4 bg-[#C9A96E]/10 rounded-xl">
                  <AlertCircle className="w-5 h-5 text-[#C9A96E] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-[#6B6B6B]">
                    سيتم تأكيد الطلب والتوفر عبر واتساب قبل الشحن
                  </p>
                </div>
              </form>
            </div>

            {/* Summary */}
            <div>
              <div className="bg-white rounded-2xl border border-[#E8E0D5] p-6 sticky top-24">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-6">ملخص الطلب</h3>
                
                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.nameAr}
                        className="w-16 h-16 object-contain bg-[#F5F0E8] rounded-lg p-1"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://via.placeholder.com/100x100/F5F0E8/C9A96E?text=${encodeURIComponent(item.product.nameEn)}`;
                        }}
                      />
                      <div className="flex-1">
                        <p className="text-[#1A1A1A] font-medium text-sm">{item.product.nameAr}</p>
                        <p className="text-[#6B6B6B] text-xs">الكمية: {item.quantity}</p>
                        <p className="text-[#C9A96E] font-bold text-sm">{formatPrice(item.product.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 py-4 border-t border-[#E8E0D5]">
                  <div className="flex justify-between text-[#6B6B6B]">
                    <span>المجموع الفرعي</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-[#6B6B6B]">
                    <span>رسوم التوصيل</span>
                    <span>{formatPrice(deliveryFee)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-[#E8E0D5]">
                    <span className="text-[#1A1A1A] font-bold">الإجمالي</span>
                    <span className="text-[#C9A96E] font-bold text-xl">{formatPrice(total)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full flex items-center justify-center gap-2 bg-[#1A1A1A] hover:bg-[#C9A96E] text-white font-semibold py-4 rounded-xl transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  إتمام الطلب عبر واتساب
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}