import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Check, MessageCircle, Minus, Plus } from 'lucide-react';
import { localProducts, formatPrice, whatsappLink, type Product } from '../data/products';
import { getProduct as getProductFromDb } from '@/lib/db-operations';
import { useStore } from '../store/useStore';
import Layout from '../components/Layout';
import { useState, useEffect } from 'react';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [dbProduct, setDbProduct] = useState<Product | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      setLoading(true);
      const data = await getProductFromDb(id);
      if (cancelled) return;
      if (data) {
        const mapped = {
          id: data.id,
          name_ar: data.name_ar,
          name_en: data.name_en,
          type: data.type || 'devices',
          price: data.price,
          shortDescription: data.specs?.['الوصف'] || data.features?.[0] || '',
          fullDescription: data.features?.join(' | ') || '',
          specs: data.specs || {},
          features: data.features || [],
          image: data.images?.[0] || '',
          images: data.images || [],
        };
        setDbProduct(mapped);
      } else {
        setDbProduct(null);
      }
      setLoading(false);
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const localProduct = localProducts.find(p => p.id === id);
  const product = dbProduct || localProduct;

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="text-[#6B6B6B]">جاري التحميل...</div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">المنتج غير موجود</h2>
          <Link to="/products" className="text-[#C9A96E] hover:text-[#1A1A1A] font-medium">
            العودة للمنتجات
          </Link>
        </div>
      </Layout>
    );
  }

  const whatsappMessage = `أرغب بطلب منتج ${product.name_en} - ${product.name_ar}، السعر ${formatPrice(product.price)}.`;

  return (
    <Layout>
      <section className="bg-gradient-to-b from-[#F5F0E8] to-[#FAF8F5] py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-[#6B6B6B]">
            <Link to="/" className="hover:text-[#C9A96E]">الرئيسية</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-[#C9A96E]">المنتجات</Link>
            <span>/</span>
            <span className="text-[#1A1A1A]">{product.name_ar}</span>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-[#F5F0E8] to-[#E8E0D5] rounded-3xl flex items-center justify-center p-8 sticky top-24">
                <img
                  src={product.image}
                  alt={product.name_ar}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://via.placeholder.com/600x600/F5F0E8/C9A96E?text=${encodeURIComponent(product.name_en)}`;
                  }}
                />
                <div className="absolute top-4 right-4 bg-[#C9A96E] text-white text-sm font-bold px-4 py-2 rounded-full">
                  {product.type}
                </div>
              </div>
            </div>

            <div>
              <div className="mb-6">
                <p className="text-[#C9A96E] font-medium mb-2">{product.name_en}</p>
                <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-3">{product.name_ar}</h1>
                <p className="text-[#6B6B6B] text-lg leading-relaxed">{product.fullDescription}</p>
              </div>

              <div className="mb-8 p-6 bg-[#F5F0E8] rounded-2xl">
                <div className="flex items-center justify-between">
                  <span className="text-[#6B6B6B]">السعر</span>
                  <span className="text-4xl font-bold text-[#C9A96E]">{formatPrice(product.price)}</span>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">المميزات</h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-[#7C9A6E]" />
                      <span className="text-[#6B6B6B]">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">المواصفات</h3>
                <div className="bg-white rounded-2xl border border-[#E8E0D5] overflow-hidden">
                  {Object.entries(product.specs).map(([key, value], i) => (
                    <div key={key} className={`flex justify-between p-4 ${i % 2 === 0 ? 'bg-[#FAF8F5]' : 'bg-white'}`}>
                      <span className="text-[#6B6B6B] font-medium">{key}</span>
                      <span className="text-[#1A1A1A] font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-[#1A1A1A] font-medium">الكمية</span>
                  <div className="flex items-center bg-[#F5F0E8] rounded-xl">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 text-[#6B6B6B] hover:text-[#1A1A1A]"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="w-12 text-center font-bold text-[#1A1A1A] text-lg">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 text-[#6B6B6B] hover:text-[#1A1A1A]"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => {
                    for (let i = 0; i < quantity; i++) {
                      addToCart(product);
                    }
                    navigate('/cart');
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-[#1A1A1A] hover:bg-[#C9A96E] text-white font-semibold py-4 rounded-xl transition-colors"
                >
                  أضف للسلة
                  <ArrowRight className="w-5 h-5" />
                </button>

                <a
                  href={`${whatsappLink}?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold py-4 rounded-xl transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  اطلب عبر واتساب
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}