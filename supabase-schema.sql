-- ============================================
-- NAFAES | نفائس - Database Schema
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. CUSTOMERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS customers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL UNIQUE,
    email TEXT,
    avatar_url TEXT,
    area TEXT,
    block TEXT,
    street TEXT,
    building TEXT,
    floor TEXT,
    apartment TEXT,
    address_text TEXT,
    notes TEXT,
    is_vip BOOLEAN DEFAULT false,
    customer_type TEXT DEFAULT 'retail' CHECK (customer_type IN ('retail', 'wholesale', 'corporate')),
    total_orders INTEGER DEFAULT 0,
    total_spent DECIMAL(10,2) DEFAULT 0,
    loyalty_points INTEGER DEFAULT 0,
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 2. CATEGORIES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name_ar TEXT NOT NULL,
    name_en TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    icon TEXT,
    parent_id UUID REFERENCES categories(id),
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 3. PRODUCTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name_ar TEXT NOT NULL,
    name_en TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    sku TEXT UNIQUE,
    barcode TEXT,
    type TEXT NOT NULL,
    category_id UUID REFERENCES categories(id),
    description_short TEXT,
    description_full TEXT,
    specs JSONB DEFAULT '{}',
    features TEXT[] DEFAULT ARRAY[]::TEXT[],
    images TEXT[] DEFAULT ARRAY[]::TEXT[],
    video_url TEXT,
    price DECIMAL(10,2) NOT NULL,
    cost_price DECIMAL(10,2) DEFAULT 0,
    wholesale_price DECIMAL(10,2),
    discount_price DECIMAL(10,2),
    discount_percent INTEGER,
    discount_start TIMESTAMP WITH TIME ZONE,
    discount_end TIMESTAMP WITH TIME ZONE,
    stock_quantity INTEGER DEFAULT 0,
    reserved_quantity INTEGER DEFAULT 0,
    min_stock_level INTEGER DEFAULT 5,
    unit TEXT DEFAULT 'قطعة',
    weight_kg DECIMAL(8,2),
    dimensions JSONB DEFAULT '{"width": 0, "height": 0, "depth": 0}',
    colors JSONB DEFAULT '[]',
    sizes JSONB DEFAULT '[]',
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    is_active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    is_new BOOLEAN DEFAULT false,
    is_bestseller BOOLEAN DEFAULT false,
    seo_title TEXT,
    seo_description TEXT,
    view_count INTEGER DEFAULT 0,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 4. PRODUCT VARIANTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS product_variants (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    sku TEXT UNIQUE,
    name TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER DEFAULT 0,
    attributes JSONB DEFAULT '{}',
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 5. ORDERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_number TEXT UNIQUE NOT NULL,
    customer_id UUID REFERENCES customers(id),
    customer_name TEXT,
    customer_phone TEXT,
    customer_area TEXT,
    customer_address TEXT,
    subtotal DECIMAL(10,2) NOT NULL,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    coupon_code TEXT,
    delivery_fee DECIMAL(10,2) NOT NULL DEFAULT 2,
    total DECIMAL(10,2) NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN (
        'pending', 'confirmed', 'preparing', 'ready', 
        'shipped', 'delivered', 'cancelled', 'refunded'
    )),
    payment_method TEXT DEFAULT 'cash' CHECK (payment_method IN ('cash', 'knet', 'link', 'bank')),
    payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'partial', 'failed', 'refunded')),
    paid_amount DECIMAL(10,2) DEFAULT 0,
    paid_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    admin_notes TEXT,
    source TEXT DEFAULT 'website' CHECK (source IN ('website', 'whatsapp', 'instagram', 'phone', 'admin')),
    coupon_id UUID,
    estimated_delivery TIMESTAMP WITH TIME ZONE,
    delivered_at TIMESTAMP WITH TIME ZONE,
    cancellation_reason TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 6. ORDER ITEMS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS order_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    variant_id UUID REFERENCES product_variants(id),
    name TEXT NOT NULL,
    sku TEXT,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    discount_price DECIMAL(10,2),
    total_price DECIMAL(10,2) NOT NULL,
    notes TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 7. ORDER STATUS HISTORY TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS order_status_history (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    status TEXT NOT NULL,
    notes TEXT,
    changed_by TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 8. INVOICES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS invoices (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    invoice_number TEXT UNIQUE NOT NULL,
    order_id UUID REFERENCES orders(id),
    customer_id UUID REFERENCES customers(id),
    type TEXT DEFAULT 'invoice' CHECK (type IN ('invoice', 'receipt', 'proforma', 'tax')),
    serial_number INTEGER,
    subtotal DECIMAL(10,2) NOT NULL,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    delivery_fee DECIMAL(10,2) DEFAULT 0,
    total DECIMAL(10,2) NOT NULL,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'viewed', 'paid', 'cancelled', 'void')),
    payment_status TEXT DEFAULT 'pending',
    due_date DATE,
    paid_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    terms TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 9. TRANSACTIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS transactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
    category TEXT NOT NULL CHECK (category IN (
        'sales', 'delivery', 'services', 'other_income',
        'inventory', 'marketing', 'utilities', 'salaries', 
        'rent', 'equipment', 'software', 'other_expense'
    )),
    amount DECIMAL(10,2) NOT NULL,
    description TEXT NOT NULL,
    reference_type TEXT CHECK (reference_type IN ('order', 'invoice', 'expense', 'refund', 'adjustment')),
    reference_id UUID,
    customer_id UUID REFERENCES customers(id),
    order_id UUID REFERENCES orders(id),
    payment_method TEXT CHECK (payment_method IN ('cash', 'knet', 'bank', 'visa', 'mastercard', 'other')),
    receipt_number TEXT,
    date DATE NOT NULL,
    created_by TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 10. INVENTORY LOGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS inventory_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    variant_id UUID REFERENCES product_variants(id),
    type TEXT NOT NULL CHECK (type IN ('in', 'out', 'adjustment', 'damage', 'return')),
    quantity INTEGER NOT NULL,
    balance_before INTEGER,
    balance_after INTEGER,
    reason TEXT NOT NULL,
    order_id UUID REFERENCES orders(id),
    supplier_id UUID,
    reference_type TEXT,
    reference_id UUID,
    notes TEXT,
    created_by TEXT DEFAULT 'system',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 11. COUPONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS coupons (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    type TEXT DEFAULT 'percentage' CHECK (type IN ('percentage', 'fixed', 'free_delivery', 'buy_x_get_y')),
    value DECIMAL(10,2) NOT NULL,
    min_order_amount DECIMAL(10,2),
    max_discount_amount DECIMAL(10,2),
    usage_limit INTEGER,
    used_count INTEGER DEFAULT 0,
    per_customer_limit INTEGER DEFAULT 1,
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    applicable_products UUID[] DEFAULT ARRAY[]::UUID[],
    applicable_categories UUID[] DEFAULT ARRAY[]::UUID[],
    customer_ids UUID[] DEFAULT ARRAY[]::UUID[],
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 12. COUPON USAGE TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS coupon_usage (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    coupon_id UUID REFERENCES coupons(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES customers(id),
    order_id UUID REFERENCES orders(id),
    discount_amount DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 13. SETTINGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS settings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    key TEXT UNIQUE NOT NULL,
    value TEXT NOT NULL,
    type TEXT DEFAULT 'string' CHECK (type IN ('string', 'number', 'boolean', 'json')),
    description TEXT,
    group_name TEXT DEFAULT 'general',
    is_public BOOLEAN DEFAULT false,
    metadata JSONB DEFAULT '{}',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 14. NOTIFICATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS notifications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id TEXT,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    body TEXT,
    data JSONB DEFAULT '{}',
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 15. REVIEWS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS reviews (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES customers(id),
    order_id UUID REFERENCES orders(id),
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    title TEXT,
    comment TEXT,
    images TEXT[] DEFAULT ARRAY[]::TEXT[],
    is_approved BOOLEAN DEFAULT false,
    reply TEXT,
    replied_at TIMESTAMP WITH TIME ZONE,
    helpful_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 16. CUSTOMER ADDRESSES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS customer_addresses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    label TEXT DEFAULT 'منزل',
    area TEXT,
    block TEXT,
    street TEXT,
    building TEXT,
    floor TEXT,
    apartment TEXT,
    directions TEXT,
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 17. WISHLIST TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS wishlist (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(customer_id, product_id)
);

-- ============================================
-- 18. RECENTLY VIEWED TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS recently_viewed (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(customer_id, product_id)
);

-- ============================================
-- 19. ANALYTICS EVENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS analytics_events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    event_type TEXT NOT NULL,
    event_name TEXT NOT NULL,
    user_id TEXT,
    session_id TEXT,
    page_url TEXT,
    referrer TEXT,
    device_type TEXT,
    browser TEXT,
    os TEXT,
    country TEXT,
    city TEXT,
    properties JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 20. CART SESSIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS cart_sessions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id UUID REFERENCES customers(id),
    session_id TEXT,
    items JSONB DEFAULT '[]',
    coupon_code TEXT,
    subtotal DECIMAL(10,2) DEFAULT 0,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    total DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 21. DELIVERY AREAS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS delivery_areas (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name_ar TEXT NOT NULL,
    name_en TEXT NOT NULL,
    delivery_fee DECIMAL(10,2) DEFAULT 2,
    min_order_amount DECIMAL(10,2),
    estimated_days INTEGER DEFAULT 1,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 22. SUPPLIERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS suppliers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    contact_person TEXT,
    phone TEXT,
    email TEXT,
    address TEXT,
    notes TEXT,
    is_active BOOLEAN DEFAULT true,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 23. EXPENSES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS expenses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_method TEXT DEFAULT 'cash',
    supplier_id UUID REFERENCES suppliers(id),
    receipt_number TEXT,
    date DATE NOT NULL,
    created_by TEXT,
    notes TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 24. ACTIVITY LOG TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS activity_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id TEXT,
    action TEXT NOT NULL,
    entity_type TEXT,
    entity_id UUID,
    changes JSONB DEFAULT '{}',
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupon_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE recently_viewed ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE delivery_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PUBLIC POLICIES (Allow All for now)
-- ============================================
CREATE POLICY "Allow all" ON customers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON product_variants FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON orders FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON order_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON order_status_history FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON invoices FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON transactions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON inventory_logs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON coupons FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON coupon_usage FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON notifications FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON reviews FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON customer_addresses FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON wishlist FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON recently_viewed FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON analytics_events FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON cart_sessions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON delivery_areas FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON suppliers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON expenses FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON activity_logs FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to generate order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
DECLARE
    year_str TEXT;
    month_str TEXT;
    day_str TEXT;
    seq_num INTEGER;
BEGIN
    year_str := to_char(NOW(), 'YY');
    month_str := to_char(NOW(), 'MM');
    day_str := to_char(NOW(), 'DD');
    
    SELECT COALESCE(MAX(CAST(SUBSTRING(order_number FROM 11 FOR 4) AS INTEGER)), 0) + 1
    INTO seq_num
    FROM orders
    WHERE order_number LIKE 'ORD-' || year_str || month_str || day_str || '-%';
    
    NEW.order_number := 'ORD-' || year_str || month_str || day_str || '-' || LPAD(seq_num::TEXT, 4, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for order number
CREATE TRIGGER trigger_generate_order_number
    BEFORE INSERT ON orders
    FOR EACH ROW
    EXECUTE FUNCTION generate_order_number();

-- Function to update customer stats on order
CREATE OR REPLACE FUNCTION update_customer_stats()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE customers 
        SET total_orders = total_orders + 1,
            total_spent = total_spent + NEW.total,
            updated_at = NOW()
        WHERE id = NEW.customer_id;
    ELSIF TG_OP = 'UPDATE' AND OLD.status != NEW.status AND NEW.status = 'delivered' THEN
        UPDATE customers 
        SET loyalty_points = loyalty_points + FLOOR(NEW.total / 1)::INTEGER,
            updated_at = NOW()
        WHERE id = NEW.customer_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for customer stats
CREATE TRIGGER trigger_update_customer_stats
    AFTER INSERT OR UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_customer_stats();

-- Function to update product stock on order
CREATE OR REPLACE FUNCTION update_product_stock()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE products 
        SET stock_quantity = stock_quantity - NEW.quantity,
            reserved_quantity = reserved_quantity + NEW.quantity
        WHERE id = NEW.product_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE products 
        SET stock_quantity = stock_quantity + OLD.quantity,
            reserved_quantity = reserved_quantity - OLD.quantity
        WHERE id = OLD.product_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger for product stock
CREATE TRIGGER trigger_update_product_stock
    AFTER INSERT OR DELETE ON order_items
    FOR EACH ROW
    EXECUTE FUNCTION update_product_stock();

-- Function to generate invoice number
CREATE OR REPLACE FUNCTION generate_invoice_number()
RETURNS TRIGGER AS $$
DECLARE
    year_str TEXT;
    month_str TEXT;
    seq_num INTEGER;
BEGIN
    year_str := to_char(NOW(), 'YY');
    month_str := to_char(NOW(), 'MM');
    
    SELECT COALESCE(MAX(serial_number), 0) + 1
    INTO seq_num
    FROM invoices
    WHERE invoice_number LIKE 'INV-' || year_str || month_str || '-%';
    
    NEW.invoice_number := 'INV-' || year_str || month_str || '-' || LPAD(seq_num::TEXT, 4, '0');
    NEW.serial_number := seq_num;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for invoice number
CREATE TRIGGER trigger_generate_invoice_number
    BEFORE INSERT ON invoices
    FOR EACH ROW
    EXECUTE FUNCTION generate_invoice_number();

-- ============================================
-- INDEXES FOR BETTER PERFORMANCE
-- ============================================
CREATE INDEX idx_customers_phone ON customers(phone);
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_active ON products(is_active) WHERE is_active = true;
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_date ON orders(created_at DESC);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);
CREATE INDEX idx_invoices_order ON invoices(order_id);
CREATE INDEX idx_invoices_customer ON invoices(customer_id);
CREATE INDEX idx_transactions_date ON transactions(date DESC);
CREATE INDEX idx_transactions_type ON transactions(type);
CREATE INDEX idx_transactions_category ON transactions(category);
CREATE INDEX idx_inventory_logs_product ON inventory_logs(product_id);
CREATE INDEX idx_inventory_logs_date ON inventory_logs(created_at DESC);
CREATE INDEX idx_reviews_product ON reviews(product_id);
CREATE INDEX idx_reviews_approved ON reviews(is_approved) WHERE is_approved = true;

-- ============================================
-- INSERT DEFAULT DATA
-- ============================================

-- Insert Categories
INSERT INTO categories (name_ar, name_en, description, icon, sort_order) VALUES
('أجهزة التعطير', 'Fragrance Devices', 'أجهزة تعطير ذكية وكهربائية', 'cpu', 1),
('معطرات الأعشاب', 'Reed Diffusers', 'معطرات أعواد فاخرة', 'flower2', 2),
('هدايا عطرية', 'Fragrance Gifts', 'أطقم هدايا عطرية فاخرة', 'gift', 3),
('شموع معطرة', 'Scented Candles', 'شموع معطرة للجو', 'flame', 4),
('إكسسوارات', 'Accessories', 'إكسسوارات التعطير', 'sparkles', 5);

-- Insert Products
INSERT INTO products (name_ar, name_en, slug, sku, type, category_id, price, cost_price, short_description, full_description, specs, features, images, stock_quantity, min_stock_level, is_active, is_featured, tags) 
WITH category_ids AS (
    SELECT id FROM categories WHERE name_en = 'Fragrance Devices'
)
SELECT 
    'إيلان 360 نوماد',
    'ELAN 360 NOMAD',
    'elan-360-nomad',
    'ELAN-NOMAD-001',
    'جهاز تعطير ذكي قابل للشحن',
    (SELECT id FROM category_ids),
    49.000,
    25.000,
    'جهاز تعطير ذكي قابل للشحن يمنحك تجربة عطرية متنقلة وأنيقة.',
    'إيلان 360 نوماد مصمم لمن يبحث عن الفخامة والراحة في جهاز واحد. يعمل ببطارية ليثيوم مدمجة، ويدعم الشحن Type-C، مع انتشار عطري 360° لتوزيع الرائحة بشكل متوازن.',
    '{"السعة": "120 مل", "نوع التشغيل": "بطارية ليثيوم قابلة للشحن", "الشحن": "Type-C", "الانتشار": "360°", "مستويات التحكم": "3 مستويات", "التغطية": "حتى 100 م²"}'::jsonb,
    ARRAY['رفاهية متنقلة', 'تشغيل ذكي', 'تصميم فاخر', 'سهل الحمل', 'مناسب للاستخدام اليومي'],
    ARRAY['/images/elan-nomad.png'],
    15, 5, true, true, ARRAY['جهاز تعطير', 'ذكي', 'محمول']
UNION ALL
SELECT 
    'إيلان 360 برايم',
    'ELAN 360 PRIME',
    'elan-360-prime',
    'ELAN-PRIME-001',
    'جهاز تعطير كهربائي',
    (SELECT id FROM categories WHERE name_en = 'Fragrance Devices'),
    42.000,
    22.000,
    'جهاز تعطير كهربائي ثابت بتصميم أنيق، مناسب للمنازل والمكاتب.',
    'إيلان 360 برايم هو جهاز تعطير كهربائي يمنح المكان رائحة ثابتة ومنتظمة طوال اليوم.',
    '{"السعة": "120 مل", "نوع التشغيل": "كهربائي مباشر", "الانتشار": "360°", "التحكم": "Touch / Bluetooth / Remote"}'::jsonb,
    ARRAY['فخامة يومية', 'تشغيل ثابت', 'رائحة متوازنة', 'تصميم أنيق'],
    ARRAY['/images/elan-prime.png'],
    12, 5, true, true, ARRAY['جهاز تعطير', 'كهربائي']
UNION ALL
SELECT 
    'نوار ماجستيه',
    'NOIR MAJESTÉ',
    'noir-majeste',
    'NOIR-MAJ-001',
    'جهاز تعطير احترافي بشاشة LCD',
    (SELECT id FROM categories WHERE name_en = 'Fragrance Devices'),
    59.000,
    30.000,
    'جهاز تعطير احترافي للمساحات الراقية والكبيرة، مزود بشاشة LCD وتحكم ذكي.',
    'نوار ماجستيه جهاز تعطير فاخر مناسب للمنازل الكبيرة، المكاتب، الصالونات، العيادات.',
    '{"السعة": "200 مل", "التغطية": "300-500m³", "مستوى الصوت": "أقل من 40 dBA", "الشاشة": "LCD", "خيارات التركيب": "Table / Wall / HVAC"}'::jsonb,
    ARRAY['مناسب للمساحات الكبيرة', 'تصميم احترافي', 'تحكم ذكي', 'تشغيل هادئ'],
    ARRAY['/images/noir-majeste.png'],
    8, 3, true, true, ARRAY['جهاز احترافي', 'LCD']
UNION ALL
SELECT 
    'فورست ريزيرف',
    'FOREST RESERVE',
    'forest-reserve',
    'FOREST-001',
    'طقم هدايا عطري فاخر',
    (SELECT id FROM categories WHERE name_en = 'Fragrance Gifts'),
    13.900,
    7.000,
    'طقم هدايا عطري أنيق يجمع بين زجاجة معطر، شمعة معطرة، وأعواد خشبية.',
    'فورست ريزيرف طقم هدايا عطري فاخر مناسب للإهداء والمناسبات.',
    '{"النوع": "Gift Set", "الطابع العطري": "خشبي / دافئ", "الاستخدام": "هدية جاهزة وأنيقة"}'::jsonb,
    ARRAY['هدية فاخرة', 'جاهز للإهداء', 'تغليف أنيق', 'رائحة خشبية دافئة'],
    ARRAY['/images/forest-reserve.png'],
    20, 5, true, true, ARRAY['هدية', 'طقم']
UNION ALL
SELECT 
    'أمبر سانتال',
    'AMBER SANTAL',
    'amber-santal',
    'AMBER-001',
    'معطر أعواد فاخر',
    (SELECT id FROM categories WHERE name_en = 'Reed Diffusers'),
    10.900,
    5.500,
    'معطر أعواد فاخر برائحة دافئة وخشبية، مناسب للديكور والهدايا.',
    'أمبر سانتال معطر أعواد بتصميم أنيق ورائحة دافئة وخشبية.',
    '{"النوع": "Reed Diffuser", "الانتشار": "أعواد خشبية", "مدة الاستخدام": "أكثر من 60 يوم", "التغطية": "20-30 م²"}'::jsonb,
    ARRAY['زجاجة أنيقة', 'أعواد طبيعية', 'رائحة دافئة وخشبية', 'تغليف فاخر'],
    ARRAY['/images/amber-santal.png'],
    25, 5, true, true, ARRAY['معطر', 'أعواد', 'ديكور'];

-- Insert Delivery Areas
INSERT INTO delivery_areas (name_ar, name_en, delivery_fee, estimated_days, sort_order) VALUES
('الأحمدي', 'Ahmadi', 2.000, 2, 1),
('الجهراء', 'Jahra', 2.000, 1, 2),
('الفروانية', 'Farwaniya', 2.000, 1, 3),
('حولي', 'Hawalli', 2.000, 1, 4),
('مبارك الكبير', 'Mubarak Al-Kabeer', 2.000, 1, 5),
('العبدلي', 'Abdali', 2.500, 1, 6),
('السالمية', 'Salmiya', 2.000, 1, 7),
('العديل', 'Al-Adel', 2.000, 1, 8),
('بيان', 'Bayan', 2.000, 1, 9),
('صباح الأحمد', 'Sabah Al-Ahmad', 2.500, 2, 10);

-- Insert Settings
INSERT INTO settings (key, value, type, description, group_name) VALUES
('store_name', 'NAFAES | نفائس', 'string', 'اسم المتجر', 'general'),
('store_email', 'info@nafaes.com', 'string', 'بريد المتجر', 'general'),
('store_phone', '66377312', 'string', 'رقم هاتف المتجر', 'general'),
('whatsapp_number', '96566377312', 'string', 'رقم الواتساب', 'contact'),
('whatsapp_message', 'مرحباً! أرغب بالاستفسار عن منتجات نفائس', 'string', 'رسالة الواتساب الافتراضية', 'contact'),
('delivery_fee', '2.000', 'number', 'رسوم التوصيل الافتراضية', 'delivery'),
('free_delivery_threshold', '50.000', 'number', 'حد التوصيل المجاني', 'delivery'),
('min_order_amount', '5.000', 'number', 'الحد الأدنى للطلب', 'order'),
('currency', 'KWD', 'string', 'العملة', 'general'),
('currency_symbol', 'د.ك', 'string', 'رمز العملة', 'general'),
('tax_percent', '0', 'number', 'نسبة الضريبة', 'tax'),
('order_prefix', 'ORD', 'string', 'بادئة رقم الطلب', 'order'),
('invoice_prefix', 'INV', 'string', 'بادئة رقم الفاتورة', 'invoice'),
('working_hours', '{"from": "9:00", "to": "21:00"}', 'json', 'ساعات العمل', 'general'),
('address', 'الكويت', 'string', 'عنوان المتجر', 'contact');

-- Insert Sample Coupons
INSERT INTO coupons (code, name, type, value, min_order_amount, usage_limit, is_active, start_date, end_date) VALUES
('WELCOME10', 'خصم 10% للترحيب', 'percentage', 10.00, 20.00, 100, true, NOW(), NOW() + INTERVAL '30 days'),
('NAFAES20', 'خصم 20% لنفائس', 'percentage', 20.00, 50.00, 50, true, NOW(), NOW() + INTERVAL '60 days'),
('FREE500', 'توصيل مجاني', 'free_delivery', 0.00, 50.00, 100, true, NOW(), NOW() + INTERVAL '90 days');

-- ============================================
-- COMPLETE
-- ============================================