import { supabase, isSupabaseConfigured } from './supabase';
import type { Review } from '@/types/database';

export async function getReviews(): Promise<Review[]> {
  if (!isSupabaseConfigured || !supabase) {
    console.log('Supabase not configured, returning empty reviews');
    return [];
  }
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*, product:products(name_ar, name_en), customer:customers(name)')
      .order('created_at', { ascending: false });
    if (error) {
      console.error('Error fetching reviews:', error);
      return [];
    }
    return (data as Review[]) || [];
  } catch (err) {
    console.error('Exception fetching reviews:', err);
    return [];
  }
}

export async function approveReview(id: string): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;
  try {
    const { error } = await supabase
      .from('reviews')
      .update({ is_approved: true, updated_at: new Date().toISOString() })
      .eq('id', id);
    if (error) {
      console.error('Error approving review:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Exception approving review:', err);
    return false;
  }
}

export async function rejectReview(id: string): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;
  try {
    const { error } = await supabase
      .from('reviews')
      .update({ is_approved: false, updated_at: new Date().toISOString() })
      .eq('id', id);
    if (error) {
      console.error('Error rejecting review:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Exception rejecting review:', err);
    return false;
  }
}

export async function deleteReview(id: string): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;
  try {
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', id);
    if (error) {
      console.error('Error deleting review:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Exception deleting review:', err);
    return false;
  }
}

export async function getProductReviews(productId: string): Promise<Review[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*, product:products(name_ar, name_en), customer:customers(name)')
      .eq('product_id', productId)
      .eq('is_approved', true)
      .order('created_at', { ascending: false });
    if (error) {
      console.error('Error fetching product reviews:', error);
      return [];
    }
    return (data as Review[]) || [];
  } catch (err) {
    console.error('Exception fetching product reviews:', err);
    return [];
  }
}

export async function createReview(
  data: Omit<Review, 'id' | 'created_at' | 'updated_at' | 'helpful_count' | 'is_approved'>
): Promise<Review | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  try {
    const now = new Date().toISOString();
    const { data: created, error } = await supabase
      .from('reviews')
      .insert({
        ...data,
        is_approved: false,
        helpful_count: 0,
        created_at: now,
        updated_at: now,
      })
      .select()
      .single();
    if (error) {
      console.error('Error creating review:', error);
      return null;
    }
    return created as Review;
  } catch (err) {
    console.error('Exception creating review:', err);
    return null;
  }
}