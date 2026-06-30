import { supabase, isSupabaseConfigured } from './supabase';
import { PRODUCT_CATALOG, formatPrice, localProducts } from '@/data/products';
import { toast } from 'sonner';

// Types
export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  area?: string;
  address?: string;
  notes?: string;
  is_vip: boolean;
  customer_type: 'retail' | 'wholesale' | 'corporate';
  total_orders: number;
  total_spent: number;
  loyalty_points: number;
  tags: string[];
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name_ar: string;
  product_name_en: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at: string;
}

export interface Order {
  id: string;
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
  created_at: string;
  updated_at: string;
  order_items?: OrderItem[];
}

export interface Notification {
  id: string;
  type: 'order' | 'alert' | 'system';
  title: string;
  message: string;
  order_id?: string;
  read: boolean;
  created_at: string;
}

export interface Product {
  id: string;
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
  image?: string;
  variant?: string;
  variantId?: string;
  variantLabel?: string;
  variantSize?: string;
  cartKey?: string;
  variants?: Array<{ id: string; size: string; price: number; sku: string; stock: number }>;
  specs: Record<string, string>;
  features: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

function normalizeText(value?: string): string {
  return (value || '').trim().toLowerCase();
}

function stripVariantSuffix(value?: string): string {
  return normalizeText(value).replace(/\s*[-–—]?\s*\d+\s*ml$/i, '').trim();
}

function getCatalogProduct(product: Partial<Product> & { image?: string }): (typeof PRODUCT_CATALOG)[number] | undefined {
  const slugBase = normalizeText(product.slug).replace(/-\d+$/, '');
  if (slugBase) {
    const bySlug = PRODUCT_CATALOG.find(item => item.id === slugBase);
    if (bySlug) return bySlug;
  }

  const nameEnBase = stripVariantSuffix(product.name_en);
  if (nameEnBase) {
    const byNameEn = PRODUCT_CATALOG.find(item => normalizeText(item.name_en) === nameEnBase);
    if (byNameEn) return byNameEn;
  }

  const nameArBase = stripVariantSuffix(product.name_ar);
  if (nameArBase) {
    const byNameAr = PRODUCT_CATALOG.find(item => normalizeText(item.name_ar) === nameArBase);
    if (byNameAr) return byNameAr;
  }

  return undefined;
}

function hydrateProductImages(product: Partial<Product> & { image?: string }): string[] {
  const existingImages = (Array.isArray(product.images) ? product.images : []).filter(Boolean);
  if (existingImages.length > 0) {
    return existingImages;
  }

  const catalogProduct = getCatalogProduct(product);
  return catalogProduct ? [catalogProduct.image] : [];
}

function hydrateProduct(product: Product): Product {
  const images = hydrateProductImages(product);
  return {
    ...product,
    images,
    // Some UI paths still read `image` directly, so keep it in sync.
    image: images[0] || (product as Product & { image?: string }).image,
  } as Product;
}

function prepareProductPayload(productData: Partial<Product>): Partial<Product> {
  const payload = { ...productData };
  if ('images' in productData || 'image' in productData || 'slug' in productData || 'name_ar' in productData || 'name_en' in productData) {
    payload.images = hydrateProductImages(productData);
  }
  return payload;
}

function normalizeProductKey(value?: string): string {
  return normalizeText(value).replace(/\s+/g, '-').replace(/-+/g, '-').trim('-');
}

function matchCatalogProduct(product: Partial<Product>): (typeof localProducts)[number] | undefined {
  const byId = localProducts.find(item => item.id === product.id);
  if (byId) return byId;

  const bySlug = localProducts.find(item => item.id === normalizeProductKey(product.slug));
  if (bySlug) return bySlug;

  const sku = normalizeText(product.sku);
  if (sku) {
    const bySku = localProducts.find(item => (item.sku || '').toLowerCase() === sku);
    if (bySku) return bySku;
  }

  const nameEnBase = stripVariantSuffix(product.name_en);
  if (nameEnBase) {
    const byNameEn = localProducts.find(item => stripVariantSuffix(item.name_en) === nameEnBase);
    if (byNameEn) return byNameEn;
  }

  const nameArBase = stripVariantSuffix(product.name_ar);
  if (nameArBase) {
    const byNameAr = localProducts.find(item => stripVariantSuffix(item.name_ar) === nameArBase);
    if (byNameAr) return byNameAr;
  }

  return undefined;
}

function mergeWithCatalog(product: Partial<Product>): Product | null {
  const catalogProduct = matchCatalogProduct(product);
  if (!catalogProduct) return null;

  const images = [catalogProduct.image];
  return {
    ...catalogProduct,
    ...product,
    id: catalogProduct.id,
    name_ar: product.name_ar || catalogProduct.name_ar,
    name_en: product.name_en || catalogProduct.name_en,
    type: product.type || catalogProduct.type,
    price: catalogProduct.price,
    shortDescription: product.shortDescription || catalogProduct.shortDescription,
    fullDescription: product.fullDescription || catalogProduct.fullDescription,
    specs: product.specs && Object.keys(product.specs).length > 0 ? product.specs : catalogProduct.specs,
    features: product.features && product.features.length > 0 ? product.features : catalogProduct.features,
    image: images[0] || catalogProduct.image,
    images,
    variant: product.variant || catalogProduct.variant,
    sku: product.sku || catalogProduct.sku,
    stock_quantity: typeof product.stock_quantity === 'number' ? product.stock_quantity : catalogProduct.stock_quantity,
    min_stock_level: typeof product.min_stock_level === 'number' ? product.min_stock_level : catalogProduct.min_stock_level,
    is_active: product.is_active ?? true,
    created_at: product.created_at || '',
    updated_at: product.updated_at || '',
  } as Product;
}

export interface Invoice {
  id: string;
  invoice_number: string;
  customer_id?: string;
  total: number;
  status: string;
  created_at: string;
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  date: string;
}

export interface Settings {
  store_name: string;
  store_email: string;
  store_phone: string;
  whatsapp_number: string;
  delivery_fee: number;
  free_delivery_threshold: number;
  min_order_amount: number;
}

// ==================== PRODUCTS ====================

export async function getProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured || !supabase) {
    return localProducts.map(product => mergeWithCatalog(product as unknown as Partial<Product>) as Product);
  }
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: true });
    if (error) {
      console.error('Error fetching products:', error);
      return localProducts.map(product => mergeWithCatalog(product as unknown as Partial<Product>) as Product);
    }
    const merged = localProducts
      .map(local => {
        const dbMatch = (data || []).find((item: any) => matchCatalogProduct(item)?.id === local.id);
        return mergeWithCatalog((dbMatch ? { ...local, ...dbMatch } : local) as unknown as Partial<Product>);
      })
      .filter((item): item is Product => !!item);

    return merged.length > 0 ? merged : localProducts.map(product => mergeWithCatalog(product as unknown as Partial<Product>) as Product);
  } catch (err) {
    console.error('Exception fetching products:', err);
    return localProducts.map(product => mergeWithCatalog(product as unknown as Partial<Product>) as Product);
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  const localProduct = localProducts.find(product => product.id === id);
  if (!isSupabaseConfigured || !supabase) return localProduct ? mergeWithCatalog(localProduct as unknown as Partial<Product>) : null;
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    if (error) return localProduct ? mergeWithCatalog(localProduct as unknown as Partial<Product>) : null;
    return data ? mergeWithCatalog({ ...(localProduct || {}), ...data } as Partial<Product>) : localProduct ? mergeWithCatalog(localProduct as unknown as Partial<Product>) : null;
  } catch (err) {
    console.error('Exception fetching product:', err);
    return localProduct ? mergeWithCatalog(localProduct as unknown as Partial<Product>) : null;
  }
}

