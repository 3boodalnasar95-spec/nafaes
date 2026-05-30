import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, CreditCard, Truck } from 'lucide-react';
import { useStore } from '../store/useStore';
import Layout from '../components/Layout';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const subtotal = cartTotal();
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <Layout>
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-slate-800 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-12 h-12 text-slate-600" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">سلة التسوق فارغة</h2>
            <p className="text-slate-400 mb-8">لم تضف أي منتجات للسلة بعد</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
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
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-2">سلة التسوق</h1>
          <p className="text-slate-400">لديك {cartItems.length} منتجات في السلة</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-4 flex flex-col sm:flex-row gap-4"
                >
                  <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full sm:w-32 h-32 object-cover rounded-lg"
                    />
                  </Link>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <Link
                        to={`/product/${item.product.id}`}
                        className="text-white font-semibold hover:text-blue-400 transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">{item.product.description}</p>
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      {/* Quantity */}
                      <div className="flex items-center bg-slate-700/50 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-2 text-slate-400 hover:text-white transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center text-white font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-2 text-slate-400 hover:text-white transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      {/* Price */}
                      <div className="text-left">
                        <p className="text-blue-400 font-bold text-lg">{formatPrice(item.product.price * item.quantity)}</p>
                        {item.quantity > 1 && (
                          <p className="text-slate-500 text-sm">{formatPrice(item.product.price)} لكل وحدة</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear Cart */}
              <button
                onClick={clearCart}
                className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
              >
                إفراغ السلة
              </button>
            </div>

            {/* Summary */}
            <div>
              <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6 sticky top-24">
                <h3 className="text-xl font-bold text-white mb-6">ملخص الطلب</h3>

                {/* Items Summary */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-slate-400">
                    <span>المجموع الفرعي</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>الشحن</span>
                    <span>{shipping === 0 ? 'مجاني' : formatPrice(shipping)}</span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-green-400 bg-green-400/10 px-3 py-2 rounded-lg">
                        اطلب بـ {formatPrice(500 - subtotal)} إضافية للشحن المجاني!
                    </p>
                  )}
                </div>

                {/* Total */}
                <div className="flex justify-between items-center py-4 border-t border-slate-700 mb-6">
                  <span className="text-white font-bold text-lg">الإجمالي</span>
                  <span className="text-blue-400 font-bold text-2xl">{formatPrice(total)}</span>
                </div>

                {/* Checkout Button */}
                <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-blue-500/25 mb-4">
                  <CreditCard className="w-5 h-5" />
                  إتمام الشراء
                </button>

                {/* Shipping Info */}
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Truck className="w-4 h-4" />
                  <span>شحن مجاني للطلبات فوق 500 ريال</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}