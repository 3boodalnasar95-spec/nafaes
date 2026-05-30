# طريقة إعداد Supabase لمشروع NAFAES

## الخطوة 1: نسخ الـ Schema

1. افتح [Supabase Dashboard](https://supabase.com/dashboard)
2. اختر مشروعك
3. من القائمة الجانبية: **SQL Editor**
4. اضغط **New Query**
5. انسخ محتوى ملف `supabase-schema.sql` والصقه
6. اضغط **Run** ▶️

## الخطوة 2: إعداد Row Level Security

الـ Schema اللي نسخته يشمل RLS، بس لازم نفعّل Policies:

1. في الـ SQL Editor، Schema موجود فيه كل الـ Policies
2. لو فيه خطأ، نفذ الـ SQL على أجزاء

## الخطوة 3: اختبار الاتصال

بعد ما تنفذ الـ SQL:
- روح لـ **Table Editor**
- بتلاقي كل الجداول: orders, order_items, products, customers, notifications, settings, transactions, invoices, inventory_logs

## الخطوة 4: أضف منتجات

اختياري - أضف المنتجات يدوياً أو عن طريق لوحة التحكم

---

## ✅ ملخص

- ✅ Credentials مضافة في `.env`
- ✅ Schema جاهز للتطبيق
- ✅ RLS مفعل
- ✅ كل الجداول جاهزة

## 🔍 ملاحظة

لما تنفذ الـ SQL، تأكد من:
1. ما فيه أخطاء في Syntax
2. كل الجداول اتنشأت
3. الـ Indexes اتنشأت