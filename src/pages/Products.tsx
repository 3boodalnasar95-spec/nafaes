import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Sparkles, Droplets, Flower2, Gift, ArrowLeft, Package } from 'lucide-react';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import { products, categories, getProductsByCategory } from '../data/products';

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : getProductsByCategory(selectedCategory);

  const searchResults = search 
    ? filteredProducts.filter(p => 
        p.name_ar.includes(search) || 
        p.name_en.toLowerCase().includes(search.toLowerCase())
      )
    : filteredProducts;

  const getCategoryCount = (slug: string) => {
    return products.filter(p => p.categorySlug === slug).length;
  };

  const getCategoryIcon = (icon: string) => {
    switch (icon) {
      case 'Sparkles': return <Sparkles className="w-6 h-6" />;
      case 'Droplets': return <Droplets className="w-6 h-6" />;
      case 'Flower2': return <Flower2 className="w-6 h-6" />;
      case 'Gift': return <Gift className="w-6 h-6" />;
      default: return <Package className="w-6 h-6" />;
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#F5F0E8] to-[#FAF8F5] py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">منتجاتنا</h1>
          <p className="text-[#6B6B6B] max-w-xl mx-auto">
            اكتشف مجموعتنا المختارة من أجهزة التعطير الذكية والزيوت العطرية الفاخرة
          </p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-white border-b border-[#E8E0D5]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-[#1A1A1A] text-center mb-8">تسوق حسب الفئة</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link
                key={category.slug}
                to={`/products?category=${category.slug}`}
                className="group bg-gradient-to-br from-[#FAF8F5] to-[#F5F0E8] rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 border border-[#E8E0D5] hover:border-[#C9A96E]"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                  {getCategoryIcon(category.icon)}
                </div>
                <h3 className="font-bold text-[#1A1A1A] mb-1">{category.name_ar}</h3>
                <p className="text-xs text-[#6B6B6B] mb-2">{category.name_en}</p>
                <span className="text-sm text-[#C9A96E] font-medium">
                  {getCategoryCount(category.slug)} منتجات
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl border border-[#E8E0D5] p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1 w-full">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B6B]" />
                <input
                  type="text"
                  placeholder="ابحث عن منتج..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 bg-[#FAF8F5] border border-[#E8E0D5] rounded-xl text-[#1A1A1A] focus:outline-none focus:border-[#C9A96E]"
                />
              </div>

              {/* Category Filter */}
              <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                    selectedCategory === 'all'
                      ? 'bg-[#C9A96E] text-white'
                      : 'bg-[#F5F0E8] text-[#6B6B6B] hover:bg-[#E8E0D5]'
                  }`}
                >
                  الكل ({products.length})
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-2 ${
                      selectedCategory === cat.slug
                        ? 'bg-[#C9A96E] text-white'
                        : 'bg-[#F5F0E8] text-[#6B6B6B] hover:bg-[#E8E0D5]'
                    }`}
                  >
                    {getCategoryIcon(cat.icon)}
                    {cat.name_ar}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {searchResults.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Empty State */}
          {searchResults.length === 0 && (
            <div className="text-center py-16">
              <Package className="w-16 h-16 mx-auto mb-4 text-[#E8E0D5]" />
              <p className="text-[#6B6B6B]">لا توجد نتائج</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}