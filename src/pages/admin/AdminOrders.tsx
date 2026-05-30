import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Eye, Check, X, MessageCircle, Download, Package, Phone, MapPin } from 'lucide-react';
import { useOrders, Order } from '@/contexts/OrderContext';
import { formatPrice } from '@/data/products';
import { downloadInvoicePDF } from '@/utils/pdfGenerator';
import { generateAdminWhatsAppMessage, getWhatsAppLink } from '@/utils/whatsappGenerator';
import AdminLayout from './AdminLayout';

export default function AdminOrders() {
  const { orders, updateOrderStatus } = useOrders();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderNumber.includes(search) ||
      order.customerName.includes(search) ||
      order.customerPhone.includes(search);
    
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
      orderNumber: order.orderNumber,
      date: new Date(order.createdAt).toLocaleDateString('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      customerName: order.customerName,
      customerPhone: order.customerPhone,
      governorate: order.governorate,
      area: order.area,
      address: order.address,
      notes: order.notes,
      paymentMethod: order.paymentMethod,
      items: order.items.map(item => ({
        nameAr: item.productNameAr,
        nameEn: item.productNameEn,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice
      })),
      subtotal: order.subtotal,
      deliveryFee: order.deliveryFee,
      total: order.total
    };
    
    await downloadInvoicePDF(invoiceData);
  };

  const sendWhatsApp = (order: Order) => {
    const invoiceData = {
      orderNumber: order.orderNumber,
      date: new Date(order.createdAt).toLocaleDateString('ar-SA'),
      customerName: order.customerName,
      customerPhone: order.customerPhone,
      governorate: order.governorate,
      area: order.area,
      address: order.address,
      notes: order.notes,
      paymentMethod: order.paymentMethod,
      items: order.items.map(item => ({
        nameAr: item.productNameAr,
        nameEn: item.productNameEn,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice
      })),
      subtotal: order.subtotal,
      deliveryFee: order.deliveryFee,
      total: order.total
    };
    
    const message = generateAdminWhatsAppMessage(invoiceData);
    window.open(getWhatsAppLink(message), '_blank');
  };

  const statusTabs = [
    { key: 'all', label: 'الكل', count: orders.length },
    { key: 'pending', label: 'معلق', count: orders.filter(o => o.status === 'pending').length },
    { key: 'confirmed', label: 'مؤكد', count: orders.filter(o => o.status === 'confirmed').length },
    { key: 'preparing', label: 'تجهيز', count: orders.filter(o => o.status === 'preparing').length },
    { key: 'shipped', label: 'شحن', count: orders.filter(o => o.status === 'shipped').length },
    { key: 'delivered', label: 'مكتمل', count: orders.filter(o => o.status === 'delivered').length },
  ];

  return (
    <AdminLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#1A1A1A]">إدارة الطلبات</h2>
        <p className="text-[#6B6B6B]">عرض وتتبع جميع الطلبات</p>
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
                      <span className="text-[#C9A96E] font-bold text-sm">{order.orderNumber.slice(-8)}</span>
                    </div>
                    <div>
                      <p className="font-bold text-[#1A1A1A]">{order.orderNumber}</p>
                      <p className="text-sm text-[#6B6B6B]">
                        {new Date(order.createdAt).toLocaleDateString('ar-SA', {
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
                        <span className="text-[#C9A96E] font-bold">{order.customerName.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-sm text-[#6B6B6B]">العميل</p>
                        <p className="font-medium text-[#1A1A1A]">{order.customerName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-5 h-5 text-[#6B6B6B]" />
                      <div>
                        <p className="text-sm text-[#6B6B6B]">الهاتف</p>
                        <p className="font-medium text-[#1A1A1A]" dir="ltr">+965 {order.customerPhone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-[#6B6B6B]" />
                      <div>
                        <p className="text-sm text-[#6B6B6B]">العنوان</p>
                        <p className="font-medium text-[#1A1A1A]">{order.area} - {order.address}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-[#6B6B6B] mb-2">المنتجات ({order.items.length}):</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between p-2 bg-[#FAF8F5] rounded-lg text-sm">
                        <span className="text-[#1A1A1A]">{item.productNameAr}</span>
                        <span className="text-[#6B6B6B]">x{item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div className="flex flex-wrap gap-4 py-4 border-t border-[#E8E0D5]">
                  <div className="text-sm">
                    <span className="text-[#6B6B6B]">المجموع:</span>
                    <span className="font-medium text-[#1A1A1A] mr-2">{formatPrice(order.subtotal)}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-[#6B6B6B]">التوصيل:</span>
                    <span className="font-medium text-[#1A1A1A] mr-2">{formatPrice(order.deliveryFee)}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-[#6B6B6B]">الدفع:</span>
                    <span className="font-medium text-[#1A1A1A] mr-2">
                      {order.paymentMethod === 'cash' ? 'كاش' : 'رابط'}
                    </span>
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
                        onClick={() => updateOrderStatus(order.id, 'confirmed')}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        <Check className="w-4 h-4" />
                        تأكيد
                      </button>
                      <button
                        onClick={() => updateOrderStatus(order.id, 'cancelled')}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        إلغاء
                      </button>
                    </>
                  )}

                  {order.status === 'confirmed' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'preparing')}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      بدء التجهيز
                    </button>
                  )}

                  {order.status === 'preparing' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'shipped')}
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      شحن
                    </button>
                  )}

                  {order.status === 'shipped' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'delivered')}
                      className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      تأكيد التوصيل
                    </button>
                  )}

                  <a
                    href={`https://wa.me/965${order.customerPhone}`}
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