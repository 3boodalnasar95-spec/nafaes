import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, ShoppingCart, Users, Package, 
  DollarSign, AlertTriangle, ArrowRight, RefreshCw, 
  Eye, Bell, MessageCircle, CheckCircle, Clock
} from 'lucide-react';
import { useOrders, Order, Notification } from '@/contexts/OrderContext';
import AdminLayout from './AdminLayout';
import { formatPrice } from '@/data/products';

export default function AdminDashboard() {
  const { orders, notifications, unreadCount, markNotificationRead, markAllNotificationsRead } = useOrders();
  const [showNotifications, setShowNotifications] = useState(false);
  const [loading, setLoading] = useState(false);

  // Calculate stats
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const todayOrders = orders.filter(o => {
    const today = new Date().toDateString();
    return new Date(o.createdAt).toDateString() === today;
  });

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-700',
      confirmed: 'bg-blue-100 text-blue-700',
      preparing: 'bg-purple-100 text-purple-700',
      shipped: 'bg-cyan-100 text-cyan-700',
      delivered: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: 'معلق',
      confirmed: 'مؤكد',
      preparing: 'قيد التجهيز',
      shipped: 'تم الشحن',
      delivered: 'مكتمل',
      cancelled: 'ملغي'
    };
    return labels[status] || status;
  };

  const handleNotificationClick = (notification: Notification) => {
    markNotificationRead(notification.id);
    if (notification.orderId) {
      // Navigate to order details
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#1A1A1A]">لوحة التحكم</h2>
            <p className="text-[#6B6B6B]">مرحباً بك في لوحة تحكم نفائس</p>
          </div>
          
          {/* Notifications Bell */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-3 bg-white border border-[#E8E0D5] rounded-xl hover:bg-[#FAF8F5] transition-colors"
            >
              <Bell className="w-6 h-6 text-[#6B6B6B]" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            
            {showNotifications && (
              <div className="absolute left-0 top-full mt-2 w-96 bg-white rounded-xl border border-[#E8E0D5] shadow-xl z-50">
                <div className="p-4 border-b border-[#E8E0D5] flex items-center justify-between">
                  <h3 className="font-bold text-[#1A1A1A]">الإشعارات</h3>
                  {unreadCount > 0 && (
                    <button 
                      onClick={markAllNotificationsRead}
                      className="text-sm text-[#C9A96E] hover:text-[#D4AF37]"
                    >
                      تحديد الكل كمقروء
                    </button>
                  )}
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center text-[#6B6B6B]">
                      <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>لا توجد إشعارات</p>
                    </div>
                  ) : (
                    notifications.slice(0, 10).map(notif => (
                      <div 
                        key={notif.id} 
                        onClick={() => handleNotificationClick(notif)}
                        className={`p-4 border-b border-[#E8E0D5] last:border-0 hover:bg-[#FAF8F5] cursor-pointer ${
                          !notif.read ? 'bg-[#C9A96E]/5' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-full ${
                            notif.type === 'order' ? 'bg-green-100 text-green-600' :
                            notif.type === 'alert' ? 'bg-orange-100 text-orange-600' :
                            'bg-blue-100 text-blue-600'
                          }`}>
                            {notif.type === 'order' ? <ShoppingCart className="w-4 h-4" /> :
                             notif.type === 'alert' ? <AlertTriangle className="w-4 h-4" /> :
                             <Bell className="w-4 h-4" />}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-[#1A1A1A] text-sm">{notif.title}</p>
                            <p className="text-sm text-[#6B6B6B] mt-1">{notif.message}</p>
                            <p className="text-xs text-[#C9A96E] mt-2">
                              {new Date(notif.createdAt).toLocaleDateString('ar-SA', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                          {!notif.read && (
                            <div className="w-2 h-2 bg-[#C9A96E] rounded-full"></div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-[#E8E0D5] p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between">
            <div className="p-3 bg-green-500 rounded-lg">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-[#1A1A1A] mt-4">{formatPrice(totalRevenue)}</h3>
          <p className="text-[#6B6B6B] text-sm">إجمالي الإيرادات</p>
        </div>

        <div className="bg-white rounded-xl border border-[#E8E0D5] p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between">
            <div className="p-3 bg-blue-500 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <span className="text-blue-500 text-sm">{orders.length} طلب</span>
          </div>
          <h3 className="text-2xl font-bold text-[#1A1A1A] mt-4">{orders.length}</h3>
          <p className="text-[#6B6B6B] text-sm">إجمالي الطلبات</p>
        </div>

        <div className="bg-white rounded-xl border border-[#E8E0D5] p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between">
            <div className="p-3 bg-orange-500 rounded-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <span className="text-orange-500 text-sm">تتطلب متابعة</span>
          </div>
          <h3 className="text-2xl font-bold text-orange-500 mt-4">{pendingOrders}</h3>
          <p className="text-[#6B6B6B] text-sm">طلبات معلقة</p>
        </div>

        <div className="bg-white rounded-xl border border-[#E8E0D5] p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between">
            <div className="p-3 bg-[#C9A96E] rounded-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <span className="text-[#C9A96E] text-sm">اليوم</span>
          </div>
          <h3 className="text-2xl font-bold text-[#1A1A1A] mt-4">{todayOrders.length}</h3>
          <p className="text-[#6B6B6B] text-sm">طلبات اليوم</p>
        </div>
      </div>

      {/* Orders Section */}
      <div className="bg-white rounded-xl border border-[#E8E0D5] p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-[#1A1A1A] text-lg">آخر الطلبات</h3>
          <Link to="/admin/orders" className="text-[#C9A96E] text-sm hover:underline">
            عرض الكل
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-[#E8E0D5]" />
            <p className="text-[#6B6B6B]">لا توجد طلبات حتى الآن</p>
            <p className="text-sm text-[#C9A96E] mt-2">ستظهر الطلبات الجديدة هنا عند استلامها</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.slice(0, 5).map(order => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-[#FAF8F5] rounded-xl hover:bg-[#F5F0E8] transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${order.status === 'pending' ? 'bg-yellow-400 animate-pulse' : order.status === 'delivered' ? 'bg-green-400' : 'bg-blue-400'}`} />
                  <div>
                    <p className="font-bold text-[#1A1A1A]">{order.orderNumber}</p>
                    <p className="text-sm text-[#6B6B6B]">{order.customerName} - {order.customerPhone}</p>
                    <p className="text-xs text-[#6B6B6B]">{order.items.length} منتجات</p>
                  </div>
                </div>
                <div className="text-left">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {getStatusLabel(order.status)}
                  </span>
                  <p className="text-[#C9A96E] font-bold mt-2">{formatPrice(order.total)}</p>
                  <p className="text-xs text-[#6B6B6B] mt-1">
                    {new Date(order.createdAt).toLocaleDateString('ar-SA')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link 
          to="/admin/orders" 
          className="flex items-center justify-center gap-3 bg-gradient-to-r from-[#C9A96E] to-[#D4AF37] text-white p-4 rounded-xl hover:opacity-90 transition-opacity"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="font-bold">إدارة الطلبات</span>
        </Link>
        <a 
          href="https://wa.me/96566377312" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 bg-[#25D366] text-white p-4 rounded-xl hover:bg-[#20BD5A] transition-colors"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="font-bold">تواصل واتساب</span>
        </a>
        <Link 
          to="/products" 
          className="flex items-center justify-center gap-3 bg-[#1A1A1A] text-white p-4 rounded-xl hover:bg-[#333] transition-colors"
        >
          <Package className="w-6 h-6" />
          <span className="font-bold">المتجر</span>
        </Link>
      </div>
    </AdminLayout>
  );
}