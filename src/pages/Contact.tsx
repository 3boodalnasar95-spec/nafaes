import { MessageCircle, Instagram } from 'lucide-react';
import Layout from '../components/Layout';

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
              href="https://wa.me/96566377312"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-4 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xl py-8 px-6 rounded-2xl mb-6 transition-colors shadow-lg hover:shadow-xl"
            >
              <MessageCircle className="w-10 h-10" />
              <div className="text-right">
                <span className="block text-lg">واتساب الطلبات</span>
                <span className="text-3xl font-bold">66377312</span>
              </div>
            </a>

            {/* Info Card */}
            <div className="bg-white rounded-2xl border border-[#E8E0D5] p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#C9A96E]/10 rounded-full flex items-center justify-center">
                <span className="text-3xl">✨</span>
              </div>
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">NAFAES | نفائس</h2>
              <p className="text-[#6B6B6B] mb-4">Luxury Home Fragrance</p>
              <p className="text-[#6B6B6B]">
                أجهزة تعطير | زيوت عطرية | هدايا عطرية
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}