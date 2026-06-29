import { governorates, deliveryAreas } from './kuwait-areas';

export interface Product {
  id: string;
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
  variant?: string;
  variantId?: string;
  variantLabel?: string;
  variantSize?: string;
  cartKey?: string;
  variants?: ProductVariant[];
  sku?: string;
  stock_quantity?: number;
  min_stock_level?: number;
}

export interface ProductVariant {
  id: string;
  size: string;
  price: number;
  sku: string;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  name: string;
  phone: string;
  area: string;
  address: string;
  notes: string;
  paymentMethod: 'cash' | 'link';
}

export interface DeliveryArea {
  id: string;
  name: string;
  delivery: number;
}

export interface Governorate {
  id: string;
  name: string;
}

export const kuwaitGovernorates: Governorate[] = governorates.map(g => ({ id: g.id, name: g.name_ar }));
export const kuwaitAreas: DeliveryArea[] = deliveryAreas.map(area => ({
  id: area.id,
  name: area.name_ar,
  delivery: area.delivery_fee,
}));

export type ProductCatalog = {
  id: string;
  name_ar: string;
  name_en: string;
  type: 'oils' | 'devices' | 'gifts' | 'diffusers';
  description_short: string;
  description_full: string;
  features: string[];
  image: string;
  variants: ProductVariant[];
};

export const PRODUCT_TYPE_LABELS: Record<string, string> = {
  oils: 'الزيوت العطرية',
  devices: 'أجهزة التعطير',
  gifts: 'الهدايا العطرية',
  diffusers: 'معطرات الأعواد',
};

export function getProductTypeLabel(type?: string): string {
  if (!type) return '';
  return PRODUCT_TYPE_LABELS[type] || type;
}

