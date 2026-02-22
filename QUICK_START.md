# 🚀 Quick Start Guide - 4Pixels Website

## خطوات التشغيل السريعة

### 1️⃣ تشغيل الـ Backend (Server)

افتح Terminal وشغل:

```bash
cd server
npm start
```

**المفروض تشوف:**
```
🚀 Server running on port 5001
✅ Using local JSON database
📝 Admin credentials: admin@4pixels.com / admin123
```

---

### 2️⃣ تشغيل الـ Frontend (Client)

افتح Terminal تاني (جديد) وشغل:

```bash
cd client
npm start
```

**المفروض يفتح المتصفح على:**
```
http://localhost:3000
```

---

### 3️⃣ دخول الـ Admin Dashboard

#### الطريقة الأولى:
1. روح على: `http://localhost:3000`
2. اضغط **Login** في الـ Header
3. استخدم البيانات:
   - Email: `admin@4pixels.com`
   - Password: `admin123`

#### الطريقة الثانية (مباشرة):
```
http://localhost:3000/login
```

---

## 🧪 اختبار الـ Admin Dashboard

### Test 1: إضافة Service جديد

```
1. روح Admin → Services
2. اضغط "Add Service"
3. املأ البيانات:
   - Title EN: "Test Service"
   - Title AR: "خدمة تجريبية"
   - Description EN: "Test description"
   - Description AR: "وصف تجريبي"
   - Category: اختار من الـ dropdown
   - Price: 100
   - Delivery Time: "1 week"
   - Image: ارفع صورة (اختياري)
   - Features: اضف feature واحد على الأقل
4. اضغط "Save service"
5. روح على الموقع وشوف الـ Service ظهر
```

### Test 2: إضافة Project جديد

```
1. روح Admin → Projects
2. اضغط "Add Project"
3. املأ البيانات:
   - Title EN: "Test Project"
   - Title AR: "مشروع تجريبي"
   - Description EN: "Test description"
   - Description AR: "وصف تجريبي"
   - Category: اختار من الـ dropdown
   - Client: "Test Client"
   - Images: ارفع صورة أو أكثر
4. اضغط "Save project"
5. روح على الموقع وشوف الـ Project ظهر
```

### Test 3: إضافة Review جديد

```
1. روح Admin → Reviews
2. اضغط "Add Review"
3. املأ البيانات:
   - Name EN: "John Doe"
   - Name AR: "جون دو"
   - Review Text EN: "Great service!"
   - Review Text AR: "خدمة رائعة!"
   - Image: ارفع صورة
   - Rating: 5
4. اضغط "Save review"
5. روح على الـ Home page وشوف الـ Review ظهر
```

---

## 🔧 اختبار الـ Database

شغل الـ test script:

```bash
node test-admin.js
```

**المفروض تشوف:**
```
🧪 Testing Admin Dashboard Functionality...

1️⃣ Testing Read Services:
   ✅ Found 3 services

2️⃣ Testing Read Projects:
   ✅ Found 6 projects

3️⃣ Testing Read Reviews:
   ✅ Found 6 reviews

4️⃣ Testing Write Operation:
   ✅ Write operation successful
   ✅ Test service removed

5️⃣ Checking File Permissions:
   ✅ services.json - Read/Write OK
   ✅ projects.json - Read/Write OK
   ✅ reviews.json - Read/Write OK
   ✅ messages.json - Read/Write OK

✅ All tests completed!
```

---

## ❌ لو حصلت مشكلة

### المشكلة: التغييرات مش بتتحفظ

**الحل:**
1. تأكد إن الـ server شغال (port 5001)
2. شوف الـ console في المتصفح (F12)
3. تأكد إن عندك permissions على مجلد `server/data`
4. شغل الـ test script: `node test-admin.js`

### المشكلة: الصور مش بتظهر

**الحل:**
1. تأكد إن الصورة أصغر من 5MB
2. استخدم صور بـ format: JPG, PNG, WebP
3. جرب صورة تانية

### المشكلة: الـ dropdown مش شغال

**الحل:**
1. Refresh الصفحة (Ctrl+F5)
2. Clear cache
3. تأكد إن الـ browser محدث

### المشكلة: Error 401 Unauthorized

**الحل:**
1. سجل خروج (Logout)
2. سجل دخول تاني
3. تأكد من البيانات: `admin@4pixels.com` / `admin123`

---

## 📁 هيكل الملفات

```
4pixels/
├── client/                 # Frontend (React)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Admin.jsx          # Admin Dashboard
│   │   │   ├── Home.jsx           # Home Page
│   │   │   ├── Services.jsx       # Services Page
│   │   │   ├── Projects.jsx       # Projects Page
│   │   │   └── ...
│   │   └── ...
│   └── package.json
│
├── server/                 # Backend (Node.js)
│   ├── data/              # JSON Database
│   │   ├── services.json  # Services data
│   │   ├── projects.json  # Projects data
│   │   ├── reviews.json   # Reviews data
│   │   └── messages.json  # Messages data
│   ├── routes/            # API Routes
│   │   ├── services.js
│   │   ├── projects.js
│   │   ├── reviews.js
│   │   └── ...
│   ├── db.js              # Database functions
│   └── server.js          # Main server file
│
└── test-admin.js          # Test script
```

---

## 🎯 الـ Features المتاحة

### Admin Dashboard:
- ✅ Overview (إحصائيات)
- ✅ Services Management (إدارة الخدمات)
- ✅ Projects Management (إدارة المشاريع)
- ✅ Reviews Management (إدارة الآراء)
- ✅ Messages Inbox (صندوق الرسائل)

### Services:
- ✅ Add/Edit/Delete
- ✅ Category dropdown
- ✅ Image upload
- ✅ Features management
- ✅ Bilingual (EN/AR)

### Projects:
- ✅ Add/Edit/Delete
- ✅ Category dropdown
- ✅ Multiple images upload
- ✅ Image preview
- ✅ Bilingual (EN/AR)

### Reviews:
- ✅ Add/Edit/Delete
- ✅ Image upload
- ✅ Rating (1-5 stars)
- ✅ Active/Inactive toggle
- ✅ Bilingual (EN/AR)

---

## 📞 Support

لو عندك أي مشكلة:
1. شوف الـ console في المتصفح (F12)
2. شوف الـ terminal logs
3. شغل الـ test script: `node test-admin.js`
4. اتواصل معايا!

---

## 🎉 كل حاجة شغالة؟

لو كل الـ tests نجحت، يبقى الموقع جاهز! 🚀

**Next Steps:**
1. ضيف الـ services بتاعتك
2. ضيف الـ projects بتاعتك
3. ضيف الـ reviews
4. خصص الألوان والتصميم
5. Deploy على hosting!
