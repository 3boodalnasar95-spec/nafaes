import { Package, ShoppingCart, Users, FileText, TrendingUp, DollarSign, ArrowUp, ArrowDown } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function AdminDashboard() {
  const { products, orders, users, blogPosts, cartTotal } = useStore();

  const stats = [
    { label: 'إجمالي المنتجات', value: products.length, icon: Package, color: 'blue', change: '+12%' },
    { label: 'إجمالي الطلبات', value: orders.length, icon: ShoppingCart, color: 'green', change: '+8%' },
    { label: 'إجمالي المستخدمين', value: users.length, icon: Users, color: 'purple', change: '+5%' },
    { label: 'إجمالي المقالات', value: blogPosts.length, icon: FileText, color: 'orange', change: '+3%' },
  ];

  const revenueData = [
    { name: 'يناير', revenue: 45000 },
    { name: 'فبراير', revenue: 52000 },
    { name: 'مارس', revenue: 48000 },
    { name: 'أبريل', revenue: 61000 },
    { name: 'مايو', revenue: 55000 },
    { name: 'يونيو', revenue: 67000 },
  ];

  const ordersData = [
    { name: 'معلق', count: 5, color: '#F59E0B' },
    { name: 'قيد المعالجة', count: 8, color: '#3B82F6' },
    { name: 'تم الشحن', count: 12, color: '#8B5CF6' },
    { name: 'تم التوصيل', count: 25, color: '#10B981' },
    { name: 'ملغي', count: 2, color: '#EF4444' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-${stat.color}-500/20 flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-400`} />
                </div>
                <span className={`flex items-center gap-1 text-sm font-medium ${
                  stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.change.startsWith('+') ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                  {stat.change}
                </span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">إحصائيات الإيرادات</h3>
            <div className="flex items-center gap-2 text-green-400">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">+15.3%</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} />
                <YAxis stroke="#94A3B8" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1E293B', border: 'none', borderRadius: '8px' }}
                  labelStyle={{ color: '#F8FAFC' }}
                />
                <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Orders Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">حالة الطلبات</h3>
            <div className="text-2xl font-bold text-white">{orders.length}</div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ordersData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis type="number" stroke="#94A3B8" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="#94A3B8" fontSize={12} width={80} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1E293B', border: 'none', borderRadius: '8px' }}
                  labelStyle={{ color: '#F8FAFC' }}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {ordersData.map((entry, index) => (
                    <rect key={`bar-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800">
          <h3 className="text-lg font-semibold text-white">أحدث الطلبات</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/50">
              <tr>
                <th className="text-right px-6 py-3 text-xs font-medium text-slate-400 uppercase">رقم الطلب</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-slate-400 uppercase">العميل</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-slate-400 uppercase">الإجمالي</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-slate-400 uppercase">الحالة</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-slate-400 uppercase">التاريخ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-slate-800/50">
                  <td className="px-6 py-4 text-white font-medium">{order.id}</td>
                  <td className="px-6 py-4 text-slate-400">{users.find((u) => u.id === order.userId)?.name || 'عميل'}</td>
                  <td className="px-6 py-4 text-white font-medium">{order.total.toLocaleString()} ر.س</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      order.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
                      order.status === 'shipped' ? 'bg-purple-500/20 text-purple-400' :
                      order.status === 'processing' ? 'bg-blue-500/20 text-blue-400' :
                      order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {order.status === 'pending' ? 'معلق' :
                       order.status === 'processing' ? 'قيد المعالجة' :
                       order.status === 'shipped' ? 'تم الشحن' :
                       order.status === 'delivered' ? 'تم التوصيل' : 'ملغي'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm">{order.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}