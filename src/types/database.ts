// ==================== CUSTOMERS ====================
export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  avatar_url?: string;
  area?: string;
  block?: string;
  street?: string;
  building?: string;
  floor?: string;
  apartment?: string;
  address_text?: string;
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

export interface CustomerAddress {
  id: string;
  customer_id: string;
  label: string;
  area?: string;
  block?: string;
  street?: string;
  building?: string;
  floor?: string;
  apartment?: string;
  directions?: string;
  is_default: boolean;
  created_at: string;
}

// ==================== CATEGORIES ====================
export interface Category {
  id: string;
  name_ar: string;
  name_en: string;
  description?: string;
  image_url?: string;
  icon?: string;
  parent_id?: string;
  sort_order: number;
  is_active: boolean;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  products?: Product[];
}

// ==================== PRODUCTS ====================
export interface Product {
  id: string;
  name_ar: string;
  name_en: string;
  slug: string;
  sku?: string;
  barcode?: string;
  type: string;
  category_id?: string;
  category?: Category;
  description_short?: string;
  description_full?: string;
  specs: Record<string, string>;
  features: string[];
  images: string[];
  video_url?: string;
  price: number;
  cost_price: number;
  wholesale_price?: number;
  discount_price?: number;
  discount_percent?: number;
  discount_start?: string;
  discount_end?: string;
  stock_quantity: number;
  reserved_quantity: number;
  min_stock_level: number;
  unit: string;
  weight_kg?: number;
  dimensions?: { width: number; height: number; depth: number };
  colors?: string[];
  sizes?: string[];
  tags: string[];
  is_active: boolean;
  is_featured: boolean;
  is_new: boolean;
  is_bestseller: boolean;
  seo_title?: string;
  seo_description?: string;
  view_count: number;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  sku?: string;
  name: string;
  price: number;
  stock_quantity: number;
  attributes: Record<string, string>;
  image_url?: string;
  is_active: boolean;
  created_at: string;
}

// ==================== ORDERS ====================
export interface Order {
  id: string;
  order_number: string;
  customer_id?: string;
  customer?: Customer;
  customer_name: string;
  customer_phone: string;
  customer_area: string;
  customer_address: string;
  subtotal: number;
  discount_amount: number;
  coupon_code?: string;
  delivery_fee: number;
  total: number;
  status: OrderStatus;
  payment_method: 'cash' | 'knet' | 'link' | 'bank';
  payment_status: 'pending' | 'paid' | 'partial' | 'failed' | 'refunded';
  paid_amount: number;
  paid_at?: string;
  notes?: string;
  admin_notes?: string;
  source: 'website' | 'whatsapp' | 'instagram' | 'phone' | 'admin';
  coupon_id?: string;
  estimated_delivery?: string;
  delivered_at?: string;
  cancellation_reason?: string;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
}

export type OrderStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'preparing' 
  | 'ready' 
  | 'shipped' 
  | 'delivered' 
  | 'cancelled' 
  | 'refunded';

