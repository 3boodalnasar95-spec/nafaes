import { Link } from 'react-router-dom';
import { ShoppingBag, Droplets, Sparkles, Gift, Package } from 'lucide-react';
import { Product, formatPrice } from '../data/products';
import { useStore } from '../store/useStore';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  // Get badge info based on category
  const getBadge = () => {
    if (product.category === 'device') {
      return { text: 'أجهزة فاخرة', color: 'bg-gradient-to-r from-[#C9A96E] to-[#D4AF37]', icon: Sparkles };
    }
    if (product.category === 'flavor') {
      return { text: 'زيوت عطرية', color: 'bg-gradient-to-r from-blue-500 to-blue-600', icon: Droplets };
    }
    if (product.category === 'reed') {
      return { text: 'معطر أعواد', color: 'bg-gradient-to-r from-amber-500 to-amber-600', icon: Package };
    }
    if (product.category === 'gift') {
      return { text: 'طقم هدايا', color: 'bg-gradient-to-r from-purple-500 to-purple-600', icon: Gift };
    }
    return null;
  };

  const badge = getBadge();
  const isFlavorProduct = product.category === 'flavor';
  const isDeviceProduct = product.category === 'device';

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#E8E0D5]">
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden">
        <div className="aspect-square bg-gradient-to-br from-[#F5F0E8] to-[#E8E0D5] flex items-center justify-center p-6">
          <img
            src={product.image}
            alt={product.name_ar}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://via.placeholder.com/400x400/F5F0E8/C9A96E?text=${encodeURIComponent(product.name_en)}`;
            }}
          />
        </div>
        
        {/* Category Badge */}
        {badge && (
          <div className={`absolute top-3 right-3 ${badge.color} text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg`}>
            <badge.icon className="w-3 h-3" />
            {badge.text}
          </div>
        )}
        
        {/* Info badge for flavors */}
        {isFlavorProduct && (
          <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-[#1A1A1A] text-xs px-2 py-1 rounded-full">
            أحجام متعددة
          </div>
        )}
        
        {/* Info badge for devices */}
        {isDeviceProduct && (
          <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-[#1A1A1A] text-xs px-2 py-1 rounded-full">
            + 10 نكهات
          </div>
        )}
      </Link>

      <div className="p-5">
        <Link to={`/product/${product.id}`}>
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