import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, Grid, List, SlidersHorizontal, Laptop, Smartphone, Tablet, Headphones, Gamepad2, Camera } from 'lucide-react';
import { useStore } from '../store/useStore';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import { categories } from '../data/products';

const iconMap: Record<string, React.ElementType> = {
  Laptop,
  Smartphone,
  Tablet,
  Headphones,
  Gamepad2,
  Camera,
};

export default function Products() {
  const [searchParams] = useSearchParams();
  const { products, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useStore();
  const [sortBy, setSortBy] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);

  const categoryParam = searchParams.get('category');

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category from URL
    const category = categoryParam || selectedCategory;
    if (category && category !== 'all') {
      result = result.filter((p) => p.category === category);
    }

    // Filter by search
    if (searchQuery) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by price
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
    }

    return result;
  }, [products, categoryParam, selectedCategory, searchQuery, priceRange, sortBy]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-2">المنتجات</h1>
          <p className="text-slate-400">تصفح مجموعتنا الواسعة من التقنيات والأجهزة</p>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6 sticky top-24">
                {/* Search */}
                <div className="mb-6">
                  <label className="text-white font-medium mb-2 block">بحث</label>
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="ابحث عن منتج..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pr-10 pl-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <label className="text-white font-medium mb-3 block">الفئات</label>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                        (categoryParam || selectedCategory) === 'all'
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-400 hover:bg-slate-700/50'
                      }`}
                    >
                      الكل
                    </button>
                    {categories.map((cat) => {
                      const Icon = iconMap[cat.icon];
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                            (categoryParam || selectedCategory) === cat.id
                              ? 'bg-blue-600 text-white'
                              : 'text-slate-400 hover:bg-slate-700/50'
                          }`}
                        >
                          {Icon && <Icon className="w-4 h-4" />}
                          {cat.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <label className="text-white font-medium mb-3 block">نطاق السعر</label>
                  <div className="space-y-3">
                    <input
                      type="range"
                      min="0"
                      max="20000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full accent-blue-500"
                    />
                    <div className="flex justify-between text-sm text-slate-400">
                      <span>{formatPrice(priceRange[0])}</span>
                      <span>{formatPrice(priceRange[1])}</span>
                    </div>
                  </div>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setPriceRange([0, 20000]);
                    setSortBy('all');
                  }}
                  className="w-full py-2 bg-slate-700/50 hover:bg-slate-700 text-slate-300 text-sm rounded-lg transition-colors"
                >
                  إعادة تعيين الفلاتر
                </button>
              </div>
            </aside>

            {/* Products Grid */}
            <main className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <p className="text-slate-400">
                  عرض <span className="text-white font-medium">{filteredProducts.length}</span> منتج
                </p>
                <div className="flex items-center gap-4">
                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-slate-800/50 border border-slate-700/50 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                  >
                    <option value="all">الافتراضي</option>
                    <option value="price-low">السعر: من الأقل</option>
                    <option value="price-high">السعر: من الأعلى</option>
                    <option value="rating">التقييم</option>
                    <option value="newest">الأحدث</option>
                  </select>

                  {/* View Mode */}
                  <div className="flex items-center bg-slate-800/50 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Products */}
              {filteredProducts.length > 0 ? (
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                      : 'space-y-4'
                  }
                >
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-12 text-center">
                  <Filter className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">لا توجد منتجات</h3>
                  <p className="text-slate-400 mb-4">لم يتم العثور على منتجات تطابق معايير البحث</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setPriceRange([0, 20000]);
                    }}
                    className="text-blue-400 hover:text-blue-300 font-medium"
                  >
                    إعادة تعيين الفلاتر
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>
    </Layout>
  );
}