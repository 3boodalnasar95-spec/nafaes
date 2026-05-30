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

export interface KuwaitArea {
  id: string;
  governorate: string;
  name: string;
  deliveryFee: number;
  estimatedDays: number;
}

export interface Governorate {
  id: string;
  name: string;
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
    fullDescription: 'إيلان 360 نوماد مصمم لمن يبحث عن الفخامة والراحة في جهاز واحد.',
    specs: {
      'السعة': '120 مل',
      'نوع التشغيل': 'بطارية ليثيوم قابلة للشحن',
      'الشحن': 'Type-C',
      'الانتشار': '360°',
    },
    features: ['رفاهية متنقلة', 'تشغيل ذكي', 'تصميم فاخر'],
    image: '/images/devices/elan-nomad.png',
  },
  {
    id: 'elan-prime',
    name_ar: 'إيلان 360 برايم',
    name_en: 'ELAN 360 PRIME',
    type: 'جهاز تعطير كهربائي',
    price: 42,
    shortDescription: 'جهاز تعطير كهربائي ثابت بتصميم أنيق، مناسب للمنازل والمكاتب.',
    fullDescription: 'إيلان 360 برايم جهاز تعطير كهربائي يمنح المكان رائحة ثابتة.',
    specs: {
      'السعة': '120 مل',
      'نوع التشغيل': 'كهربائي مباشر',
      'الانتشار': '360°',
    },
    features: ['فخامة يومية', 'تشغيل ثابت', 'رائحة متوازنة'],
    image: '/images/devices/elan-prime.png',
  },
  {
    id: 'noir-majeste',
    name_ar: 'نوار ماجستيه',
    name_en: 'NOIR MAJESTÉ',
    type: 'جهاز تعطير احترافي',
    price: 59,
    shortDescription: 'جهاز تعطير احترافي للمساحات الراقية والكبيرة.',
    fullDescription: 'نوار ماجستيه جهاز تعطير فاخر مناسب للمنازل الكبيرة.',
    specs: {
      'السعة': '200 مل',
      'التغطية': '300–500m³',
      'الشاشة': 'LCD',
    },
    features: ['مناسب للمساحات الكبيرة', 'تصميم احترافي'],
    image: '/images/devices/noir-majeste.png',
  },
  {
    id: 'forest-reserve',
    name_ar: 'فورست ريزيرف',
    name_en: 'FOREST RESERVE',
    type: 'طقم هدايا عطري',
    price: 13.9,
    shortDescription: 'طقم هدايا عطري أنيق.',
    fullDescription: 'فورست ريزيرف طقم هدايا عطري فاخر.',
    specs: {
      'النوع': 'Gift Set',
      'الطابع العطري': 'خشبي / دافئ',
    },
    features: ['هدية فاخرة', 'جاهز للإهداء'],
    image: '/images/gifts/forest-reserve.png',
  },
  {
    id: 'amber-santal',
    name_ar: 'أمبر سانتال',
    name_en: 'AMBER SANTAL',
    type: 'معطر أعواد فاخر',
    price: 10.9,
    shortDescription: 'معطر أعواد فاخر برائحة دافئة وخشبية.',
    fullDescription: 'أمبر سانتال معطر أعواد بتصميم أنيق.',
    specs: {
      'النوع': 'معطر أعواد',
      'الانتشار': 'أعواد خشبية',
      'مدة الاستخدام': '60+ يوم',
    },
    features: ['زجاجة أنيقة', 'أعواد طبيعية'],
    image: '/images/reed/amber-santal.png',
  },
];

export const localProducts = products;

export const deliveryFee = 2;
export const whatsappNumber = '96566377312';
export const whatsappLink = `https://wa.me/${whatsappNumber}`;

// Kuwait Areas
export const kuwaitGovernorates: Governorate[] = [
  { id: 'capital', name: 'العاصمة' },
  { id: 'hawalli', name: 'حولي' },
  { id: 'farwaniya', name: 'الفروانية' },
  { id: 'mubarak', name: 'مبارك الكبير' },
  { id: 'ahmadi', name: 'الأحمدي' },
  { id: 'jahra', name: 'الجهراء' },
];

