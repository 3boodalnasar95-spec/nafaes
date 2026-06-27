import { supabase, isSupabaseConfigured } from './supabase';
import type { Coupon } from '@/types/database';

export async function getCoupons(): Promise<Coupon[]> {
  if (!isSupabaseConfigured || !supabase) {
    console.log('Supabase not configured, returning empty coupons');
    return [];
  }
  try {
    const { data, error } = await supabase
      .from('coupons')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      console.error('Error fetching coupons:', error);
      return [];
    }
    return (data as Coupon[]) || [];
  } catch (err) {
    console.error('Exception fetching coupons:', err);
    return [];
  }
}

export async function createCoupon(
  data: Omit<Coupon, 'id' | 'created_at' | 'updated_at' | 'used_count'>
): Promise<Coupon | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  try {
    const now = new Date().toISOString();
    const { data: created, error } = await supabase
      .from('coupons')
      .insert({
        ...data,
        used_count: 0,
        created_at: now,
        updated_at: now,
      })
      .select()
      .single();
    if (error) {
      console.error('Error creating coupon:', error);
      return null;
    }
    return created as Coupon;
  } catch (err) {
    console.error('Exception creating coupon:', err);
    return null;
  }
}

export async function updateCoupon(id: string, updates: Partial<Coupon>): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;
  try {
    const { error } = await supabase
      .from('coupons')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id);
    if (error) {
      console.error('Error updating coupon:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Exception updating coupon:', err);
    return false;
  }
}

export async function deleteCoupon(id: string): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;
  try {
    const { error } = await supabase
      .from('coupons')
      .delete()
      .eq('id', id);
    if (error) {
      console.error('Error deleting coupon:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Exception deleting coupon:', err);
    return false;
  }
}

export async function validateCoupon(
  code: string,
  orderAmount: number
): Promise<{ valid: boolean; coupon?: Coupon; discount?: number; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    return { valid: false, error: 'Database not configured' };
  }
  try {
    const { data, error } = await supabase
      .from('coupons')
      .select('*')
      .eq('code', code.toUpperCase().trim())
      .single();
    if (error || !data) {
      return { valid: false, error: 'كود الكوبون غير موجود' };
    }
    const coupon = data as Coupon;
    const now = new Date();
    if (!coupon.is_active) {
      return { valid: false, error: 'هذا الكوبون غير فعّال' };
    }
    if (coupon.start_date && new Date(coupon.start_date) > now) {
      return { valid: false, error: 'هذا الكوبون لم يبدأ بعد' };
    }
    if (coupon.end_date && new Date(coupon.end_date) < now) {
      return { valid: false, error: 'انتهت صلاحية هذا الكوبون' };
    }
    if (coupon.usage_limit !== null && coupon.usage_limit !== undefined && coupon.used_count >= coupon.usage_limit) {
      return { valid: false, error: 'تم استنفاد عدد استخدامات هذا الكوبون' };
    }
    if (coupon.min_order_amount && orderAmount < coupon.min_order_amount) {
      return {
        valid: false,
        error: `الحد الأدنى للطلب ${coupon.min_order_amount.toFixed(3)} د.ك`,
      };
    }

    let discount = 0;
    if (coupon.type === 'percentage') {
      discount = (orderAmount * coupon.value) / 100;
      if (coupon.max_discount_amount && discount > coupon.max_discount_amount) {
        discount = coupon.max_discount_amount;
      }
    } else if (coupon.type === 'fixed') {
      discount = coupon.value;
    } else if (coupon.type === 'free_delivery') {
      discount = 0;
    }

    discount = Math.min(discount, orderAmount);

    return { valid: true, coupon, discount };
  } catch (err) {
    console.error('Exception validating coupon:', err);
    return { valid: false, error: 'حدث خطأ أثناء التحقق من الكوبون' };
  }
}