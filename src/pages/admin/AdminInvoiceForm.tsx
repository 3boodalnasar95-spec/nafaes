import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Minus, Plus, Save, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import AdminLayout from './AdminLayout';
import { createOrder, formatPrice, getProducts, Product } from '@/lib/db-operations';
import { deliveryFee, getAreasByGovernorate, kuwaitGovernorates } from '@/data/products';

type DraftItem = {
  productId: string;
  quantity: number;
};

export default function AdminInvoiceForm() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [items, setItems] = useState<DraftItem[]>([{ productId: '', quantity: 1 }]);
  const [saving, setSaving] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [form, setForm] = useState({
    customer_name: '',
    customer_phone: '',
    governorate: '',
    area_id: '',
    address: '',
    notes: '',
    payment_method: 'cash' as 'cash' | 'link',
  });

  useEffect(() => {
    let mounted = true;
    getProducts().then(data => {
      if (mounted) {
        setProducts(data.filter(product => product.stock_quantity !== 0));
        setLoadingProducts(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  const areas = useMemo(() => getAreasByGovernorate(form.governorate), [form.governorate]);

  const selectedArea = areas.find(area => area.id === form.area_id);
  const lineItems = items
    .map(item => {
      const product = products.find(product => product.id === item.productId);
      if (!product) return null;
      const quantity = Math.max(1, item.quantity || 1);
      return {
        product,
        quantity,
        total: product.price * quantity,
      };
    })
    .filter((item): item is { product: Product; quantity: number; total: number } => Boolean(item));

  const subtotal = lineItems.reduce((sum, item) => sum + item.total, 0);
  const orderDeliveryFee = selectedArea?.delivery ?? deliveryFee;
  const total = subtotal + orderDeliveryFee;

  const updateItem = (index: number, patch: Partial<DraftItem>) => {
    setItems(current => current.map((item, itemIndex) => itemIndex === index ? { ...item, ...patch } : item));
  };

  const removeItem = (index: number) => {
    setItems(current => current.length === 1 ? current : current.filter((_, itemIndex) => itemIndex !== index));
  };

  const addItem = () => {
    setItems(current => [...current, { productId: '', quantity: 1 }]);
  };

  const validate = () => {
    if (!form.customer_name.trim()) return 'اسم العميل مطلوب';
    if (!/^\d{8}$/.test(form.customer_phone.trim())) return 'رقم الهاتف يجب أن يكون 8 أرقام';
    if (!form.governorate) return 'اختر المحافظة';
    if (!form.area_id) return 'اختر المنطقة';
    if (!form.address.trim()) return 'العنوان مطلوب';
    if (lineItems.length === 0) return 'أضف منتجاً واحداً على الأقل';
    if (items.some(item => !item.productId)) return 'تأكد من اختيار المنتج في كل سطر';
    return '';
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const error = validate();
    if (error) {
      toast.error(error);
      return;
    }

    setSaving(true);
    const governorateName = kuwaitGovernorates.find(item => item.id === form.governorate)?.name || form.governorate;
    const result = await createOrder({
      customer_name: form.customer_name.trim(),
      customer_phone: form.customer_phone.trim(),
      governorate: governorateName,
      area: selectedArea?.name || '',
      area_id: form.area_id,
      address: form.address.trim(),
      notes: form.notes.trim(),
      payment_method: form.payment_method,
      subtotal,
      delivery_fee: orderDeliveryFee,
      total,
    }, lineItems.map(item => ({
      product_id: item.product.id,
      product_name_ar: item.product.name_ar,
      product_name_en: item.product.name_en,
      quantity: item.quantity,
      unit_price: item.product.price,
      total_price: item.total,
    })));
    setSaving(false);

    if (!result.success) {
      toast.error(result.error || 'تعذر إنشاء الطلب');
      return;
    }

    toast.success(`تم إنشاء الطلب ${result.order_number}`);
    navigate('/admin/orders');
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1A1A1A]">إنشاء طلب جديد</h2>
          <p className="text-[#6B6B6B]">أدخل بيانات العميل والمنتجات وسيتم حفظ الطلب مباشرة في النظام</p>
        </div>
        <Link to="/admin/orders" className="inline-flex items-center gap-2 rounded-lg border border-[#E8E0D5] bg-white px-4 py-2 text-[#1A1A1A] hover:bg-[#FAF8F5]">
          <ArrowRight className="h-4 w-4" />
          العودة للطلبات
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <section className="rounded-xl border border-[#E8E0D5] bg-white p-5">
            <h3 className="mb-4 text-lg font-bold text-[#1A1A1A]">بيانات العميل</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#1A1A1A]">اسم العميل</span>
                <input value={form.customer_name} onChange={event => setForm({ ...form, customer_name: event.target.value })} className="w-full rounded-lg border border-[#E8E0D5] bg-[#FAF8F5] px-4 py-3 focus:border-[#C9A96E] focus:outline-none" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#1A1A1A]">الهاتف</span>
                <input inputMode="numeric" maxLength={8} value={form.customer_phone} onChange={event => setForm({ ...form, customer_phone: event.target.value.replace(/\D/g, '') })} className="w-full rounded-lg border border-[#E8E0D5] bg-[#FAF8F5] px-4 py-3 focus:border-[#C9A96E] focus:outline-none" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#1A1A1A]">المحافظة</span>
                <select value={form.governorate} onChange={event => setForm({ ...form, governorate: event.target.value, area_id: '' })} className="w-full rounded-lg border border-[#E8E0D5] bg-[#FAF8F5] px-4 py-3 focus:border-[#C9A96E] focus:outline-none">
                  <option value="">اختر المحافظة</option>
                  {kuwaitGovernorates.map(governorate => <option key={governorate.id} value={governorate.id}>{governorate.name}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#1A1A1A]">المنطقة</span>
                <select value={form.area_id} onChange={event => setForm({ ...form, area_id: event.target.value })} disabled={!form.governorate} className="w-full rounded-lg border border-[#E8E0D5] bg-[#FAF8F5] px-4 py-3 focus:border-[#C9A96E] focus:outline-none disabled:opacity-50">
                  <option value="">اختر المنطقة</option>
                  {areas.map(area => <option key={area.id} value={area.id}>{area.name} - {formatPrice(area.delivery)}</option>)}
                </select>
              </label>
              <label className="block md:col-span-2">
                <span className="mb-2 block text-sm font-medium text-[#1A1A1A]">العنوان</span>
                <textarea value={form.address} onChange={event => setForm({ ...form, address: event.target.value })} rows={3} className="w-full resize-none rounded-lg border border-[#E8E0D5] bg-[#FAF8F5] px-4 py-3 focus:border-[#C9A96E] focus:outline-none" />
              </label>
              <label className="block md:col-span-2">
                <span className="mb-2 block text-sm font-medium text-[#1A1A1A]">ملاحظات</span>
                <textarea value={form.notes} onChange={event => setForm({ ...form, notes: event.target.value })} rows={2} className="w-full resize-none rounded-lg border border-[#E8E0D5] bg-[#FAF8F5] px-4 py-3 focus:border-[#C9A96E] focus:outline-none" />
              </label>
            </div>
          </section>

          <section className="rounded-xl border border-[#E8E0D5] bg-white p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="text-lg font-bold text-[#1A1A1A]">المنتجات</h3>
              <button type="button" onClick={addItem} className="inline-flex items-center gap-2 rounded-lg bg-[#C9A96E] px-3 py-2 text-sm font-medium text-white hover:bg-[#D4AF37]">
                <Plus className="h-4 w-4" />
                إضافة منتج
              </button>
            </div>

            <div className="space-y-3">
              {items.map((item, index) => {
                const product = products.find(product => product.id === item.productId);
                return (
                  <div key={index} className="grid gap-3 rounded-lg border border-[#E8E0D5] bg-[#FAF8F5] p-3 md:grid-cols-[1fr_160px_120px_44px]">
                    <select value={item.productId} onChange={event => updateItem(index, { productId: event.target.value })} disabled={loadingProducts} className="rounded-lg border border-[#E8E0D5] bg-white px-3 py-2 focus:border-[#C9A96E] focus:outline-none">
                      <option value="">{loadingProducts ? 'جاري تحميل المنتجات...' : 'اختر المنتج'}</option>
                      {products.map(product => <option key={product.id} value={product.id}>{product.name_ar} - {formatPrice(product.price)}</option>)}
                    </select>
                    <div className="flex items-center overflow-hidden rounded-lg border border-[#E8E0D5] bg-white">
                      <button type="button" onClick={() => updateItem(index, { quantity: Math.max(1, item.quantity - 1) })} className="px-3 py-2 text-[#6B6B6B] hover:text-[#C9A96E]"><Minus className="h-4 w-4" /></button>
                      <input type="number" min={1} value={item.quantity} onChange={event => updateItem(index, { quantity: Math.max(1, Number(event.target.value) || 1) })} className="w-full border-x border-[#E8E0D5] px-2 py-2 text-center focus:outline-none" />
                      <button type="button" onClick={() => updateItem(index, { quantity: item.quantity + 1 })} className="px-3 py-2 text-[#6B6B6B] hover:text-[#C9A96E]"><Plus className="h-4 w-4" /></button>
                    </div>
                    <div className="rounded-lg bg-white px-3 py-2 text-center font-bold text-[#C9A96E]">
                      {product ? formatPrice(product.price * item.quantity) : formatPrice(0)}
                    </div>
                    <button type="button" onClick={() => removeItem(index)} className="rounded-lg border border-red-100 bg-white px-3 py-2 text-red-500 hover:bg-red-50" aria-label="حذف المنتج">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        <aside className="h-fit rounded-xl border border-[#E8E0D5] bg-white p-5 lg:sticky lg:top-6">
          <h3 className="mb-4 text-lg font-bold text-[#1A1A1A]">ملخص الطلب</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-[#6B6B6B]">عدد المنتجات</span><span className="font-bold">{lineItems.reduce((sum, item) => sum + item.quantity, 0)}</span></div>
            <div className="flex justify-between"><span className="text-[#6B6B6B]">المجموع</span><span className="font-bold">{formatPrice(subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-[#6B6B6B]">التوصيل</span><span className="font-bold">{formatPrice(orderDeliveryFee)}</span></div>
            <div className="border-t border-[#E8E0D5] pt-3 flex justify-between text-lg"><span className="font-bold">الإجمالي</span><span className="font-bold text-[#C9A96E]">{formatPrice(total)}</span></div>
          </div>

          <div className="mt-5">
            <span className="mb-2 block text-sm font-medium text-[#1A1A1A]">طريقة الدفع</span>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" onClick={() => setForm({ ...form, payment_method: 'cash' })} className={`rounded-lg border px-3 py-2 text-sm ${form.payment_method === 'cash' ? 'border-[#C9A96E] bg-[#C9A96E] text-white' : 'border-[#E8E0D5] bg-white text-[#1A1A1A]'}`}>كاش</button>
              <button type="button" onClick={() => setForm({ ...form, payment_method: 'link' })} className={`rounded-lg border px-3 py-2 text-sm ${form.payment_method === 'link' ? 'border-[#C9A96E] bg-[#C9A96E] text-white' : 'border-[#E8E0D5] bg-white text-[#1A1A1A]'}`}>رابط دفع</button>
            </div>
          </div>

          <button type="submit" disabled={saving || loadingProducts} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#1A1A1A] px-4 py-3 font-bold text-white hover:bg-[#C9A96E] disabled:cursor-not-allowed disabled:opacity-60">
            <Save className="h-5 w-5" />
            {saving ? 'جاري الحفظ...' : 'إنشاء الطلب'}
          </button>
        </aside>
      </form>
    </AdminLayout>
  );
}
