import { useState } from 'react';
import { Tag, Plus, Search } from 'lucide-react';
import { toast } from 'sonner';
import AdminLayout from './AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function AdminCoupons() {
  const [search, setSearch] = useState('');

  return (
    <AdminLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#1A1A1A]">الكوبونات</h2>
        <p className="text-[#6B6B6B]">إدارة كوبونات الخصم</p>
      </div>

      <Card>
        <CardContent className="p-8 text-center">
          <Tag className="w-12 h-12 mx-auto mb-3 text-[#C9A96E] opacity-60" />
          <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">إدارة الكوبونات</h3>
          <p className="text-[#6B6B6B] mb-6">قم بإدارة كوبونات الخصم والعروض الترويجية</p>
          <Button
            onClick={() => toast.info('سيتم تفعيل هذه الميزة قريباً')}
            className="bg-[#C9A96E] hover:bg-[#D4AF37]"
          >
            <Plus className="w-4 h-4 ml-2" />
            إضافة كوبون جديد
          </Button>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}