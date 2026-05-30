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
  category: 'device' | 'flavor' | 'gift' | 'reed';
  parentDevice?: string;
  isFlavor?: boolean;
  flavorNotes?: string;
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
  area: string;
  address: string;
  notes: string;
  paymentMethod: 'cash' | 'link';
}

// Size options for fragrances
export interface SizeOption {
  size: string;
  ml: number;
  price: number;
}

// Available sizes for flavor products
export const flavorSizes: SizeOption[] = [
  { size: '20ml', ml: 20, price: 3.5 },
  { size: '120ml', ml: 120, price: 10.9 },
  { size: '500ml', ml: 500, price: 25 },
];

// All products organized by category
export const products: Product[] = [
  // ==================== SECTION 1: ELECTRICAL DEVICES (أجهزة كهربائية فاخرة) ====================
  {
    id: 'elan-nomad',
    name_ar: 'إيلان 360 نوماد',
    name_en: 'ELAN 360 NOMAD',
    type: 'جهاز تعطير ذكي قابل للشحن',
    price: 49,
    shortDescription: 'جهاز تعطير ذكي قابل للشحن يمنحك تجربة عطرية متنقلة وأنيقة.',
    fullDescription: 'إيلان 360 نوماد مصمم لمن يبحث عن الفخامة والراحة في جهاز واحد. يعمل ببطارية ليثيوم مدمجة، ويدعم الشحن Type-C، مع انتشار عطري 360° لتوزيع الرائحة بشكل متوازن.',
    specs: {
      'السعة': '120 مل',
      'نوع التشغيل': 'بطارية ليثيوم قابلة للشحن',
      'الشحن': 'Type-C',
      'الانتشار': '360°',
      'مستويات التحكم': '3 مستويات',
      'التحكم': 'Wi-Fi + Bluetooth',
      'التغطية': 'حتى 100 م²',
      'مستوى الصوت': 'أقل من 28 dB',
    },
    features: ['رفاهية متنقلة', 'تشغيل ذكي', 'تصميم فاخر', 'سهل الحمل', 'مناسب للاستخدام اليومي'],
    image: '/images/device-elan-nomad.png',
    category: 'device',
  },
  {
    id: 'elan-prime',
    name_ar: 'إيلان 360 برايم',
    name_en: 'ELAN 360 PRIME',
    type: 'جهاز تعطير كهربائي',
    price: 42,
    shortDescription: 'جهاز تعطير كهربائي ثابت بتصميم أنيق، مناسب للمنازل والمكاتب.',
    fullDescription: 'إيلان 360 برايم هو جهاز تعطير كهربائي يمنح المكان رائحة ثابتة ومنتظمة طوال اليوم.',
    specs: {
      'السعة': '120 مل',
      'نوع التشغيل': 'كهربائي مباشر',
      'الانتشار': '360°',
      'التحكم': 'Touch / Bluetooth / Remote',
      'مستوى الصوت': 'أقل من 34 dB',
      'التغطية': 'حتى 120 م²',
    },
    features: ['فخامة يومية', 'تشغيل ثابت', 'رائحة متوازنة', 'تصميم أنيق', 'مناسب للمنازل والمكاتب'],
    image: '/images/device-elan-prime.png',
    category: 'device',
  },
  {
    id: 'noir-majeste',
    name_ar: 'نوار ماجستيه',
    name_en: 'NOIR MAJESTÉ',
    type: 'جهاز تعطير احترافي بشاشة LCD',
    price: 59,
    shortDescription: 'جهاز تعطير احترافي للمساحات الراقية والكبيرة، مزود بشاشة LCD وتحكم ذكي.',
    fullDescription: 'نوار ماجستيه جهاز تعطير فاخر مناسب للمنازل الكبيرة، المكاتب، الصالونات، العيادات.',
    specs: {
      'السعة': '200 مل',
      'التغطية': '300–500m³',
      'مستوى الصوت': 'أقل من 40 dBA',
      'التحكم': 'Touch Buttons / Bluetooth',
      'الشاشة': 'LCD',
    },
    features: ['مناسب للمساحات الكبيرة', 'تصميم احترافي', 'تحكم ذكي', 'تشغيل هادئ'],
    image: '/images/device-noir-majeste.png',
    category: 'device',
  },

  // ==================== SECTION 2: FLAVOR OILS (زيوت عطرية) ====================
  {
    id: 'flavor-black-oud',
    name_ar: 'بلاك عود',
    name_en: 'BLACK OUD',
    type: 'زيوت عطرية',
    price: 3.5,
    basePrice: 3.5,
    shortDescription: 'رائحة عود فاخرة وعميقة',
    fullDescription: 'زيوت عطرية بتركيبة عود فاخرة تمنح أجواءً ملكية وفاخرة لأي مساحة.',
    specs: {
      'النوع': 'زيوت عطرية',
      'التركيز': 'عطر مركز',
      'الاستخدام': 'للأجهزة الكهربائية',
      'المدة': '4-6 أسابيع',
    },
    features: ['رائحة عود فاخرة', 'تركيبة مركزة', '持久耐用', 'مناسب للأجهزة'],
    image: '/images/flavor-black-oud.png',
    category: 'flavor',
    isFlavor: true,
    flavorNotes: 'رائحة عود فاخرة وعميقة',
    hasSizeOptions: true,
  },
  {
    id: 'flavor-rose-musk',
    name_ar: 'روز مسك',
    name_en: 'ROSE MUSK',
    type: 'زيوت عطرية',
    price: 3.5,
    basePrice: 3.5,
    shortDescription: 'مزيج رومانسي من الورود والمسك',
    fullDescription: 'زيوت عطرية بمزيج ساحر من الورود الطازجة والمسك الناعم.',
    specs: {
      'النوع': 'زيوت عطرية',
      'التركيز': 'عطر وردي',
      'الاستخدام': 'للأجهزة الكهربائية',
      'المدة': '4-6 أسابيع',
    },
    features: ['رائحة وردية رومانسية', 'مسك ناعم', 'مزيج متناغم', 'مناسب للأجهزة'],
    image: '/images/flavor-rose-musk.png',
    category: 'flavor',
    isFlavor: true,
    flavorNotes: 'مزيج رومانسي من الورود والمسك',
    hasSizeOptions: true,
  },
  {
    id: 'flavor-santal-vanilla',
    name_ar: 'سانتال فانيلا',
    name_en: 'SANTAL VANILLA',
    type: 'زيوت عطرية',
    price: 3.5,
    basePrice: 3.5,
    shortDescription: 'دفء الفانيليا مع خشبية السانتال',
    fullDescription: 'زيوت عطرية بمزيج دافئ من السانتال الكلاسيكي والفانيليا الكريمية.',
    specs: {
      'النوع': 'زيوت عطرية',
      'التركيز': 'عطر خشبي دافئ',
      'الاستخدام': 'للأجهزة الكهربائية',
      'المدة': '4-6 أسابيع',
    },
    features: ['سانتال كلاسيكي', 'فانيليا كريمية', 'دفء مريح', 'مناسب للأجهزة'],
    image: '/images/flavor-santal-vanilla.png',
    category: 'flavor',
    isFlavor: true,
    flavorNotes: 'دفء الفانيليا مع خشبية السانتال',
    hasSizeOptions: true,
  },
  {
    id: 'flavor-ocean-breeze',
    name_ar: 'أوشن بريدز',
    name_en: 'OCEAN BREEZE',
    type: 'زيوت عطرية',
    price: 3.5,
    basePrice: 3.5,
    shortDescription: 'انتعاش بحري منعش',
    fullDescription: 'زيوت عطرية بانتعاش المحيط والملح البحري لم أجواء منعشة.',
    specs: {
      'النوع': 'زيوت عطرية',
      'التركيز': 'عطر بحري',
      'الاستخدام': 'للأجهزة الكهربائية',
      'المدة': '4-6 أسابيع',
    },
    features: ['انتعاش بحري', 'رائحة محيطية', 'نضارة دائمة', 'مناسب للأجهزة'],
    image: '/images/flavor-ocean-breeze.png',
    category: 'flavor',
    isFlavor: true,
    flavorNotes: 'انتعاش بحري منعش',
    hasSizeOptions: true,
  },
  {
    id: 'flavor-night-oud',
    name_ar: 'نايت عود',
    name_en: 'NIGHT OUD',
    type: 'زيوت عطرية',
    price: 3.5,
    basePrice: 3.5,
    shortDescription: 'رائحة عود ليلي mystique',
    fullDescription: 'زيوت عطرية بلمسة عود ليلية ساحرة تخلق أجواء ساحرة.',
    specs: {
      'النوع': 'زيوت عطرية',
      'التركيز': 'عطر ليلي',
      'الاستخدام': 'للأجهزة الكهربائية',
      'المدة': '4-6 أسابيع',
    },
    features: ['رائحة عود ليلية', 'أجواء ساحرة', 'لمسة mystique', 'مناسب للأجهزة'],
    image: '/images/flavor-night-oud.png',
    category: 'flavor',
    isFlavor: true,
    flavorNotes: 'رائحة عود ليلي mystique',
    hasSizeOptions: true,
  },
  {
    id: 'flavor-amber-woods',
    name_ar: 'أمبر وودز',
    name_en: 'AMBER WOODS',
    type: 'زيوت عطرية',
    price: 3.5,
    basePrice: 3.5,
    shortDescription: 'خشبية دافئة مع العنبر',
    fullDescription: 'زيوت عطرية بمزيج دافئ من الأخشاب والعنبر الطبيعي.',
    specs: {
      'النوع': 'زيوت عطرية',
      'التركيز': 'عطر عنبري خشبي',
      'الاستخدام': 'للأجهزة الكهربائية',
      'المدة': '4-6 أسابيع',
    },
    features: ['خشبية دافئة', 'عنبر طبيعي', 'دفء فاخر', 'مناسب للأجهزة'],
    image: '/images/flavor-amber-woods.png',
    category: 'flavor',
    isFlavor: true,
    flavorNotes: 'خشبية دافئة مع العنبر',
    hasSizeOptions: true,
  },
  {
    id: 'flavor-oud-royal',
    name_ar: 'عود رويال',
    name_en: 'OUD ROYAL',
    type: 'زيوت عطرية',
    price: 3.5,
    basePrice: 3.5,
    shortDescription: 'عود ملكي فاخر',
    fullDescription: 'زيوت عطرية بتركيبة عود ملكية فاخرة للأجواء الراقية.',
    specs: {
      'النوع': 'زيوت عطرية',
      'التركيز': 'عطر ملكي',
      'الاستخدام': 'للأجهزة الكهربائية',
      'المدة': '4-6 أسابيع',
    },
    features: ['عود ملكي', 'تركيبة فاخرة', 'أجواء راقية', 'مناسب للأجهزة'],
    image: '/images/flavor-oud-royal.png',
    category: 'flavor',
    isFlavor: true,
    flavorNotes: 'عود ملكي فاخر',
    hasSizeOptions: true,
  },
  {
    id: 'flavor-arabian-oud',
    name_ar: 'عربي عود',
    name_en: 'ARABIAN OUD',
    type: 'زيوت عطرية',
    price: 3.5,
    basePrice: 3.5,
    shortDescription: 'عراقة عربية أصيلة',
    fullDescription: 'زيوت عطرية بالنكهة العربية الأصيلة من العود العربي.',
    specs: {
      'النوع': 'زيوت عطرية',
      'التركيز': 'عطر عربي أصيل',
      'الاستخدام': 'للأجهزة الكهربائية',
      'المدة': '4-6 أسابيع',
    },
    features: ['عراقة عربية', 'نكهة أصيلة', 'تراث عطر', 'مناسب للأجهزة'],
    image: '/images/flavor-arabian-oud.png',
    category: 'flavor',
    isFlavor: true,
    flavorNotes: 'عراقة عربية أصيلة',
    hasSizeOptions: true,
  },
  {
    id: 'flavor-white-musk',
    name_ar: 'وايت مسك',
    name_en: 'WHITE MUSK',
    type: 'زيوت عطرية',
    price: 3.5,
    basePrice: 3.5,
    shortDescription: 'نقاء المسك الأبيض',
    fullDescription: 'زيوت عطرية بنقاء المسك الأبيض لم أجواء نظيفة ومميزة.',
    specs: {
      'النوع': 'زيوت عطرية',
      'التركيز': 'عطر نقي',
      'الاستخدام': 'للأجهزة الكهربائية',
      'المدة': '4-6 أسابيع',
    },
    features: ['نقاء المسك', 'رائحة نظيفة', 'انتعاش دائم', 'مناسب للأجهزة'],
    image: '/images/flavor-white-musk.png',
    category: 'flavor',
    isFlavor: true,
    flavorNotes: 'نقاء المسك الأبيض',
    hasSizeOptions: true,
  },
  {
    id: 'flavor-fresh-linen',
    name_ar: 'فريش لينن',
    name_en: 'FRESH LINEN',
    type: 'زيوت عطرية',
    price: 3.5,
    basePrice: 3.5,
    shortDescription: 'انتعاش الملابس النظيفة',
    fullDescription: 'زيوت عطرية بانتعاش الكتان الطازج والملابس النظيفة.',
    specs: {
      'النوع': 'زيوت عطرية',
      'التركيز': 'عطر كتان',
      'الاستخدام': 'للأجهزة الكهربائية',
      'المدة': '4-6 أسابيع',
    },
    features: ['انتعاش الكتان', 'رائحة نظيفة', 'نضارة دائمة', 'مناسب للأجهزة'],
    image: '/images/flavor-fresh-linen.png',
    category: 'flavor',
    isFlavor: true,
    flavorNotes: 'انتعاش الملابس النظيفة',
    hasSizeOptions: true,
  },

  // ==================== SECTION 3: REED DIFFUSERS (معطرات أعواد) ====================
  {
    id: 'amber-santal',
    name_ar: 'أمبر سانتال',
    name_en: 'AMBER SANTAL',
    type: 'معطر أعواد فاخر',
    price: 10.9,
    shortDescription: 'معطر أعواد فاخر برائحة دافئة وخشبية، مناسب للديكور والهدايا.',
    fullDescription: 'أمبر سانتال معطر أعواد بتصميم أنيق ورائحة دافئة وخشبية.',
    specs: {
      'النوع': 'معطر أعواد',
      'الانتشار': 'أعواد خشبية',
      'مدة الاستخدام': 'أكثر من 60 يوم',
      'التغطية': '20–30 م²',
    },
    features: ['زجاجة أنيقة', 'أعواد طبيعية', 'رائحة دافئة وخشبية', 'تغليف فاخر'],
    image: '/images/amber-santal.png',
    category: 'reed',
  },
  {
    id: 'noir-oud-reed',
    name_ar: 'بلاك عود - معطر أعواد',
    name_en: 'BLACK OUD REED',
    type: 'معطر أعواد فاخر',
    price: 12.9,
    shortDescription: 'معطر أعواد برائحة عود فاخرة وعميقة.',
    fullDescription: 'معطر أعواد فاخر برائحة عود داكنة وعميقة تملأ المكان بأناقة.',
    specs: {
      'النوع': 'معطر أعواد',
      'الانتشار': 'أعواد خشبية',
      'مدة الاستخدام': '60-90 يوم',
      'التغطية': '25-35 م²',
    },
    features: ['عود فاخر', 'رائحة عميقة', 'أعواد طبيعية', 'تغليف فاخر'],
    image: '/images/reed-noir-oud.png',
    category: 'reed',
  },
  {
    id: 'rose-garden-reed',
    name_ar: 'روز جاردن - معطر أعواد',
    name_en: 'ROSE GARDEN REED',
    type: 'معطر أعواد وردي',
    price: 11.9,
    shortDescription: 'معطر أعواد برائحة ورود منعشة ورومانسية.',
    fullDescription: 'معطر أعواد برائحة ورود طازجة تمنح المكان أجواء رومانسية.',
    specs: {
      'النوع': 'معطر أعواد',
      'الانتشار': 'أعواد خشبية',
      'مدة الاستخدام': '60-90 يوم',
      'التغطية': '25-35 م²',
    },
    features: ['ورود طازجة', 'رائحة رومانسية', 'أعواد طبيعية', 'تغليف أنيق'],
    image: '/images/reed-rose-garden.png',
    category: 'reed',
  },

  // ==================== SECTION 4: GIFT SETS (أطقم هدايا) ====================
  {
    id: 'forest-reserve',
    name_ar: 'فورست ريزيرف',
    name_en: 'FOREST RESERVE',
    type: 'طقم هدايا عطري فاخر',
    price: 13.9,
    shortDescription: 'طقم هدايا عطري أنيق يجمع بين زجاجة معطر، شمعة معطرة، وأعواد خشبية.',
    fullDescription: 'فورست ريزيرف طقم هدايا عطري فاخر مناسب للإهداء والمناسبات.',
    specs: {
      'النوع': 'Gift Set',
      'الطابع العطري': 'خشبي / دافئ',
      'الاستخدام': 'هدية جاهزة وأنيقة',
    },
    features: ['هدية فاخرة', 'جاهز للإهداء', 'تغليف أنيق', 'رائحة خشبية دافئة'],
    image: '/images/forest-reserve.png',
    category: 'gift',
  },
  {
    id: 'luxury-gift-set',
    name_ar: 'طقم الهدايا الفاخر',
    name_en: 'LUXURY GIFT SET',
    type: 'طقم هدايا فاخر',
    price: 24.9,
    shortDescription: 'طقم هدايا فاخر يشمل جهاز تعطير صغير مع مجموعة زيوت عطرية.',
    fullDescription: 'طقم هدايا فاخر مثالي للمناسبات الخاصة، يشمل جهاز تعطير صغير مع 3 زيوت عطرية مميزة.',
    specs: {
      'النوع': 'Gift Set Premium',
      'المحتويات': 'جهاز + 3 زيوت عطرية',
      'الاستخدام': 'هدية فاخرة جاهزة',
    },
    features: ['هدية فاخرة', 'جهاز صغير', '3 زيوت عطرية', 'تغليف ذهبي'],
    image: '/images/luxury-gift-set.png',
    category: 'gift',
  },
  {
    id: 'starter-gift-set',
    name_ar: 'طقم البدء',
    name_en: 'STARTER GIFT SET',
    type: 'طقم هدايا للمبتدئين',
    price: 9.9,
    shortDescription: 'طقم هدايا مثالي للمبتدئين مع معطر أعواد صغير.',
    fullDescription: 'طقم هدايا بسيط وأنيق للمبتدئين في عالم التعطير.',
    specs: {
      'النوع': 'Gift Set Basic',
      'المحتويات': 'معطر أعواد صغير',
      'الاستخدام': 'هدية أنيقة',
    },
    features: ['هدية أنيقة', 'سهل الاستخدام', 'رائحة مميزة', 'تغليف جميل'],
    image: '/images/starter-gift-set.png',
    category: 'gift',
  },
];

