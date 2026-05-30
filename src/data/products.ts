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

// ==================== DELIVERY AREAS ====================

export interface DeliveryArea {
  id: string;
  name: string;
  delivery: number;
}

export interface Governorate {
  id: string;
  name: string;
  deliveryFee: number;
  areas: DeliveryArea[];
}

// Kuwait Governorates with comprehensive areas
export const kuwaitDeliveryAreas: Governorate[] = [
  {
    id: 'capital',
    name: 'محافظة العاصمة',
    deliveryFee: 2,
    areas: [
      // العادية - 2 د.ك
      { id: 'kw-city', name: 'مدينة الكويت', delivery: 2 },
      { id: 'sharq', name: 'شرق', delivery: 2 },
      { id: 'qibla', name: 'القبلة', delivery: 2 },
      { id: 'murgab', name: 'المرقاب', delivery: 2 },
      { id: 'dasman', name: 'دسمان', delivery: 2 },
      { id: 'salhiya', name: 'الصالحية', delivery: 2 },
      { id: 'sawaber', name: 'الصوابر', delivery: 2 },
      { id: 'watani', name: 'الوطنية', delivery: 2 },
      { id: 'bneid-al-qar', name: 'بنيد القار', delivery: 2 },
      { id: 'dasma', name: 'الدسمة', delivery: 2 },
      { id: 'addiyeh', name: 'الدعية', delivery: 2 },
      { id: 'mansouriya', name: 'المنصورية', delivery: 2 },
      { id: 'abdullah-salam', name: 'ضاحية عبدالله السالم', delivery: 2 },
      { id: 'nuzha', name: 'النزهة', delivery: 2 },
      { id: 'adaliya', name: 'العدلية', delivery: 2 },
      { id: 'khaldiya', name: 'الخالدية', delivery: 2 },
      { id: 'keifan', name: 'كيفان', delivery: 2 },
      { id: 'shamiya', name: 'الشامية', delivery: 2 },
      { id: 'qadisiya', name: 'القادسية', delivery: 2 },
      { id: 'rawda', name: 'الروضة', delivery: 2 },
      { id: 'faiha', name: 'الفيحاء', delivery: 2 },
      { id: 'qudra', name: 'قرطبة', delivery: 2 },
      { id: 'yarmouk', name: 'اليرموك', delivery: 2 },
      { id: 'surra', name: 'السرة', delivery: 2 },
      { id: 'hadayat-al-sour', name: 'حدائق السور', delivery: 2 },
      { id: 'shueikh', name: 'الشويخ', delivery: 2 },
      { id: 'shueikh-residential', name: 'الشويخ السكنية', delivery: 2 },
      { id: 'shueikh-industrial', name: 'الشويخ الصناعية', delivery: 2 },
      // البعيدة - 2.5 د.ك
      { id: 'shuwaikh-port', name: 'ميناء الشويخ', delivery: 2.5 },
      { id: 'sulaibikhat', name: 'الصليبخات', delivery: 2.5 },
      { id: 'sulaibikhat-nw', name: 'شمال غرب الصليبيخات / الجون', delivery: 2.5 },
      { id: 'nahda', name: 'النهضة', delivery: 2.5 },
      { id: 'granada', name: 'غرناطة', delivery: 2.5 },
      { id: 'doha', name: 'الدوحة', delivery: 2.5 },
      { id: 'doha-port', name: 'ميناء الدوحة', delivery: 2.5 },
      { id: 'qirwan', name: 'القيروان', delivery: 2.5 },
      { id: 'qirwan-south', name: 'جنوب القيروان / سدرة', delivery: 2.5 },
      // الجزر - 5 د.ك
      { id: 'failaka', name: 'جزيرة فيلكا', delivery: 5 },
      { id: 'kubr', name: 'جزيرة كبر', delivery: 5 },
      { id: 'awjah', name: 'جزيرة عوهة', delivery: 5 },
      { id: 'umm-al-maradim', name: 'جزيرة أم المرادم', delivery: 5 },
      { id: 'miskan', name: 'جزيرة مسكان', delivery: 5 },
      { id: 'garouh', name: 'جزيرة قاروه', delivery: 5 },
      { id: 'umm-al-naml', name: 'جزيرة أم النمل', delivery: 5 },
      { id: 'shuwaikh-island', name: 'جزيرة الشويخ / عكاز', delivery: 5 },
    ]
  },
  {
    id: 'hawalli',
    name: 'محافظة حولي',
    deliveryFee: 2,
    areas: [
      { id: 'hawalli-city', name: 'حولي', delivery: 2 },
      { id: 'nakhshala', name: 'النكرة', delivery: 2 },
      { id: 'hawalli-circle', name: 'ميدان حولي', delivery: 2 },
      { id: 'salmiya', name: 'السالمية', delivery: 2 },
      { id: 'shaab', name: 'الشعب', delivery: 2 },
      { id: 'shaab-marine', name: 'الشعب البحري', delivery: 2 },
      { id: 'jaberiya', name: 'الجابرية', delivery: 2 },
      { id: 'rumithiyeh', name: 'الرميثية', delivery: 2 },
      { id: 'bida', name: 'البدع', delivery: 2 },
      { id: 'bayan', name: 'بيان', delivery: 2 },
      { id: 'mushref', name: 'مشرف', delivery: 2 },
      { id: 'mubarak-west-mushref', name: 'ضاحية مبارك العبدالله / غرب مشرف', delivery: 2 },
      { id: 'salwa', name: 'سلوى', delivery: 2 },
      { id: 'anjefa', name: 'أنجفة', delivery: 2 },
      { id: 'salam', name: 'السلام', delivery: 2 },
      { id: 'hatin', name: 'حطين', delivery: 2 },
      { id: 'shuhada', name: 'الشهداء', delivery: 2 },
      { id: 'sadeeq', name: 'الصديق', delivery: 2 },
      { id: 'zahra', name: 'الزهراء', delivery: 2 },
      { id: 'ministries-area', name: 'منطقة الوزارات', delivery: 2 },
    ]
  },
  {
    id: 'farwaniya',
    name: 'محافظة الفروانية',
    deliveryFee: 2,
    areas: [
      // العادية - 2 د.ك
      { id: 'farwaniya-city', name: 'الفروانية', delivery: 2 },
      { id: 'khaitan', name: 'خيطان', delivery: 2 },
      { id: 'khaitan-new', name: 'خيطان الجديدة', delivery: 2 },
      { id: 'abraq-khitan', name: 'أبرق خيطان', delivery: 2 },
      { id: 'khaitan-south', name: 'خيطان الجنوبي', delivery: 2 },
      { id: 'andalus', name: 'الأندلس', delivery: 2 },
      { id: 'ashabija', name: 'أشبيلية', delivery: 2 },
      { id: 'omariya', name: 'العمرية', delivery: 2 },
      { id: 'rahab', name: 'الرابية', delivery: 2 },
      { id: 'rihab', name: 'الرحاب', delivery: 2 },
      { id: 'fardous', name: 'الفردوس', delivery: 2 },
      { id: 'riggae', name: 'الرقعي', delivery: 2 },
      { id: 'rai', name: 'الري', delivery: 2 },
      { id: 'rai-industrial', name: 'الري الصناعية', delivery: 2 },
      { id: 'dajeej', name: 'الضجيج', delivery: 2 },
      { id: 'ardiya', name: 'العارضية', delivery: 2 },
      { id: 'ardiya-industrial', name: 'العارضية الصناعية', delivery: 2 },
      // البعيدة - 2.5 د.ك
      { id: 'airport', name: 'مطار الكويت الدولي', delivery: 2.5 },
      { id: 'jleeb-shuyoukh', name: 'جليب الشيوخ', delivery: 2.5 },
      { id: 'abbasia', name: 'العباسية', delivery: 2.5 },
      { id: 'hassawi', name: 'الحساوي', delivery: 2.5 },
      { id: 'shaddadiya', name: 'الشدادية', delivery: 2.5 },
      { id: 'kuwait-university-sh', name: 'جامعة الكويت - الشدادية', delivery: 2.5 },
      { id: 'sabah-al-nasser', name: 'ضاحية صباح الناصر', delivery: 2.5 },
      { id: 'abdullah-al-mubarak', name: 'ضاحية عبدالله المبارك', delivery: 2.5 },
      { id: 'west-abdullah-mubarak', name: 'غرب عبدالله المبارك / الريان', delivery: 2.5 },
      { id: 'south-abdullah-mubarak', name: 'جنوب عبدالله المبارك / السور', delivery: 2.5 },
      { id: 'madinat-al-maskan', name: 'مدينة المساكن / البيرق', delivery: 2.5 },
    ]
  },
  {
    id: 'mubarak',
    name: 'محافظة مبارك الكبير',
    deliveryFee: 2.5,
    areas: [
      { id: 'mubarak-al-kabir', name: 'مبارك الكبير', delivery: 2.5 },
      { id: 'sabah-al-salem', name: 'صباح السالم', delivery: 2.5 },
      { id: 'adan', name: 'العدان', delivery: 2.5 },
      { id: 'qours', name: 'القصور', delivery: 2.5 },
      { id: 'qreen', name: 'القرين', delivery: 2.5 },
      { id: 'mubarak-al-kabir-msela', name: 'المسيلة', delivery: 2.5 },
      { id: 'funitees', name: 'الفنيطيس', delivery: 2.5 },
      { id: 'abu-futaira', name: 'أبو فطيرة', delivery: 2.5 },
      { id: 'abu-futaira-west', name: 'غرب أبو فطيرة الحرفية', delivery: 2.5 },
      { id: 'abu-hasaniya', name: 'أبو الحصانية', delivery: 2.5 },
      { id: 'masayel', name: 'المسايل', delivery: 2.5 },
      { id: 'sobhan', name: 'صبحان', delivery: 2.5 },
      { id: 'sobhan-industrial', name: 'صبحان الصناعية', delivery: 2.5 },
      { id: 'vista', name: 'ويستا', delivery: 2.5 },
    ]
  },
  {
    id: 'ahmadi',
    name: 'محافظة الأحمدي',
    deliveryFee: 3,
    areas: [
      // العادية - 3 د.ك
      { id: 'ahmadi-city', name: 'الأحمدي', delivery: 3 },
      { id: 'fintas', name: 'الفنطاس', delivery: 3 },
      { id: 'ugaila', name: 'العقيلة', delivery: 3 },
      { id: 'mahboula', name: 'المهبولة', delivery: 3 },
      { id: 'abu-halifa', name: 'أبو حليفة', delivery: 3 },
      { id: 'mangaf', name: 'المنقف', delivery: 3 },
      { id: 'fahaheel', name: 'الفحيحيل', delivery: 3 },
      { id: 'sabahia', name: 'الصباحية', delivery: 3 },
      { id: 'raqqa', name: 'الرقة', delivery: 3 },
      { id: 'hada', name: 'هدية', delivery: 3 },
      { id: 'dhahr', name: 'الظهر', delivery: 3 },
      { id: 'jaber-al-ali', name: 'ضاحية جابر العلي', delivery: 3 },
      { id: 'fahad-al-ahmad', name: 'ضاحية فهد الأحمد', delivery: 3 },
      // البعيدة - 3.5 د.ك
      { id: 'sabah-al-salem-ahmadi', name: 'ضاحية علي صباح السالم / أم الهيمان', delivery: 3.5 },
      { id: 'abdullah-port', name: 'ميناء عبدالله', delivery: 3.5 },
      { id: 'shuaiba', name: 'الشعيبة', delivery: 3.5 },
      // الأبعد - 4 د.ك
      { id: 'maqwa', name: 'المقوع', delivery: 4 },
      { id: 'wra', name: 'واره', delivery: 4 },
      { id: 'zour', name: 'الزور', delivery: 4 },
      { id: 'khairan', name: 'الخيران', delivery: 4 },
      { id: 'khairan-city', name: 'مدينة الخيران', delivery: 4 },
      { id: 'sabah-al-ahmad-city', name: 'مدينة صباح الأحمد', delivery: 4 },
      { id: 'sabah-al-ahmad-marina', name: 'مدينة صباح الأحمد البحرية', delivery: 4 },
      { id: 'sabah-al-ahmad-south', name: 'جنوب صباح الأحمد / عريفجان', delivery: 4 },
      { id: 'sabah-al-ahmad-east', name: 'شرق صباح الأحمد / الاستقلال', delivery: 4 },
      { id: 'bender', name: 'بنيدر', delivery: 4 },
      { id: 'jaliya', name: 'الجلعة', delivery: 4 },
      { id: 'dabbiya', name: 'الضبيعية', delivery: 4 },
      // النائية - 5 د.ك
      { id: 'wafra', name: 'الوفرة', delivery: 5 },
      { id: 'wafra-agricultural', name: 'الوفرة الزراعية', delivery: 5 },
      { id: 'nuwaisib', name: 'النويصيب', delivery: 5 },
    ]
  },
  {
    id: 'jahra',
    name: 'محافظة الجهراء',
    deliveryFee: 3,
    areas: [
      // العادية - 3 د.ك
      { id: 'jahra-city', name: 'الجهراء', delivery: 3 },
      { id: 'jahra-old', name: 'الجهراء القديمة', delivery: 3 },
      { id: 'jahra-new', name: 'الجهراء الجديدة', delivery: 3 },
      { id: 'saad-abdullah', name: 'مدينة سعد العبدالله', delivery: 3 },
      { id: 'neim', name: 'النعيم', delivery: 3 },
      { id: 'qasr', name: 'القصر', delivery: 3 },
      { id: 'wahah', name: 'الواحة', delivery: 3 },
      { id: 'taima', name: 'تيماء', delivery: 3 },
      { id: 'taima-east', name: 'شرق تيماء', delivery: 3 },
      { id: 'naseem', name: 'النسيم', delivery: 3 },
      { id: 'ain', name: 'العيون', delivery: 3 },
      { id: 'qaisariya', name: 'القيصرية', delivery: 3 },
      { id: 'sleeb', name: 'الصليبية', delivery: 3 },
      { id: 'sleeb-industrial', name: 'الصليبية الصناعية', delivery: 3 },
      // البعيدة - 3.5 د.ك
      { id: 'amghara', name: 'أمغرة', delivery: 3.5 },
      { id: 'kabd', name: 'كبد', delivery: 3.5 },
      // الأبعد - 4 د.ك
      { id: 'kazema', name: 'كاظمة', delivery: 4 },
      { id: 'matala', name: 'المطالع', delivery: 4 },
      { id: 'saad-south', name: 'جنوب سعد العبدالله / رحية السكنية', delivery: 4 },
      { id: 'nawaf-al-ahmad', name: 'مدينة نواف الأحمد', delivery: 4 },
      // النائية - 4.5 - 5 د.ك
      { id: 'harir', name: 'مدينة الحرير', delivery: 4.5 },
      { id: 'subiya', name: 'الصبية', delivery: 4.5 },
      { id: 'rawdatain', name: 'الروضتين', delivery: 4.5 },
      { id: 'salmi', name: 'السالمي', delivery: 5 },
      { id: 'abdali', name: 'العبدلي', delivery: 5 },
      { id: 'bubyan', name: 'جزيرة بوبيان', delivery: 5 },
      { id: 'warba', name: 'جزيرة وربة', delivery: 5 },
    ]
  },
];

