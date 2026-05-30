import { supabase, isSupabaseConfigured } from './supabase';
import type { 
  Customer, Product, Order, Invoice, Transaction, 
  InventoryLog, DashboardStats 
} from '@/types/database';

export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
};

// ==================== CUSTOMERS ====================

export async function getCustomers(): Promise<Customer[]> {
  if (!isSupabaseConfigured || !supabase) {
    console.log('Supabase not configured, returning empty array');
    return [];
  }
  try {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching customers:', error);
    return [];
  }
}

export async function createCustomer(customer: Omit<Customer, 'id' | 'created_at' | 'updated_at'>): Promise<Customer | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  try {
    const { data, error } = await supabase
      .from('customers')
      .insert(customer)
      .select()
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating customer:', error);
    return null;
  }
}

export async function updateCustomer(id: string, updates: Partial<Customer>): Promise<Customer | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  try {
    const { data, error } = await supabase
      .from('customers')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating customer:', error);
    return null;
  }
}

// ==================== PRODUCTS ====================

export async function getProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured || !supabase) {
    console.log('Supabase not configured, returning empty array');
    return [];
  }
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function createProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  try {
    const { data, error } = await supabase
      .from('products')
      .insert(product)
      .select()
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating product:', error);
    return null;
  }
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  try {
    const { data, error } = await supabase
      .from('products')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating product:', error);
    return null;
  }
}

// ==================== ORDERS ====================

export async function getOrders(): Promise<Order[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        customer:customers(*),
        items:order_items(
          *,
          product:products(*)
        )
      `)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
}

export async function getOrder(id: string): Promise<Order | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        customer:customers(*),
        items:order_items(
          *,
          product:products(*)
        )
      `)
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching order:', error);
    return null;
  }
}

export async function createOrder(
  order: Omit<Order, 'id' | 'order_number' | 'created_at' | 'updated_at'>,
  items: Omit<OrderItem, 'id' | 'order_id'>[]
): Promise<Order | null> {
  if (!isSupabaseConfigured || !supabase) return null;

  const timestamp = new Date();
  const orderNumber = `ORD-${timestamp.getFullYear().toString().slice(-2)}${(timestamp.getMonth() + 1).toString().padStart(2, '0')}${timestamp.getDate().toString().padStart(2, '0')}-${timestamp.getHours().toString().padStart(2, '0')}${timestamp.getMinutes().toString().padStart(2, '0')}`;

  try {
    const { data: newOrder, error: orderError } = await supabase
      .from('orders')
      .insert({ ...order, order_number: orderNumber })
      .select()
      .single();
    
    if (orderError) throw orderError;
    if (!newOrder) return null;

    const orderItems = items.map(item => ({
      ...item,
      order_id: newOrder.id,
      total_price: item.unit_price * item.quantity
    }));

    await supabase.from('order_items').insert(orderItems);
    return newOrder;
  } catch (error) {
    console.error('Error creating order:', error);
    return null;
  }
}

export async function updateOrderStatus(id: string, status: Order['status']): Promise<void> {
  if (!isSupabaseConfigured || !supabase) return;
  try {
    await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id);
  } catch (error) {
    console.error('Error updating order status:', error);
  }
}

// ==================== INVOICES ====================

export async function getInvoices(): Promise<Invoice[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  try {
    const { data, error } = await supabase
      .from('invoices')
      .select(`
        *,
        order:orders(*),
        customer:customers(*)
      `)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching invoices:', error);
    return [];
  }
}

export async function createInvoice(invoice: Omit<Invoice, 'id' | 'invoice_number' | 'created_at'>): Promise<Invoice | null> {
  if (!isSupabaseConfigured || !supabase) return null;

  const timestamp = new Date();
  const invoiceNumber = `INV-${timestamp.getFullYear().toString().slice(-2)}${(timestamp.getMonth() + 1).toString().padStart(2, '0')}${timestamp.getDate().toString().padStart(2, '0')}-${timestamp.getHours().toString().padStart(2, '0')}${timestamp.getMinutes().toString().padStart(2, '0')}`;

  try {
    const { data, error } = await supabase
      .from('invoices')
      .insert({ ...invoice, invoice_number: invoiceNumber })
      .select()
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating invoice:', error);
    return null;
  }
}

