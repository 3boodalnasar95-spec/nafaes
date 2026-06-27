import { Link } from 'react-router-dom';
import { Instagram, MessageCircle, Database } from 'lucide-react';

interface FooterProps {
  localMode?: boolean;
}

export default function Footer({ localMode = false }: FooterProps) {
  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C9A96E] to-[#D4AF37] flex items-center justify-center">
                <span className="text-white font-bold text-xl">ن</span>
              </div>
              <div>
                <span className="text-2xl font-bold tracking-wide">NAFAES</span>
                <span className="block text-[10px] text-[#888] tracking-widest">ESSENCE OF ELEGANCE</span>
              </div>
            </div>
            <p className="text-[#888] text-sm mb-4 leading-relaxed">
              في نفائس، نختار لكم منتجات عطرية راقية تضيف للمنزل والمكتب لمسة من الأناقة والهدوء.
            </p>
            <a
              href="https://instagram.com/nafaes.q8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#C9A96E] hover:text-[#D4AF37] transition-colors"
            >
              <Instagram className="w-5 h-5" />
              <span className="text-sm">@nafaes.q8</span>
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#C9A96E] font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-[#888] hover:text-white text-sm transition-colors">الرئيسية</Link></li>
              <li><Link to="/products" className="text-[#888] hover:text-white text-sm transition-colors">المنتجات</Link></li>
              <li><Link to="/cart" className="text-[#888] hover:text-white text-sm transition-colors">السلة</Link></li>
              <li><Link to="/contact" className="text-[#888] hover:text-white text-sm transition-colors">تواصل معنا</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[#C9A96E] font-semibold mb-4">تواصل معنا</h3>
            <p className="text-[#888] text-sm mb-4">
              للطلب والاستفسار عبر واتساب
            </p>
            <a
              href="https://wa.me/96566377312"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-medium px-4 py-2 rounded-full transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>66377312</span>
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-[#333] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#666] text-sm">
            © 2024 NAFAES | نفائس. جميع الحقوق محفوظة.
          </p>
          {localMode && (
            <span className="inline-flex items-center gap-2 bg-[#C9A96E]/20 text-[#C9A96E] text-xs font-medium px-3 py-1.5 rounded-full border border-[#C9A96E]/40">
              <Database className="w-3.5 h-3.5" />
              <span>حالة النظام: وضع محلي</span>
            </span>
          )}
        </div>
      </div>
    </footer>
  );
}