// Flat list for easy searching
export const kuwaitAreas: DeliveryArea[] = kuwaitDeliveryAreas.flatMap(g => g.areas);

// Governorates list (simplified)
export const kuwaitGovernorates = kuwaitDeliveryAreas.map(g => ({ id: g.id, name: g.name }));

// Local products data
export const localProducts: Product[] = [
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
    image: '/images/elan-nomad.png',
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
    image: '/images/elan-prime.png',
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
    image: '/images/noir-majeste.png',
  },
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
  },
];

export const products = localProducts;

export const deliveryFee = 2;
export const whatsappNumber = '96566377312';
export const whatsappLink = `https://wa.me/${whatsappNumber}`;

// Helper functions
export function getAreasByGovernorate(governorateId: string): DeliveryArea[] {
  const governorate = kuwaitDeliveryAreas.find(g => g.id === governorateId);
  return governorate?.areas || [];
}

export function getAreaById(areaId: string): DeliveryArea | undefined {
  return kuwaitAreas.find(area => area.id === areaId);
}

export function getGovernorateById(governorateId: string): Governorate | undefined {
  return kuwaitDeliveryAreas.find(g => g.id === governorateId);
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
  const deliveryFeeAmount = areaInfo?.delivery || deliveryFee;
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

// Calculate total delivery fee
export function getDeliveryFee(areaId: string): number {
  const area = getAreaById(areaId);
  return area?.delivery || deliveryFee;
}

// Get all areas count
export function getTotalAreasCount(): number {
  return kuwaitAreas.length;
}

// Search areas
export function searchAreas(query: string, governorateId?: string): DeliveryArea[] {
  let results = kuwaitAreas;
  
  if (governorateId) {
    results = results.filter(area => {
      const gov = kuwaitDeliveryAreas.find(g => g.id === governorateId);
      return gov?.areas.some(a => a.id === area.id);
    });
  }
  
  if (query) {
    const lowerQuery = query.toLowerCase();
    results = results.filter(area => area.name.toLowerCase().includes(lowerQuery));
  }
  
  return results;
}