// Flavor options for electrical devices
export const deviceFlavors = [
  { id: 'flavor-black-oud', name_ar: 'بلاك عود', name_en: 'BLACK OUD', basePrice: 3.5, image: '/images/flavor-black-oud.png', description: 'رائحة عود فاخرة وعميقة', sizes: flavorSizes },
  { id: 'flavor-rose-musk', name_ar: 'روز مسك', name_en: 'ROSE MUSK', basePrice: 3.5, image: '/images/flavor-rose-musk.png', description: 'مزيج رومانسي من الورود والمسك', sizes: flavorSizes },
  { id: 'flavor-santal-vanilla', name_ar: 'سانتال فانيلا', name_en: 'SANTAL VANILLA', basePrice: 3.5, image: '/images/flavor-santal-vanilla.png', description: 'دفء الفانيليا مع خشبية السانتال', sizes: flavorSizes },
  { id: 'flavor-ocean-breeze', name_ar: 'أوشن بريدز', name_en: 'OCEAN BREEZE', basePrice: 3.5, image: '/images/flavor-ocean-breeze.png', description: 'انتعاش بحري منعش', sizes: flavorSizes },
  { id: 'flavor-night-oud', name_ar: 'نايت عود', name_en: 'NIGHT OUD', basePrice: 3.5, image: '/images/flavor-night-oud.png', description: 'رائحة عود ليلي mystique', sizes: flavorSizes },
  { id: 'flavor-amber-woods', name_ar: 'أمبر وودز', name_en: 'AMBER WOODS', basePrice: 3.5, image: '/images/flavor-amber-woods.png', description: 'خشبية دافئة مع العنبر', sizes: flavorSizes },
  { id: 'flavor-oud-royal', name_ar: 'عود رويال', name_en: 'OUD ROYAL', basePrice: 3.5, image: '/images/flavor-oud-royal.png', description: 'عود ملكي فاخر', sizes: flavorSizes },
  { id: 'flavor-arabian-oud', name_ar: 'عربي عود', name_en: 'ARABIAN OUD', basePrice: 3.5, image: '/images/flavor-arabian-oud.png', description: 'عراقة عربية أصيلة', sizes: flavorSizes },
  { id: 'flavor-white-musk', name_ar: 'وايت مسك', name_en: 'WHITE MUSK', basePrice: 3.5, image: '/images/flavor-white-musk.png', description: 'نقاء المسك الأبيض', sizes: flavorSizes },
  { id: 'flavor-fresh-linen', name_ar: 'فريش لينن', name_en: 'FRESH LINEN', basePrice: 3.5, image: '/images/flavor-fresh-linen.png', description: 'انتعاش الملابس النظيفة', sizes: flavorSizes },
];

