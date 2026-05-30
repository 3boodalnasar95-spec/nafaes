import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit, Trash2, Package, AlertTriangle } from 'lucide-react';
import AdminLayout from './AdminLayout';
import { getProducts, updateProduct } from '@/lib/db-operations';
import type { Product } from '@/types/database';

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'low' | 'out'>('all');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const data = await getProducts();
    setProducts(data);
    setLoading(false);
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = 
      p.name_ar.includes(search) || 
      p.name_en.toLowerCase().includes(search.toLowerCase()) ||
      p.sku?.includes(search);
    
    if (filter === 'low') return matchesSearch && p.stock_quantity <= p.min_stock_level && p.stock_quantity > 0;
    if (filter === 'out') return matchesSearch && p.stock_quantity === 0;
    return matchesSearch;
  });

  const getStockStatus = (product: Product) => {
    if (product.stock_quantity === 0) return { label: 'نفذ', color: 'bg-red-100 text-red-700' };
    if (product.stock_quantity <= product.min_stock_level) return { label: 'منخفض', color: 'bg-orange-100 text-orange-700' };
    return { label: 'متوفر', color: 'bg-green-100 text-green-700' };
  };

  const toggleProductStatus = async (product: Product) => {
    await updateProduct(product.id, { is_active: !product.is_active });
    loadProducts();
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[#1A1A1A]">المنتجات</h2>
            <p className="text-[#6B6B6B]">إدارة منتجات المتجر والمخزون</p>
          </div>
          <Link
            to="/admin/products/new"
            className="flex items-center gap-2 bg-[#C9A96E] hover:bg-[#D4AF37] text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            إضافة منتج
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-[#E8E0D5] p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B6B]" />
            <input
              type="text"
              placeholder="ابحث بالاسم أو SKU..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pr-10 pl-4 py-2 bg-[#FAF8F5] border border-[#E8E0D5] rounded-lg text-[#1A1A1A] focus:outline-none focus:border-[#C9A96E]"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${filter === 'all' ? 'bg-[#C9A96E] text-white' : 'bg-[#F5F0E8] text-[#6B6B6B] hover:bg-[#E8E0D5]'}`}
            >
              الكل ({products.length})
            </button>
            <button
              onClick={() => setFilter('low')}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-1 ${filter === 'low' ? 'bg-orange-500 text-white' : 'bg-[#F5F0E8] text-[#6B6B6B] hover:bg-[#E8E0D5]'}`}
            >
              <AlertTriangle className="w-4 h-4" />
              منخفض
            </button>
            <button
              onClick={() => setFilter('out')}
              className={`px-4 py-2 rounded-lg transition-colors ${filter === 'out' ? 'bg-red-500 text-white' : 'bg-[#F5F0E8] text-[#6B6B6B] hover:bg-[#E8E0D5]'}`}
            >
              نفد
            </button>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-[#E8E0D5] overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-[#6B6B6B]">جاري التحميل...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-8 text-center text-[#6B6B6B]">
            <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>لا توجد منتجات</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F5F0E8]">
                <tr>
                  <th className="text-right px-4 py-3 text-sm font-medium text-[#1A1A1A]">المنتج</th>
                  <th className="text-center px-4 py-3 text-sm font-medium text-[#1A1A1A]">SKU</th>
                  <th className="text-center px-4 py-3 text-sm font-medium text-[#1A1A1A]">السعر</th>
                  <th className="text-center px-4 py-3 text-sm font-medium text-[#1A1A1A]">التكلفة</th>
                  <th className="text-center px-4 py-3 text-sm font-medium text-[#1A1A1A]">المخزون</th>
                  <th className="text-center px-4 py-3 text-sm font-medium text-[#1A1A1A]">الحالة</th>
                  <th className="text-center px-4 py-3 text-sm font-medium text-[#1A1A1A]">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E0D5]">
                {filteredProducts.map((product) => {
                  const stockStatus = getStockStatus(product);
                  return (
                    <tr key={product.id} className="hover:bg-[#FAF8F5] transition-colors">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-[#F5F0E8] rounded-lg flex items-center justify-center overflow-hidden">
                            {product.images?.[0] ? (
                              <img src={product.images[0]} alt={product.name_ar} className="w-full h-full object-contain" />
                            ) : (
                              <Package className="w-6 h-6 text-[#C9A96E]" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-[#1A1A1A]">{product.name_ar}</p>
                            <p className="text-sm text-[#6B6B6B]">{product.name_en}</p>
                          </div>
                        </div>
                      </td>
                      <td className="text-center px-4 py-4 text-[#6B6B6B] font-mono">{product.sku || '-'}</td>
                      <td className="text-center px-4 py-4 text-[#C9A96E] font-bold">{product.price.toFixed(3)} د.ك</td>
                      <td className="text-center px-4 py-4 text-[#6B6B6B]">{product.cost_price?.toFixed(3) || '-'} د.ك</td>
                      <td className="text-center px-4 py-4">
                        <span className="font-bold text-[#1A1A1A]">{product.stock_quantity}</span>
                      </td>
                      <td className="text-center px-4 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}>
                          {stockStatus.label}
                        </span>
                      </td>
                      <td className="text-center px-4 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            to={`/admin/products/${product.id}`}
                            className="p-2 text-[#6B6B6B] hover:text-[#C9A96E] transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => toggleProductStatus(product)}
                            className={`p-2 transition-colors ${product.is_active ? 'text-green-500 hover:text-green-600' : 'text-red-500 hover:text-red-600'}`}
                          >
                            {product.is_active ? '✓' : '✗'}
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