import { useState, useEffect } from 'react';
import { Plus, Search, MessageCircle, Users, Phone, MapPin } from 'lucide-react';
import AdminLayout from './AdminLayout';
import { getCustomers, createCustomer } from '@/lib/db-operations';
import type { Customer } from '@/types/database';

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
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

  const filteredCustomers = customers.filter(c => 
    c.name.includes(search) || 
    c.phone.includes(search) ||
    c.area.includes(search)
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

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
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
            <div key={customer.id} className="bg-white rounded-xl border border-[#E8E0D5] p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-[#C9A96E] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{customer.name.charAt(0)}</span>
                </div>
                <a
                  href={`https://wa.me/965${customer.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-[#25D366] text-white rounded-lg hover:bg-[#20BD5A] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
              
              <h3 className="font-bold text-[#1A1A1A] mb-2">{customer.name}</h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-[#6B6B6B]">
                  <Phone className="w-4 h-4" />
                  <span dir="ltr">+965 {customer.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-[#6B6B6B]">
                  <MapPin className="w-4 h-4" />
                  <span>{customer.area}</span>
                </div>
              </div>
              
              <p className="text-sm text-[#6B6B6B] mt-3 line-clamp-2">{customer.address}</p>
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
    </AdminLayout>
  );
}