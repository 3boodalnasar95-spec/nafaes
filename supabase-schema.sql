-- ==============================================
-- NAFAES | نفائس - Database Schema
-- ==============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================
-- TABLE: customers
-- ==============================================
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  area TEXT NOT NULL,
  address TEXT NOT NULL,
  email TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================
-- TABLE: products
-- ==============================================
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  type TEXT NOT NULL,
  price DECIMAL(10, 3) NOT NULL,
  cost_price DECIMAL(10, 3) DEFAULT 0,
  short_description TEXT,
  full_description TEXT,
  specs JSONB DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  image TEXT,
  sku TEXT UNIQUE,
  category TEXT DEFAULT 'general',
  stock_quantity INTEGER DEFAULT 0,
  min_stock_level INTEGER DEFAULT 5,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================
-- TABLE: orders
-- ==============================================
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT UNIQUE NOT NULL,
  customer_id UUID REFERENCES customers(id),
  subtotal DECIMAL(10, 3) NOT NULL,
  delivery_fee DECIMAL(10, 3) DEFAULT 2,
  total DECIMAL(10, 3) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'shipped', 'delivered', 'cancelled')),
  payment_method TEXT DEFAULT 'cash' CHECK (payment_method IN ('cash', 'link')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed')),
  notes TEXT,
  invoice_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================
-- TABLE: order_items
-- ==============================================
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(10, 3) NOT NULL,
  total_price DECIMAL(10, 3) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================
-- TABLE: invoices
-- ==============================================
CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_number TEXT UNIQUE NOT NULL,
  order_id UUID REFERENCES orders(id),
  customer_id UUID REFERENCES customers(id),
  subtotal DECIMAL(10, 3) NOT NULL,
  delivery_fee DECIMAL(10, 3) DEFAULT 2,
  total DECIMAL(10, 3) NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'paid', 'cancelled')),
  payment_method TEXT DEFAULT 'cash' CHECK (payment_method IN ('cash', 'link')),
  due_date DATE,
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================
-- TABLE: transactions
-- ==============================================
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  category TEXT NOT NULL CHECK (category IN ('sales', 'delivery', 'inventory', 'marketing', 'utilities', 'salaries', 'other')),
  amount DECIMAL(10, 3) NOT NULL,
  description TEXT NOT NULL,
  reference_type TEXT CHECK (reference_type IN ('order', 'invoice', 'expense')),
  reference_id UUID,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================
-- TABLE: inventory_logs
-- ==============================================
CREATE TABLE IF NOT EXISTS inventory_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id),
  type TEXT NOT NULL CHECK (type IN ('in', 'out', 'adjustment')),
  quantity INTEGER NOT NULL,
  reason TEXT NOT NULL,
  reference_type TEXT CHECK (reference_type IN ('order', 'restock', 'damage', 'return')),
  reference_id UUID,
  created_by TEXT DEFAULT 'system',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================
-- TABLE: settings
-- ==============================================
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================
-- INSERT DEFAULT SETTINGS
-- ==============================================
INSERT INTO settings (key, value) VALUES
  ('store_name', 'NAFAES | نفائس'),
  ('store_phone', '66377312'),
  ('whatsapp_number', '96566377312'),
  ('delivery_fee', '2'),
  ('address', 'الكويت'),
  ('email', 'info@nafaes.com')
ON CONFLICT (key) DO NOTHING;

