# NAFAES | نفائس - دليل النشر

## نظرة عامة
متجر إلكتروني فاخر للعطور والهدايا العطرية مبني على React + Vite + Supabase.

## المتطلبات
- Node.js 18+
- حساب [Vercel](https://vercel.com) (للنشر)
- حساب [Supabase](https://supabase.com) (لقاعدة البيانات)

---

## 1) إعداد Supabase

1. أنشئ مشروع جديد في [Supabase Dashboard](https://supabase.com/dashboard)
2. من SQL Editor، شغّل محتوى ملف [`supabase-schema.sql`](./supabase-schema.sql)
3. من Settings → API، انسخ:
   - `Project URL` → `VITE_SUPABASE_URL`
   - `anon public key` → `VITE_SUPABASE_ANON_KEY`

---

## 2) الإعداد المحلي

```bash
npm install
cp .env.example .env
```

املأ ملف `.env`:

```env
VITE_ADMIN_USERNAME=admin
VITE_ADMIN_PASSWORD=كلمة-مرور-قوية-هنا
VITE_WHATSAPP_NUMBER=96566377312
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
```

شغّل المشروع محلياً:
```bash
npm run dev
```

افتح: http://localhost:8080

---

## 3) تعبئة المنتجات في Supabase

بعد إعداد Supabase، ادخل لوحة التحكم:
- افتح: http://localhost:8080/admin/login
- اسم المستخدم: `admin`
- كلمة المرور: من ملف `.env`

ثم اذهب إلى: **إضافة المنتجات** (في القائمة الجانبية)
اضغط زر "إضافة المنتجات" لنقل الـ 5 منتجات المحلية إلى قاعدة البيانات.

---

## 4) النشر على Vercel

### عبر الواجهة
1. ارفع المشروع على GitHub
2. من [Vercel Dashboard](https://vercel.com/dashboard) → New Project
3. اختر المستودع
4. أضف متغيرات البيئة في "Environment Variables":
   - `VITE_ADMIN_USERNAME`
   - `VITE_ADMIN_PASSWORD`
   - `VITE_WHATSAPP_NUMBER`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. اضغط Deploy

### عبر CLI
```bash
npm i -g vercel
vercel login
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
vercel env add VITE_ADMIN_USERNAME
vercel env add VITE_ADMIN_PASSWORD
vercel env add VITE_WHATSAPP_NUMBER
vercel --prod
```

---

## 5) بعد النشر

- [ ] تحقّق من ظهور المنتجات على الصفحة الرئيسية
- [ ] تحقّق من عمل صفحة `/products`
- [ ] ادخل `/admin/login` وتحقق من ظهور المنتجات في `/admin/products`
- [ ] اذهب لـ `/admin/seed` وانقل المنتجات إلى قاعدة البيانات
- [ ] جرّب إنشاء طلب جديد وتحقق من ظهوره في لوحة التحكم
- [ ] فعّل HTTPS فقط

---

## 6) الأوامر المتاحة

```bash
npm run dev          # تشغيل خادم التطوير
npm run build        # بناء النسخة الإنتاجية
npm run preview      # معاينة البناء محلياً
npm run lint         # فحص ESLint
npm test             # تشغيل اختبارات الوحدات (29 اختبار)
npm run test:watch   # اختبارات بوضع المراقبة
```

---

## 7) استكشاف الأخطاء

### المنتجات لا تظهر في لوحة التحكم
- تحقق من إضافة `VITE_SUPABASE_URL` و `VITE_SUPABASE_ANON_KEY` بشكل صحيح
- اذهب إلى `/admin/seed` وانقل المنتجات إلى قاعدة البيانات
- تحقق من تنفيذ `supabase-schema.sql` بنجاح

### لا يمكن تسجيل دخول الأدمن
- تحقق من `VITE_ADMIN_USERNAME` و `VITE_ADMIN_PASSWORD`
- امسح `sessionStorage` في المتصفح (قد يكون محظوراً بسبب محاولات فاشلة)

### البناء يفشل
- احذف `node_modules` و `package-lock.json` وأعد التثبيت
- تأكد من إصدار Node.js ≥ 18

---

## معلومات إضافية

- **المتجر يعمل بدون Supabase**: الموقع يعرض المنتجات من ملف `src/data/products.ts` تلقائياً
- **لوحة التحكم تعمل بدون Supabase**: تعرض المنتجات المحلية مع شارة "وضع العرض المحلي"
- **الطلبات تُرسل عبر WhatsApp**: رقم `96566377312`