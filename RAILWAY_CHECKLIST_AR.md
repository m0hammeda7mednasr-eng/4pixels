# Railway Variables Checklist ✅

## افتح Railway Dashboard
```
https://railway.app → 4pixels → Variables
```

---

## 1️⃣ احذف المتغير الغلط

### ❌ احذف ده:
```
FRONTEND_UR
```
(فيه خطأ إملائي)

**طريقة الحذف**:
- لاقي `FRONTEND_UR`
- اضغط `⋮` (three dots)
- اختار "Delete"

---

## 2️⃣ حدّث المتغيرات الموجودة

### CORS_ORIGIN
```
https://4pixels-git-main-mohs-projects-0b03337a.vercel.app
```

### FRONTEND_URL
```
https://4pixels-git-main-mohs-projects-0b03337a.vercel.app
```

### NODE_ENV
```
production
```

---

## 3️⃣ أضف المتغيرات الناقصة

### JWT_SECRET
```
4pixels-secret-key-2024-mohammed-ahmed
```

### REACT_APP_API_URL
```
https://4pixels-production.up.railway.app/api
```

---

## 4️⃣ متغيرات Supabase (اختياري)

### SUPABASE_URL
```
https://kkwsonkyoaubyzkvfftl.supabase.co
```

### SUPABASE_ANON_KEY
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtrd3Nvbmt5b2F1Ynl6a3ZmZnRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4OTg2NDIsImV4cCI6MjA4NzQ3NDY0Mn0.Zn-Uae_gr1FE4iCgY3FrL4qhydDrCBK_VA05Q6okmI4
```

### SUPABASE_SERVICE_KEY
```
sb_publishable_64PNNISj3KMJXAubknLRVQ_QnsTM1K8
```

---

## 5️⃣ Redeploy

1. اضغط تاب "Deployments"
2. اضغط "Redeploy"
3. انتظر 2-3 دقائق

---

## 6️⃣ اختبر

### اختبر الـ API:
```
https://4pixels-production.up.railway.app/api/services
```

### اختبر الموقع:
```
https://4pixels-git-main-mohs-projects-0b03337a.vercel.app
```

---

## ✅ قائمة الفحص

- [ ] حذفت `FRONTEND_UR`
- [ ] حدثت `CORS_ORIGIN`
- [ ] حدثت `FRONTEND_URL`
- [ ] حدثت `NODE_ENV`
- [ ] أضفت `JWT_SECRET`
- [ ] أضفت `REACT_APP_API_URL`
- [ ] أضفت متغيرات Supabase (اختياري)
- [ ] عملت Redeploy
- [ ] الـ API شغال
- [ ] الموقع شغال
- [ ] مفيش CORS errors

---

## 🎉 خلصت!

الموقع المفروض يشتغل دلوقتي!

**لو في مشكلة**: شوف `RAILWAY_FIX_STEPS_AR.md`
