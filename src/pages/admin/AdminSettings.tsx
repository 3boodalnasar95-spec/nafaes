import { useState, useEffect } from 'react';
import { Save, Store, Truck, MessageCircle, Check } from 'lucide-react';
import AdminLayout from './AdminLayout';
import { getSettings, updateSetting } from '@/lib/db-operations';

export default function AdminSettings() {
  const [settings, setSettings] = useState<Record<string, string>>({
    store_name: 'NAFAES | نفائس',
    store_phone: '66377312',
    whatsapp_number: '96566377312',
    delivery_fee: '2',
    address: 'الكويت',
    email: 'info@nafaes.com',
  });
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    const data = await getSettings();
    setSettings(data);
    setLoading(false);
  };

  const handleSave = async () => {
    setSaved(false);
    for (const [key, value] of Object.entries(settings)) {
      await updateSetting(key, value);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleChange = (key: string, value: string) => {
    setSettings({ ...settings, [key]: value });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-20">
          <div className="text-[#6B6B6B]">جاري التحميل...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#1A1A1A]">الإعدادات</h2>
        <p className="text-[#6B6B6B]">إعدادات المتجر العامة</p>
      </div>

      <div className="max-w-2xl">
        <div className="bg-white rounded-xl border border-[#E8E0D5] p-6 space-y-6">
          {/* Store Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Store className="w-5 h-5 text-[#C9A96E]" />
              <h3 className="font-bold text-[#1A1A1A]">معلومات المتجر</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-1">اسم المتجر</label>
                <input
                  type="text"
                  value={settings.store_name || ''}
                  onChange={(e) => handleChange('store_name', e.target.value)}
                  className="w-full px-4 py-2 bg-[#FAF8F5] border border-[#E8E0D5] rounded-lg focus:outline-none focus:border-[#C9A96E]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-1">البريد الإلكتروني</label>
                <input
                  type="email"
                  value={settings.email || ''}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-4 py-2 bg-[#FAF8F5] border border-[#E8E0D5] rounded-lg focus:outline-none focus:border-[#C9A96E]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-1">العنوان</label>
                <input
                  type="text"
                  value={settings.address || ''}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className="w-full px-4 py-2 bg-[#FAF8F5] border border-[#E8E0D5] rounded-lg focus:outline-none focus:border-[#C9A96E]"
                />
              </div>
            </div>
          </div>

          {/* Delivery */}
          <div className="border-t border-[#E8E0D5] pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Truck className="w-5 h-5 text-[#C9A96E]" />
              <h3 className="font-bold text-[#1A1A1A]">التوصيل</h3>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-1">رسوم التوصيل (د.ك)</label>
              <input
                type="number"
                step="0.001"
                value={settings.delivery_fee || '2'}
                onChange={(e) => handleChange('delivery_fee', e.target.value)}
                className="w-full px-4 py-2 bg-[#FAF8F5] border border-[#E8E0D5] rounded-lg focus:outline-none focus:border-[#C9A96E]"
                dir="ltr"
              />
            </div>
          </div>

          {/* WhatsApp */}
          <div className="border-t border-[#E8E0D5] pt-6">
            <div className="flex items-center gap-2 mb-4">
              <MessageCircle className="w-5 h-5 text-[#C9A96E]" />
              <h3 className="font-bold text-[#1A1A1A]">واتساب</h3>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-1">رقم الواتساب (بدون +)</label>
              <input
                type="text"
                value={settings.whatsapp_number || ''}
                onChange={(e) => handleChange('whatsapp_number', e.target.value)}
                className="w-full px-4 py-2 bg-[#FAF8F5] border border-[#E8E0D5] rounded-lg focus:outline-none focus:border-[#C9A96E]"
                dir="ltr"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="border-t border-[#E8E0D5] pt-6">
            <button
              onClick={handleSave}
              className="w-full flex items-center justify-center gap-2 bg-[#C9A96E] hover:bg-[#D4AF37] text-white py-3 rounded-lg transition-colors"
            >
              {saved ? (
                <>
                  <Check className="w-5 h-5" />
                  تم الحفظ بنجاح
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  حفظ الإعدادات
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}