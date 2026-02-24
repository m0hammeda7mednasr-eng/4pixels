# 🚂 Railway Variables - الإعدادات الكاملة

## ⚠️ المشكلة الحالية
- المتغير `FRONTEND_UR` غلط ❌
- لازم يكون `FRONTEND_URL` ✅
- مفيش `JWT_SECRET` ❌

## 📋 Railway Variables المطلوبة

اذهب إلى Railway Dashboard → Variables وأضف هذه المتغيرات:

### 1. PORT
```
PORT=5001
```

### 2. NODE_ENV
```
NODE_ENV=production
```

### 3. JWT_SECRET (مهم جداً!)
```
JWT_SECRET=fourpixels_secret_key_2024_production
```

### 4. CORS_ORIGIN
```
CORS_ORIGIN=https://4pixels-two.vercel.app
```

### 5. FRONTEND_URL (صحح الاسم!)
```
FRONTEND_URL=https://4pixels-two.vercel.app
```

## 🔧 خطوات التصحيح

### الخطوة 1: احذف المتغير الغلط
1. اذهب إلى Railway Dashboard
2. اضغط على Variables
3. احذف `FRONTEND_UR` (الغلط)

### الخطوة 2: أضف المتغيرات الصحيحة
انسخ والصق كل متغير:

```env
PORT=5001
NODE_ENV=production
JWT_SECRET=fourpixels_secret_key_2024_production
CORS_ORIGIN=https://4pixels-two.vercel.app
FRONTEND_URL=https://4pixels-two.vercel.app
```

### الخطوة 3: احفظ وأعد النشر
1. اضغط Save
2. Railway سيعيد النشر تلقائياً
3. انتظر 2-3 دقائق

## ✅ التحقق من النجاح

بعد إعادة النشر، افتح:
```
https://4pixels-production.up.railway.app
```

يجب أن ترى:
```json
{
  "message": "✅ Four Pixels API is running!"
}
```

## 🔍 فحص الـ Logs

في Railway Dashboard → Deployments → View Logs

يجب أن ترى:
```
🚀 Server running on port 5001
🌍 Environment: production
🔐 JWT Secret: ✅ Configured
✅ Using local JSON database
🔗 Allowed origins: https://4pixels-two.vercel.app
📧 Admin Email: Mohammedahmed@gmail.com
🔑 Admin Password: 01066184859Mm#
```

## 🎯 بيانات الدخول للـ Admin

```
Email: Mohammedahmed@gmail.com
Password: 01066184859Mm#
```

## 📱 رقم الواتساب والتليفون

```
Phone: +20 106 618 4859
WhatsApp: +201066184859
```

## 🔗 الروابط النهائية

- **Frontend (Vercel)**: https://4pixels-two.vercel.app
- **Backend (Railway)**: https://4pixels-production.up.railway.app
- **Admin Panel**: https://4pixels-two.vercel.app/admin

## ⚠️ ملاحظات مهمة

1. **JWT_SECRET** لازم يكون موجود عشان الـ Login يشتغل
2. **FRONTEND_URL** (مش FRONTEND_UR) عشان الـ CORS يشتغل
3. لو غيرت الـ Variables، Railway هيعيد النشر تلقائياً
4. الـ Logs مهمة جداً لمعرفة المشاكل

## 🐛 حل المشاكل الشائعة

### مشكلة: 502 Bad Gateway
**الحل**: تأكد إن الـ PORT = 5001 والـ server شغال

### مشكلة: CORS Error
**الحل**: تأكد إن FRONTEND_URL صحيح ومش FRONTEND_UR

### مشكلة: Login مش شغال
**الحل**: تأكد إن JWT_SECRET موجود في Railway Variables

### مشكلة: Cannot read properties of undefined
**الحل**: تأكد إن كل الـ Variables موجودة ومكتوبة صح
