import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useOrders } from '../contexts/OrderContext';
import Layout from '../components/Layout';
import { formatPrice, deliveryFee, kuwaitGovernorates, getAreaById } from '../data/products';
import { PersonalInfoForm, AddressForm, PaymentMethod, OrderSummary, OrderSuccess } from '../components/checkout';
import { generateFixedWhatsAppMessage, getWhatsAppLink, type InvoiceData } from '@/utils/whatsappGenerator';
import { downloadInvoicePDF } from '@/utils/pdfGenerator';
import { generateOrderNumber, getFormattedDate } from '@/utils/orderUtils';

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
  const { addOrder, markOrderSent, getOrder } = useOrders();
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: '', phone: '', governorate: '', area: '', address: '', notes: '', paymentMethod: 'cash'
  });
  const [submitted, setSubmitted] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);
  const [orderData, setOrderData] = useState<InvoiceData | null>(null);
  const [orderSent, setOrderSent] = useState(false);
  const [pdfGenerating, setPdfGenerating] = useState(false);
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
    if (!formData.name.trim()) newErrors.name = 'الرجاء إدخال الاسم';
    if (!formData.phone.trim()) newErrors.phone = 'الرجاء إدخال رقم الهاتف';
    else if (!/^[0-9]{8}$/.test(formData.phone)) newErrors.phone = 'رقم الهاتف يجب أن يكون 8 أرقام';
    if (!formData.governorate) newErrors.governorate = 'الرجاء اختيار المحافظة';
    if (!formData.area) newErrors.area = 'الرجاء اختيار المنطقة';
    if (!formData.address.trim()) newErrors.address = 'الرجاء إدخال العنوان التفصيلي';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const selectedGovernorate = kuwaitGovernorates.find(g => g.id === formData.governorate);
    
    // Create invoice data
    const invoiceData: InvoiceData = {
      orderNumber: generateOrderNumber(),
      date: getFormattedDate(),
      customerName: formData.name,
      customerPhone: formData.phone,
      governorate: selectedGovernorate?.name || formData.governorate,
      area: selectedArea?.name || formData.area,
      address: formData.address,
      notes: formData.notes,
      paymentMethod: formData.paymentMethod,
      items: cartItems.map(item => ({
        nameAr: item.product.name_ar,
        nameEn: item.product.name_en,
        quantity: item.quantity,
        unitPrice: item.product.price,
        totalPrice: item.product.price * item.quantity
      })),
      subtotal,
      deliveryFee: totalDeliveryFee,
      total
    };

    // Add order to context (generates orderNumber if not set)
    const orderId = addOrder({
      customerName: formData.name,
      customerPhone: formData.phone,
      governorate: selectedGovernorate?.name || formData.governorate,
      area: selectedArea?.name || formData.area,
      areaId: formData.area,
      address: formData.address,
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
      deliveryFee: totalDeliveryFee,
      total
    });

    // Get the actual order with generated orderNumber
    const savedOrder = getOrder(orderId);
    if (savedOrder) {
      invoiceData.orderNumber = savedOrder.orderNumber;
    }

    setCurrentOrderId(orderId);
    setOrderData(invoiceData);
    setSubmitted(true);
  };

  // This function sends the fixed WhatsApp message - customer cannot edit
  const handleSendToWhatsApp = async () => {
    if (!orderData) return;
    
    setPdfGenerating(true);
    try {
      // Download PDF with NAFAES branding
      await downloadInvoicePDF(orderData);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
    setPdfGenerating(false);
    
    // Generate FIXED message - customer cannot edit this
    const fixedMessage = generateFixedWhatsAppMessage(orderData);
    
    // Open WhatsApp with the FIXED message (customer cannot edit)
    window.open(getWhatsAppLink(fixedMessage), '_blank');
    
    // Mark order as sent
    if (currentOrderId) {
      markOrderSent(currentOrderId);
    }
    
    // Clear cart after sending
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

  if (submitted && orderData) {
    return (
      <Layout>
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-2xl">
            {!orderSent ? (
              <>
                <OrderSuccess orderData={orderData} />
                <button 
                  onClick={handleSendToWhatsApp}
                  disabled={pdfGenerating}
                  className="w-full mt-6 flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold py-4 rounded-xl text-lg transition-colors disabled:opacity-50"
                >
                  {pdfGenerating ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      جاري إنشاء الفاتورة...
                    </>
                  ) : (
                    <>
                      <Download className="w-6 h-6" />
                      تأكيد الطلب + تحميل فاتورة PDF
                    </>
                  )}
                </button>
              </>
            ) : (
              <div className="bg-white rounded-2xl border border-[#E8E0D5] p-8 text-center shadow-lg">
                <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-4xl">✅</span>
                </div>
                <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">تم إرسال طلبك بنجاح!</h2>
                <p className="text-[#6B6B6B] mb-2">رقم الطلب: <strong className="text-[#C9A96E]">{orderData.orderNumber}</strong></p>
                <p className="text-[#6B6B6B] mb-6">سيتم التواصل معك قريباً لتأكيد الطلب</p>
                <Link to="/" className="inline-flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#C9A96E] text-white font-semibold px-6 py-3 rounded-xl transition-colors">
                  العودة للرئيسية
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            )}
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

                <button 
                  type="submit" 
                  className="w-full mt-6 flex items-center justify-center gap-3 bg-[#1A1A1A] hover:bg-[#C9A96E] text-white font-bold py-4 rounded-xl transition-all text-lg"
                >
                  تأكيد البيانات
                  <ArrowRight className="w-5 h-5" />
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