export async function createProduct(productData: Partial<Product>): Promise<Product | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  try {
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from('products')
      .insert({ 
        ...prepareProductPayload(productData), 
        created_at: now, 
        updated_at: now,
        is_active: true,
        slug: productData.name_en?.toLowerCase().replace(/\s+/g, '-'),
      })
      .select()
      .single();
    if (error) throw error;
    return data ? hydrateProduct(data) : null;
  } catch (err) {
    console.error('Exception creating product:', err);
    return null;
  }
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;
  try {
    const { error } = await supabase
      .from('products')
      .update({ ...prepareProductPayload(updates), updated_at: new Date().toISOString() })
      .eq('id', id);
    return !error;
  } catch (err) {
    console.error('Exception updating product:', err);
    return false;
  }
}

export async function deleteProduct(id: string): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;
  try {
    const { error } = await supabase
      .from('products')
      .update({ is_active: false })
      .eq('id', id);
    return !error;
  } catch (err) {
    console.error('Exception deleting product:', err);
    return false;
  }
}

export async function logInventoryChange(productId: string, type: 'in' | 'out' | 'adjustment', quantity: number, reason: string): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;
  try {
    const products = await getProducts();
    const product = products.find(p => p.id === productId);
    let dbProductId = productId;
    let currentStock = product?.stock_quantity || 0;

    if (product?.sku) {
      const { data: dbProduct } = await supabase
        .from('products')
        .select('id, stock_quantity')
        .eq('sku', product.sku)
        .maybeSingle();

      if (dbProduct) {
        dbProductId = dbProduct.id;
        currentStock = typeof dbProduct.stock_quantity === 'number' ? dbProduct.stock_quantity : currentStock;
      }
    }

    const { error } = await supabase.from('inventory_logs').insert({
      product_id: dbProductId,
      type,
      quantity,
      reason,
      created_by: 'admin',
      created_at: new Date().toISOString(),
    });
    if (!error) {
      const newStock = type === 'in'
        ? currentStock + quantity
        : type === 'out'
          ? currentStock - quantity
          : quantity;

      const { error: updateError } = await supabase
        .from('products')
        .update({ stock_quantity: Math.max(0, newStock), updated_at: new Date().toISOString() })
        .eq('id', dbProductId);

      return !updateError;
    }
    return !error;
  } catch (err) {
    console.error('Exception logging inventory:', err);
    return false;
  }
}

