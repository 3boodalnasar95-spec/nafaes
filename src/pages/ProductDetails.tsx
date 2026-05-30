import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Truck, Shield, RotateCcw, Minus, Plus, ChevronRight, Check } from 'lucide-react';
import { useStore } from '../store/useStore';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, cartItems } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = products.find((p) => p.id === id);
  const relatedProducts = products.filter((p) => p.category === product?.category && p.id !== id).slice(0, 4);

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">المنتج غير موجود</h2>
          <Link to="/products" className="text-blue-400 hover:text-blue-300">
            العودة للمنتجات
          </Link>
        </div>
      </Layout>
    );
  }

  const cartItem = cartItems.find((item) => item.product.id === product.id);
  const inCart = !!cartItem;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <section className="bg-slate-800/30 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-slate-400">
            <Link to="/" className="hover:text-white">الرئيسية</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/products" className="hover:text-white">المنتجات</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images */}
            <div>
              <div className="bg-slate-800/50 rounded-2xl overflow-hidden mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-96 lg:h-[500px] object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[product.image, product.image, product.image, product.image].map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`bg-slate-800/50 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === i ? 'border-blue-500' : 'border-transparent hover:border-slate-600'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-20 object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div>
              {product.featured && (
                <span className="inline-block bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                  منتج مميز
                </span>
              )}
              <h1 className="text-3xl font-bold text-white mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-slate-400">{product.rating}</span>
                <span className="text-slate-500">({product.reviews} تقييم)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-blue-400">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-slate-500 line-through">{formatPrice(product.originalPrice)}</span>
                    <span className="bg-red-500/20 text-red-400 text-sm font-bold px-3 py-1 rounded-full">
                      وفر {formatPrice(product.originalPrice - product.price)}
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-slate-400 mb-6 leading-relaxed">{product.description}</p>

              {/* Stock */}
              <div className="flex items-center gap-2 mb-6">
                {product.stock > 0 ? (
                  <>
                    <Check className="w-5 h-5 text-green-400" />
                    <span className="text-green-400">متوفر ({product.stock} في المخزون)</span>
                  </>
                ) : (
                  <span className="text-red-400">غير متوفر</span>
                )}
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-white">الكمية:</span>
                <div className="flex items-center bg-slate-800/50 rounded-lg border border-slate-700/50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-slate-400 hover:text-white transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center text-white font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="p-3 text-slate-400 hover:text-white transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 min-w-[200px] flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl transition-all hover:shadow-lg hover:shadow-blue-500/25"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {inCart ? 'أضف مرة أخرى' : 'أضف للسلة'}
                </button>
                <button className="p-4 bg-slate-800/50 hover:bg-slate-700 border border-slate-700/50 text-slate-400 hover:text-red-400 rounded-xl transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 bg-slate-800/50 rounded-xl border border-slate-700/50">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-white text-sm font-medium">توصيل سريع</p>
                    <p className="text-slate-500 text-xs">24-48 ساعة</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-white text-sm font-medium">ضمان سنة</p>
                    <p className="text-slate-500 text-xs">ضمان الجودة</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-white text-sm font-medium">استرجاع مجاني</p>
                    <p className="text-slate-500 text-xs">خلال 14 يوم</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      {product.specs && (
        <section className="py-12 bg-slate-800/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-white mb-8">المواصفات</h2>
            <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
              {Object.entries(product.specs).map(([key, value], i) => (
                <div
                  key={key}
                  className={`flex items-center justify-between px-6 py-4 ${
                    i % 2 === 0 ? 'bg-slate-800/30' : ''
                  }`}
                >
                  <span className="text-slate-400">{key}</span>
                  <span className="text-white font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-white mb-8">منتجات مشابهة</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}