import { Link } from 'react-router-dom';
import { ShoppingBag, Sparkles, Droplets, Flower2, Gift, Package } from 'lucide-react';
import { Product, formatPrice, getCategoryInfo } from '../data/products';
import { useStore } from '../store/useStore';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const categoryInfo = getCategoryInfo(product.categorySlug);

  // Determine icon and placeholder color based on category
  const getCategoryIcon = (icon: string) => {
    switch (icon) {
      case 'Sparkles': return <Sparkles className="w-8 h-8" />;
      case 'Droplets': return <Droplets className="w-8 h-8" />;
      case 'Flower2': return <Flower2 className="w-8 h-8" />;
      case 'Gift': return <Gift className="w-8 h-8" />;
      default: return <Package className="w-8 h-8" />;
    }
  };

  // Get placeholder background based on category
  const getPlaceholderBg = () => {
    switch (product.categorySlug) {
      case 'smart-aroma-diffusers':
        return 'from-[#C9A96E]/20 to-[#D4AF37]/20';
      case 'fragrance-oils':
        return 'from-blue-100/30 to-blue-200/30';
      case 'reed-diffusers':
        return 'from-amber-100/30 to-amber-200/30';
      case 'gift-sets':
        return 'from-purple-100/30 to-purple-200/30';
      default:
        return 'from-[#F5F0E8] to-[#E8E0D5]';
    }
  };

  // Get icon color based on category
  const getIconColor = () => {
    switch (product.categorySlug) {
      case 'smart-aroma-diffusers':
        return 'text-[#C9A96E]';
      case 'fragrance-oils':
        return 'text-blue-500';
      case 'reed-diffusers':
        return 'text-amber-600';
      case 'gift-sets':
        return 'text-purple-600';
      default:
        return 'text-[#C9A96E]';
    }
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#E8E0D5]">
      <Link to={`/products/${product.id}`} className="block relative overflow-hidden">
        <div className={`aspect-square bg-gradient-to-br ${getPlaceholderBg()} flex items-center justify-center p-6`}>
          <img
            src={product.image}
            alt={product.name_ar}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              // Hide broken image and show placeholder
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          {/* Fallback placeholder when image fails */}
          <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${getPlaceholderBg()} hidden`}>
            <div className="text-center">
              <div className={`w-16 h-16 mx-auto mb-2 rounded-full bg-white/50 flex items-center justify-center ${getIconColor()}`}>
                {categoryInfo && getCategoryIcon(categoryInfo.icon)}
              </div>
              <p className="text-sm text-[#6B6B6B] font-medium">{product.name_en}</p>
            </div>
          </div>
        </div>
        
        {/* Category Badge */}
        {categoryInfo && (
          <div className={`absolute top-3 right-3 bg-gradient-to-r ${categoryInfo.color} text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg`}>
            {getCategoryIcon(categoryInfo.icon)}
            {categoryInfo.name_ar}
          </div>
        )}
      </Link>

      <div className="p-5">
        <Link to={`/products/${product.id}`}>
          <h3 className="text-lg font-bold text-[#1A1A1A] mb-1 group-hover:text-[#C9A96E] transition-colors">
            {product.name_ar}
          </h3>
        </Link>
        <p className="text-[#6B6B6B] text-sm mb-2">{product.name_en}</p>
        <p className="text-[#6B6B6B] text-sm mb-4 line-clamp-2">{product.shortDescription}</p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-xl font-bold text-[#C9A96E]">
            {formatPrice(product.price)}
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-2 bg-[#1A1A1A] hover:bg-[#C9A96E] text-white text-sm font-medium py-3 px-4 rounded-xl transition-colors"
        >
          <ShoppingBag className="w-4 h-4" />
          أضف للسلة
        </button>
      </div>
    </div>
  );
}