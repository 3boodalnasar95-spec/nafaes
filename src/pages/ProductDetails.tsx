"use client";

import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Check, MessageCircle, Minus, Plus } from 'lucide-react';
import { products, formatPrice, whatsappLink } from '../data/products';
import { useStore } from '../store/useStore';
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import ProductArtwork from '../components/ProductArtwork';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantId, setSelectedVariantId] = useState('');

  const product = products.find(p => p.id === id);
  const isMultiSizeOil = product?.type === 'oils' && (product?.variants?.length || 0) > 1;

  useEffect(() => {
    if (isMultiSizeOil && product?.variants?.[0]?.id) {
      setSelectedVariantId(product.variants[0].id);
    }
  }, [product?.id, isMultiSizeOil]);

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

  const selectedVariant = isMultiSizeOil ? (product.variants?.find(v => v.id === selectedVariantId) || product.variants?.[0]) : product.variants?.[0];
  const selectedPrice = selectedVariant?.price ?? product.price;
  const selectedSize = isMultiSizeOil ? (selectedVariant?.size || '') : '';

  const whatsappMessage = `أرغب بطلب منتج ${product.name_en} - ${product.name_ar}${selectedSize ? ` - ${selectedSize}` : ''}، السعر ${formatPrice(selectedPrice)}.`;

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
              <ProductArtwork
                nameAr={product.name_ar}
                nameEn={product.name_en}
                type={product.type}
                variantLabel={isMultiSizeOil && selectedVariant ? selectedVariant.size : undefined}
                priceLabel={formatPrice(selectedPrice)}
                className="sticky top-24 min-h-[720px]"
              />
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
                  <span className="text-4xl font-bold text-[#C9A96E]">{formatPrice(selectedPrice)}</span>
                </div>
              </div>

              {isMultiSizeOil && product.variants && product.variants.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">اختر الحجم</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {product.variants.map((variant) => (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => setSelectedVariantId(variant.id)}
                        className={`rounded-xl border px-4 py-4 text-right transition-colors ${selectedVariant?.id === variant.id ? 'border-[#C9A96E] bg-[#C9A96E]/10' : 'border-[#E8E0D5] bg-white hover:border-[#C9A96E]'}`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-[#1A1A1A]">{variant.size}</span>
                          <span className="text-[#C9A96E] font-bold">{formatPrice(variant.price)}</span>
                        </div>
                        <p className="text-xs text-[#6B6B6B] mt-2">{variant.sku}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

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
                    const cartKey = `${product.id}::${isMultiSizeOil ? (selectedVariant?.id || 'default') : 'default'}`;
                    const sizeLabel = isMultiSizeOil ? (selectedVariant?.size || '') : '';
                    for (let i = 0; i < quantity; i++) {
                      addToCart({
                        ...product,
                        price: selectedPrice,
                        sku: isMultiSizeOil ? (selectedVariant?.sku || product.sku) : product.sku,
                        variantId: isMultiSizeOil ? selectedVariant?.id : undefined,
                        variantLabel: sizeLabel || undefined,
                        variantSize: sizeLabel || undefined,
                        cartKey,
                      });
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