// ==================== TRANSACTIONS ====================

export async function getTransactions(type?: 'income' | 'expense'): Promise<Transaction[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  try {
    let query = supabase.from('transactions').select('*').order('date', { ascending: false });
    if (type) query = query.eq('type', type);
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
}

export async function createTransaction(transaction: Omit<Transaction, 'id' | 'created_at'>): Promise<void> {
  if (!isSupabaseConfigured || !supabase) return;
  try {
    await supabase.from('transactions').insert(transaction);
  } catch (error) {
    console.error('Error creating transaction:', error);
  }
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

  try {
    const today = new Date().toISOString().split('T')[0];

    const [ordersResult, customersResult, productsResult, transactionsResult] = await Promise.all([
      supabase.from('orders').select('*'),
      supabase.from('customers').select('*'),
      supabase.from('products').select('*'),
      supabase.from('transactions').select('*').eq('type', 'income')
    ]);

    const orders = ordersResult.data || [];
    const customers = customersResult.data || [];
    const products = productsResult.data || [];
    const transactions = transactionsResult.data || [];

    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const lowStockProducts = products.filter(p => p.stock_quantity <= p.min_stock_level).length;
    const totalRevenue = transactions.reduce((sum, t) => sum + Number(t.amount), 0);

    const todayTransactions = transactions.filter(t => {
      const transDate = t.date || '';
      return transDate === today;
    });
    const todayRevenue = todayTransactions.reduce((sum, t) => sum + Number(t.amount), 0);
    const todayOrders = orders.filter(o => {
      const orderDate = o.created_at?.split('T')[0];
      return orderDate === today;
    }).length;

    return {
      total_revenue: totalRevenue,
      total_orders: orders.length,
      total_customers: customers.length,
      total_products: products.length,
      pending_orders: pendingOrders,
      low_stock_products: lowStockProducts,
      today_revenue: todayRevenue,
      today_orders: todayOrders
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
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
}

// ==================== SETTINGS ====================

export async function getSettings(): Promise<Record<string, string>> {
  const defaultSettings: Record<string, string> = {
    store_name: 'NAFAES | نفائس',
    store_phone: '66377312',
    whatsapp_number: '96566377312',
    delivery_fee: '2',
    address: 'الكويت',
    email: 'info@nafaes.com',
  };

  if (!isSupabaseConfigured || !supabase) return defaultSettings;
  
  try {
    const { data, error } = await supabase.from('settings').select('key, value');
    if (error) throw error;
    
    const settings: Record<string, string> = { ...defaultSettings };
    (data || []).forEach(item => {
      settings[item.key] = item.value;
    });
    return settings;
  } catch (error) {
    console.error('Error fetching settings:', error);
    return defaultSettings;
  }
}

export async function updateSetting(key: string, value: string): Promise<void> {
  if (!isSupabaseConfigured || !supabase) return;
  try {
    await supabase.from('settings').upsert({ 
      key, 
      value, 
      updated_at: new Date().toISOString() 
    }).eq('key', key);
  } catch (error) {
    console.error('Error updating setting:', error);
  }
}

// ==================== INVENTORY LOGS ====================

export async function getInventoryLogs(productId?: string): Promise<InventoryLog[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  try {
    let query = supabase.from('inventory_logs').select('*, product:products(*)').order('created_at', { ascending: false });
    if (productId) query = query.eq('product_id', productId);
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching inventory logs:', error);
    return [];
  }
}

export async function updateStock(productId: string, quantity: number, type: 'in' | 'out', reason: string, createdBy: string): Promise<void> {
  if (!isSupabaseConfigured || !supabase) return;
  
  try {
    const { data: product } = await supabase
      .from('products')
      .select('stock_quantity')
      .eq('id', productId)
      .single();
      
    if (product) {
      const newStock = type === 'in' 
        ? product.stock_quantity + quantity 
        : product.stock_quantity - quantity;
      
      await supabase
        .from('products')
        .update({ stock_quantity: newStock })
        .eq('id', productId);
      
      await supabase.from('inventory_logs').insert({
        product_id: productId,
        type,
        quantity,
        reason,
        created_by: createdBy
      });
    }
  } catch (error) {
    console.error('Error updating stock:', error);
  }
}