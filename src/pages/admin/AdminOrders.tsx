import { useState } from 'react';
import { Search, Eye, Check, X, Truck, Package } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Order } from '../../data/products';

const statusOptions: { value: Order['status']; label: string; color: string }[] = [
  { value: 'pending', label: 'معلق', color: 'bg-yellow-500/20 text-yellow-400' },
  { value: 'processing', label: 'قيد المعالجة', color: 'bg-blue-500/20 text-blue-400' },
  { value: 'shipped', label: 'تم الشحن', color: 'bg-purple-500/20 text-purple-400' },
  { value: 'delivered', label: 'تم التوصيل', color: 'bg-green-500/20 text-green-400' },
  { value: 'cancelled', label: 'ملغي', color: 'bg-red-500/20 text-red-400' },
];

export default function AdminOrders() {
  const { orders, updateOrderStatus, users, products } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((o) =>
    o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    users.find((u) => u.id === o.userId)?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStatusChange = (orderId: string, status: Order['status']) => {
    updateOrderStatus(orderId, status);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="البحث عن طلب..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-10 pl-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-slate-400">إجمالي الطلبات: <span className="text-white font-bold">{orders.length}</span></span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/50">
              <tr>
                <th className="text-right px-6 py-3 text-xs font-medium text-slate-400 uppercase">رقم الطلب</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-slate-400 uppercase">العميل</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-slate-400 uppercase">المنتجات</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-slate-400 uppercase">الإجمالي</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-slate-400 uppercase">الحالة</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-slate-400 uppercase">التاريخ</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-slate-400 uppercase">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredOrders.map((order) => {
                const user = users.find((u) => u.id === order.userId);
                return (
                  <tr key={order.id} className="hover:bg-slate-800/50">
                    <td className="px-6 py-4 text-white font-medium">{order.id}</td>
                    <td className="px-6 py-4">
                      <div className="text-white">{user?.name || 'عميل'}</div>
                      <div className="text-slate-500 text-sm">{order.phone}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-400">
                      {order.items.length} منتج
                    </td>
                    <td className="px-6 py-4 text-white font-medium">{order.total.toLocaleString()} ر.س</td>
                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                        className={`px-3 py-1 rounded-full text-xs font-medium border-0 focus:ring-2 focus:ring-blue-500 ${
                          statusOptions.find((s) => s.value === order.status)?.color || ''
                        } bg-transparent`}
                        style={{
                          backgroundColor: order.status === 'pending' ? 'rgba(234, 179, 8, 0.2)' :
                            order.status === 'processing' ? 'rgba(59, 130, 246, 0.2)' :
                            order.status === 'shipped' ? 'rgba(139, 92, 246, 0.2)' :
                            order.status === 'delivered' ? 'rgba(16, 185, 129, 0.2)' :
                            'rgba(239, 68, 68, 0.2)',
                          color: order.status === 'pending' ? '#EAB308' :
                            order.status === 'processing' ? '#3B82F6' :
                            order.status === 'shipped' ? '#8B5CF6' :
                            order.status === 'delivered' ? '#10B981' :
                            '#EF4444'
                        }}
                      >
                        {statusOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-sm">{order.createdAt}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-800">
              <h3 className="text-lg font-semibold text-white">تفاصيل الطلب {selectedOrder.id}</h3>
              <button onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Order Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-400 text-sm mb-1">العميل</p>
                  <p className="text-white">{users.find((u) => u.id === selectedOrder.userId)?.name || 'عميل'}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">الهاتف</p>
                  <p className="text-white">{selectedOrder.phone}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-slate-400 text-sm mb-1">العنوان</p>
                  <p className="text-white">{selectedOrder.address}</p>
                </div>
              </div>

              {/* Products */}
              <div>
                <p className="text-white font-medium mb-3">المنتجات</p>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-4 bg-slate-800/50 rounded-lg p-3">
                      <img src={item.product.image} alt={item.product.name} className="w-16 h-16 rounded-lg object-cover" />
                      <div className="flex-1">
                        <p className="text-white font-medium">{item.product.name}</p>
                        <p className="text-slate-400 text-sm">الكمية: {item.quantity}</p>
                      </div>
                      <p className="text-blue-400 font-medium">{(item.product.price * item.quantity).toLocaleString()} ر.س</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <span className="text-white font-bold text-lg">الإجمالي</span>
                <span className="text-blue-400 font-bold text-2xl">{selectedOrder.total.toLocaleString()} ر.س</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}