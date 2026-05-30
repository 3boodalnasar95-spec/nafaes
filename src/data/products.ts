import { Product, SizeOption } from './types';
import { kuwaitGovernorates, getAreasByGovernorate, getAreaById } from './kuwait-areas';

// ==================== SIZES ====================
export const flavorSizes: SizeOption[] = [
  { size: '20ml', ml: 20, price: 3.5 },
  { size: '120ml', ml: 120, price: 10.9 },
  { size: '500ml', ml: 500, price: 25 },
];

// ==================== CATEGORIES ====================
export const categories = [
  {
    slug: 'smart-aroma-diffusers',
    name_ar: 'الأجهزة الكهربائية الفواحة',
    name_en: 'Smart Aroma Diffusers',
    description: 'أجهزة تعطير ذكية بتصميم فاخر.',
    icon: 'Sparkles',
    color: 'from-[#C9A96E] to-[#D4AF37]',
  },
  {
    slug: 'fragrance-oils',
    name_ar: 'الزيوت العطرية',
    name_en: 'Fragrance Oils',
    description: 'زيوت عطرية مختارة لتجربة تعطير راقية.',
    icon: 'Droplets',
    color: 'from-blue-500 to-blue-600',
  },
  {
    slug: 'reed-diffusers',
    name_ar: 'الفواحات العطرية',
    name_en: 'Reed Diffusers',
    description: 'معطرات أعواد أنيقة.',
    icon: 'Flower2',
    color: 'from-amber-500 to-amber-600',
  },
  {
    slug: 'gift-sets',
    name_ar: 'طقم الهدايا',
    name_en: 'Gift Sets',
    description: 'أطقم عطرية جاهزة للإهداء.',
    icon: 'Gift',
    color: 'from-purple-500 to-purple-600',
  },
];

// ==================== PRODUCTS ====================

//Devices
const devices: Product[] = [
  {
    id: 'elan-nomad',
    name_ar: 'إيلان 360 نوماد',
    name_en: 'ELAN 360 NOMAD',
    type: 'جهاز تعطير ذكي قابل للشحن',
    price: 69,
    shortDescription: 'جهاز تعطير ذكي قابل للشحن يمنحك تجربة عطرية متنقلة وأنيقة.',
    fullDescription: 'إيلان 360 نوماد مصمم لمن يبحث عن الفخامة والراحة في جهاز واحد. يعمل ببطارية ليثيوم مدمجة، ويدعم الشحن Type-C، مع انتشار عطري 360° لتوزيع الرائحة بشكل متوازن.',
    specs: {
      'السعة': '120 مل',
      'نوع التشغيل': 'بطارية ليثيوم قابلة للشحن',
      'الشحن': 'Type-C',
      'الانتشار': '360°',
      'مستويات التحكم': '3 مستويات',
      'المؤقت': '1 / 4 / 8 ساعات',
      'التحكم': 'Wi-Fi + Bluetooth',
      'التغطية': 'حتى 100 م²',
      'مستوى الصوت': 'أقل من 28 dB',
    },
    features: ['رفاهية متنقلة', 'تشغيل ذكي', 'تصميم فاخر', 'سهل الحمل', 'مناسب للاستخدام اليومي'],
    image: '/images/devices/elan-nomad.png',
    categorySlug: 'smart-aroma-diffusers',
  },
  {
    id: 'elan-prime',
    name_ar: 'إيلان 360 برايم',
    name_en: 'ELAN 360 PRIME',
    type: 'جهاز تعطير كهربائي',
    price: 59,
    shortDescription: 'جهاز تعطير كهربائي ثابت بتصميم أنيق، مناسب للمنازل والمكاتب.',
    fullDescription: 'إيلان 360 برايم جهاز تعطير كهربائي يمنح المكان رائحة ثابتة ومنتظمة طوال اليوم. يتميز بتشغيل مباشر بالكهرباء، انتشار 360°، سعة 120 مل، وتحكم مريح باللمس مع Bluetooth وRemote.',
    specs: {
      'السعة': '120 مل',
      'نوع التشغيل': 'كهربائي مباشر',
      'الانتشار': '360°',
      'التحكم': 'Touch / Bluetooth / Remote',
      'مستوى الصوت': 'أقل من 34 dB',
      'التغطية': 'حتى 120 م²',
      'الفولتية': 'AC 110V / 220V',
    },
    features: ['فخامة يومية', 'تشغيل ثابت', 'رائحة متوازنة', 'تصميم أنيق', 'مناسب للمنازل والمكاتب'],
    image: '/images/devices/elan-prime.png',
    categorySlug: 'smart-aroma-diffusers',
  },
  {
    id: 'noir-majeste',
    name_ar: 'نوار ماجستيه',
    name_en: 'NOIR MAJESTÉ',
    type: 'جهاز تعطير احترافي بشاشة LCD',
    price: 79,
    shortDescription: 'جهاز تعطير احترافي للمساحات الراقية والكبيرة، مزود بشاشة LCD وتحكم ذكي.',
    fullDescription: 'نوار ماجستيه جهاز تعطير فاخر مناسب للمنازل الكبيرة، المكاتب، الصالونات، العيادات، الاستقبالات، الفنادق، والسبا. يتميز بسعة 200 مل، تغطية قوية، شاشة LCD، تحكم باللمس والبلوتوث، وخيارات تركيب متعددة.',
    specs: {
      'السعة': '200 مل',
      'التغطية': '300–500m³',
      'مستوى الصوت': 'أقل من 40 dBA',
      'التحكم': 'Touch Buttons / Bluetooth',
      'الشاشة': 'LCD',
      'خيارات التركيب': 'Table / Wall / HVAC',
      'الطاقة': '6W',
      'الوزن': '2.1kg',
      'المقاس': 'W188 × D92 × H239mm',
    },
    features: ['مناسب للمساحات الكبيرة', 'تصميم احترافي', 'تحكم ذكي', 'تشغيل هادئ', 'مناسب للمشاريع والعيادات'],
    image: '/images/devices/noir-majeste.png',
    categorySlug: 'smart-aroma-diffusers',
  },
];