export interface OrderItem {
  id: string;
  order_id: string;
  product_id?: string;
  product?: Product;
  variant_id?: string;
  variant?: ProductVariant;
  name: string;
  sku?: string;
  quantity: number;
  unit_price: number;
  discount_price?: number;
  total_price: number;
  notes?: string;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface OrderStatusHistory {
  id: string;
  order_id: string;
  status: string;
  notes?: string;
  changed_by?: string;
  created_at: string;
}

// ==================== INVOICES ====================
export interface Invoice {
  id: string;
  invoice_number: string;
  order_id?: string;
  order?: Order;
  customer_id?: string;
  customer?: Customer;
  type: 'invoice' | 'receipt' | 'proforma' | 'tax';
  serial_number?: number;
  subtotal: number;
  tax_amount: number;
  discount_amount: number;
  delivery_fee: number;
  total: number;
  status: 'draft' | 'sent' | 'viewed' | 'paid' | 'cancelled' | 'void';
  payment_status: 'pending' | 'paid';
  due_date?: string;
  paid_at?: string;
  notes?: string;
  terms?: string;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

// ==================== TRANSACTIONS ====================
export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: TransactionCategory;
  amount: number;
  description: string;
  reference_type?: 'order' | 'invoice' | 'expense' | 'refund' | 'adjustment';
  reference_id?: string;
  customer_id?: string;
  order_id?: string;
  payment_method?: 'cash' | 'knet' | 'bank' | 'visa' | 'mastercard' | 'other';
  receipt_number?: string;
  date: string;
  created_by?: string;
  metadata: Record<string, unknown>;
  created_at: string;
}

export type TransactionCategory = 
  | 'sales' 
  | 'delivery' 
  | 'services' 
  | 'other_income'
  | 'inventory' 
  | 'marketing' 
  | 'utilities' 
  | 'salaries' 
  | 'rent' 
  | 'equipment' 
  | 'software' 
  | 'other_expense';

// ==================== INVENTORY ====================
export interface InventoryLog {
  id: string;
  product_id: string;
  product?: Product;
  variant_id?: string;
  type: 'in' | 'out' | 'adjustment' | 'damage' | 'return';
  quantity: number;
  balance_before?: number;
  balance_after?: number;
  reason: string;
  order_id?: string;
  supplier_id?: string;
  reference_type?: string;
  reference_id?: string;
  notes?: string;
  created_by: string;
  created_at: string;
}

// ==================== COUPONS ====================
export interface Coupon {
  id: string;
  code: string;
  name: string;
  description?: string;
  type: 'percentage' | 'fixed' | 'free_delivery' | 'buy_x_get_y';
  value: number;
  min_order_amount?: number;
  max_discount_amount?: number;
  usage_limit?: number;
  used_count: number;
  per_customer_limit: number;
  start_date?: string;
  end_date?: string;
  is_active: boolean;
  applicable_products?: string[];
  applicable_categories?: string[];
  customer_ids?: string[];
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

// ==================== REVIEWS ====================
export interface Review {
  id: string;
  product_id: string;
  product?: Product;
  customer_id: string;
  customer?: Customer;
  order_id?: string;
  rating: number;
  title?: string;
  comment?: string;
  images: string[];
  is_approved: boolean;
  reply?: string;
  replied_at?: string;
  helpful_count: number;
  created_at: string;
  updated_at: string;
}

// ==================== ANALYTICS ====================
export interface AnalyticsEvent {
  id: string;
  event_type: string;
  event_name: string;
  user_id?: string;
  session_id?: string;
  page_url?: string;
  referrer?: string;
  device_type?: string;
  browser?: string;
  os?: string;
  country?: string;
  city?: string;
  properties: Record<string, unknown>;
  created_at: string;
}

// ==================== DASHBOARD ====================
export interface DashboardStats {
  total_revenue: number;
  total_orders: number;
  total_customers: number;
  total_products: number;
  pending_orders: number;
  low_stock_products: number;
  today_revenue: number;
  today_orders: number;
}

export interface SalesReport {
  daily: { date: string; orders: number; revenue: number }[];
  byStatus: Record<string, number>;
  topProducts: { name: string; quantity: number; revenue: number }[];
}

// ==================== DELIVERY ====================
export interface DeliveryArea {
  id: string;
  name_ar: string;
  name_en: string;
  delivery_fee: number;
  min_order_amount?: number;
  estimated_days: number;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

// ==================== SUPPLIERS ====================
export interface Supplier {
  id: string;
  name: string;
  contact_person?: string;
  phone?: string;
  email?: string;
  address?: string;
  notes?: string;
  is_active: boolean;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

// ==================== EXPENSES ====================
export interface Expense {
  id: string;
  category: string;
  description: string;
  amount: number;
  payment_method: 'cash' | 'knet' | 'bank';
  supplier_id?: string;
  supplier?: Supplier;
  receipt_number?: string;
  date: string;
  created_by?: string;
  notes?: string;
  metadata: Record<string, unknown>;
  created_at: string;
}