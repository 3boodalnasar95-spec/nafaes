export interface Product {
  id: string;
  name_ar: string;
  name_en: string;
  type: string;
  price: number;
  shortDescription: string;
  fullDescription: string;
  specs: Record<string, string>;
  features: string[];
  image: string;
  categorySlug: string;
  isFlavor?: boolean;
  hasSizeOptions?: boolean;
  basePrice?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export interface Order {
  name: string;
  phone: string;
  governorate: string;
  area: string;
  areaId: string;
  block: string;
  street: string;
  avenue?: string;
  house: string;
  floor?: string;
  apartment?: string;
  fullAddress: string;
  notes: string;
  paymentMethod: 'cash' | 'link';
}

// Size options for fragrances
export interface SizeOption {
  size: string;
  ml: number;
  price: number;
}

export const flavorSizes: SizeOption[] = [
  { size: '20ml', ml: 20, price: 3.5 },
  { size: '120ml', ml: 120, price: 10.9 },
  { size: '500ml', ml: 500, price: 25 },
];

// Categories configuration
export const categories = [
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

export const products: Product[] = [
  // ==================== SECTION 1: SMART AROMA DIFFUSERS (الأجهزة الكهربائية الفواحة) ====================
  {
    id: 'elan-nomad',
    name_ar: 'إيلان 360 نوماد',
    name_en: 'ELAN 360 NOMAD',
    type: 'جهاز تعطير ذكي قابل للشحن',
    price: 49,
    shortDescription: 'جهاز تعطير ذكي قابل للشحن يمنحك تجربة عطرية متنقلة وأنيقة.',
    fullDescription: 'إيلان 360 نوماد مصمم لمن يبحث عن الفخامة والراحة في جهاز واحد. يعمل ببطارية ليثيوم مدمجة، ويدعم الشحن Type-C، مع انتشار عطري 360° لتوزيع الرائحة بشكل متوازن. مناسب للمنزل، المكتب، الجلسات، والتنقل.',
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
    price: 42,
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
    price: 59,
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

  // ==================== SECTION 2: FRAGRANCE OILS (الزيوت العطرية) - 11 منتج ====================
  {
    id: 'flavor-black-oud',
    name_ar: 'بلاك عود',
    name_en: 'BLACK OUD',
    type: 'زيوت عطرية',
    price: 10.9,
    basePrice: 10.9,
    shortDescription: 'رائحة عود فاخرة وعميقة',
    fullDescription: 'زيوت عطرية بتركيبة عود فاخرة تمنح أجواءً ملكية وفاخرة لأي مساحة.',
    specs: {
      'النوع': 'زيوت عطرية',
      'الاستخدام': 'للأجهزة الكهربائية',
    },
    features: ['رائحة عود فاخرة', 'تركيبة مركزة', 'تدوم طويلاً', 'مناسب للأجهزة'],
    image: '/images/oils/black-oud.png',
    categorySlug: 'fragrance-oils',
    isFlavor: true,
    hasSizeOptions: true,
  },
  {
    id: 'flavor-rose-musk',
    name_ar: 'روز مسك',
    name_en: 'ROSE MUSK',
    type: 'زيوت عطرية',
    price: 10.9,
    basePrice: 10.9,
    shortDescription: 'مزيج رومانسي من الورود والمسك',
    fullDescription: 'زيوت عطرية بمزيج ساحر من الورود الطازجة والمسك الناعم.',
    specs: {
      'النوع': 'زيوت عطرية',
      'الاستخدام': 'للأجهزة الكهربائية',
    },
    features: ['رائحة وردية رومانسية', 'مسك ناعم', 'مزيج متناغم', 'مناسب للأجهزة'],
    image: '/images/oils/rose-musk.png',
    categorySlug: 'fragrance-oils',
    isFlavor: true,
    hasSizeOptions: true,
  },
  {
    id: 'flavor-santal-vanilla',
    name_ar: 'سانتال فانيلا',
    name_en: 'SANTAL VANILLA',
    type: 'زيوت عطرية',
    price: 10.9,
    basePrice: 10.9,
    shortDescription: 'دفء الفانيليا مع خشبية السانتال',
    fullDescription: 'زيوت عطرية بمزيج دافئ من السانتال الكلاسيكي والفانيليا الكريمية.',
    specs: {
      'النوع': 'زيوت عطرية',
      'الاستخدام': 'للأجهزة الكهربائية',
    },
    features: ['سانتال كلاسيكي', 'فانيليا كريمية', 'دفء مريح', 'مناسب للأجهزة'],
    image: '/images/oils/santal-vanilla.png',
    categorySlug: 'fragrance-oils',
    isFlavor: true,
    hasSizeOptions: true,
  },
  {
    id: 'flavor-ocean-breeze',
    name_ar: 'أوشن بريز',
    name_en: 'OCEAN BREEZE',
    type: 'زيوت عطرية',
    price: 10.9,
    basePrice: 10.9,
    shortDescription: 'انتعاش بحري منعش',
    fullDescription: 'زيوت عطرية بانتعاش المحيط والملح البحري لأجواء منعشة.',
    specs: {
      'النوع': 'زيوت عطرية',
      'الاستخدام': 'للأجهزة الكهربائية',
    },
    features: ['انتعاش بحري', 'رائحة محيطية', 'نضارة دائمة', 'مناسب للأجهزة'],
    image: '/images/oils/ocean-breeze.png',
    categorySlug: 'fragrance-oils',
    isFlavor: true,
    hasSizeOptions: true,
  },
  {
    id: 'flavor-night-oud',
    name_ar: 'نايت عود',
    name_en: 'NIGHT OUD',
    type: 'زيوت عطرية',
    price: 10.9,
    basePrice: 10.9,
    shortDescription: 'رائحة عود ليلية ساحرة',
    fullDescription: 'زيوت عطرية بلمسة عود ليلية ساحرة تخلق أجواء راقية.',
    specs: {
      'النوع': 'زيوت عطرية',
      'الاستخدام': 'للأجهزة الكهربائية',
    },
    features: ['رائحة عود ليلية', 'أجواء ساحرة', 'لمسة راقية', 'مناسب للأجهزة'],
    image: '/images/oils/night-oud.png',
    categorySlug: 'fragrance-oils',
    isFlavor: true,
    hasSizeOptions: true,
  },
  {
    id: 'flavor-amber-woods',
    name_ar: 'أمبر وودز',
    name_en: 'AMBER WOODS',
    type: 'زيوت عطرية',
    price: 10.9,
    basePrice: 10.9,
    shortDescription: 'خشبية دافئة مع العنبر',
    fullDescription: 'زيوت عطرية بمزيج دافئ من الأخشاب والعنبر الطبيعي.',
    specs: {
      'النوع': 'زيوت عطرية',
      'الاستخدام': 'للأجهزة الكهربائية',
    },
    features: ['خشبية دافئة', 'عنبر طبيعي', 'دفء فاخر', 'مناسب للأجهزة'],
    image: '/images/oils/amber-woods.png',
    categorySlug: 'fragrance-oils',
    isFlavor: true,
    hasSizeOptions: true,
  },
  {
    id: 'flavor-oud-royal',
    name_ar: 'عود رويال',
    name_en: 'OUD ROYAL',
    type: 'زيوت عطرية',
    price: 10.9,
    basePrice: 10.9,
    shortDescription: 'عود ملكي فاخر',
    fullDescription: 'زيوت عطرية بتركيبة عود ملكية فاخرة للأجواء الراقية.',
    specs: {
      'النوع': 'زيوت عطرية',
      'الاستخدام': 'للأجهزة الكهربائية',
    },
    features: ['عود ملكي', 'تركيبة فاخرة', 'أجواء راقية', 'مناسب للأجهزة'],
    image: '/images/oils/oud-royal.png',
    categorySlug: 'fragrance-oils',
    isFlavor: true,
    hasSizeOptions: true,
  },
  {
    id: 'flavor-arabian-oud',
    name_ar: 'عربي عود',
    name_en: 'ARABIAN OUD',
    type: 'زيوت عطرية',
    price: 10.9,
    basePrice: 10.9,
    shortDescription: 'عراقة عربية أصيلة',
    fullDescription: 'زيوت عطرية بالنكهة العربية الأصيلة من العود العربي.',
    specs: {
      'النوع': 'زيوت عطرية',
      'الاستخدام': 'للأجهزة الكهربائية',
    },
    features: ['عراقة عربية', 'نكهة أصيلة', 'تراث عطر', 'مناسب للأجهزة'],
    image: '/images/oils/arabian-oud.png',
    categorySlug: 'fragrance-oils',
    isFlavor: true,
    hasSizeOptions: true,
  },
  {
    id: 'flavor-mystique',
    name_ar: 'ميستيك',
    name_en: 'MYSTIQUE',
    type: 'زيوت عطرية',
    price: 10.9,
    basePrice: 10.9,
    shortDescription: 'عبق ساحر وغامض',
    fullDescription: 'زيوت عطرية بعبق ساحر يلف المكان بأناقة وغموض.',
    specs: {
      'النوع': 'زيوت عطرية',
      'الاستخدام': 'للأجهزة الكهربائية',
    },
    features: ['عبق ساحر', 'أناقة غامضة', 'رائحة فريدة', 'مناسب للأجهزة'],
    image: '/images/oils/mystique.png',
    categorySlug: 'fragrance-oils',
    isFlavor: true,
    hasSizeOptions: true,
  },
  {
    id: 'flavor-white-musk',
    name_ar: 'وايت مسك',
    name_en: 'WHITE MUSK',
    type: 'زيوت عطرية',
    price: 10.9,
    basePrice: 10.9,
    shortDescription: 'نقاء المسك الأبيض',
    fullDescription: 'زيوت عطرية بنقاء المسك الأبيض لأجواء نظيفة ومميزة.',
    specs: {
      'النوع': 'زيوت عطرية',
      'الاستخدام': 'للأجهزة الكهربائية',
    },
    features: ['نقاء المسك', 'رائحة نظيفة', 'انتعاش دائم', 'مناسب للأجهزة'],
    image: '/images/oils/white-musk.png',
    categorySlug: 'fragrance-oils',
    isFlavor: true,
    hasSizeOptions: true,
  },
  {
    id: 'flavor-fresh-linen',
    name_ar: 'فريش لينن',
    name_en: 'FRESH LINEN',
    type: 'زيوت عطرية',
    price: 10.9,
    basePrice: 10.9,
    shortDescription: 'انتعاش الملابس النظيفة',
    fullDescription: 'زيوت عطرية بانتعاش الكتان الطازج والملابس النظيفة.',
    specs: {
      'النوع': 'زيوت عطرية',
      'الاستخدام': 'للأجهزة الكهربائية',
    },
    features: ['انتعاش الكتان', 'رائحة نظيفة', 'نضارة دائمة', 'مناسب للأجهزة'],
    image: '/images/oils/fresh-linen.png',
    categorySlug: 'fragrance-oils',
    isFlavor: true,
    hasSizeOptions: true,
  },

  // ==================== SECTION 3: REED DIFFUSERS (الفواحات العطرية) ====================
  {
    id: 'amber-santal',
    name_ar: 'أمبر سانتال',
    name_en: 'AMBER SANTAL',
    type: 'معطر أعواد فاخر',
    price: 10.9,
    shortDescription: 'معطر أعواد فاخر برائحة دافئة وخشبية، مناسب للديكور والهدايا.',
    fullDescription: 'أمبر سانتال معطر أعواد بتصميم أنيق ورائحة دافئة وخشبية تمنح المكان إحساسًا فاخرًا وهادئًا. لا يحتاج إلى كهرباء أو بطاريات، فقط ضع الأعواد داخل الزجاجة واترك الرائحة تنتشر تدريجيًا.',
    specs: {
      'النوع': 'معطر أعواد',
      'طريقة الانتشار': 'أعواد خشبية',
      'التشغيل': 'بدون كهرباء',
      'الطابع العطري': 'دافئ وخشبي',
      'مدة الاستخدام': 'أكثر من 60 يوم',
      'التغطية': '20–30 م²',
    },
    features: ['زجاجة أنيقة', 'أعواد طبيعية', 'رائحة دافئة وخشبية', 'تغليف فاخر', 'يناسب الديكور'],
    image: '/images/reed/amber-santal.png',
    categorySlug: 'reed-diffusers',
  },

  // ==================== SECTION 4: GIFT SETS (طقم الهدايا) ====================
  {
    id: 'forest-reserve',
    name_ar: 'فورست ريزيرف',
    name_en: 'FOREST RESERVE',
    type: 'طقم هدايا عطري فاخر',
    price: 13.9,
    shortDescription: 'طقم هدايا عطري أنيق يجمع بين زجاجة معطر، شمعة معطرة، وأعواد خشبية.',
    fullDescription: 'فورست ريزيرف طقم هدايا عطري فاخر مناسب للإهداء والمناسبات. يجمع بين معطر الأعوا وScented Candle مع تغليف أنيق جاهز للتقديم. يمنح المكان رائحة خشبية دافئة ولمسة ديكورية راقية.',
    specs: {
      'النوع': 'طقم هدايا',
      'الطابع العطري': 'خشبي / دافئ',
      'المحتويات': 'معطر أعواد + شمعة معطرة + أعواد خشبية',
      'التشغيل': 'بدون كهرباء',
    },
    features: ['هدية فاخرة', 'جاهز للإهداء', 'تغليف أنيق', 'رائحة خشبية دافئة', 'مناسب للمناسبات'],
    image: '/images/gifts/forest-reserve.png',
    categorySlug: 'gift-sets',
  },
];

// Flavor options for electrical devices
export const deviceFlavors = products.filter(p => p.categorySlug === 'fragrance-oils').map(flavor => ({
  id: flavor.id,
  name_ar: flavor.name_ar,
  name_en: flavor.name_en,
  basePrice: flavor.basePrice || flavor.price,
  image: flavor.image,
  description: flavor.shortDescription,
  sizes: flavorSizes,
}));

export const deliveryFee = 2;
export const whatsappNumber = '96566377312';
export const whatsappLink = `https://wa.me/${whatsappNumber}`;

// Kuwait Areas
export interface KuwaitArea {
  id: string;
  governorate: string;
  governorate_ar: string;
  name: string;
  deliveryFee: number;
  estimatedDays: number;
}

export const kuwaitGovernorates = [
  { id: 'capital', name: 'العاصمة', name_ar: 'محافظة العاصمة' },
  { id: 'hawalli', name: 'Hawalli', name_ar: 'محافظة حولي' },
  { id: 'farwaniya', name: 'Farwaniya', name_ar: 'محافظة الفروانية' },
  { id: 'mubarak', name: 'Mubarak Al-Kabir', name_ar: 'محافظة مبارك الكبير' },
  { id: 'ahmadi', name: 'Ahmadi', name_ar: 'محافظة الأحمدي' },
  { id: 'jahra', name: 'Jahra', name_ar: 'محافظة الجهراء' },
];

export const kuwaitAreas: KuwaitArea[] = [
  // محافظة العاصمة
  { id: 'city', governorate: 'capital', governorate_ar: 'محافظة العاصمة', name: 'مدينة الكويت', deliveryFee: 2, estimatedDays: 1 },
  { id: 'sharq', governorate: 'capital', governorate_ar: 'محافظة العاصمة', name: 'شرق', deliveryFee: 2, estimatedDays: 1 },
  { id: 'qibla', governorate: 'capital', governorate_ar: 'محافظة العاصمة', name: 'القبلة', deliveryFee: 2, estimatedDays: 1 },
  { id: 'murgab', governorate: 'capital', governorate_ar: 'محافظة العاصمة', name: 'المرقاب', deliveryFee: 2, estimatedDays: 1 },
  { id: 'dasman', governorate: 'capital', governorate_ar: 'محافظة العاصمة', name: 'دسمان', deliveryFee: 2, estimatedDays: 1 },
  { id: 'salhiya', governorate: 'capital', governorate_ar: 'محافظة العاصمة', name: 'الصالحية', deliveryFee: 2, estimatedDays: 1 },
  { id: 'sawaber', governorate: 'capital', governorate_ar: 'محافظة العاصمة', name: 'الصوابر', deliveryFee: 2, estimatedDays: 1 },
  { id: 'dasma', governorate: 'capital', governorate_ar: 'محافظة العاصمة', name: 'الدسمة', deliveryFee: 2, estimatedDays: 1 },
  { id: 'addiyeh', governorate: 'capital', governorate_ar: 'محافظة العاصمة', name: 'الدعية', deliveryFee: 2, estimatedDays: 1 },
  { id: 'mansouriya', governorate: 'capital', governorate_ar: 'محافظة العاصمة', name: 'المنصورية', deliveryFee: 2, estimatedDays: 1 },
  { id: 'abdullah-salam', governorate: 'capital', governorate_ar: 'محافظة العاصمة', name: 'ضاحية عبدالله السالم', deliveryFee: 2, estimatedDays: 1 },
  { id: 'nuzha', governorate: 'capital', governorate_ar: 'محافظة العاصمة', name: 'النزهة', deliveryFee: 2, estimatedDays: 1 },
  { id: 'adaliya', governorate: 'capital', governorate_ar: 'محافظة العاصمة', name: 'العدلية', deliveryFee: 2, estimatedDays: 1 },
  { id: 'khaldiya', governorate: 'capital', governorate_ar: 'محافظة العاصمة', name: 'الخالدية', deliveryFee: 2, estimatedDays: 1 },
  { id: 'keifan', governorate: 'capital', governorate_ar: 'محافظة العاصمة', name: 'كيفان', deliveryFee: 2, estimatedDays: 1 },
  { id: 'shamiya', governorate: 'capital', governorate_ar: 'محافظة العاصمة', name: 'الشامية', deliveryFee: 2, estimatedDays: 1 },
  { id: 'qadisiya', governorate: 'capital', governorate_ar: 'محافظة العاصمة', name: 'القادسية', deliveryFee: 2, estimatedDays: 1 },
  { id: 'rawda', governorate: 'capital', governorate_ar: 'محافظة العاصمة', name: 'الروضة', deliveryFee: 2, estimatedDays: 1 },
  { id: 'faiha', governorate: 'capital', governorate_ar: 'محافظة العاصمة', name: 'الفيحاء', deliveryFee: 2, estimatedDays: 1 },
  { id: 'qudra', governorate: 'capital', governorate_ar: 'محافظة العاصمة', name: 'قرطبة', deliveryFee: 2, estimatedDays: 1 },
  { id: 'yarmouk', governorate: 'capital', governorate_ar: 'محافظة العاصمة', name: 'اليرموك', deliveryFee: 2, estimatedDays: 1 },
  { id: 'surra', governorate: 'capital', governorate_ar: 'محافظة العاصمة', name: 'السرة', deliveryFee: 2, estimatedDays: 1 },
  { id: 'sulaibikhat', governorate: 'capital', governorate_ar: 'محافظة العاصمة', name: 'الصليبيخات', deliveryFee: 2.5, estimatedDays: 1 },
  { id: 'nahda', governorate: 'capital', governorate_ar: 'محافظة العاصمة', name: 'النهضة', deliveryFee: 2.5, estimatedDays: 1 },
  { id: 'granada', governorate: 'capital', governorate_ar: 'محافظة العاصمة', name: 'غرناطة', deliveryFee: 2.5, estimatedDays: 1 },
  { id: 'doha', governorate: 'capital', governorate_ar: 'محافظة العاصمة', name: 'الدوحة', deliveryFee: 2.5, estimatedDays: 1 },
  { id: 'qirwan', governorate: 'capital', governorate_ar: 'محافظة العاصمة', name: 'القيروان / سدرة', deliveryFee: 2.5, estimatedDays: 1 },
  { id: 'bnied-al-qar', governorate: 'capital', governorate_ar: 'محافظة العاصمة', name: 'بنيد القار', deliveryFee: 2, estimatedDays: 1 },

  // محافظة حولي
  { id: 'hawalli-city', governorate: 'hawalli', governorate_ar: 'محافظة حولي', name: 'حولي', deliveryFee: 2, estimatedDays: 1 },
  { id: 'salmiya', governorate: 'hawalli', governorate_ar: 'محافظة حولي', name: 'السالمية', deliveryFee: 2, estimatedDays: 1 },
  { id: 'jabriya', governorate: 'hawalli', governorate_ar: 'محافظة حولي', name: 'الجابرية', deliveryFee: 2, estimatedDays: 1 },
  { id: 'rumithiyeh', governorate: 'hawalli', governorate_ar: 'محافظة حولي', name: 'الرميثية', deliveryFee: 2, estimatedDays: 1 },
  { id: 'bida', governorate: 'hawalli', governorate_ar: 'محافظة حولي', name: 'البدع', deliveryFee: 2, estimatedDays: 1 },
  { id: 'bayan', governorate: 'hawalli', governorate_ar: 'محافظة حولي', name: 'بيان', deliveryFee: 2, estimatedDays: 1 },
  { id: 'mushref', governorate: 'hawalli', governorate_ar: 'محافظة حولي', name: 'مشرف', deliveryFee: 2, estimatedDays: 1 },
  { id: 'mubarak-west-mushref', governorate: 'hawalli', governorate_ar: 'محافظة حولي', name: 'ضاحية مبارك العبدالله / غرب مشرف', deliveryFee: 2, estimatedDays: 1 },
  { id: 'salwa', governorate: 'hawalli', governorate_ar: 'محافظة حولي', name: 'سلوى', deliveryFee: 2, estimatedDays: 1 },
  { id: 'shaab', governorate: 'hawalli', governorate_ar: 'محافظة حولي', name: 'الشعب', deliveryFee: 2, estimatedDays: 1 },
  { id: 'salam', governorate: 'hawalli', governorate_ar: 'محافظة حولي', name: 'السلام', deliveryFee: 2, estimatedDays: 1 },
  { id: 'hatin', governorate: 'hawalli', governorate_ar: 'محافظة حولي', name: 'حطين', deliveryFee: 2, estimatedDays: 1 },
  { id: 'shuhada', governorate: 'hawalli', governorate_ar: 'محافظة حولي', name: 'الشهداء', deliveryFee: 2, estimatedDays: 1 },
  { id: 'sadeeq', governorate: 'hawalli', governorate_ar: 'محافظة حولي', name: 'الصديق', deliveryFee: 2, estimatedDays: 1 },
  { id: 'zahra', governorate: 'hawalli', governorate_ar: 'محافظة حولي', name: 'الزهراء', deliveryFee: 2, estimatedDays: 1 },

  // محافظة الفروانية
  { id: 'farwaniya-city', governorate: 'farwaniya', governorate_ar: 'محافظة الفروانية', name: 'الفروانية', deliveryFee: 2, estimatedDays: 1 },
  { id: 'khaitan', governorate: 'farwaniya', governorate_ar: 'محافظة الفروانية', name: 'خيطان', deliveryFee: 2, estimatedDays: 1 },
  { id: 'abraq-khitan', governorate: 'farwaniya', governorate_ar: 'محافظة الفروانية', name: 'أبرق خيطان', deliveryFee: 2, estimatedDays: 1 },
  { id: 'andalus', governorate: 'farwaniya', governorate_ar: 'محافظة الفروانية', name: 'الأندلس', deliveryFee: 2, estimatedDays: 1 },
  { id: 'ashabija', governorate: 'farwaniya', governorate_ar: 'محافظة الفروانية', name: 'أشبيلية', deliveryFee: 2, estimatedDays: 1 },
  { id: 'omariya', governorate: 'farwaniya', governorate_ar: 'محافظة الفروانية', name: 'العمرية', deliveryFee: 2, estimatedDays: 1 },
  { id: 'rahab', governorate: 'farwaniya', governorate_ar: 'محافظة الفروانية', name: 'الرابية', deliveryFee: 2, estimatedDays: 1 },
  { id: 'rihab', governorate: 'farwaniya', governorate_ar: 'محافظة الفروانية', name: 'الرحاب', deliveryFee: 2, estimatedDays: 1 },
  { id: 'fardous', governorate: 'farwaniya', governorate_ar: 'محافظة الفروانية', name: 'الفردوس', deliveryFee: 2, estimatedDays: 1 },
  { id: 'riggae', governorate: 'farwaniya', governorate_ar: 'محافظة الفروانية', name: 'الرقعي', deliveryFee: 2, estimatedDays: 1 },
  { id: 'jleeb-shuyoukh', governorate: 'farwaniya', governorate_ar: 'محافظة الفروانية', name: 'جليب الشيوخ', deliveryFee: 2.5, estimatedDays: 1 },
  { id: 'sabah-al-nasser', governorate: 'farwaniya', governorate_ar: 'محافظة الفروانية', name: 'ضاحية صباح الناصر', deliveryFee: 2.5, estimatedDays: 1 },
  { id: 'abdullah-al-mubarak', governorate: 'farwaniya', governorate_ar: 'محافظة الفروانية', name: 'ضاحية عبدالله المبارك', deliveryFee: 2.5, estimatedDays: 1 },
  { id: 'west-abdullah-mubarak', governorate: 'farwaniya', governorate_ar: 'محافظة الفروانية', name: 'غرب عبدالله المبارك / الريان', deliveryFee: 2.5, estimatedDays: 1 },
  { id: 'south-abdullah-mubarak', governorate: 'farwaniya', governorate_ar: 'محافظة الفروانية', name: 'جنوب عبدالله المبارك / السور', deliveryFee: 2.5, estimatedDays: 1 },
  { id: 'ardiya', governorate: 'farwaniya', governorate_ar: 'محافظة الفروانية', name: 'العارضية', deliveryFee: 2.5, estimatedDays: 1 },

  // محافظة مبارك الكبير
  { id: 'sabah-al-salem-mubarak', governorate: 'mubarak', governorate_ar: 'محافظة مبارك الكبير', name: 'صباح السالم', deliveryFee: 2.5, estimatedDays: 1 },
  { id: 'adan', governorate: 'mubarak', governorate_ar: 'محافظة مبارك الكبير', name: 'العدان', deliveryFee: 2.5, estimatedDays: 1 },
  { id: 'qours', governorate: 'mubarak', governorate_ar: 'محافظة مبارك الكبير', name: 'القصور', deliveryFee: 2.5, estimatedDays: 1 },
  { id: 'mubarak-city', governorate: 'mubarak', governorate_ar: 'محافظة مبارك الكبير', name: 'مبارك الكبير', deliveryFee: 2.5, estimatedDays: 1 },
  { id: 'funitees', governorate: 'mubarak', governorate_ar: 'محافظة مبارك الكبير', name: 'الفنيطيس', deliveryFee: 2.5, estimatedDays: 1 },
  { id: 'abu-futaira', governorate: 'mubarak', governorate_ar: 'محافظة مبارك الكبير', name: 'أبو فطيرة', deliveryFee: 2.5, estimatedDays: 1 },
  { id: 'masayel', governorate: 'mubarak', governorate_ar: 'محافظة مبارك الكبير', name: 'المسايل', deliveryFee: 3, estimatedDays: 2 },
  { id: 'sobhan', governorate: 'mubarak', governorate_ar: 'محافظة مبارك الكبير', name: 'صبحان', deliveryFee: 3, estimatedDays: 2 },

  // محافظة الأحمدي
  { id: 'ahmadi-city', governorate: 'ahmadi', governorate_ar: 'محافظة الأحمدي', name: 'الأحمدي', deliveryFee: 3, estimatedDays: 2 },
  { id: 'fintas', governorate: 'ahmadi', governorate_ar: 'محافظة الأحمدي', name: 'الفنطاس', deliveryFee: 3, estimatedDays: 1 },
  { id: 'mahboula', governorate: 'ahmadi', governorate_ar: 'محافظة الأحمدي', name: 'المهبولة', deliveryFee: 3, estimatedDays: 1 },
  { id: 'abu-halifa', governorate: 'ahmadi', governorate_ar: 'محافظة الأحمدي', name: 'أبو حليفة', deliveryFee: 3, estimatedDays: 1 },
  { id: 'mangaf', governorate: 'ahmadi', governorate_ar: 'محافظة الأحمدي', name: 'المنقف', deliveryFee: 3, estimatedDays: 1 },
  { id: 'fahaheel', governorate: 'ahmadi', governorate_ar: 'محافظة الأحمدي', name: 'الفحيحيل', deliveryFee: 3, estimatedDays: 1 },
  { id: 'sabahia', governorate: 'ahmadi', governorate_ar: 'محافظة الأحمدي', name: 'الصباحية', deliveryFee: 3, estimatedDays: 1 },
  { id: 'ugaila', governorate: 'ahmadi', governorate_ar: 'محافظة الأحمدي', name: 'العقيلة', deliveryFee: 3, estimatedDays: 1 },
  { id: 'wafra', governorate: 'ahmadi', governorate_ar: 'محافظة الأحمدي', name: 'الوفرة', deliveryFee: 4, estimatedDays: 2 },
  { id: 'jaber-al-ali', governorate: 'ahmadi', governorate_ar: 'محافظة الأحمدي', name: 'ضاحية جابر العلي', deliveryFee: 3, estimatedDays: 1 },
  { id: 'fahad-al-ahmad', governorate: 'ahmadi', governorate_ar: 'محافظة الأحمدي', name: 'ضاحية فهد الأحمد', deliveryFee: 3.5, estimatedDays: 2 },
  { id: 'sabah-al-ahmad-city', governorate: 'ahmadi', governorate_ar: 'محافظة الأحمدي', name: 'مدينة صباح الأحمد', deliveryFee: 4, estimatedDays: 2 },
  { id: 'khairan', governorate: 'ahmadi', governorate_ar: 'محافظة الأحمدي', name: 'الخيران', deliveryFee: 4, estimatedDays: 2 },

  // محافظة الجهراء
  { id: 'jahra-city', governorate: 'jahra', governorate_ar: 'محافظة الجهراء', name: 'الجهراء', deliveryFee: 3, estimatedDays: 2 },
  { id: 'jahra-old', governorate: 'jahra', governorate_ar: 'محافظة الجهراء', name: 'الجهراء القديمة', deliveryFee: 3, estimatedDays: 2 },
  { id: 'saad-abdullah', governorate: 'jahra', governorate_ar: 'محافظة الجهراء', name: 'مدينة سعد العبدالله', deliveryFee: 3, estimatedDays: 2 },
  { id: 'neim', governorate: 'jahra', governorate_ar: 'محافظة الجهراء', name: 'النعيم', deliveryFee: 3, estimatedDays: 2 },
  { id: 'qasr', governorate: 'jahra', governorate_ar: 'محافظة الجهراء', name: 'القصر', deliveryFee: 3, estimatedDays: 2 },
  { id: 'wahah', governorate: 'jahra', governorate_ar: 'محافظة الجهراء', name: 'الواحة', deliveryFee: 3, estimatedDays: 2 },
  { id: 'taima', governorate: 'jahra', governorate_ar: 'محافظة الجهراء', name: 'تيماء', deliveryFee: 3.5, estimatedDays: 2 },
  { id: 'naseem', governorate: 'jahra', governorate_ar: 'محافظة الجهراء', name: 'النسيم', deliveryFee: 3.5, estimatedDays: 2 },
  { id: 'ain', governorate: 'jahra', governorate_ar: 'محافظة الجهراء', name: 'العيون', deliveryFee: 3.5, estimatedDays: 2 },
  { id: 'sleeb', governorate: 'jahra', governorate_ar: 'محافظة الجهراء', name: 'الصليبية', deliveryFee: 4, estimatedDays: 2 },
  { id: 'amghara', governorate: 'jahra', governorate_ar: 'محافظة الجهراء', name: 'أمغرة', deliveryFee: 3.5, estimatedDays: 2 },
  { id: 'kabd', governorate: 'jahra', governorate_ar: 'محافظة الجهراء', name: 'كبد', deliveryFee: 4, estimatedDays: 2 },
  { id: 'nawaf-al-ahmad', governorate: 'jahra', governorate_ar: 'محافظة الجهراء', name: 'مدينة نواف الأحمد', deliveryFee: 4, estimatedDays: 2 },
];

export function getAreasByGovernorate(governorateId: string): KuwaitArea[] {
  return kuwaitAreas.filter(area => area.governorate === governorateId);
}

export function getAreaById(areaId: string): KuwaitArea | undefined {
  return kuwaitAreas.find(area => area.id === areaId);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter(p => p.categorySlug === categorySlug);
}

export function getCategoryInfo(categorySlug: string) {
  return categories.find(c => c.slug === categorySlug);
}

export function formatPrice(price: number): string {
  return `${price.toFixed(3)} د.ك`;
}

export function generateOrderNumber(): string {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `NAF-${year}${month}${day}-${random}`;
}

export function generateWhatsAppMessage(
  orderData: {
    orderNumber: string;
    customerName: string;
    customerPhone: string;
    governorate: string;
    area: string;
    fullAddress: string;
    notes: string;
    paymentMethod: 'cash' | 'link';
    items: { name_ar: string; name_en: string; quantity: number; price: number }[];
    subtotal: number;
    deliveryFee: number;
    total: number;
  }
): string {
  let message = `طلب جديد من موقع nafaes.Q8\n\n`;
  message += `بيانات العميل:\n`;
  message += `الاسم: ${orderData.customerName}\n`;
  message += `الهاتف: ${orderData.customerPhone}\n`;
  message += `المحافظة: ${orderData.governorate}\n`;
  message += `المنطقة: ${orderData.area}\n`;
  message += `العنوان: ${orderData.fullAddress}\n`;
  if (orderData.notes) {
    message += `ملاحظات: ${orderData.notes}\n`;
  }
  message += `\nالمنتجات:\n`;
  orderData.items.forEach((item, index) => {
    message += `${index + 1}. ${item.name_ar} / ${item.name_en}\n`;
    message += `   الكمية: ${item.quantity}\n`;
    message += `   سعر الوحدة: ${formatPrice(item.price)}\n`;
    message += `   الإجمالي: ${formatPrice(item.price * item.quantity)}\n\n`;
  });
  message += `ملخص الطلب:\n`;
  message += `المجموع الفرعي: ${formatPrice(orderData.subtotal)}\n`;
  message += `رسوم التوصيل: ${formatPrice(orderData.deliveryFee)}\n`;
  message += `الإجمالي النهائي: ${formatPrice(orderData.total)}\n\n`;
  message += `طريقة الدفع: ${orderData.paymentMethod === 'cash' ? 'كاش عند الاستلام' : 'رابط دفع إلكتروني'}\n\n`;
  message += `يرجى تأكيد توفر الطلب وإرسال تفاصيل الدفع إن لزم.`;
  return encodeURIComponent(message);
}