// Oils - كل زيت له 3 أحجام
const oils: Product[] = [
  {
    id: 'black-oud', name_ar: 'بلاك عود', name_en: 'BLACK OUD', type: 'زيوت عطرية',
    price: 14.9, basePrice: 14.9,
    shortDescription: 'رائحة عود فاخرة وعميقة',
    fullDescription: 'زيوت عطرية بتركيبة عود فاخرة تمنح أجواءً ملكية وفاخرة.',
    specs: { 'النوع': 'زيوت عطرية', 'الأحجام المتاحة': '20 مل / 120 مل / 500 مل' },
    features: ['رائحة عود فاخرة', 'تركيبة مركزة', 'تدوم طويلاً'],
    image: '/images/oils/black-oud.png', categorySlug: 'fragrance-oils',
    isFlavor: true, hasSizeOptions: true, sizes: flavorSizes,
  },
  {
    id: 'rose-musk', name_ar: 'روز مسك', name_en: 'ROSE MUSK', type: 'زيوت عطرية',
    price: 14.9, basePrice: 14.9,
    shortDescription: 'مزيج رومانسي من الورود والمسك',
    fullDescription: 'زيوت عطرية بمزيج ساحر من الورود الطازجة والمسك الناعم.',
    specs: { 'النوع': 'زيوت عطرية', 'الأحجام المتاحة': '20 مل / 120 مل / 500 مل' },
    features: ['رائحة وردية رومانسية', 'مسك ناعم', 'مزيج متناغم'],
    image: '/images/oils/rose-musk.png', categorySlug: 'fragrance-oils',
    isFlavor: true, hasSizeOptions: true, sizes: flavorSizes,
  },
  {
    id: 'santal-vanilla', name_ar: 'سانتال فانيلا', name_en: 'SANTAL VANILLA', type: 'زيوت عطرية',
    price: 14.9, basePrice: 14.9,
    shortDescription: 'دفء الفانيليا مع خشبية السانتال',
    fullDescription: 'زيوت عطرية بمزيج دافئ من السانتال الكلاسيكي والفانيليا الكريمية.',
    specs: { 'النوع': 'زيوت عطرية', 'الأحجام المتاحة': '20 مل / 120 مل / 500 مل' },
    features: ['سانتال كلاسيكي', 'فانيليا كريمية', 'دفء مريح'],
    image: '/images/oils/santal-vanilla.png', categorySlug: 'fragrance-oils',
    isFlavor: true, hasSizeOptions: true, sizes: flavorSizes,
  },
  {
    id: 'ocean-breeze', name_ar: 'أوشن بريز', name_en: 'OCEAN BREEZE', type: 'زيوت عطرية',
    price: 14.9, basePrice: 14.9,
    shortDescription: 'انتعاش بحري منعش',
    fullDescription: 'زيوت عطرية بانتعاش المحيط والملح البحري.',
    specs: { 'النوع': 'زيوت عطرية', 'الأحجام المتاحة': '20 مل / 120 مل / 500 مل' },
    features: ['انتعاش بحري', 'رائحة محيطية', 'نضارة دائمة'],
    image: '/images/oils/ocean-breeze.png', categorySlug: 'fragrance-oils',
    isFlavor: true, hasSizeOptions: true, sizes: flavorSizes,
  },
  {
    id: 'night-oud', name_ar: 'نايت عود', name_en: 'NIGHT OUD', type: 'زيوت عطرية',
    price: 14.9, basePrice: 14.9,
    shortDescription: 'رائحة عود ليلية ساحرة',
    fullDescription: 'زيوت عطرية بلمسة عود ليلية ساحرة.',
    specs: { 'النوع': 'زيوت عطرية', 'الأحجام المتاحة': '20 مل / 120 مل / 500 مل' },
    features: ['رائحة عود ليلية', 'أجواء ساحرة', 'لمسة راقية'],
    image: '/images/oils/night-oud.png', categorySlug: 'fragrance-oils',
    isFlavor: true, hasSizeOptions: true, sizes: flavorSizes,
  },
  {
    id: 'amber-woods', name_ar: 'أمبر وودز', name_en: 'AMBER WOODS', type: 'زيوت عطرية',
    price: 14.9, basePrice: 14.9,
    shortDescription: 'خشبية دافئة مع العنبر',
    fullDescription: 'زيوت عطرية بمزيج دافئ من الأخشاب والعنبر الطبيعي.',
    specs: { 'النوع': 'زيوت عطرية', 'الأحجام المتاحة': '20 مل / 120 مل / 500 مل' },
    features: ['خشبية دافئة', 'عنبر طبيعي', 'دفء فاخر'],
    image: '/images/oils/amber-woods.png', categorySlug: 'fragrance-oils',
    isFlavor: true, hasSizeOptions: true, sizes: flavorSizes,
  },
  {
    id: 'oud-royal', name_ar: 'عود رويال', name_en: 'OUD ROYAL', type: 'زيوت عطرية',
    price: 14.9, basePrice: 14.9,
    shortDescription: 'عود ملكي فاخر',
    fullDescription: 'زيوت عطرية بتركيبة عود ملكية فاخرة.',
    specs: { 'النوع': 'زيوت عطرية', 'الأحجام المتاحة': '20 مل / 120 مل / 500 مل' },
    features: ['عود ملكي', 'تركيبة فاخرة', 'أجواء راقية'],
    image: '/images/oils/oud-royal.png', categorySlug: 'fragrance-oils',
    isFlavor: true, hasSizeOptions: true, sizes: flavorSizes,
  },
  {
    id: 'mystique', name_ar: 'ميستيك', name_en: 'MYSTIQUE', type: 'زيوت عطرية',
    price: 14.9, basePrice: 14.9,
    shortDescription: 'عبق ساحر وغامض',
    fullDescription: 'زيوت عطرية بعبق ساحر يلف المكان بأناقة.',
    specs: { 'النوع': 'زيوت عطرية', 'الأحجام المتاحة': '20 مل / 120 مل / 500 مل' },
    features: ['عبق ساحر', 'أناقة غامضة', 'رائحة فريدة'],
    image: '/images/oils/mystique.png', categorySlug: 'fragrance-oils',
    isFlavor: true, hasSizeOptions: true, sizes: flavorSizes,
  },
  {
    id: 'arabian-oud', name_ar: 'عربي عود', name_en: 'ARABIAN OUD', type: 'زيوت عطرية',
    price: 14.9, basePrice: 14.9,
    shortDescription: 'عراقة عربية أصيلة',
    fullDescription: 'زيوت عطرية بالنكهة العربية الأصيلة.',
    specs: { 'النوع': 'زيوت عطرية', 'الأحجام المتاحة': '20 مل / 120 مل / 500 مل' },
    features: ['عراقة عربية', 'نكهة أصيلة', 'تراث عطر'],
    image: '/images/oils/arabian-oud.png', categorySlug: 'fragrance-oils',
    isFlavor: true, hasSizeOptions: true, sizes: flavorSizes,
  },
  {
    id: 'white-musk', name_ar: 'وايت مسك', name_en: 'WHITE MUSK', type: 'زيوت عطرية',
    price: 14.9, basePrice: 14.9,
    shortDescription: 'نقاء المسك الأبيض',
    fullDescription: 'زيوت عطرية بنقاء المسك الأبيض.',
    specs: { 'النوع': 'زيوت عطرية', 'الأحجام المتاحة': '20 مل / 120 مل / 500 مل' },
    features: ['نقاء المسك', 'رائحة نظيفة', 'انتعاش دائم'],
    image: '/images/oils/white-musk.png', categorySlug: 'fragrance-oils',
    isFlavor: true, hasSizeOptions: true, sizes: flavorSizes,
  },
  {
    id: 'fresh-linen', name_ar: 'فريش لينن', name_en: 'FRESH LINEN', type: 'زيوت عطرية',
    price: 14.9, basePrice: 14.9,
    shortDescription: 'انتعاش الملابس النظيفة',
    fullDescription: 'زيوت عطرية بانتعاش الكتان الطازج.',
    specs: { 'النوع': 'زيوت عطرية', 'الأحجام المتاحة': '20 مل / 120 مل / 500 مل' },
    features: ['انتعاش الكتان', 'رائحة نظيفة', 'نضارة دائمة'],
    image: '/images/oils/fresh-linen.png', categorySlug: 'fragrance-oils',
    isFlavor: true, hasSizeOptions: true, sizes: flavorSizes,
  },
];

