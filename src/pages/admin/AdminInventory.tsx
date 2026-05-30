import { useState, useEffect } from 'react';
import { Warehouse, AlertTriangle, ArrowUpDown, Package } from 'lucide-react';
import AdminLayout from './AdminLayout';
import { getProducts } from '@/lib/db-operations';
import type { Product } from '@/types/database';

export default function AdminInventory() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'stock' | 'name'>('stock');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const data = await getProducts();
    setProducts(data);
    setLoading(false);
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'stock') return a.stock_quantity - b.stock_quantity;
    return a.name_ar.localeCompare(b.name_ar);
  });

  const lowStock = products.filter(p => p.stock_quantity <= p.min_stock_level);
  const outOfStock = products.filter(p => p.stock_quantity === 0);
  const totalValue = products.reduce((sum, p) => sum + (p.stock_quantity * p.cost_price), 0);

  const getStatusColor = (product: Product) => {
    if (product.stock_quantity === 0) return 'bg-red-100 text-red-700 border-red-200';
    if (product.stock_quantity <= product.min_stock_level) return 'bg-orange-100 text-orange-700 border-orange-200';
    return 'bg-green-100 text-green-700 border-green-200';
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#1A1A1A]">إدارة المخزون</h2>
        <p className="text-[#6B6B6B]">تتبع ومراقبة مستويات المخزون</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-[#E8E0D5] p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#C9A96E]/10 rounded-lg">
              <Warehouse className="w-6 h-6 text-[#C9A96E]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1A1A1A]">{products.length}</p>
              <p className="text-sm text-[#6B6B6B]">إجمالي المنتجات</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-[#E8E0D5] p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1A1A1A]">{lowStock.length}</p>
              <p className="text-sm text-[#6B6B6B]">منتجات منخفضة</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-[#E8E0D5] p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <Package className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1A1A1A]">{outOfStock.length}</p>
              <p className="text-sm text-[#6B6B6B]">منتجات نفدت</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-[#E8E0D5] p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <span className="text-2xl">💰</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1A1A1A]">{totalValue.toFixed(3)} د.ك</p>
              <p className="text-sm text-[#6B6B6B]">قيمة المخزون</p>
            </div>
          </div>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStock.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 text-orange-700 mb-2">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-bold">تنبيه: منتجات تحتاج إعادة تعبئة</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {lowStock.map(p => (
              <span key={p.id} className="bg-white px-3 py-1 rounded-full text-sm border border-orange-200">
                {p.name_ar} ({p.stock_quantity})
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Inventory Table */}
      <div className="bg-white rounded-xl border border-[#E8E0D5] overflow-hidden">
        <div className="p-4 border-b border-[#E8E0D5] flex items-center justify-between">
          <h3 className="font-bold text-[#1A1A1A]">تفاصيل المخزون</h3>
          <button
            onClick={() => setSortBy(sortBy === 'stock' ? 'name' : 'stock')}
            className="flex items-center gap-2 text-[#C9A96E] hover:text-[#D4AF37] transition-colors"
          >
            <ArrowUpDown className="w-4 h-4" />
            ترتيب حسب {sortBy === 'stock' ? 'الاسم' : 'المخزون'}
          </button>
        </div>

        {loading ? (
          <div className="p-8 text-center text-[#6B6B6B]">جاري التحميل...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F5F0E8]">
                <tr>
                  <th className="text-right px-4 py-3 text-sm font-medium text-[#1A1A1A]">المنتج</th>
                  <th className="text-center px-4 py-3 text-sm font-medium text-[#1A1A1A]">الكمية الحالية</th>
                  <th className="text-center px-4 py-3 text-sm font-medium text-[#1A1A1A]">الحد الأدنى</th>
                  <th className="text-center px-4 py-3 text-sm font-medium text-[#1A1A1A]">الحالة</th>
                  <th className="text-center px-4 py-3 text-sm font-medium text-[#1A1A1A]">القيمة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E0D5]">
                {sortedProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="px-4 py-4">
                      <p className="font-medium text-[#1A1A1A]">{product.name_ar}</p>
                      <p className="text-sm text-[#6B6B6B]">{product.name_en}</p>
                    </td>
                    <td className="text-center px-4 py-4">
                      <span className={`text-xl font-bold ${product.stock_quantity <= product.min_stock_level ? 'text-red-500' : 'text-[#1A1A1A]'}`}>
                        {product.stock_quantity}
                      </span>
                    </td>
                    <td className="text-center px-4 py-4 text-[#6B6B6B]">{product.min_stock_level}</td>
                    <td className="text-center px-4 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(product)}`}>
                        {product.stock_quantity === 0 ? 'نفذ' : 
                         product.stock_quantity <= product.min_stock_level ? 'منخفض' : 'متوفر'}
                      </span>
                    </td>
                    <td className="text-center px-4 py-4 text-[#6B6B6B]">
                      {(product.stock_quantity * (product.cost_price || 0)).toFixed(3)} د.ك
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}