"use client";

import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Check, MessageCircle, Minus, Plus, Package, Droplets } from 'lucide-react';
import { products, formatPrice, whatsappLink, deviceFlavors, flavorSizes, SizeOption } from '../data/products';
import { useStore } from '../store/useStore';
import Layout from '../components/Layout';
import { useState } from 'react';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [selectedFlavor, setSelectedFlavor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('120ml');

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

  // Check if this is an electrical device that can have flavors
  const isElectricalDevice = ['elan-nomad', 'elan-prime', 'noir-majeste'].includes(product.id);
  
  // Check if this is a flavor product with size options
  const isFlavorProduct = product.isFlavor || product.hasSizeOptions;

  // Get size price
  const getCurrentPrice = () => {
    if (isFlavorProduct) {
      const flavor = deviceFlavors.find(f => f.id === product.id);
      const sizeOption = flavor?.sizes.find(s => s.size === selectedSize);
      return sizeOption?.price || flavor?.basePrice || product.price;
    }
    return product.price;
  };

  const handleAddToCart = () => {
    const finalPrice = getCurrentPrice();
    const productWithPrice = { ...product, price: finalPrice };
    
    // Add main product
    for (let i = 0; i < quantity; i++) {
      addToCart(productWithPrice, isFlavorProduct ? selectedSize : undefined);
    }
    
    // If flavor selected for device, add flavor with selected size
    if (selectedFlavor && isElectricalDevice) {
      const flavor = deviceFlavors.find(f => f.id === selectedFlavor);
      if (flavor) {
        const flavorProduct = products.find(p => p.id === selectedFlavor);
        if (flavorProduct) {
          const sizeOption = flavor.sizes.find(s => s.size === selectedSize);
          const flavorPrice = sizeOption?.price || flavor.basePrice;
          const flavorProductWithPrice = { ...flavorProduct, price: flavorPrice };
          
          for (let i = 0; i < quantity; i++) {
            addToCart(flavorProductWithPrice, selectedSize);
          }
        }
      }
    }
    navigate('/cart');
  };

  const whatsappMessage = selectedFlavor 
    ? `أرغب بطلب ${product.name_en} - ${product.name_ar} مع زيت ${deviceFlavors.find(f => f.id === selectedFlavor)?.name_ar || ''} (${selectedSize})`
    : `أرغب بطلب ${product.name_en} - ${product.name_ar}`;

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

              {/* Size Selection for Flavor Products */}
              {isFlavorProduct && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5 text-[#C9A96E]" />
                    اختر الحجم
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {flavorSizes.map((size: SizeOption) => (
                      <button
                        key={size.size}
                        onClick={() => setSelectedSize(size.size)}
                        className={`p-4 rounded-xl border-2 transition-all text-center ${
                          selectedSize === size.size
                            ? 'border-[#C9A96E] bg-[#C9A96E]/10'
                            : 'border-[#E8E0D5] hover:border-[#C9A96E]/50'
                        }`}
                      >
                        <div className="w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden bg-white flex items-center justify-center">
                          <span className="text-2xl">💧</span>
                        </div>
                        <p className="font-bold text-[#1A1A1A]">{size.size}</p>
                        <p className="text-[#C9A96E] font-bold">{formatPrice(size.price)}</p>
                        {selectedSize === size.size && (
                          <Check className="w-5 h-5 text-[#C9A96E] mx-auto mt-2" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-8 p-6 bg-[#F5F0E8] rounded-2xl">
                <div className="flex items-center justify-between">
                  <span className="text-[#6B6B6B]">السعر</span>
                  <span className="text-4xl font-bold text-[#C9A96E]">{formatPrice(getCurrentPrice())}</span>
                </div>
                {isFlavorProduct && (
                  <p className="text-sm text-[#6B6B6B] mt-2 text-center">
                    الحجم المحدد: {selectedSize}
                  </p>
                )}
              </div>

              {/* Flavor Selection for Electrical Devices */}
              {isElectricalDevice && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
                    <Droplets className="w-5 h-5 text-[#C9A96E]" />
                    اختر الزيت العطري (اختياري)
                  </h3>
                  <p className="text-sm text-[#6B6B6B] mb-4">
                    يمكنك إضافة زيت عطري بالنكهة التي تفضلها
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {deviceFlavors.map((flavor) => (
                      <button
                        key={flavor.id}
                        onClick={() => setSelectedFlavor(selectedFlavor === flavor.id ? null : flavor.id)}
                        className={`p-3 rounded-xl border-2 transition-all text-center ${
                          selectedFlavor === flavor.id
                            ? 'border-[#C9A96E] bg-[#C9A96E]/10'
                            : 'border-[#E8E0D5] hover:border-[#C9A96E]/50'
                        }`}
                      >
                        <div className="w-12 h-12 mx-auto mb-2 rounded-full overflow-hidden bg-white">
                          <img 
                            src={flavor.image} 
                            alt={flavor.name_ar}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = `https://via.placeholder.com/50x50/F5F0E8/C9A96E?text=${flavor.name_en.charAt(0)}`;
                            }}
                          />
                        </div>
                        <p className="font-medium text-[#1A1A1A] text-sm">{flavor.name_ar}</p>
                        {selectedFlavor === flavor.id && (
                          <Check className="w-4 h-4 text-[#C9A96E] mx-auto mt-1" />
                        )}
                      </button>
                    ))}
                  </div>
                  
                  {/* Size selection for flavor add-on */}
                  {selectedFlavor && (
                    <div className="mt-4 p-4 bg-[#C9A96E]/10 rounded-xl">
                      <h4 className="font-medium text-[#1A1A1A] mb-3">اختر حجم الزيت العطري:</h4>
                      <div className="grid grid-cols-3 gap-2">
                        {flavorSizes.map((size: SizeOption) => (
                          <button
                            key={`${selectedFlavor}-${size.size}`}
                            onClick={() => setSelectedSize(size.size)}
                            className={`p-2 rounded-lg border-2 transition-all text-center ${
                              selectedSize === size.size
                                ? 'border-[#C9A96E] bg-[#C9A96E]/20'
                                : 'border-[#E8E0D5] hover:border-[#C9A96E]/50'
                            }`}
                          >
                            <p className="font-bold text-sm">{size.size}</p>
                            <p className="text-[#C9A96E] text-xs">{formatPrice(size.price)}</p>
                          </button>
                        ))}
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <p className="text-sm text-[#6B6B6B]">
                          زيت: {deviceFlavors.find(f => f.id === selectedFlavor)?.name_ar} ({selectedSize})
                        </p>
                        <p className="text-[#C9A96E] font-bold">
                          + {formatPrice(deviceFlavors.find(f => f.id === selectedFlavor)?.sizes.find(s => s.size === selectedSize)?.price || 0)}
                        </p>
                      </div>
                    </div>
                  )}
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
                  {isFlavorProduct && (
                    <div className={`flex justify-between p-4 bg-[#FAF8F5]`}>
                      <span className="text-[#6B6B6B] font-medium">الحجم</span>
                      <span className="text-[#1A1A1A] font-medium">{selectedSize}</span>
                    </div>
                  )}
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
                  onClick={handleAddToCart}
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