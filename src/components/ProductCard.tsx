import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { getProductTypeLabel } from '@/data/products';
import { useStore } from '../store/useStore';

interface ProductCardProps {
  product: {
    id?: string;
    name_ar: string;
    name_en: string;
    type: string;
    price: number;
    shortDescription?: string;
    fullDescription?: string;
    specs?: Record<string, string>;
    features?: string[];
    image?: string;
    images?: string[];
    variants?: { id: string; size: string; price: number; sku: string; stock: number }[];
    variant?: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useStore();
  const productImage = product.images?.[0] || product.image || '';
  const hasMultipleSizes = (product.type === 'oils') && (product.variants?.length || 0) > 1;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      id: product.id || product.name_en,
      name_ar: product.name_ar,
      name_en: product.name_en,
      type: product.type,
      price: product.price,
      shortDescription: product.shortDescription || '',
      fullDescription: product.fullDescription || '',
      specs: product.specs || {},
      features: product.features || [],
      image: product.images?.[0] || product.image || '',
    });
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#E8E0D5]">
      <Link to={`/product/${product.id || product.name_en}`} className="block relative overflow-hidden">
        <div className="aspect-square bg-gradient-to-br from-[#F5F0E8] to-[#E8E0D5] flex items-center justify-center">
          {productImage ? (
            <img
              src={productImage}
              alt={product.name_ar}
              className="w-full h-full object-contain p-5 group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://via.placeholder.com/400x400/F5F0E8/C9A96E?text=${encodeURIComponent(product.name_en)}`;
              }}
            />
          ) : (
            <span className="text-4xl">✨</span>
          )}
        </div>
        <div className="absolute top-4 right-4 bg-[#C9A96E] text-white text-xs font-bold px-3 py-1 rounded-full">
          {getProductTypeLabel(product.type)}
        </div>
        {hasMultipleSizes && (
          <div className="absolute top-4 left-4 bg-white/90 text-[#1A1A1A] text-xs font-bold px-3 py-1 rounded-full border border-[#E8E0D5]">
            {product.variants?.length} أحجام
          </div>
        )}
      </Link>

      <div className="p-5">
        <Link to={`/product/${product.id || product.name_en}`}>
          <h3 className="text-xl font-bold text-[#1A1A1A] mb-1 group-hover:text-[#C9A96E] transition-colors">
            {product.name_ar}
          </h3>
        </Link>
        <p className="text-[#6B6B6B] text-sm mb-3">{product.name_en}</p>
        {product.shortDescription && (
          <p className="text-[#6B6B6B] text-sm mb-4 line-clamp-2">{product.shortDescription}</p>
        )}

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-[#C9A96E]">
            {hasMultipleSizes ? 'ابتداءً من ' : ''}
            {formatPrice(product.price)}
          </span>
        </div>

        {hasMultipleSizes ? (
          <Link
            to={`/product/${product.id || product.name_en}`}
            className="w-full flex items-center justify-center gap-2 bg-[#1A1A1A] hover:bg-[#C9A96E] text-white text-sm font-medium py-3 px-4 rounded-xl transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            اختر الحجم
          </Link>
        ) : (
          <button
            type="button"
            onClick={handleQuickAdd}
            className="w-full flex items-center justify-center gap-2 bg-[#1A1A1A] hover:bg-[#C9A96E] text-white text-sm font-medium py-3 px-4 rounded-xl transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            أضف للسلة
          </button>
        )}
      </div>
    </div>
  );
}

function formatPrice(price: number): string {
  return `${price.toFixed(3)} د.ك`;
}
