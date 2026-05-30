import { useState } from 'react';
import { Search } from 'lucide-react';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

export default function Products() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Filter products based on search and category
  let filteredProducts = [...products];

  if (search) {
    filteredProducts = filteredProducts.filter(p => 
      p.name_ar.includes(search) || 
      p.name_en.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Sort products
  switch (sortBy) {
    case 'price-low':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    default:
      filteredProducts.sort((a, b) => a.name_ar.localeCompare(b.name_ar));
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#F5F0E8] to-[#FAF8F5] py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">منتجاتنا</h1>
          <p className="text-[#6B6B6B] max-w-xl mx-auto">
            اكتشف مجموعتنا المختارة من أجهزة التعطير الذكية والمعطرات الفاخرة
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Search & Filter */}
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
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-[#FAF8F5] border border-[#E8E0D5] rounded-xl text-[#1A1A1A] focus:outline-none focus:border-[#C9A96E]"
              >
                <option value="name">ترتيب أبجدي</option>
                <option value="price-low">السعر: من الأقل للأعلى</option>
                <option value="price-high">السعر: من الأعلى للأقل</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <p className="mb-4 text-[#6B6B6B]">
            تم العثور على {filteredProducts.length} منتج
          </p>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">لا توجد نتائج</h3>
              <button
                onClick={() => setSearch('')}
                className="px-6 py-2 bg-[#C9A96E] text-white rounded-lg hover:bg-[#D4AF37] transition-colors"
              >
                مسح البحث
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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