export async function getInventoryLogs(productId: string): Promise<any[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  try {
    const { data, error } = await supabase
      .from('inventory_logs')
      .select('*')
      .eq('product_id', productId)
      .order('created_at', { ascending: false })
      .limit(20);
    if (error) return [];
    return data || [];
  } catch (err) {
    console.error('Exception fetching inventory logs:', err);
    return [];
  }
}

// ==================== ORDERS ====================

function generateOrderNumber(): string {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `NAF-${year}${month}${day}-${hours}${minutes}-${random}`;
}

export async function getOrders(): Promise<Order[]> {
  if (!isSupabaseConfigured || !supabase) {
    console.log('Supabase not configured, returning empty orders');
    return [];
  }
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`*, order_items (*)`)
      .order('created_at', { ascending: false });
    if (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
    return data || [];
  } catch (err) {
    console.error('Exception fetching orders:', err);
    return [];
  }
}

export async function getOrder(id: string): Promise<Order | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`*, order_items (*)`)
      .eq('id', id)
      .single();
    if (error) return null;
    return data;
  } catch (err) {
    console.error('Exception fetching order:', err);
    return null;
  }
}

export async function createOrder(
  orderData: { 
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
  },
  items: { 
    product_id: string; 
    product_name_ar: string; 
    product_name_en: string; 
    quantity: number; 
    unit_price: number; 
    total_price: number 
  }[]
): Promise<{ success: boolean; order_number?: string; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    console.log('Supabase not configured, order not saved to database');
    return { success: false, error: 'Database not configured' };
  }
  
  try {
    const orderNumber = generateOrderNumber();
    const now = new Date().toISOString();
    
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        customer_name: orderData.customer_name,
        customer_phone: orderData.customer_phone,
        governorate: orderData.governorate,
        area: orderData.area,
        area_id: orderData.area_id,
        address: orderData.address,
        notes: orderData.notes || '',
        payment_method: orderData.payment_method,
        subtotal: orderData.subtotal,
        delivery_fee: orderData.delivery_fee,
        total: orderData.total,
        status: 'pending',
        source: 'website',
        created_at: now,
        updated_at: now,
      })
      .select()
      .single();
      
    if (orderError) {
      console.error('Error creating order:', orderError);
      return { success: false, error: orderError.message };
    }
    
    if (items.length > 0) {
      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        product_name_ar: item.product_name_ar,
        product_name_en: item.product_name_en,
        quantity: item.quantity,
        unit_price: item.unit_price,
        total_price: item.total_price,
        created_at: now,
      }));
      
      const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
      if (itemsError) {
        console.error('Error creating order items:', itemsError);
      }
    }
    
    // Create notification
    await createNotification({
      type: 'order',
      title: '🛒 طلب جديد!',
      message: `طلب من: ${orderData.customer_name}\nالهاتف: +965 ${orderData.customer_phone}\nالمنطقة: ${orderData.area}\nالإجمالي: ${orderData.total.toFixed(3)} د.ك\nالمنتجات: ${items.length}`,
      order_id: order.id,
      read: false,
    });
    
    console.log('✅ Order created successfully:', order.id);
    return { success: true, order_number: orderNumber };
    
  } catch (err) {
    console.error('Exception creating order:', err);
    return { success: false, error: (err as Error).message };
  }
}

