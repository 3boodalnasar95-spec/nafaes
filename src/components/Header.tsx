import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, User, Laptop, Smartphone, Tablet, Headphones, Gamepad2, Camera } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '../store/useStore';

const iconMap: Record<string, React.ElementType> = {
  Laptop,
  Smartphone,
  Tablet,
  Headphones,
  Gamepad2,
  Camera,
};

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const { cartItems, searchQuery, setSearchQuery } = useStore();

  const navLinks = [
    { path: '/', label: 'الرئيسية' },
    { path: '/products', label: 'المنتجات' },
    { path: '/services', label: 'خدماتنا' },
    { path: '/about', label: 'من نحن' },
    { path: '/blog', label: 'المدونة' },
    { path: '/contact', label: 'تواصل معنا' },
  ];

  const categories = [
    { id: 'laptops', name: 'أجهزة laptops', icon: 'Laptop' },
    { id: 'phones', name: 'هواتف ذكية', icon: 'Smartphone' },
    { id: 'tablets', name: 'أجهزة لوحية', icon: 'Tablet' },
    { id: 'accessories', name: 'إكسسوارات', icon: 'Headphones' },
    { id: 'gaming', name: 'ألعاب', icon: 'Gamepad2' },
    { id: 'cameras', name: 'كاميرات', icon: 'Camera' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Laptop className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">TechStore</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-blue-400'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              {searchOpen ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="ابحث عن منتج..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-48 md:w-64 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                    autoFocus
                  />
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="p-2 text-slate-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Admin Link */}
            <Link
              to="/admin"
              className="hidden md:flex items-center gap-1 p-2 text-slate-400 hover:text-white transition-colors"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-slate-400 hover:text-white transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'bg-slate-800 text-blue-400'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800"
              >
                لوحة التحكم
              </Link>
            </nav>

            {/* Categories */}
            <div className="mt-4 pt-4 border-t border-slate-800">
              <p className="px-4 text-xs font-semibold text-slate-500 uppercase mb-2">الفئات</p>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => {
                  const Icon = iconMap[cat.icon];
                  return (
                    <Link
                      key={cat.id}
                      to={`/products?category=${cat.id}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 rounded-lg"
                    >
                      {Icon && <Icon className="w-4 h-4" />}
                      {cat.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}