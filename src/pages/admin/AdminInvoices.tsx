import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Receipt, Eye, Download, Search, Plus } from 'lucide-react';
import { toast } from 'sonner';
import AdminLayout from './AdminLayout';
import { getInvoices, getOrder, Invoice } from '@/lib/db-operations';
import { downloadInvoicePDF } from '@/utils/pdfGenerator';

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

  const filteredInvoices = invoices.filter(inv => {
    const query = search.toLowerCase();
    return inv.invoice_number?.toLowerCase().includes(query) ||
      inv.order_number?.toLowerCase().includes(query) ||
      inv.customer_name?.toLowerCase().includes(query) ||
      inv.customer_id?.toLowerCase().includes(query);
  });

  const handleDownloadPDF = async (invoice: Invoice) => {
    if (!invoice.order_id) {
      toast.error('لا يوجد طلب مرتبط بهذه الفاتورة');
      return;
    }

    const order = await getOrder(invoice.order_id);
    if (!order) {
      toast.error('تعذر تحميل بيانات الطلب');
      return;
    }

    await downloadInvoicePDF({
      orderNumber: invoice.invoice_number,
      date: new Date(invoice.created_at || order.created_at).toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      customerName: order.customer_name || '',
      customerPhone: order.customer_phone || '',
      governorate: order.governorate || '',
      area: order.area || '',
      address: order.address || '',
      notes: order.notes || '',
      paymentMethod: order.payment_method,
      orderStatus: order.status,
      paymentStatus: order.payment_status || 'pending',
      paidAmount: order.paid_amount || 0,
      items: (order.order_items || []).map(item => ({
        nameAr: item.product_name_ar || item.name || 'منتج غير محدد',
        nameEn: item.product_name_en || item.name || '',
        quantity: Number(item.quantity) || 1,
        unitPrice: Number(item.unit_price) || 0,
        totalPrice: Number(item.total_price) || 0,
      })),
      subtotal: order.subtotal || 0,
      deliveryFee: order.delivery_fee || 0,
      total: order.total || 0,
    });
    toast.success('تم تحميل الفاتورة');
  };

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
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[#1A1A1A]">الفواتير</h2>
            <p className="text-[#6B6B6B]">نظام فواتير تسلسلي مرتبط بالطلبات</p>
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

      {/* Search */}
      <div className="bg-white rounded-xl border border-[#E8E0D5] p-4 mb-6">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B6B]" />
          <input
            type="text"
            placeholder="ابحث برقم الفاتورة أو رقم الطلب أو اسم العميل..."
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
          <div className="p-8 text-center text-[#6B6B6B]">
            <Receipt className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>لا توجد فواتير</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F5F0E8]">
                <tr>
                  <th className="text-right px-4 py-3 text-sm font-medium text-[#1A1A1A]">رقم الفاتورة</th>
                  <th className="text-right px-4 py-3 text-sm font-medium text-[#1A1A1A]">الطلب</th>
                  <th className="text-right px-4 py-3 text-sm font-medium text-[#1A1A1A]">العميل</th>
                  <th className="text-center px-4 py-3 text-sm font-medium text-[#1A1A1A]">تاريخ الإنشاء</th>
                  <th className="text-center px-4 py-3 text-sm font-medium text-[#1A1A1A]">الحالة</th>
                  <th className="text-center px-4 py-3 text-sm font-medium text-[#1A1A1A]">الدفع</th>
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
                        <p className="text-[#1A1A1A] font-medium">{invoice.order_number || 'غير محدد'}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-[#1A1A1A]">{invoice.customer_name || invoice.customer_id || 'غير محدد'}</p>
                      </td>
                      <td className="text-center px-4 py-4 text-[#6B6B6B]">{invoice.created_at?.split('T')[0]}</td>
                      <td className="text-center px-4 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${badge.color}`}>
                          {badge.label}
                        </span>
                      </td>
                      <td className="text-center px-4 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${invoice.payment_status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {invoice.payment_status === 'paid' ? 'مدفوعة' : 'غير مدفوعة'}
                        </span>
                      </td>
                      <td className="text-left px-4 py-4 text-[#C9A96E] font-bold">{invoice.total.toFixed(3)} د.ك</td>
                      <td className="text-center px-4 py-4">
                        <div className="flex items-center justify-center gap-2">
                          {invoice.order_id && <Link
                            to={`/admin/orders/${invoice.order_id}`}
                            className="p-2 text-[#6B6B6B] hover:text-[#C9A96E] transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>}
                          <button onClick={() => handleDownloadPDF(invoice)} className="p-2 text-[#6B6B6B] hover:text-[#C9A96E] transition-colors">
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
