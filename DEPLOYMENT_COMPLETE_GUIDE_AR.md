# 🚀 دليل النشر الكامل - Railway + Vercel

## 📌 نظرة عامة:

- **Frontend (React)**: Vercel → https://4pixels-two.vercel.app
- **Backend (Node.js)**: Railway → https://4pixels-production.up.railway.app
- **Database**: JSON Files (في الباك إند)

---

## 🎯 الخطوات بالترتيب:

### 1️⃣ إصلاح Railway (الباك إند) - الأهم أولاً

#### أ) افتح Railway Dashboard:
```
https://railway.app → 4pixels → Service Variables
```

#### ب) احذف المتغيرات دي (مش محتاجها):
```
❌ REACT_APP_API_URL
❌ SUPABASE_ANON_KEY
❌ SUPABASE_SERVICE_KEY
❌ SUPABASE_URL
❌ FRONTEND_UR (غلط في الاسم)
```

#### ج) ضيف/صحح المتغيرات دي:
```env
NODE_ENV=production
CORS_ORIGIN=https://4pixels-two.vercel.app
FRONTEND_URL=https://4pixels-two.vercel.app
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_2024
```

#### د) احفظ وانتظر:
- Railway هيعمل **Redeploy تلقائي**
- استنى **2-3 دقايق**
- شوف الـ **Logs** تتأكد إن كل حاجة تمام

---

### 2️⃣ اختبار Railway API:

افتح اللينكات دي في المتصفح:

#### Health Check:
```
https://4pixels-production.up.railway.app
```
**المفروض يرجع**:
```json
{"message":"✅ Four Pixels API is running!"}
```

#### Get Services:
```
https://4pixels-production.up.railway.app/api/services
```
**المفروض يرجع**: Array فيه الخدمات

#### Get Projects:
```
https://4pixels-production.up.railway.app/api/projects
```
**المفروض يرجع**: Array فيه المشاريع

---

### 3️⃣ إصلاح Vercel (الفرونت إند):

#### أ) افتح Vercel Dashboard:
```
https://vercel.com/dashboard → 4pixels → Settings → Environment Variables
```

#### ب) تأكد من المتغير ده (أو ضيفه):
```env
REACT_APP_API_URL=https://4pixels-production.up.railway.app/api
```

#### ج) Redeploy:
1. روح على **Deployments**
2. اختار آخر deployment
3. اضغط **⋮** → **Redeploy**
4. استنى **1-2 دقيقة**

---

### 4️⃣ اختبار الموقع الكامل:

#### أ) الصفحة الرئيسية:
```
https://4pixels-two.vercel.app
```
**تأكد من**:
- ✅ الصفحة بتفتح
- ✅ الخدمات بتظهر (horizontal scroll)
- ✅ المشاريع بتظهر (horizontal scroll)
- ✅ الـ Reviews بتظهر

#### ب) صفحة الخدمات:
```
https://4pixels-two.vercel.app/services
```
**تأكد من**: كل الخدمات ظاهرة مع الـ Categories

#### ج) صفحة المشاريع:
```
https://4pixels-two.vercel.app/projects
```
**تأكد من**: كل المشاريع ظاهرة مع الـ Categories

#### د) صفحة Contact:
```
https://4pixels-two.vercel.app/contact
```
**تأكد من**: الفورم بيشتغل وبيبعت رسائل

---

### 5️⃣ تسجيل الدخول للـ Admin:

```
URL: https://4pixels-two.vercel.app/admin
Email: Mohammedahmed@gmail.com
Password: 01066184859Mm#
```

#### في الـ Admin Dashboard تأكد من:
- ✅ **Services Tab**: عرض/إضافة/تعديل/حذف الخدمات
- ✅ **Projects Tab**: عرض/إضافة/تعديل/حذف المشاريع
- ✅ **Reviews Tab**: عرض/إضافة/تعديل/حذف التقييمات
- ✅ **Messages Tab**: عرض الرسائل من Contact Form
- ✅ **Content Tab**: تعديل محتوى الصفحات

