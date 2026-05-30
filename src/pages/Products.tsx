import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Package, Sparkles, Gift } from 'lucide-react';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import { products, type Product, getProductsByCategory } from '../data/products';

export default function Products() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name'>('name');

  useEffect(() => {
    filterAndSortProducts();
  }, [search, selectedCategory, sortBy]);

  const filterAndSortProducts = () => {
    let result = [...products];
    
    // Filter by category
    if (selectedCategory === 'devices') {
      result = getProductsByCategory('device');
    } else if (selectedCategory === 'flavors') {
      result = getProductsByCategory('flavor');
    } else if (selectedCategory === 'gifts') {
      result = getProductsByCategory('gift');
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
    { id: 'all', name: 'الكل', icon: Package },
    { id: 'devices', name: 'أجهزة التعطير', icon: Sparkles },
    { id: 'flavors', name: 'النكهات', icon: Package },
    { id: 'gifts', name: 'هدايا عطرية', icon: Gift },
  ];

  return (
    <Layout>
      <section className="bg-gradient-to-b from-[#F5F0E8] to-[#FAF8F5] py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">منتجاتنا</h1>
          <p className="text-[#6B6B6B] max-w-xl mx-auto">
            اكتشف مجموعتنا المختارة من أجهزة التعطير الذكية والنكهات الفاخرة والهدايا العطرية
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
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

            <div className="flex gap-2 mt-4 pt-4 border-t border-[#E8E0D5] overflow-x-auto">
              {categories.map(cat => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-2 ${
                      selectedCategory === cat.id
                        ? 'bg-[#C9A96E] text-white'
                        : 'bg-[#F5F0E8] text-[#6B6B6B] hover:bg-[#E8E0D5]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-4 text-[#6B6B6B] text-sm">
            تم العثور على {filteredProducts.length} منتج
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">لا توجد نتائج</h3>
              <p className="text-[#6B6B6B] mb-4">جرب البحث بكلمات مختلفة</p>
              <button
                onClick={() => { setSearch(''); setSelectedCategory('all'); }}
                className="px-6 py-2 bg-[#C9A96E] text-white rounded-lg"
              >
                إعادة البحث
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}