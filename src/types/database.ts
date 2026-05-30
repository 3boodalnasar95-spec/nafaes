export interface Customer {
  id: string;
  name: string;
  phone: string;
  area: string;
  address: string;
  email?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name_ar: string;
  name_en: string;
  type: string;
  price: number;
  cost_price: number;
  short_description: string;
  full_description: string;
  specs: Record<string, string>;
  features: string[];
  image: string;
  sku: string;
  category: string;
  stock_quantity: number;
  min_stock_level: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  order_number: string;
  customer_id: string;
  customer?: Customer;
  items: OrderItem[];
  subtotal: number;
  delivery_fee: number;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'shipped' | 'delivered' | 'cancelled';
  payment_method: 'cash' | 'link';
  payment_status: 'pending' | 'paid' | 'failed';
  notes?: string;
  invoice_number?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product?: Product;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface Invoice {
  id: string;
  invoice_number: string;
  order_id: string;
  order?: Order;
  customer_id: string;
  customer?: Customer;
  subtotal: number;
  delivery_fee: number;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'cancelled';
  payment_method: 'cash' | 'link';
  due_date?: string;
  paid_at?: string;
  created_at: string;
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: 'sales' | 'delivery' | 'inventory' | 'marketing' | 'utilities' | 'salaries' | 'other';
  amount: number;
  description: string;
  reference_type?: 'order' | 'invoice' | 'expense';
  reference_id?: string;
  date: string;
  created_at: string;
}

export interface InventoryLog {
  id: string;
  product_id: string;
  product?: Product;
  type: 'in' | 'out' | 'adjustment';
  quantity: number;
  reason: string;
  reference_type?: 'order' | 'restock' | 'damage' | 'return';
  reference_id?: string;
  created_by: string;
  created_at: string;
}

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