export const PRODUCT_CATALOG: ProductCatalog[] = [
  {
    id: 'shangri-la',
    name_ar: 'شانغريلا',
    name_en: 'Shangri-La',
    type: 'oils',
    description_short: 'زيت عطري للأجهزة',
    description_full: 'همس الزنجبيل الأبيض مع الأوركيد والياسمن لمسية ناعمة لاُدوَاء، سِا تُزهر في النفس سكينة دافئة.',
    features: ['نفحات زنجبيل أبيض', 'خلاصة أوركيد', 'ياسمن ناعم', 'سكينة دافئة'],
    image: '/images/shangri-la.png',
    variants: [
      { id: 'shangri-la-20', size: '20ml', price: 1.750, sku: 'SHL-20', stock: 50 },
      { id: 'shangri-la-120', size: '120ml', price: 4.750, sku: 'SHL-120', stock: 40 },
      { id: 'shangri-la-500', size: '500ml', price: 12.900, sku: 'SHL-500', stock: 25 },
    ],
  },
  {
    id: 'landmark-hotel',
    name_ar: 'فندق لاندمارك',
    name_en: 'Landmark Hotel',
    type: 'oils',
    description_short: 'زيت عطري فاخر برائحة الفندق',
    description_full: 'حمضيات منتعشة ترقص مع لمسات راقية في قاعة فندق لاندمارك تخلق أجواء من الفخامة.',
    features: ['حمضيات منتعشة', 'لمسات راقية', 'أجواء فاخرة', 'ثبات طويل'],
    image: '/images/landmark-hotel.png',
    variants: [
      { id: 'landmark-hotel-20', size: '20ml', price: 1.750, sku: 'LMH-20', stock: 50 },
      { id: 'landmark-hotel-120', size: '120ml', price: 4.750, sku: 'LMH-120', stock: 40 },
      { id: 'landmark-hotel-500', size: '500ml', price: 12.900, sku: 'LMH-500', stock: 25 },
    ],
  },
  {
    id: 'marriott',
    name_ar: 'ماريوت',
    name_en: 'Marriott',
    type: 'oils',
    description_short: 'زيت عطري برائحة الفنادق الفاخرة',
    description_full: 'أجواء فندقية لامعة تجمع بين الدفء والرائحة الزهرية الراقية وأخشاب غامقة.',
    features: ['أخشاب غامقة', 'لمسات زهرية', 'دفء فاخر', 'ثبات عالي'],
    image: '/images/marriott.png',
    variants: [
      { id: 'marriott-20', size: '20ml', price: 1.750, sku: 'MRT-20', stock: 50 },
      { id: 'marriott-120', size: '120ml', price: 4.750, sku: 'MRT-120', stock: 40 },
      { id: 'marriott-500', size: '500ml', price: 12.900, sku: 'MRT-500', stock: 25 },
    ],
  },
  {
    id: 'ocean',
    name_ar: 'أوشن',
    name_en: 'Ocean',
    type: 'oils',
    description_short: 'زيت عطري بحري منعش',
    description_full: 'سير بحر منعش مع نفحات المسك والأخشاب المنعشة، فاكهي ناعم ولمسة جميلة منعشة.',
    features: ['نسيم البحر', 'مسك منعش', 'أخشاب فاتحة', 'إحساس بالصفاء'],
    image: '/images/ocean.png',
    variants: [
      { id: 'ocean-20', size: '20ml', price: 1.500, sku: 'OCN-20', stock: 60 },
      { id: 'ocean-120', size: '120ml', price: 4.250, sku: 'OCN-120', stock: 45 },
      { id: 'ocean-500', size: '500ml', price: 11.900, sku: 'OCN-500', stock: 30 },
    ],
  },
  {
    id: 'amber-pegasus',
    name_ar: 'أمير بيغاسوس',
    name_en: 'Amber Pegasus',
    type: 'oils',
    description_short: 'زيت عنبري فاخر للجو',
    description_full: 'عطر ميثاق يلتقي بالياسمن والفانيليا الراقية في تركيبة دافئة وقوية.',
    features: ['عطر ميثاق', 'ياسمين دافئ', 'فانيليا راقية', 'ثبات قوي'],
    image: '/images/amber-pegasus.png',
    variants: [
      { id: 'amber-pegasus-20', size: '20ml', price: 1.950, sku: 'AMP-20', stock: 40 },
      { id: 'amber-pegasus-120', size: '120ml', price: 5.250, sku: 'AMP-120', stock: 30 },
      { id: 'amber-pegasus-500', size: '500ml', price: 13.900, sku: 'AMP-500', stock: 20 },
    ],
  },
  {
    id: 'amor-m',
    name_ar: 'أمور إم',
    name_en: 'Amor M',
    type: 'oils',
    description_short: 'زيت عطري للحياة العائلية',
    description_full: 'امتزاج التفاح والحب مع لمسات المسك والفانيلا، لمسة آمنة وقوية وعطرة.',
    features: ['تفاح طازج', 'مسك دافئ', 'فانيلا ناعمة', 'للاستخدام العائلي'],
    image: '/images/amor-m.png',
    variants: [
      { id: 'amor-m-20', size: '20ml', price: 1.500, sku: 'AMR-20', stock: 60 },
      { id: 'amor-m-120', size: '120ml', price: 4.250, sku: 'AMR-120', stock: 45 },
      { id: 'amor-m-500', size: '500ml', price: 11.900, sku: 'AMR-500', stock: 30 },
    ],
  },
  {
    id: 'strength',
    name_ar: 'سترينث',
    name_en: 'Strength',
    type: 'oils',
    description_short: 'زيت عطري للأجهزة قوي',
    description_full: 'عبير قوة من العبير والبهارات والأخشاب المدخنة مع لمسة ذهبية أرضية وكثيفة رائعة.',
    features: ['عبير قوي', 'بهارات دافئة', 'أخشاب مدخنة', 'ثبات استثنائي'],
    image: '/images/strength.png',
    variants: [
      { id: 'strength-20', size: '20ml', price: 1.750, sku: 'STR-20', stock: 50 },
      { id: 'strength-120', size: '120ml', price: 4.750, sku: 'STR-120', stock: 35 },
      { id: 'strength-500', size: '500ml', price: 12.900, sku: 'STR-500', stock: 22 },
    ],
  },
  {
    id: 'oud',
    name_ar: 'عود',
    name_en: 'Oud',
    type: 'oils',
    description_short: 'زيت عطري عود فاخر',
    description_full: 'عود فاخر بنكهات خشبية شرقية شرقي مع هيل وصندل ولمسة دافئة مرهقة.',
    features: ['عود أصيل', 'هيل شرقي', 'صندل دافئ', 'فخامة عربية'],
    image: '/images/oud.png',
    variants: [
      { id: 'oud-20', size: '20ml', price: 1.950, sku: 'OUD-20', stock: 40 },
      { id: 'oud-120', size: '120ml', price: 5.250, sku: 'OUD-120', stock: 30 },
      { id: 'oud-500', size: '500ml', price: 13.900, sku: 'OUD-500', stock: 18 },
    ],
  },
  {
    id: 'sienna',
    name_ar: 'سيينا',
    name_en: 'Sienna',
    type: 'oils',
    description_short: 'زيت عطري فاخر',
    description_full: 'مزيج مدهش من القوة والبهارات والفيتامينات أرابيكا مع لمسات عنبرية دافئة.',
    features: ['قهوة أرابيكا', 'بهارات دافئة', 'عنبر فاخر', 'دفء مميز'],
    image: '/images/sienna.png',
    variants: [
      { id: 'sienna-20', size: '20ml', price: 1.750, sku: 'SIN-20', stock: 50 },
      { id: 'sienna-120', size: '120ml', price: 4.750, sku: 'SIN-120', stock: 35 },
      { id: 'sienna-500', size: '500ml', price: 12.900, sku: 'SIN-500', stock: 22 },
    ],
  },
  {
    id: 'fresh-rain-citrus',
    name_ar: 'مطر منعش وحمضيات',
    name_en: 'Fresh Rain & Citrus',
    type: 'oils',
    description_short: 'زيت عطري حمضي منعش',
    description_full: 'انتعاش مطري بلمسات جميلة منعشة وقوية ناعمة وملمس لمسية أنيقة منعشة.',
    features: ['مطر منعش', 'حمضيات قوية', 'لمسات ناعمة', 'إحساس بالصفاء'],
    image: '/images/fresh-rain-citrus.png',
    variants: [
      { id: 'fresh-rain-20', size: '20ml', price: 1.500, sku: 'FRC-20', stock: 60 },
      { id: 'fresh-rain-120', size: '120ml', price: 4.250, sku: 'FRC-120', stock: 45 },
      { id: 'fresh-rain-500', size: '500ml', price: 11.900, sku: 'FRC-500', stock: 30 },
    ],
  },
  {
    id: 'red-crystal',
    name_ar: 'ريد كريستال',
    name_en: 'Red Crystal',
    type: 'oils',
    description_short: 'زيت عطري فاخر للأجهزة',
    description_full: 'عطر شرقي دافئ وفاخر بين الحبوب والعنبر والفخامة في تركيبة أنيقة دافئة، مخصص للجواء التذكارية.',
    features: ['عطر شرقي', 'حبوب دافئة', 'عنبر فاخر', 'تركيبة دافئة'],
    image: '/images/red-crystal.png',
    variants: [
      { id: 'red-crystal-20', size: '20ml', price: 1.950, sku: 'RCR-20', stock: 35 },
      { id: 'red-crystal-120', size: '120ml', price: 6.900, sku: 'RCR-120', stock: 25 },
      { id: 'red-crystal-500', size: '500ml', price: 14.900, sku: 'RCR-500', stock: 15 },
    ],
  },
  {
    id: 'elan-360-nomad',
    name_ar: 'إيلان 360 نوماد',
    name_en: 'ELAN 360 Nomad',
    type: 'devices',
    description_short: 'جهاز تعطير ذكي قابل للشحن',
    description_full: 'جهاز تعطير محمول بتصميم فاخر، بطارية مدمجة، وتحكم ذكي يناسب المنزل والسيارة والمكتب.',
    features: ['قابل للشحن', 'تحكم ذكي', 'تصميم محمول', 'مناسب للسيارة والمكتب'],
    image: '/images/elan-360-nomad.svg',
    variants: [
      { id: 'elan-360-nomad-standard', size: 'Standard', price: 49.000, sku: 'ELN-NOM-STD', stock: 12 },
    ],
  },
  {
    id: 'elan-360-prime',
    name_ar: 'إيلان 360 برايم',
    name_en: 'ELAN 360 Prime',
    type: 'devices',
    description_short: 'جهاز تعطير كهربائي فاخر',
    description_full: 'جهاز تعطير أنيق للمساحات الداخلية مع أداء ثابت وتغطية ممتازة للروائح.',
    features: ['كهربائي', 'تغطية ممتازة', 'تشغيل ثابت', 'مظهر فاخر'],
    image: '/images/elan-360-prime.svg',
    variants: [
      { id: 'elan-360-prime-standard', size: 'Standard', price: 42.000, sku: 'ELN-PRI-STD', stock: 14 },
    ],
  },
  {
    id: 'noir-majeste',
    name_ar: 'نوار ماجستيه',
    name_en: 'Noir Majeste',
    type: 'devices',
    description_short: 'جهاز تعطير احترافي بشاشة LCD',
    description_full: 'جهاز متكامل للمساحات الراقية مع شاشة واضحة، بخاخ متوازن، وتصميم داكن فخم.',
    features: ['شاشة LCD', 'احترافي', 'تصميم داكن', 'للمساحات الراقية'],
    image: '/images/noir-majeste.svg',
    variants: [
      { id: 'noir-majeste-standard', size: 'Standard', price: 59.000, sku: 'NRJ-STD', stock: 10 },
    ],
  },
  {
    id: 'amber-santal',
    name_ar: 'أمبر سانتال',
    name_en: 'Amber Santal',
    type: 'diffusers',
    description_short: 'معطر أعواد فاخر دافئ',
    description_full: 'معطر أعواد أنيق برائحة عنبرية وخشبية تمنح المكان حضوراً راقياً وثباتاً جميلاً.',
    features: ['خشبي دافئ', 'ثبات جميل', 'لمسة فاخرة', 'للمنزل والمكتب'],
    image: '/images/amber-santal.svg',
    variants: [
      { id: 'amber-santal-200', size: '200ml', price: 10.900, sku: 'AMS-200', stock: 20 },
    ],
  },
  {
    id: 'forest-reserve',
    name_ar: 'فورست ريزيرف',
    name_en: 'Forest Reserve',
    type: 'gifts',
    description_short: 'طقم هدايا عطري فاخر',
    description_full: 'طقم هدايا يجمع بين الدفء والأناقة مع لمسة تناسب الهدايا الرسمية والاحتفالات الخاصة.',
    features: ['طقم هدايا', 'مناسب للمناسبات', 'فخم وعملي', 'اختيار راقٍ'],
    image: '/images/forest-reserve.svg',
    variants: [
      { id: 'forest-reserve-set', size: 'Set', price: 13.900, sku: 'FSR-SET', stock: 8 },
    ],
  },
];

