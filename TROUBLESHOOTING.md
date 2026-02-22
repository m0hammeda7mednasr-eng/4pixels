# 🔧 دليل حل المشاكل - Troubleshooting Guide

## 🚨 المشاكل الشائعة وحلولها

### 1. مشكلة: السيرفر لا يبدأ

#### الأعراض:
```
Error: Cannot find module 'express'
```

#### الحل:
```bash
cd server
rm -rf node_modules package-lock.json
npm install
npm start
```

---

### 2. مشكلة: الواجهة لا تبدأ

#### الأعراض:
```
Error: Cannot find module 'react'
```

#### الحل:
```bash
cd client
rm -rf node_modules package-lock.json
npm install
npm start
```

---

### 3. مشكلة: خطأ في تسجيل الدخول

#### الأعراض:
- "Invalid credentials"
- "Token is not valid"

#### الحل:
1. تأكد من البيانات الصحيحة:
   - Email: `admin@4pixels.com`
   - Password: `admin123`

2. تحقق من ملف `server/data/users.json`:
```json
[
  {
    "id": "admin-001",
    "email": "admin@4pixels.com",
    "password": "$2a$10$5nBOpfbURDEZe4T/BAdHb.QyTd9fRknP08Iq95Y3ZXDR/SfhTUFma",
    "role": "admin",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

3. إذا لم يعمل، أعد إنشاء المستخدم:
```bash
# في terminal السيرفر
# أوقف السيرفر (Ctrl+C)
# احذف ملف users.json
rm server/data/users.json
# شغل السيرفر مرة أخرى
npm start
# سجل مستخدم جديد من /login
```

---

### 4. مشكلة: "Failed to fetch data" في Admin

#### الأعراض:
- لوحة التحكم فارغة
- رسالة خطأ "Failed to fetch data"

#### الحل:

**الخطوة 1: تحقق من السيرفر**
```bash
# تأكد من أن السيرفر يعمل
curl http://localhost:5001/
# يجب أن ترى: {"message":"✅ Four Pixels API is running!"}
```

**الخطوة 2: تحقق من الـ API URL**
- افتح `client/src/services/api.js`
- تأكد من: `baseURL: 'http://localhost:5001/api'`

**الخطوة 3: تحقق من CORS**
- افتح Developer Tools → Console
- إذا رأيت خطأ CORS، تأكد من أن السيرفر يستخدم `cors()`

**الخطوة 4: تحقق من Token**
```javascript
// في Console المتصفح
localStorage.getItem('token')
// يجب أن يظهر token
```

---

### 5. مشكلة: "Access denied. Admin only"

#### الأعراض:
- لا يمكن إضافة/تعديل/حذف البيانات
- رسالة "Access denied"

#### الحل:

**تحقق من role المستخدم:**
```javascript
// في Console المتصفح
const token = localStorage.getItem('token');
const decoded = JSON.parse(atob(token.split('.')[1]));
console.log(decoded.role); // يجب أن يكون "admin"
```

**إذا لم يكن admin:**
1. احذف المستخدم الحالي من `server/data/users.json`
2. سجل دخول مرة أخرى
3. أول مستخدم يسجل سيكون admin تلقائياً

---

### 6. مشكلة: Port مستخدم بالفعل

#### الأعراض:
```
Error: listen EADDRINUSE: address already in use :::5001
```

#### الحل:

**Windows:**
```bash
# ابحث عن العملية
netstat -ano | findstr :5001
# اقتل العملية (استبدل PID برقم العملية)
taskkill /PID <PID> /F
```

**أو غير الـ Port:**
```bash
# في server/.env
PORT=5002
```

---

### 7. مشكلة: الصور لا تظهر

#### الأعراض:
- صور المشاريع لا تظهر
- أيقونات مفقودة

#### الحل:

**للصور:**
- استخدم روابط صور صحيحة (https://)
- أو استخدم placeholder: `https://via.placeholder.com/400x300`

**للأيقونات:**
```bash
cd client
npm install react-icons
```

---

### 8. مشكلة: الـ Modal لا يفتح

#### الأعراض:
- عند الضغط على "Add Service" لا يحدث شيء
- الـ Modal لا يظهر

#### الحل:

**تحقق من framer-motion:**
```bash
cd client
npm install framer-motion
```

**تحقق من Console:**
- افتح Developer Tools → Console
- ابحث عن أخطاء JavaScript

---

### 9. مشكلة: البيانات لا تحفظ

#### الأعراض:
- عند إضافة خدمة/مشروع، تظهر رسالة نجاح لكن البيانات لا تظهر

#### الحل:

**تحقق من ملفات JSON:**
```bash
# تأكد من وجود المجلد
ls server/data/

# تحقق من الأذونات
# Windows: تأكد من أن المجلد غير محمي
```

**تحقق من الكود:**
```javascript
// في server/db.js
// تأكد من أن writeJSON تعمل بشكل صحيح
```

---

### 10. مشكلة: "Cannot read property 'en' of undefined"

#### الأعراض:
- خطأ في عرض البيانات
- الصفحة تتعطل

#### الحل:

**تحقق من هيكل البيانات:**
```json
// يجب أن يكون:
{
  "title": {
    "en": "English Title",
    "ar": "العنوان بالعربي"
  }
}

// وليس:
{
  "title": "English Title"
}
```

---

## 🔍 أدوات التشخيص

### 1. فحص السيرفر
```bash
# تحقق من أن السيرفر يعمل
curl http://localhost:5001/

# تحقق من الخدمات
curl http://localhost:5001/api/services

# تحقق من المشاريع
curl http://localhost:5001/api/projects
```

### 2. فحص Token
```javascript
// في Console المتصفح
const token = localStorage.getItem('token');
console.log('Token:', token);

// فك تشفير Token
const decoded = JSON.parse(atob(token.split('.')[1]));
console.log('Decoded:', decoded);
```

### 3. فحص API Calls
```javascript
// في Console المتصفح
// افتح Network tab
// أعد تحميل الصفحة
// شاهد جميع الـ API calls
```

---

## 📝 Checklist للتشخيص

عند مواجهة أي مشكلة، اتبع هذه الخطوات:

- [ ] تحقق من أن Node.js مثبت: `node --version`
- [ ] تحقق من أن npm مثبت: `npm --version`
- [ ] تحقق من أن السيرفر يعمل: `curl http://localhost:5001/`
- [ ] تحقق من أن الواجهة تعمل: افتح `http://localhost:3000`
- [ ] تحقق من Console للأخطاء
- [ ] تحقق من Network tab للـ API calls
- [ ] تحقق من localStorage للـ token
- [ ] تحقق من ملفات JSON في `server/data/`
- [ ] تحقق من الـ .env files
- [ ] أعد تشغيل السيرفر والواجهة

---

## 🆘 إذا لم تحل المشكلة

1. **أعد تثبيت كل شيء:**
```bash
# السيرفر
cd server
rm -rf node_modules package-lock.json
npm install

# الواجهة
cd ../client
rm -rf node_modules package-lock.json
npm install
```

2. **احذف البيانات وابدأ من جديد:**
```bash
rm server/data/*.json
```

3. **تحقق من الـ logs:**
- في terminal السيرفر
- في Console المتصفح
- في Network tab

---

✅ **معظم المشاكل تحل بإعادة التثبيت وإعادة التشغيل!**