export async function updateOrderStatus(id: string, status: Order['status']): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;
  try {
    const { error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id);
    return !error;
  } catch (err) {
    console.error('Exception updating order:', err);
    return false;
  }
}

// ==================== CUSTOMERS ====================

export async function getCustomers(): Promise<Customer[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  try {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) return [];
    return data || [];
  } catch (err) {
    console.error('Exception fetching customers:', err);
    return [];
  }
}

export async function createCustomer(customerData: { name: string; phone: string; area: string; address: string }): Promise<Customer | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  try {
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from('customers')
      .insert({ 
        ...customerData, 
        created_at: now, 
        updated_at: now 
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Exception creating customer:', err);
    return null;
  }
}

export async function getCustomerStats(customerId: string): Promise<{
  totalOrders: number;
  totalSpent: number;
  avgOrderValue: number;
  lastOrder: string | null;
  ordersByStatus: Record<string, number>;
}> {
  return { 
    totalOrders: 0, 
    totalSpent: 0, 
    avgOrderValue: 0, 
    lastOrder: null, 
    ordersByStatus: {} 
  };
}

// ==================== INVOICES ====================

export async function getInvoices(): Promise<Invoice[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  try {
    const { data, error } = await supabase
      .from('invoices')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) return [];
    return data || [];
  } catch (err) {
    console.error('Exception fetching invoices:', err);
    return [];
  }
}

// ==================== TRANSACTIONS ====================

export async function getTransactions(filters?: { type?: string; date_from?: string; date_to?: string }): Promise<Transaction[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  try {
    let query = supabase.from('transactions').select('*').order('date', { ascending: false });
    if (filters?.type) query = query.eq('type', filters.type);
    if (filters?.date_from) query = query.gte('date', filters.date_from);
    if (filters?.date_to) query = query.lte('date', filters.date_to);
    const { data, error } = await query;
    if (error) return [];
    return data || [];
  } catch (err) {
    console.error('Exception fetching transactions:', err);
    return [];
  }
}

export async function createTransaction(transactionData: {
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  date: string;
}): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;
  try {
    const { error } = await supabase.from('transactions').insert(transactionData);
    return !error;
  } catch (err) {
    console.error('Exception creating transaction:', err);
    return false;
  }
}

// ==================== NOTIFICATIONS ====================

export async function getNotifications(): Promise<Notification[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  try {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);
    if (error) return [];
    return data || [];
  } catch (err) {
    console.error('Exception fetching notifications:', err);
    return [];
  }
}

export async function createNotification(notification: Omit<Notification, 'id' | 'created_at'>): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;
  try {
    const { error } = await supabase.from('notifications').insert({
      ...notification,
      created_at: new Date().toISOString(),
    });
    return !error;
  } catch (err) {
    console.error('Exception creating notification:', err);
    return false;
  }
}

export async function markNotificationRead(id: string): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;
  try {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', id);
    return !error;
  } catch (err) {
    console.error('Exception marking notification:', err);
    return false;
  }
}