export const localProducts: Product[] = PRODUCT_CATALOG.flatMap(catalog =>
  [{
    id: catalog.id,
    name_ar: catalog.name_ar,
    name_en: catalog.name_en,
    type: catalog.type,
    price: catalog.variants[0]?.price || 0,
    shortDescription: catalog.description_short,
    fullDescription: catalog.description_full,
    features: catalog.features,
    specs: {
      'الأحجام': catalog.variants.map(v => v.size).join(' / '),
      'النوع': catalog.description_short,
      'SKU': catalog.variants[0]?.sku || '',
    },
    image: catalog.image,
    images: [catalog.image],
    variant: catalog.variants[0]?.size,
    variants: catalog.variants,
    sku: catalog.variants[0]?.sku,
    stock_quantity: catalog.variants.reduce((sum, v) => sum + v.stock, 0),
    min_stock_level: 5,
  }]
);

export const products = localProducts;

export const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '96566377312';
export const deliveryFee = 2;
export const whatsappLink = `https://wa.me/${whatsappNumber}`;

export function getAreasByGovernorate(governorateId: string): DeliveryArea[] {
  return kuwaitAreas.filter(area => {
    const areaData = deliveryAreas.find(a => a.id === area.id && a.governorate_id === governorateId);
    return !!areaData;
  });
}

export function getAreaById(areaId: string): DeliveryArea | undefined {
  return kuwaitAreas.find(area => area.id === areaId);
}

export function getGovernorateById(governorateId: string): Governorate | undefined {
  return kuwaitGovernorates.find(g => g.id === governorateId);
}

export function formatPrice(price: number): string {
  return `${price.toFixed(3)} د.ك`;
}

export function searchAreas(query: string, governorateId?: string): DeliveryArea[] {
  let results = kuwaitAreas;
  if (governorateId) {
    const govAreas = getAreasByGovernorate(governorateId);
    if (query) {
      const lowerQuery = query.toLowerCase();
      return govAreas.filter(area => area.name.toLowerCase().includes(lowerQuery));
    }
    return govAreas;
  }
  if (query) {
    const lowerQuery = query.toLowerCase();
    return results.filter(area => area.name.toLowerCase().includes(lowerQuery));
  }
  return results;
}

export function getTotalAreasCount(): number {
  return kuwaitAreas.length;
}
