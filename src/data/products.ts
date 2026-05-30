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

// Local products data
export const products: Product[] = [
  {
    id: 'elan-nomad',
    name_ar: 'إيلان 360 نوماد',
    name_en: 'ELAN 360 NOMAD',
    type: 'جهاز تعطير ذكي',
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
    },
    features: ['رفاهية متنقلة', 'تشغيل ذكي', 'تصميم فاخر', 'سهل الحمل'],
    image: '/images/devices/elan-nomad.png',
  },
  {
    id: 'elan-prime',
    name_ar: 'إيلان 360 برايم',
    name_en: 'ELAN 360 PRIME',
    type: 'جهاز تعطير كهربائي',
    price: 42,
    shortDescription: 'جهاز تعطير كهربائي ثابت بتصميم أنيق، مناسب للمنازل والمكاتب.',
    fullDescription: 'إيلان 360 برايم هو جهاز تعطير كهربائي يمنح المكان رائحة ثابتة ومنتظمة طوال اليوم. يتميز بتشغيل مباشر بالكهرباء، انتشار 360°، سعة 120 مل.',
    specs: {
      'السعة': '120 مل',
      'نوع التشغيل': 'كهربائي مباشر',
      'الانتشار': '360°',
      'التحكم': 'Touch / Bluetooth / Remote',
    },
    features: ['فخامة يومية', 'تشغيل ثابت', 'رائحة متوازنة', 'تصميم أنيق'],
    image: '/images/devices/elan-prime.png',
  },
  {
    id: 'noir-majeste',
    name_ar: 'نوار ماجستيه',
    name_en: 'NOIR MAJESTÉ',
    type: 'جهاز تعطير احترافي',
    price: 59,
    shortDescription: 'جهاز تعطير احترافي للمساحات الراقية والكبيرة، مزود بشاشة LCD وتحكم ذكي.',
    fullDescription: 'نوار ماجستيه جهاز تعطير فاخر مناسب للمنازل الكبيرة، المكاتب، الصالونات، العيادات. يتميز بسعة 200 مل، تغطية قوية، شاشة LCD، تحكم باللمس.',
    specs: {
      'السعة': '200 مل',
      'التغطية': '300–500m³',
      'التحكم': 'Touch Buttons / Bluetooth',
      'الشاشة': 'LCD',
    },
    features: ['مناسب للمساحات الكبيرة', 'تصميم احترافي', 'تحكم ذكي', 'تشغيل هادئ'],
    image: '/images/devices/noir-majeste.png',
  },
  {
    id: 'forest-reserve',
    name_ar: 'فورست ريزيرف',
    name_en: 'FOREST RESERVE',
    type: 'طقم هدايا عطري',
    price: 13.9,
    shortDescription: 'طقم هدايا عطري أنيق يجمع بين زجاجة معطر وشمعة معطرة.',
    fullDescription: 'فورست ريزيرف طقم هدايا عطري فاخر مناسب للإهداء والمناسبات. يجمع بين معطر أعواد وشمعة معطرة مع تغليف أنيق جاهز للتقديم.',
    specs: {
      'النوع': 'طقم هدايا',
      'الطابع العطري': 'خشبي / دافئ',
      'الاستخدام': 'هدية جاهزة وأنيقة',
    },
    features: ['هدية فاخرة', 'جاهز للإهداء', 'تغليف أنيق', 'رائحة خشبية دافئة'],
    image: '/images/gifts/forest-reserve.png',
  },
  {
    id: 'amber-santal',
    name_ar: 'أمبر سانتال',
    name_en: 'AMBER SANTAL',
    type: 'معطر أعواد فاخر',
    price: 10.9,
    shortDescription: 'معطر أعواد فاخر برائحة دافئة وخشبية، مناسب للديكور والهدايا.',
    fullDescription: 'أمبر سانتال معطر أعواد بتصميم أنيق ورائحة دافئة وخشبية. لا يحتاج إلى كهرباء أو بطاريات، فقط ضع الأعواد داخل الزجاجة واترك الرائحة تنتشر.',
    specs: {
      'النوع': 'معطر أعواد',
      'الانتشار': 'أعواد خشبية',
      'مدة الاستخدام': 'أكثر من 60 يوم',
    },
    features: ['زجاجة أنيقة', 'أعواد طبيعية', 'رائحة دافئة', 'تغليف فاخر'],
    image: '/images/reed/amber-santal.png',
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
  name_ar: string;
  deliveryFee: number;
  estimatedDays: number;
}

