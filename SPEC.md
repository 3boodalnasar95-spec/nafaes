# NAFAES | نفائس - متجر العطور والهدايا العطرية الفاخرة

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
2. **صفحة المنتجات** - Grid display with all products, category filters
3. **تفاصيل المنتج** - Full product info, add to cart
4. **سلة التسوق** - Cart items, summary
5. **إتمام الطلب** - Customer form, WhatsApp integration
6. **التواصل** - Contact info, WhatsApp

### Pages - Admin Panel
1. **لوحة التحكم** - Dashboard with stats, alerts, quick actions
2. **المنتجات** - CRUD products, stock management
3. **الطلبات** - Order management, status updates

## 4. Features & Interactions

### Customer Features
- تصفح المنتجات بالتصميم الفاخر
- فلترة حسب الفئة (4 فئات)
- البحث في المنتجات
- إضافة للسلة مع تنبيهات
- إتمام الطلب عبر واتساب
- معلومات التواصل

### Admin Features
- لوحة تحكم شاملة مع إحصائيات
- إدارة المنتجات والمخزون
- إدارة الطلبات وتتبع الحالات

### WhatsApp Integration
- رقم الواتساب: 66377312
- رابط: https://wa.me/96566377312
- رسالة منظمة تتضمن جميع بيانات الطلب

## 5. Products (16 Product)

### قسم الأجهزة الكهربائية الفواحة (3 منتجات)
| المنتج | السعر |
|--------|-------|
| إيلان 360 نوماد (ELAN 360 NOMAD) | 49 د.ك |
| إيلان 360 برايم (ELAN 360 PRIME) | 42 د.ك |
| نوار ماجستيه (NOIR MAJESTÉ) | 59 د.ك |

### قسم الزيوت العطرية (11 منتج)
| المنتج | السعر |
|--------|-------|
| بلاك عود (BLACK OUD) | 10.900 د.ك |
| روز مسك (ROSE MUSK) | 10.900 د.ك |
| سانتال فانيلا (SANTAL VANILLA) | 10.900 د.ك |
| أوشن بريز (OCEAN BREEZE) | 10.900 د.ك |
| نايت عود (NIGHT OUD) | 10.900 د.ك |
| أمبر وودز (AMBER WOODS) | 10.900 د.ك |
| عود رويال (OUD ROYAL) | 10.900 د.ك |
| ميستيك (MYSTIQUE) | 10.900 د.ك |
| عربي عود (ARABIAN OUD) | 10.900 د.ك |
| وايت مسك (WHITE MUSK) | 10.900 د.ك |
| فريش لينن (FRESH LINEN) | 10.900 د.ك |

### قسم الفواحات العطرية (1 منتج)
| المنتج | السعر |
|--------|-------|
| أمبر سانتال (AMBER SANTAL) | 10.900 د.ك |

### قسم طقم الهدايا (1 منتج)
| المنتج | السعر |
|--------|-------|
| فورست ريزيرف (FOREST RESERVE) | 13.900 د.ك |

## 6. Technical Approach

### Frontend
- React 19 + TypeScript
- React Router for navigation
- Zustand for state management (cart)
- Tailwind CSS for styling
- RTL direction throughout
- Lucide React for icons
- Responsive design (mobile-first)
- shadcn/ui components
- TanStack Query for data fetching

### Images Structure
```
public/images/
├── logo.png (اللوقو)
├── devices/
│   ├── elan-nomad.png
│   ├── elan-prime.png
│   └── noir-majeste.png
├── oils/
│   ├── black-oud.png
│   ├── rose-musk.png
│   ├── santal-vanilla.png
│   ├── ocean-breeze.png
│   ├── night-oud.png
│   ├── amber-woods.png
│   ├── oud-royal.png
│   ├── mystique.png
│   ├── arabian-oud.png
│   ├── white-musk.png
│   └── fresh-linen.png
├── reed/
│   └── amber-santal.png
└── gifts/
    └── forest-reserve.png
```

## 7. Delivery & Payment

- رسوم التوصيل: 2 د.ك ثابتة (تختلف حسب المنطقة)
- طرق الدفع: كاش عند الاستلام / رابط دفع إلكتروني
- 6 محافظات و 70+ منطقة في الكويت

## 8. Admin Panel Routes

| Route | Page | Description |
|-------|------|-------------|
| /admin/login | AdminLogin | تسجيل الدخول |
| /admin | Dashboard | لوحة التحكم الرئيسية |
| /admin/orders | Orders | إدارة الطلبات |
| /admin/products | Products | إدارة المنتجات |

## 9. Admin Credentials

- **الرابط**: `/admin/login`
- **اسم المستخدم**: `admin`
- **كلمة المرور**: `nafaes2024!@#`