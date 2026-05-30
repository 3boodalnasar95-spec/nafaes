import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, MessageCircle, AlertCircle, ArrowRight, Search, Loader } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { useOrders } from '@/contexts/OrderContext';
import { 
  formatPrice, 
  whatsappLink, 
  kuwaitGovernorates, 
  getAreasByGovernorate, 
  getAreaById,
  generateOrderNumber,
  generateWhatsAppMessage,
  KuwaitArea
} from '@/data';
import Layout from '../components/Layout';
import { downloadInvoicePDF } from '@/utils/pdfGenerator';

interface CheckoutFormData {
  name: string;
  phone: string;
  governorate: string;
  area: string;
  block: string;
  street: string;
  avenue: string;
  house: string;
  floor: string;
  apartment: string;
  notes: string;
  paymentMethod: 'cash' | 'link';
}

export default function Checkout() {
  const { cartItems, clearCart, cartTotal } = useStore();
  const { addOrder } = useOrders();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: '', phone: '', governorate: '', area: '', block: '', street: '',
    avenue: '', house: '', floor: '', apartment: '', notes: '', paymentMethod: 'cash'
  });
  
  const [filteredAreas, setFilteredAreas] = useState<KuwaitArea[]>([]);
  const [areaSearch, setAreaSearch] = useState('');
  const [showAreaDropdown, setShowAreaDropdown] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [orderData, setOrderData] = useState<any>(null);
  const [orderSent, setOrderSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const subtotal = cartTotal();
  const selectedArea = getAreaById(formData.area);
  const deliveryFee = selectedArea?.deliveryFee || 0;
  const total = subtotal + deliveryFee;

  const handleGovernorateChange = (governorateId: string) => {
    setFormData({ ...formData, governorate: governorateId, area: '' });
    setFilteredAreas(getAreasByGovernorate(governorateId));
    setAreaSearch('');
  };

  const handleAreaSearch = (query: string) => {
    setAreaSearch(query);
    setShowAreaDropdown(true);
    if (formData.governorate) {
      const areas = getAreasByGovernorate(formData.governorate);
      setFilteredAreas(areas.filter(a => a.name.includes(query)));
    }
  };

  const selectArea = (areaId: string) => {
    const area = getAreaById(areaId);
    if (area) {
      setFormData({ ...formData, area: areaId });
      setAreaSearch(area.name);
      setShowAreaDropdown(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'الرجاء إدخال الاسم';
    if (!formData.phone.trim()) newErrors.phone = 'الرجاء إدخال رقم الهاتف';
    else if (!/^[0-9]{8}$/.test(formData.phone)) newErrors.phone = 'رقم الهاتف يجب أن يكون 8 أرقام';
    if (!formData.governorate) newErrors.governorate = 'الرجاء اختيار المحافظة';
    if (!formData.area) newErrors.area = 'الرجاء اختيار المنطقة';
    if (!formData.block.trim()) newErrors.block = 'الرجاء إدخال رقم القطعة';
    if (!formData.street.trim()) newErrors.street = 'الرجاء إدخال اسم الشارع';
    if (!formData.house.trim()) newErrors.house = 'الرجاء إدخال رقم المنزل/العمارة';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const governorateName = kuwaitGovernorates.find(g => g.id === formData.governorate)?.name_ar || formData.governorate;
    const areaName = selectedArea?.name || formData.area;
    const fullAddress = `قطعة ${formData.block}، شارع ${formData.street}${formData.avenue ? `، جادة ${formData.avenue}` : ''}، بيت ${formData.house}${formData.floor ? `، دور ${formData.floor}` : ''}${formData.apartment ? `، شقة ${formData.apartment}` : ''}`;

    const orderNumber = generateOrderNumber();
    const newOrderData = {
      orderNumber,
      customerName: formData.name,
      customerPhone: formData.phone,
      governorate: governorateName,
      area: areaName,
      areaId: formData.area,
      address: fullAddress,
      notes: formData.notes,
      paymentMethod: formData.paymentMethod,
      items: cartItems.map(item => ({
        productId: item.product.id,
        productNameAr: item.product.name_ar,
        productNameEn: item.product.name_en,
        quantity: item.quantity,
        unitPrice: item.product.price,
        totalPrice: item.product.price * item.quantity
      })),
      subtotal,
      deliveryFee,
      total
    };

    const newOrderId = addOrder(newOrderData);
    setOrderId(newOrderId);
    setOrderData(newOrderData);
    setSubmitted(true);
  };

  const handleSendWhatsApp = async () => {
    if (!orderData) return;

    try {
      await downloadInvoicePDF({
        orderNumber: orderData.orderNumber,
        date: new Date().toLocaleDateString('ar-SA', {
          year: 'numeric', month: 'long', day: 'numeric',
          hour: '2-digit', minute: '2-digit'
        }),
        customerName: orderData.customerName,
        customerPhone: orderData.customerPhone,
        governorate: orderData.governorate,
        area: orderData.area,
        address: orderData.address,
        notes: orderData.notes,
        paymentMethod: orderData.paymentMethod,
        items: orderData.items.map((item: any) => ({
          nameAr: item.productNameAr,
          nameEn: item.productNameEn,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice: item.totalPrice
        })),
        subtotal: orderData.subtotal,
        deliveryFee: orderData.deliveryFee,
        total: orderData.total
      });
    } catch (error) {
      console.error('PDF generation failed:', error);
    }

    const message = generateWhatsAppMessage(orderData);
    window.open(`${whatsappLink}?text=${message}`, '_blank');
    setOrderSent(true);
    clearCart();
  };

  if (cartItems.length === 0 && !submitted) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">السلة فارغة</h2>
          <p className="text-[#6B6B6B] mb-8">لم تضف أي منتجات للسلة بعد</p>
          <Link to="/products" className="inline-flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#C9A96E] text-white font-semibold px-6 py-3 rounded-xl transition-colors">
            تصفح المنتجات
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </Layout>
    );
  }

  if (submitted && orderData) {
    return (
      <Layout>
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="bg-white rounded-2xl border border-[#E8E0D5] p-8 text-center shadow-lg">
              <div className="w-20 h-20 mx-auto mb-6 bg-[#7C9A6E]/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-[#7C9A6E]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">تم استلام طلبك بنجاح!</h2>
              <p className="text-[#6B6B6B] mb-2">رقم الطلب: <strong className="text-[#C9A96E]">{orderData.orderNumber}</strong></p>
              <p className="text-[#6B6B6B] text-sm mb-6">سيتم التواصل معك قريباً لتأكيد الطلب</p>
              
              <div className="bg-[#F5F0E8] rounded-xl p-6 text-right mb-6">
                <h3 className="font-semibold text-[#1A1A1A] mb-4 text-center">ملخص الطلب:</h3>
                {orderData.items.map((item: any, index: number) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg mb-2">
                    <div className="flex-1">
                      <p className="text-[#1A1A1A] font-medium text-sm">{item.productNameAr}</p>
                      <p className="text-[#6B6B6B] text-xs">الكمية: {item.quantity}</p>
                    </div>
                    <p className="text-[#C9A96E] font-bold">{formatPrice(item.totalPrice)}</p>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-4 mt-4 border-t border-[#E8E0D5]">
                  <span className="font-bold text-[#1A1A1A]">رسوم التوصيل</span>
                  <span className="text-[#1A1A1A]">{formatPrice(orderData.deliveryFee)}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-[#E8E0D5]">
                  <span className="font-bold text-[#1A1A1A]">المجموع الكلي</span>
                  <span className="font-bold text-[#C9A96E] text-xl">{formatPrice(orderData.total)}</span>
                </div>
              </div>

              {!orderSent && (
                <button 
                  onClick={handleSendWhatsApp}
                  className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold py-4 rounded-xl text-lg transition-colors"
                >
                  <MessageCircle className="w-6 h-6" />
                  إرسال الطلب عبر واتساب
                </button>
              )}

              {orderSent && (
                <div className="mt-4 p-4 bg-green-50 rounded-xl text-green-700">
                  <p className="font-medium">تم إرسال الطلب بنجاح!</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="bg-gradient-to-b from-[#F5F0E8] to-[#FAF8F5] py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-2">إتمام الطلب</h1>
          <p className="text-[#6B6B6B]">أكمل بياناتك لإتمام طلبك</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#E8E0D5] p-6 md:p-8">
                <h2 className="text-xl font-bold text-[#1A1A1A] mb-6">البيانات الشخصية</h2>
                
                <div className="space-y-5 mb-8">
                  <div>
                    <label className="block text-[#1A1A1A] font-medium mb-2">الاسم الكامل *</label>
                    <input 
                      type="text" 
                      value={formData.name} 
                      onChange={(e) => { setFormData({ ...formData, name: e.target.value }); setErrors({ ...errors, name: '' }); }}
                      className={`w-full px-4 py-3 bg-[#FAF8F5] border ${errors.name ? 'border-red-500' : 'border-[#E8E0D5]'} rounded-xl text-[#1A1A1A] focus:outline-none focus:border-[#C9A96E]`}
                      placeholder="أدخل اسمك الكامل" 
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-[#1A1A1A] font-medium mb-2">رقم الهاتف *</label>
                    <div className="relative">
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B6B6B]">+965</span>
                      <input 
                        type="tel" 
                        value={formData.phone} 
                        onChange={(e) => { setFormData({ ...formData, phone: e.target.value }); setErrors({ ...errors, phone: '' }); }}
                        className={`w-full px-4 py-3 bg-[#FAF8F5] border ${errors.phone ? 'border-red-500' : 'border-[#E8E0D5]'} rounded-xl text-[#1A1A1A] focus:outline-none focus:border-[#C9A96E] pr-14`}
                        placeholder="رقم الهاتف" 
                        maxLength={8} 
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <h2 className="text-xl font-bold text-[#1A1A1A] mb-6">العنوان</h2>
                
                <div className="space-y-5 mb-8">
                  <div>
                    <label className="block text-[#1A1A1A] font-medium mb-2">المحافظة *</label>
                    <select 
                      value={formData.governorate} 
                      onChange={(e) => handleGovernorateChange(e.target.value)}
                      className={`w-full px-4 py-3 bg-[#FAF8F5] border ${errors.governorate ? 'border-red-500' : 'border-[#E8E0D5]'} rounded-xl text-[#1A1A1A] focus:outline-none focus:border-[#C9A96E]`}
                    >
                      <option value="">اختر المحافظة</option>
                      {kuwaitGovernorates.map(gov => (
                        <option key={gov.id} value={gov.id}>{gov.name_ar}</option>
                      ))}
                    </select>
                    {errors.governorate && <p className="text-red-500 text-sm mt-1">{errors.governorate}</p>}
                  </div>

                  <div>
                    <label className="block text-[#1A1A1A] font-medium mb-2">المنطقة *</label>
                    <div className="relative">
                      <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B6B]" />
                      <input 
                        type="text" 
                        value={areaSearch} 
                        onChange={(e) => handleAreaSearch(e.target.value)}
                        onFocus={() => setShowAreaDropdown(true)}
                        disabled={!formData.governorate}
                        placeholder={formData.governorate ? "ابحث عن منطقتك..." : "اختر المحافظة أولاً"}
                        className={`w-full px-4 py-3 bg-[#FAF8F5] border ${errors.area ? 'border-red-500' : 'border-[#E8E0D5]'} rounded-xl text-[#1A1A1A] focus:outline-none focus:border-[#C9A96E] pr-12 ${!formData.governorate && 'opacity-50 cursor-not-allowed'}`}
                      />
                      {showAreaDropdown && filteredAreas.length > 0 && (
                        <div className="absolute z-50 w-full mt-1 bg-white border border-[#E8E0D5] rounded-xl shadow-lg max-h-60 overflow-y-auto">
                          {filteredAreas.map(area => (
                            <button 
                              key={area.id} 
                              type="button" 
                              onClick={() => selectArea(area.id)}
                              className="w-full px-4 py-3 text-right hover:bg-[#FAF8F5] border-b border-[#E8E0D5] last:border-0"
                            >
                              <span className="text-[#1A1A1A]">{area.name}</span>
                              <span className="text-[#C9A96E] text-sm mr-2">{formatPrice(area.deliveryFee)}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    {selectedArea && (
                      <p className="text-sm text-[#C9A96E] mt-1">رسوم التوصيل: {formatPrice(selectedArea.deliveryFee)}</p>
                    )}
                    {errors.area && <p className="text-red-500 text-sm mt-1">{errors.area}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#1A1A1A] font-medium mb-2">القطعة *</label>
                      <input 
                        type="text" 
                        value={formData.block} 
                        onChange={(e) => { setFormData({ ...formData, block: e.target.value }); setErrors({ ...errors, block: '' }); }}
                        className={`w-full px-4 py-3 bg-[#FAF8F5] border ${errors.block ? 'border-red-500' : 'border-[#E8E0D5]'} rounded-xl text-[#1A1A1A] focus:outline-none focus:border-[#C9A96E]`}
                        placeholder="رقم القطعة" 
                      />
                      {errors.block && <p className="text-red-500 text-sm mt-1">{errors.block}</p>}
                    </div>
                    <div>
                      <label className="block text-[#1A1A1A] font-medium mb-2">الشارع *</label>
                      <input 
                        type="text" 
                        value={formData.street} 
                        onChange={(e) => { setFormData({ ...formData, street: e.target.value }); setErrors({ ...errors, street: '' }); }}
                        className={`w-full px-4 py-3 bg-[#FAF8F5] border ${errors.street ? 'border-red-500' : 'border-[#E8E0D5]'} rounded-xl text-[#1A1A1A] focus:outline-none focus:border-[#C9A96E]`}
                        placeholder="اسم الشارع" 
                      />
                      {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[#1A1A1A] font-medium mb-2">الجادة</label>
                      <input 
                        type="text" 
                        value={formData.avenue} 
                        onChange={(e) => setFormData({ ...formData, avenue: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E8E0D5] rounded-xl text-[#1A1A1A] focus:outline-none focus:border-[#C9A96E]"
                        placeholder="الجادة" 
                      />
                    </div>
                    <div>
                      <label className="block text-[#1A1A1A] font-medium mb-2">المنزل / العمارة *</label>
                      <input 
                        type="text" 
                        value={formData.house} 
                        onChange={(e) => { setFormData({ ...formData, house: e.target.value }); setErrors({ ...errors, house: '' }); }}
                        className={`w-full px-4 py-3 bg-[#FAF8F5] border ${errors.house ? 'border-red-500' : 'border-[#E8E0D5]'} rounded-xl text-[#1A1A1A] focus:outline-none focus:border-[#C9A96E]`}
                        placeholder="المنزل" 
                      />
                      {errors.house && <p className="text-red-500 text-sm mt-1">{errors.house}</p>}
                    </div>
                    <div>
                      <label className="block text-[#1A1A1A] font-medium mb-2">الدور</label>
                      <input 
                        type="text" 
                        value={formData.floor} 
                        onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E8E0D5] rounded-xl text-[#1A1A1A] focus:outline-none focus:border-[#C9A96E]"
                        placeholder="الدور" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#1A1A1A] font-medium mb-2">الشقة (اختياري)</label>
                    <input 
                      type="text" 
                      value={formData.apartment} 
                      onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E8E0D5] rounded-xl text-[#1A1A1A] focus:outline-none focus:border-[#C9A96E]"
                      placeholder="رقم الشقة" 
                    />
                  </div>

                  <div>
                    <label className="block text-[#1A1A1A] font-medium mb-2">ملاحظات (اختياري)</label>
                    <textarea 
                      value={formData.notes} 
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      rows={2}
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E8E0D5] rounded-xl text-[#1A1A1A] focus:outline-none focus:border-[#C9A96E] resize-none"
                      placeholder="أي ملاحظات خاصة بالطلب..." 
                    />
                  </div>
                </div>

                <h2 className="text-xl font-bold text-[#1A1A1A] mb-6">طريقة الدفع</h2>
                
                <div className="space-y-3 mb-6">
                  <label className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer border-2 transition-all ${formData.paymentMethod === 'cash' ? 'border-[#C9A96E] bg-[#C9A96E]/5' : 'border-[#E8E0D5] hover:border-[#C9A96E]/50'}`}>
                    <input 
                      type="radio" 
                      name="payment" 
                      value="cash" 
                      checked={formData.paymentMethod === 'cash'} 
                      onChange={() => setFormData({ ...formData, paymentMethod: 'cash' })} 
                      className="w-5 h-5 accent-[#C9A96E]" 
                    />
                    <div className="flex-1">
                      <span className="text-[#1A1A1A] font-medium">كاش عند الاستلام</span>
                      <p className="text-[#6B6B6B] text-sm">ادفع نقداً عند استلام الطلب</p>
                    </div>
                    <span className="text-2xl">💵</span>
                  </label>
                  <label className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer border-2 transition-all ${formData.paymentMethod === 'link' ? 'border-[#C9A96E] bg-[#C9A96E]/5' : 'border-[#E8E0D5] hover:border-[#C9A96E]/50'}`}>
                    <input 
                      type="radio" 
                      name="payment" 
                      value="link" 
                      checked={formData.paymentMethod === 'link'} 
                      onChange={() => setFormData({ ...formData, paymentMethod: 'link' })} 
                      className="w-5 h-5 accent-[#C9A96E]" 
                    />
                    <div className="flex-1">
                      <span className="text-[#1A1A1A] font-medium">رابط دفع إلكتروني</span>
                      <p className="text-[#6B6B6B] text-sm">سيتم إرسال رابط الدفع عبر واتساب بعد تأكيد الطلب</p>
                    </div>
                    <span className="text-2xl">💳</span>
                  </label>
                </div>

                <div className="flex items-start gap-3 p-4 bg-[#C9A96E]/10 rounded-xl">
                  <AlertCircle className="w-5 h-5 text-[#C9A96E] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-[#6B6B6B]">سيتم مراجعة طلبك والتواصل معك عبر واتساب لتأكيد الطلب</p>
                </div>

                <button 
                  type="submit" 
                  className="w-full mt-6 flex items-center justify-center gap-3 bg-[#1A1A1A] hover:bg-[#C9A96E] text-white font-bold py-4 rounded-xl transition-all text-lg"
                >
                  تأكيد الطلب
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>

            <div>
              <div className="bg-white rounded-2xl border border-[#E8E0D5] p-6 sticky top-24">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-6">ملخص الطلب</h3>
                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex gap-3 p-3 bg-[#FAF8F5] rounded-xl">
                      <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center p-1">
                        <img src={item.product.image} alt={item.product.name_ar} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[#1A1A1A] font-medium text-sm">{item.product.name_ar}</p>
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
                    <span>{selectedArea ? formatPrice(deliveryFee) : 'تُحسب لاحقاً'}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-[#E8E0D5]">
                    <span className="text-[#1A1A1A] font-bold">الإجمالي</span>
                    <span className="text-[#C9A96E] font-bold text-2xl">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}