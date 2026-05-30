import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function ProductCard({ product }: { product: any }) {
  const { addToCart } = useStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#E8E0D5]">
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden">
        <div className="aspect-square bg-gradient-to-br from-[#F5F0E8] to-[#E8E0D5] flex items-center justify-center p-4">
          <img
            src={product.image || '/placeholder.svg'}
            alt={product.name_ar}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x400/F5F0E8/C9A96E?text=' + encodeURIComponent(product.name_ar || '');
            }}
          />
        </div>
      </Link>

      <div className="p-5">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-xl font-bold text-[#1A1A1A] mb-1 group-hover:text-[#C9A96E] transition-colors">
            {product.name_ar}
          </h3>
        </Link>
        <p className="text-[#6B6B6B] text-sm mb-3">{product.name_en}</p>
        <p className="text-[#6B6B6B] text-sm mb-4 line-clamp-2">{product.shortDescription}</p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-[#C9A96E]">
            {typeof product.price === 'number' ? product.price.toFixed(3) : product.price} د.ك
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