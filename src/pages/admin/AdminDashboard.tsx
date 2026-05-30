import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, TrendingDown, ShoppingCart, Users, Package, 
  DollarSign, AlertTriangle, ArrowRight, RefreshCw, ArrowUp,
  Eye, Clock, CreditCard, Truck, CheckCircle, XCircle
} from 'lucide-react';
import AdminLayout from './AdminLayout';
import { getDashboardStats, getOrders, getProducts, getSalesReport } from '@/lib/db-operations';
import { formatPrice } from '@/data/products';
import type { DashboardStats, Order, Product } from '@/types/database';

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [salesData, setSalesData] = useState<{ date: string; orders: number; revenue: number }[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    const [statsData, ordersData, productsData, reportData] = await Promise.all([
      getDashboardStats(),
      getOrders({ status: 'all' }),
      getProducts(),
      getSalesReport(
        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        new Date().toISOString().split('T')[0]
      )
    ]);
    
    setStats(statsData);
    setRecentOrders(ordersData.slice(0, 5));
    setLowStockProducts(productsData.filter(p => p.stock_quantity <= (p.min_stock_level || 5)).slice(0, 5));
    setSalesData(reportData.daily);
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-700',
      confirmed: 'bg-blue-100 text-blue-700',
      preparing: 'bg-purple-100 text-purple-700',
      ready: 'bg-indigo-100 text-indigo-700',
      shipped: 'bg-cyan-100 text-cyan-700',
      delivered: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-700',
      refunded: 'bg-gray-100 text-gray-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: 'معلق',
      confirmed: 'مؤكد',
      preparing: 'قيد التجهيز',
      ready: 'جاهز',
      shipped: 'تم الشحن',
      delivered: 'مكتمل',
      cancelled: 'ملغي',
      refunded: 'مرتجع'
    };
    return labels[status] || status;
  };

  // Calculate chart data
  const maxRevenue = Math.max(...salesData.map(d => d.revenue), 1);
  const totalWeekRevenue = salesData.reduce((sum, d) => sum + d.revenue, 0);

  return (
    <AdminLayout>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#1A1A1A]">لوحة التحكم</h2>
            <p className="text-[#6B6B6B]">نظرة شاملة على أداء متجرك</p>
          </div>
          <button
            onClick={loadDashboardData}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-[#C9A96E] text-white rounded-lg hover:bg-[#D4AF37] transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            تحديث
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-[#E8E0D5] p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between">
            <div className="p-3 bg-green-500 rounded-lg">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <span className="flex items-center text-green-500 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              +12%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-[#1A1A1A] mt-4">{formatPrice(stats?.total_revenue || 0)}</h3>
          <p className="text-[#6B6B6B] text-sm">إجمالي الإيرادات</p>
          <Link to="/admin/accounting" className="text-[#C9A96E] text-sm mt-2 inline-block hover:underline">
            عرض التفاصيل ←
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-[#E8E0D5] p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between">
            <div className="p-3 bg-blue-500 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <span className="text-blue-500 text-sm">
              {stats?.total_orders || 0} طلب
            </span>
          </div>
          <h3 className="text-2xl font-bold text-[#1A1A1A] mt-4">{stats?.total_orders || 0}</h3>
          <p className="text-[#6B6B6B] text-sm">إجمالي الطلبات</p>
          <Link to="/admin/orders" className="text-[#C9A96E] text-sm mt-2 inline-block hover:underline">
            عرض الكل ←
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-[#E8E0D5] p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between">
            <div className="p-3 bg-purple-500 rounded-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <span className="text-purple-500 text-sm">
              {stats?.total_customers || 0} عميل
            </span>
          </div>
          <h3 className="text-2xl font-bold text-[#1A1A1A] mt-4">{stats?.total_customers || 0}</h3>
          <p className="text-[#6B6B6B] text-sm">العملاء المسجلين</p>
          <Link to="/admin/customers" className="text-[#C9A96E] text-sm mt-2 inline-block hover:underline">
            عرض الكل ←
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-[#E8E0D5] p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between">
            <div className="p-3 bg-[#C9A96E] rounded-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <span className="text-[#C9A96E] text-sm">
              {stats?.total_products || 0} منتج
            </span>
          </div>
          <h3 className="text-2xl font-bold text-[#1A1A1A] mt-4">{stats?.total_products || 0}</h3>
          <p className="text-[#6B6B6B] text-sm">المنتجات النشطة</p>
          <Link to="/admin/products" className="text-[#C9A96E] text-sm mt-2 inline-block hover:underline">
            إدارة المنتجات ←
          </Link>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#E8E0D5] p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-[#1A1A1A]">إيرادات الأسبوع</h3>
              <p className="text-[#6B6B6B] text-sm">{formatPrice(totalWeekRevenue)}</p>
            </div>
            <div className="flex items-center gap-2 text-green-500">
              <ArrowUp className="w-4 h-4" />
              <span>+15%</span>
            </div>
          </div>
          
          {/* Simple Bar Chart */}
          <div className="flex items-end gap-2 h-40">
            {salesData.map((day, i) => {
              const height = (day.revenue / maxRevenue) * 100;
              const date = new Date(day.date);
              const dayName = date.toLocaleDateString('ar-SA', { weekday: 'short' });
              
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-[#F5F0E8] rounded-t-lg relative group" style={{ height: '140px' }}>
                    <div 
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#C9A96E] to-[#D4AF37] rounded-t-lg transition-all hover:opacity-80"
                      style={{ height: `${height}%` }}
                    />
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1A1A1A] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {formatPrice(day.revenue)}
                    </div>
                  </div>
                  <span className="text-xs text-[#6B6B6B]">{dayName}</span>
                </div>
              );
            })}
            {salesData.length === 0 && (
              <div className="flex-1 flex items-center justify-center text-[#6B6B6B]">
                لا توجد بيانات
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl border border-[#E8E0D5] p-6">
          <h3 className="font-bold text-[#1A1A1A] mb-4">إحصائيات سريعة</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-500" />
                <span className="text-sm">طلبات معلقة</span>
              </div>
              <span className="text-xl font-bold text-orange-500">{stats?.pending_orders || 0}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <span className="text-sm">منتجات منخفضة</span>
              </div>
              <span className="text-xl font-bold text-red-500">{stats?.low_stock_products || 0}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-green-500" />
                <span className="text-sm">أرباح اليوم</span>
              </div>
              <span className="text-xl font-bold text-green-500">{formatPrice(stats?.today_revenue || 0)}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-blue-500" />
                <span className="text-sm">طلبات اليوم</span>
              </div>
              <span className="text-xl font-bold text-blue-500">{stats?.today_orders || 0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl border border-[#E8E0D5] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[#1A1A1A]">آخر الطلبات</h3>
            <Link to="/admin/orders" className="text-[#C9A96E] text-sm hover:underline">
              عرض الكل
            </Link>
          </div>
          
          {recentOrders.length === 0 ? (
            <div className="text-center py-8 text-[#6B6B6B]">
              <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>لا توجد طلبات</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentOrders.map(order => (
                <Link
                  key={order.id}
                  to={`/admin/orders/${order.id}`}
                  className="flex items-center justify-between p-3 bg-[#FAF8F5] rounded-lg hover:bg-[#F5F0E8] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${order.status === 'pending' ? 'bg-yellow-400' : order.status === 'delivered' ? 'bg-green-400' : 'bg-blue-400'}`} />
                    <div>
                      <p className="font-medium text-[#1A1A1A]">{order.order_number}</p>
                      <p className="text-sm text-[#6B6B6B]">{order.customer_name}</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                    <p className="text-[#C9A96E] font-bold mt-1">{formatPrice(order.total)}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white rounded-xl border border-[#E8E0D5] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[#1A1A1A]">تنبيهات المخزون</h3>
            <Link to="/admin/inventory" className="text-[#C9A96E] text-sm hover:underline">
              إدارة المخزون
            </Link>
          </div>
          
          {lowStockProducts.length === 0 ? (
            <div className="text-center py-8 text-[#6B6B6B]">
              <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-500" />
              <p>جميع المنتجات متوفرة</p>
            </div>
          ) : (
            <div className="space-y-3">
              {lowStockProducts.map(product => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    <div>
                      <p className="font-medium text-[#1A1A1A]">{product.name_ar}</p>
                      <p className="text-sm text-[#6B6B6B]">الحد الأدنى: {product.min_stock_level}</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <span className="text-xl font-bold text-red-500">{product.stock_quantity}</span>
                    <p className="text-sm text-[#6B6B6B]">متوفر</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 bg-gradient-to-r from-[#C9A96E] to-[#D4AF37] rounded-xl p-6">
        <h3 className="font-bold text-white mb-4">إجراءات سريعة</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/admin/products/new"
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white p-4 rounded-lg transition-colors"
          >
            <Package className="w-5 h-5" />
            <span>إضافة منتج</span>
          </Link>
          <Link
            to="/admin/orders/new"
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white p-4 rounded-lg transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>إنشاء طلب</span>
          </Link>
          <Link
            to="/admin/invoices/new"
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white p-4 rounded-lg transition-colors"
          >
            <CreditCard className="w-5 h-5" />
            <span>فاتورة جديدة</span>
          </Link>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white p-4 rounded-lg transition-colors"
          >
            <Eye className="w-5 h-5" />
            <span>طباعة تقرير</span>
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}