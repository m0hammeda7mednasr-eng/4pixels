# 🔷 إصلاح متغيرات Vercel - خطوة بخطوة

## 📋 المتغيرات المطلوبة للفرونت إند:

### في Vercel Dashboard:

1. **افتح المشروع**: https://vercel.com/dashboard
2. اختار: `4pixels` (أو اسم المشروع)
3. اضغط: **Settings** → **Environment Variables**

---

## ✅ المتغير الوحيد المطلوب:

```env
REACT_APP_API_URL=https://4pixels-production.up.railway.app/api
```

### الخطوات:
1. اضغط **Add New**
2. في **Key**: اكتب `REACT_APP_API_URL`
3. في **Value**: اكتب `https://4pixels-production.up.railway.app/api`
4. اختار **Production**, **Preview**, **Development** (الثلاثة)
5. اضغط **Save**

---

## 🔄 Redeploy:

بعد ما تضيف المتغير:

1. روح على تاب **Deployments**
2. اختار آخر deployment
3. اضغط على الـ **⋮** (ثلاث نقط)
4. اختار **Redeploy**
5. استنى 1-2 دقيقة

---

## 🧪 اختبار الموقع:

بعد الـ Redeploy، افتح:
```
https://4pixels-two.vercel.app
```

### تأكد من:
- ✅ الصفحة الرئيسية بتفتح
- ✅ الخدمات والمشاريع بتظهر
- ✅ صفحة الـ Login بتفتح
- ✅ صفحة الـ Contact بتشتغل

---

## 🔐 تسجيل الدخول للـ Admin:

```
URL: https://4pixels-two.vercel.app/admin
Email: Mohammedahmed@gmail.com
Password: 01066184859Mm#
```

---

## ⚠️ ملاحظات:

1. **لا تضيف** متغيرات الباك إند في Vercel (JWT_SECRET, CORS_ORIGIN, إلخ)
2. **REACT_APP_API_URL** لازم ينتهي بـ `/api` (مش `/`)
3. لو غيرت المتغير، لازم تعمل **Redeploy** يدوي
4. تأكد إن الـ Railway شغال قبل ما تجرب Vercel

---

## 🔗 اللينكات:

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Railway Dashboard**: https://railway.app
- **الموقع**: https://4pixels-two.vercel.app
- **Admin**: https://4pixels-two.vercel.app/admin

---

**✨ كده تمام! المفروض كل حاجة تشتغل بعد الخطوات دي.**
