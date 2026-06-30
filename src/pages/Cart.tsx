import { Link } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, MessageCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import Layout from '../components/Layout';
import { formatPrice, deliveryFee, whatsappLink } from '../data/products';
import ProductArtwork from '../components/ProductArtwork';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useStore();

  const subtotal = cartTotal();
  const total = subtotal + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <Layout>
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-[#F5F0E8] rounded-full flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-[#C9A96E]" />
            </div>
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">السلة فارغة</h2>
            <p className="text-[#6B6B6B] mb-8">لم تضف أي منتجات للسلة بعد</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#C9A96E] text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              تصفح المنتجات
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="bg-gradient-to-b from-[#F5F0E8] to-[#FAF8F5] py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-2">سلة التسوق</h1>
          <p className="text-[#6B6B6B]">لديك {cartItems.length} {cartItems.length === 1 ? 'منتج' : 'منتجات'} في السلة</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.product.cartKey || item.product.id} className="bg-white rounded-xl border border-[#E8E0D5] p-4 flex flex-col sm:flex-row gap-4">
                  <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                    <ProductArtwork
                      nameAr={item.product.name_ar}
                      nameEn={item.product.name_en}
                      type={item.product.type}
                      imageSrc={item.product.images?.[0] || item.product.image}
                      variantLabel={item.product.variantLabel}
                      priceLabel={formatPrice(item.product.price)}
                      compact
                      className="w-full sm:w-40 min-h-[180px] rounded-lg"
                    />
                  </Link>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <Link to={`/product/${item.product.id}`} className="text-[#1A1A1A] font-bold text-lg hover:text-[#C9A96E]">
                          {item.product.name_ar}
                        </Link>
                        {item.product.variantLabel && (
                          <p className="text-[#C9A96E] text-sm font-medium">{item.product.variantLabel}</p>
                        )}
                        <p className="text-[#6B6B6B] text-sm">{item.product.name_en}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.product.cartKey || item.product.id)} className="p-2 text-[#6B6B6B] hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center bg-[#F5F0E8] rounded-lg">
                        <button onClick={() => updateQuantity(item.product.cartKey || item.product.id, item.quantity - 1)} className="p-2 text-[#6B6B6B] hover:text-[#1A1A1A]">
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-medium text-[#1A1A1A]">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.cartKey || item.product.id, item.quantity + 1)} className="p-2 text-[#6B6B6B] hover:text-[#1A1A1A]">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-left">
                        <p className="text-[#C9A96E] font-bold text-xl">{formatPrice(item.product.price * item.quantity)}</p>
                        {item.quantity > 1 && (
                          <p className="text-[#6B6B6B] text-sm">{formatPrice(item.product.price)} لكل وحدة</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={clearCart} className="text-red-500 hover:text-red-600 text-sm font-medium">
                إفراغ السلة
              </button>
            </div>

            <div>
              <div className="bg-white rounded-xl border border-[#E8E0D5] p-6 sticky top-24">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-6">ملخص الطلب</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-[#6B6B6B]">
                    <span>المجموع الفرعي</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-[#6B6B6B]">
                    <span>رسوم التوصيل</span>
                    <span>{formatPrice(deliveryFee)}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-4 border-t border-[#E8E0D5] mb-6">
                  <span className="text-[#1A1A1A] font-bold text-lg">الإجمالي</span>
                  <span className="text-[#C9A96E] font-bold text-2xl">{formatPrice(total)}</span>
                </div>
                <Link to="/checkout" className="w-full flex items-center justify-center gap-2 bg-[#1A1A1A] hover:bg-[#C9A96E] text-white font-semibold py-4 rounded-xl transition-colors mb-3">
                  إتمام الطلب
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold py-4 rounded-xl transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  إتمام عبر واتساب
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