-- ==============================================
-- INSERT SAMPLE PRODUCTS
-- ==============================================
INSERT INTO products (name_ar, name_en, type, price, cost_price, short_description, full_description, specs, features, image, sku, category, stock_quantity, min_stock_level) VALUES
  (
    'إيلان 360 نوماد',
    'ELAN 360 NOMAD',
    'جهاز تعطير ذكي قابل للشحن',
    49.000,
    25.000,
    'جهاز تعطير ذكي قابل للشحن يمنحك تجربة عطرية متنقلة وأنيقة.',
    'إيلان 360 نوماد مصمم لمن يبحث عن الفخامة والراحة في جهاز واحد. يعمل ببطارية ليثيوم مدمجة، ويدعم الشحن Type-C، مع انتشار عطري 360° لتوزيع الرائحة بشكل متوازن.',
    '{"السعة": "120 مل", "نوع التشغيل": "بطارية ليثيوم قابلة للشحن", "الشحن": "Type-C", "الانتشار": "360°"}',
    ARRAY['رفاهية متنقلة', 'تشغيل ذكي', 'تصميم فاخر'],
    '/images/elan-nomad.png',
    'ELAN-NOMAD-001',
    'devices',
    15,
    5
  ),
  (
    'إيلان 360 برايم',
    'ELAN 360 PRIME',
    'جهاز تعطير كهربائي',
    42.000,
    20.000,
    'جهاز تعطير كهربائي ثابت بتصميم أنيق، مناسب للمنازل والمكاتب.',
    'إيلان 360 برايم هو جهاز تعطير كهربائي يمنح المكان رائحة ثابتة ومنتظمة طوال اليوم.',
    '{"السعة": "120 مل", "نوع التشغيل": "كهربائي مباشر", "الانتشار": "360°"}',
    ARRAY['فخامة يومية', 'تشغيل ثابت', 'رائحة متوازنة'],
    '/images/elan-prime.png',
    'ELAN-PRIME-001',
    'devices',
    20,
    5
  ),
  (
    'نوار ماجستيه',
    'NOIR MAJESTÉ',
    'جهاز تعطير احترافي بشاشة LCD',
    59.000,
    30.000,
    'جهاز تعطير احترافي للمساحات الراقية والكبيرة، مزود بشاشة LCD وتحكم ذكي.',
    'نوار ماجستيه جهاز تعطير فاخر مناسب للمنازل الكبيرة، المكاتب، الصالونات.',
    '{"السعة": "200 مل", "التغطية": "300–500m³", "الشاشة": "LCD"}',
    ARRAY['مناسب للمساحات الكبيرة', 'تصميم احترافي', 'تحكم ذكي'],
    '/images/noir-majeste.png',
    'NOIR-MAJ-001',
    'devices',
    10,
    3
  ),
  (
    'فورست ريزيرف',
    'FOREST RESERVE',
    'طقم هدايا عطري فاخر',
    13.900,
    6.000,
    'طقم هدايا عطري أنيق يجمع بين زجاجة معطر، شمعة معطرة، وأعواد خشبية.',
    'فورست ريزيرف طقم هدايا عطري فاخر مناسب للإهداء والمناسبات.',
    '{"النوع": "Gift Set", "الطابع العطري": "خشبي / دافئ"}',
    ARRAY['هدية فاخرة', 'جاهز للإهداء', 'تغليف أنيق'],
    '/images/forest-reserve.png',
    'FOREST-RES-001',
    'gifts',
    25,
    5
  ),
  (
    'أمبر سانتال',
    'AMBER SANTAL',
    'معطر أعواد فاخر',
    10.900,
    5.000,
    'معطر أعواد فاخر برائحة دافئة وخشبية، مناسب للديكور والهدايا.',
    'أمبر سانتال معطر أعواد بتصميم أنيق ورائحة دافئة وخشبية.',
    '{"النوع": "Reed Diffuser", "الانتشار": "أعواد خشبية", "مدة الاستخدام": "أكثر من 60 يوم"}',
    ARRAY['زجاجة أنيقة', 'أعواد طبيعية', 'رائحة دافئة'],
    '/images/amber-santal.png',
    'AMBER-SAN-001',
    'diffusers',
    30,
    5
  );

-- ==============================================
-- CREATE INDEXES FOR BETTER PERFORMANCE
-- ==============================================
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_customer ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(type);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(date DESC);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_stock ON products(stock_quantity);

-- ==============================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- ==============================================
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- ==============================================
-- RLS POLICIES (Allow all for now - admin can manage)
-- ==============================================
CREATE POLICY "Allow all for customers" ON customers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for products" ON products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for orders" ON orders FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for order_items" ON order_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for invoices" ON invoices FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for transactions" ON transactions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for inventory_logs" ON inventory_logs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for settings" ON settings FOR ALL USING (true) WITH CHECK (true);