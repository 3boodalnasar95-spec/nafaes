import { Link } from 'react-router-dom';
import { Home, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl font-bold text-blue-500 mb-4">404</div>
        <h1 className="text-3xl font-bold text-white mb-4">الصفحة غير موجودة</h1>
        <p className="text-slate-400 mb-8">
          عذراً، الصفحة التي تبحث عنها غير موجودة
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          العودة للرئيسية
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
