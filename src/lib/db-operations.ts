import { supabase, isSupabaseConfigured } from './supabase';
import type { 
  Customer, Product, Order, Invoice, Transaction, 
  InventoryLog, DashboardStats, Category, Coupon 
} from '@/types/database';

// ==================== TYPES ====================

export interface CustomerInput {
  name: string;
  phone: string;
  email?: string;
  area?: string;
  address?: string;
  notes?: string;
}

export interface ProductInput {
  name_ar: string;
  name_en: string;
  type: string;
  category_id?: string;
  price: number;
  cost_price?: number;
  description_short?: string;
  description_full?: string;
  specs?: Record<string, string>;
  features?: string[];
  image?: string;
  sku?: string;
  stock_quantity?: number;
  min_stock_level?: number;
  is_active?: boolean;
}

export interface OrderInput {
  customer_id?: string;
  customer_name: string;
  customer_phone: string;
  customer_area: string;
  customer_address: string;
  subtotal: number;
  delivery_fee: number;
  total: number;
  payment_method: 'cash' | 'link' | 'knet';
  payment_status?: 'pending' | 'paid';
  notes?: string;
  items: {
    product_id: string;
    name: string;
    quantity: number;
    unit_price: number;
    total_price: number;
  }[];
}

export interface TransactionInput {
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  date?: string;
  reference_type?: string;
  reference_id?: string;
}

// ==================== HELPERS ====================

const formatDate = (date: string | Date) => {
  if (typeof date === 'string') return date.split('T')[0];
  return date.toISOString().split('T')[0];
};

// ==================== CUSTOMERS ====================

export async function getCustomers(search?: string): Promise<Customer[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  
  let query = supabase
    .from('customers')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (search) {
    query = query.or(`name.ilike.%${search}%,phone.ilike.%${search}%,area.ilike.%${search}%`);
  }
  
  const { data, error } = await query;
  if (error) { console.error('Error:', error); return []; }
  return data || [];
}

export async function getCustomer(id: string): Promise<Customer | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  const { data, error } = await supabase
    .from('customers')
    .select('*, customer_addresses(*)')
    .eq('id', id)
    .single();
  if (error) return null;
  return data;
}

export async function createCustomer(customer: CustomerInput): Promise<Customer | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  
  const { data, error } = await supabase
    .from('customers')
    .insert(customer)
    .select()
    .single();
  
  if (error) { console.error('Error:', error); return null; }
  return data;
}

export async function updateCustomer(id: string, updates: Partial<Customer>): Promise<Customer | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  
  const { data, error } = await supabase
    .from('customers')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  
  if (error) return null;
  return data;
}

export async function deleteCustomer(id: string): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;
  const { error } = await supabase.from('customers').delete().eq('id', id);
  return !error;
}

// ==================== CATEGORIES ====================

export async function getCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });
  if (error) return [];
  return data || [];
}

export async function createCategory(category: Partial<Category>): Promise<Category | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  const { data, error } = await supabase
    .from('categories')
    .insert(category)
    .select()
    .single();
  if (error) return null;
  return data;
}

// ==================== PRODUCTS ====================

export async function getProducts(filters?: {
  category?: string;
  search?: string;
  featured?: boolean;
}): Promise<Product[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  
  let query = supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('is_active', true)
    .order('created_at', { ascending: false });
  
  if (filters?.category) {
    query = query.eq('category_id', filters.category);
  }
  if (filters?.featured) {
    query = query.eq('is_featured', true);
  }
  if (filters?.search) {
    query = query.or(`name_ar.ilike.%${filters.search}%,name_en.ilike.%${filters.search}%,sku.ilike.%${filters.search}%`);
  }
  
  const { data, error } = await query;
  if (error) return [];
  return data || [];
}

export async function getProduct(id: string): Promise<Product | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('id', id)
    .single();
  if (error) return null;
  return data;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();
  if (error) return null;
  return data;
}

