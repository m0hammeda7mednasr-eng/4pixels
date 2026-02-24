# الحل السريع - 5 دقائق ⚡

## المشكلة
النسخة الشغالة: `https://4pixels-git-main-mohs-projects-0b03337a.vercel.app`  
النسخة الرئيسية فيها CORS errors

---

## الحل (5 خطوات)

### 1. افتح Railway
```
https://railway.app → 4pixels → Variables
```

### 2. احذف المتغير الغلط
```
❌ FRONTEND_UR
```

### 3. حدّث المتغيرات
```env
CORS_ORIGIN=https://4pixels-git-main-mohs-projects-0b03337a.vercel.app
FRONTEND_URL=https://4pixels-git-main-mohs-projects-0b03337a.vercel.app
JWT_SECRET=4pixels-secret-key-2024-mohammed-ahmed
```

### 4. Redeploy
اضغط "Redeploy" وانتظر 2 دقيقة

### 5. اختبر
```
https://4pixels-git-main-mohs-projects-0b03337a.vercel.app
```

---

## ✅ خلاص!

**لو محتاج تفاصيل**: شوف `RAILWAY_FIX_STEPS_AR.md`

**Admin Login**:
- Email: `Mohammedahmed@gmail.com`
- Password: `01066184859Mm#`
