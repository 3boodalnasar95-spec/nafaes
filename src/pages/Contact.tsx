import { MessageCircle, Instagram, MapPin, Phone, Navigation } from 'lucide-react';
import Layout from '../components/Layout';

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '96566377312';
const STORE_PHONE = '+965 6637 7312';
const STORE_ADDRESS_AR = 'الكويت - محافظة حولي - منطقة السالمية';
const STORE_ADDRESS_EN = 'Kuwait - Hawalli Governorate - Salmiya Area';
const MAPS_URL = 'https://maps.google.com/?q=Salmiya,+Kuwait';

export default function Contact() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#F5F0E8] to-[#FAF8F5] py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">للطلب والاستفسار</h1>
          <p className="text-[#6B6B6B] max-w-xl mx-auto">
            يمكنكم إتمام الطلب من خلال الموقع أو التواصل معنا مباشرة عبر واتساب
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* WhatsApp */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-4 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xl py-8 px-6 rounded-2xl mb-6 transition-colors shadow-lg hover:shadow-xl"
            >
              <MessageCircle className="w-10 h-10" />
              <div className="text-right">
                <span className="block text-lg">واتساب الطلبات</span>
                <span className="text-3xl font-bold" dir="ltr">{WHATSAPP_NUMBER}</span>
              </div>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/nafaes.q8"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-4 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77729] hover:opacity-90 text-white font-bold text-xl py-8 px-6 rounded-2xl mb-6 transition-opacity shadow-lg hover:shadow-xl"
            >
              <Instagram className="w-10 h-10" />
              <div className="text-right">
                <span className="block text-lg">تابعونا على إنستغرام</span>
                <span className="text-2xl font-bold">@nafaes.q8</span>
              </div>
            </a>

            {/* Phone */}
            <a
              href={`tel:+${WHATSAPP_NUMBER}`}
              className="flex items-center justify-center gap-4 bg-white border border-[#E8E0D5] hover:bg-[#FAF8F5] text-[#1A1A1A] font-bold text-xl py-6 px-6 rounded-2xl mb-6 transition-colors shadow-sm"
            >
              <Phone className="w-8 h-8 text-[#C9A96E]" />
              <div className="text-right">
                <span className="block text-sm text-[#6B6B6B]">اتصل بنا</span>
                <span className="text-2xl font-bold" dir="ltr">{STORE_PHONE}</span>
              </div>
            </a>

            {/* Address & Directions */}
            <div className="bg-white rounded-2xl border border-[#E8E0D5] p-6 mb-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-[#C9A96E]/10 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-[#C9A96E]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#1A1A1A] mb-1">العنوان</h3>
                  <p className="text-[#6B6B6B] text-base">{STORE_ADDRESS_AR}</p>
                  <p className="text-[#6B6B6B] text-sm mt-1" dir="ltr">{STORE_ADDRESS_EN}</p>
                </div>
              </div>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#C9A96E] hover:bg-[#D4AF37] text-white font-medium py-3 px-4 rounded-xl transition-colors"
              >
                <Navigation className="w-5 h-5" />
                <span>احصل على الاتجاهات</span>
              </a>
            </div>

            {/* Info Card */}
            <div className="bg-white rounded-2xl border border-[#E8E0D5] p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#C9A96E]/10 rounded-full flex items-center justify-center">
                <span className="text-3xl">✨</span>
              </div>
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">NAFAES | نفائس</h2>
              <p className="text-[#6B6B6B] mb-4">Luxury Home Fragrance</p>
              <p className="text-[#6B6B6B]">
                أجهزة تعطير | معطرات أعواد | هدايا عطرية
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}