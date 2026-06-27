import { useState, useEffect } from 'react';
import { Warehouse, AlertTriangle, ArrowUpDown, Package, Plus, Minus, TrendingUp, TrendingDown, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { getProducts, logInventoryChange, getInventoryLogs, Product } from '@/lib/db-operations';
import { isSupabaseConfigured } from '@/lib/supabase';
import { formatPrice } from '@/data/products';

export default function AdminInventory() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'stock' | 'name' | 'value'>('stock');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [inventoryLogs, setInventoryLogs] = useState<any[]>([]);
  const [showAdjustmentModal, setShowAdjustmentModal] = useState(false);
  const [adjustmentType, setAdjustmentType] = useState<'in' | 'out' | 'adjustment'>('in');
  const [adjustmentQty, setAdjustmentQty] = useState('');
  const [adjustmentReason, setAdjustmentReason] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const data = await getProducts();
    setProducts(data);
    setLoading(false);
  };

  const loadInventoryLogs = async (productId: string) => {
    const logs = await getInventoryLogs(productId);
    setInventoryLogs(logs);
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'stock') return a.stock_quantity - b.stock_quantity;
    if (sortBy === 'value') return (a.stock_quantity * a.cost_price) - (b.stock_quantity * b.cost_price);
    return a.name_ar.localeCompare(b.name_ar);
  });

  const lowStock = products.filter(p => p.stock_quantity <= p.min_stock_level);
  const outOfStock = products.filter(p => p.stock_quantity === 0);
  const totalValue = products.reduce((sum, p) => sum + (p.stock_quantity * p.cost_price), 0);
  const totalStock = products.reduce((sum, p) => sum + p.stock_quantity, 0);

  const getStatusColor = (product: Product) => {
    if (product.stock_quantity === 0) return 'bg-red-100 text-red-700 border-red-200';
    if (product.stock_quantity <= product.min_stock_level) return 'bg-orange-100 text-orange-700 border-orange-200';
    return 'bg-green-100 text-green-700 border-green-200';
  };

  const openAdjustmentModal = (product: Product, type: 'in' | 'out' | 'adjustment') => {
    setSelectedProduct(product);
    setAdjustmentType(type);
    setAdjustmentQty('');
    setAdjustmentReason('');
    loadInventoryLogs(product.id);
    setShowAdjustmentModal(true);
  };

  const handleAdjustment = async () => {
    if (!selectedProduct || !adjustmentQty || !adjustmentReason) return;
    
    await logInventoryChange(
      selectedProduct.id,
      adjustmentType,
      parseInt(adjustmentQty),
      adjustmentReason
    );
    
    setShowAdjustmentModal(false);
    setSelectedProduct(null);
    loadProducts();
  };

  return (
    <AdminLayout>
      {!isSupabaseConfigured && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-bold text-amber-900">قاعدة البيانات غير مهيأة</p>
            <p className="text-sm text-amber-800 mt-1">
              Supabase غير مهيأ. لا توجد بيانات مخزون لعرضها. أضف VITE_SUPABASE_URL و VITE_SUPABASE_ANON_KEY في ملف .env ثم استخدم صفحة "إضافة المنتجات" لنقل المنتجات إلى قاعدة البيانات.
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

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#1A1A1A]">إدارة المخزون</h2>
        <p className="text-[#6B6B6B]">تتبع ومراقبة مستويات المخزون</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
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
              <TrendingDown className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1A1A1A]">{totalStock}</p>
              <p className="text-sm text-[#6B6B6B]">إجمالي المخزون</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-[#E8E0D5] p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1A1A1A]">{formatPrice(totalValue)}</p>
              <p className="text-sm text-[#6B6B6B]">قيمة المخزون</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-[#E8E0D5] p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-500">{lowStock.length}</p>
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
              <p className="text-2xl font-bold text-red-500">{outOfStock.length}</p>
              <p className="text-sm text-[#6B6B6B]">منتجات نفدت</p>
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
              <span key={p.id} className="bg-white px-3 py-1 rounded-full text-sm border border-orange-200 flex items-center gap-2">
                {p.name_ar}
                <span className="font-bold text-red-500">({p.stock_quantity})</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Inventory Table */}
      <div className="bg-white rounded-xl border border-[#E8E0D5] overflow-hidden">
        <div className="p-4 border-b border-[#E8E0D5] flex items-center justify-between flex-wrap gap-4">
          <h3 className="font-bold text-[#1A1A1A]">تفاصيل المخزون</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy('stock')}
              className={`px-3 py-1 rounded-lg text-sm transition-colors ${sortBy === 'stock' ? 'bg-[#C9A96E] text-white' : 'bg-[#F5F0E8] text-[#6B6B6B]'}`}
            >
              حسب المخزون
            </button>
            <button
              onClick={() => setSortBy('value')}
              className={`px-3 py-1 rounded-lg text-sm transition-colors ${sortBy === 'value' ? 'bg-[#C9A96E] text-white' : 'bg-[#F5F0E8] text-[#6B6B6B]'}`}
            >
              حسب القيمة
            </button>
            <button
              onClick={() => setSortBy('name')}
              className={`px-3 py-1 rounded-lg text-sm transition-colors ${sortBy === 'name' ? 'bg-[#C9A96E] text-white' : 'bg-[#F5F0E8] text-[#6B6B6B]'}`}
            >
              حسب الاسم
            </button>
          </div>
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
                  <th className="text-center px-4 py-3 text-sm font-medium text-[#1A1A1A]">سعر التكلفة</th>
                  <th className="text-center px-4 py-3 text-sm font-medium text-[#1A1A1A]">القيمة</th>
                  <th className="text-center px-4 py-3 text-sm font-medium text-[#1A1A1A]">الحالة</th>
                  <th className="text-center px-4 py-3 text-sm font-medium text-[#1A1A1A]">إجراءات</th>
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
                    <td className="text-center px-4 py-4 text-[#6B6B6B]">{formatPrice(product.cost_price)}</td>
                    <td className="text-center px-4 py-4 text-[#C9A96E] font-bold">
                      {formatPrice(product.stock_quantity * product.cost_price)}
                    </td>
                    <td className="text-center px-4 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(product)}`}>
                        {product.stock_quantity === 0 ? 'نفذ' : 
                         product.stock_quantity <= product.min_stock_level ? 'منخفض' : 'متوفر'}
                      </span>
                    </td>
                    <td className="text-center px-4 py-4">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => openAdjustmentModal(product, 'in')}
                          className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                          title="إضافة مخزون"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openAdjustmentModal(product, 'out')}
                          className="p-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-colors"
                          title="إخراج مخزون"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openAdjustmentModal(product, 'adjustment')}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                          title="تسوية مخزون"
                        >
                          <ArrowUpDown className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Stock Adjustment Modal */}
      {showAdjustmentModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">
              {adjustmentType === 'in' ? 'إضافة مخزون' : adjustmentType === 'out' ? 'إخراج مخزون' : 'تسوية مخزون'}
            </h3>
            
            {/* Product Info */}
            <div className="bg-[#FAF8F5] rounded-xl p-4 mb-6">
              <p className="font-bold text-[#1A1A1A]">{selectedProduct.name_ar}</p>
              <p className="text-sm text-[#6B6B6B]">المخزون الحالي: <span className="font-bold text-[#C9A96E]">{selectedProduct.stock_quantity}</span></p>
            </div>

            {/* Adjustment Type */}
            <div className="flex gap-2 mb-4">
              {(['in', 'out', 'adjustment'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setAdjustmentType(type)}
                  className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                    adjustmentType === type 
                      ? type === 'in' ? 'bg-green-500 text-white'
                        : type === 'out' ? 'bg-orange-500 text-white'
                        : 'bg-blue-500 text-white'
                      : 'bg-[#F5F0E8] text-[#6B6B6B]'
                  }`}
                >
                  {type === 'in' ? 'إضافة' : type === 'out' ? 'إخراج' : 'تسوية'}
                </button>
              ))}
            </div>

            {/* Quantity */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#1A1A1A] mb-1">
                {adjustmentType === 'adjustment' ? 'الكمية الجديدة' : 'الكمية'}
              </label>
              <input
                type="number"
                min="0"
                value={adjustmentQty}
                onChange={(e) => setAdjustmentQty(e.target.value)}
                className="w-full px-4 py-2 bg-[#FAF8F5] border border-[#E8E0D5] rounded-lg focus:outline-none focus:border-[#C9A96E]"
                placeholder="أدخل الكمية"
              />
            </div>

            {/* Reason */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#1A1A1A] mb-1">السبب *</label>
              <select
                value={adjustmentReason}
                onChange={(e) => setAdjustmentReason(e.target.value)}
                className="w-full px-4 py-2 bg-[#FAF8F5] border border-[#E8E0D5] rounded-lg focus:outline-none focus:border-[#C9A96E]"
              >
                <option value="">اختر السبب</option>
                <option value="توريد جديد">توريد جديد</option>
                <option value="مرتجع عميل">مرتجع عميل</option>
                <option value="تلف">تلف</option>
                <option value="بيع">بيع</option>
                <option value="تجديد مخزون">تجديد مخزون</option>
                <option value="تسوية">تسوية</option>
                <option value="أخرى">أخرى</option>
              </select>
            </div>

            {/* Submit */}
            <div className="flex gap-3">
              <button
                onClick={handleAdjustment}
                disabled={!adjustmentQty || !adjustmentReason}
                className="flex-1 bg-[#C9A96E] hover:bg-[#D4AF37] text-white py-2 rounded-lg transition-colors disabled:opacity-50"
              >
                تأكيد
              </button>
              <button
                onClick={() => setShowAdjustmentModal(false)}
                className="flex-1 bg-[#F5F0E8] text-[#1A1A1A] py-2 rounded-lg hover:bg-[#E8E0D5] transition-colors"
              >
                إلغاء
              </button>
            </div>

            {/* Recent Logs */}
            {inventoryLogs.length > 0 && (
              <div className="mt-6 pt-6 border-t border-[#E8E0D5]">
                <h4 className="font-bold text-[#1A1A1A] mb-3">آخر الحركات</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {inventoryLogs.slice(0, 5).map(log => (
                    <div key={log.id} className="flex items-center justify-between text-sm p-2 bg-[#FAF8F5] rounded-lg">
                      <div>
                        <span className={`font-bold ${log.type === 'in' ? 'text-green-600' : log.type === 'out' ? 'text-red-600' : 'text-blue-600'}`}>
                          {log.type === 'in' ? '+' : log.type === 'out' ? '-' : ''}{log.quantity}
                        </span>
                        <span className="text-[#6B6B6B] mr-2">{log.reason}</span>
                      </div>
                      <span className="text-xs text-[#6B6B6B]">
                        {new Date(log.created_at).toLocaleDateString('ar-SA')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  );
}