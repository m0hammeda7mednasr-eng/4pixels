# 🔷 Vercel Variables - الإعدادات الكاملة

## 📋 Vercel Environment Variables المطلوبة

اذهب إلى Vercel Dashboard → Settings → Environment Variables

### المتغير الوحيد المطلوب:

```
REACT_APP_API_URL=https://4pixels-production.up.railway.app/api
```

## 🔧 خطوات الإعداد

### الخطوة 1: افتح Vercel Dashboard
1. اذهب إلى https://vercel.com/dashboard
2. اختر مشروع `4pixels`
3. اضغط على Settings
4. اضغط على Environment Variables

### الخطوة 2: أضف المتغير
1. في حقل Key: `REACT_APP_API_URL`
2. في حقل Value: `https://4pixels-production.up.railway.app/api`
3. اختر: Production, Preview, Development (الثلاثة)
4. اضغط Save

### الخطوة 3: أعد النشر
1. اذهب إلى Deployments
2. اضغط على آخر Deployment
3. اضغط على الثلاث نقط (...)
4. اختر Redeploy
5. انتظر 2-3 دقائق

## ✅ التحقق من النجاح

بعد إعادة النشر، افتح:
```
https://4pixels-two.vercel.app
```

يجب أن:
- الموقع يفتح بدون مشاكل ✅
- الـ Services والـ Projects تظهر ✅
- الـ Contact Form يشتغل ✅
- الـ Admin Login يشتغل ✅

## 🔗 الروابط

- **Production**: https://4pixels-two.vercel.app
- **Working Version**: https://4pixels-git-main-mohs-projects-0b03337a.vercel.app
- **Admin Panel**: https://4pixels-two.vercel.app/admin

## 📝 ملاحظات

1. الـ `REACT_APP_API_URL` لازم يبدأ بـ `REACT_APP_` عشان React يقراه
2. لازم ينتهي بـ `/api` (مش `/`)
3. لو غيرت الـ Variable، لازم تعمل Redeploy
4. الـ Environment Variables بتتطبق على كل الـ Deployments الجديدة

## 🎯 الملف المحلي

في المشروع المحلي، الملف `client/.env.production`:

```env
REACT_APP_API_URL=https://4pixels-production.up.railway.app/api
```

هذا الملف موجود في Git وVercel هيستخدمه تلقائياً.

## ⚠️ مهم جداً

لو الـ Railway Backend مش شغال، الـ Frontend مش هيشتغل!

تأكد إن:
1. Railway Backend شغال: https://4pixels-production.up.railway.app
2. يرجع: `{"message": "✅ Four Pixels API is running!"}`
3. لو مش شغال، راجع `RAILWAY_VARIABLES_COMPLETE.md`