export const deliveryFee = 2;
export const whatsappNumber = '96566377312';
export const whatsappLink = `https://wa.me/${whatsappNumber}`;

// Kuwait Areas
export interface KuwaitArea {
  id: string;
  governorate: string;
  name: string;
  deliveryFee: number;
  estimatedDays: number;
}

export const kuwaitGovernorates = [
  { id: 'capital', name: 'العاصمة' },
  { id: 'ahmadi', name: 'الأحمدي' },
  { id: 'farwaniya', name: 'الفروانية' },
  { id: 'hawalli', name: 'حولي' },
  { id: 'mubarak', name: 'مبارك الكبير' },
  { id: 'jahra', name: 'الجهراء' },
];

export const kuwaitAreas: KuwaitArea[] = [
  { id: 'kout', name: 'الكوت', governorate: 'capital', deliveryFee: 2, estimatedDays: 1 },
  { id: 'daiya', name: 'الدية', governorate: 'capital', deliveryFee: 2, estimatedDays: 1 },
  { id: 'al-shamaliya', name: 'الشمالية', governorate: 'capital', deliveryFee: 2, estimatedDays: 1 },
  { id: 'al-asema', name: 'الأسسة', governorate: 'capital', deliveryFee: 2, estimatedDays: 1 },
  { id: 'al-khalifa', name: 'الخليفة', governorate: 'capital', deliveryFee: 2, estimatedDays: 1 },
  { id: 'al-qadisiya', name: 'القادسية', governorate: 'capital', deliveryFee: 2, estimatedDays: 1 },
  { id: 'al-salhiya', name: 'الصالحية', governorate: 'capital', deliveryFee: 2, estimatedDays: 1 },
  { id: 'al-rawda', name: 'الرابطة', governorate: 'capital', deliveryFee: 2, estimatedDays: 1 },
  { id: 'al-dasma', name: 'الدسمة', governorate: 'capital', deliveryFee: 2, estimatedDays: 1 },
  { id: 'al-nuzha', name: 'النزهة', governorate: 'capital', deliveryFee: 2, estimatedDays: 1 },
  { id: 'al-shaab', name: 'الشعب', governorate: 'capital', deliveryFee: 2, estimatedDays: 1 },
  { id: 'al-qibla', name: 'القبلة', governorate: 'capital', deliveryFee: 2, estimatedDays: 1 },
  { id: 'salmiya', name: 'السالمية', governorate: 'hawalli', deliveryFee: 2, estimatedDays: 1 },
  { id: 'hawalli', name: 'حولي', governorate: 'hawalli', deliveryFee: 2, estimatedDays: 1 },
  { id: 'jabriya', name: 'الجابرية', governorate: 'hawalli', deliveryFee: 2, estimatedDays: 1 },
  { id: 'bayan', name: 'بيان', governorate: 'hawalli', deliveryFee: 2, estimatedDays: 1 },
  { id: 'salwa', name: 'سلوى', governorate: 'hawalli', deliveryFee: 2, estimatedDays: 1 },
  { id: 'surra', name: 'السرة', governorate: 'hawalli', deliveryFee: 2, estimatedDays: 1 },
  { id: 'farwaniya-city', name: 'مدينة الفروانية', governorate: 'farwaniya', deliveryFee: 2, estimatedDays: 1 },
  { id: 'al-riggae', name: 'الرقة', governorate: 'farwaniya', deliveryFee: 2, estimatedDays: 1 },
  { id: 'ibn-sina', name: 'ابن سينا', governorate: 'farwaniya', deliveryFee: 2, estimatedDays: 1 },
  { id: 'ahmadi-city', name: 'مدينة الأحمدي', governorate: 'ahmadi', deliveryFee: 2, estimatedDays: 1 },
  { id: 'fintas', name: 'الفنطاس', governorate: 'ahmadi', deliveryFee: 2, estimatedDays: 1 },
  { id: 'mahboula', name: 'مهبول', governorate: 'ahmadi', deliveryFee: 2, estimatedDays: 1 },
  { id: 'al-mubarak', name: 'مبارك الكبير', governorate: 'mubarak', deliveryFee: 2, estimatedDays: 1 },
  { id: 'al-funaitees', name: 'الفنيطيس', governorate: 'mubarak', deliveryFee: 2, estimatedDays: 1 },
  { id: 'al-jahra-city', name: 'مدينة الجهراء', governorate: 'jahra', deliveryFee: 2, estimatedDays: 1 },
];

