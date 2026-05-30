import React, { useState, useEffect, useCallback } from 'react';
import { Search, Check, X, MessageCircle, Download, Package, Phone, MapPin } from 'lucide-react';
import { getOrders, updateOrderStatus, formatPrice } from '@/lib/db-operations';
import { downloadInvoicePDF } from '@/utils/pdfGenerator';
import { toast } from 'sonner';
import AdminLayout from './AdminLayout';

interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name_ar: string;
  product_name_en: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  governorate: string;
  area: string;
  area_id: string;
  address: string;
  notes: string;
  payment_method: 'cash' | 'link';
  subtotal: number;
  delivery_fee: number;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'shipped' | 'delivered' | 'cancelled';
  source: string;
  created_at: string;
  updated_at: string;
  order_items?: OrderItem[];
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const loadOrders = useCallback(async () => {
    const data = await getOrders();
    setOrders(data);
  }, []);

  useEffect(() => {
    loadOrders();

    // Poll for updates every 5 seconds
    const interval = setInterval(loadOrders, 5000);
    return () => clearInterval(interval);
  }, [loadOrders]);

  const handleUpdateStatus = async (orderId: string, status: Order['status']) => {
    const success = await updateOrderStatus(orderId, status);
    if (success) {
      toast.success(`تم تحديث حالة الطلب`);
      loadOrders();
    } else {
      toast.error('حدث خطأ أثناء تحديث الحالة');
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.order_number.includes(search) ||
      order.customer_name.includes(search) ||
      order.customer_phone.includes(search);
    
    if (statusFilter === 'all') return matchesSearch;
    return matchesSearch && order.status === statusFilter;
  });

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { label: string; color: string }> = {
      pending: { label: 'معلق', color: 'bg-yellow-100 text-yellow-700' },
      confirmed: { label: 'مؤكد', color: 'bg-blue-100 text-blue-700' },
      preparing: { label: 'قيد التجهيز', color: 'bg-purple-100 text-purple-700' },
      shipped: { label: 'تم الشحن', color: 'bg-cyan-100 text-cyan-700' },
      delivered: { label: 'تم التوصيل', color: 'bg-green-100 text-green-700' },
      cancelled: { label: 'ملغي', color: 'bg-red-100 text-red-700' },
    };
    return badges[status] || { label: status, color: 'bg-gray-100 text-gray-700' };
  };

  const handleDownloadPDF = async (order: Order) => {
    const invoiceData = {
      orderNumber: order.order_number,
      date: new Date(order.created_at).toLocaleDateString('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      customerName: order.customer_name,
      customerPhone: order.customer_phone,
      governorate: order.governorate,
      area: order.area,
      address: order.address,
      notes: order.notes,
      paymentMethod: order.payment_method,
      items: (order.order_items || []).map(item => ({
        nameAr: item.product_name_ar,
        nameEn: item.product_name_en,
        quantity: item.quantity,
        unitPrice: item.unit_price,
        totalPrice: item.total_price
      })),
      subtotal: order.subtotal,
      deliveryFee: order.delivery_fee,
      total: order.total
    };
    
    await downloadInvoicePDF(invoiceData);
    toast.success('تم تحميل الفاتورة');
  };

  const sendWhatsApp = (order: Order) => {
    const itemsList = (order.order_items || []).map((item, index) => 
      `${index + 1}. ${item.product_name_ar} - الكمية: ${item.quantity} - السعر: ${item.total_price.toFixed(3)} د.ك`
    ).join('\n');

    const message = `🏪 NAFAES | نفائس - طلب جديد

━━━━━━━━━━━━━━━━━━━━━━
📋 بيانات الطلب:
━━━━━━━━━━━━━━━━━━━━━━
🔢 رقم الطلب: ${order.order_number}
📅 التاريخ: ${new Date(order.created_at).toLocaleDateString('ar-SA')}
💰 الإجمالي: ${order.total.toFixed(3)} د.ك

━━━━━━━━━━━━━━━━━━━━━━
👤 بيانات العميل:
━━━━━━━━━━━━━━━━━━━━━━
👤 الاسم: ${order.customer_name}
📞 الهاتف: +965 ${order.customer_phone}
📍 المحافظة: ${order.governorate}
📍 المنطقة: ${order.area}
🏠 العنوان: ${order.address}
${order.notes ? `📝 ملاحظات: ${order.notes}` : ''}

━━━━━━━━━━━━━━━━━━━━━━
🛒 المنتجات:
━━━━━━━━━━━━━━━━━━━━━━
${itemsList}

━━━━━━━━━━━━━━━━━━━━━━
💳 طريقة الدفع: ${order.payment_method === 'cash' ? 'كاش عند الاستلام' : 'رابط دفع'}
━━━━━━━━━━━━━━━━━━━━━━

✅ شكراً لتعاملكم مع نفائس 🕌
📱 للمتابعة: 66377312`;

    window.open(`https://wa.me/96566377312?text=${encodeURIComponent(message)}`, '_blank');
  };

  const statusTabs = [
    { key: 'all', label: 'الكل', count: orders.length },
    { key: 'pending', label: 'معلق', count: orders.filter(o => o.status === 'pending').length },
    { key: 'confirmed', label: 'مؤكد', count: orders.filter(o => o.status === 'confirmed').length },
    { key: 'preparing', label: 'تجهيز', count: orders.filter(o => o.status === 'preparing').length },
    { key: 'delivered', label: 'مكتمل', count: orders.filter(o => o.status === 'delivered').length },
  ];

  return (
    <AdminLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#1A1A1A]">إدارة الطلبات</h2>
        <p className="text-[#6B6B6B]">عرض وتتبع جميع الطلبات ({orders.length})</p>
      </div>

      {/* Status Tabs */}
      <div className="bg-white rounded-xl border border-[#E8E0D5] p-2 mb-6 overflow-x-auto">
        <div className="flex gap-1 min-w-max">
          {statusTabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setStatusFilter(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                statusFilter === tab.key
                  ? 'bg-[#C9A96E] text-white'
                  : 'text-[#6B6B6B] hover:bg-[#F5F0E8]'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-[#E8E0D5] p-4 mb-6">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B6B]" />
          <input
            type="text"
            placeholder="ابحث برقم الطلب أو اسم العميل أو الهاتف..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pr-10 pl-4 py-2 bg-[#FAF8F5] border border-[#E8E0D5] rounded-lg text-[#1A1A1A] focus:outline-none focus:border-[#C9A96E]"
          />
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-xl border border-[#E8E0D5] p-8 text-center">
            <Package className="w-16 h-16 mx-auto mb-4 text-[#E8E0D5]" />
            <p className="text-[#6B6B6B]">لا توجد طلبات</p>
          </div>
        ) : (
          filteredOrders.map(order => {
            const badge = getStatusBadge(order.status);
            return (
              <div key={order.id} className="bg-white rounded-xl border border-[#E8E0D5] p-6">
                <div className="flex flex-col lg:flex-row justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#C9A96E]/20 to-[#D4AF37]/20 rounded-xl flex items-center justify-center">
                      <span className="text-[#C9A96E] font-bold text-sm">{order.order_number.slice(-8)}</span>
                    </div>
                    <div>
                      <p className="font-bold text-[#1A1A1A]">{order.order_number}</p>
                      <p className="text-sm text-[#6B6B6B]">
                        {new Date(order.created_at).toLocaleDateString('ar-SA', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="text-left">
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${badge.color}`}>
                      {badge.label}
                    </span>
                    <p className="text-2xl font-bold text-[#C9A96E] mt-2">{formatPrice(order.total)}</p>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="bg-[#FAF8F5] rounded-xl p-4 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                        <span className="text-[#C9A96E] font-bold">{order.customer_name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-sm text-[#6B6B6B]">العميل</p>
                        <p className="font-medium text-[#1A1A1A]">{order.customer_name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-5 h-5 text-[#6B6B6B]" />
                      <div>
                        <p className="text-sm text-[#6B6B6B]">الهاتف</p>
                        <p className="font-medium text-[#1A1A1A]" dir="ltr">+965 {order.customer_phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-[#6B6B6B]" />
                      <div>
                        <p className="text-sm text-[#6B6B6B]">العنوان</p>
                        <p className="font-medium text-[#1A1A1A]">{order.area}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-[#6B6B6B] mb-2">المنتجات ({(order.order_items || []).length}):</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {(order.order_items || []).map((item, index) => (
                      <div key={index} className="flex justify-between p-2 bg-[#FAF8F5] rounded-lg text-sm">
                        <span className="text-[#1A1A1A]">{item.product_name_ar}</span>
                        <span className="text-[#6B6B6B]">x{item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-[#E8E0D5]">
                  <button
                    onClick={() => handleDownloadPDF(order)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#F5F0E8] text-[#1A1A1A] rounded-lg hover:bg-[#E8E0D5] transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    تحميل PDF
                  </button>
                  <button
                    onClick={() => sendWhatsApp(order)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-lg hover:bg-[#20BD5A] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    إرسال واتساب
                  </button>
                  
                  {order.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleUpdateStatus(order.id, 'confirmed')}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        <Check className="w-4 h-4" />
                        تأكيد
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(order.id, 'cancelled')}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        إلغاء
                      </button>
                    </>
                  )}

                  {order.status === 'confirmed' && (
                    <button
                      onClick={() => handleUpdateStatus(order.id, 'preparing')}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      بدء التجهيز
                    </button>
                  )}

                  {order.status === 'preparing' && (
                    <button
                      onClick={() => handleUpdateStatus(order.id, 'shipped')}
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      شحن
                    </button>
                  )}

                  {order.status === 'shipped' && (
                    <button
                      onClick={() => handleUpdateStatus(order.id, 'delivered')}
                      className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      تأكيد التوصيل
                    </button>
                  )}

                  <a
                    href={`https://wa.me/965${order.customer_phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-lg hover:bg-[#20BD5A] transition-colors mr-auto"
                  >
                    <MessageCircle className="w-4 h-4" />
                    واتساب العميل
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>
    </AdminLayout>
  );
}