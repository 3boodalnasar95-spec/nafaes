import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Truck, Shield, Headphones, CreditCard, Laptop, Smartphone, Tablet, HeadphonesIcon, Gamepad2, Camera, Star } from 'lucide-react';
import { useStore } from '../store/useStore';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';

export default function Index() {
  const { products, addToCart } = useStore();
  const navigate = useNavigate();

  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);
  const latestProducts = products.slice(0, 8);

  const categories = [
    { id: 'laptops', name: 'أجهزة laptops', icon: Laptop, count: 12 },
    { id: 'phones', name: 'هواتف ذكية', icon: Smartphone, count: 18 },
    { id: 'tablets', name: 'أجهزة لوحية', icon: Tablet, count: 8 },
    { id: 'accessories', name: 'إكسسوارات', icon: HeadphonesIcon, count: 45 },
    { id: 'gaming', name: 'ألعاب', icon: Gamepad2, count: 15 },
    { id: 'cameras', name: 'كاميرات', icon: Camera, count: 10 },
  ];

  const features = [
    { icon: Truck, title: 'توصيل سريع', description: 'توصيل خلال 24-48 ساعة' },
    { icon: Shield, title: 'ضمان الجودة', description: 'ضمان سنة على جميع المنتجات' },
    { icon: Headphones, title: 'دعم فني', description: 'دعم على مدار الساعة' },
    { icon: CreditCard, title: 'دفع آمن', description: 'طرق دفع متعددة وآمنة' },
  ];

  const testimonials = [
    { name: 'أحمد محمد', role: 'مهندس برمجيات', text: 'تجربة شراء ممتازة! المنتج وصل في حالة ممتازة والتغليف محترف جداً.', rating: 5 },
    { name: 'سارة أحمد', role: 'مصممة جرافيك', text: 'أفضل متجر للتقنيات. أسعار منافسة وخدمة عملاء راقية.', rating: 5 },
    { name: 'خالد العلي', role: 'رائد أعمال', text: 'أطلب من TechStore دائماً. موثوقية عالية وشحن سريع.', rating: 5 },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
        
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm mb-6">
              <Star className="w-4 h-4" />
              أقوى العروض على التقنيات
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              اكتشف عالم
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"> التقنيات </span>
              الحديثة
            </h1>
            <p className="text-slate-400 text-lg md:text-xl mb-8">
              أفضل الأجهزة الإلكترونية والتقنيات المتطورة بأسعار تنافسية. ضمان جودة، توصيل سريع، ودعم فني متواصل.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition-all hover:shadow-lg hover:shadow-blue-500/25"
              >
                تصفح المنتجات
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                خدماتنا
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {[
              { value: '10,000+', label: 'منتج متوفر' },
              { value: '50,000+', label: 'عميل سعيد' },
              { value: '4.9/5', label: 'تقييم العملاء' },
              { value: '24 ساعة', label: 'دعم متواصل' },
            ].map((stat, i) => (
              <div key={i} className="text-center md:text-right">
                <div className="text-2xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-slate-800/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">تصفح حسب الفئة</h2>
            <p className="text-slate-400">اختر الفئة التي تناسب احتياجاتك</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.id}
                  to={`/products?category=${cat.id}`}
                  className="group bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-blue-500/50 rounded-xl p-6 text-center transition-all hover:shadow-lg hover:shadow-blue-500/10"
                >
                  <div className="w-14 h-14 mx-auto mb-4 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-blue-400" />
                  </div>
                  <h3 className="text-white font-medium mb-1">{cat.name}</h3>
                  <p className="text-slate-500 text-sm">{cat.count} منتج</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">منتجات مميزة</h2>
              <p className="text-slate-400">اختياراتنا الأفضل لهذا الأسبوع</p>
            </div>
            <Link to="/products" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium">
              عرض الكل
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-slate-800/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <Icon className="w-7 h-7 text-blue-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{feat.title}</h3>
                  <p className="text-slate-400 text-sm">{feat.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">أحدث المنتجات</h2>
              <p className="text-slate-400">جرّب أحدث التقنيات المتاحة</p>
            </div>
            <Link to="/products" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium">
              عرض الكل
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">ماذا يقول عملاؤنا</h2>
            <p className="text-slate-400">آراء حقيقية من عملاء حقيقيين</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 mb-4 text-sm leading-relaxed">"{t.text}"</p>
                <div>
                  <p className="text-white font-medium">{t.name}</p>
                  <p className="text-slate-500 text-sm">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">هل أنت جاهز للبدء؟</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              انضم إلى آلاف العملاء السعداء واستمتع بأفضل تجربة تسوق للتقنيات والأجهزة الإلكترونية
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-slate-100 transition-colors"
              >
                تسوق الآن
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white/20 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/30 transition-colors"
              >
                تواصل معنا
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}