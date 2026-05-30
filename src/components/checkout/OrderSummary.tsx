import React from 'react';
import { formatPrice as fmt, getAreaById, Product } from '@/data/products';

interface CartItem {
  product: Product;
  quantity: number;
}

interface OrderSummaryProps {
  cartItems: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  selectedAreaId?: string;
}

export default function OrderSummary({ 
  cartItems, 
  subtotal, 
  deliveryFee, 
  total, 
  selectedAreaId 
}: OrderSummaryProps) {
  const selectedArea = selectedAreaId ? getAreaById(selectedAreaId) : undefined;

  return (
    <div className="bg-white rounded-2xl border border-[#E8E0D5] p-6 sticky top-24">
      <h3 className="text-xl font-bold text-[#1A1A1A] mb-6">ملخص الطلب</h3>
      
      <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
        {cartItems.map((item, index) => (
          <div key={index} className="flex gap-3 p-3 bg-[#FAF8F5] rounded-xl">
            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center overflow-hidden p-1">
              <img 
                src={item.product.images?.[0] || item.product.image} 
                alt={item.product.name_ar} 
                className="w-full h-full object-contain"
                onError={(e) => { 
                  (e.target as HTMLImageElement).src = `https://via.placeholder.com/100x100/F5F0E8/C9A96E?text=${encodeURIComponent(item.product.name_en)}`; 
                }} 
              />
            </div>
            <div className="flex-1">
              <p className="text-[#1A1A1A] font-medium text-sm">{item.product.name_ar}</p>
              <p className="text-[#6B6B6B] text-xs">الكمية: {item.quantity}</p>
              <p className="text-[#C9A96E] font-bold text-sm">{fmt(item.product.price * item.quantity)}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="space-y-3 py-4 border-t border-[#E8E0D5]">
        <div className="flex justify-between text-[#6B6B6B]">
          <span>المجموع الفرعي</span>
          <span>{fmt(subtotal)}</span>
        </div>
        <div className="flex justify-between text-[#6B6B6B]">
          <span>رسوم التوصيل</span>
          <span>{fmt(deliveryFee)}</span>
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-[#E8E0D5]">
          <span className="text-[#1A1A1A] font-bold">الإجمالي</span>
          <span className="text-[#C9A96E] font-bold text-2xl">{fmt(total)}</span>
        </div>
      </div>
      
      {selectedArea && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
          <p>🚚 التوصيل إلى <strong>{selectedArea.name}</strong></p>
        </div>
      )}
    </div>
  );
}