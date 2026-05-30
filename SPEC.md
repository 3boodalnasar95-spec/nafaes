# TechStore - متجر التقنيات والأجهزة الإلكترونية

## 1. Concept & Vision

متجر إلكتروني احترافي متكامل للتقنيات والأجهزة الإلكترونية، يشبه نيوتيك في التصميم والوظائف. يجمع بين الأناقة العصرية والوظائف العملية، مع لوحة تحكم إدارية قوية لإدارة المنتجات والطلبات والمحتوى.

## 2. Design Language

### Aesthetic Direction
- تصميم عصري وتقني بطابع Dark Tech
- ألوان داكنة مع لمسات نيون زرقاء
- خطوط نظيفة وظلال ناعمة

### Color Palette
- Primary: `#3B82F6` (أزرق تقني)
- Secondary: `#10B981` (أخضر متجانس)
- Accent: `#8B5CF6` (بنفسجي)
- Background: `#0F172A` (كحلي داكن)
- Surface: `#1E293B` (رمادي داكن)
- Text Primary: `#F8FAFC`
- Text Secondary: `#94A3B8`
- Danger: `#EF4444`
- Warning: `#F59E0B`

### Typography
- Font: `Cairo` للعربية (Google Fonts)
- Headings: Bold, tracking tight
- Body: Regular, good line-height

### Motion Philosophy
- Smooth transitions 300ms ease
- Hover effects with scale and glow
- Page transitions with fade
- Loading skeletons

## 3. Layout & Structure

### Pages
1. **الصفحة الرئيسية** - Hero section, products showcase, categories, features
2. **صفحة المنتجات** - Grid display with filters and search
3. **صفحة تفاصيل المنتج** - Full product info, gallery, add to cart
4. **سلة التسوق** - Cart items, total, checkout
5. **من نحن** - Company info, team, mission
6. **خدماتنا** - Services offered
7. **المدونة** - Articles and news
8. **تواصل معنا** - Contact form, map, info
9. **لوحة التحكم** - Admin dashboard with full management

### Admin Panel Features
- Dashboard with stats
- إدارة المنتجات (CRUD)
- إدارة الطلبات
- إدارة المستخدمين
- إدارة المدونة
- الإعدادات

## 4. Features & Interactions

### Core Features
- تصفح المنتجات والتصفية حسب الفئة والسعر
- البحث الذكي
- سلة التسوق مع إدارة الكميات
- نموذج تواصل فعال
- لوحة تحكم متكاملة

### Admin Capabilities
- إضافة/تعديل/حذف المنتجات
- إدارة الطلبات وتغيير حالتها
- عرض الإحصائيات والرسوم البيانية
- إدارة المحتوى

## 5. Component Inventory

### Navigation
- Header ثابت مع شعار وروابط وسلة
- Mobile menu hamburger
- Search bar

### Product Cards
- صورة + اسم + سعر + تقييم + زر إضافة
- Hover effect مع scale

### Admin Components
- Sidebar navigation
- Data tables with actions
- Forms for CRUD operations
- Charts and stats cards

## 6. Technical Approach

- React + TypeScript
- React Router for navigation
- Zustand for state management (cart, products)
- Tailwind CSS for styling
- Lucide React for icons
- Recharts for admin charts
- Responsive design (mobile-first)
