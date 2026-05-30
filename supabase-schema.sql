-- =========================================
-- NAFAES | نفائس - Database Schema
-- =========================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =========================================
-- CUSTOMERS TABLE
-- =========================================
CREATE TABLE IF NOT EXISTS customers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL UNIQUE,
  email TEXT,
  area TEXT,
  address TEXT,
  is_vip BOOLEAN DEFAULT FALSE,
  customer_type TEXT DEFAULT 'retail' CHECK (customer_type IN ('retail', 'wholesale', 'corporate')),
  total_orders INTEGER DEFAULT 0,
  total_spent DECIMAL(10, 3) DEFAULT 0,
  loyalty_points INTEGER DEFAULT 0,
  tags TEXT[] DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================
-- PRODUCTS TABLE
-- =========================================
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  slug TEXT UNIQUE,
  type TEXT,
  price DECIMAL(10, 3) NOT NULL DEFAULT 0,
  cost_price DECIMAL(10, 3) DEFAULT 0,
  stock_quantity INTEGER DEFAULT 0,
  min_stock_level INTEGER DEFAULT 5,
  sku TEXT,
  images TEXT[] DEFAULT '{}',
  specs JSONB DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  is_new BOOLEAN DEFAULT FALSE,
  is_bestseller BOOLEAN DEFAULT FALSE,
  view_count INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================
-- ORDERS TABLE
-- =========================================
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_number TEXT NOT NULL UNIQUE,
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  governorate TEXT NOT NULL,
  area TEXT NOT NULL,
  area_id TEXT NOT NULL,
  address TEXT NOT NULL,
  notes TEXT,
  subtotal DECIMAL(10, 3) NOT NULL DEFAULT 0,
  delivery_fee DECIMAL(10, 3) NOT NULL DEFAULT 0,
  discount_amount DECIMAL(10, 3) DEFAULT 0,
  total DECIMAL(10, 3) NOT NULL DEFAULT 0,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready', 'shipped', 'delivered', 'cancelled', 'refunded')),
  payment_method TEXT DEFAULT 'cash' CHECK (payment_method IN ('cash', 'knet', 'link', 'bank')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'partial', 'failed', 'refunded')),
  paid_amount DECIMAL(10, 3) DEFAULT 0,
  paid_at TIMESTAMPTZ,
  source TEXT DEFAULT 'website' CHECK (source IN ('website', 'whatsapp', 'instagram', 'phone', 'admin')),
  admin_notes TEXT,
  estimated_delivery TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  cancellation_reason TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================
-- ORDER ITEMS TABLE
-- =========================================
CREATE TABLE IF NOT EXISTS order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  variant_id UUID,
  name TEXT NOT NULL,
  sku TEXT,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(10, 3) NOT NULL DEFAULT 0,
  discount_price DECIMAL(10, 3),
  total_price DECIMAL(10, 3) NOT NULL DEFAULT 0,
  notes TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================
-- INVOICES TABLE
-- =========================================
CREATE TABLE IF NOT EXISTS invoices (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  invoice_number TEXT NOT NULL UNIQUE,
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  type TEXT DEFAULT 'invoice' CHECK (type IN ('invoice', 'receipt', 'proforma', 'tax')),
  serial_number INTEGER,
  subtotal DECIMAL(10, 3) DEFAULT 0,
  tax_amount DECIMAL(10, 3) DEFAULT 0,
  discount_amount DECIMAL(10, 3) DEFAULT 0,
  delivery_fee DECIMAL(10, 3) DEFAULT 0,
  total DECIMAL(10, 3) DEFAULT 0,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'viewed', 'paid', 'cancelled', 'void')),
  payment_status TEXT DEFAULT 'pending',
  due_date DATE,
  paid_at TIMESTAMPTZ,
  notes TEXT,
  terms TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================
-- TRANSACTIONS TABLE (Accounting)
-- =========================================
CREATE TABLE IF NOT EXISTS transactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  category TEXT NOT NULL,
  amount DECIMAL(10, 3) NOT NULL DEFAULT 0,
  description TEXT,
  reference_type TEXT CHECK (reference_type IN ('order', 'invoice', 'expense', 'refund', 'adjustment')),
  reference_id UUID,
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  payment_method TEXT CHECK (payment_method IN ('cash', 'knet', 'bank', 'visa', 'mastercard', 'other')),
  receipt_number TEXT,
  date DATE DEFAULT CURRENT_DATE,
  created_by TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================
-- NOTIFICATIONS TABLE
-- =========================================
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('order', 'alert', 'system')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================
-- SETTINGS TABLE
-- =========================================
CREATE TABLE IF NOT EXISTS settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================
-- INVENTORY LOGS TABLE
-- =========================================
CREATE TABLE IF NOT EXISTS inventory_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  variant_id UUID,
  type TEXT NOT NULL CHECK (type IN ('in', 'out', 'adjustment', 'damage', 'return')),
  quantity INTEGER NOT NULL,
  balance_before INTEGER,
  balance_after INTEGER,
  reason TEXT NOT NULL,
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  supplier_id UUID,
  reference_type TEXT,
  reference_id UUID,
  notes TEXT,
  created_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================
-- REVIEWS TABLE
-- =========================================
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  comment TEXT,
  images TEXT[] DEFAULT '{}',
  is_approved BOOLEAN DEFAULT FALSE,
  reply TEXT,
  replied_at TIMESTAMPTZ,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================
-- INITIAL SETTINGS DATA
-- =========================================
INSERT INTO settings (key, value) VALUES
  ('store_name', 'NAFAES | نفائس'),
  ('store_email', 'info@nafaes.com'),
  ('store_phone', '66377312'),
  ('whatsapp_number', '96566377312'),
  ('whatsapp_message', 'مرحباً! أرغب بالاستفسار عن منتجات نفائس'),
  ('delivery_fee', '2'),
  ('free_delivery_threshold', '50'),
  ('min_order_amount', '5'),
  ('currency', 'KWD'),
  ('currency_symbol', 'د.ك'),
  ('address', 'الكويت'),
  ('tax_percent', '0')
ON CONFLICT (key) DO NOTHING;

-- =========================================
-- INDEXES FOR BETTER PERFORMANCE
-- =========================================
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(date DESC);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(type);

-- =========================================
-- ROW LEVEL SECURITY (RLS)
-- =========================================

-- Enable RLS on all tables
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_logs ENABLE ROW LEVEL SECURITY;

-- Public read access for products and settings
CREATE POLICY "Public can read products" ON products FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read settings" ON settings FOR SELECT USING (true);

-- Public insert for orders and order_items
CREATE POLICY "Public can insert orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert order items" ON order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert notifications" ON notifications FOR INSERT WITH CHECK (true);

-- Admin can do everything (using service role key)
CREATE POLICY "Admin can do everything on orders" ON orders FOR ALL USING (true);
CREATE POLICY "Admin can do everything on order_items" ON order_items FOR ALL USING (true);
CREATE POLICY "Admin can do everything on products" ON products FOR ALL USING (true);
CREATE POLICY "Admin can do everything on customers" ON customers FOR ALL USING (true);
CREATE POLICY "Admin can do everything on invoices" ON invoices FOR ALL USING (true);
CREATE POLICY "Admin can do everything on transactions" ON transactions FOR ALL USING (true);
CREATE POLICY "Admin can do everything on notifications" ON notifications FOR ALL USING (true);
CREATE POLICY "Admin can do everything on settings" ON settings FOR ALL USING (true);
CREATE POLICY "Admin can do everything on inventory_logs" ON inventory_logs FOR ALL USING (true);