// Reed diffusers
const reedDiffusers: Product[] = [
  {
    id: 'amber-santal', name_ar: 'أمبر سانتال', name_en: 'AMBER SANTAL', type: 'معطر أعواد فاخر',
    price: 14.9,
    shortDescription: 'معطر أعواد فاخر برائحة دافئة وخشبية.',
    fullDescription: 'أمبر سانتال معطر أعواد بتصميم أنيق ورائحة دافئة وخشبية.',
    specs: { 'النوع': 'معطر أعواد', 'التشغيل': 'بدون كهرباء', 'مدة الاستخدام': 'أكثر من 60 يوم' },
    features: ['زجاجة أنيقة', 'أعواد طبيعية', 'رائحة دافئة'],
    image: '/images/reed/amber-santal.png', categorySlug: 'reed-diffusers',
  },
];

// Gift sets
const giftSets: Product[] = [
  {
    id: 'forest-reserve', name_ar: 'فورست ريزيرف', name_en: 'FOREST RESERVE', type: 'طقم هدايا عطري فاخر',
    price: 19.9,
    shortDescription: 'طقم هدايا عطري أنيق يجمع بين معطر أعواد وشمعة.',
    fullDescription: 'فورست ريزيرف طقم هدايا عطري فاخر مناسب للإهداء والمناسبات.',
    specs: { 'النوع': 'طقم هدايا', 'المحتويات': 'معطر أعواد + شمعة معطرة' },
    features: ['هدية فاخرة', 'جاهز للإهداء', 'تغليف أنيق'],
    image: '/images/gifts/forest-reserve.png', categorySlug: 'gift-sets',
  },
];

