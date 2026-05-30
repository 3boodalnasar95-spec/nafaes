import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin } from 'lucide-react';
import { formatPrice, kuwaitGovernorates, getAreasByGovernorate, searchAreas, type DeliveryArea } from '@/data/products';

interface AddressFormProps {
  governorate: string;
  area: string;
  address: string;
  notes: string;
  errors: Record<string, string>;
  onGovernorateChange: (value: string) => void;
  onAreaChange: (value: string) => void;
  onAddressChange: (value: string) => void;
  onNotesChange: (value: string) => void;
  onClearError: (field: string) => void;
}

export default function AddressForm({
  governorate,
  area,
  address,
  notes,
  errors,
  onGovernorateChange,
  onAreaChange,
  onAddressChange,
  onNotesChange,
  onClearError,
}: AddressFormProps) {
  const [filteredAreas, setFilteredAreas] = useState<DeliveryArea[]>([]);
  const [areaSearch, setAreaSearch] = useState('');
  const [showAreaDropdown, setShowAreaDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedArea = filteredAreas.find(a => a.id === area) || 
    (area ? { id: area, name: area, delivery: 2 } : undefined);

  useEffect(() => {
    if (governorate) {
      const areas = getAreasByGovernorate(governorate);
      setFilteredAreas(areas);
      setAreaSearch('');
    } else {
      setFilteredAreas([]);
    }
    onAreaChange('');
  }, [governorate]);

  useEffect(() => {
    if (governorate && areaSearch) {
      const areas = searchAreas(areaSearch, governorate);
      setFilteredAreas(areas);
    } else if (governorate) {
      setFilteredAreas(getAreasByGovernorate(governorate));
    }
  }, [areaSearch, governorate]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowAreaDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-[#1A1A1A] mb-6 flex items-center gap-2">
        <span className="w-8 h-8 bg-[#C9A96E] text-white rounded-full flex items-center justify-center text-sm">2</span>
        عنوان التوصيل
      </h2>

      <div className="space-y-5">
        <div>
          <label className="block text-[#1A1A1A] font-medium mb-2">
            <MapPin className="w-4 h-4 inline-block ml-1" />
            المحافظة *
          </label>
          <select 
            value={governorate} 
            onChange={(e) => { onGovernorateChange(e.target.value); onClearError('governorate'); }}
            className={`w-full px-4 py-3 bg-[#FAF8F5] border ${errors.governorate ? 'border-red-500' : 'border-[#E8E0D5]'} rounded-xl text-[#1A1A1A] focus:outline-none focus:border-[#C9A96E]`}
          >
            <option value="">اختر المحافظة</option>
            {kuwaitGovernorates.map(gov => (
              <option key={gov.id} value={gov.id}>{gov.name}</option>
            ))}
          </select>
          {errors.governorate && <p className="text-red-500 text-sm mt-1">{errors.governorate}</p>}
        </div>

        <div className="relative" ref={dropdownRef}>
          <label className="block text-[#1A1A1A] font-medium mb-2">
            <Search className="w-4 h-4 inline-block ml-1" />
            المنطقة *
          </label>
          <input 
            type="text" 
            value={areaSearch || (selectedArea?.name || '')}
            onChange={(e) => { 
              setAreaSearch(e.target.value); 
              setShowAreaDropdown(true); 
              onAreaChange('');
              onClearError('area'); 
            }}
            onFocus={() => setShowAreaDropdown(true)}
            disabled={!governorate}
            placeholder={governorate ? "ابحث عن منطقتك..." : "اختر المحافظة أولاً"}
            className={`w-full px-4 py-3 bg-[#FAF8F5] border ${errors.area ? 'border-red-500' : 'border-[#E8E0D5]'} rounded-xl text-[#1A1A1A] focus:outline-none focus:border-[#C9A96E] ${!governorate && 'opacity-50 cursor-not-allowed'}`}
          />
          {selectedArea && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C9A96E] text-sm font-medium">
              {formatPrice(selectedArea.delivery)} توصيل
            </span>
          )}
          
          {showAreaDropdown && governorate && filteredAreas.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-[#E8E0D5] rounded-xl shadow-xl max-h-64 overflow-y-auto">
              {filteredAreas.map(a => (
                <button 
                  key={a.id} 
                  type="button" 
                  onClick={() => {
                    onAreaChange(a.id);
                    setAreaSearch('');
                    setShowAreaDropdown(false);
                    onClearError('area');
                  }}
                  className="w-full px-4 py-3 text-right hover:bg-[#FAF8F5] border-b border-[#E8E0D5] last:border-0 flex items-center justify-between"
                >
                  <span className="text-[#1A1A1A]">{a.name}</span>
                  <span className={`text-sm font-medium ${a.delivery === 2 ? 'text-green-600' : a.delivery === 2.5 ? 'text-blue-600' : a.delivery === 3 ? 'text-orange-600' : 'text-red-600'}`}>
                    {formatPrice(a.delivery)}
                  </span>
                </button>
              ))}
            </div>
          )}
          {errors.area && <p className="text-red-500 text-sm mt-1">{errors.area}</p>}
        </div>

        <div>
          <label className="block text-[#1A1A1A] font-medium mb-2">العنوان بالتفصيل *</label>
          <textarea 
            value={address} 
            onChange={(e) => { onAddressChange(e.target.value); onClearError('address'); }}
            rows={3}
            className={`w-full px-4 py-3 bg-[#FAF8F5] border ${errors.address ? 'border-red-500' : 'border-[#E8E0D5]'} rounded-xl text-[#1A1A1A] focus:outline-none focus:border-[#C9A96E] resize-none`}
            placeholder="القطعة، الشارع، رقم المبنى..." 
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>

        <div>
          <label className="block text-[#1A1A1A] font-medium mb-2">ملاحظات (اختياري)</label>
          <textarea 
            value={notes} 
            onChange={(e) => onNotesChange(e.target.value)}
            rows={2}
            className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E8E0D5] rounded-xl text-[#1A1A1A] focus:outline-none focus:border-[#C9A96E] resize-none"
            placeholder="أي ملاحظات خاصة بالطلب..." 
          />
        </div>
      </div>
    </div>
  );
}