export function getAreasByGovernorate(governorateId: string): KuwaitArea[] {
  return kuwaitAreas.filter(area => area.governorate === governorateId);
}

export function getAreaById(areaId: string): KuwaitArea | undefined {
  return kuwaitAreas.find(area => area.id === areaId);
}

export function formatPrice(price: number): string {
  return `${price.toFixed(3)} د.ك`;
}

export function getSizePrice(flavorId: string, size: string): number {
  const flavor = deviceFlavors.find(f => f.id === flavorId);
  if (!flavor) return 0;
  const sizeOption = flavor.sizes.find(s => s.size === size);
  return sizeOption?.price || flavor.basePrice;
}

// Get products by category
export function getProductsByCategory(category: 'device' | 'flavor' | 'gift' | 'reed'): Product[] {
  return products.filter(p => p.category === category);
}

// Get device products
export function getDeviceProducts(): Product[] {
  return products.filter(p => p.category === 'device');
}

// Get flavor products
export function getFlavorProducts(): Product[] {
  return products.filter(p => p.category === 'flavor');
}

// Get gift products
export function getGiftProducts(): Product[] {
  return products.filter(p => p.category === 'gift');
}

// Get reed diffuser products
export function getReedProducts(): Product[] {
  return products.filter(p => p.category === 'reed');
}

