"use client";

import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Check, MessageCircle, Minus, Plus, ShoppingBag } from 'lucide-react';
import { products, formatPrice, whatsappLink, getCategoryInfo } from '../data/products';
import { useStore } from '../store/useStore';
import Layout from '../components/Layout';
import { useState } from 'react';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useStore();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === id);

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

  const categoryInfo = getCategoryInfo(product.categorySlug);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    navigate('/cart');
  };

  const whatsappMessage = `أرغب بطلب ${product.name_ar} - ${product.name_en}`;

  return (
    <Layout>
      {/* Breadcrumb */}
      <section className="bg-gradient-to-b from-[#F5F0E8] to-[#FAF8F5] py-6">
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

      {/* Product Details */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-[#F5F0E8] to-[#E8E0D5] rounded-3xl flex items-center justify-center p-8 sticky top-24">
                <img
                  src={product.image}
                  alt={product.name_ar}
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-4 right-4 bg-[#C9A96E] text-white text-sm font-bold px-4 py-2 rounded-full">
                  {product.type}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-4">
                {categoryInfo && (
                  <p className="text-[#6B6B6B] text-sm mb-1">{categoryInfo.name_en}</p>
                )}
                <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-2">{product.name_ar}</h1>
                <p className="text-xl text-[#C9A96E] font-medium">{product.name_en}</p>
              </div>

              <div className="mb-6 p-6 bg-[#F5F0E8] rounded-2xl">
                <div className="flex items-center justify-between">
                  <span className="text-[#6B6B6B]">السعر</span>
                  <span className="text-3xl font-bold text-[#C9A96E]">{formatPrice(product.price)}</span>
                </div>
              </div>

              <p className="text-[#6B6B6B] text-lg leading-relaxed mb-8">
                {product.fullDescription}
              </p>

              {/* Features */}
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

              {/* Specifications */}
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

              {/* Quantity & Add to Cart */}
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
                  onClick={handleAddToCart}
                  className="w-full flex items-center justify-center gap-2 bg-[#1A1A1A] hover:bg-[#C9A96E] text-white font-semibold py-4 rounded-xl transition-colors"
                >
                  <ShoppingBag className="w-5 h-5" />
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