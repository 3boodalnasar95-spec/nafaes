import { supabase, isSupabaseConfigured } from './supabase';

export interface ProductSeed {
  name_ar: string;
  name_en: string;
  type: string;
  price: number;
  cost_price: number;
  stock_quantity: number;
  min_stock_level: number;
  sku: string;
  images: string[];
  specs: Record<string, string>;
  features: string[];
}

export const seedProducts: ProductSeed[] = [
  {
    name_ar: 'إيلان 360 نوماد',
    name_en: 'ELAN 360 NOMAD',
    type: 'devices',
    price: 49,
    cost_price: 25,
    stock_quantity: 50,
    min_stock_level: 10,
    sku: 'ELAN-NOMAD-360',
    images: ['/images/elan-nomad.png'],
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
  },
  {
    name_ar: 'إيلان 360 برايم',
    name_en: 'ELAN 360 PRIME',
    type: 'devices',
    price: 42,
    cost_price: 20,
    stock_quantity: 40,
    min_stock_level: 10,
    sku: 'ELAN-PRIME-360',
    images: ['/images/elan-prime.png'],
    specs: {
      'السعة': '120 مل',
      'نوع التشغيل': 'كهربائي مباشر',
      'الانتشار': '360°',
      'التحكم': 'Touch / Bluetooth / Remote',
      'مستوى الصوت': 'أقل من 34 dB',
      'التغطية': 'حتى 120 م²',
    },
    features: ['فخامة يومية', 'تشغيل ثابت', 'رائحة متوازنة', 'تصميم أنيق', 'مناسب للمنازل والمكاتب'],
  },
  {
    name_ar: 'نوار ماجستيه',
    name_en: 'NOIR MAJESTÉ',
    type: 'devices',
    price: 59,
    cost_price: 30,
    stock_quantity: 30,
    min_stock_level: 5,
    sku: 'NOIR-MAJESTE',
    images: ['/images/noir-majeste.png'],
    specs: {
      'السعة': '200 مل',
      'التغطية': '300–500m³',
      'مستوى الصوت': 'أقل من 40 dBA',
      'التحكم': 'Touch Buttons / Bluetooth',
      'الشاشة': 'LCD',
    },
    features: ['مناسب للمساحات الكبيرة', 'تصميم احترافي', 'تحكم ذكي', 'تشغيل هادئ'],
  },
  {
    name_ar: 'فورست ريزيرف',
    name_en: 'FOREST RESERVE',
    type: 'gifts',
    price: 13.9,
    cost_price: 7,
    stock_quantity: 60,
    min_stock_level: 15,
    sku: 'FOREST-RESERVE-GIFT',
    images: ['/images/forest-reserve.png'],
    specs: {
      'النوع': 'Gift Set',
      'الطابع العطري': 'خشبي / دافئ',
      'الاستخدام': 'هدية جاهزة وأنيقة',
    },
    features: ['هدية فاخرة', 'جاهز للإهداء', 'تغليف أنيق', 'رائحة خشبية دافئة'],
  },
  {
    name_ar: 'أمبر سانتال',
    name_en: 'AMBER SANTAL',
    type: 'diffusers',
    price: 10.9,
    cost_price: 5,
    stock_quantity: 80,
    min_stock_level: 20,
    sku: 'AMBER-SANTAL-DIFF',
    images: ['/images/amber-santal.png'],
    specs: {
      'النوع': 'Reed Diffuser',
      'الانتشار': 'أعواد خشبية',
      'مدة الاستخدام': 'أكثر من 60 يوم',
      'التغطية': '20–30 م²',
    },
    features: ['زجاجة أنيقة', 'أعواد طبيعية', 'رائحة دافئة وخشبية', 'تغليف فاخر'],
  },
];

export async function seedAllProducts(): Promise<{ success: boolean; message: string; count: number }> {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, message: 'Supabase not configured', count: 0 };
  }

  try {
    let insertedCount = 0;

    for (const product of seedProducts) {
      // Check if product already exists
      const { data: existing } = await supabase
        .from('products')
        .select('id')
        .eq('name_en', product.name_en)
        .single();

      if (existing) {
        // Update existing product
        const { error: updateError } = await supabase
          .from('products')
          .update({
            name_ar: product.name_ar,
            name_en: product.name_en,
            type: product.type,
            price: product.price,
            cost_price: product.cost_price,
            stock_quantity: product.stock_quantity,
            min_stock_level: product.min_stock_level,
            sku: product.sku,
            images: product.images,
            specs: product.specs,
            features: product.features,
            is_active: true,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existing.id);

        if (!updateError) insertedCount++;
      } else {
        // Insert new product
        const { error: insertError } = await supabase.from('products').insert({
          name_ar: product.name_ar,
          name_en: product.name_en,
          slug: product.name_en.toLowerCase().replace(/\s+/g, '-'),
          type: product.type,
          price: product.price,
          cost_price: product.cost_price,
          stock_quantity: product.stock_quantity,
          min_stock_level: product.min_stock_level,
          sku: product.sku,
          images: product.images,
          specs: product.specs,
          features: product.features,
          is_active: true,
        });

        if (!insertError) insertedCount++;
      }
    }

    return { 
      success: true, 
      message: `تم إضافة/تحديث ${insertedCount} منتج بنجاح`, 
      count: insertedCount 
    };
  } catch (error) {
    console.error('Error seeding products:', error);
    return { success: false, message: 'حدث خطأ', count: 0 };
  }
}

export async function getProductsFromDB(): Promise<any[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: true });
  
  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  
  return data || [];
}