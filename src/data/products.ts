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
  category: 'device' | 'flavor' | 'gift';
  parentDevice?: string;
  isFlavor?: boolean;
  flavorNotes?: string;
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

// Flavor options for electrical devices
export const deviceFlavors = [
  { id: 'flavor-black-oud', name_ar: 'بلاك عود', name_en: 'BLACK OUD', price: 10.9, image: '/images/flavor-black-oud.png', description: 'رائحة عود فاخرة وعميقة' },
  { id: 'flavor-rose-musk', name_ar: 'روز مسك', name_en: 'ROSE MUSK', price: 10.9, image: '/images/flavor-rose-musk.png', description: 'مزيج رومانسي من الورود والمسك' },
  { id: 'flavor-santal-vanilla', name_ar: 'سانتال فانيلا', name_en: 'SANTAL VANILLA', price: 10.9, image: '/images/flavor-santal-vanilla.png', description: 'دفء الفانيليا مع خشبية السانتال' },
  { id: 'flavor-ocean-breeze', name_ar: 'أوشن بريدز', name_en: 'OCEAN BREEZE', price: 10.9, image: '/images/flavor-ocean-breeze.png', description: 'انتعاش بحري منعش' },
  { id: 'flavor-night-oud', name_ar: 'نايت عود', name_en: 'NIGHT OUD', price: 10.9, image: '/images/flavor-night-oud.png', description: 'رائحة عود ليلي mystique' },
  { id: 'flavor-amber-woods', name_ar: 'أمبر وودز', name_en: 'AMBER WOODS', price: 10.9, image: '/images/flavor-amber-woods.png', description: 'خشبية دافئة مع العنبر' },
  { id: 'flavor-oud-royal', name_ar: 'عود رويال', name_en: 'OUD ROYAL', price: 10.9, image: '/images/flavor-oud-royal.png', description: 'عود ملكي فاخر' },
  { id: 'flavor-arabian-oud', name_ar: 'عربي عود', name_en: 'ARABIAN OUD', price: 10.9, image: '/images/flavor-arabian-oud.png', description: 'عراقة عربية أصيلة' },
  { id: 'flavor-white-musk', name_ar: 'وايت مسك', name_en: 'WHITE MUSK', price: 10.9, image: '/images/flavor-white-musk.png', description: 'نقاء المسك الأبيض' },
  { id: 'flavor-fresh-linen', name_ar: 'فريش لينن', name_en: 'FRESH LINEN', price: 10.9, image: '/images/flavor-fresh-linen.png', description: 'انتعاش الملابس النظيفة' },
];