export async function createProduct(product: ProductInput): Promise<Product | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  
  const slug = product.name_ar
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06FF]/g, '-')
    .replace(/-+/g, '-');
  
  const { data, error } = await supabase
    .from('products')
    .insert({
      ...product,
      slug: slug + '-' + Date.now().toString(36)
    })
    .select()
    .single();
  
  if (error) { console.error('Error:', error); return null; }
  return data;
}

export async function updateProduct(id: string, updates: Partial<ProductInput>): Promise<Product | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  
  const { data, error } = await supabase
    .from('products')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  
  if (error) return null;
  return data;
}

export async function deleteProduct(id: string): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;
  const { error } = await supabase
    .from('products')
    .update({ is_active: false })
    .eq('id', id);
  return !error;
}

export async function updateProductStock(id: string, quantity: number): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;
  const { error } = await supabase.rpc('decrement_stock', { product_id: id, quantity });
  if (error) {
    const { error: updateError } = await supabase
      .from('products')
      .update({ stock_quantity: quantity })
      .eq('id', id);
    return !updateError;
  }
  return true;
}

// ==================== ORDERS ====================

export async function getOrders(filters?: {
  status?: string;
  search?: string;
  date_from?: string;
  date_to?: string;
}): Promise<Order[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  
  let query = supabase
    .from('orders')
    .select(`
      *,
      customer:customers(*),
      items:order_items(*)
    `)
    .order('created_at', { ascending: false });
  
  if (filters?.status && filters.status !== 'all') {
    query = query.eq('status', filters.status);
  }
  if (filters?.search) {
    query = query.or(`order_number.ilike.%${filters.search}%,customer_name.ilike.%${filters.search}%,customer_phone.ilike.%${filters.search}%`);
  }
  if (filters?.date_from) {
    query = query.gte('created_at', filters.date_from);
  }
  if (filters?.date_to) {
    query = query.lte('created_at', filters.date_to + 'T23:59:59');
  }
  
  const { data, error } = await query;
  if (error) { console.error('Error:', error); return []; }
  return data || [];
}

