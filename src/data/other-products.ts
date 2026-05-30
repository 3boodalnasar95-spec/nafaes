import { Product } from './types';

export const reedDiffusers: Product[] = [
  {
    id: 'amber-santal',
    name_ar: 'أمبر سانتال',
    name_en: 'AMBER SANTAL',
    type: 'معطر أعواد',
    price: 10.9,
    shortDescription: 'معطر أعواد فاخر.',
    fullDescription: 'معطر أعواد.',
    specs: { 'النوع': 'معطر أعواد' },
    features: ['زجاجة أنيقة', 'أعواد طبيعية'],
    image: '/images/reed/amber-santal.png',
  },
];

export const giftSets: Product[] = [
  {
    id: 'forest-reserve',
    name_ar: 'فورست ريزيرف',
    name_en: 'FOREST RESERVE',
    type: 'طقم هدايا',
    price: 13.9,
    shortDescription: 'طقم هدايا عطري.',
    fullDescription: 'طقم هدايا.',
    specs: { 'النوع': 'طقم هدايا' },
    features: ['هدية فاخرة', 'جاهز للإهداء'],
    image: '/images/gifts/forest-reserve.png',
  },
];