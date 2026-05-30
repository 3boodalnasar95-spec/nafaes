import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Eye, Check, X, MessageCircle, Filter } from 'lucide-react';
import AdminLayout from './AdminLayout';
import { getOrders, updateOrderStatus } from '@/lib/db-operations';
import type { Order } from '@/types/database';

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useSearchParams();
  const currentStatus = statusFilter.get('status') || 'all';

  useEffect(() => {
    loadOrders();
  }, [currentStatus]);

  const loadOrders = async () => {
    setLoading(true);
    const data = await getOrders();
    setOrders(data);
    setLoading(false);
  };

  const handleStatusChange = async (orderId: string, newStatus: Order['status']) => {
    await updateOrderStatus(orderId, newStatus);
    loadOrders();
  };

  const getStatusBadge = (status: Order['status']) => {
    const badges: Record<Order['status'], { label: string; color: string }> = {
      pending: { label: 'معلق', color: 'bg-yellow-100 text-yellow-700' },
      confirmed: { label: 'تم التأكيد', color: 'bg-blue-100 text-blue-700' },
      preparing: { label: 'قيد التجهيز', color: 'bg-purple-100 text-purple-700' },
      shipped: { label: 'تم الشحن', color: 'bg-indigo-100 text-indigo-700' },
      delivered: { label: 'تم التوصيل', color: 'bg-green-100 text-green-700' },
      cancelled: { label: 'ملغي', color: 'bg-red-100 text-red-700' },
    };
    return badges[status];
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.order_number?.includes(search) ||
      order.customer?.name?.includes(search) ||
      order.customer?.phone?.includes(search);
    
    if (currentStatus === 'all') return matchesSearch;
    return matchesSearch && order.status === currentStatus;
  });

  const statusTabs = [
    { key: 'all', label: 'الكل', count: orders.length },
    { key: 'pending', label: 'معلق', count: orders.filter(o => o.status === 'pending').length },
    { key: 'confirmed', label: 'مؤكدة', count: orders.filter(o => o.status === 'confirmed').length },
    { key: 'preparing', label: 'قيد التجهيز', count: orders.filter(o => o.status === 'preparing').length },
    { key: 'shipped', label: 'تم الشحن', count: orders.filter(o => o.status === 'shipped').length },
    { key: 'delivered', label: 'مكتمل', count: orders.filter(o => o.status === 'delivered').length },
    { key: 'cancelled', label: 'ملغي', count: orders.filter(o => o.status === 'cancelled').length },
  ];

  return (
    <AdminLayout>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[#1A1A1A]">الطلبات</h2>
            <p className="text-[#6B6B6B]">إدارة وتتبع الطلبات</p>
          </div>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="bg-white rounded-xl border border-[#E8E0D5] p-2 mb-6 overflow-x-auto">
        <div className="flex gap-1 min-w-max">
          {statusTabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setStatusFilter(tab.key === 'all' ? {} : { status: tab.key })}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                currentStatus === tab.key
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
        {loading ? (
          <div className="bg-white rounded-xl border border-[#E8E0D5] p-8 text-center text-[#6B6B6B]">
            جاري التحميل...
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white rounded-xl border border-[#E8E0D5] p-8 text-center text-[#6B6B6B]">
            <p>لا توجد طلبات</p>
          </div>
        ) : (
          filteredOrders.map(order => {
            const badge = getStatusBadge(order.status);
            return (
              <div key={order.id} className="bg-white rounded-xl border border-[#E8E0D5] p-6">
                <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#F5F0E8] rounded-lg flex items-center justify-center">
                      <span className="text-[#C9A96E] font-bold">#{order.order_number?.slice(-4)}</span>
                    </div>
                    <div>
                      <p className="font-bold text-[#1A1A1A]">{order.order_number}</p>
                      <p className="text-sm text-[#6B6B6B]">
                        {order.customer?.name} - {order.customer?.phone}
                      </p>
                      <p className="text-sm text-[#6B6B6B]">{order.area}</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${badge.color}`}>
                      {badge.label}
                    </span>
                    <p className="text-2xl font-bold text-[#C9A96E] mt-2">{order.total.toFixed(3)} د.ك</p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="bg-[#FAF8F5] rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-[#6B6B6B] mb-2">المنتجات:</p>
                  <div className="space-y-2">
                    {order.items?.map((item, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-[#1A1A1A]">{item.product?.name_ar} × {item.quantity}</span>
                        <span className="text-[#C9A96E]">{item.total_price.toFixed(3)} د.ك</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  <Link
                    to={`/admin/orders/${order.id}`}
                    className="flex items-center gap-2 px-4 py-2 bg-[#F5F0E8] text-[#1A1A1A] rounded-lg hover:bg-[#E8E0D5] transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    عرض
                  </Link>
                  
                  {order.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleStatusChange(order.id, 'confirmed')}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        <Check className="w-4 h-4" />
                        تأكيد
                      </button>
                      <button
                        onClick={() => handleStatusChange(order.id, 'cancelled')}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        إلغاء
                      </button>
                    </>
                  )}

                  {order.status === 'confirmed' && (
                    <button
                      onClick={() => handleStatusChange(order.id, 'preparing')}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      بدء التجهيز
                    </button>
                  )}

                  {order.status === 'preparing' && (
                    <button
                      onClick={() => handleStatusChange(order.id, 'shipped')}
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      شحن
                    </button>
                  )}

                  {order.status === 'shipped' && (
                    <button
                      onClick={() => handleStatusChange(order.id, 'delivered')}
                      className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      تأكيد التوصيل
                    </button>
                  )}

                  {order.customer?.phone && (
                    <a
                      href={`https://wa.me/965${order.customer.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-lg hover:bg-[#20BD5A] transition-colors mr-auto"
                    >
                      <MessageCircle className="w-4 h-4" />
                      واتساب
                    </a>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </AdminLayout>
  );
}