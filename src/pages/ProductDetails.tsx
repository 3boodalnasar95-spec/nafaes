import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, ShoppingBag, ChevronRight, MessageCircle, Check, Truck, Shield } from 'lucide-react';
import { useStore } from '../store/useStore';
import Layout from '../components/Layout';
import { products, formatPrice, whatsappLink } from '../data/products';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useStore();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">المنتج غير موجود</h2>
          <Link to="/products" className="text-[#C9A96E] hover:text-[#1A1A1A]">
            العودة للمنتجات
          </Link>
        </div>
      </Layout>
    );
  }

  const cartItem = cartItems.find((item) => item.product.id === product.id);
  const inCart = !!cartItem;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `أرغب بطلب منتج ${product.nameEn} - ${product.nameAr}، السعر ${formatPrice(product.price)}.`
  );

  return (
    <Layout>
      {/* Breadcrumb */}
      <section className="bg-[#F5F0E8] py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-[#6B6B6B]">
            <Link to="/" className="hover:text-[#1A1A1A]">الرئيسية</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/products" className="hover:text-[#1A1A1A]">المنتجات</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#1A1A1A]">{product.nameAr}</span>
          </nav>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image */}
            <div>
              <div className="bg-gradient-to-br from-[#F5F0E8] to-[#E8E0D5] rounded-2xl overflow-hidden">
                <img
                  src={product.image}
                  alt={product.nameAr}
                  className="w-full aspect-square object-contain p-8"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://via.placeholder.com/600x600/F5F0E8/C9A96E?text=${encodeURIComponent(product.nameEn)}`;
                  }}
                />
              </div>
            </div>

            {/* Info */}
            <div>
              <span className="inline-block bg-[#C9A96E]/10 text-[#C9A96E] text-sm font-medium px-4 py-1 rounded-full mb-4">
                {product.type}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-2">{product.nameAr}</h1>
              <p className="text-xl text-[#6B6B6B] mb-4">{product.nameEn}</p>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold text-[#C9A96E]">{formatPrice(product.price)}</span>
              </div>

              {/* Description */}
              <p className="text-[#6B6B6B] mb-6 leading-relaxed">{product.fullDescription}</p>

              {/* Features */}
              <div className="mb-6">
                <h3 className="font-semibold text-[#1A1A1A] mb-3">المميزات:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.features.map((feature, i) => (
                    <span key={i} className="flex items-center gap-1 bg-[#F5F0E8] text-[#6B6B6B] text-sm px-3 py-1 rounded-full">
                      <Check className="w-3 h-3 text-[#7C9A6E]" />
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[#1A1A1A] font-medium">الكمية:</span>
                <div className="flex items-center bg-white border border-[#E8E0D5] rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium text-[#1A1A1A]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#1A1A1A] hover:bg-[#C9A96E] text-white font-semibold py-4 px-6 rounded-xl transition-colors"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {inCart ? 'أضف مرة أخرى' : 'أضف للسلة'}
                </button>
                <a
                  href={`${whatsappLink}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold py-4 px-6 rounded-xl transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  اطلب عبر واتساب
                </a>
              </div>

              {/* Delivery Info */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-[#F5F0E8] rounded-xl">
                <div className="flex items-center gap-2 text-sm text-[#6B6B6B]">
                  <Truck className="w-4 h-4 text-[#C9A96E]" />
                  <span>توصيل 2 د.ك</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#6B6B6B]">
                  <Shield className="w-4 h-4 text-[#C9A96E]" />
                  <span>جودة مضمونة</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-12 bg-[#F5F0E8]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-8 text-center">المواصفات</h2>
          <div className="max-w-2xl mx-auto bg-white rounded-xl overflow-hidden">
            {Object.entries(product.specs).map(([key, value], i) => (
              <div
                key={key}
                className={`flex items-center justify-between px-6 py-4 ${
                  i % 2 === 0 ? 'bg-[#FAF8F5]' : ''
                }`}
              >
                <span className="text-[#6B6B6B]">{key}</span>
                <span className="text-[#1A1A1A] font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}