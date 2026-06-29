import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import Layout from '../components/Layout';
import { formatPrice, deliveryFee, kuwaitGovernorates, getAreaById } from '../data/products';
import { PersonalInfoForm, AddressForm, PaymentMethod, OrderSummary } from '@/components/checkout';
import { createOrder, getFormattedDate } from '@/lib/db-operations';
import { downloadInvoicePDF } from '@/utils/pdfGenerator';
import { validateKuwaitiPhone, generateFixedWhatsAppMessage, getWhatsAppLink, type InvoiceData } from '@/utils/whatsappGenerator';
import { toast } from 'sonner';

interface CheckoutFormData {
  name: string;
  phone: string;
  governorate: string;
  area: string;
  address: string;
  notes: string;
  paymentMethod: 'cash' | 'link';
}

export default function Checkout() {
  const { cartItems, clearCart, cartTotal } = useStore();
  
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: '', phone: '', governorate: '', area: '', address: '', notes: '', paymentMethod: 'cash'
  });
  const [submitted, setSubmitted] = useState(false);
  const [orderData, setOrderData] = useState<InvoiceData | null>(null);
  const [orderNumber, setOrderNumber] = useState('');
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const subtotal = cartTotal();
  const selectedArea = getAreaById(formData.area);
  const totalDeliveryFee = selectedArea?.delivery || deliveryFee;
  const total = subtotal + totalDeliveryFee;

  const handleNameChange = (value: string) => setFormData(prev => ({ ...prev, name: value }));
  const handlePhoneChange = (value: string) => setFormData(prev => ({ ...prev, phone: value }));
  const handleGovernorateChange = (value: string) => setFormData(prev => ({ ...prev, governorate: value, area: '' }));
  const handleAreaChange = (value: string) => setFormData(prev => ({ ...prev, area: value }));
  const handleAddressChange = (value: string) => setFormData(prev => ({ ...prev, address: value }));
  const handleNotesChange = (value: string) => setFormData(prev => ({ ...prev, notes: value }));
  const handlePaymentChange = (value: 'cash' | 'link') => setFormData(prev => ({ ...prev, paymentMethod: value }));
  const handleClearError = (field: string) => setErrors(prev => ({ ...prev, [field]: '' }));

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'الرجاء إدخال الاسم';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'الاسم يجب أن يكون 3 أحرف على الأقل';
    }
    
    // Use enhanced phone validation
    const phoneResult = validateKuwaitiPhone(formData.phone);
    if (!phoneResult.valid) {
      newErrors.phone = phoneResult.error || 'رقم الهاتف غير صحيح';
    }
    
    if (!formData.governorate) newErrors.governorate = 'الرجاء اختيار المحافظة';
    if (!formData.area) newErrors.area = 'الرجاء اختيار المنطقة';
    
    if (!formData.address.trim()) {
      newErrors.address = 'الرجاء إدخال العنوان التفصيلي';
    } else if (formData.address.trim().length < 10) {
      newErrors.address = 'العنوان قصير جداً. أدخل العنوان كاملاً (القطعة، الشارع، رقم المبنى)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSending(true);

    try {
      const selectedGovernorate = kuwaitGovernorates.find(g => g.id === formData.governorate);
      const dateStr = getFormattedDate();

      // Prepare order data
      const orderInput = {
        customer_name: formData.name.trim(),
        customer_phone: formData.phone.trim(),
        governorate: selectedGovernorate?.name || formData.governorate,
        area: selectedArea?.name || formData.area,
        area_id: formData.area,
        address: formData.address.trim(),
        notes: formData.notes.trim(),
        payment_method: formData.paymentMethod,
        subtotal,
        delivery_fee: totalDeliveryFee,
        total,
      };

      // Prepare items
      const items = cartItems.map(item => ({
        product_id: item.product.cartKey || item.product.id,
        product_name_ar: item.product.variantLabel ? `${item.product.name_ar} - ${item.product.variantLabel}` : item.product.name_ar,
        product_name_en: item.product.variantLabel ? `${item.product.name_en} - ${item.product.variantLabel}` : item.product.name_en,
        quantity: item.quantity,
        unit_price: item.product.price,
        total_price: item.product.price * item.quantity,
      }));

      // Create order in Supabase
      const result = await createOrder(orderInput, items);

      // Generate order number
      const newOrderNumber = result.order_number || `NAF-${Date.now()}`;

      // Create invoice data
      const invoiceData: InvoiceData = {
        orderNumber: newOrderNumber,
        date: dateStr,
        customerName: formData.name.trim(),
        customerPhone: formData.phone.trim(),
        governorate: selectedGovernorate?.name || formData.governorate,
        area: selectedArea?.name || formData.area,
        address: formData.address.trim(),
        notes: formData.notes.trim(),
        paymentMethod: formData.paymentMethod,
        items: cartItems.map(item => ({
          nameAr: item.product.variantLabel ? `${item.product.name_ar} - ${item.product.variantLabel}` : item.product.name_ar,
          nameEn: item.product.variantLabel ? `${item.product.name_en} - ${item.product.variantLabel}` : item.product.name_en,
          variantLabel: item.product.variantLabel,
          quantity: item.quantity,
          unitPrice: item.product.price,
          totalPrice: item.product.price * item.quantity
        })),
        subtotal,
        deliveryFee: totalDeliveryFee,
        total
      };

      setOrderData(invoiceData);
      setOrderNumber(newOrderNumber);
      setSubmitted(true);

      // Generate and download PDF
      try {
        await downloadInvoicePDF(invoiceData);
        console.log('📄 PDF downloaded');
      } catch (pdfError) {
        console.error('PDF error:', pdfError);
      }

      // Send WhatsApp message
      try {
        const whatsappMessage = generateFixedWhatsAppMessage(invoiceData);
        const whatsappUrl = getWhatsAppLink(whatsappMessage);
        window.open(whatsappUrl, '_blank');
        console.log('📱 WhatsApp opened');
      } catch (waError) {
        console.error('WhatsApp error:', waError);
      }

      toast.success('✅ تم إرسال الطلب بنجاح!\nرقم الطلب: ' + newOrderNumber);

      // Clear cart
      clearCart();

    } catch (error) {
      console.error('Error submitting order:', error);
      toast.error('حدث خطأ أثناء إرسال الطلب. حاول مرة أخرى.');
    }

    setSending(false);
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
              
              {/* Success Icon */}
              <div className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
              
              <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">🎉 تم استلام طلبك بنجاح!</h2>
              
              {/* Order Number */}
              <div className="bg-gradient-to-r from-[#C9A96E] to-[#D4AF37] text-white rounded-xl p-6 mb-6">
                <p className="text-sm opacity-90 mb-1">رقم الطلب الخاص بك</p>
                <p className="text-4xl font-bold tracking-wider">{orderNumber}</p>
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
                <p className="text-sm">
                  <strong>الدفع:</strong> {orderData.paymentMethod === 'cash' ? '💵 كاش عند الاستلام' : '💳 رابط دفع'}
                </p>
              </div>
              
              {/* Notice */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                <p className="text-green-700 text-sm">
                  ✅ <strong>تم إرسال الطلب والفاتورة إليك عبر واتساب!</strong>
                </p>
                <p className="text-green-600 text-xs mt-1">
                  سيتم التواصل معك قريباً لتأكيد الطلب
                </p>
              </div>
              
              {/* Download PDF Button */}
              <button 
                onClick={() => downloadInvoicePDF(orderData)}
                className="w-full flex items-center justify-center gap-3 bg-[#C9A96E] hover:bg-[#D4AF37] text-white font-bold py-4 rounded-xl transition-colors mb-4"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                📄 تحميل فاتورة PDF
              </button>
              
              {/* Back to Home */}
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 mt-4 text-[#C9A96E] hover:text-[#1A1A1A] font-medium transition-colors"
              >
                <ArrowRight className="w-5 h-5" />
                العودة للرئيسية
              </Link>
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
          <p className="text-[#6B6B6B]">أكمل بياناتك سيتم إرسال الطلب إلينا تلقائياً</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#E8E0D5] p-6 md:p-8">
                <PersonalInfoForm
                  name={formData.name}
                  phone={formData.phone}
                  errors={errors}
                  onNameChange={handleNameChange}
                  onPhoneChange={handlePhoneChange}
                  onClearError={handleClearError}
                />

                <AddressForm
                  governorate={formData.governorate}
                  area={formData.area}
                  address={formData.address}
                  notes={formData.notes}
                  errors={errors}
                  onGovernorateChange={handleGovernorateChange}
                  onAreaChange={handleAreaChange}
                  onAddressChange={handleAddressChange}
                  onNotesChange={handleNotesChange}
                  onClearError={handleClearError}
                />

                <PaymentMethod
                  paymentMethod={formData.paymentMethod}
                  onPaymentChange={handlePaymentChange}
                />

                {/* Notice */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                  <p className="text-green-700 text-sm text-center">
                    ✨ بمجرد تأكيد الطلب، سيتم إرسال الفاتورة PDF إليك فوراً مع إشعار لنا عبر واتساب
                  </p>
                </div>

                <button 
                  type="submit" 
                  disabled={sending}
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#25D366] to-[#20BD5A] hover:opacity-90 text-white font-bold py-4 rounded-xl transition-all text-lg disabled:opacity-50"
                >
                  {sending ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      جاري إرسال الطلب...
                    </>
                  ) : (
                    <>
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      تأكيد وإرسال الطلب
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>

            <div>
              <OrderSummary
                cartItems={cartItems}
                subtotal={subtotal}
                deliveryFee={totalDeliveryFee}
                total={total}
                selectedAreaId={formData.area}
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
