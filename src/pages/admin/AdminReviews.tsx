import { useState } from 'react';
import { Star, Search } from 'lucide-react';
import AdminLayout from './AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function AdminReviews() {
  const [search, setSearch] = useState('');

  return (
    <AdminLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#1A1A1A]">التقييمات</h2>
        <p className="text-[#6B6B6B]">إدارة تقييمات المنتجات</p>
      </div>

      <Card>
        <CardContent className="p-8 text-center">
          <Star className="w-12 h-12 mx-auto mb-3 text-[#C9A96E] opacity-60" />
          <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">إدارة التقييمات</h3>
          <p className="text-[#6B6B6B]">مراجعة وتقييمات العملاء على المنتجات</p>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}