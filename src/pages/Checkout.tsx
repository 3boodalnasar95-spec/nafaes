"use client";

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, MessageCircle, AlertCircle, ArrowRight, Search, MapPin } from 'lucide-react';
import { useStore } from '../store/useStore';
import Layout from '../components/Layout';
import { formatPrice, deliveryFee, whatsappLink, generateWhatsAppMessage, kuwaitGovernorates, kuwaitAreas, getAreasByGovernorate, getAreaById, type KuwaitArea, type Order } from '../data/products';

export default function Checkout() {
  const { cartItems, clearCart, cartTotal } = useStore();
  const [formData, setFormData] = useState<Order>({
    name: '',
    phone: '',
    area: '',
    address: '',
    notes: '',
    paymentMethod: 'cash',
  });
  const [governorate, setGovernorate] = useState('');
  const [filteredAreas, setFilteredAreas] = useState<KuwaitArea[]>([]);
  const [areaSearch, setAreaSearch] = useState('');
  const [showAreaDropdown, setShowAreaDropdown] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [orderSent, setOrderSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const subtotal = cartTotal();
  const selectedArea = getAreaById(formData.area);
  const totalDeliveryFee = selectedArea?.deliveryFee || deliveryFee;
  const total = subtotal + totalDeliveryFee;

  useEffect(() => {
    if (governorate) {
      setFilteredAreas(getAreasByGovernorate(governorate));
      setFormData(prev => ({ ...prev, area: '' }));
    }
  }, [governorate]);

  useEffect(() => {
    if (areaSearch && governorate) {
      const areas = getAreasByGovernorate(governorate);
      setFilteredAreas(areas.filter(a => a.name.toLowerCase().includes(areaSearch.toLowerCase())));
    } else if (governorate) {
      setFilteredAreas(getAreasByGovernorate(governorate));
    }
  }, [areaSearch, governorate]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'الرجاء إدخال الاسم';
    if (!formData.phone.trim()) newErrors.phone = 'الرجاء إدخال رقم الهاتف';
    else if (!/^[0-9]{8}$/.test(formData.phone)) newErrors.phone = 'رقم الهاتف يجب أن يكون 8 أرقام';
    if (!governorate) newErrors.governorate = 'الرجاء اختيار المحافظة';
    if (!formData.area) newErrors.area = 'الرجاء اختيار المنطقة';
    if (!formData.address.trim()) newErrors.address = 'الرجاء إدخال العنوان التفصيلي';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
      const now = new Date();
      const invNum = `INV-${now.getFullYear().toString().slice(-2)}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}-${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}`;
      setInvoiceNumber(invNum);
    }
  };

  const sendToWhatsApp = () => {
    const message = generateWhatsAppMessage(cartItems, { ...formData, governorate }, invoiceNumber);
    window.open(`${whatsappLink}?text=${message}`, '_blank');
    clearCart();
    setOrderSent(true);
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

  if (submitted) {
    return (
      <Layout>
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="bg-white rounded-2xl border border-[#E8E0D5] p-8 text-center shadow-lg">
              <div className="w-20 h-20 mx-auto mb-6 bg-[#7C9A6E]/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-[#7C9A6E]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">تم استلام طلبك بنجاح!</h2>
              <p className="text-[#6B6B6B] mb-2">رقم الطلب: <strong className="text-[#C9A96E]">{invoiceNumber}</strong></p>
              <p className="text-[#6B6B6B] text-sm mb-6">سيتم التواصل معك قريباً لتأكيد الطلب</p>
              
              <div className="bg-[#F5F0E8] rounded-xl p-6 text-right mb-6">
                <h3 className="font-semibold text-[#1A1A1A] mb-4 text-center">ملخص الطلب:</h3>
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3 p-3 bg-white rounded-lg mb-2">
                    <div className="w-14 h-14 bg-[#F5F0E8] rounded-lg flex items-center justify-center overflow-hidden p-1">
                      <img src={item.product.image} alt={item.product.name_ar} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[#1A1A1A] font-medium text-sm">{item.product.name_ar}</p>
                      <p className="text-[#6B6B6B] text-xs">الكمية: {item.quantity}</p>
                    </div>
                    <p className="text-[#C9A96E] font-bold">{formatPrice(item.product.price * item.quantity)}</p>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-4 mt-4 border-t border-[#E8E0D5]">
                  <span className="font-bold text-[#1A1A1A]">المجموع الكلي</span>
                  <span className="font-bold text-[#C9A96E] text-xl">{formatPrice(total)}</span>
                </div>
              </div>

              {!orderSent && (
                <button onClick={sendToWhatsApp} className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold py-4 rounded-xl text-lg">
                  <MessageCircle className="w-6 h-6" />
                  تأكيد عبر واتساب
                </button>
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
                <h2 className="text-xl font-bold text-[#1A1A1A] mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-[#C9A96E] text-white rounded-full flex items-center justify-center text-sm">1</span>
                  البيانات الشخصية
                </h2>

                <div className="space-y-5 mb-8">
                  <div>
                    <label className="block text-[#1A1A1A] font-medium mb-2">الاسم الكامل</label>
                    <input type="text" value={formData.name} onChange={(e) => { setFormData({ ...formData, name: e.target.value }); setErrors({ ...errors, name: '' }); }}
                      className={`w-full px-4 py-3 bg-[#FAF8F5] border ${errors.name ? 'border-red-500' : 'border-[#E8E0D5]'} rounded-xl text-[#1A1A1A] focus:outline-none focus:border-[#C9A96E]`}
                      placeholder="أدخل اسمك الكامل" />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-[#1A1A1A] font-medium mb-2">رقم الهاتف</label>
                    <div className="relative">
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B6B6B]">+965</span>
                      <input type="tel" value={formData.phone} onChange={(e) => { setFormData({ ...formData, phone: e.target.value }); setErrors({ ...errors, phone: '' }); }}
                        className={`w-full px-4 py-3 bg-[#FAF8F5] border ${errors.phone ? 'border-red-500' : 'border-[#E8E0D5]'} rounded-xl text-[#1A1A1A] focus:outline-none focus:border-[#C9A96E] pr-12`}
                        placeholder="رقم الهاتف" maxLength={8} />
                    </div>
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <h2 className="text-xl font-bold text-[#1A1A1A] mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-[#C9A96E] text-white rounded-full flex items-center justify-center text-sm">2</span>
                  عنوان التوصيل
                </h2>

                <div className="space-y-5 mb-8">
                  <div>
                    <label className="block text-[#1A1A1A] font-medium mb-2">
                      <MapPin className="w-4 h-4 inline-block ml-1" />
                      المحافظة *
                    </label>
                    <select value={governorate} onChange={(e) => { setGovernorate(e.target.value); setErrors({ ...errors, governorate: '' }); }}
                      className={`w-full px-4 py-3 bg-[#FAF8F5] border ${errors.governorate ? 'border-red-500' : 'border-[#E8E0D5]'} rounded-xl text-[#1A1A1A] focus:outline-none focus:border-[#C9A96E]`}>
                      <option value="">اختر المحافظة</option>
                      {kuwaitGovernorates.map(gov => (
                        <option key={gov.id} value={gov.id}>{gov.name}</option>
                      ))}
                    </select>
                    {errors.governorate && <p className="text-red-500 text-sm mt-1">{errors.governorate}</p>}
                  </div>

                  <div className="relative">
                    <label className="block text-[#1A1A1A] font-medium mb-2">
                      <Search className="w-4 h-4 inline-block ml-1" />
                      المنطقة *
                    </label>
                    <input type="text" value={areaSearch || (selectedArea?.name || '')}
                      onChange={(e) => { setAreaSearch(e.target.value); setShowAreaDropdown(true); setFormData(prev => ({ ...prev, area: '' })); setErrors({ ...errors, area: '' }); }}
                      onFocus={() => setShowAreaDropdown(true)}
                      disabled={!governorate}
                      placeholder={governorate ? "ابحث عن منطقتك..." : "اختر المحافظة أولاً"}
                      className={`w-full px-4 py-3 bg-[#FAF8F5] border ${errors.area ? 'border-red-500' : 'border-[#E8E0D5]'} rounded-xl text-[#1A1A1A] focus:outline-none focus:border-[#C9A96E] ${!governorate && 'opacity-50 cursor-not-allowed'}`}
                    />
                    {selectedArea && (
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C9A96E] text-sm">
                        {formatPrice(selectedArea.deliveryFee)} توصيل
                      </span>
                    )}
                    
                    {showAreaDropdown && governorate && filteredAreas.length > 0 && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-[#E8E0D5] rounded-xl shadow-lg max-h-60 overflow-y-auto">
                        {filteredAreas.map(area => (
                          <button key={area.id} type="button" onClick={() => {
                            setFormData(prev => ({ ...prev, area: area.id }));
                            setAreaSearch('');
                            setShowAreaDropdown(false);
                            setErrors({ ...errors, area: '' });
                          }}
                            className="w-full px-4 py-3 text-right hover:bg-[#FAF8F5] border-b border-[#E8E0D5] last:border-0">
                            <span className="text-[#1A1A1A]">{area.name}</span>
                            <span className="text-[#C9A96E] text-sm mr-2">{formatPrice(area.deliveryFee)}</span>
                          </button>
                        ))}
                      </div>
                    )}
                    {errors.area && <p className="text-red-500 text-sm mt-1">{errors.area}</p>}
                  </div>

                  <div>
                    <label className="block text-[#1A1A1A] font-medium mb-2">العنوان بالتفصيل *</label>
                    <textarea value={formData.address} onChange={(e) => { setFormData({ ...formData, address: e.target.value }); setErrors({ ...errors, address: '' }); }}
                      rows={3}
                      className={`w-full px-4 py-3 bg-[#FAF8F5] border ${errors.address ? 'border-red-500' : 'border-[#E8E0D5]'} rounded-xl text-[#1A1A1A] focus:outline-none focus:border-[#C9A96E] resize-none`}
                      placeholder="القطعة، الشارع، رقم المبنى..." />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                  </div>

                  <div>
                    <label className="block text-[#1A1A1A] font-medium mb-2">ملاحظات (اختياري)</label>
                    <textarea value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      rows={2}
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E8E0D5] rounded-xl text-[#1A1A1A] focus:outline-none focus:border-[#C9A96E] resize-none"
                      placeholder="أي ملاحظات خاصة بالطلب..." />
                  </div>
                </div>

                <h2 className="text-xl font-bold text-[#1A1A1A] mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-[#C9A96E] text-white rounded-full flex items-center justify-center text-sm">3</span>
                  طريقة الدفع
                </h2>

                <div className="space-y-3 mb-6">
                  <label className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer border-2 transition-all ${formData.paymentMethod === 'cash' ? 'border-[#C9A96E] bg-[#C9A96E]/5' : 'border-[#E8E0D5] hover:border-[#C9A96E]/50'}`}>
                    <input type="radio" name="payment" value="cash" checked={formData.paymentMethod === 'cash'} onChange={() => setFormData({ ...formData, paymentMethod: 'cash' })} className="w-5 h-5 accent-[#C9A96E]" />
                    <div className="flex-1">
                      <span className="text-[#1A1A1A] font-medium">كاش عند الاستلام</span>
                      <p className="text-[#6B6B6B] text-sm">ادفع نقداً عند استلام الطلب</p>
                    </div>
                    <span className="text-2xl">💵</span>
                  </label>
                  <label className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer border-2 transition-all ${formData.paymentMethod === 'link' ? 'border-[#C9A96E] bg-[#C9A96E]/5' : 'border-[#E8E0D5] hover:border-[#C9A96E]/50'}`}>
                    <input type="radio" name="payment" value="link" checked={formData.paymentMethod === 'link'} onChange={() => setFormData({ ...formData, paymentMethod: 'link' })} className="w-5 h-5 accent-[#C9A96E]" />
                    <div className="flex-1">
                      <span className="text-[#1A1A1A] font-medium">رابط دفع</span>
                      <p className="text-[#6B6B6B] text-sm">ادفع عبر رابط إلكتروني</p>
                    </div>
                    <span className="text-2xl">💳</span>
                  </label>
                </div>

                <div className="flex items-start gap-3 p-4 bg-[#C9A96E]/10 rounded-xl">
                  <AlertCircle className="w-5 h-5 text-[#C9A96E] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-[#6B6B6B]">سيتم مراجعة طلبك والتواصل معك عبر واتساب لتأكيد الطلب</p>
                </div>

                <button type="submit" className="w-full mt-6 flex items-center justify-center gap-3 bg-[#1A1A1A] hover:bg-[#C9A96E] text-white font-bold py-4 rounded-xl transition-all text-lg">
                  تأكيد البيانات
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
                      <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center overflow-hidden p-1">
                        <img src={item.product.image} alt={item.product.name_ar} className="w-full h-full object-contain"
                          onError={(e) => { (e.target as HTMLImageElement).src = `https://via.placeholder.com/100x100/F5F0E8/C9A96E?text=${encodeURIComponent(item.product.name_en)}`; }} />
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
                    <span>{formatPrice(totalDeliveryFee)}</span>
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