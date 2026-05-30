export interface Product {
  id: string;
  nameAr: string;
  nameEn: string;
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

export const products: Product[] = [
  {
    id: 'elan-nomad',
    nameAr: 'إيلان 360 نوماد',
    nameEn: 'ELAN 360 NOMAD',
    type: 'جهاز تعطير ذكي قابل للشحن',
    price: 49,
    shortDescription: 'جهاز تعطير ذكي قابل للشحن يمنحك تجربة عطرية متنقلة وأنيقة.',
    fullDescription: 'إيلان 360 نوماد مصمم لمن يبحث عن الفخامة والراحة في جهاز واحد. يعمل ببطارية ليثيوم مدمجة، ويدعم الشحن Type-C، مع انتشار عطري 360° لتوزيع الرائحة بشكل متوازن. يتميز بتصميم أسطواني أنيق، تشغيل هادئ، وتحكم ذكي يناسب الاستخدام اليومي.',
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
    image: '/images/elan-nomad.png',
  },
  {
    id: 'elan-prime',
    nameAr: 'إيلان 360 برايم',
    nameEn: 'ELAN 360 PRIME',
    type: 'جهاز تعطير كهربائي',
    price: 42,
    shortDescription: 'جهاز تعطير كهربائي ثابت بتصميم أنيق، مناسب للمنازل والمكاتب.',
    fullDescription: 'إيلان 360 برايم هو جهاز تعطير كهربائي يمنح المكان رائحة ثابتة ومنتظمة طوال اليوم. يتميز بتشغيل مباشر بالكهرباء، انتشار 360°، سعة 120 مل، وتحكم مريح باللمس مع Bluetooth وRemote.',
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
    image: '/images/elan-prime.png',
  },
  {
    id: 'noir-majeste',
    nameAr: 'نوار ماجستيه',
    nameEn: 'NOIR MAJESTÉ',
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
      'الفولتية': 'DC 12V/2A',
      'المقاس': 'W188 × D92 × H239mm',
    },
    features: ['مناسب للمساحات الكبيرة', 'تصميم احترافي', 'تحكم ذكي', 'تشغيل هادئ', 'مناسب للمشاريع والعيادات'],
    image: '/images/noir-majeste.png',
  },
  {
    id: 'forest-reserve',
    nameAr: 'فورست ريزيرف',
    nameEn: 'FOREST RESERVE',
    type: 'طقم هدايا عطري فاخر',
    price: 13.9,
    shortDescription: 'طقم هدايا عطري أنيق يجمع بين زجاجة معطر، شمعة معطرة، وأعواد خشبية.',
    fullDescription: 'فورست ريزيرف طقم هدايا عطري فاخر مناسب للإهداء والمناسبات. يجمع بين Reed Diffuser وScented Candle مع تغليف أنيق جاهز للتقديم. يمنح المكان رائحة خشبية دافئة ولمسة ديكورية راقية.',
    specs: {
      'النوع': 'Gift Set',
      'الطابع العطري': 'خشبي / دافئ',
      'الاستخدام': 'هدية جاهزة وأنيقة',
      'التشغيل': 'بدون كهرباء',
      'التغطية': '25–35 م²',
      'مستوى الصوت': '0 dB',
    },
    features: ['هدية فاخرة', 'جاهز للإهداء', 'تغليف أنيق', 'رائحة خشبية دافئة', 'مناسب للمناسبات'],
    image: '/images/forest-reserve.png',
  },
  {
    id: 'amber-santal',
    nameAr: 'أمبر سانتال',
    nameEn: 'AMBER SANTAL',
    type: 'معطر أعواد فاخر',
    price: 10.9,
    shortDescription: 'معطر أعواد فاخر برائحة دافئة وخشبية، مناسب للديكور والهدايا.',
    fullDescription: 'أمبر سانتال معطر أعواد بتصميم أنيق ورائحة دافئة وخشبية تمنح المكان إحساسًا فاخرًا وهادئًا. لا يحتاج إلى كهرباء أو بطاريات، فقط ضع الأعواد داخل الزجاجة واترك الرائحة تنتشر تدريجيًا.',
    specs: {
      'النوع': 'Reed Diffuser',
      'الانتشار': 'أعواد خشبية',
      'التشغيل': 'بدون كهرباء',
      'الطابع العطري': 'دافئ وخشبي',
      'مدة الاستخدام': 'أكثر من 60 يوم',
      'التغطية': '20–30 م²',
    },
    features: ['زجاجة أنيقة', 'أعواد طبيعية', 'رائحة دافئة وخشبية', 'تغليف فاخر', 'يناسب الديكور المنزلي'],
    image: '/images/amber-santal.png',
  },
];

export const deliveryFee = 2;

export const whatsappNumber = '96566377312';

export const whatsappLink = `https://wa.me/${whatsappNumber}`;

export function formatPrice(price: number): string {
  return `${price.toFixed(3)} د.ك`;
}

export function generateWhatsAppMessage(cartItems: CartItem[], customerData: Order): string {
  let message = `طلب جديد من موقع NAFAES | نفائس\n\n`;
  message += `بيانات العميل:\n`;
  message += `الاسم: ${customerData.name}\n`;
  message += `الهاتف: ${customerData.phone}\n`;
  message += `المنطقة: ${customerData.area}\n`;
  message += `العنوان: ${customerData.address}\n`;
  if (customerData.notes) {
    message += `الملاحظات: ${customerData.notes}\n`;
  }
  
  message += `\nالمنتجات:\n`;
  cartItems.forEach((item, index) => {
    message += `${index + 1}. ${item.product.nameEn} - ${item.product.nameAr}\n`;
    message += `   الكمية: ${item.quantity} | السعر: ${formatPrice(item.product.price)}\n`;
  });
  
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  message += `\nالمجموع الفرعي: ${formatPrice(subtotal)}\n`;
  message += `رسوم التوصيل: ${formatPrice(deliveryFee)}\n`;
  message += `الإجمالي النهائي: ${formatPrice(subtotal + deliveryFee)}\n\n`;
  message += `طريقة الدفع: ${customerData.paymentMethod === 'cash' ? 'كاش عند الاستلام' : 'رابط دفع لينك'}\n\n`;
  message += `أرغب بتأكيد الطلب.`;
  
  return encodeURIComponent(message);
}