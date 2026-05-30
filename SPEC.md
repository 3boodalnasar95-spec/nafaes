# NAFAES | نفائس - متجر العطور والهدايا العطرية

## 1. Concept & Vision

متجر إلكتروني فاخر متكامل لبيع منتجات تعطير المنازل والهدايا العطرية في الكويت. التصميم يعكس الفخامة والرقي مع هوية بصرية متناسقة تجمع بين الأناقة الكلاسيكية والحداثة العصرية. الهدف: تقديم تجربة تسوق استثنائية تناسب العميل الكويتي الباحث عن التميز.

## 2. Design Language

### Aesthetic Direction
- تصميم فاخر وراقي بطابع Luxury Minimal
- ألوان دافئة وهادئة مع لمسات ذهبية
- خلفيات رخامية ناعمة

### Color Palette
- Primary: `#C9A96E` (ذهبي فاخر)
- Secondary: `#8B7355` (بيج داكن)
- Accent: `#D4AF37` (ذهبي لامع)
- Background: `#FAF8F5` (كريمي فاتح)
- Surface: `#F5F0E8` (عاجي)
- Text Primary: `#1A1A1A` (أسود فاخر)
- Text Secondary: `#6B6B6B` (رمادي داكن)
- Success: `#7C9A6E` (أخضر زيتوني)
- Gold Gradient: `linear-gradient(135deg, #C9A96E, #D4AF37)`

### Typography
- Font: `Tajawal` للعربية (Google Fonts)
- Headings: Bold, generous letter-spacing
- Body: Regular, excellent readability

### Motion Philosophy
- Subtle fade-in animations
- Smooth hover transitions (300ms)
- Elegant scale effects on interactive elements

## 3. Layout & Structure

### Pages - Customer
1. **الصفحة الرئيسية** - Hero, featured products, about, Instagram posts
2. **صفحة المنتجات** - Grid display with all products
3. **تفاصيل المنتج** - Full product info, add to cart
4. **سلة التسوق** - Cart items, summary
5. **إتمام الطلب** - Customer form, WhatsApp integration
6. **التواصل** - Contact info, WhatsApp

### Pages - Admin Panel
1. **لوحة التحكم** - Dashboard with stats, alerts, quick actions
2. **المنتجات** - CRUD products, stock management
3. **المخزون** - Inventory tracking, low stock alerts
4. **الطلبات** - Order management, status updates
5. **الفواتير** - Invoice management, printing
6. **العملاء** - Customer database
7. **المحاسبة** - Income/expense tracking, reports
8. **الإعدادات** - Store settings

### Floating Elements
- WhatsApp floating button (bottom-left)

## 4. Features & Interactions

### Customer Features
- تصفح المنتجات بتصميم فاخر
- إضافة للسلة مع تنبيهات
- إتمام الطلب عبر واتساب
- معلومات التواصل

### Admin Features
- لوحة تحكم شاملة مع إحصائيات
- إدارة المنتجات والمخزون
- إدارة الطلبات وتتبع الحالات
- نظام محاسبة متكامل
- إدارة العملاء
- إنشاء وطباعة الفواتير
- تقارير وإحصائيات متقدمة

### WhatsApp Integration
- رقم الواتساب: 66377312
- رابط: https://wa.me/96566377312
- رسالة منظمة تتضمن جميع بيانات الطلب

## 5. Products

1. **ELAN 360 NOMAD** - جهاز تعطير ذكي قابل للشحن - 49 د.ك
2. **ELAN 360 PRIME** - جهاز تعطير كهربائي - 42 د.ك
3. **NOIR MAJESTÉ** - جهاز تعطير احترافي بشاشة LCD - 59 د.ك
4. **FOREST RESERVE** - طقم هدايا عطري فاخر - 13.900 د.ك
5. **AMBER SANTAL** - معطر أعواد فاخر - 10.900 د.ك

## 6. Technical Approach

### Frontend
- React + TypeScript
- React Router for navigation
- Zustand for state management (cart)
- Tailwind CSS for styling
- RTL direction throughout
- Lucide React for icons
- Responsive design (mobile-first)
- shadcn/ui components

### Backend (Supabase)
- PostgreSQL database
- Row Level Security (RLS)
- Real-time subscriptions ready

### Database Schema

#### customers
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | TEXT | Customer name |
| phone | TEXT | Phone number |
| area | TEXT | Delivery area |
| address | TEXT | Full address |
| email | TEXT | Email (optional) |
| notes | TEXT | Notes |
| created_at | TIMESTAMP | Creation date |

#### products
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name_ar | TEXT | Arabic name |
| name_en | TEXT | English name |
| type | TEXT | Product type |
| price | DECIMAL | Selling price |
| cost_price | DECIMAL | Cost price |
| stock_quantity | INTEGER | Current stock |
| min_stock_level | INTEGER | Low stock alert level |
| is_active | BOOLEAN | Active status |
| sku | TEXT | Stock keeping unit |
| specs | JSONB | Specifications |
| features | TEXT[] | Features array |

#### orders
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| order_number | TEXT | Unique order number |
| customer_id | UUID | FK to customers |
| subtotal | DECIMAL | Items total |
| delivery_fee | DECIMAL | Delivery fee |
| total | DECIMAL | Grand total |
| status | TEXT | Order status |
| payment_method | TEXT | cash/link |
| payment_status | TEXT | Payment status |

#### order_items
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| order_id | UUID | FK to orders |
| product_id | UUID | FK to products |
| quantity | INTEGER | Quantity |
| unit_price | DECIMAL | Price per unit |
| total_price | DECIMAL | Line total |

#### invoices
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| invoice_number | TEXT | Unique invoice number |
| order_id | UUID | FK to orders |
| customer_id | UUID | FK to customers |
| total | DECIMAL | Invoice total |
| status | TEXT | Invoice status |
| due_date | DATE | Payment due date |

#### transactions
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| type | TEXT | income/expense |
| category | TEXT | Transaction category |
| amount | DECIMAL | Amount |
| description | TEXT | Description |
| date | DATE | Transaction date |

#### inventory_logs
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| product_id | UUID | FK to products |
| type | TEXT | in/out/adjustment |
| quantity | INTEGER | Quantity changed |
| reason | TEXT | Reason for change |

## 7. Delivery & Payment

- رسوم التوصيل: 2 د.ك ثابتة
- طرق الدفع: كاش عند الاستلام / رابط دفع إلكتروني

## 8. Admin Panel Routes

| Route | Page | Description |
|-------|------|-------------|
| /admin | Dashboard | Main dashboard |
| /admin/products | Products | Product management |
| /admin/inventory | Inventory | Stock management |
| /admin/orders | Orders | Order management |
| /admin/invoices | Invoices | Invoice management |
| /admin/customers | Customers | Customer database |
| /admin/accounting | Accounting | Finance tracking |
| /admin/settings | Settings | Store settings |