export async function getOrder(id: string): Promise<Order | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      customer:customers(*),
      items:order_items(*)
    `)
    .eq('id', id)
    .single();
  if (error) return null;
  return data;
}

export async function createOrder(order: OrderInput): Promise<Order | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  
  // Create customer if not exists
  let customerId = order.customer_id;
  if (!customerId && order.customer_phone) {
    const existingCustomer = await supabase
      .from('customers')
      .select('id')
      .eq('phone', order.customer_phone)
      .single();
    
    if (existingCustomer.data) {
      customerId = existingCustomer.data.id;
    } else {
      const { data: newCustomer } = await supabase
        .from('customers')
        .insert({
          name: order.customer_name,
          phone: order.customer_phone,
          area: order.customer_area,
          address_text: order.customer_address
        })
        .select()
        .single();
      customerId = newCustomer?.id;
    }
  }
  
  // Create order
  const { data: newOrder, error: orderError } = await supabase
    .from('orders')
    .insert({
      customer_id: customerId,
      customer_name: order.customer_name,
      customer_phone: order.customer_phone,
      customer_area: order.customer_area,
      customer_address: order.customer_address,
      subtotal: order.subtotal,
      delivery_fee: order.delivery_fee,
      total: order.total,
      payment_method: order.payment_method,
      payment_status: order.payment_status || 'pending',
      notes: order.notes,
      source: 'website',
      status: 'pending'
    })
    .select()
    .single();
  
  if (orderError || !newOrder) {
    console.error('Order error:', orderError);
    return null;
  }
  
  // Create order items
  const orderItems = order.items.map(item => ({
    order_id: newOrder.id,
    product_id: item.product_id,
    name: item.name,
    quantity: item.quantity,
    unit_price: item.unit_price,
    total_price: item.total_price
  }));
  
  await supabase.from('order_items').insert(orderItems);
  
  // Log inventory
  for (const item of order.items) {
    await supabase.from('inventory_logs').insert({
      product_id: item.product_id,
      type: 'out',
      quantity: item.quantity,
      reason: `Order ${newOrder.order_number}`,
      reference_type: 'order',
      reference_id: newOrder.id
    });
  }
  
  return newOrder;
}

export async function updateOrderStatus(id: string, status: string, notes?: string): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;
  
  const updates: Record<string, unknown> = { 
    status, 
    updated_at: new Date().toISOString() 
  };
  
  if (status === 'delivered') {
    updates.delivered_at = new Date().toISOString();
  }
  
  if (status === 'paid' || (status === 'delivered' && updates.payment_status !== 'paid')) {
    updates.payment_status = 'paid';
    updates.paid_at = new Date().toISOString();
  }
  
  const { error } = await supabase
    .from('orders')
    .update(updates)
    .eq('id', id);
  
  if (!error) {
    // Log status change
    await supabase.from('order_status_history').insert({
      order_id: id,
      status,
      notes,
      changed_by: 'admin'
    });
    
    // Create transaction for delivered orders
    if (status === 'delivered') {
      const order = await getOrder(id);
      if (order) {
        await supabase.from('transactions').insert({
          type: 'income',
          category: 'sales',
          amount: order.total,
          description: `طلب ${order.order_number}`,
          reference_type: 'order',
          reference_id: order.id,
          date: formatDate(new Date())
        });
      }
    }
  }
  
  return !error;
}

export async function cancelOrder(id: string, reason?: string): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;
  
  // Get order items to restore stock
  const { data: items } = await supabase
    .from('order_items')
    .select('product_id, quantity')
    .eq('order_id', id);
  
  // Restore stock
  if (items) {
    for (const item of items) {
      await supabase.rpc('increment_stock', { 
        product_id: item.product_id, 
        quantity: item.quantity 
      });
      
      await supabase.from('inventory_logs').insert({
        product_id: item.product_id,
        type: 'in',
        quantity: item.quantity,
        reason: `Cancel order - ${reason || 'No reason'}`,
        reference_type: 'order',
        reference_id: id
      });
    }
  }
  
  const { error } = await supabase
    .from('orders')
    .update({ 
      status: 'cancelled', 
      cancellation_reason: reason,
      updated_at: new Date().toISOString()
    })
    .eq('id', id);
  
  return !error;
}

// ==================== INVOICES ====================

export async function getInvoices(filters?: {
  status?: string;
  search?: string;
}): Promise<Invoice[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  
  let query = supabase
    .from('invoices')
    .select(`
      *,
      customer:customers(*),
      order:orders(*)
    `)
    .order('created_at', { ascending: false });
  
  if (filters?.status) {
    query = query.eq('status', filters.status);
  }
  if (filters?.search) {
    query = query.or(`invoice_number.ilike.%${filters.search}%,customer:name.ilike.%${filters.search}%`);
  }
  
  const { data, error } = await query;
  if (error) return [];
  return data || [];
}

export async function createInvoice(orderId: string): Promise<Invoice | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  
  const order = await getOrder(orderId);
  if (!order) return null;
  
  const { data, error } = await supabase
    .from('invoices')
    .insert({
      order_id: orderId,
      customer_id: order.customer_id,
      type: 'invoice',
      subtotal: order.subtotal,
      delivery_fee: order.delivery_fee,
      total: order.total,
      status: 'draft',
      payment_method: order.payment_method
    })
    .select()
    .single();
  
  if (error) return null;
  return data;
}

export async function updateInvoiceStatus(id: string, status: string): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;
  
  const updates: Record<string, unknown> = { status };
  if (status === 'paid') {
    updates.paid_at = new Date().toISOString();
  }
  
  const { error } = await supabase
    .from('invoices')
    .update(updates)
    .eq('id', id);
  
  return !error;
}

// ==================== TRANSACTIONS ====================

export async function getTransactions(filters?: {
  type?: 'income' | 'expense';
  category?: string;
  date_from?: string;
  date_to?: string;
}): Promise<Transaction[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  
  let query = supabase
    .from('transactions')
    .select('*')
    .order('date', { ascending: false });
  
  if (filters?.type) {
    query = query.eq('type', filters.type);
  }
  if (filters?.category) {
    query = query.eq('category', filters.category);
  }
  if (filters?.date_from) {
    query = query.gte('date', filters.date_from);
  }
  if (filters?.date_to) {
    query = query.lte('date', filters.date_to);
  }
  
  const { data, error } = await query;
  if (error) return [];
  return data || [];
}

export async function createTransaction(transaction: TransactionInput): Promise<Transaction | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  
  const { data, error } = await supabase
    .from('transactions')
    .insert({
      ...transaction,
      date: transaction.date || formatDate(new Date())
    })
    .select()
    .single();
  
  if (error) { console.error('Error:', error); return null; }
  return data;
}

export async function deleteTransaction(id: string): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;
  const { error } = await supabase.from('transactions').delete().eq('id', id);
  return !error;
}

// ==================== INVENTORY ====================

export async function getInventoryLogs(productId?: string): Promise<InventoryLog[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  
  let query = supabase
    .from('inventory_logs')
    .select('*, product:products(*)')
    .order('created_at', { ascending: false });
  
  if (productId) {
    query = query.eq('product_id', productId);
  }
  
  const { data, error } = await query;
  if (error) return [];
  return data || [];
}

export async function logInventoryChange(
  productId: string,
  type: 'in' | 'out' | 'adjustment',
  quantity: number,
  reason: string
): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;
  
  // Get current stock
  const { data: product } = await supabase
    .from('products')
    .select('stock_quantity')
    .eq('id', productId)
    .single();
  
  if (!product) return false;
  
  const balanceBefore = product.stock_quantity;
  const balanceAfter = type === 'out' 
    ? balanceBefore - quantity 
    : balanceBefore + quantity;
  
  // Update stock
  await supabase
    .from('products')
    .update({ stock_quantity: balanceAfter })
    .eq('id', productId);
  
  // Log the change
  await supabase.from('inventory_logs').insert({
    product_id: productId,
    type,
    quantity,
    balance_before: balanceBefore,
    balance_after: balanceAfter,
    reason,
    created_by: 'admin'
  });
  
  return true;
}

// ==================== COUPONS ====================

export async function getCoupons(): Promise<Coupon[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  const { data, error } = await supabase
    .from('coupons')
    .select('*')
    .eq('is_active', true)
    .gte('end_date', new Date().toISOString())
    .order('created_at', { ascending: false });
  if (error) return [];
  return data || [];
}

export async function validateCoupon(code: string, orderAmount: number): Promise<Coupon | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  
  const { data, error } = await supabase
    .from('coupons')
    .select('*')
    .eq('code', code)
    .eq('is_active', true)
    .gte('start_date', new Date().toISOString())
    .lte('end_date', new Date().toISOString())
    .single();
  
  if (error || !data) return null;
  
  // Check usage limit
  if (data.usage_limit && data.used_count >= data.usage_limit) return null;
  
  // Check minimum order amount
  if (data.min_order_amount && orderAmount < data.min_order_amount) return null;
  
  return data;
}

export async function useCoupon(couponId: string, customerId?: string, orderId?: string, discountAmount?: number): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;
  
  // Update usage count
  await supabase.rpc('increment_coupon_usage', { coupon_id: couponId });
  
  // Log usage
  if (customerId || orderId) {
    await supabase.from('coupon_usage').insert({
      coupon_id: couponId,
      customer_id: customerId,
      order_id: orderId,
      discount_amount: discountAmount || 0
    });
  }
  
  return true;
}

// ==================== ANALYTICS & STATS ====================

export async function getDashboardStats(): Promise<DashboardStats> {
  if (!isSupabaseConfigured || !supabase) {
    return {
      total_revenue: 0,
      total_orders: 0,
      total_customers: 0,
      total_products: 0,
      pending_orders: 0,
      low_stock_products: 0,
      today_revenue: 0,
      today_orders: 0
    };
  }
  
  const today = formatDate(new Date());
  
  // Parallel queries for better performance
  const [
    customersResult,
    productsResult,
    ordersResult,
    transactionsResult
  ] = await Promise.all([
    supabase.from('customers').select('id, total_spent', { count: 'exact' }),
    supabase.from('products').select('id, stock_quantity, min_stock_level', { count: 'exact' }),
    supabase.from('orders').select('*', { count: 'exact' }),
    supabase.from('transactions').select('amount').eq('type', 'income')
  ]);
  
  const customers = customersResult.data || [];
  const products = productsResult.data || [];
  const orders = ordersResult.data || [];
  const transactions = transactionsResult.data || [];
  
  const totalRevenue = transactions.reduce((sum, t) => sum + Number(t.amount), 0);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const lowStockProducts = products.filter(p => 
    p.stock_quantity <= (p.min_stock_level || 5)
  ).length;
  
  const todayOrders = orders.filter(o => 
    o.created_at && o.created_at.startsWith(today)
  );
  
  const todayRevenue = todayOrders.reduce((sum, o) => sum + Number(o.total), 0);
  
  return {
    total_revenue: totalRevenue,
    total_orders: orders.length,
    total_customers: customers.length,
    total_products: products.length,
    pending_orders: pendingOrders,
    low_stock_products: lowStockProducts,
    today_revenue: todayRevenue,
    today_orders: todayOrders.length
  };
}

export async function getSalesReport(dateFrom: string, dateTo: string): Promise<{
  daily: { date: string; orders: number; revenue: number }[];
  byStatus: Record<string, number>;
  topProducts: { name: string; quantity: number; revenue: number }[];
}> {
  if (!isSupabaseConfigured || !supabase) {
    return { daily: [], byStatus: {}, topProducts: [] };
  }
  
  // Get orders in date range
  const { data: orders } = await supabase
    .from('orders')
    .select('id, created_at, total, status')
    .gte('created_at', dateFrom)
    .lte('created_at', dateTo + 'T23:59:59');
  
  if (!orders) return { daily: [], byStatus: {}, topProducts: [] };
  
  // Group by date
  const dailyMap: Record<string, { orders: number; revenue: number }> = {};
  const statusMap: Record<string, number> = {};
  
  for (const order of orders) {
    const date = order.created_at.split('T')[0];
    
    if (!dailyMap[date]) dailyMap[date] = { orders: 0, revenue: 0 };
    dailyMap[date].orders++;
    dailyMap[date].revenue += Number(order.total);
    
    statusMap[order.status] = (statusMap[order.status] || 0) + 1;
  }
  
  const daily = Object.entries(dailyMap)
    .map(([date, data]) => ({ date, ...data }))
    .sort((a, b) => a.date.localeCompare(b.date));
  
  // Get top products - fetch order items by order IDs
  const { data: orderItems } = await supabase
    .from('order_items')
    .select('name, quantity, total_price')
    .in('order_id', orders.map(o => o.id));
  
  const productMap: Record<string, { quantity: number; revenue: number }> = {};
  for (const item of orderItems || []) {
    if (!productMap[item.name]) productMap[item.name] = { quantity: 0, revenue: 0 };
    productMap[item.name].quantity += item.quantity;
    productMap[item.name].revenue += Number(item.total_price);
  }
  
  const topProducts = Object.entries(productMap)
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 10);
  
  return { daily, byStatus: statusMap, topProducts };
}

export async function getCustomerStats(customerId: string): Promise<{
  totalOrders: number;
  totalSpent: number;
  avgOrderValue: number;
  lastOrder: string | null;
  ordersByStatus: Record<string, number>;
}> {
  if (!isSupabaseConfigured || !supabase) {
    return { totalOrders: 0, totalSpent: 0, avgOrderValue: 0, lastOrder: null, ordersByStatus: {} };
  }
  
  const { data: customer } = await supabase
    .from('customers')
    .select('total_orders, total_spent')
    .eq('id', customerId)
    .single();
  
  const { data: orders } = await supabase
    .from('orders')
    .select('total, status, created_at')
    .eq('customer_id', customerId);
  
  const ordersByStatus: Record<string, number> = {};
  let lastOrder: string | null = null;
  
  for (const order of orders || []) {
    ordersByStatus[order.status] = (ordersByStatus[order.status] || 0) + 1;
    if (!lastOrder || order.created_at > lastOrder) {
      lastOrder = order.created_at;
    }
  }
  
  return {
    totalOrders: customer?.total_orders || orders?.length || 0,
    totalSpent: customer?.total_spent || 0,
    avgOrderValue: orders?.length ? (orders.reduce((s, o) => s + Number(o.total), 0) / orders.length) : 0,
    lastOrder,
    ordersByStatus
  };
}

// ==================== SETTINGS ====================

export async function getSettings(): Promise<Record<string, string>> {
  if (!isSupabaseConfigured || !supabase) {
    return {
      store_name: 'NAFAES | نفائس',
      store_phone: '66377312',
      whatsapp_number: '96566377312',
      delivery_fee: '2',
      address: 'الكويت'
    };
  }
  
  const { data, error } = await supabase
    .from('settings')
    .select('key, value');
  
  if (error) {
    return {
      store_name: 'NAFAES | نفائس',
      store_phone: '66377312',
      whatsapp_number: '96566377312',
      delivery_fee: '2'
    };
  }
  
  const settings: Record<string, string> = {};
  for (const item of data || []) {
    settings[item.key] = item.value;
  }
  return settings;
}

export async function updateSetting(key: string, value: string): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;
  
  const { error } = await supabase
    .from('settings')
    .upsert({ key, value, updated_at: new Date().toISOString() })
    .eq('key', key);
  
  return !error;
}

export async function updateSettings(settings: Record<string, string>): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;
  
  const updates = Object.entries(settings).map(([key, value]) => ({
    key,
    value,
    updated_at: new Date().toISOString()
  }));
  
  const { error } = await supabase.from('settings').upsert(updates);
  return !error;
}

// ==================== EXPORT DATA ====================

export async function exportOrders(format: 'csv' | 'json' = 'csv'): Promise<string> {
  const orders = await getOrders();
  
  if (format === 'json') {
    return JSON.stringify(orders, null, 2);
  }
  
  // CSV format
  const headers = [
    'Order Number', 'Date', 'Customer', 'Phone', 'Area', 'Address',
    'Subtotal', 'Delivery', 'Total', 'Status', 'Payment Method'
  ];
  
  const rows = orders.map(o => [
    o.order_number,
    o.created_at,
    o.customer_name,
    o.customer_phone,
    o.customer_area,
    o.customer_address,
    o.subtotal,
    o.delivery_fee,
    o.total,
    o.status,
    o.payment_method
  ].join(','));
  
  return [headers.join(','), ...rows].join('\n');
}

export async function exportProducts(): Promise<string> {
  const products = await getProducts();
  
  const headers = ['SKU', 'Name (AR)', 'Name (EN)', 'Price', 'Cost', 'Stock', 'Status'];
  const rows = products.map(p => [
    p.sku,
    p.name_ar,
    p.name_en,
    p.price,
    p.cost_price,
    p.stock_quantity,
    p.is_active ? 'Active' : 'Inactive'
  ].join(','));
  
  return [headers.join(','), ...rows].join('\n');
}