---

## 📊 ملخص المتغيرات:

### Railway (Backend) - 4 متغيرات فقط:
```env
NODE_ENV=production
CORS_ORIGIN=https://4pixels-two.vercel.app
FRONTEND_URL=https://4pixels-two.vercel.app
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_2024
```

### Vercel (Frontend) - متغير واحد فقط:
```env
REACT_APP_API_URL=https://4pixels-production.up.railway.app/api
```

---

## 🔧 استكشاف الأخطاء:

### مشكلة: 502 Bad Gateway
**الحل**:
1. تأكد إن Railway شغال (شوف الـ Logs)
2. تأكد من المتغيرات صح
3. جرب تعمل Redeploy في Railway

### مشكلة: CORS Error
**الحل**:
1. تأكد إن `CORS_ORIGIN` في Railway = رابط Vercel بالظبط
2. تأكد إن `FRONTEND_URL` في Railway = رابط Vercel بالظبط
3. اعمل Redeploy في Railway

### مشكلة: 404 Not Found
**الحل**:
1. تأكد إن `REACT_APP_API_URL` في Vercel صح
2. تأكد إنه بينتهي بـ `/api` (مش `/`)
3. اعمل Redeploy في Vercel

### مشكلة: Login مش شغال
**الحل**:
1. تأكد من الـ Email والـ Password صح
2. تأكد إن `JWT_SECRET` موجود في Railway
3. شوف الـ Console في المتصفح (F12)

---

## 📱 معلومات الاتصال:

```
Phone: +20 106 618 4859
WhatsApp: +201066184859
Email: Mohammedahmed@gmail.com
```

---

## 🎨 الميزات المتاحة:

### في الموقع:
- ✅ Hero Banner (550px height, 480px mobile)
- ✅ Services Section (horizontal scroll)
- ✅ Projects Section (horizontal scroll)
- ✅ Reviews Section (Shopify style)
- ✅ Contact Form (WhatsApp integration)
- ✅ Dark Mode / Light Mode
- ✅ Arabic / English
- ✅ Responsive Design

### في الـ Admin:
- ✅ Services Management (CRUD + Categories + Image Upload)
- ✅ Projects Management (CRUD + Categories + Multiple Images)
- ✅ Reviews Management (CRUD + Star Ratings)
- ✅ Messages Management (View + Delete)
- ✅ Content Management (Edit About/Contact)

### Categories المتاحة:
- Shopify Development
- Website Development
- Data Entry
- AI Generation
- CRM Systems
- Google Sheets Integration
- Automation

---

## 🔗 اللينكات المهمة:

| الخدمة | اللينك |
|--------|--------|
| الموقع | https://4pixels-two.vercel.app |
| Admin | https://4pixels-two.vercel.app/admin |
| API | https://4pixels-production.up.railway.app |
| Railway Dashboard | https://railway.app |
| Vercel Dashboard | https://vercel.com/dashboard |
| GitHub Repo | https://github.com/m0hammeda7mednasr-eng/4pixels |

---

## ✅ Checklist النشر:

- [ ] Railway Variables صحيحة (4 متغيرات)
- [ ] Railway Deployment نجح
- [ ] Railway API بيرد على Health Check
- [ ] Vercel Variables صحيحة (متغير واحد)
- [ ] Vercel Deployment نجح
- [ ] الصفحة الرئيسية بتفتح
- [ ] الخدمات والمشاريع بتظهر
- [ ] Contact Form بيشتغل
- [ ] Admin Login بيشتغل
- [ ] Admin Dashboard كل التابات شغالة

---

**🎉 مبروك! موقعك دلوقتي Live على الإنترنت!**

**📞 لو محتاج مساعدة، ابعتلي على WhatsApp: +201066184859**
