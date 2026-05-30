import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Package, Sparkles, Gift, Droplets, ArrowLeft } from 'lucide-react';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import { products, getDeviceProducts, getFlavorProducts, getGiftProducts, getReedProducts, Product } from '../data/products';

export default function Products() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name'>('name');

  // Get products by section
  const deviceProducts = getDeviceProducts();
  const flavorProducts = getFlavorProducts();
  const reedProducts = getReedProducts();
  const giftProducts = getGiftProducts();

  useEffect(() => {
    filterAndSortProducts();
  }, [search, selectedCategory, sortBy]);

  const filterAndSortProducts = () => {
    let result = [...products];
    
    // Filter by category
    if (selectedCategory === 'devices') {
      result = getDeviceProducts();
    } else if (selectedCategory === 'flavors') {
      result = getFlavorProducts();
    } else if (selectedCategory === 'reeds') {
      result = getReedProducts();
    } else if (selectedCategory === 'gifts') {
      result = getGiftProducts();
    }
    
    // Search filter
    if (search) {
      result = result.filter(p => 
        p.name_ar.includes(search) || 
        p.name_en.toLowerCase().includes(search.toLowerCase()) ||
        p.type.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
      default:
        result.sort((a, b) => a.name_ar.localeCompare(b.name_ar));
    }
    
    setFilteredProducts(result);
  };

  const categories = [
    { id: 'all', name: 'الكل', icon: Package, count: products.length },
    { id: 'devices', name: 'أجهزة كهربائية فاخرة', icon: Sparkles, count: deviceProducts.length },
    { id: 'flavors', name: 'زيوت عطرية', icon: Droplets, count: flavorProducts.length },
    { id: 'reeds', name: 'معطرات أعواد', icon: Package, count: reedProducts.length },
    { id: 'gifts', name: 'أطقم هدايا', icon: Gift, count: giftProducts.length },
  ];

  return (
    <Layout>
      <section className="bg-gradient-to-b from-[#F5F0E8] to-[#FAF8F5] py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">منتجاتنا</h1>
          <p className="text-[#6B6B6B] max-w-xl mx-auto">
            اكتشف مجموعتنا المختارة من أجهزة التعطير الذكية والزيوت العطرية الفاخرة
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Category Tabs */}
          <div className="bg-white rounded-xl border border-[#E8E0D5] p-4 mb-6">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map(cat => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-2 ${
                      selectedCategory === cat.id
                        ? 'bg-[#C9A96E] text-white'
                        : 'bg-[#F5F0E8] text-[#6B6B6B] hover:bg-[#E8E0D5]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {cat.name}
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      selectedCategory === cat.id ? 'bg-white/20' : 'bg-[#E8E0D5]'
                    }`}>
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search and Sort */}
          <div className="bg-white rounded-xl border border-[#E8E0D5] p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B6B]" />
                <input
                  type="text"
                  placeholder="ابحث عن منتج..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 bg-[#FAF8F5] border border-[#E8E0D5] rounded-xl text-[#1A1A1A] focus:outline-none focus:border-[#C9A96E]"
                />
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-4 py-3 bg-[#FAF8F5] border border-[#E8E0D5] rounded-xl text-[#1A1A1A] focus:outline-none focus:border-[#C9A96E]"
              >
                <option value="name">ترتيب أبجدي</option>
                <option value="price-asc">السعر: من الأقل للأعلى</option>
                <option value="price-desc">السعر: من الأعلى للأقل</option>
              </select>
            </div>
          </div>

          {/* ========================================== */}
          {/* SECTION 1: ELECTRICAL DEVICES (أجهزة كهربائية فاخرة) */}
          {/* ========================================== */}
          {(selectedCategory === 'all' || selectedCategory === 'devices') && (
            <div className="mb-12">
              {selectedCategory === 'all' && (
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#C9A96E] to-[#D4AF37] rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#1A1A1A]">أجهزة كهربائية فاخرة</h2>
                    <p className="text-[#6B6B6B] text-sm">أجهزة تعطير ذكية ومتطورة للمنازل والمكاتب - اضف زيتك المفضل</p>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getDeviceProducts().map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* SECTION 2: FLAVOR OILS (زيوت عطرية) */}
          {/* ========================================== */}
          {(selectedCategory === 'all' || selectedCategory === 'flavors') && (
            <div className="mb-12">
              {selectedCategory === 'all' && (
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                    <Droplets className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#1A1A1A]">زيوت عطرية</h2>
                    <p className="text-[#6B6B6B] text-sm">زيوت عطرية مركزهة - اختر الحجم المناسب لك (20ml, 120ml, 500ml)</p>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {getFlavorProducts().map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* SECTION 3: REED DIFFUSERS (معطرات أعواد) */}
          {/* ========================================== */}
          {(selectedCategory === 'all' || selectedCategory === 'reeds') && (
            <div className="mb-12">
              {selectedCategory === 'all' && (
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full flex items-center justify-center">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#1A1A1A]">معطرات أعواد</h2>
                    <p className="text-[#6B6B6B] text-sm">معطرات أعواد خشبية فاخرة للديكور والهدايا - رائحة تدوم 60-90 يوم</p>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getReedProducts().map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* SECTION 4: GIFT SETS (أطقم هدايا) */}
          {/* ========================================== */}
          {(selectedCategory === 'all' || selectedCategory === 'gifts') && (
            <div className="mb-12">
              {selectedCategory === 'all' && (
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center">
                    <Gift className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#1A1A1A]">أطقم هدايا</h2>
                    <p className="text-[#6B6B6B] text-sm">أطقم هدايا فاخرة مثالية للمناسبات - جاهزة للإهداء</p>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getGiftProducts().map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}

          {/* Results Count */}
          <div className="mb-4 text-[#6B6B6B] text-sm">
            {selectedCategory === 'all' 
              ? `عرض ${products.length} منتج`
              : `عرض ${filteredProducts.length} منتج`
            }
          </div>
        </div>
      </section>
    </Layout>
  );
}