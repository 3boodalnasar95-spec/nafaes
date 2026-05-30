import { useState, useEffect } from 'react';
import { Save, Store, Truck, MessageCircle, Check, Bell, Globe, CreditCard } from 'lucide-react';
import AdminLayout from './AdminLayout';
import { getSettings, updateSetting, updateSettings } from '@/lib/db-operations';

export default function AdminSettings() {
  const [settings, setSettings] = useState<Record<string, string>>({
    store_name: 'NAFAES | نفائس',
    store_email: 'info@nafaes.com',
    store_phone: '66377312',
    whatsapp_number: '96566377312',
    whatsapp_message: 'مرحباً! أرغب بالاستفسار عن منتجات نفائس',
    delivery_fee: '2',
    free_delivery_threshold: '50',
    min_order_amount: '5',
    currency: 'KWD',
    currency_symbol: 'د.ك',
    address: 'الكويت',
    tax_percent: '0',
  });
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'delivery' | 'contact' | 'advanced'>('general');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    const data = await getSettings();
    setSettings(prev => ({ ...prev, ...data }));
    setLoading(false);
  };

  const handleSave = async () => {
    setSaved(false);
    await updateSettings(settings);
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

  const tabs = [
    { key: 'general', label: 'عام', icon: Store },
    { key: 'delivery', label: 'التوصيل', icon: Truck },
    { key: 'contact', label: 'التواصل', icon: MessageCircle },
    { key: 'advanced', label: 'متقدم', icon: Globe },
  ];

  return (
    <AdminLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#1A1A1A]">الإعدادات</h2>
        <p className="text-[#6B6B6B]">إعدادات المتجر العامة</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tabs */}
        <div className="lg:w-64">
          <div className="bg-white rounded-xl border border-[#E8E0D5] p-2 sticky top-24">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as typeof activeTab)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-right ${
                    activeTab === tab.key
                      ? 'bg-[#C9A96E] text-white'
                      : 'text-[#6B6B6B] hover:bg-[#F5F0E8]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          <div className="bg-white rounded-xl border border-[#E8E0D5] p-6">
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Store className="w-5 h-5 text-[#C9A96E]" />
                  <h3 className="font-bold text-[#1A1A1A]">المعلومات العامة</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      value={settings.store_email || ''}
                      onChange={(e) => handleChange('store_email', e.target.value)}
                      className="w-full px-4 py-2 bg-[#FAF8F5] border border-[#E8E0D5] rounded-lg focus:outline-none focus:border-[#C9A96E]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A1A] mb-1">رقم الهاتف</label>
                    <input
                      type="tel"
                      value={settings.store_phone || ''}
                      onChange={(e) => handleChange('store_phone', e.target.value)}
                      className="w-full px-4 py-2 bg-[#FAF8F5] border border-[#E8E0D5] rounded-lg focus:outline-none focus:border-[#C9A96E]"
                      dir="ltr"
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
            )}

            {/* Delivery Settings */}
            {activeTab === 'delivery' && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Truck className="w-5 h-5 text-[#C9A96E]" />
                  <h3 className="font-bold text-[#1A1A1A]">إعدادات التوصيل</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A1A] mb-1">حد التوصيل المجاني (د.ك)</label>
                    <input
                      type="number"
                      step="0.001"
                      value={settings.free_delivery_threshold || '50'}
                      onChange={(e) => handleChange('free_delivery_threshold', e.target.value)}
                      className="w-full px-4 py-2 bg-[#FAF8F5] border border-[#E8E0D5] rounded-lg focus:outline-none focus:border-[#C9A96E]"
                      dir="ltr"
                    />
                    <p className="text-xs text-[#6B6B6B] mt-1">اتركها 0 لتعطيل التوصيل المجاني</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A1A] mb-1">الحد الأدنى للطلب (د.ك)</label>
                    <input
                      type="number"
                      step="0.001"
                      value={settings.min_order_amount || '5'}
                      onChange={(e) => handleChange('min_order_amount', e.target.value)}
                      className="w-full px-4 py-2 bg-[#FAF8F5] border border-[#E8E0D5] rounded-lg focus:outline-none focus:border-[#C9A96E]"
                      dir="ltr"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Contact Settings */}
            {activeTab === 'contact' && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <MessageCircle className="w-5 h-5 text-[#C9A96E]" />
                  <h3 className="font-bold text-[#1A1A1A]">إعدادات التواصل</h3>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
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
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A1A] mb-1">رسالة الواتساب الافتراضية</label>
                    <textarea
                      value={settings.whatsapp_message || ''}
                      onChange={(e) => handleChange('whatsapp_message', e.target.value)}
                      className="w-full px-4 py-2 bg-[#FAF8F5] border border-[#E8E0D5] rounded-lg focus:outline-none focus:border-[#C9A96E] resize-none"
                      rows={3}
                    />
                  </div>
                </div>

                {/* WhatsApp Preview */}
                <div className="bg-[#F5F0E8] rounded-xl p-4">
                  <p className="text-sm font-medium text-[#1A1A1A] mb-2">معاينة:</p>
                  <a
                    href={`https://wa.me/${settings.whatsapp_number}?text=${encodeURIComponent(settings.whatsapp_message || '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-lg hover:bg-[#20BD5A] transition-colors w-fit"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>فتح في واتساب</span>
                  </a>
                </div>
              </div>
            )}

            {/* Advanced Settings */}
            {activeTab === 'advanced' && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="w-5 h-5 text-[#C9A96E]" />
                  <h3 className="font-bold text-[#1A1A1A]">إعدادات متقدمة</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A1A] mb-1">العملة</label>
                    <select
                      value={settings.currency || 'KWD'}
                      onChange={(e) => handleChange('currency', e.target.value)}
                      className="w-full px-4 py-2 bg-[#FAF8F5] border border-[#E8E0D5] rounded-lg focus:outline-none focus:border-[#C9A96E]"
                    >
                      <option value="KWD">KWD - دينار كويتي</option>
                      <option value="SAR">SAR - ريال سعودي</option>
                      <option value="AED">AED - درهم إماراتي</option>
                      <option value="USD">USD - دولار أمريكي</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A1A] mb-1">رمز العملة</label>
                    <input
                      type="text"
                      value={settings.currency_symbol || 'د.ك'}
                      onChange={(e) => handleChange('currency_symbol', e.target.value)}
                      className="w-full px-4 py-2 bg-[#FAF8F5] border border-[#E8E0D5] rounded-lg focus:outline-none focus:border-[#C9A96E]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A1A] mb-1">نسبة الضريبة (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={settings.tax_percent || '0'}
                      onChange={(e) => handleChange('tax_percent', e.target.value)}
                      className="w-full px-4 py-2 bg-[#FAF8F5] border border-[#E8E0D5] rounded-lg focus:outline-none focus:border-[#C9A96E]"
                      dir="ltr"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="border-t border-[#E8E0D5] pt-6 mt-6">
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
      </div>
    </AdminLayout>
  );
}