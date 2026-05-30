import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowRight, Plus, Trash2 } from 'lucide-react';
import AdminLayout from './AdminLayout';
import { createProduct, updateProduct, getProducts } from '@/lib/db-operations';
import type { Product } from '@/types/database';

export default function AdminProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    name_ar: '',
    name_en: '',
    type: '',
    price: '',
    cost_price: '0',
    description_short: '',
    description_full: '',
    sku: '',
    category: 'general',
    stock_quantity: '0',
    min_stock_level: '5',
    image: '',
    specs: {} as Record<string, string>,
    features: [] as string[],
    is_active: true,
  });

  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');
  const [newFeature, setNewFeature] = useState('');

  useEffect(() => {
    if (isEditing && id) {
      loadProduct(id);
    }
  }, [id, isEditing]);

  const loadProduct = async (productId: string) => {
    const products = await getProducts();
    const product = products.find(p => p.id === productId);
    if (product) {
      setFormData({
        name_ar: product.name_ar || '',
        name_en: product.name_en || '',
        type: product.type || '',
        price: product.price?.toString() || '',
        cost_price: product.cost_price?.toString() || '0',
        description_short: product.description_short || '',
        description_full: product.description_full || '',
        sku: product.sku || '',
        category: product.category_id || 'general',
        stock_quantity: product.stock_quantity?.toString() || '0',
        min_stock_level: product.min_stock_level?.toString() || '5',
        image: product.images?.[0] || '',
        specs: product.specs || {},
        features: product.features || [],
        is_active: product.is_active ?? true,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      name_ar: formData.name_ar,
      name_en: formData.name_en,
      type: formData.type,
      price: parseFloat(formData.price) || 0,
      cost_price: parseFloat(formData.cost_price) || 0,
      description_short: formData.description_short,
      description_full: formData.description_full,
      specs: formData.specs,
      features: formData.features,
      images: formData.image ? [formData.image] : [],
      sku: formData.sku,
      category_id: formData.category,
      stock_quantity: parseInt(formData.stock_quantity) || 0,
      min_stock_level: parseInt(formData.min_stock_level) || 5,
      is_active: formData.is_active,
    };

    if (isEditing && id) {
      await updateProduct(id, productData);
    } else {
      await createProduct(productData);
    }

    navigate('/admin/products');
  };

  const addSpec = () => {
    if (newSpecKey && newSpecValue) {
      setFormData({
        ...formData,
        specs: { ...formData.specs, [newSpecKey]: newSpecValue },
      });
      setNewSpecKey('');
      setNewSpecValue('');
    }
  };

  const removeSpec = (key: string) => {
    const newSpecs = { ...formData.specs };
    delete newSpecs[key];
    setFormData({ ...formData, specs: newSpecs });
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeature.trim()],
      });
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#1A1A1A]">
          {isEditing ? 'تعديل المنتج' : 'إضافة منتج جديد'}
        </h2>
        <p className="text-[#6B6B6B]">
          {isEditing ? 'قم بتعديل بيانات المنتج' : 'أضف منتج جديد للمتجر'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-[#E8E0D5] p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-[#1A1A1A] border-b border-[#E8E0D5] pb-2">المعلومات الأساسية</h3>
            
            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-1">الاسم بالعربية *</label>
              <input
                type="text"
                required
                value={formData.name_ar}
                onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
                className="w-full px-4 py-2 bg-[#FAF8F5] border border-[#E8E0D5] rounded-lg focus:outline-none focus:border-[#C9A96E]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-1">الاسم بالإنجليزية *</label>
              <input
                type="text"
                required
                value={formData.name_en}
                onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                className="w-full px-4 py-2 bg-[#FAF8F5] border border-[#E8E0D5] rounded-lg focus:outline-none focus:border-[#C9A96E]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-1">النوع *</label>
              <input
                type="text"
                required
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-2 bg-[#FAF8F5] border border-[#E8E0D5] rounded-lg focus:outline-none focus:border-[#C9A96E]"
                placeholder="مثال: جهاز تعطير ذكي"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-1">التصنيف</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 bg-[#FAF8F5] border border-[#E8E0D5] rounded-lg focus:outline-none focus:border-[#C9A96E]"
              >
                <option value="devices">أجهزة تعطير</option>
                <option value="diffusers">معطرات أعواد</option>
                <option value="gifts">هدايا عطرية</option>
                <option value="general">عام</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-1">SKU</label>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="w-full px-4 py-2 bg-[#FAF8F5] border border-[#E8E0D5] rounded-lg focus:outline-none focus:border-[#C9A96E]"
                placeholder="رمز المنتج"
              />
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="space-y-4">
            <h3 className="font-bold text-[#1A1A1A] border-b border-[#E8E0D5] pb-2">السعر والمخزون</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-1">السعر (د.ك) *</label>
                <input
                  type="number"
                  step="0.001"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-2 bg-[#FAF8F5] border border-[#E8E0D5] rounded-lg focus:outline-none focus:border-[#C9A96E]"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-1">سعر التكلفة</label>
                <input
                  type="number"
                  step="0.001"
                  value={formData.cost_price}
                  onChange={(e) => setFormData({ ...formData, cost_price: e.target.value })}
                  className="w-full px-4 py-2 bg-[#FAF8F5] border border-[#E8E0D5] rounded-lg focus:outline-none focus:border-[#C9A96E]"
                  dir="ltr"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-1">المخزون</label>
                <input
                  type="number"
                  value={formData.stock_quantity}
                  onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                  className="w-full px-4 py-2 bg-[#FAF8F5] border border-[#E8E0D5] rounded-lg focus:outline-none focus:border-[#C9A96E]"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-1">الحد الأدنى</label>
                <input
                  type="number"
                  value={formData.min_stock_level}
                  onChange={(e) => setFormData({ ...formData, min_stock_level: e.target.value })}
                  className="w-full px-4 py-2 bg-[#FAF8F5] border border-[#E8E0D5] rounded-lg focus:outline-none focus:border-[#C9A96E]"
                  dir="ltr"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-1">رابط الصورة</label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-4 py-2 bg-[#FAF8F5] border border-[#E8E0D5] rounded-lg focus:outline-none focus:border-[#C9A96E]"
                placeholder="/images/product.png"
              />
            </div>
          </div>
        </div>

        {/* Descriptions */}
        <div className="mt-6 space-y-4">
          <h3 className="font-bold text-[#1A1A1A] border-b border-[#E8E0D5] pb-2">الوصف</h3>
          
          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-1">وصف مختصر</label>
            <textarea
              value={formData.description_short}
              onChange={(e) => setFormData({ ...formData, description_short: e.target.value })}
              className="w-full px-4 py-2 bg-[#FAF8F5] border border-[#E8E0D5] rounded-lg focus:outline-none focus:border-[#C9A96E] resize-none"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-1">وصف كامل</label>
            <textarea
              value={formData.description_full}
              onChange={(e) => setFormData({ ...formData, description_full: e.target.value })}
              className="w-full px-4 py-2 bg-[#FAF8F5] border border-[#E8E0D5] rounded-lg focus:outline-none focus:border-[#C9A96E] resize-none"
              rows={3}
            />
          </div>
        </div>

        {/* Specs */}
        <div className="mt-6 space-y-4">
          <h3 className="font-bold text-[#1A1A1A] border-b border-[#E8E0D5] pb-2">المواصفات</h3>
          
          <div className="flex gap-2">
            <input
              type="text"
              value={newSpecKey}
              onChange={(e) => setNewSpecKey(e.target.value)}
              className="flex-1 px-4 py-2 bg-[#FAF8F5] border border-[#E8E0D5] rounded-lg focus:outline-none focus:border-[#C9A96E]"
              placeholder="المفتاح (مثال: السعة)"
            />
            <input
              type="text"
              value={newSpecValue}
              onChange={(e) => setNewSpecValue(e.target.value)}
              className="flex-1 px-4 py-2 bg-[#FAF8F5] border border-[#E8E0D5] rounded-lg focus:outline-none focus:border-[#C9A96E]"
              placeholder="القيمة (مثال: 120 مل)"
            />
            <button
              type="button"
              onClick={addSpec}
              className="px-4 py-2 bg-[#C9A96E] text-white rounded-lg hover:bg-[#D4AF37] transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {Object.entries(formData.specs).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2 p-2 bg-[#FAF8F5] rounded-lg">
                <span className="flex-1 text-sm">
                  <span className="font-medium">{key}:</span> {value}
                </span>
                <button
                  type="button"
                  onClick={() => removeSpec(key)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mt-6 space-y-4">
          <h3 className="font-bold text-[#1A1A1A] border-b border-[#E8E0D5] pb-2">المميزات</h3>
          
          <div className="flex gap-2">
            <input
              type="text"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              className="flex-1 px-4 py-2 bg-[#FAF8F5] border border-[#E8E0D5] rounded-lg focus:outline-none focus:border-[#C9A96E]"
              placeholder="أضف ميزة..."
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
            />
            <button
              type="button"
              onClick={addFeature}
              className="px-4 py-2 bg-[#C9A96E] text-white rounded-lg hover:bg-[#D4AF37] transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {formData.features.map((feature, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 px-3 py-1 bg-[#C9A96E]/10 text-[#C9A96E] rounded-full text-sm"
              >
                {feature}
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="hover:text-red-500"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="mt-8 flex gap-4">
          <button
            type="submit"
            className="flex-1 flex items-center justify-center gap-2 bg-[#C9A96E] hover:bg-[#D4AF37] text-white py-3 rounded-lg transition-colors font-medium"
          >
            {isEditing ? 'حفظ التغييرات' : 'إضافة المنتج'}
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="px-6 py-3 bg-[#F5F0E8] text-[#1A1A1A] rounded-lg hover:bg-[#E8E0D5] transition-colors"
          >
            إلغاء
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}