export async function markAllNotificationsRead(): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;
  try {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('read', false);
    return !error;
  } catch (err) {
    console.error('Exception marking all notifications:', err);
    return false;
  }
}

// ==================== SETTINGS ====================

export async function getSettings(): Promise<Record<string, string>> {
  if (!isSupabaseConfigured || !supabase) return {};
  try {
    const { data, error } = await supabase.from('settings').select('*');
    if (error) return {};
    const settings: Record<string, string> = {};
    (data || []).forEach(s => { settings[s.key] = s.value; });
    return settings;
  } catch (err) {
    console.error('Exception fetching settings:', err);
    return {};
  }
}

export async function updateSetting(key: string, value: string): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;
  try {
    const { error } = await supabase.from('settings').upsert([{ key, value }]);
    return !error;
  } catch (err) {
    console.error('Exception updating setting:', err);
    return false;
  }
}

export async function updateSettings(settings: Record<string, string>): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;
  try {
    const entries = Object.entries(settings).map(([key, value]) => ({ key, value }));
    const { error } = await supabase.from('settings').upsert(entries);
    return !error;
  } catch (err) {
    console.error('Exception updating settings:', err);
    return false;
  }
}

// ==================== REPORTS ====================

export async function getSalesReport(startDate: string, endDate: string): Promise<{
  daily: { date: string; orders: number; revenue: number }[];
  byStatus: Record<string, number>;
  topProducts: { name: string; quantity: number; revenue: number }[];
}> {
  if (!isSupabaseConfigured || !supabase) return { daily: [], byStatus: {}, topProducts: [] };
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .gte('created_at', startDate)
      .lte('created_at', endDate);
    if (error) return { daily: [], byStatus: {}, topProducts: [] };
    
    const orders = data || [];
    const byStatus: Record<string, number> = {};
    orders.forEach(o => { byStatus[o.status] = (byStatus[o.status] || 0) + 1; });
    
    return { daily: [], byStatus, topProducts: [] };
  } catch (err) {
    console.error('Exception fetching sales report:', err);
    return { daily: [], byStatus: {}, topProducts: [] };
  }
}

export async function exportOrders(format: 'csv' | 'json'): Promise<string> {
  const orders = await getOrders();
  if (format === 'json') return JSON.stringify(orders, null, 2);
  const headers = 'Order Number,Customer Name,Phone,Area,Total,Status,Date\n';
  const rows = orders.map(o => 
    `${o.order_number},${o.customer_name},${o.customer_phone},${o.area},${o.total},${o.status},${o.created_at}`
  ).join('\n');
  return headers + rows;
}

// ==================== HELPERS ====================

export { formatPrice };

export function getFormattedDate(): string {
  return new Date().toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// ==================== DASHBOARD STATS ====================

export async function getDashboardStats(): Promise<{
  totalOrders: number;
  pendingOrders: number;
  todayOrders: number;
  totalRevenue: number;
  unreadNotifications: number;
}> {
  if (!isSupabaseConfigured || !supabase) {
    return { 
      totalOrders: 0, 
      pendingOrders: 0, 
      todayOrders: 0, 
      totalRevenue: 0, 
      unreadNotifications: 0 
    };
  }
  
  try {
    const today = new Date().toISOString().split('T')[0];
    
    const [ordersResult, notificationsResult] = await Promise.all([
      supabase.from('orders').select('total, status, created_at'),
      supabase.from('notifications').select('id').eq('read', false),
    ]);
    
    const orders = ordersResult.data || [];
    const notifications = notificationsResult.data || [];
    
    return {
      totalOrders: orders.length,
      pendingOrders: orders.filter(o => o.status === 'pending').length,
      todayOrders: orders.filter(o => o.created_at?.startsWith(today)).length,
      totalRevenue: orders.reduce((sum, o) => sum + (o.total || 0), 0),
      unreadNotifications: notifications.length,
    };
  } catch (err) {
    console.error('Exception getting dashboard stats:', err);
    return { 
      totalOrders: 0, 
      pendingOrders: 0, 
      todayOrders: 0, 
      totalRevenue: 0, 
      unreadNotifications: 0 
    };
  }
}