export const kuwaitAreas: KuwaitArea[] = [
  // محافظة العاصمة
  { id: 'city', governorate: 'capital', name: 'مدينة الكويت', deliveryFee: 2, estimatedDays: 1 },
  { id: 'sharq', governorate: 'capital', name: 'شرق', deliveryFee: 2, estimatedDays: 1 },
  { id: 'qibla', governorate: 'capital', name: 'القبلة', deliveryFee: 2, estimatedDays: 1 },
  { id: 'murgab', governorate: 'capital', name: 'المرقاب', deliveryFee: 2, estimatedDays: 1 },
  { id: 'dasman', governorate: 'capital', name: 'دسمان', deliveryFee: 2, estimatedDays: 1 },
  { id: 'salhiya', governorate: 'capital', name: 'الصالحية', deliveryFee: 2, estimatedDays: 1 },
  { id: 'dasma', governorate: 'capital', name: 'الدسمة', deliveryFee: 2, estimatedDays: 1 },
  { id: 'nuzha', governorate: 'capital', name: 'النزهة', deliveryFee: 2, estimatedDays: 1 },
  { id: 'shaab', governorate: 'capital', name: 'الشعب', deliveryFee: 2, estimatedDays: 1 },
  { id: 'rawda', governorate: 'capital', name: 'الروضة', deliveryFee: 2, estimatedDays: 1 },
  { id: 'yarmouk', governorate: 'capital', name: 'اليرموك', deliveryFee: 2, estimatedDays: 1 },
  { id: 'surra', governorate: 'capital', name: 'السرة', deliveryFee: 2, estimatedDays: 1 },
  { id: 'keifan', governorate: 'capital', name: 'كيفان', deliveryFee: 2, estimatedDays: 1 },
  { id: 'qadisiya', governorate: 'capital', name: 'القادسية', deliveryFee: 2, estimatedDays: 1 },
  { id: 'granada', governorate: 'capital', name: 'غرناطة', deliveryFee: 2, estimatedDays: 1 },
  { id: 'nahda', governorate: 'capital', name: 'النهضة', deliveryFee: 2, estimatedDays: 1 },
  // محافظة حولي
  { id: 'salmiya', governorate: 'hawalli', name: 'السالمية', deliveryFee: 2, estimatedDays: 1 },
  { id: 'hawalli-city', governorate: 'hawalli', name: 'حولي', deliveryFee: 2, estimatedDays: 1 },
  { id: 'jabriya', governorate: 'hawalli', name: 'الجابرية', deliveryFee: 2, estimatedDays: 1 },
  { id: 'bayan', governorate: 'hawalli', name: 'بيان', deliveryFee: 2, estimatedDays: 1 },
  { id: 'salwa', governorate: 'hawalli', name: 'سلوى', deliveryFee: 2, estimatedDays: 1 },
  { id: 'surra-h', governorate: 'hawalli', name: 'السرة', deliveryFee: 2, estimatedDays: 1 },
  { id: 'hatin', governorate: 'hawalli', name: 'حطين', deliveryFee: 2, estimatedDays: 1 },
  { id: 'mushref', governorate: 'hawalli', name: 'مشرف', deliveryFee: 2, estimatedDays: 1 },
  // محافظة الفروانية
  { id: 'farwaniya-city', governorate: 'farwaniya', name: 'الفروانية', deliveryFee: 2, estimatedDays: 1 },
  { id: 'khaitan', governorate: 'farwaniya', name: 'خيطان', deliveryFee: 2, estimatedDays: 1 },
  { id: 'riggae', governorate: 'farwaniya', name: 'الرقعي', deliveryFee: 2, estimatedDays: 1 },
  { id: 'jleeb', governorate: 'farwaniya', name: 'جليب الشيوخ', deliveryFee: 2, estimatedDays: 1 },
  { id: 'andalus', governorate: 'farwaniya', name: 'الأندلس', deliveryFee: 2, estimatedDays: 1 },
  // محافظة مبارك الكبير
  { id: 'adan', governorate: 'mubarak', name: 'العدان', deliveryFee: 2, estimatedDays: 1 },
  { id: 'funitees', governorate: 'mubarak', name: 'الفنيطيس', deliveryFee: 2, estimatedDays: 1 },
  { id: 'sobhan', governorate: 'mubarak', name: 'صبحان', deliveryFee: 2, estimatedDays: 1 },
  // محافظة الأحمدي
  { id: 'ahmadi-city', governorate: 'ahmadi', name: 'الأحمدي', deliveryFee: 3, estimatedDays: 2 },
  { id: 'fintas', governorate: 'ahmadi', name: 'الفنطاس', deliveryFee: 3, estimatedDays: 1 },
  { id: 'mahboula', governorate: 'ahmadi', name: 'المهبولة', deliveryFee: 3, estimatedDays: 1 },
  { id: 'wafra', governorate: 'ahmadi', name: 'الوفرة', deliveryFee: 3, estimatedDays: 2 },
  { id: 'fahaheel', governorate: 'ahmadi', name: 'الفحيحيل', deliveryFee: 3, estimatedDays: 1 },
  // محافظة الجهراء
  { id: 'jahra-city', governorate: 'jahra', name: 'الجهراء', deliveryFee: 3, estimatedDays: 2 },
  { id: 'nasser-almulla', governorate: 'jahra', name: 'ناصر الملا', deliveryFee: 3, estimatedDays: 2 },
  { id: 'sulaibikhat', governorate: 'jahra', name: 'صيلباط', deliveryFee: 3, estimatedDays: 2 },
  { id: 'kabd', governorate: 'jahra', name: 'كبد', deliveryFee: 3, estimatedDays: 2 },
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
  message += `👤 الاسم: ${orderData.customerName}\n`;
  message += `📞 الهاتف: +965 ${orderData.customerPhone}\n`;
  message += `📍 المنطقة: ${orderData.area}\n`;
  message += `🏠 العنوان: ${orderData.address}\n\n`;
  
  orderData.items.forEach((item: any, index: number) => {
    message += `${index + 1}. ${item.productNameAr}\n`;
    message += `   الكمية: ${item.quantity}\n`;
    message += `   المجموع: ${formatPrice(item.totalPrice)}\n\n`;
  });
  
  message += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `📦 المجموع: ${formatPrice(orderData.subtotal)}\n`;
  message += `🚚 التوصيل: ${formatPrice(orderData.deliveryFee)}\n`;
  message += `💵 الإجمالي: ${formatPrice(orderData.total)}\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  
  return encodeURIComponent(message);
}