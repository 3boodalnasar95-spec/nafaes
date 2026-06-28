import { supabase, isSupabaseConfigured } from './supabase';
import { PRODUCT_CATALOG } from '@/data/products';

export interface ProductSeed {
  name_ar: string;
  name_en: string;
  slug: string;
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

const costMargin: Record<string, number> = {
  '20ml': 0.55,
  '120ml': 0.50,
  '500ml': 0.45,
};

export const seedProducts: ProductSeed[] = PRODUCT_CATALOG.flatMap(catalog =>
  catalog.variants.map(v => {
    const margin = costMargin[v.size] ?? 0.5;
    return {
      name_ar: `${catalog.name_ar} - ${v.size}`,
      name_en: `${catalog.name_en} ${v.size}`,
      slug: `${catalog.id}-${v.size.replace('ml', '')}`,
      type: catalog.type,
      price: v.price,
      cost_price: Math.round(v.price * margin * 1000) / 1000,
      stock_quantity: v.stock,
      min_stock_level: 10,
      sku: v.sku,
      images: [catalog.image],
      specs: {
        'الحجم': v.size,
        'الوصف': catalog.description_short,
      },
      features: catalog.features,
    };
  })
);

export async function seedAllProducts(): Promise<{ success: boolean; message: string; count: number }> {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, message: 'Supabase not configured', count: 0 };
  }

  try {
    let insertedCount = 0;

    for (const product of seedProducts) {
      const { data: existing } = await supabase
        .from('products')
        .select('id')
        .eq('sku', product.sku)
        .maybeSingle();

      if (existing) {
        const { error: updateError } = await supabase
          .from('products')
          .update({
            name_ar: product.name_ar,
            name_en: product.name_en,
            slug: product.slug,
            type: product.type,
            price: product.price,
            cost_price: product.cost_price,
            stock_quantity: product.stock_quantity,
            min_stock_level: product.min_stock_level,
            images: product.images,
            specs: product.specs,
            features: product.features,
            is_active: true,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existing.id);

        if (!updateError) insertedCount++;
      } else {
        const { error: insertError } = await supabase.from('products').insert({
          name_ar: product.name_ar,
          name_en: product.name_en,
          slug: product.slug,
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
      message: `تم إضافة/تحديث ${insertedCount} منتج (${PRODUCT_CATALOG.length} منتج × 3 أحجام) بنجاح`,
      count: insertedCount,
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
    .order('name_ar', { ascending: true });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data || [];
}