// All products - devices, flavors, and gifts
export const products: Product[] = [
  // ==================== ELECTRICAL DEVICES ====================
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

  // ==================== FLAVORS (Separate Products) ====================
  {
    id: 'flavor-black-oud',
    name_ar: 'بلاك عود',
    name_en: 'BLACK OUD',
    type: 'بطاريات معطرة - عطر مركز',
    price: 10.9,
    shortDescription: 'رائحة عود فاخرة وعميقة',
    fullDescription: 'بطاريات معطرة بتركيبة عود فاخرة تمنح أجواءً ملكية وفاخرة لأي مساحة.',
    specs: {
      'النوع': 'بطاريات معطرة',
      'التركيز': 'عطر مركز',
      'الاستخدام': 'للأجهزة الكهربائية',
      'المدة': '4-6 أسابيع',
    },
    features: ['رائحة عود فاخرة', 'تركيبة مركزة', ' durable long-lasting', 'مناسب للأجهزة'],
    image: '/images/flavor-black-oud.png',
    category: 'flavor',
    isFlavor: true,
    flavorNotes: 'رائحة عود فاخرة وعميقة',
  },
  {
    id: 'flavor-rose-musk',
    name_ar: 'روز مسك',
    name_en: 'ROSE MUSK',
    type: 'بطاريات معطرة - عطر وردي',
    price: 10.9,
    shortDescription: 'مزيج رومانسي من الورود والمسك',
    fullDescription: 'بطاريات معطرة بمزيج ساحر من الورود الطازجة والمسك الناعم.',
    specs: {
      'النوع': 'بطاريات معطرة',
      'التركيز': 'عطر وردي',
      'الاستخدام': 'للأجهزة الكهربائية',
      'المدة': '4-6 أسابيع',
    },
    features: ['رائحة وردية رومانسية', 'مسك ناعم', 'مزيج متناغم', 'مناسب للأجهزة'],
    image: '/images/flavor-rose-musk.png',
    category: 'flavor',
    isFlavor: true,
    flavorNotes: 'مزيج رومانسي من الورود والمسك',
  },
  {
    id: 'flavor-santal-vanilla',
    name_ar: 'سانتال فانيلا',
    name_en: 'SANTAL VANILLA',
    type: 'بطاريات معطرة - عطر خشبي',
    price: 10.9,
    shortDescription: 'دفء الفانيليا مع خشبية السانتال',
    fullDescription: 'بطاريات معطرة بمزيج دافئ من السانتال الكلاسيكي والفانيليا الكريمية.',
    specs: {
      'النوع': 'بطاريات معطرة',
      'التركيز': 'عطر خشبي دافئ',
      'الاستخدام': 'للأجهزة الكهربائية',
      'المدة': '4-6 أسابيع',
    },
    features: ['سانتال كلاسيكي', 'فانيليا كريمية', 'دفء مريح', 'مناسب للأجهزة'],
    image: '/images/flavor-santal-vanilla.png',
    category: 'flavor',
    isFlavor: true,
    flavorNotes: 'دفء الفانيليا مع خشبية السانتال',
  },
  {
    id: 'flavor-ocean-breeze',
    name_ar: 'أوشن بريدز',
    name_en: 'OCEAN BREEZE',
    type: 'بطاريات معطرة - عطر بحري',
    price: 10.9,
    shortDescription: 'انتعاش بحري منعش',
    fullDescription: 'بطاريات معطرة بانتعاش المحيط والملح البحري لم أجواء منعشة.',
    specs: {
      'النوع': 'بطاريات معطرة',
      'التركيز': 'عطر بحري',
      'الاستخدام': 'للأجهزة الكهربائية',
      'المدة': '4-6 أسابيع',
    },
    features: ['انتعاش بحري', 'رائحة محيطية', 'نضارة دائمة', 'مناسب للأجهزة'],
    image: '/images/flavor-ocean-breeze.png',
    category: 'flavor',
    isFlavor: true,
    flavorNotes: 'انتعاش بحري منعش',
  },
  {
    id: 'flavor-night-oud',
    name_ar: 'نايت عود',
    name_en: 'NIGHT OUD',
    type: 'بطاريات معطرة - عطر ليلي',
    price: 10.9,
    shortDescription: 'رائحة عود ليلي mystique',
    fullDescription: 'بطاريات معطرة بلمسة عود ليلية ساحرة تخلق أجواء ساحرة.',
    specs: {
      'النوع': 'بطاريات معطرة',
      'التركيز': 'عطر ليلي',
      'الاستخدام': 'للأجهزة الكهربائية',
      'المدة': '4-6 أسابيع',
    },
    features: ['رائحة عود ليلية', 'أجواء ساحرة', 'لمسة mystique', 'مناسب للأجهزة'],
    image: '/images/flavor-night-oud.png',
    category: 'flavor',
    isFlavor: true,
    flavorNotes: 'رائحة عود ليلي mystique',
  },
  {
    id: 'flavor-amber-woods',
    name_ar: 'أمبر وودز',
    name_en: 'AMBER WOODS',
    type: 'بطاريات معطرة - عطر عنبري',
    price: 10.9,
    shortDescription: 'خشبية دافئة مع العنبر',
    fullDescription: 'بطاريات معطرة بمزيج دافئ من الأخشاب والعنبر الطبيعي.',
    specs: {
      'النوع': 'بطاريات معطرة',
      'التركيز': 'عطر عنبري خشبي',
      'الاستخدام': 'للأجهزة الكهربائية',
      'المدة': '4-6 أسابيع',
    },
    features: ['خشبية دافئة', 'عنبر طبيعي', 'دفء فاخر', 'مناسب للأجهزة'],
    image: '/images/flavor-amber-woods.png',
    category: 'flavor',
    isFlavor: true,
    flavorNotes: 'خشبية دافئة مع العنبر',
  },
  {
    id: 'flavor-oud-royal',
    name_ar: 'عود رويال',
    name_en: 'OUD ROYAL',
    type: 'بطاريات معطرة - عطر ملكي',
    price: 10.9,
    shortDescription: 'عود ملكي فاخر',
    fullDescription: 'بطاريات معطرة بتركيبة عود ملكية فاخرة للأجواء الراقية.',
    specs: {
      'النوع': 'بطاريات معطرة',
      'التركيز': 'عطر ملكي',
      'الاستخدام': 'للأجهزة الكهربائية',
      'المدة': '4-6 أسابيع',
    },
    features: ['عود ملكي', 'تركيبة فاخرة', 'أجواء راقية', 'مناسب للأجهزة'],
    image: '/images/flavor-oud-royal.png',
    category: 'flavor',
    isFlavor: true,
    flavorNotes: 'عود ملكي فاخر',
  },
  {
    id: 'flavor-arabian-oud',
    name_ar: 'عربي عود',
    name_en: 'ARABIAN OUD',
    type: 'بطاريات معطرة - عطر عربي',
    price: 10.9,
    shortDescription: 'عراقة عربية أصيلة',
    fullDescription: 'بطاريات معطرة بالنكهة العربية الأصيلة من العود العربي.',
    specs: {
      'النوع': 'بطاريات معطرة',
      'التركيز': 'عطر عربي أصيل',
      'الاستخدام': 'للأجهزة الكهربائية',
      'المدة': '4-6 أسابيع',
    },
    features: ['عراقة عربية', 'نكهة أصيلة', 'تراث عطر', 'مناسب للأجهزة'],
    image: '/images/flavor-arabian-oud.png',
    category: 'flavor',
    isFlavor: true,
    flavorNotes: 'عراقة عربية أصيلة',
  },
  {
    id: 'flavor-white-musk',
    name_ar: 'وايت مسك',
    name_en: 'WHITE MUSK',
    type: 'بطاريات معطرة - عطر نقي',
    price: 10.9,
    shortDescription: 'نقاء المسك الأبيض',
    fullDescription: 'بطاريات معطرة بنقاء المسك الأبيض لم أجواء نظيفة ومميزة.',
    specs: {
      'النوع': 'بطاريات معطرة',
      'التركيز': 'عطر نقي',
      'الاستخدام': 'للأجهزة الكهربائية',
      'المدة': '4-6 أسابيع',
    },
    features: ['نقاء المسك', 'رائحة نظيفة', 'انتعاش دائم', 'مناسب للأجهزة'],
    image: '/images/flavor-white-musk.png',
    category: 'flavor',
    isFlavor: true,
    flavorNotes: 'نقاء المسك الأبيض',
  },
  {
    id: 'flavor-fresh-linen',
    name_ar: 'فريش لينن',
    name_en: 'FRESH LINEN',
    type: 'بطاريات معطرة - عطر الكتان',
    price: 10.9,
    shortDescription: 'انتعاش الملابس النظيفة',
    fullDescription: 'بطاريات معطرة بانتعاش الكتان الطازج والملابس النظيفة.',
    specs: {
      'النوع': 'بطاريات معطرة',
      'التركيز': 'عطر كتان',
      'الاستخدام': 'للأجهزة الكهربائية',
      'المدة': '4-6 أسابيع',
    },
    features: ['انتعاش الكتان', 'رائحة نظيفة', 'نضارة دائمة', 'مناسب للأجهزة'],
    image: '/images/flavor-fresh-linen.png',
    category: 'flavor',
    isFlavor: true,
    flavorNotes: 'انتعاش الملابس النظيفة',
  },

  // ==================== GIFT SETS ====================
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
    id: 'amber-santal',
    name_ar: 'أمبر سانتال',
    name_en: 'AMBER SANTAL',
    type: 'معطر أعواد فاخر',
    price: 10.9,
    shortDescription: 'معطر أعواد فاخر برائحة دافئة وخشبية، مناسب للديكور والهدايا.',
    fullDescription: 'أمبر سانتال معطر أعواد بتصميم أنيق ورائحة دافئة وخشبية.',
    specs: {
      'النوع': 'Reed Diffuser',
      'الانتشار': 'أعواد خشبية',
      'مدة الاستخدام': 'أكثر من 60 يوم',
      'التغطية': '20–30 م²',
    },
    features: ['زجاجة أنيقة', 'أعواد طبيعية', 'رائحة دافئة وخشبية', 'تغليف فاخر'],
    image: '/images/amber-santal.png',
    category: 'gift',
  },
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
    message += `${index + 1}. ${item.product.name_ar}\n`;
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

// Get products by category
export function getProductsByCategory(category: 'device' | 'flavor' | 'gift'): Product[] {
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

// Get related flavors for a device
export function getFlavorsForDevice(deviceId: string): typeof deviceFlavors {
  return deviceFlavors;
}