import React from 'react';

interface PersonalInfoFormProps {
  name: string;
  phone: string;
  errors: Record<string, string>;
  onNameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onClearError: (field: string) => void;
}

export default function PersonalInfoForm({
  name,
  phone,
  errors,
  onNameChange,
  onPhoneChange,
  onClearError,
}: PersonalInfoFormProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-[#1A1A1A] mb-6 flex items-center gap-2">
        <span className="w-8 h-8 bg-[#C9A96E] text-white rounded-full flex items-center justify-center text-sm">1</span>
        البيانات الشخصية
      </h2>

      <div className="space-y-5">
        <div>
          <label className="block text-[#1A1A1A] font-medium mb-2">الاسم الكامل</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => { onNameChange(e.target.value); onClearError('name'); }}
            className={`w-full px-4 py-3 bg-[#FAF8F5] border ${errors.name ? 'border-red-500' : 'border-[#E8E0D5]'} rounded-xl text-[#1A1A1A] focus:outline-none focus:border-[#C9A96E]`}
            placeholder="أدخل اسمك الكامل" 
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-[#1A1A1A] font-medium mb-2">رقم الهاتف</label>
          <div className="relative">
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B6B6B]">+965</span>
            <input 
              type="tel" 
              value={phone} 
              onChange={(e) => { onPhoneChange(e.target.value); onClearError('phone'); }}
              className={`w-full px-4 py-3 bg-[#FAF8F5] border ${errors.phone ? 'border-red-500' : 'border-[#E8E0D5]'} rounded-xl text-[#1A1A1A] focus:outline-none focus:border-[#C9A96E] pr-12`}
              placeholder="رقم الهاتف" 
              maxLength={8} 
            />
          </div>
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>
      </div>
    </div>
  );
}