// Export
export const products: Product[] = [
  ...devices, ...oils, ...reedDiffusers, ...giftSets,
];

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter(p => p.categorySlug === categorySlug);
}

export function getCategoryInfo(categorySlug: string) {
  return categories.find(c => c.slug === categorySlug);
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function generateOrderNumber(): string {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `NAF-${year}${month}${day}-${random}`;
}

export function generateWhatsAppMessage(orderData: any): string {
  let message = `طلب جديد من موقع nafaes.Q8\n\n`;
  message += `بيانات العميل:\n`;
  message += `الاسم: ${orderData.customerName}\n`;
  message += `الهاتف: ${orderData.customerPhone}\n`;
  message += `المحافظة: ${orderData.governorate}\n`;
  message += `المنطقة: ${orderData.area}\n`;
  message += `العنوان: ${orderData.address}\n`;
  if (orderData.notes) message += `ملاحظات: ${orderData.notes}\n`;
  message += `\nالمنتجات:\n`;
  orderData.items.forEach((item: any, index: number) => {
    const sizeInfo = item.selectedSize ? ` (${item.selectedSize})` : '';
    message += `${index + 1}. ${item.productNameAr}${sizeInfo}\n`;
    message += `   الكمية: ${item.quantity}\n`;
    message += `   الإجمالي: ${item.totalPrice.toFixed(3)} د.ك\n\n`;
  });
  message += `ملخص الطلب:\n`;
  message += `المجموع الفرعي: ${orderData.subtotal.toFixed(3)} د.ك\n`;
  message += `رسوم التوصيل: ${orderData.deliveryFee.toFixed(3)} د.ك\n`;
  message += `الإجمالي النهائي: ${orderData.total.toFixed(3)} د.ك\n`;
  message += `طريقة الدفع: ${orderData.paymentMethod === 'cash' ? 'كاش عند الاستلام' : 'رابط دفع إلكتروني'}\n\n`;
  message += `يرجى تأكيد توفر الطلب.`;
  return encodeURIComponent(message);
}

export function formatPrice(price: number): string {
  return `${price.toFixed(3)} د.ك`;
}

export const deliveryFee = 2;
export const whatsappNumber = '96566377312';
export const whatsappLink = `https://wa.me/${whatsappNumber}`;

// Re-export from kuwait-areas
export { kuwaitGovernorates, getAreasByGovernorate, getAreaById } from './kuwait-areas';