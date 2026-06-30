import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Plus, Search, Tag, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import AdminLayout from './AdminLayout';

type Coupon = {
  code: string;
  percent: number;
  active: boolean;
};

const STORAGE_KEY = 'nafaes_coupons';

function loadCoupons(): Coupon[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveCoupons(coupons: Coupon[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(coupons));
}

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [search, setSearch] = useState('');
  const [code, setCode] = useState('');
  const [percent, setPercent] = useState('10');

  useEffect(() => {
    setCoupons(loadCoupons());
  }, []);

  const filteredCoupons = useMemo(() => coupons.filter(coupon => coupon.code.toLowerCase().includes(search.toLowerCase())), [coupons, search]);

  const persist = (nextCoupons: Coupon[]) => {
    setCoupons(nextCoupons);
    saveCoupons(nextCoupons);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const normalizedCode = code.trim().toUpperCase();
    const normalizedPercent = Math.min(100, Math.max(0, Number(percent) || 0));

    if (!normalizedCode) {
      toast.error('أدخل كود الخصم');
      return;
    }

    if (normalizedPercent <= 0) {
      toast.error('نسبة الخصم يجب أن تكون أكبر من صفر');
      return;
    }

    const exists = coupons.some(coupon => coupon.code === normalizedCode);
    const nextCoupons = exists
      ? coupons.map(coupon => coupon.code === normalizedCode ? { ...coupon, percent: normalizedPercent, active: true } : coupon)
      : [{ code: normalizedCode, percent: normalizedPercent, active: true }, ...coupons];

    persist(nextCoupons);
    setCode('');
    setPercent('10');
    toast.success(exists ? 'تم تحديث الكوبون' : 'تم إضافة الكوبون');
  };

  const toggleCoupon = (couponCode: string) => {
    persist(coupons.map(coupon => coupon.code === couponCode ? { ...coupon, active: !coupon.active } : coupon));
  };

  const deleteCoupon = (couponCode: string) => {
    persist(coupons.filter(coupon => coupon.code !== couponCode));
    toast.success('تم حذف الكوبون');
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#1A1A1A]">الكوبونات</h2>
        <p className="text-[#6B6B6B]">إدارة أكواد الخصم المئوية المستخدمة في إنشاء الطلبات من الأدمن</p>
      </div>

      <form onSubmit={handleSubmit} className="mb-6 rounded-xl border border-[#E8E0D5] bg-white p-5">
        <div className="grid gap-4 md:grid-cols-[1fr_180px_160px]">
          <label>
            <span className="mb-2 block text-sm font-medium text-[#1A1A1A]">كود الخصم</span>
            <input value={code} onChange={event => setCode(event.target.value)} className="w-full rounded-lg border border-[#E8E0D5] bg-[#FAF8F5] px-4 py-3 uppercase focus:border-[#C9A96E] focus:outline-none" placeholder="مثال: VIP10" dir="ltr" />
          </label>
          <label>
            <span className="mb-2 block text-sm font-medium text-[#1A1A1A]">النسبة %</span>
            <input type="number" min="1" max="100" step="0.1" value={percent} onChange={event => setPercent(event.target.value)} className="w-full rounded-lg border border-[#E8E0D5] bg-[#FAF8F5] px-4 py-3 text-center focus:border-[#C9A96E] focus:outline-none" dir="ltr" />
          </label>
          <button type="submit" className="mt-7 inline-flex items-center justify-center gap-2 rounded-lg bg-[#C9A96E] px-4 py-3 font-bold text-white hover:bg-[#D4AF37]">
            <Plus className="h-5 w-5" />
            حفظ الكود
          </button>
        </div>
      </form>

      <div className="mb-6 rounded-xl border border-[#E8E0D5] bg-white p-4">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6B6B6B]" />
          <input value={search} onChange={event => setSearch(event.target.value)} className="w-full rounded-lg border border-[#E8E0D5] bg-[#FAF8F5] py-3 pl-4 pr-10 focus:border-[#C9A96E] focus:outline-none" placeholder="ابحث عن كود..." />
        </div>
      </div>

      <div className="rounded-xl border border-[#E8E0D5] bg-white overflow-hidden">
        {filteredCoupons.length === 0 ? (
          <div className="p-8 text-center text-[#6B6B6B]">
            <Tag className="mx-auto mb-3 h-12 w-12 text-[#C9A96E] opacity-60" />
            <p>لا توجد كوبونات</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F5F0E8]">
                <tr>
                  <th className="px-4 py-3 text-right text-sm font-medium text-[#1A1A1A]">الكود</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-[#1A1A1A]">الخصم</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-[#1A1A1A]">الحالة</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-[#1A1A1A]">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E0D5]">
                {filteredCoupons.map(coupon => (
                  <tr key={coupon.code} className="hover:bg-[#FAF8F5]">
                    <td className="px-4 py-4 font-mono font-bold text-[#C9A96E]">{coupon.code}</td>
                    <td className="px-4 py-4 text-center font-bold">{coupon.percent}%</td>
                    <td className="px-4 py-4 text-center">
                      <button type="button" onClick={() => toggleCoupon(coupon.code)} className={`rounded-full px-3 py-1 text-xs font-bold ${coupon.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                        {coupon.active ? 'فعال' : 'متوقف'}
                      </button>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button type="button" onClick={() => deleteCoupon(coupon.code)} className="rounded-lg bg-red-50 p-2 text-red-500 hover:bg-red-100" aria-label="حذف الكوبون">
                        <Trash2 className="h-4 w-4" />
                      </button>
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
