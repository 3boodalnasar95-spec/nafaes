import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Check, X, MessageCircle, Package, MapPin, Phone, User, Clock } from 'lucide-react';
import AdminLayout from './AdminLayout';
import { getOrder, updateOrderStatus, updateOrderPaymentStatus, formatPrice } from '@/lib/db-operations';

export default function AdminOrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) loadOrder(id);
  }, [id]);

  const loadOrder = async (orderId: string) => {
    setLoading(true);
    const data = await getOrder(orderId);
    setOrder(data);
    setLoading(false);
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!id) return;
    await updateOrderStatus(id, newStatus as any);
    loadOrder(id);
  };

  const handlePaymentStatusChange = async (paymentStatus: 'pending' | 'paid') => {
    if (!id || !order) return;
    await updateOrderPaymentStatus(id, paymentStatus, paymentStatus === 'paid' ? order.total : 0);
    loadOrder(id);
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { label: string; color: string }> = {
      pending: { label: 'معلق', color: 'bg-yellow-100 text-yellow-700' },
      confirmed: { label: 'تم التأكيد', color: 'bg-blue-100 text-blue-700' },
      preparing: { label: 'قيد التجهيز', color: 'bg-purple-100 text-purple-700' },
      ready: { label: 'جاهز', color: 'bg-indigo-100 text-indigo-700' },
      shipped: { label: 'تم الشحن', color: 'bg-cyan-100 text-cyan-700' },
      delivered: { label: 'تم التوصيل', color: 'bg-green-100 text-green-700' },
      cancelled: { label: 'ملغي', color: 'bg-red-100 text-red-700' },
      refunded: { label: 'مرتجع', color: 'bg-gray-100 text-gray-700' },
    };
    return badges[status] || { label: status, color: 'bg-gray-100 text-gray-700' };
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-20">
          <div className="text-[#6B6B6B]">جاري التحميل...</div>
        </div>
      </AdminLayout>
    );
  }

  if (!order) {
    return (
      <AdminLayout>
        <div className="text-center py-20">
          <p className="text-[#6B6B6B]">الطلب غير موجود</p>
          <Link to="/admin/orders" className="text-[#C9A96E] hover:text-[#D4AF37] mt-4 inline-block">
            العودة للطلبات
          </Link>
        </div>
      </AdminLayout>
    );
  }

  const badge = getStatusBadge(order.status);
  const statusFlow = ['pending', 'confirmed', 'preparing', 'shipped', 'delivered'];
  const statusLabels: Record<string, string> = {
    pending: 'معلق', confirmed: 'تأكيد', preparing: 'تجهيز', shipped: 'شحن', delivered: 'توصيل',
  };
  const currentStatusIndex = statusFlow.indexOf(order.status);

  return (
    <AdminLayout>
      <div className="mb-6">
        <Link to="/admin/orders" className="text-[#6B6B6B] hover:text-[#C9A96E] text-sm mb-2 inline-flex items-center gap-1">
          <ArrowRight className="w-4 h-4" />
          العودة للطلبات
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#1A1A1A]">{order.order_number}</h2>
            <div className="flex items-center gap-2 text-[#6B6B6B] text-sm mt-1">
              <Clock className="w-4 h-4" />
              <span>{new Date(order.created_at).toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
           <span className={`px-4 py-2 rounded-full text-sm font-medium ${badge.color}`}>{badge.label}</span>
           <span className={`px-4 py-2 rounded-full text-sm font-medium ${order.payment_status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
             {order.payment_status === 'paid' ? 'مدفوع' : 'غير مدفوع'}
           </span>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-[#E8E0D5] p-6">
            <h3 className="font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-[#C9A96E]" />
              المنتجات ({(order.order_items || []).length})
            </h3>
            <div className="space-y-4">
              {(order.order_items || []).map((item: any, i: number) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-[#FAF8F5] rounded-lg">
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                    <Package className="w-8 h-8 text-[#C9A96E]" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-[#1A1A1A]">{item.product_name_ar}</p>
                    <p className="text-sm text-[#6B6B6B]">{item.product_name_en}</p>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-[#1A1A1A]">{item.quantity} × {item.unit_price?.toFixed(3)} د.ك</p>
                    <p className="text-[#C9A96E] font-bold">{item.total_price?.toFixed(3)} د.ك</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-[#E8E0D5] space-y-2">
              <div className="flex justify-between text-[#6B6B6B]">
                <span>المجموع الفرعي</span>
                <span>{order.subtotal?.toFixed(3)} د.ك</span>
              </div>
              <div className="flex justify-between text-[#6B6B6B]">
                <span>رسوم التوصيل</span>
                <span>{order.delivery_fee?.toFixed(3)} د.ك</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-[#E8E0D5]">
                <span className="font-bold text-[#1A1A1A]">الإجمالي</span>
                <span className="text-2xl font-bold text-[#C9A96E]">{order.total?.toFixed(3)} د.ك</span>
              </div>
            </div>
          </div>

          {/* Status Timeline */}
          {order.status !== 'cancelled' && (
            <div className="bg-white rounded-xl border border-[#E8E0D5] p-6">
              <h3 className="font-bold text-[#1A1A1A] mb-4">تتبع حالة الطلب</h3>
              <div className="flex items-center justify-between">
                {statusFlow.map((status, index) => {
                  const isActive = index <= currentStatusIndex;
                  const isCurrent = status === order.status;
                  return (
                    <div key={status} className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isActive ? 'bg-[#C9A96E] text-white' : 'bg-[#E8E0D5] text-[#6B6B6B]'} ${isCurrent ? 'ring-4 ring-[#C9A96E]/30' : ''}`}>
                        {isActive ? <Check className="w-5 h-5" /> : <span>{index + 1}</span>}
                      </div>
                      <span className={`text-xs mt-2 ${isActive ? 'text-[#C9A96E]' : 'text-[#6B6B6B]'}`}>{statusLabels[status]}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Customer & Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-[#E8E0D5] p-6">
            <h3 className="font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-[#C9A96E]" />
              بيانات العميل
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#1A1A1A]">
                <span className="font-medium">{order.customer_name || 'غير متوفر'}</span>
              </div>
              {order.customer_phone && (
                <div className="flex items-center gap-2 text-[#6B6B6B]">
                  <Phone className="w-4 h-4" />
                  <span dir="ltr">+965 {order.customer_phone}</span>
                </div>
              )}
              {(order.area || order.governorate) && (
                <div className="flex items-start gap-2 text-[#6B6B6B]">
                  <MapPin className="w-4 h-4 mt-1" />
                  <div>
                    <p>{order.area}</p>
                    <p className="text-sm">{order.address}</p>
                  </div>
                </div>
              )}
            </div>
            {order.customer_phone && (
              <a href={`https://wa.me/965${order.customer_phone}`} target="_blank" rel="noopener noreferrer" className="mt-4 w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white py-3 rounded-lg transition-colors">
                <MessageCircle className="w-5 h-5" />
                مراسلة عبر واتساب
              </a>
            )}
          </div>

          <div className="bg-white rounded-xl border border-[#E8E0D5] p-6">
            <h3 className="font-bold text-[#1A1A1A] mb-4">إجراءات</h3>
            <div className="space-y-2">
              {order.status === 'pending' && (
                <>
                  <button onClick={() => handleStatusChange('confirmed')} className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition-colors">
                    <Check className="w-5 h-5" /> تأكيد الطلب
                  </button>
                  <button onClick={() => handleStatusChange('cancelled')} className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg transition-colors">
                    <X className="w-5 h-5" /> إلغاء الطلب
                  </button>
                </>
              )}
              {order.status === 'confirmed' && (
                <button onClick={() => handleStatusChange('preparing')} className="w-full flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg transition-colors">
                  <Check className="w-5 h-5" /> بدء التجهيز
                </button>
              )}
              {order.status === 'preparing' && (
                <button onClick={() => handleStatusChange('shipped')} className="w-full flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg transition-colors">
                  <Check className="w-5 h-5" /> شحن الطلب
                </button>
              )}
              {order.status === 'shipped' && (
                <button onClick={() => handleStatusChange('delivered')} className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg transition-colors">
                  <Check className="w-5 h-5" /> تأكيد التوصيل
                </button>
              )}
              {order.payment_status === 'paid' ? (
                <button onClick={() => handlePaymentStatusChange('pending')} className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 py-3 rounded-lg transition-colors">
                  <X className="w-5 h-5" /> تحديد كغير مدفوع
                </button>
              ) : (
                <button onClick={() => handlePaymentStatusChange('paid')} className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg transition-colors">
                  <Check className="w-5 h-5" /> تم الدفع
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
