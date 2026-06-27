import { useState, useEffect } from 'react';
import { BarChart3, Download, Calendar, Filter, TrendingUp, Package, Users, ShoppingCart, DollarSign, AlertCircle, Database, FileBarChart } from 'lucide-react';
import AdminLayout from './AdminLayout';
import { getSalesReport, getTransactions, getOrders, exportOrders, Transaction } from '@/lib/db-operations';
import { isSupabaseConfigured } from '@/lib/supabase';
import { formatPrice } from '@/data/products';

export default function AdminReports() {
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d' | 'custom'>('30d');
  const [customFrom, setCustomFrom] = useState('');
  const [customTo, setCustomTo] = useState('');
  const [reportData, setReportData] = useState<{
    daily: { date: string; orders: number; revenue: number }[];
    byStatus: Record<string, number>;
    topProducts: { name: string; quantity: number; revenue: number }[];
  }>({ daily: [], byStatus: {}, topProducts: [] });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReports();
  }, [dateRange, customFrom, customTo]);

  const getDateRange = () => {
    const now = new Date();
    const end = now.toISOString().split('T')[0];
    let start: string;
    
    switch (dateRange) {
      case '7d':
        start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        break;
      case '90d':
        start = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        break;
      case 'custom':
        start = customFrom || new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        break;
      default:
        start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    }
    
    return { start, end: customTo || end };
  };

  const loadReports = async () => {
    setLoading(true);
    const { start, end } = getDateRange();
    
    const [report, trans] = await Promise.all([
      getSalesReport(start, end),
      getTransactions({ date_from: start, date_to: end })
    ]);
    
    setReportData(report);
    setTransactions(trans);
    setLoading(false);
  };

  const totalRevenue = reportData.daily.reduce((sum, d) => sum + d.revenue, 0);
  const totalOrders = reportData.daily.reduce((sum, d) => sum + d.orders, 0);
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const netProfit = totalRevenue - totalExpenses;

  const handleExport = async (format: 'csv' | 'json') => {
    const data = await exportOrders(format);
    const blob = new Blob([data], { type: format === 'json' ? 'application/json' : 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders-report-${new Date().toISOString().split('T')[0]}.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleGenerateReport = async () => {
    const now = new Date();
    const end = now.toISOString().split('T')[0];
    const start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    setDateRange('30d');
    setCustomFrom('');
    setCustomTo('');
    setLoading(true);
    const [report, trans] = await Promise.all([
      getSalesReport(start, end),
      getTransactions({ date_from: start, date_to: end })
    ]);
    setReportData(report);
    setTransactions(trans);
    setLoading(false);
  };

  return (
    <AdminLayout>
      {!isSupabaseConfigured && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-bold text-amber-900">قاعدة البيانات غير مهيأة</p>
            <p className="text-sm text-amber-800 mt-1">
              Supabase غير مهيأ. لا يمكن عرض التقارير. أضف VITE_SUPABASE_URL و VITE_SUPABASE_ANON_KEY في ملف .env ثم أعد تشغيل التطبيق.
            </p>
          </div>
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#1A1A1A]">التقارير والإحصائيات</h2>
        <p className="text-[#6B6B6B]">تحليل أداء المتجر</p>
      </div>

      {/* Date Range Selector */}
      <div className="bg-white rounded-xl border border-[#E8E0D5] p-4 mb-6 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#C9A96E]" />
          <span className="text-[#6B6B6B]">الفترة:</span>
        </div>
        <div className="flex gap-2">
          {(['7d', '30d', '90d', 'custom'] as const).map(range => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                dateRange === range 
                  ? 'bg-[#C9A96E] text-white' 
                  : 'bg-[#F5F0E8] text-[#6B6B6B] hover:bg-[#E8E0D5]'
              }`}
            >
              {range === '7d' ? '7 أيام' : range === '30d' ? '30 يوم' : range === '90d' ? '90 يوم' : 'مخصص'}
            </button>
          ))}
        </div>
        {dateRange === 'custom' && (
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={customFrom}
              onChange={(e) => setCustomFrom(e.target.value)}
              className="px-4 py-2 border border-[#E8E0D5] rounded-lg"
            />
            <span className="text-[#6B6B6B]">إلى</span>
            <input
              type="date"
              value={customTo}
              onChange={(e) => setCustomTo(e.target.value)}
              className="px-4 py-2 border border-[#E8E0D5] rounded-lg"
            />
          </div>
        )}
        <button
          onClick={handleGenerateReport}
          disabled={!isSupabaseConfigured}
          className="flex items-center gap-2 px-4 py-2 bg-[#C9A96E] text-white rounded-lg hover:bg-[#D4AF37] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FileBarChart className="w-4 h-4" />
          إنشاء تقرير (آخر 30 يوم)
        </button>
        <button
          onClick={() => handleExport('csv')}
          disabled={!isSupabaseConfigured}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mr-auto"
        >
          <Download className="w-4 h-4" />
          تصدير CSV
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-[#E8E0D5] p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-[#6B6B6B]">إجمالي الإيرادات</p>
              <p className="text-2xl font-bold text-green-600">{formatPrice(totalRevenue)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-[#E8E0D5] p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-[#6B6B6B]">عدد الطلبات</p>
              <p className="text-2xl font-bold text-blue-600">{totalOrders}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-[#E8E0D5] p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-[#6B6B6B]">متوسط الطلب</p>
              <p className="text-2xl font-bold text-purple-600">{formatPrice(avgOrderValue)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-[#E8E0D5] p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#C9A96E]/10 rounded-lg">
              <BarChart3 className="w-6 h-6 text-[#C9A96E]" />
            </div>
            <div>
              <p className="text-sm text-[#6B6B6B]">صافي الربح</p>
              <p className={`text-2xl font-bold ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatPrice(netProfit)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white rounded-xl border border-[#E8E0D5] p-6">
          <h3 className="font-bold text-[#1A1A1A] mb-4">المبيعات اليومية</h3>
          {reportData.daily.length > 0 && (
            <div className="flex items-end gap-1 h-32 mb-4 px-2">
              {(() => {
                const maxRevenue = Math.max(...reportData.daily.map(d => d.revenue), 1);
                return reportData.daily.slice(-14).map((day, i) => {
                  const heightPct = (day.revenue / maxRevenue) * 100;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 min-w-0">
                      <div
                        className="w-full bg-gradient-to-t from-[#C9A96E] to-[#D4AF37] rounded-t-md min-h-[4px] transition-all"
                        style={{ height: `${Math.max(heightPct, 3)}%` }}
                        title={`${day.date}: ${formatPrice(day.revenue)}`}
                      />
                    </div>
                  );
                });
              })()}
            </div>
          )}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F5F0E8]">
                <tr>
                  <th className="text-right px-4 py-2 text-sm">التاريخ</th>
                  <th className="text-center px-4 py-2 text-sm">الطلبات</th>
                  <th className="text-left px-4 py-2 text-sm">الإيرادات</th>
                </tr>
              </thead>
              <tbody>
                {reportData.daily.map((day, i) => (
                  <tr key={i} className="border-b border-[#E8E0D5]">
                    <td className="px-4 py-3">{new Date(day.date).toLocaleDateString('ar-SA')}</td>
                    <td className="px-4 py-3 text-center">{day.orders}</td>
                    <td className="px-4 py-3 text-left text-[#C9A96E] font-bold">{formatPrice(day.revenue)}</td>
                  </tr>
                ))}
                {reportData.daily.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-4 py-8 text-center text-[#6B6B6B]">
                      {isSupabaseConfigured ? 'لا توجد بيانات في هذه الفترة' : 'قاعدة البيانات غير مهيأة'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl border border-[#E8E0D5] p-6">
          <h3 className="font-bold text-[#1A1A1A] mb-4">الأكثر مبيعاً</h3>
          <div className="space-y-3">
            {reportData.topProducts.slice(0, 10).map((product, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-[#FAF8F5] rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-[#C9A96E] text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </span>
                  <span className="font-medium text-[#1A1A1A]">{product.name}</span>
                </div>
                <div className="text-left">
                  <span className="text-[#6B6B6B] text-sm">{product.quantity} units</span>
                  <span className="block text-[#C9A96E] font-bold">{formatPrice(product.revenue)}</span>
                </div>
              </div>
            ))}
            {reportData.topProducts.length === 0 && (
              <div className="text-center py-8 text-[#6B6B6B]">
                <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>لا توجد بيانات</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Orders by Status */}
      <div className="mt-6 bg-white rounded-xl border border-[#E8E0D5] p-6">
        <h3 className="font-bold text-[#1A1A1A] mb-4">الطلبات حسب الحالة</h3>
        {Object.keys(reportData.byStatus).length === 0 ? (
          <div className="py-8 text-center text-[#6B6B6B]">
            <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>{isSupabaseConfigured ? 'لا توجد طلبات في هذه الفترة' : 'قاعدة البيانات غير مهيأة'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(reportData.byStatus).map(([status, count]) => {
            const statusLabels: Record<string, string> = {
              pending: 'معلق',
              confirmed: 'مؤكد',
              preparing: 'قيد التجهيز',
              ready: 'جاهز',
              shipped: 'تم الشحن',
              delivered: 'مكتمل',
              cancelled: 'ملغي'
            };
            const statusColors: Record<string, string> = {
              pending: 'bg-yellow-100 text-yellow-700',
              confirmed: 'bg-blue-100 text-blue-700',
              preparing: 'bg-purple-100 text-purple-700',
              ready: 'bg-indigo-100 text-indigo-700',
              shipped: 'bg-cyan-100 text-cyan-700',
              delivered: 'bg-green-100 text-green-700',
              cancelled: 'bg-red-100 text-red-700'
            };
            return (
              <div key={status} className={`p-4 rounded-xl ${statusColors[status] || 'bg-gray-100'}`}>
                <p className="text-3xl font-bold">{count}</p>
                <p className="text-sm">{statusLabels[status] || status}</p>
              </div>
            );
          })}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}