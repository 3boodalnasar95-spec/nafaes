import { Link } from 'react-router-dom';
import { ShoppingBag, Sparkles, Droplets, Flower2, Gift, Package } from 'lucide-react';
import { Product, formatPrice, getCategoryInfo } from '@/data';
import { useStore } from '@/store/useStore';

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

  const getCategoryIcon = (icon: string) => {
    switch (icon) {
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Droplets': return <Droplets className="w-5 h-5" />;
      case 'Flower2': return <Flower2 className="w-5 h-5" />;
      case 'Gift': return <Gift className="w-5 h-5" />;
      default: return <Package className="w-5 h-5" />;
    }
  };

  const getPlaceholderBg = () => {
    switch (product.categorySlug) {
      case 'smart-aroma-diffusers':
        return 'from-[#C9A96E]/10 to-[#D4AF37]/10';
      case 'fragrance-oils':
        return 'from-blue-50 to-blue-100';
      case 'reed-diffusers':
        return 'from-amber-50 to-amber-100';
      case 'gift-sets':
        return 'from-purple-50 to-purple-100';
      default:
        return 'from-[#F5F0E8] to-[#E8E0D5]';
    }
  };

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
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-[#E8E0D5] hover:border-[#C9A96E]/50">
      <Link to={`/products/${product.id}`} className="block relative overflow-hidden">
        <div className={`aspect-square bg-gradient-to-br ${getPlaceholderBg()} flex items-center justify-center p-4`}>
          <img
            src={product.image}
            alt={product.name_ar}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {categoryInfo && (
          <div className={`absolute top-3 right-3 bg-gradient-to-r ${categoryInfo.color} text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md`}>
            {getCategoryIcon(categoryInfo.icon)}
            <span>{categoryInfo.name_ar}</span>
          </div>
        )}
      </Link>

      <div className="p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="text-base font-bold text-[#1A1A1A] mb-1 group-hover:text-[#C9A96E] transition-colors">
            {product.name_ar}
          </h3>
        </Link>
        <p className="text-[#6B6B6B] text-sm mb-2">{product.name_en}</p>
        <p className="text-[#6B6B6B] text-xs mb-4 line-clamp-2 leading-relaxed">{product.shortDescription}</p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-bold text-[#C9A96E]">
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