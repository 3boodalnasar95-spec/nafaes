import { useState, useEffect } from 'react';
import { Tag, Plus, Edit, Trash2, Copy, Calendar, Percent, Search } from 'lucide-react';
import { toast } from 'sonner';
import AdminLayout from './AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getCoupons, createCoupon, updateCoupon, deleteCoupon } from '@/lib/coupons';
import type { Coupon } from '@/types/database';

type CouponFormData = {
  code: string;
  name: string;
  description: string;
  type: Coupon['type'];
  value: string;
  min_order_amount: string;
  max_discount_amount: string;
  usage_limit: string;
  per_customer_limit: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
};

const emptyForm: CouponFormData = {
  code: '',
  name: '',
  description: '',
  type: 'percentage',
  value: '',
  min_order_amount: '',
  max_discount_amount: '',
  usage_limit: '',
  per_customer_limit: '1',
  start_date: '',
  end_date: '',
  is_active: true,
};

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [showDialog, setShowDialog] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<CouponFormData>(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadCoupons();
  }, []);

  const loadCoupons = async () => {
    setLoading(true);
    const data = await getCoupons();
    setCoupons(data);
    setLoading(false);
  };

  const openCreate = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setShowDialog(true);
  };

  const openEdit = (coupon: Coupon) => {
    setEditingId(coupon.id);
    setFormData({
      code: coupon.code,
      name: coupon.name,
      description: coupon.description || '',
      type: coupon.type,
      value: String(coupon.value),
      min_order_amount: coupon.min_order_amount ? String(coupon.min_order_amount) : '',
      max_discount_amount: coupon.max_discount_amount ? String(coupon.max_discount_amount) : '',
      usage_limit: coupon.usage_limit !== null && coupon.usage_limit !== undefined ? String(coupon.usage_limit) : '',
      per_customer_limit: String(coupon.per_customer_limit || 1),
      start_date: coupon.start_date ? coupon.start_date.slice(0, 16) : '',
      end_date: coupon.end_date ? coupon.end_date.slice(0, 16) : '',
      is_active: coupon.is_active,
    });
    setShowDialog(true);
  };

  const handleSave = async () => {
    if (!formData.code.trim() || !formData.name.trim()) {
      toast.error('يرجى إدخال الكود والاسم');
      return;
    }
    const numericValue = parseFloat(formData.value);
    if (isNaN(numericValue) || numericValue < 0) {
      toast.error('يرجى إدخال قيمة صحيحة');
      return;
    }

    setSaving(true);
    const payload = {
      code: formData.code.toUpperCase().trim(),
      name: formData.name.trim(),
      description: formData.description.trim() || undefined,
      type: formData.type,
      value: numericValue,
      min_order_amount: formData.min_order_amount ? parseFloat(formData.min_order_amount) : undefined,
      max_discount_amount: formData.max_discount_amount ? parseFloat(formData.max_discount_amount) : undefined,
      usage_limit: formData.usage_limit ? parseInt(formData.usage_limit, 10) : undefined,
      per_customer_limit: parseInt(formData.per_customer_limit, 10) || 1,
      start_date: formData.start_date ? new Date(formData.start_date).toISOString() : undefined,
      end_date: formData.end_date ? new Date(formData.end_date).toISOString() : undefined,
      is_active: formData.is_active,
      metadata: {},
    };

    if (editingId) {
      const success = await updateCoupon(editingId, payload);
      if (success) {
        toast.success('تم تحديث الكوبون');
        setShowDialog(false);
        loadCoupons();
      } else {
        toast.error('حدث خطأ أثناء التحديث');
      }
    } else {
      const created = await createCoupon(payload);
      if (created) {
        toast.success('تم إنشاء الكوبون');
        setShowDialog(false);
        loadCoupons();
      } else {
        toast.error('حدث خطأ أثناء الإنشاء');
      }
    }
    setSaving(false);
  };

  const handleDelete = async (coupon: Coupon) => {
    if (!window.confirm(`هل أنت متأكد من حذف الكوبون "${coupon.code}"؟`)) return;
    const success = await deleteCoupon(coupon.id);
    if (success) {
      toast.success('تم حذف الكوبون');
      loadCoupons();
    } else {
      toast.error('حدث خطأ أثناء الحذف');
    }
  };

  const handleToggleActive = async (coupon: Coupon) => {
    const success = await updateCoupon(coupon.id, { is_active: !coupon.is_active });
    if (success) {
      toast.success(coupon.is_active ? 'تم إلغاء تفعيل الكوبون' : 'تم تفعيل الكوبون');
      loadCoupons();
    } else {
      toast.error('حدث خطأ');
    }
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success(`تم نسخ الكود: ${code}`);
  };

  const formatDate = (date?: string) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatValue = (coupon: Coupon) => {
    if (coupon.type === 'percentage') return `${coupon.value}%`;
    if (coupon.type === 'fixed') return `${coupon.value.toFixed(3)} د.ك`;
    if (coupon.type === 'free_delivery') return 'توصيل مجاني';
    if (coupon.type === 'buy_x_get_y') return `${coupon.value}`;
    return `${coupon.value}`;
  };

  const getTypeLabel = (type: Coupon['type']) => {
    const labels: Record<Coupon['type'], string> = {
      percentage: 'نسبة مئوية',
      fixed: 'مبلغ ثابت',
      free_delivery: 'توصيل مجاني',
      buy_x_get_y: 'اشترِ واحصل',
    };
    return labels[type] || type;
  };

  const filteredCoupons = coupons.filter(c => {
    const matchesSearch =
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.name.toLowerCase().includes(search.toLowerCase());
    if (filter === 'active') return matchesSearch && c.is_active;
    if (filter === 'inactive') return matchesSearch && !c.is_active;
    return matchesSearch;
  });

  const activeCount = coupons.filter(c => c.is_active).length;
  const totalUsage = coupons.reduce((sum, c) => sum + c.used_count, 0);

  return (
    <AdminLayout>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[#1A1A1A]">الكوبونات</h2>
            <p className="text-[#6B6B6B]">إدارة كوبونات الخصم والعروض</p>
          </div>
          <Button
            onClick={openCreate}
            className="bg-[#C9A96E] hover:bg-[#D4AF37] text-white"
          >
            <Plus className="w-5 h-5" />
            إضافة كوبون
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#C9A96E]/10 rounded-lg">
                <Tag className="w-6 h-6 text-[#C9A96E]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1A1A1A]">{coupons.length}</p>
                <p className="text-sm text-[#6B6B6B]">إجمالي الكوبونات</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Percent className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1A1A1A]">{activeCount}</p>
                <p className="text-sm text-[#6B6B6B]">كوبونات نشطة</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1A1A1A]">{totalUsage}</p>
                <p className="text-sm text-[#6B6B6B]">مرات الاستخدام</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-[#E8E0D5] p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B6B]" />
            <Input
              type="text"
              placeholder="ابحث بالكود أو الاسم..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pr-10 bg-[#FAF8F5] border-[#E8E0D5] focus-visible:ring-[#C9A96E]"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${filter === 'all' ? 'bg-[#C9A96E] text-white' : 'bg-[#F5F0E8] text-[#6B6B6B] hover:bg-[#E8E0D5]'}`}
            >
              الكل ({coupons.length})
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-4 py-2 rounded-lg transition-colors ${filter === 'active' ? 'bg-green-500 text-white' : 'bg-[#F5F0E8] text-[#6B6B6B] hover:bg-[#E8E0D5]'}`}
            >
              نشط ({activeCount})
            </button>
            <button
              onClick={() => setFilter('inactive')}
              className={`px-4 py-2 rounded-lg transition-colors ${filter === 'inactive' ? 'bg-red-500 text-white' : 'bg-[#F5F0E8] text-[#6B6B6B] hover:bg-[#E8E0D5]'}`}
            >
              غير نشط ({coupons.length - activeCount})
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#E8E0D5] overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-[#6B6B6B]">جاري التحميل...</div>
        ) : filteredCoupons.length === 0 ? (
          <div className="p-8 text-center text-[#6B6B6B]">
            <Tag className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>لا توجد كوبونات</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F5F0E8] hover:bg-[#F5F0E8]">
                <TableHead className="text-right text-[#1A1A1A] font-medium">الكود</TableHead>
                <TableHead className="text-right text-[#1A1A1A] font-medium">الاسم</TableHead>
                <TableHead className="text-center text-[#1A1A1A] font-medium">النوع</TableHead>
                <TableHead className="text-center text-[#1A1A1A] font-medium">القيمة</TableHead>
                <TableHead className="text-center text-[#1A1A1A] font-medium">الاستخدام</TableHead>
                <TableHead className="text-center text-[#1A1A1A] font-medium">الحالة</TableHead>
                <TableHead className="text-center text-[#1A1A1A] font-medium">الصلاحية</TableHead>
                <TableHead className="text-center text-[#1A1A1A] font-medium">إجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCoupons.map(coupon => (
                <TableRow key={coupon.id} className="hover:bg-[#FAF8F5]">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <code className="px-2 py-1 bg-[#F5F0E8] text-[#C9A96E] rounded font-mono text-sm font-bold">
                        {coupon.code}
                      </code>
                      <button
                        onClick={() => handleCopy(coupon.code)}
                        className="p-1 text-[#6B6B6B] hover:text-[#C9A96E]"
                        title="نسخ"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-[#1A1A1A]">{coupon.name}</p>
                      {coupon.description && (
                        <p className="text-sm text-[#6B6B6B] line-clamp-1">{coupon.description}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className="border-[#C9A96E] text-[#C9A96E]">
                      {getTypeLabel(coupon.type)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="font-bold text-[#C9A96E]">{formatValue(coupon)}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-[#1A1A1A]">
                      {coupon.used_count}
                      {coupon.usage_limit ? ` / ${coupon.usage_limit}` : ' / ∞'}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    {coupon.is_active ? (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">نشط</Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-700 hover:bg-red-100">غير نشط</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="text-sm text-[#6B6B6B]">
                      <div>{formatDate(coupon.start_date)}</div>
                      <div>↓</div>
                      <div>{formatDate(coupon.end_date)}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => openEdit(coupon)}
                        className="p-2 text-[#6B6B6B] hover:text-[#C9A96E]"
                        title="تعديل"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleToggleActive(coupon)}
                        className={`p-2 ${coupon.is_active ? 'text-green-500 hover:text-green-600' : 'text-red-500 hover:text-red-600'}`}
                        title={coupon.is_active ? 'إلغاء التفعيل' : 'تفعيل'}
                      >
                        {coupon.is_active ? '✓' : '✗'}
                      </button>
                      <button
                        onClick={() => handleDelete(coupon)}
                        className="p-2 text-[#6B6B6B] hover:text-red-500"
                        title="حذف"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
          <DialogHeader>
            <DialogTitle className="text-[#1A1A1A]">
              {editingId ? 'تعديل الكوبون' : 'إضافة كوبون جديد'}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
            <div>
              <Label htmlFor="code" className="text-[#1A1A1A]">الكود *</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="مثال: WELCOME10"
                className="mt-1 bg-[#FAF8F5] border-[#E8E0D5]"
                style={{ textTransform: 'uppercase' }}
              />
            </div>
            <div>
              <Label htmlFor="name" className="text-[#1A1A1A]">الاسم *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="مثال: خصم ترحيبي"
                className="mt-1 bg-[#FAF8F5] border-[#E8E0D5]"
              />
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="description" className="text-[#1A1A1A]">الوصف</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="وصف اختياري للكوبون"
                className="mt-1 bg-[#FAF8F5] border-[#E8E0D5]"
              />
            </div>

            <div>
              <Label htmlFor="type" className="text-[#1A1A1A]">النوع *</Label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as Coupon['type'] })}
                className="mt-1 w-full h-10 px-3 bg-[#FAF8F5] border border-[#E8E0D5] rounded-md text-sm focus:outline-none focus:border-[#C9A96E]"
              >
                <option value="percentage">نسبة مئوية</option>
                <option value="fixed">مبلغ ثابت</option>
                <option value="free_delivery">توصيل مجاني</option>
                <option value="buy_x_get_y">اشترِ واحصل</option>
              </select>
            </div>
            <div>
              <Label htmlFor="value" className="text-[#1A1A1A]">القيمة *</Label>
              <Input
                id="value"
                type="number"
                step="0.01"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                placeholder={formData.type === 'percentage' ? 'مثال: 10' : 'مثال: 5.000'}
                className="mt-1 bg-[#FAF8F5] border-[#E8E0D5]"
              />
            </div>

            <div>
              <Label htmlFor="min_order_amount" className="text-[#1A1A1A]">الحد الأدنى للطلب</Label>
              <Input
                id="min_order_amount"
                type="number"
                step="0.001"
                value={formData.min_order_amount}
                onChange={(e) => setFormData({ ...formData, min_order_amount: e.target.value })}
                placeholder="اختياري"
                className="mt-1 bg-[#FAF8F5] border-[#E8E0D5]"
              />
            </div>
            <div>
              <Label htmlFor="max_discount_amount" className="text-[#1A1A1A]">الحد الأقصى للخصم</Label>
              <Input
                id="max_discount_amount"
                type="number"
                step="0.001"
                value={formData.max_discount_amount}
                onChange={(e) => setFormData({ ...formData, max_discount_amount: e.target.value })}
                placeholder="اختياري (للنسبة المئوية)"
                className="mt-1 bg-[#FAF8F5] border-[#E8E0D5]"
              />
            </div>

            <div>
              <Label htmlFor="usage_limit" className="text-[#1A1A1A]">حد الاستخدام الكلي</Label>
              <Input
                id="usage_limit"
                type="number"
                value={formData.usage_limit}
                onChange={(e) => setFormData({ ...formData, usage_limit: e.target.value })}
                placeholder="فارغ = غير محدود"
                className="mt-1 bg-[#FAF8F5] border-[#E8E0D5]"
              />
            </div>
            <div>
              <Label htmlFor="per_customer_limit" className="text-[#1A1A1A]">حد الاستخدام للعميل</Label>
              <Input
                id="per_customer_limit"
                type="number"
                value={formData.per_customer_limit}
                onChange={(e) => setFormData({ ...formData, per_customer_limit: e.target.value })}
                className="mt-1 bg-[#FAF8F5] border-[#E8E0D5]"
              />
            </div>

            <div>
              <Label htmlFor="start_date" className="text-[#1A1A1A]">تاريخ البداية</Label>
              <Input
                id="start_date"
                type="datetime-local"
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                className="mt-1 bg-[#FAF8F5] border-[#E8E0D5]"
              />
            </div>
            <div>
              <Label htmlFor="end_date" className="text-[#1A1A1A]">تاريخ النهاية</Label>
              <Input
                id="end_date"
                type="datetime-local"
                value={formData.end_date}
                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                className="mt-1 bg-[#FAF8F5] border-[#E8E0D5]"
              />
            </div>

            <div className="sm:col-span-2 flex items-center gap-2">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="w-4 h-4 accent-[#C9A96E]"
              />
              <Label htmlFor="is_active" className="cursor-pointer">فعّال</Label>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setShowDialog(false)}
              disabled={saving}
            >
              إلغاء
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-[#C9A96E] hover:bg-[#D4AF37] text-white"
            >
              {saving ? 'جاري الحفظ...' : (editingId ? 'حفظ التعديلات' : 'إنشاء الكوبون')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}