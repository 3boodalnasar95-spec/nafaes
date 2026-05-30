export interface Category {
  slug: string;
  name_ar: string;
  name_en: string;
  description?: string;
  icon: string;
  color: string;
}

export const categories: Category[] = [
  {
    slug: 'smart-aroma-diffusers',
    name_ar: 'الأجهزة الكهربائية الفواحة',
    name_en: 'Smart Aroma Diffusers',
    description: 'أجهزة تعطير ذكية بتصميم فاخر، تمنح المكان رائحة ثابتة وانتشارًا متوازنًا.',
    icon: 'Sparkles',
    color: 'from-[#C9A96E] to-[#D4AF37]',
  },
  {
    slug: 'fragrance-oils',
    name_ar: 'الزيوت العطرية',
    name_en: 'Fragrance Oils',
    description: 'زيوت عطرية مختارة لتجربة تعطير راقية تدوم وتناسب مختلف الأذواق.',
    icon: 'Droplets',
    color: 'from-blue-500 to-blue-600',
  },
  {
    slug: 'reed-diffusers',
    name_ar: 'الفواحات العطرية',
    name_en: 'Reed Diffusers',
    description: 'فواحات أعواد أنيقة تعمل بدون كهرباء، تضيف للديكور رائحة هادئة ولمسة فخامة.',
    icon: 'Flower2',
    color: 'from-amber-500 to-amber-600',
  },
  {
    slug: 'gift-sets',
    name_ar: 'طقم الهدايا',
    name_en: 'Gift Sets',
    description: 'أطقم عطرية جاهزة للإهداء، بتغليف راقٍ وتفاصيل تناسب المناسبات.',
    icon: 'Gift',
    color: 'from-purple-500 to-purple-600',
  },
];

export const categoryIcons: Record<string, string> = {
  Sparkles: 'Sparkles',
  Droplets: 'Droplets',
  Flower2: 'Flower2',
  Gift: 'Gift',
};

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug);
}

export function getCategoryInfo(categorySlug: string): Category | undefined {
  return categories.find(c => c.slug === categorySlug);
}