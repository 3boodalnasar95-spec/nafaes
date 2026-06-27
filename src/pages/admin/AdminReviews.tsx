import { useState, useEffect } from 'react';
import { Star, Check, X, Trash2, Eye, MessageSquare, Search } from 'lucide-react';
import { toast } from 'sonner';
import AdminLayout from './AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getReviews, approveReview, rejectReview, deleteReview } from '@/lib/reviews';
import type { Review } from '@/types/database';

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          className={`w-4 h-4 ${i <= rating ? 'fill-[#C9A96E] text-[#C9A96E]' : 'text-[#E8E0D5]'}`}
        />
      ))}
    </div>
  );
};

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'approved' | 'pending'>('all');
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    setLoading(true);
    const data = await getReviews();
    setReviews(data);
    setLoading(false);
  };

  const handleApprove = async (review: Review) => {
    const success = await approveReview(review.id);
    if (success) {
      toast.success('تم قبول المراجعة');
      loadReviews();
    } else {
      toast.error('حدث خطأ');
    }
  };

  const handleReject = async (review: Review) => {
    const success = await rejectReview(review.id);
    if (success) {
      toast.success('تم رفض المراجعة');
      loadReviews();
    } else {
      toast.error('حدث خطأ');
    }
  };

  const handleDelete = async (review: Review) => {
    if (!window.confirm('هل أنت متأكد من حذف هذه المراجعة؟')) return;
    const success = await deleteReview(review.id);
    if (success) {
      toast.success('تم حذف المراجعة');
      loadReviews();
      if (selectedReview?.id === review.id) {
        setSelectedReview(null);
      }
    } else {
      toast.error('حدث خطأ');
    }
  };

  const formatDate = (date?: string) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getProductName = (review: Review) => {
    return review.product?.name_ar || `منتج #${review.product_id.slice(0, 8)}`;
  };

  const getCustomerName = (review: Review) => {
    return review.customer?.name || `عميل #${review.customer_id.slice(0, 8)}`;
  };

  const filteredReviews = reviews.filter(r => {
    const matchesSearch =
      getProductName(r).includes(search) ||
      getCustomerName(r).includes(search) ||
      (r.comment?.includes(search) ?? false);
    if (filter === 'approved') return matchesSearch && r.is_approved;
    if (filter === 'pending') return matchesSearch && !r.is_approved;
    return matchesSearch;
  });

  const approvedCount = reviews.filter(r => r.is_approved).length;
  const pendingCount = reviews.length - approvedCount;
  const avgRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  return (
    <AdminLayout>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[#1A1A1A]">المراجعات والتقييمات</h2>
            <p className="text-[#6B6B6B]">إدارة مراجعات المنتجات</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#C9A96E]/10 rounded-lg">
                <MessageSquare className="w-6 h-6 text-[#C9A96E]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1A1A1A]">{reviews.length}</p>
                <p className="text-sm text-[#6B6B6B]">إجمالي المراجعات</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1A1A1A]">{approvedCount}</p>
                <p className="text-sm text-[#6B6B6B]">معتمدة</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <X className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1A1A1A]">{pendingCount}</p>
                <p className="text-sm text-[#6B6B6B]">بانتظار الموافقة</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#C9A96E]/10 rounded-lg">
                <Star className="w-6 h-6 text-[#C9A96E] fill-[#C9A96E]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1A1A1A]">
                  {avgRating.toFixed(1)}
                </p>
                <p className="text-sm text-[#6B6B6B]">متوسط التقييم</p>
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
              placeholder="ابحث بالمنتج أو العميل أو التعليق..."
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
              الكل ({reviews.length})
            </button>
            <button
              onClick={() => setFilter('approved')}
              className={`px-4 py-2 rounded-lg transition-colors ${filter === 'approved' ? 'bg-green-500 text-white' : 'bg-[#F5F0E8] text-[#6B6B6B] hover:bg-[#E8E0D5]'}`}
            >
              معتمد ({approvedCount})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg transition-colors ${filter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-[#F5F0E8] text-[#6B6B6B] hover:bg-[#E8E0D5]'}`}
            >
              قيد المراجعة ({pendingCount})
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#E8E0D5] overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-[#6B6B6B]">جاري التحميل...</div>
        ) : filteredReviews.length === 0 ? (
          <div className="p-8 text-center text-[#6B6B6B]">
            <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>لا توجد مراجعات</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F5F0E8] hover:bg-[#F5F0E8]">
                <TableHead className="text-right text-[#1A1A1A] font-medium">المنتج</TableHead>
                <TableHead className="text-right text-[#1A1A1A] font-medium">العميل</TableHead>
                <TableHead className="text-center text-[#1A1A1A] font-medium">التقييم</TableHead>
                <TableHead className="text-right text-[#1A1A1A] font-medium">التعليق</TableHead>
                <TableHead className="text-center text-[#1A1A1A] font-medium">الحالة</TableHead>
                <TableHead className="text-center text-[#1A1A1A] font-medium">التاريخ</TableHead>
                <TableHead className="text-center text-[#1A1A1A] font-medium">إجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReviews.map(review => (
                <TableRow key={review.id} className="hover:bg-[#FAF8F5]">
                  <TableCell>
                    <p className="font-medium text-[#1A1A1A]">{getProductName(review)}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-[#1A1A1A]">{getCustomerName(review)}</p>
                  </TableCell>
                  <TableCell className="text-center">
                    <StarRating rating={review.rating} />
                  </TableCell>
                  <TableCell>
                    <p className="text-[#6B6B6B] line-clamp-2 max-w-xs">
                      {review.comment || review.title || '—'}
                    </p>
                  </TableCell>
                  <TableCell className="text-center">
                    {review.is_approved ? (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">معتمد</Badge>
                    ) : (
                      <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">قيد المراجعة</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-center text-[#6B6B6B] text-sm">
                    {formatDate(review.created_at)}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => setSelectedReview(review)}
                        className="p-2 text-[#6B6B6B] hover:text-[#C9A96E]"
                        title="عرض"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {!review.is_approved && (
                        <button
                          onClick={() => handleApprove(review)}
                          className="p-2 text-green-500 hover:text-green-600"
                          title="قبول"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      {review.is_approved && (
                        <button
                          onClick={() => handleReject(review)}
                          className="p-2 text-yellow-500 hover:text-yellow-600"
                          title="إلغاء الاعتماد"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(review)}
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

      {/* Review Detail Dialog */}
      <Dialog open={!!selectedReview} onOpenChange={(open) => !open && setSelectedReview(null)}>
        <DialogContent className="max-w-xl bg-white">
          <DialogHeader>
            <DialogTitle className="text-[#1A1A1A]">تفاصيل المراجعة</DialogTitle>
          </DialogHeader>
          {selectedReview && (
            <div className="space-y-4 py-4">
              <div className="bg-[#FAF8F5] rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6B6B6B]">المنتج:</span>
                  <span className="font-medium text-[#1A1A1A]">{getProductName(selectedReview)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6B6B6B]">العميل:</span>
                  <span className="font-medium text-[#1A1A1A]">{getCustomerName(selectedReview)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6B6B6B]">التقييم:</span>
                  <StarRating rating={selectedReview.rating} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6B6B6B]">التاريخ:</span>
                  <span className="text-[#1A1A1A]">
                    {new Date(selectedReview.created_at).toLocaleDateString('ar-SA', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6B6B6B]">الحالة:</span>
                  {selectedReview.is_approved ? (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">معتمد</Badge>
                  ) : (
                    <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">قيد المراجعة</Badge>
                  )}
                </div>
              </div>

              {selectedReview.title && (
                <div>
                  <p className="text-sm text-[#6B6B6B] mb-1">العنوان:</p>
                  <p className="font-bold text-[#1A1A1A]">{selectedReview.title}</p>
                </div>
              )}

              {selectedReview.comment && (
                <div>
                  <p className="text-sm text-[#6B6B6B] mb-1">التعليق:</p>
                  <p className="text-[#1A1A1A] bg-[#FAF8F5] p-3 rounded-lg">
                    {selectedReview.comment}
                  </p>
                </div>
              )}

              {selectedReview.reply && (
                <div>
                  <p className="text-sm text-[#6B6B6B] mb-1">رد المتجر:</p>
                  <p className="text-[#1A1A1A] bg-[#C9A96E]/10 p-3 rounded-lg border border-[#C9A96E]/20">
                    {selectedReview.reply}
                  </p>
                </div>
              )}

              {selectedReview.images && selectedReview.images.length > 0 && (
                <div>
                  <p className="text-sm text-[#6B6B6B] mb-2">الصور المرفقة:</p>
                  <div className="flex gap-2 flex-wrap">
                    {selectedReview.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`Review image ${i + 1}`}
                        className="w-20 h-20 object-cover rounded-lg border border-[#E8E0D5]"
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-2 border-t border-[#E8E0D5]">
                {!selectedReview.is_approved ? (
                  <Button
                    onClick={() => { handleApprove(selectedReview); setSelectedReview(null); }}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                  >
                    <Check className="w-4 h-4" />
                    قبول المراجعة
                  </Button>
                ) : (
                  <Button
                    onClick={() => { handleReject(selectedReview); setSelectedReview(null); }}
                    variant="outline"
                    className="flex-1 border-yellow-500 text-yellow-700 hover:bg-yellow-50"
                  >
                    <X className="w-4 h-4" />
                    إلغاء الاعتماد
                  </Button>
                )}
                <Button
                  onClick={() => handleDelete(selectedReview)}
                  variant="outline"
                  className="border-red-500 text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                  حذف
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}