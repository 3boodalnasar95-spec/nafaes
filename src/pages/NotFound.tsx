import { Link } from 'react-router-dom';
import { Home, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl font-bold text-[#C9A96E] mb-4">404</div>
        <h1 className="text-3xl font-bold text-[#1A1A1A] mb-4">الصفحة غير موجودة</h1>
        <p className="text-[#6B6B6B] mb-8">
          عذراً، الصفحة التي تبحث عنها غير موجودة
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#C9A96E] text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          العودة للرئيسية
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}