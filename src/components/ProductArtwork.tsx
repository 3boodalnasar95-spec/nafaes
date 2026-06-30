import { getProductTypeLabel } from '@/data/products';

type ProductArtworkProps = {
  nameAr: string;
  nameEn: string;
  type: string;
  imageSrc?: string;
  variantLabel?: string;
  priceLabel?: string;
  className?: string;
  compact?: boolean;
};

export default function ProductArtwork({
  nameAr,
  nameEn,
  type,
  imageSrc,
  variantLabel,
  priceLabel,
  className = '',
  compact = false,
}: ProductArtworkProps) {
  const isOil = type === 'oils';
  const isDevice = type === 'devices';
  const isDiffuser = type === 'diffusers';
  const isGift = type === 'gifts';

  const shell = compact ? 'p-3' : 'p-5';
  const titleSize = compact ? 'text-xl' : 'text-3xl';

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-[#E8E0D5] bg-gradient-to-br from-[#f9f4ec] via-[#f6efe5] to-[#ead9ba] ${shell} ${className}`}>
      <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_top_right,_rgba(201,169,110,0.25),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.85),_transparent_30%)]" />

      <div className="relative h-full min-h-[320px] flex flex-col">
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className="inline-flex items-center rounded-full bg-[#C9A96E] px-3 py-1 text-xs font-bold text-white shadow-sm">
            {getProductTypeLabel(type)}
          </span>
          {variantLabel && (
            <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#1A1A1A] border border-[#E8E0D5]">
              {variantLabel}
            </span>
          )}
        </div>

        <div className="flex-1 flex items-center justify-center gap-4 min-h-[220px]">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={nameAr}
              className="max-h-[100%] max-w-[100%] object-contain drop-shadow-2xl"
              onError={(e) => {
                (e.target as HTMLImageElement).removeAttribute('src');
              }}
            />
          ) : isOil ? (
            <div className="flex items-end gap-3">
              <div className="h-32 w-12 rounded-full bg-[#1f2937] shadow-lg" />
              <div className="h-46 w-16 rounded-t-[28px] rounded-b-[18px] bg-[#1f2937] shadow-lg" />
              <div className="h-60 w-20 rounded-t-[30px] rounded-b-[20px] bg-[#0f172a] shadow-lg relative">
                <div className="absolute left-1/2 -translate-x-1/2 top-6 h-8 w-10 rounded-full bg-[#c9a96e]" />
              </div>
            </div>
          ) : isDevice ? (
            <div className="relative h-60 w-40 rounded-[42px] bg-[#111111] shadow-2xl border border-black/10">
              <div className="absolute left-1/2 top-8 h-12 w-24 -translate-x-1/2 rounded-2xl bg-[#1f2937]" />
              <div className="absolute left-1/2 top-24 h-16 w-16 -translate-x-1/2 rounded-full bg-[#c9a96e]/30 border border-[#c9a96e]" />
              <div className="absolute inset-x-8 bottom-8 h-3 rounded-full bg-[#84cc16]" />
            </div>
          ) : isDiffuser ? (
            <div className="relative flex items-end gap-2">
              <div className="h-40 w-16 rounded-t-[18px] rounded-b-[26px] bg-[#7b5a3b] shadow-xl" />
              <div className="h-52 w-18 rounded-t-[22px] rounded-b-[28px] bg-[#1f2937] shadow-xl" />
              <div className="h-44 w-4 rounded-full bg-[#111111]" />
              <div className="h-52 w-4 rounded-full bg-[#111111]" />
              <div className="h-40 w-24 rounded-[24px] bg-[#fff6ed] border border-[#c9a96e] shadow-lg absolute right-0 bottom-0 -mr-8" />
            </div>
          ) : isGift ? (
            <div className="relative flex items-center justify-center">
              <div className="h-44 w-52 rounded-3xl bg-[#f5e8ce] border border-[#c9a96e] shadow-xl rotate-[-8deg]" />
              <div className="absolute right-4 top-6 h-36 w-28 rounded-2xl bg-[#7b5a3b] shadow-xl" />
              <div className="absolute left-4 top-10 h-28 w-18 rounded-full bg-[#111111] shadow-xl" />
              <div className="absolute left-12 top-0 h-56 w-4 rounded-full bg-[#111111]" />
            </div>
          ) : null}
        </div>

        <div className="mt-5 rounded-2xl bg-white/85 p-4 text-right border border-white/80 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className={`${titleSize} font-bold text-[#111111] leading-tight`}>{nameAr}</h3>
              <p className="text-sm text-[#6B6B6B] mt-1">{nameEn}</p>
            </div>
            {priceLabel && (
              <div className="text-left">
                <div className="text-xs text-[#6B6B6B]">السعر</div>
                <div className="text-[#C9A96E] font-bold text-lg">{priceLabel}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