// Get related flavors for a device
export function getFlavorsForDevice(deviceId: string): typeof deviceFlavors {
  return deviceFlavors;
}

export function generateWhatsAppMessage(
  cartItems: CartItem[], 
  customerData: Order & { governorate?: string }, 
  invoiceNumber: string
): string {
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const areaInfo = getAreaById(customerData.area);
  const deliveryFeeAmount = areaInfo?.deliveryFee || deliveryFee;
  const total = subtotal + deliveryFeeAmount;

  let message = `━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `    🏪 NAFAES | نفائس\n`;
  message += `   فاخور العطور الذكية 🕌\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  message += `📋 ═══ فاتورة ضريبية ═══ 📋\n\n`;
  message += `🔢 رقم الفاتورة: ${invoiceNumber}\n`;
  
  message += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `   👤 بيانات العميل\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  message += `👤 الاسم: ${customerData.name}\n`;
  message += `📞 الهاتف: +965 ${customerData.phone}\n`;
  message += `📍 المنطقة: ${areaInfo?.name || customerData.area}\n`;
  message += `🏠 العنوان: ${customerData.address}\n`;
  
  message += `\n━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `   🛒 تفاصيل المنتجات\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  
  cartItems.forEach((item, index) => {
    const itemTotal = item.product.price * item.quantity;
    let itemName = item.product.name_ar;
    if (item.selectedSize) {
      itemName += ` (${item.selectedSize})`;
    }
    message += `${index + 1}. ${itemName}\n`;
    message += `   ${item.product.name_en}\n`;
    message += `   الكمية: ${item.quantity} × ${formatPrice(item.product.price)}\n`;
    message += `   المجموع: ${formatPrice(itemTotal)}\n\n`;
  });
  
  message += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `   💰 ملخص الفاتورة\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  message += `📦 المجموع الفرعي: ${formatPrice(subtotal)}\n`;
  message += `🚚 رسوم التوصيل: ${formatPrice(deliveryFeeAmount)}\n`;
  message += `💵 الإجمالي النهائي: ${formatPrice(total)}\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  message += `💳 طريقة الدفع: ${customerData.paymentMethod === 'cash' ? 'كاش عند الاستلام 💵' : 'رابط دفع إلكتروني 🔗'}\n\n`;
  message += `شكراً لتعاملكم مع نفائس 🕌\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  
  return encodeURIComponent(message);
}