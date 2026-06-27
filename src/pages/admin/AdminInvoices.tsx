import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Receipt, Eye, Download, Search, Plus, Printer, AlertCircle, Database, FileText, DollarSign, Clock, CheckCircle2 } from 'lucide-react';
import AdminLayout from './AdminLayout';
import { getInvoices, Invoice } from '@/lib/db-operations';
import { isSupabaseConfigured } from '@/lib/supabase';
import { formatPrice } from '@/data/products';

export default function AdminInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    setLoading(true);
    const data = await getInvoices();
    setInvoices(data);
    setLoading(false);
  };

  const filteredInvoices = invoices.filter(inv =>
    inv.invoice_number?.toLowerCase().includes(search.toLowerCase()) ||
    inv.customer_id?.toLowerCase().includes(search.toLowerCase())
  );

  const totalAmount = invoices.reduce((sum, inv) => sum + (inv.total || 0), 0);
  const paidCount = invoices.filter(inv => inv.status === 'paid').length;
  const pendingCount = invoices.filter(inv => ['draft', 'sent', 'viewed'].includes(inv.status)).length;

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { label: string; color: string }> = {
      draft: { label: 'مسودة', color: 'bg-gray-100 text-gray-700' },
      sent: { label: 'تم الإرسال', color: 'bg-blue-100 text-blue-700' },
      viewed: { label: 'تم المشاهدة', color: 'bg-yellow-100 text-yellow-700' },
      paid: { label: 'مدفوعة', color: 'bg-green-100 text-green-700' },
      cancelled: { label: 'ملغاة', color: 'bg-red-100 text-red-700' },
      void: { label: 'ملغاة', color: 'bg-gray-200 text-gray-600' },
    };
    return badges[status] || { label: status, color: 'bg-gray-100 text-gray-700' };
  };

  return (
    <AdminLayout>
      {!isSupabaseConfigured && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-bold text-amber-900">قاعدة البيانات غير مهيأة</p>
            <p className="text-sm text-amber-800 mt-1">
              Supabase غير مهيأ. لا يمكن إنشاء أو عرض الفواتير. أضف VITE_SUPABASE_URL و VITE_SUPABASE_ANON_KEY في ملف .env ثم أعد تشغيل التطبيق.
            </p>
          </div>
        </div>
      )}

      <div className="mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[#1A1A1A]">الفواتير</h2>
            <p className="text-[#6B6B6B]">إدارة وطباعة الفواتير</p>
          </div>
          <Link
            to="/admin/invoices/new"
            className="flex items-center gap-2 bg-[#C9A96E] hover:bg-[#D4AF37] text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            إنشاء فاتورة
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-[#E8E0D5] p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#C9A96E]/10 rounded-lg">
              <FileText className="w-6 h-6 text-[#C9A96E]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1A1A1A]">{invoices.length}</p>
              <p className="text-sm text-[#6B6B6B]">إجمالي الفواتير</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-[#E8E0D5] p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1A1A1A]">{paidCount}</p>
              <p className="text-sm text-[#6B6B6B]">مدفوعة</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-[#E8E0D5] p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1A1A1A]">{pendingCount}</p>
              <p className="text-sm text-[#6B6B6B]">قيد الانتظار</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-[#E8E0D5] p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1A1A1A]">{formatPrice(totalAmount)}</p>
              <p className="text-sm text-[#6B6B6B]">إجمالي المبالغ</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-[#E8E0D5] p-4 mb-6">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B6B]" />
          <input
            type="text"
            placeholder="ابحث برقم الفاتورة أو رقم العميل..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pr-10 pl-4 py-2 bg-[#FAF8F5] border border-[#E8E0D5] rounded-lg text-[#1A1A1A] focus:outline-none focus:border-[#C9A96E]"
          />
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-xl border border-[#E8E0D5] overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-[#6B6B6B]">جاري التحميل...</div>
        ) : filteredInvoices.length === 0 ? (
          <div className="p-12 text-center text-[#6B6B6B]">
            {isSupabaseConfigured ? (
              <>
                <Receipt className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium text-[#1A1A1A]">لا توجد فواتير بعد</p>
                <p className="text-sm mt-2 mb-4">قم بإنشاء أول فاتورة من زر "إنشاء فاتورة" أعلاه.</p>
                <Link
                  to="/admin/invoices/new"
                  className="inline-flex items-center gap-2 bg-[#C9A96E] hover:bg-[#D4AF37] text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  إنشاء فاتورة جديدة
                </Link>
              </>
            ) : (
              <>
                <Database className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium text-[#1A1A1A]">قاعدة البيانات غير مهيأة</p>
                <p className="text-sm mt-2">قم بتهيئة Supabase في ملف .env لعرض وإنشاء الفواتير.</p>
              </>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F5F0E8]">
                <tr>
                  <th className="text-right px-4 py-3 text-sm font-medium text-[#1A1A1A]">رقم الفاتورة</th>
                  <th className="text-right px-4 py-3 text-sm font-medium text-[#1A1A1A]">رقم العميل</th>
                  <th className="text-center px-4 py-3 text-sm font-medium text-[#1A1A1A]">تاريخ الإنشاء</th>
                  <th className="text-center px-4 py-3 text-sm font-medium text-[#1A1A1A]">الحالة</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-[#1A1A1A]">الإجمالي</th>
                  <th className="text-center px-4 py-3 text-sm font-medium text-[#1A1A1A]">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E0D5]">
                {filteredInvoices.map(invoice => {
                  const badge = getStatusBadge(invoice.status);
                  return (
                    <tr key={invoice.id} className="hover:bg-[#FAF8F5] transition-colors">
                      <td className="px-4 py-4 font-mono text-[#C9A96E] font-bold">{invoice.invoice_number}</td>
                      <td className="px-4 py-4">
                        <p className="text-[#1A1A1A]">{invoice.customer_id || 'غير محدد'}</p>
                      </td>
                      <td className="text-center px-4 py-4 text-[#6B6B6B]">{invoice.created_at?.split('T')[0]}</td>
                      <td className="text-center px-4 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${badge.color}`}>
                          {badge.label}
                        </span>
                      </td>
                      <td className="text-left px-4 py-4 text-[#C9A96E] font-bold">{formatPrice(invoice.total)}</td>
                      <td className="text-center px-4 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            to={`/admin/invoices/${invoice.id}`}
                            className="p-2 text-[#6B6B6B] hover:text-[#C9A96E] transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button className="p-2 text-[#6B6B6B] hover:text-[#C9A96E] transition-colors">
                            <Printer className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-[#6B6B6B] hover:text-[#C9A96E] transition-colors">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}