export const kuwaitGovernorates = [
  { id: 'capital', name_ar: 'العاصمة' },
  { id: 'hawalli', name_ar: 'حولي' },
  { id: 'farwaniya', name_ar: 'الفروانية' },
  { id: 'mubarak', name_ar: 'مبارك الكبير' },
  { id: 'ahmadi', name_ar: 'الأحمدي' },
  { id: 'jahra', name_ar: 'الجهراء' },
];

export const kuwaitAreas: KuwaitArea[] = [
  // محافظة العاصمة
  { id: 'kout', name: 'الكوت', name_ar: 'الكوت', governorate: 'capital', deliveryFee: 2, estimatedDays: 1 },
  { id: 'daiya', name: 'الدية', name_ar: 'الدية', governorate: 'capital', deliveryFee: 2, estimatedDays: 1 },
  { id: 'al-shamaliya', name: 'الشمالية', name_ar: 'الشمالية', governorate: 'capital', deliveryFee: 2, estimatedDays: 1 },
  { id: 'al-salhiya', name: 'الصالحية', name_ar: 'الصالحية', governorate: 'capital', deliveryFee: 2, estimatedDays: 1 },
  { id: 'al-rawda', name: 'الرابطة', name_ar: 'الرابطة', governorate: 'capital', deliveryFee: 2, estimatedDays: 1 },
  { id: 'al-dasma', name: 'الدسمة', name_ar: 'الدسمة', governorate: 'capital', deliveryFee: 2, estimatedDays: 1 },
  { id: 'al-nuzha', name: 'النزهة', name_ar: 'النزهة', governorate: 'capital', deliveryFee: 2, estimatedDays: 1 },
  { id: 'al-shaab', name: 'الشعب', name_ar: 'الشعب', governorate: 'capital', deliveryFee: 2, estimatedDays: 1 },
  { id: 'al-qibla', name: 'القبلة', name_ar: 'القبلة', governorate: 'capital', deliveryFee: 2, estimatedDays: 1 },
  { id: 'al-mansuriya', name: 'المنصورية', name_ar: 'المنصورية', governorate: 'capital', deliveryFee: 2, estimatedDays: 1 },

  // محافظة حولي
  { id: 'salmiya', name: 'السالمية', name_ar: 'السالمية', governorate: 'hawalli', deliveryFee: 2, estimatedDays: 1 },
  { id: 'hawalli-city', name: 'حولي', name_ar: 'حولي', governorate: 'hawalli', deliveryFee: 2, estimatedDays: 1 },
  { id: 'jabriya', name: 'الجابرية', name_ar: 'الجابرية', governorate: 'hawalli', deliveryFee: 2, estimatedDays: 1 },
  { id: 'bayan', name: 'بيان', name_ar: 'بيان', governorate: 'hawalli', deliveryFee: 2, estimatedDays: 1 },
  { id: 'salwa', name: 'سلوى', name_ar: 'سلوى', governorate: 'hawalli', deliveryFee: 2, estimatedDays: 1 },
  { id: 'surra', name: 'السرة', name_ar: 'السرة', governorate: 'hawalli', deliveryFee: 2, estimatedDays: 1 },
  { id: 'maidan-bayan', name: 'ميدان بيان', name_ar: 'ميدان بيان', governorate: 'hawalli', deliveryFee: 2, estimatedDays: 1 },
  { id: 'hateen', name: 'حطين', name_ar: 'حطين', governorate: 'hawalli', deliveryFee: 2, estimatedDays: 1 },

  // محافظة الفروانية
  { id: 'farwaniya-city', name: 'مدينة الفروانية', name_ar: 'مدينة الفروانية', governorate: 'farwaniya', deliveryFee: 2, estimatedDays: 1 },
  { id: 'al-riggae', name: 'الرقة', name_ar: 'الرقة', governorate: 'farwaniya', deliveryFee: 2, estimatedDays: 1 },
  { id: 'ibn-sina', name: 'ابن سينا', name_ar: 'ابن سينا', governorate: 'farwaniya', deliveryFee: 2, estimatedDays: 1 },
  { id: 'al-ardhiya', name: 'العارضية', name_ar: 'العارضية', governorate: 'farwaniya', deliveryFee: 2, estimatedDays: 1 },
  { id: 'jleeb', name: 'جليب الشيوخ', name_ar: 'جليب الشيوخ', governorate: 'farwaniya', deliveryFee: 2.5, estimatedDays: 1 },

  // محافظة مبارك الكبير
  { id: 'al-ahmadi', name: 'الأحمدي', name_ar: 'الأحمدي', governorate: 'mubarak', deliveryFee: 2, estimatedDays: 1 },
  { id: 'al-funaitees', name: 'الفنيطيس', name_ar: 'الفنيطيس', governorate: 'mubarak', deliveryFee: 2, estimatedDays: 1 },
  { id: 'al-sabah', name: 'ال صباح', name_ar: 'ال صباح', governorate: 'mubarak', deliveryFee: 2, estimatedDays: 1 },
  { id: 'al-adi', name: 'العدان', name_ar: 'العدان', governorate: 'mubarak', deliveryFee: 2, estimatedDays: 1 },

  // محافظة الأحمدي
  { id: 'ahmadi-city', name: 'مدينة الأحمدي', name_ar: 'مدينة الأحمدي', governorate: 'ahmadi', deliveryFee: 3, estimatedDays: 2 },
  { id: 'fintas', name: 'الفنطاس', name_ar: 'الفنطاس', governorate: 'ahmadi', deliveryFee: 2, estimatedDays: 1 },
  { id: 'mahboula', name: 'مهبول', name_ar: 'مهبول', governorate: 'ahmadi', deliveryFee: 2, estimatedDays: 1 },
  { id: 'abu-halifa', name: 'أبو حليلة', name_ar: 'أبو حليلة', governorate: 'ahmadi', deliveryFee: 2, estimatedDays: 1 },
  { id: 'wafra', name: 'الوفرة', name_ar: 'الوفرة', governorate: 'ahmadi', deliveryFee: 3, estimatedDays: 2 },

  // محافظة الجهراء
  { id: 'jahra-city', name: 'مدينة الجهراء', name_ar: 'مدينة الجهراء', governorate: 'jahra', deliveryFee: 2, estimatedDays: 1 },
  { id: 'nasser-almulla', name: 'ناصر الملا', name_ar: 'ناصر الملا', governorate: 'jahra', deliveryFee: 2, estimatedDays: 1 },
  { id: 'sulaibikhat', name: 'صيلباط', name_ar: 'صيلباط', governorate: 'jahra', deliveryFee: 2, estimatedDays: 1 },
  { id: 'kuwait-city', name: 'الكويت', name_ar: 'الكويت', governorate: 'jahra', deliveryFee: 2, estimatedDays: 1 },
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

export function generateOrderNumber(): string {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `NAF-${year}${month}${day}-${hours}${minutes}-${random}`;
}

export function generateWhatsAppMessage(orderData: any): string {
  let message = `━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `    🏪 NAFAES | نفائس\n`;
  message += `   فاخور العطور الذكية 🕌\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  message += `📋 ═══ طلب جديد ═══ 📋\n\n`;
  message += `🔢 رقم الطلب: ${orderData.orderNumber}\n\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `   👤 بيانات العميل\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  message += `👤 الاسم: ${orderData.customerName}\n`;
  message += `📞 الهاتف: +965 ${orderData.customerPhone}\n`;
  message += `📍 المحافظة: ${orderData.governorate}\n`;
  message += `📍 المنطقة: ${orderData.area}\n`;
  message += `🏠 العنوان: ${orderData.address}\n`;
  if (orderData.notes) message += `📝 ملاحظات: ${orderData.notes}\n`;
  
  message += `\n━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `   🛒 تفاصيل المنتجات\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  
  orderData.items.forEach((item: any, index: number) => {
    message += `${index + 1}. ${item.productNameAr}\n`;
    message += `   الكمية: ${item.quantity}\n`;
    if (item.selectedSize) message += `   الحجم: ${item.selectedSize}\n`;
    message += `   المجموع: ${formatPrice(item.totalPrice)}\n\n`;
  });
  
  message += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `   💰 ملخص الطلب\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  message += `📦 المجموع الفرعي: ${formatPrice(orderData.subtotal)}\n`;
  message += `🚚 رسوم التوصيل: ${formatPrice(orderData.deliveryFee)}\n`;
  message += `💵 الإجمالي النهائي: ${formatPrice(orderData.total)}\n\n`;
  message += `💳 طريقة الدفع: ${orderData.paymentMethod === 'cash' ? 'كاش عند الاستلام 💵' : 'رابط دفع إلكتروني 💳'}\n\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `شكراً لتعاملكم مع نفائس 🕌\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  
  return encodeURIComponent(message);
}

// Re-export
export type { Product as ProductType };