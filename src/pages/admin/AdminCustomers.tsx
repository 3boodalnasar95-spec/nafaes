import { useState, useEffect } from 'react';
import { Plus, Search, MessageCircle, Users, Phone, MapPin, Eye, ShoppingCart, DollarSign, Star } from 'lucide-react';
import AdminLayout from './AdminLayout';
import { getCustomers, createCustomer, getCustomerStats } from '@/lib/db-operations';
import { formatPrice } from '@/data';
import type { Customer } from '@/types/database';

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customerStats, setCustomerStats] = useState<{
    totalOrders: number;
    totalSpent: number;
    avgOrderValue: number;
    lastOrder: string | null;
    ordersByStatus: Record<string, number>;
  } | null>(null);
  const [newCustomer, setNewCustomer] = useState({ name: '', phone: '', area: '', address: '' });

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    setLoading(true);
    const data = await getCustomers();
    setCustomers(data);
    setLoading(false);
  };

  const handleAddCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    await createCustomer(newCustomer);
    setNewCustomer({ name: '', phone: '', area: '', address: '' });
    setShowAddModal(false);
    loadCustomers();
  };

  const viewCustomerDetails = async (customer: Customer) => {
    setSelectedCustomer(customer);
    const stats = await getCustomerStats(customer.id);
    setCustomerStats(stats);
  };

  const filteredCustomers = customers.filter(c => 
    c.name.includes(search) || 
    c.phone.includes(search) ||
    c.area?.includes(search)
  );

  return (
    <AdminLayout>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[#1A1A1A]">العملاء</h2>
            <p className="text-[#6B6B6B]">قاعدة بيانات العملاء</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-[#C9A96E] hover:bg-[#D4AF37] text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            إضافة عميل
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-[#E8E0D5] p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#C9A96E]/10 rounded-lg">
              <Users className="w-6 h-6 text-[#C9A96E]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1A1A1A]">{customers.length}</p>
              <p className="text-sm text-[#6B6B6B]">إجمالي العملاء</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-[#E8E0D5] p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1A1A1A]">
                {customers.reduce((sum, c) => sum + c.total_orders, 0)}
              </p>
              <p className="text-sm text-[#6B6B6B]">إجمالي الطلبات</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-[#E8E0D5] p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1A1A1A]">
                {formatPrice(customers.reduce((sum, c) => sum + c.total_spent, 0))}
              </p>
              <p className="text-sm text-[#6B6B6B]">إجمالي الإنفاق</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-[#E8E0D5] p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Star className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1A1A1A]">
                {customers.reduce((sum, c) => sum + c.loyalty_points, 0)}
              </p>
              <p className="text-sm text-[#6B6B6B]">نقاط الولاء</p>
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
            placeholder="ابحث بالاسم أو الهاتف أو المنطقة..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pr-10 pl-4 py-2 bg-[#FAF8F5] border border-[#E8E0D5] rounded-lg text-[#1A1A1A] focus:outline-none focus:border-[#C9A96E]"
          />
        </div>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full text-center py-8 text-[#6B6B6B]">جاري التحميل...</div>
        ) : filteredCustomers.length === 0 ? (
          <div className="col-span-full text-center py-8 text-[#6B6B6B]">
            <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>لا يوجد عملاء</p>
          </div>
        ) : (
          filteredCustomers.map(customer => (
            <div key={customer.id} className="bg-white rounded-xl border border-[#E8E0D5] p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#C9A96E] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{customer.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1A1A1A]">{customer.name}</h3>
                    {customer.is_vip && (
                      <span className="text-xs bg-[#C9A96E]/10 text-[#C9A96E] px-2 py-0.5 rounded-full">VIP</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => viewCustomerDetails(customer)}
                  className="p-2 text-[#6B6B6B] hover:text-[#C9A96E] transition-colors"
                >
                  <Eye className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-2 text-sm mb-4">
                <div className="flex items-center gap-2 text-[#6B6B6B]">
                  <Phone className="w-4 h-4" />
                  <span dir="ltr">+965 {customer.phone}</span>
                </div>
                {customer.area && (
                  <div className="flex items-center gap-2 text-[#6B6B6B]">
                    <MapPin className="w-4 h-4" />
                    <span>{customer.area}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#E8E0D5]">
                <div className="text-center">
                  <p className="text-lg font-bold text-[#1A1A1A]">{customer.total_orders}</p>
                  <p className="text-xs text-[#6B6B6B]">طلبات</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-[#C9A96E]">{formatPrice(customer.total_spent)}</p>
                  <p className="text-xs text-[#6B6B6B]">أنفق</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-orange-500">{customer.loyalty_points}</p>
                  <p className="text-xs text-[#6B6B6B]">نقاط</p>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <a
                  href={`https://wa.me/965${customer.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-2 rounded-lg hover:bg-[#20BD5A] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  واتساب
                </a>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">إضافة عميل جديد</h3>
            <form onSubmit={handleAddCustomer} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-1">الاسم</label>
                <input
                  type="text"
                  required
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                  className="w-full px-4 py-2 bg-[#FAF8F5] border border-[#E8E0D5] rounded-lg focus:outline-none focus:border-[#C9A96E]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-1">رقم الهاتف</label>
                <input
                  type="tel"
                  required
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                  className="w-full px-4 py-2 bg-[#FAF8F5] border border-[#E8E0D5] rounded-lg focus:outline-none focus:border-[#C9A96E]"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-1">المنطقة</label>
                <input
                  type="text"
                  required
                  value={newCustomer.area}
                  onChange={(e) => setNewCustomer({ ...newCustomer, area: e.target.value })}
                  className="w-full px-4 py-2 bg-[#FAF8F5] border border-[#E8E0D5] rounded-lg focus:outline-none focus:border-[#C9A96E]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-1">العنوان</label>
                <textarea
                  required
                  value={newCustomer.address}
                  onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                  className="w-full px-4 py-2 bg-[#FAF8F5] border border-[#E8E0D5] rounded-lg focus:outline-none focus:border-[#C9A96E] resize-none"
                  rows={2}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-[#C9A96E] hover:bg-[#D4AF37] text-white py-2 rounded-lg transition-colors"
                >
                  إضافة
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-[#F5F0E8] text-[#1A1A1A] py-2 rounded-lg hover:bg-[#E8E0D5] transition-colors"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Customer Details Modal */}
      {selectedCustomer && customerStats && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#C9A96E] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">{selectedCustomer.name.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1A1A1A]">{selectedCustomer.name}</h3>
                  {selectedCustomer.is_vip && (
                    <span className="text-sm bg-[#C9A96E]/10 text-[#C9A96E] px-2 py-0.5 rounded-full">عميل VIP</span>
                  )}
                </div>
              </div>
              <button
                onClick={() => { setSelectedCustomer(null); setCustomerStats(null); }}
                className="text-[#6B6B6B] hover:text-[#1A1A1A]"
              >
                ✕
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-green-50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-green-600">{customerStats.totalOrders}</p>
                <p className="text-sm text-[#6B6B6B]">إجمالي الطلبات</p>
              </div>
              <div className="bg-[#C9A96E]/10 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-[#C9A96E]">{formatPrice(customerStats.totalSpent)}</p>
                <p className="text-sm text-[#6B6B6B]">إجمالي الإنفاق</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-purple-600">{formatPrice(customerStats.avgOrderValue)}</p>
                <p className="text-sm text-[#6B6B6B]">متوسط الطلب</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}