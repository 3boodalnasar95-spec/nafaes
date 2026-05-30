import { useState } from 'react';
import { Package, Database, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import AdminLayout from './AdminLayout';
import { seedAllProducts, getProductsFromDB, seedProducts } from '@/lib/db-seed';
import { toast } from 'sonner';

export default function AdminSeedProducts() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string; count: number } | null>(null);

  const handleSeed = async () => {
    setLoading(true);
    setResult(null);
    
    const seedResult = await seedAllProducts();
    setResult(seedResult);
    setLoading(false);
    
    if (seedResult.success) {
      toast.success(seedResult.message);
    } else {
      toast.error(seedResult.message);
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#1A1A1A]">إضافة المنتجات</h2>
        <p className="text-[#6B6B6B]">إضافة منتجات المتجر للقاعدة البيانات</p>
      </div>

      {/* Product Preview */}
      <div className="bg-white rounded-xl border border-[#E8E0D5] p-6 mb-6">
        <h3 className="font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
          <Package className="w-5 h-5 text-[#C9A96E]" />
          المنتجات المراد إضافتها ({seedProducts.length})
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {seedProducts.map((product, index) => (
            <div key={index} className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E8E0D5]">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-[#C9A96E]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Package className="w-6 h-6 text-[#C9A96E]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-[#1A1A1A] truncate">{product.name_ar}</h4>
                  <p className="text-sm text-[#6B6B6B] truncate">{product.name_en}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-bold text-[#C9A96E]">{product.price.toFixed(3)} د.ك</span>
                    <span className="text-xs text-[#6B6B6B]">({product.stock_quantity} متوفر)</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Seed Button */}
      <div className="bg-white rounded-xl border border-[#E8E0D5] p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#C9A96E]/10 rounded-full flex items-center justify-center">
              <Database className="w-7 h-7 text-[#C9A96E]" />
            </div>
            <div>
              <h3 className="font-bold text-[#1A1A1A]">إضافة المنتجات للقاعدة البيانات</h3>
              <p className="text-sm text-[#6B6B6B]">هذا الإجراء سيضيف المنتجات إذا لم تكن موجودة أو يحديثها إذا كانت موجودة</p>
            </div>
          </div>
          
          <button
            onClick={handleSeed}
            disabled={loading}
            className="flex items-center gap-2 bg-[#C9A96E] hover:bg-[#D4AF37] text-white px-6 py-3 rounded-xl transition-colors disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                جاري الإضافة...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                إضافة المنتجات
              </>
            )}
          </button>
        </div>

        {/* Result */}
        {result && (
          <div className={`mt-6 p-4 rounded-xl flex items-center gap-3 ${
            result.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {result.success ? (
              <CheckCircle className="w-6 h-6" />
            ) : (
              <AlertCircle className="w-6 h-6" />
            )}
            <div>
              <p className="font-bold">{result.message}</p>
              {result.success && (
                <p className="text-sm opacity-80">المنتجات جاهزة في المتجر</p>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}