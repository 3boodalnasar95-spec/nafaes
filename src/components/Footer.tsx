import { Link } from 'react-router-dom';
import { Laptop, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Laptop className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">TechStore</span>
            </Link>
            <p className="text-slate-400 text-sm mb-4">
              متجرك الأول للتقنيات والأجهزة الإلكترونية. نقدم أفضل المنتجات بأفضل الأسعار مع ضمان الجودة والتوصيل السريع.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-400 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-pink-600 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-red-600 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-slate-400 hover:text-white text-sm transition-colors">الرئيسية</Link></li>
              <li><Link to="/products" className="text-slate-400 hover:text-white text-sm transition-colors">المنتجات</Link></li>
              <li><Link to="/services" className="text-slate-400 hover:text-white text-sm transition-colors">خدماتنا</Link></li>
              <li><Link to="/about" className="text-slate-400 hover:text-white text-sm transition-colors">من نحن</Link></li>
              <li><Link to="/blog" className="text-slate-400 hover:text-white text-sm transition-colors">المدونة</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-white text-sm transition-colors">تواصل معنا</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">الفئات</h3>
            <ul className="space-y-2">
              <li><Link to="/products?category=laptops" className="text-slate-400 hover:text-white text-sm transition-colors">أجهزة laptops</Link></li>
              <li><Link to="/products?category=phones" className="text-slate-400 hover:text-white text-sm transition-colors">هواتف ذكية</Link></li>
              <li><Link to="/products?category=tablets" className="text-slate-400 hover:text-white text-sm transition-colors">أجهزة لوحية</Link></li>
              <li><Link to="/products?category=accessories" className="text-slate-400 hover:text-white text-sm transition-colors">إكسسوارات</Link></li>
              <li><Link to="/products?category=gaming" className="text-slate-400 hover:text-white text-sm transition-colors">ألعاب</Link></li>
              <li><Link to="/products?category=cameras" className="text-slate-400 hover:text-white text-sm transition-colors">كاميرات</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">تواصل معنا</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-slate-400 text-sm">
                <MapPin className="w-4 h-4 text-blue-400" />
                الرياض، المملكة العربية السعودية
              </li>
              <li className="flex items-center gap-2 text-slate-400 text-sm">
                <Phone className="w-4 h-4 text-blue-400" />
                +966 50 123 4567
              </li>
              <li className="flex items-center gap-2 text-slate-400 text-sm">
                <Mail className="w-4 h-4 text-blue-400" />
                info@techstore.com
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © 2024 TechStore. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-slate-500 hover:text-white text-sm transition-colors">سياسة الخصوصية</a>
            <a href="#" className="text-slate-500 hover:text-white text-sm transition-colors">الشروط والأحكام</a>
          </div>
        </div>
      </div>
    </footer>
  );
}