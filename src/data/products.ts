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
}

export const kuwaitGovernorates: Governorate[] = governorates.map(g => ({ id: g.id, name: g.name_ar }));

export const kuwaitAreas: DeliveryArea[] = deliveryAreas.map(area => ({
  id: area.id,
  name: area.name_ar,
  delivery: area.delivery_fee
}));

// Local products data
export const localProducts: Product[] = [
  {
    id: 'elan-nomad',
    name_ar: 'إيلان 360 نوماد',
    name_en: 'ELAN 360 NOMAD',
    type: 'devices',
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
    images: ['/images/elan-nomad.png'],
  },
  {
    id: 'elan-prime',
    name_ar: 'إيلان 360 برايم',
    name_en: 'ELAN 360 PRIME',
    type: 'devices',
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
    images: ['/images/elan-prime.png'],
  },
  {
    id: 'noir-majeste',
    name_ar: 'نوار ماجستيه',
    name_en: 'NOIR MAJESTÉ',
    type: 'devices',
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
    images: ['/images/noir-majeste.png'],
  },
  {
    id: 'forest-reserve',
    name_ar: 'فورست ريزيرف',
    name_en: 'FOREST RESERVE',
    type: 'gifts',
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
    images: ['/images/forest-reserve.png'],
  },
  {
    id: 'amber-santal',
    name_ar: 'أمبر سانتال',
    name_en: 'AMBER SANTAL',
    type: 'diffusers',
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
    images: ['/images/amber-santal.png'],
  },
];

export const products = localProducts;

export const deliveryFee = 2;
export const whatsappNumber = '96566377312';
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