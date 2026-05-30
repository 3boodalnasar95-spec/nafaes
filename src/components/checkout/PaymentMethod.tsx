import React from 'react';
import { AlertCircle } from 'lucide-react';

interface PaymentMethodProps {
  paymentMethod: 'cash' | 'link';
  onPaymentChange: (value: 'cash' | 'link') => void;
}

export default function PaymentMethod({ paymentMethod, onPaymentChange }: PaymentMethodProps) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold text-[#1A1A1A] mb-6 flex items-center gap-2">
        <span className="w-8 h-8 bg-[#C9A96E] text-white rounded-full flex items-center justify-center text-sm">3</span>
        طريقة الدفع
      </h2>

      <div className="space-y-3">
        <label className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer border-2 transition-all ${paymentMethod === 'cash' ? 'border-[#C9A96E] bg-[#C9A96E]/5' : 'border-[#E8E0D5] hover:border-[#C9A96E]/50'}`}>
          <input 
            type="radio" 
            name="payment" 
            value="cash" 
            checked={paymentMethod === 'cash'} 
            onChange={() => onPaymentChange('cash')} 
            className="w-5 h-5 accent-[#C9A96E]" 
          />
          <div className="flex-1">
            <span className="text-[#1A1A1A] font-medium">كاش عند الاستلام</span>
            <p className="text-[#6B6B6B] text-sm">ادفع نقداً عند استلام الطلب</p>
          </div>
          <span className="text-2xl">💵</span>
        </label>
        
        <label className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer border-2 transition-all ${paymentMethod === 'link' ? 'border-[#C9A96E] bg-[#C9A96E]/5' : 'border-[#E8E0D5] hover:border-[#C9A96E]/50'}`}>
          <input 
            type="radio" 
            name="payment" 
            value="link" 
            checked={paymentMethod === 'link'} 
            onChange={() => onPaymentChange('link')} 
            className="w-5 h-5 accent-[#C9A96E]" 
          />
          <div className="flex-1">
            <span className="text-[#1A1A1A] font-medium">رابط دفع</span>
            <p className="text-[#6B6B6B] text-sm">ادفع عبر رابط إلكتروني</p>
          </div>
          <span className="text-2xl">💳</span>
        </label>
      </div>

      <div className="flex items-start gap-3 p-4 bg-[#C9A96E]/10 rounded-xl mt-4">
        <AlertCircle className="w-5 h-5 text-[#C9A96E] flex-shrink-0 mt-0.5" />
        <p className="text-sm text-[#6B6B6B]">سيتم مراجعة طلبك والتواصل معك عبر واتساب لتأكيد الطلب</p>
      </div>
    </div>
  );
}