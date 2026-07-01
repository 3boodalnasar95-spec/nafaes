import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Minus, Plus, Save, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import AdminLayout from './AdminLayout';
import { createOrder, formatPrice, getProducts, Product } from '@/lib/db-operations';
import { deliveryFee, getAreasByGovernorate, kuwaitGovernorates, PRODUCT_CATALOG } from '@/data/products';

type DraftItem = {
  optionId: string;
  quantity: number;
  unitPrice: string;
};

type Coupon = {
  code: string;
  percent: number;
  active: boolean;
};

type ProductOption = {
  id: string;
  productId: string;
  nameAr: string;
  nameEn: string;
  price: number;
  sku: string;
  stock: number;
};

type InvoiceDraft = {
  id: string;
  name: string;
  savedAt: string;
  form: {
    customer_name: string;
    customer_phone: string;
    governorate: string;
    area_id: string;
    address: string;
    notes: string;
    payment_method: 'cash' | 'link';
  };
  items: DraftItem[];
  couponCode: string;
  discountPercent: string;
};

const DRAFTS_KEY = 'nafaes_invoice_drafts';

export default function AdminInvoiceForm() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [items, setItems] = useState<DraftItem[]>([{ optionId: '', quantity: 1, unitPrice: '' }]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState('0');
  const [drafts, setDrafts] = useState<InvoiceDraft[]>([]);
  const [activeDraftId, setActiveDraftId] = useState('');
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

  useEffect(() => {
    try {
      const saved = localStorage.getItem(DRAFTS_KEY);
      setDrafts(saved ? JSON.parse(saved) : []);
    } catch {
      setDrafts([]);
    }
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('nafaes_coupons');
      setCoupons(saved ? JSON.parse(saved) : []);
    } catch {
      setCoupons([]);
    }
  }, []);

  const areas = useMemo(() => getAreasByGovernorate(form.governorate), [form.governorate]);

  const productOptions = useMemo<ProductOption[]>(() => {
    const catalogOptions = PRODUCT_CATALOG.flatMap(product => product.variants.map(variant => ({
      id: variant.id,
      productId: product.id,
      nameAr: product.variants.length > 1 ? `${product.name_ar} - ${variant.size}` : product.name_ar,
      nameEn: product.variants.length > 1 ? `${product.name_en} - ${variant.size}` : product.name_en,
      price: variant.price,
      sku: variant.sku,
      stock: variant.stock,
    })));

    const customOptions = products
      .filter(product => !PRODUCT_CATALOG.some(catalog => catalog.id === product.id || catalog.variants.some(variant => variant.sku === product.sku)))
      .map(product => ({
        id: product.cartKey || product.variantId || product.id,
        productId: product.id,
        nameAr: product.variantLabel ? `${product.name_ar} - ${product.variantLabel}` : product.name_ar,
        nameEn: product.variantLabel ? `${product.name_en} - ${product.variantLabel}` : product.name_en,
        price: product.price || 0,
        sku: product.sku || product.id,
        stock: product.stock_quantity ?? 0,
      }));

    return [...catalogOptions, ...customOptions].sort((a, b) => a.nameAr.localeCompare(b.nameAr));
  }, [products]);

  const selectedArea = areas.find(area => area.id === form.area_id);
  const lineItems = items
    .map(item => {
      const option = productOptions.find(product => product.id === item.optionId);
      if (!option) return null;
      const quantity = Math.max(1, item.quantity || 1);
      const unitPrice = Math.max(0, Number(item.unitPrice) || option.price);
      return {
        option,
        quantity,
        unitPrice,
        total: unitPrice * quantity,
      };
    })
    .filter((item): item is { option: ProductOption; quantity: number; unitPrice: number; total: number } => Boolean(item));

  const subtotal = lineItems.reduce((sum, item) => sum + item.total, 0);
  const normalizedDiscountPercent = Math.min(100, Math.max(0, Number(discountPercent) || 0));
  const discountAmount = subtotal * (normalizedDiscountPercent / 100);
  const orderDeliveryFee = selectedArea?.delivery ?? deliveryFee;
  const total = Math.max(0, subtotal - discountAmount) + orderDeliveryFee;

  const updateItem = (index: number, patch: Partial<DraftItem>) => {
    setItems(current => current.map((item, itemIndex) => itemIndex === index ? { ...item, ...patch } : item));
  };

  const removeItem = (index: number) => {
    setItems(current => current.length === 1 ? current : current.filter((_, itemIndex) => itemIndex !== index));
  };

  const addItem = () => {
    setItems(current => [...current, { optionId: '', quantity: 1, unitPrice: '' }]);
  };

  const handleSelectOption = (index: number, optionId: string) => {
    const option = productOptions.find(product => product.id === optionId);
    updateItem(index, { optionId, unitPrice: option ? option.price.toFixed(3) : '' });
  };

  const handleApplyCoupon = (code: string) => {
    setCouponCode(code);
    const coupon = coupons.find(item => item.active && item.code.toLowerCase() === code.toLowerCase());
    if (coupon) {
      setDiscountPercent(String(coupon.percent));
      toast.success(`تم تطبيق كود الخصم ${coupon.code}`);
    }
  };

  const persistDrafts = (nextDrafts: InvoiceDraft[]) => {
    setDrafts(nextDrafts);
    localStorage.setItem(DRAFTS_KEY, JSON.stringify(nextDrafts));
  };

  const saveDraft = () => {
    const now = new Date().toISOString();
    const draftId = activeDraftId || `draft-${Date.now()}`;
    const draftName = form.customer_name.trim() || `مسودة ${new Date().toLocaleString('ar-SA')}`;
    const draft: InvoiceDraft = {
      id: draftId,
      name: draftName,
      savedAt: now,
      form,
      items,
      couponCode,
      discountPercent,
    };

    const nextDrafts = [draft, ...drafts.filter(item => item.id !== draftId)].slice(0, 30);
    persistDrafts(nextDrafts);
    setActiveDraftId(draftId);
    toast.success('تم حفظ الفاتورة كمسودة');
  };

  const loadDraft = (draftId: string) => {
    setActiveDraftId(draftId);
    const draft = drafts.find(item => item.id === draftId);
    if (!draft) return;
    setForm(draft.form);
    setItems(draft.items.length > 0 ? draft.items : [{ optionId: '', quantity: 1, unitPrice: '' }]);
    setCouponCode(draft.couponCode || '');
    setDiscountPercent(draft.discountPercent || '0');
    toast.success('تم تحميل المسودة');
  };

  const deleteDraft = () => {
    if (!activeDraftId) return;
    persistDrafts(drafts.filter(item => item.id !== activeDraftId));
    setActiveDraftId('');
    toast.success('تم حذف المسودة');
  };

  const validate = () => {
    if (!form.customer_name.trim()) return 'اسم العميل مطلوب';
    if (!/^\d{8}$/.test(form.customer_phone.trim())) return 'رقم الهاتف يجب أن يكون 8 أرقام';
    if (!form.governorate) return 'اختر المحافظة';
    if (!form.area_id) return 'اختر المنطقة';
    if (!form.address.trim()) return 'العنوان مطلوب';
    if (lineItems.length === 0) return 'أضف منتجاً واحداً على الأقل';
    if (items.some(item => !item.optionId)) return 'تأكد من اختيار المنتج في كل سطر';
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
      notes: [
        form.notes.trim(),
        normalizedDiscountPercent > 0 ? `خصم إداري: ${normalizedDiscountPercent}%${couponCode ? ` - كود: ${couponCode}` : ''}` : '',
      ].filter(Boolean).join('\n'),
      payment_method: form.payment_method,
      subtotal,
      discount_amount: discountAmount,
      coupon_code: couponCode || undefined,
      delivery_fee: orderDeliveryFee,
      total,
    }, lineItems.map(item => ({
      product_id: item.option.id,
      product_name_ar: item.option.nameAr,
      product_name_en: item.option.nameEn,
      quantity: item.quantity,
      unit_price: item.unitPrice,
      total_price: item.total,
    })));
    setSaving(false);

    if (!result.success) {
      toast.error(result.error || 'تعذر إنشاء الطلب');
      return;
    }

    toast.success(`تم إنشاء الطلب ${result.order_number}`);
    if (activeDraftId) {
      persistDrafts(drafts.filter(item => item.id !== activeDraftId));
    }
    navigate('/admin/orders');
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1A1A1A]">إنشاء طلب جديد</h2>
          <p className="text-[#6B6B6B]">أدخل بيانات العميل والمنتجات وسيتم حفظ الطلب مباشرة في النظام</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={saveDraft} className="inline-flex items-center gap-2 rounded-lg bg-[#C9A96E] px-4 py-2 text-white hover:bg-[#D4AF37]">
            <Save className="h-4 w-4" />
            حفظ كمسودة
          </button>
          <Link to="/admin/orders" className="inline-flex items-center gap-2 rounded-lg border border-[#E8E0D5] bg-white px-4 py-2 text-[#1A1A1A] hover:bg-[#FAF8F5]">
            <ArrowRight className="h-4 w-4" />
            العودة للطلبات
          </Link>
        </div>
      </div>

      <section className="mb-6 rounded-xl border border-[#E8E0D5] bg-white p-4">
        <div className="grid gap-3 md:grid-cols-[1fr_auto]">
          <select value={activeDraftId} onChange={event => loadDraft(event.target.value)} className="rounded-lg border border-[#E8E0D5] bg-[#FAF8F5] px-4 py-3 focus:border-[#C9A96E] focus:outline-none">
            <option value="">اختر مسودة محفوظة</option>
            {drafts.map(draft => (
              <option key={draft.id} value={draft.id}>{draft.name} - {new Date(draft.savedAt).toLocaleString('ar-SA')}</option>
            ))}
          </select>
          <button type="button" onClick={deleteDraft} disabled={!activeDraftId} className="rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-red-600 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50">
            حذف المسودة
          </button>
        </div>
      </section>

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
                const option = productOptions.find(product => product.id === item.optionId);
                return (
                  <div key={index} className="grid gap-3 rounded-lg border border-[#E8E0D5] bg-[#FAF8F5] p-3 md:grid-cols-[1fr_150px_140px_120px_44px]">
                    <select value={item.optionId} onChange={event => handleSelectOption(index, event.target.value)} disabled={loadingProducts} className="rounded-lg border border-[#E8E0D5] bg-white px-3 py-2 focus:border-[#C9A96E] focus:outline-none">
                      <option value="">{loadingProducts ? 'جاري تحميل المنتجات...' : 'اختر المنتج'}</option>
                      {productOptions.map(product => <option key={product.id} value={product.id}>{product.nameAr}</option>)}
                    </select>
                    <input type="number" step="0.001" min="0" value={item.unitPrice} onChange={event => updateItem(index, { unitPrice: event.target.value })} className="rounded-lg border border-[#E8E0D5] bg-white px-3 py-2 text-center focus:border-[#C9A96E] focus:outline-none" placeholder="السعر" dir="ltr" />
                    <div className="flex items-center overflow-hidden rounded-lg border border-[#E8E0D5] bg-white">
                      <button type="button" onClick={() => updateItem(index, { quantity: Math.max(1, item.quantity - 1) })} className="px-3 py-2 text-[#6B6B6B] hover:text-[#C9A96E]"><Minus className="h-4 w-4" /></button>
                      <input type="number" min={1} value={item.quantity} onChange={event => updateItem(index, { quantity: Math.max(1, Number(event.target.value) || 1) })} className="w-full border-x border-[#E8E0D5] px-2 py-2 text-center focus:outline-none" />
                      <button type="button" onClick={() => updateItem(index, { quantity: item.quantity + 1 })} className="px-3 py-2 text-[#6B6B6B] hover:text-[#C9A96E]"><Plus className="h-4 w-4" /></button>
                    </div>
                    <div className="rounded-lg bg-white px-3 py-2 text-center font-bold text-[#C9A96E]">
                      {option ? formatPrice((Number(item.unitPrice) || option.price) * item.quantity) : formatPrice(0)}
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
            <div className="rounded-lg border border-[#E8E0D5] bg-[#FAF8F5] p-3">
              <label className="mb-2 block text-sm font-medium text-[#1A1A1A]">كود الخصم</label>
              <select value={couponCode} onChange={event => handleApplyCoupon(event.target.value)} className="mb-2 w-full rounded-lg border border-[#E8E0D5] bg-white px-3 py-2 focus:border-[#C9A96E] focus:outline-none">
                <option value="">بدون كود</option>
                {coupons.filter(coupon => coupon.active).map(coupon => (
                  <option key={coupon.code} value={coupon.code}>{coupon.code} - {coupon.percent}%</option>
                ))}
              </select>
              <label className="mb-2 block text-sm font-medium text-[#1A1A1A]">نسبة الخصم اليدوية</label>
              <input type="number" min="0" max="100" step="0.1" value={discountPercent} onChange={event => setDiscountPercent(event.target.value)} className="w-full rounded-lg border border-[#E8E0D5] bg-white px-3 py-2 text-center focus:border-[#C9A96E] focus:outline-none" dir="ltr" />
            </div>
            {normalizedDiscountPercent > 0 && (
              <div className="flex justify-between text-green-700"><span>الخصم ({normalizedDiscountPercent}%)</span><span className="font-bold">- {formatPrice(discountAmount)}</span></div>
            )}
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
