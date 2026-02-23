# إعداد Railway - دليل سريع 🚂

## ✅ الملفات جاهزة!

تم إنشاء الملفات دي عشان Railway يشتغل أوتوماتيك:
- ✅ `server/railway.toml` - إعدادات Railway
- ✅ `nixpacks.toml` - إعدادات Build
- ✅ `Procfile` - أمر التشغيل

---

## 🚀 الخطوات في Railway:

### 1️⃣ إنشاء Service جديد

1. روح على: https://railway.app
2. اضغط **"New Project"**
3. اختار **"Deploy from GitHub repo"**
4. اختار: **`4pixels`**

### 2️⃣ إعدادات المشروع (مهمة جداً!)

بعد ما تختار الـ repo:

#### في صفحة الإعدادات:
1. **Root Directory**: اكتب `server`
2. **اضغط Deploy**

### 3️⃣ إضافة Environment Variables

بعد ما الـ Deploy يبدأ:

1. اضغط على **"Variables"** في القائمة الجانبية
2. أضف المتغيرات دي واحد واحد:

```env
PORT=5001
```
اضغط **Add**

```env
NODE_ENV=production
```
اضغط **Add**

```env
JWT_SECRET=4pixels-super-secret-jwt-key-change-this-to-random-string-123456789
```
اضغط **Add**

```env
CORS_ORIGIN=*
```
اضغط **Add**

```env
FRONTEND_URL=*
```
اضغط **Add**

3. بعد ما تضيف كل المتغيرات، اضغط **"Redeploy"**

---

## 🌐 الحصول على الـ URL

### بعد ما الـ Deploy ينجح:

1. في Railway Dashboard
2. اضغط على **"Settings"**
3. اضغط على **"Networking"**
4. اضغط **"Generate Domain"**
5. هتحصل على URL زي:
   ```
   https://fourpixels-production.up.railway.app
   ```

### اختبر الـ API:

افتح المتصفح وروح على:
```
https://your-railway-url.railway.app/api/services
```

لو شغال، هتشوف JSON بالخدمات! ✅

---

## 📝 ملاحظات مهمة:

### 1. Root Directory
**لازم** تكتب `server` في Root Directory عشان Railway يشتغل من مجلد السيرفر بس.

### 2. Environment Variables
المتغيرات دي **مطلوبة** عشان السيرفر يشتغل:
- `PORT` - رقم المنفذ
- `NODE_ENV` - البيئة (production)
- `JWT_SECRET` - مفتاح التوكن
- `CORS_ORIGIN` - السماح للفرونت بالاتصال
- `FRONTEND_URL` - عنوان الفرونت

### 3. CORS_ORIGIN
دلوقتي حاطين `*` (يسمح لأي حد).
بعد ما ترفع الفرونت على Vercel، هتحدثه لـ:
```
CORS_ORIGIN=https://4pixels.vercel.app
```

---

## 🔧 لو حصلت مشكلة:

### Build Failed
1. تأكد من **Root Directory = server**
2. شوف الـ logs في Railway
3. تأكد من `package.json` موجود في مجلد `server`

### Deploy Failed
1. شوف الـ logs
2. تأكد من Environment Variables موجودة
3. جرب **Redeploy**

### CORS Error (بعد ما ترفع الفرونت)
1. حدث `CORS_ORIGIN` في Railway Variables
2. حطه = URL الفرونت من Vercel
3. **Redeploy**

---

## ✅ Checklist

قبل ما تبدأ:
- [ ] عندك حساب على Railway
- [ ] الـ repo موجود على GitHub
- [ ] الملفات اترفعت (railway.toml, nixpacks.toml)

في Railway:
- [ ] اخترت الـ repo الصح
- [ ] Root Directory = `server`
- [ ] أضفت كل Environment Variables
- [ ] عملت Deploy
- [ ] حصلت على الـ URL
- [ ] اختبرت الـ API

---

## 🎯 الخطوة الجاية:

بعد ما Railway يشتغل:
1. ✅ احفظ الـ URL
2. ✅ اختبر الـ API
3. ➡️ ارفع الفرونت على Vercel
4. ➡️ استخدم Railway URL في Vercel
5. ➡️ حدث CORS_ORIGIN في Railway

---

**جاهز للرفع! 🚀**

افتح Railway وابدأ من الخطوة 1!
