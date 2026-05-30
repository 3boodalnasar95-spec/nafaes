import { Link } from 'react-router-dom';
import { ArrowLeft, Star, Award, Truck, CreditCard, MessageCircle, Sparkles, Droplets, Flower2, Gift, ArrowRight } from 'lucide-react';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import { products, categories } from '@/data';

export default function Index() {
  const featuredProducts = products.slice(0, 4);

  const getCategoryIcon = (icon: string) => {
    switch (icon) {
      case 'Sparkles': return <Sparkles className="w-8 h-8" />;
      case 'Droplets': return <Droplets className="w-8 h-8" />;
      case 'Flower2': return <Flower2 className="w-8 h-8" />;
      case 'Gift': return <Gift className="w-8 h-8" />;
      default: return <Sparkles className="w-8 h-8" />;
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F5F0E8] to-[#FAF8F5]">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A96E' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#C9A96E]/10 text-[#C9A96E] px-4 py-2 rounded-full text-sm mb-6">
              <Star className="w-4 h-4" />
              <span>العطور الفاخرة</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A1A] mb-6 leading-tight">
              فخامة المكان
              <br />
              <span className="text-[#C9A96E]">تبدأ من رائحته</span>
            </h1>
            
            <p className="text-[#6B6B6B] text-lg md:text-xl mb-8 leading-relaxed max-w-xl mx-auto">
              في نفائس، نختار لكم منتجات عطرية راقية تضيف للمنزل، المكتب، الاستقبال، والهدايا لمسة من الأناقة والهدوء.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1A1A1A] hover:bg-[#C9A96E] text-white font-semibold px-8 py-4 rounded-xl transition-colors"
              >
                تسوق الآن
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <a
                href="https://wa.me/96566377312"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold px-8 py-4 rounded-xl transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                تواصل عبر واتساب
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white border-y border-[#E8E0D5]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-[#C9A96E]/10 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-[#C9A96E]" />
              </div>
              <h3 className="font-semibold text-[#1A1A1A] mb-1 text-sm">منتجات مختارة بعناية</h3>
              <p className="text-[#6B6B6B] text-xs">نختار لكم أفضل المنتجات العطرية</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-[#C9A96E]/10 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-[#C9A96E]" />
              </div>
              <h3 className="font-semibold text-[#1A1A1A] mb-1 text-sm">تجربة عطرية فاخرة</h3>
              <p className="text-[#6B6B6B] text-xs">جودة عالية ورائحة لا تُنسى</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-[#C9A96E]/10 rounded-full flex items-center justify-center">
                <Truck className="w-6 h-6 text-[#C9A96E]" />
              </div>
              <h3 className="font-semibold text-[#1A1A1A] mb-1 text-sm">توصيل سريع</h3>
              <p className="text-[#6B6B6B] text-xs">رسوم ثابتة لكل الطلبات</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-[#C9A96E]/10 rounded-full flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-[#C9A96E]" />
              </div>
              <h3 className="font-semibold text-[#1A1A1A] mb-1 text-sm">دفع مرن</h3>
              <p className="text-[#6B6B6B] text-xs">كاش عند الاستلام أو رابط دفع</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">تسوق حسب الفئة</h2>
            <p className="text-[#6B6B6B]">اختر الفئة المناسبة لك</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.slug}
                to={`/products?category=${category.slug}`}
                className="group bg-white rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 border border-[#E8E0D5] hover:border-[#C9A96E]"
              >
                <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                  {getCategoryIcon(category.icon)}
                </div>
                <h3 className="font-bold text-[#1A1A1A] mb-2">{category.name_ar}</h3>
                <p className="text-xs text-[#6B6B6B] mb-3">{category.name_en}</p>
                <span className="inline-flex items-center gap-1 text-[#C9A96E] text-sm font-medium group-hover:gap-2 transition-all">
                  تصفح المنتجات
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-[#F5F0E8]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">منتجاتنا المميزة</h2>
            <p className="text-[#6B6B6B]">اكتشف مجموعتنا المختارة من منتجات التعطير الفاخرة</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-[#C9A96E] hover:text-[#1A1A1A] font-medium transition-colors border border-[#C9A96E] hover:bg-[#C9A96E] hover:text-white px-6 py-3 rounded-xl"
            >
              عرض جميع المنتجات
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">عن نفائس</h2>
            <p className="text-[#6B6B6B] text-lg leading-relaxed mb-8">
              في نفائس، نؤمن بأن الروائح تؤثر على المزاج والمكان. لهذا نقدم لكم مجموعة مختارة من أجهزة التعطير الذكية، معطرات الأعواد، وأطقم الهدايا العطرية التي تضفي على مساحاتكم لمسة من الفخامة والأناقة.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-[#F5F0E8] px-6 py-3 rounded-full text-[#1A1A1A]">
                <span className="font-bold text-[#C9A96E]">16+</span> منتجات فاخرة
              </div>
              <div className="bg-[#F5F0E8] px-6 py-3 rounded-full text-[#1A1A1A]">
                <span className="font-bold text-[#C9A96E]">2</span> د.ك توصيل
              </div>
              <div className="bg-[#F5F0E8] px-6 py-3 rounded-full text-[#1A1A1A]">
                <span className="font-bold text-[#C9A96E]">2</span> طريقة دفع
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#1A1A1A] to-[#333]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">جاهز للطلب؟</h2>
          <p className="text-[#888] mb-8 max-w-xl mx-auto">
            اطلب الآن عبر واتساب وسيتم تأكيد طلبك والتوصيل بأسرع وقت
          </p>
          <a
            href="https://wa.me/96566377312"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold px-8 py-4 rounded-xl transition-colors"
          >
            <MessageCircle className="w-6 h-6" />
            <span>اطلب الآن عبر واتساب</span>
          </a>
        </div>
      </section>
    </Layout>
  );
}