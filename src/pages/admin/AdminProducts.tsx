import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit, Package, AlertTriangle, Database, AlertCircle, RefreshCw } from 'lucide-react';
import AdminLayout from './AdminLayout';
import { getProducts, updateProduct } from '@/lib/db-operations';
import { localProducts, type Product } from '@/data/products';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

type DbProduct = {
  id: string;
  name_ar: string;
  name_en: string;
  type?: string;
  price: number;
  cost_price?: number;
  stock_quantity?: number;
  min_stock_level?: number;
  sku?: string;
  images?: string[];
  specs?: Record<string, string>;
  features?: string[];
  is_active?: boolean;
};

const mapDbToLocal = (p: DbProduct): Product => ({
  id: p.id,
  name_ar: p.name_ar,
  name_en: p.name_en,
  type: p.type || 'devices',
  price: p.price,
  shortDescription: p.specs?.['الوصف'] || p.features?.[0] || '',
  fullDescription: p.features?.join(' | ') || '',
  specs: p.specs || {},
  features: p.features || [],
  image: p.images?.[0] || '',
  images: p.images || [],
});

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<'database' | 'local' | 'none'>('none');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'low' | 'out' | 'inactive'>('all');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    if (isSupabaseConfigured && supabase) {
      const data = await getProducts();
      if (data && data.length > 0) {
        setProducts(data.map(mapDbToLocal));
        setSource('database');
        setLoading(false);
        return;
      }
    }
    setProducts(localProducts);
    setSource('local');
    setLoading(false);
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch =
      p.name_ar.includes(search) ||
      p.name_en.toLowerCase().includes(search.toLowerCase());

    if (filter === 'low') return matchesSearch;
    if (filter === 'out') return matchesSearch;
    if (filter === 'inactive') return matchesSearch;
    return matchesSearch;
  });

  const lowStockCount = products.filter(p => {
    const stock = (p as DbProduct).stock_quantity ?? 0;
    const min = (p as DbProduct).min_stock_level ?? 5;
    return stock > 0 && stock <= min;
  }).length;
  const outOfStockCount = products.filter(p => ((p as DbProduct).stock_quantity ?? 0) === 0).length;

  const toggleProductStatus = async (product: Product) => {
    if (source !== 'database') return;
    const current = (product as DbProduct).is_active ?? true;
    await updateProduct(product.id, { is_active: !current });
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
          <div className="flex gap-2">
            <button
              onClick={loadProducts}
              className="flex items-center gap-2 bg-white border border-[#E8E0D5] hover:bg-[#F5F0E8] text-[#1A1A1A] px-4 py-2 rounded-lg transition-colors"
              title="تحديث"
            >
              <RefreshCw className="w-4 h-4" />
              تحديث
            </button>
            <Link
              to="/admin/products/new"
              className="flex items-center gap-2 bg-[#C9A96E] hover:bg-[#D4AF37] text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
              إضافة منتج
            </Link>
          </div>
        </div>
      </div>

      {source === 'local' && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-bold text-amber-900">وضع العرض المحلي</p>
            <p className="text-sm text-amber-800 mt-1">
              {!isSupabaseConfigured
                ? 'Supabase غير مهيأ — يتم عرض المنتجات من الملف المحلي. لإدارة كاملة، أضف بيانات Supabase في ملف .env ثم استخدم صفحة "إضافة المنتجات" لنقلها إلى قاعدة البيانات.'
                : 'قاعدة البيانات فارغة — يتم عرض المنتجات من الملف المحلي. استخدم صفحة "إضافة المنتجات" لنقلها إلى قاعدة البيانات.'}
            </p>
            <Link
              to="/admin/seed"
              className="inline-flex items-center gap-2 mt-3 text-sm font-medium text-amber-900 hover:text-amber-700"
            >
              <Database className="w-4 h-4" />
              الذهاب لصفحة إضافة المنتجات
            </Link>
          </div>
        </div>
      )}

      {source === 'database' && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
          <Database className="w-5 h-5 text-green-600" />
          <p className="text-sm text-green-800">
            متصل بـ Supabase — عرض مباشر من قاعدة البيانات ({products.length} منتج)
          </p>
        </div>
      )}

      <div className="bg-white rounded-xl border border-[#E8E0D5] p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B6B]" />
            <input
              type="text"
              placeholder="ابحث بالاسم..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pr-10 pl-4 py-2 bg-[#FAF8F5] border border-[#E8E0D5] rounded-lg text-[#1A1A1A] focus:outline-none focus:border-[#C9A96E]"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
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
              منخفض ({lowStockCount})
            </button>
            <button
              onClick={() => setFilter('out')}
              className={`px-4 py-2 rounded-lg transition-colors ${filter === 'out' ? 'bg-red-500 text-white' : 'bg-[#F5F0E8] text-[#6B6B6B] hover:bg-[#E8E0D5]'}`}
            >
              نفذ ({outOfStockCount})
            </button>
          </div>
        </div>
      </div>

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
                  <th className="text-center px-4 py-3 text-sm font-medium text-[#1A1A1A]">التصنيف</th>
                  <th className="text-center px-4 py-3 text-sm font-medium text-[#1A1A1A]">السعر</th>
                  {source === 'database' && (
                    <>
                      <th className="text-center px-4 py-3 text-sm font-medium text-[#1A1A1A]">التكلفة</th>
                      <th className="text-center px-4 py-3 text-sm font-medium text-[#1A1A1A]">المخزون</th>
                    </>
                  )}
                  <th className="text-center px-4 py-3 text-sm font-medium text-[#1A1A1A]">الحالة</th>
                  <th className="text-center px-4 py-3 text-sm font-medium text-[#1A1A1A]">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E0D5]">
                {filteredProducts.map((product) => {
                  const dbProduct = product as DbProduct;
                  const stockQuantity = dbProduct.stock_quantity ?? 999;
                  const minStock = dbProduct.min_stock_level ?? 5;
                  const isActive = dbProduct.is_active ?? true;

                  const stockBadge =
                    stockQuantity === 0
                      ? { label: 'نفذ', color: 'bg-red-100 text-red-700' }
                      : stockQuantity <= minStock
                        ? { label: 'منخفض', color: 'bg-orange-100 text-orange-700' }
                        : { label: 'متوفر', color: 'bg-green-100 text-green-700' };

                  const typeLabel =
                    product.type === 'devices'
                      ? 'أجهزة'
                      : product.type === 'gifts'
                        ? 'هدايا'
                        : product.type === 'diffusers'
                          ? 'معطرات'
                          : product.type || '-';

                  return (
                    <tr key={product.id} className="hover:bg-[#FAF8F5] transition-colors">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-[#F5F0E8] rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                            {product.image ? (
                              <img
                                src={product.image}
                                alt={product.name_ar}
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none';
                                }}
                              />
                            ) : (
                              <Package className="w-6 h-6 text-[#C9A96E]" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-[#1A1A1A] truncate">{product.name_ar}</p>
                            <p className="text-sm text-[#6B6B6B] truncate">{product.name_en}</p>
                          </div>
                        </div>
                      </td>
                      <td className="text-center px-4 py-4 text-[#6B6B6B]">{typeLabel}</td>
                      <td className="text-center px-4 py-4 text-[#C9A96E] font-bold">
                        {product.price.toFixed(3)} د.ك
                      </td>
                      {source === 'database' && (
                        <>
                          <td className="text-center px-4 py-4 text-[#6B6B6B]">
                            {dbProduct.cost_price?.toFixed(3) || '-'} د.ك
                          </td>
                          <td className="text-center px-4 py-4">
                            <span className="font-bold text-[#1A1A1A]">{stockQuantity}</span>
                          </td>
                        </>
                      )}
                      <td className="text-center px-4 py-4">
                        {source === 'database' ? (
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${stockBadge.color}`}>
                            {stockBadge.label}
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                            عرض فقط
                          </span>
                        )}
                      </td>
                      <td className="text-center px-4 py-4">
                        <div className="flex items-center justify-center gap-2">
                          {source === 'database' && (
                            <>
                              <Link
                                to={`/admin/products/${product.id}`}
                                className="p-2 text-[#6B6B6B] hover:text-[#C9A96E] transition-colors"
                                title="تعديل"
                              >
                                <Edit className="w-4 h-4" />
                              </Link>
                              <button
                                onClick={() => toggleProductStatus(product)}
                                className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                                  isActive
                                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                                }`}
                              >
                                {isActive ? 'مفعّل' : 'معطّل'}
                              </button>
                            </>
                          )}
                          {source === 'local' && (
                            <span className="text-xs text-[#6B6B6B]">—</span>
                          )}
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