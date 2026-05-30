import { supabase, isSupabaseConfigured } from './supabase';
import type { 
  Customer, Product, Order, Invoice, Transaction, 
  InventoryLog, DashboardStats 
} from '@/types/database';

// ==================== CUSTOMERS ====================

export async function getCustomers(): Promise<Customer[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  const { data } = await supabase.from('customers').select('*').order('created_at', { ascending: false });
  return data || [];
}

export async function createCustomer(customer: Omit<Customer, 'id' | 'created_at' | 'updated_at'>): Promise<Customer | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  const { data } = await supabase.from('customers').insert(customer).select().single();
  return data;
}

export async function updateCustomer(id: string, updates: Partial<Customer>): Promise<Customer | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  const { data } = await supabase.from('customers').update(updates).eq('id', id).select().single();
  return data;
}

// ==================== PRODUCTS ====================

export async function getProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
  return data || [];
}

export async function createProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  const { data } = await supabase.from('products').insert(product).select().single();
  return data;
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  const { data } = await supabase.from('products').update(updates).eq('id', id).select().single();
  return data;
}

export async function updateStock(productId: string, quantity: number, type: 'in' | 'out', reason: string, createdBy: string): Promise<void> {
  if (!isSupabaseConfigured || !supabase) return;

  // Update product stock
  const { data: product } = await supabase.from('products').select('stock_quantity').eq('id', productId).single();
  if (product) {
    const newStock = type === 'in' 
      ? product.stock_quantity + quantity 
      : product.stock_quantity - quantity;
    
    await supabase.from('products').update({ stock_quantity: newStock }).eq('id', productId);
    
    // Log the change
    await supabase.from('inventory_logs').insert({
      product_id: productId,
      type,
      quantity,
      reason,
      created_by: createdBy
    });
  }
}

// ==================== ORDERS ====================

export async function getOrders(): Promise<Order[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  const { data } = await supabase
    .from('orders')
    .select('*, customer:customers(*), items:order_items(*, product:products(*))')
    .order('created_at', { ascending: false });
  return data || [];
}

export async function getOrder(id: string): Promise<Order | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  const { data } = await supabase
    .from('orders')
    .select('*, customer:customers(*), items:order_items(*, product:products(*))')
    .eq('id', id)
    .single();
  return data;
}

export async function createOrder(
  order: Omit<Order, 'id' | 'order_number' | 'created_at' | 'updated_at'>,
  items: Omit<OrderItem, 'id' | 'order_id'>[]
): Promise<Order | null> {
  if (!isSupabaseConfigured || !supabase) return null;

  // Generate order number
  const timestamp = new Date();
  const orderNumber = `ORD-${timestamp.getFullYear().toString().slice(-2)}${(timestamp.getMonth() + 1).toString().padStart(2, '0')}${timestamp.getDate().toString().padStart(2, '0')}-${timestamp.getHours().toString().padStart(2, '0')}${timestamp.getMinutes().toString().padStart(2, '0')}`;

  // Create order
  const { data: newOrder } = await supabase
    .from('orders')
    .insert({ ...order, order_number: orderNumber })
    .select()
    .single();

  if (!newOrder) return null;

  // Create order items
  const orderItems = items.map(item => ({
    ...item,
    order_id: newOrder.id,
    total_price: item.unit_price * item.quantity
  }));

  await supabase.from('order_items').insert(orderItems);

  // Update stock for each item
  for (const item of items) {
    await updateStock(item.product_id, item.quantity, 'out', `طلب رقم ${orderNumber}`, 'system');
  }

  // Record transaction
  await supabase.from('transactions').insert({
    type: 'income',
    category: 'sales',
    amount: newOrder.total,
    description: `طلب رقم ${orderNumber}`,
    reference_type: 'order',
    reference_id: newOrder.id
  });

  return newOrder;
}

export async function updateOrderStatus(id: string, status: Order['status']): Promise<void> {
  if (!isSupabaseConfigured || !supabase) return;
  await supabase.from('orders').update({ status }).eq('id', id);
}

// ==================== INVOICES ====================

export async function getInvoices(): Promise<Invoice[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  const { data } = await supabase
    .from('invoices')
    .select('*, order:orders(*), customer:customers(*)')
    .order('created_at', { ascending: false });
  return data || [];
}

export async function createInvoice(invoice: Omit<Invoice, 'id' | 'invoice_number' | 'created_at'>): Promise<Invoice | null> {
  if (!isSupabaseConfigured || !supabase) return null;

  const timestamp = new Date();
  const invoiceNumber = `INV-${timestamp.getFullYear().toString().slice(-2)}${(timestamp.getMonth() + 1).toString().padStart(2, '0')}${timestamp.getDate().toString().padStart(2, '0')}-${timestamp.getHours().toString().padStart(2, '0')}${timestamp.getMinutes().toString().padStart(2, '0')}`;

  const { data } = await supabase.from('invoices').insert({ ...invoice, invoice_number: invoiceNumber }).select().single();
  return data;
}

// ==================== TRANSACTIONS ====================

export async function getTransactions(type?: 'income' | 'expense'): Promise<Transaction[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  let query = supabase.from('transactions').select('*').order('date', { ascending: false });
  if (type) query = query.eq('type', type);
  const { data } = await query;
  return data || [];
}

export async function createTransaction(transaction: Omit<Transaction, 'id' | 'created_at'>): Promise<void> {
  if (!isSupabaseConfigured || !supabase) return;
  await supabase.from('transactions').insert(transaction);
}

// ==================== DASHBOARD ====================

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

  const today = new Date().toISOString().split('T')[0];

  const [
    ordersData,
    customersData,
    productsData,
    transactionsData,
    todayTransactionsData
  ] = await Promise.all([
    supabase.from('orders').select('*'),
    supabase.from('customers').select('*'),
    supabase.from('products').select('*'),
    supabase.from('transactions').select('amount').eq('type', 'income'),
    supabase.from('transactions').select('amount, created_at').eq('type', 'income')
  ]);

  const pendingOrders = (ordersData.data || []).filter(o => o.status === 'pending').length;
  const lowStockProducts = (productsData.data || []).filter(p => p.stock_quantity <= p.min_stock_level).length;
  
  const totalRevenue = (transactionsData.data || []).reduce((sum, t) => sum + t.amount, 0);
  
  const todayTransactions = (todayTransactionsData.data || []).filter(t => 
    t.created_at.startsWith(today)
  );
  const todayRevenue = todayTransactions.reduce((sum, t) => sum + t.amount, 0);

  return {
    total_revenue: totalRevenue,
    total_orders: (ordersData.data || []).length,
    total_customers: (customersData.data || []).length,
    total_products: (productsData.data || []).length,
    pending_orders: pendingOrders,
    low_stock_products: lowStockProducts,
    today_revenue: todayRevenue,
    today_orders: todayTransactions.length
  };
}