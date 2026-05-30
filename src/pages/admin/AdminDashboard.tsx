import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, TrendingDown, ShoppingCart, Users, Package, 
  DollarSign, AlertTriangle, ArrowLeft, RefreshCw
} from 'lucide-react';
import AdminLayout from './AdminLayout';
import { getDashboardStats } from '@/lib/db-operations';
import type { DashboardStats } from '@/types/database';

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setLoading(true);
    const data = await getDashboardStats();
    setStats(data);
    setLoading(false);
  };

  const statCards = [
    {
      title: 'إجمالي الإيرادات',
      value: stats ? `${stats.total_revenue.toFixed(3)} د.ك` : '0',
      change: '+12%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-green-500',
      link: '/admin/accounting'
    },
    {
      title: 'إجمالي الطلبات',
      value: stats?.total_orders || 0,
      change: '+8%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'bg-blue-500',
      link: '/admin/orders'
    },
    {
      title: 'العملاء',
      value: stats?.total_customers || 0,
      change: '+15%',
      trend: 'up',
      icon: Users,
      color: 'bg-purple-500',
      link: '/admin/customers'
    },
    {
      title: 'المنتجات',
      value: stats?.total_products || 0,
      icon: Package,
      color: 'bg-[#C9A96E]',
      link: '/admin/products'
    },
  ];

  const alertCards = [
    {
      title: 'طلبات معلقة',
      value: stats?.pending_orders || 0,
      icon: ShoppingCart,
      color: 'text-orange-500',
      bg: 'bg-orange-50',
      link: '/admin/orders?status=pending'
    },
    {
      title: 'منتجات شبه نفادت',
      value: stats?.low_stock_products || 0,
      icon: AlertTriangle,
      color: 'text-red-500',
      bg: 'bg-red-50',
      link: '/admin/inventory?alert=low'
    },
    {
      title: 'أرباح اليوم',
      value: stats ? `${stats.today_revenue.toFixed(3)} د.ك` : '0',
      icon: TrendingUp,
      color: 'text-green-500',
      bg: 'bg-green-50'
    },
    {
      title: 'طلبات اليوم',
      value: stats?.today_orders || 0,
      icon: ShoppingCart,
      color: 'text-blue-500',
      bg: 'bg-blue-50'
    },
  ];

  return (
    <AdminLayout>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#1A1A1A]">لوحة التحكم</h2>
            <p className="text-[#6B6B6B]">نظرة عامة على أداء المتجر</p>
          </div>
          <button
            onClick={loadStats}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-[#C9A96E] text-white rounded-lg hover:bg-[#D4AF37] transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            تحديث
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Link
              key={i}
              to={stat.link}
              className="bg-white rounded-xl border border-[#E8E0D5] p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                {stat.trend && (
                  <span className={`flex items-center text-sm ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {stat.change}
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-1">{stat.value}</h3>
              <p className="text-[#6B6B6B] text-sm">{stat.title}</p>
            </Link>
          );
        })}
      </div>

      {/* Alerts & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alerts */}
        <div className="bg-white rounded-xl border border-[#E8E0D5] p-6">
          <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">تنبيهات سريعة</h3>
          <div className="space-y-3">
            {alertCards.map((alert, i) => {
              const Icon = alert.icon;
              return (
                <Link
                  key={i}
                  to={alert.link || '#'}
                  className={`flex items-center gap-4 p-4 ${alert.bg} rounded-lg hover:opacity-80 transition-opacity`}
                >
                  <Icon className={`w-6 h-6 ${alert.color}`} />
                  <div className="flex-1">
                    <p className="font-medium text-[#1A1A1A]">{alert.title}</p>
                  </div>
                  <span className={`text-2xl font-bold ${alert.color}`}>{alert.value}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-[#E8E0D5] p-6">
          <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">إجراءات سريعة</h3>
          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/admin/products/new"
              className="flex items-center gap-2 p-4 bg-[#F5F0E8] rounded-lg hover:bg-[#E8E0D5] transition-colors"
            >
              <Package className="w-5 h-5 text-[#C9A96E]" />
              <span className="text-[#1A1A1A]">إضافة منتج</span>
            </Link>
            <Link
              to="/admin/orders/new"
              className="flex items-center gap-2 p-4 bg-[#F5F0E8] rounded-lg hover:bg-[#E8E0D5] transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-[#C9A96E]" />
              <span className="text-[#1A1A1A]">إنشاء طلب</span>
            </Link>
            <Link
              to="/admin/customers/new"
              className="flex items-center gap-2 p-4 bg-[#F5F0E8] rounded-lg hover:bg-[#E8E0D5] transition-colors"
            >
              <Users className="w-5 h-5 text-[#C9A96E]" />
              <span className="text-[#1A1A1A]">إضافة عميل</span>
            </Link>
            <Link
              to="/admin/accounting/new"
              className="flex items-center gap-2 p-4 bg-[#F5F0E8] rounded-lg hover:bg-[#E8E0D5] transition-colors"
            >
              <DollarSign className="w-5 h-5 text-[#C9A96E]" />
              <span className="text-[#1A1A1A]">تسجيل عملية</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Orders Preview */}
      <div className="mt-6 bg-white rounded-xl border border-[#E8E0D5] p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-[#1A1A1A]">آخر الطلبات</h3>
          <Link to="/admin/orders" className="flex items-center gap-1 text-[#C9A96E] hover:text-[#D4AF37] transition-colors">
            عرض الكل
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
        <div className="text-center py-8 text-[#6B6B6B]">
          <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>سيتم عرض آخر الطلبات هنا عند توفر البيانات</p>
        </div>
      </div>
    </AdminLayout>
  );
}