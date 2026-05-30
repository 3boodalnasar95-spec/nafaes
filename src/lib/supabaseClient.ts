import { createClient } from '@supabase/supabase-js';

// Environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create client only if credentials exist
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

export interface Order {
  id?: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  governorate: string;
  area: string;
  area_id: string;
  address: string;
  notes: string;
  payment_method: 'cash' | 'link';
  subtotal: number;
  delivery_fee: number;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'shipped' | 'delivered' | 'cancelled';
  source: string;
  created_at?: string;
  updated_at?: string;
}

export interface OrderItem {
  id?: string;
  order_id: string;
  product_id: string;
  product_name_ar: string;
  product_name_en: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at?: string;
}

export interface Product {
  id?: string;
  name_ar: string;
  name_en: string;
  slug: string;
  type: string;
  price: number;
  cost_price: number;
  stock_quantity: number;
  min_stock_level: number;
  sku: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

// Create new order
export async function createOrder(order: Omit<Order, 'id' | 'created_at' | 'updated_at'>, items: Omit<OrderItem, 'id' | 'order_id' | 'created_at'>[]): Promise<{ success: boolean; orderId?: string; orderNumber?: string; error?: string }> {
  if (!supabase) {
    return { success: false, error: 'Database not configured' };
  }

  try {
    // Insert order
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert(order)
      .select('id, order_number')
      .single();

    if (orderError) throw orderError;
    if (!orderData) throw new Error('Failed to create order');

    // Insert order items
    const orderItems = items.map(item => ({
      ...item,
      order_id: orderData.id
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    // Update product stock
    for (const item of items) {
      await supabase.rpc('decrement_stock', {
        p_product_id: item.product_id,
        p_quantity: item.quantity
      });
    }

    return { 
      success: true, 
      orderId: orderData.id, 
      orderNumber: orderData.order_number 
    };
  } catch (error) {
    console.error('Error creating order:', error);
    return { success: false, error: (error as Error).message };
  }
}

// Get all orders
export async function getOrders(): Promise<Order[]> {
  if (!supabase) return [];
  
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
  
  return data || [];
}

// Get order with items
export async function getOrderWithItems(orderId: string): Promise<{ order: Order | null; items: OrderItem[] }> {
  if (!supabase) return { order: null, items: [] };

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single();

  if (orderError) {
    console.error('Error fetching order:', orderError);
    return { order: null, items: [] };
  }

  const { data: items, error: itemsError } = await supabase
    .from('order_items')
    .select('*')
    .eq('order_id', orderId);

  if (itemsError) {
    console.error('Error fetching order items:', itemsError);
  }

  return { order, items: items || [] };
}

// Update order status
export async function updateOrderStatus(orderId: string, status: Order['status']): Promise<boolean> {
  if (!supabase) return false;

  const { error } = await supabase
    .from('orders')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', orderId);

  return !error;
}

// Get all products
export async function getAllProducts(): Promise<Product[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('name_ar');

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data || [];
}

// Update product stock
export async function updateProductStock(productId: string, quantity: number): Promise<boolean> {
  if (!supabase) return false;

  const { error } = await supabase
    .from('products')
    .update({ stock_quantity: quantity, updated_at: new Date().toISOString() })
    .eq('id', productId);

  return !error;
}

// Get dashboard stats
export async function getDashboardStats(): Promise<{
  totalOrders: number;
  pendingOrders: number;
  totalRevenue: number;
  lowStockProducts: number;
}> {
  if (!supabase) {
    return { totalOrders: 0, pendingOrders: 0, totalRevenue: 0, lowStockProducts: 0 };
  }

  const [ordersResult, productsResult] = await Promise.all([
    supabase.from('orders').select('id, status, total'),
    supabase.from('products').select('id, stock_quantity, min_stock_level')
  ]);

  const orders = ordersResult.data || [];
  const products = productsResult.data || [];

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const lowStockProducts = products.filter(p => p.stock_quantity <= (p.min_stock_level || 5)).length;

  return { totalOrders, pendingOrders, totalRevenue, lowStockProducts };
}