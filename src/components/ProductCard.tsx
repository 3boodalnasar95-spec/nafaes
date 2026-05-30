import { Link } from 'react-router-dom';
import { ShoppingBag, Droplets } from 'lucide-react';
import { Product, formatPrice, deviceFlavors } from '../data/products';
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

  // Check if this is an electrical device
  const isElectricalDevice = ['elan-nomad', 'elan-prime', 'noir-majeste'].includes(product.id);

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
        
        {/* Badge for electrical devices */}
        {isElectricalDevice && (
          <div className="absolute top-3 right-3 bg-[#C9A96E] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <Droplets className="w-3 h-3" />
            مع النكهات
          </div>
        )}
        
        {/* Category Badge - Changed to زيوت عطرية */}
        {product.category === 'flavor' && (
          <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            زيوت عطرية
          </div>
        )}
        {product.category === 'gift' && (
          <div className="absolute top-3 right-3 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            طقم هدايا
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
          {isElectricalDevice && (
            <span className="text-xs text-[#6B6B6B] bg-[#F5F0E8] px-2 py-1 rounded-full">
              + 10 نكهات
            </span>
          )}
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