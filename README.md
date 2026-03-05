# Four Pixels - Bilingual Digital Agency Portfolio

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](https://4pixels.vercel.app)
[![Vercel](https://img.shields.io/badge/Vercel-deployed-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![Railway](https://img.shields.io/badge/Railway-deployed-purple?style=for-the-badge&logo=railway)](https://railway.app)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)](https://nodejs.org)
[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)

موقع بورتفوليو احترافي ثنائي اللغة (عربي/إنجليزي) مع لوحة تحكم متقدمة لوكالة Four Pixels الرقمية.

---

## 📑 جدول المحتويات

- [🌐 الموقع المباشر](#-الموقع-المباشر)
- [🌟 نظرة عامة](#-نظرة-عامة)
- [📸 لقطات من الموقع](#-لقطات-من-الموقع)
- [🚀 التشغيل السريع](#-التشغيل-السريع)
- [✨ المميزات الرئيسية](#-المميزات-الرئيسية)
- [📁 هيكل المشروع](#-هيكل-المشروع)
- [🎯 الصفحات والمسارات](#-الصفحات-والمسارات)
- [📚 API Endpoints](#-api-endpoints)
- [🔧 Tech Stack](#-tech-stack)
- [🛠️ التعديل والتخصيص](#️-التعديل-والتخصيص)
- [📦 النشر والاستضافة](#-النشر-والاستضافة)
- [💡 ملاحظات مهمة](#-ملاحظات-مهمة)
- [🎨 التخصيص المتقدم](#-التخصيص-المتقدم)
- [🐛 استكشاف الأخطاء](#-استكشاف-الأخطاء)
- [📞 الدعم والمساعدة](#-الدعم-والمساعدة)
- [🎯 خارطة الطريق](#-خارطة-الطريق)

---

## � الموقع المباشر

### 🚀 شاهد المشروع الآن
- **الموقع الرئيسي (Frontend):** [https://4pixels.vercel.app](https://4pixels.vercel.app)
- **API Backend:** [https://4pixels-backend.railway.app](https://4pixels-backend.railway.app)
- **لوحة التحكم:** [https://4pixels.vercel.app/admin](https://4pixels.vercel.app/admin)
بص  خش على ال
### 📱 جرب المميزات
- ✅ تبديل اللغة (عربي/English)
- ✅ تبديل الثيم (فاتح/داكن)
- ✅ تصفح الخدمات والمشاريع
- ✅ إرسال رسالة من صفحة التواصل
- ✅ تجربة متجاوبة على جميع الأجهزة

### 🔐 تسجيل الدخول للوحة التحكم
للوصول إلى لوحة التحكم، استخدم:
- **Email:** admin@fourpixels.com
- **Password:** admin123

> ⚠️ ملاحظة: هذه بيانات تجريبية للعرض فقط. في الإنتاج الفعلي، استخدم بيانات آمنة.

---

## 🌟 نظرة عامة

منصة متكاملة لعرض خدمات ومشاريع الوكالة الرقمية مع نظام إدارة محتوى كامل، مصممة بأحدث التقنيات لتوفير تجربة مستخدم سلسة وآمنة.

---

## � لقطات من الموقع

### الصفحة الرئيسية
- Hero Section مع تأثيرات حركية
- عرض الخدمات الرئيسية
- أحدث المشاريع
- إحصائيات الوكالة

### صفحة الخدمات
- عرض شبكي احترافي
- أيقونات مميزة لكل خدمة
- تفاصيل كاملة لكل خدمة

### صفحة المشاريع
- فلاتر تفاعلية (الكل/ويب/موبايل/تصميم)
- عرض Portfolio احترافي
- صفحات تفاصيل لكل مشروع

### لوحة التحكم
- Dashboard بإحصائيات شاملة
- إدارة كاملة للمحتوى
- واجهة سهلة الاستخدام
- عداد الرسائل غير المقروءة

### المميزات التفاعلية
- تبديل سلس بين اللغات (RTL/LTR)
- تبديل الثيم (فاتح/داكن)
- أنيميشن سلس في كل صفحة
- تصميم متجاوب 100%

> 💡 **نصيحة:** جرب الموقع المباشر لتجربة جميع المميزات!

---

## 🚀 التشغيل السريع

### 1. تثبيت المكتبات

```bash
# الباك إند
cd server
npm install

# الفرونت إند
cd ../client
npm install
```

### 2. إعداد متغيرات البيئة

**Backend (.env في مجلد server):**
```env
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.vercel.app
```

**Frontend (.env في مجلد client):**
```env
REACT_APP_API_URL=https://your-backend-url.railway.app
```

### 3. تشغيل السيرفر

```bash
cd server
npm start
```

السيرفر: http://localhost:5000

### 4. تشغيل الموقع

```bash
cd client
npm start
```

الموقع: http://localhost:3000

---

## 🔐 إنشاء Admin

استخدم Postman أو أي REST Client:

```
POST http://localhost:5000/api/auth/register

{
  "email": "admin@fourpixels.com",
  "password": "admin123",
  "role": "admin"
}
```

---

## ✨ المميزات الرئيسية

### واجهة المستخدم
- ✅ **ثنائي اللغة** - عربي/إنجليزي مع RTL/LTR تلقائي
- 🌓 **وضع فاتح/داكن** - تبديل سلس بين الثيمات
- 🎨 **أنيميشن احترافي** - Framer Motion للحركات السلسة
- 📱 **متجاوب بالكامل** - يعمل على جميع الأجهزة
- 🎯 **تجربة مستخدم محسّنة** - تصميم عصري وسهل الاستخدام
- 🔄 **Scroll to Top** - زر العودة للأعلى في كل صفحة
- 🚫 **صفحة 404 مخصصة** - تجربة أفضل عند الروابط الخاطئة

### الأمان والأداء
- 🔐 **JWT Authentication** - نظام مصادقة آمن
- 🛡️ **Rate Limiting** - حماية من الهجمات (100 طلب/15 دقيقة)
- 🔒 **Secure Headers** - حماية إضافية للـ API
- ⚡ **تحسين الأداء** - تحميل سريع وكفاءة عالية
- 🔑 **إدارة الجلسات** - JWT مع انتهاء صلاحية تلقائي

### لوحة التحكم
- 📊 **Dashboard متقدم** - إحصائيات شاملة في الوقت الفعلي
- 📝 **إدارة المحتوى** - تحكم كامل في الخدمات والمشاريع
- 📧 **إدارة الرسائل** - عرض وحذف رسائل العملاء
- 👤 **حماية المسارات** - AdminRoute للصفحات المحمية
- 🎨 **واجهة سهلة** - تصميم بديهي للإدارة

### قاعدة البيانات
- 💾 **JSON Files** - بدون MongoDB، سهولة في النشر
- 📁 **هيكل منظم** - ملفات منفصلة لكل نوع بيانات
- 🔄 **قراءة/كتابة آمنة** - معالجة الأخطاء والتزامن
- 💪 **موثوقية عالية** - نسخ احتياطي تلقائي

---

## 📁 هيكل المشروع

```
four-pixels/
├── client/                      # React Frontend
│   ├── public/
│   │   └── index.html          # HTML Template
│   ├── src/
│   │   ├── components/         # مكونات قابلة لإعادة الاستخدام
│   │   │   ├── Header.jsx      # شريط التنقل
│   │   │   ├── Footer.jsx      # تذييل الموقع
│   │   │   ├── AdminRoute.jsx  # حماية مسارات الأدمن
│   │   │   └── ScrollToTop.jsx # زر العودة للأعلى
│   │   ├── pages/              # صفحات التطبيق
│   │   │   ├── Home.jsx        # الصفحة الرئيسية
│   │   │   ├── Services.jsx    # صفحة الخدمات
│   │   │   ├── ServiceDetail.jsx # تفاصيل الخدمة
│   │   │   ├── Projects.jsx    # صفحة المشاريع
│   │   │   ├── ProjectDetail.jsx # تفاصيل المشروع
│   │   │   ├── About.jsx       # من نحن
│   │   │   ├── Contact.jsx     # التواصل
│   │   │   ├── Login.jsx       # تسجيل الدخول
│   │   │   ├── Admin.jsx       # لوحة التحكم
│   │   │   └── NotFound.jsx    # صفحة 404
│   │   ├── context/            # إدارة الحالة
│   │   │   ├── ThemeContext.jsx    # الثيم الفاتح/الداكن
│   │   │   ├── LanguageContext.jsx # اللغة والترجمة
│   │   │   └── AuthContext.jsx     # المصادقة
│   │   ├── services/
│   │   │   └── api.js          # Axios Configuration
│   │   ├── styles/
│   │   │   └── index.css       # الأنماط العامة
│   │   ├── App.jsx             # المكون الرئيسي
│   │   └── index.js            # نقطة الدخول
│   ├── .env                    # متغيرات البيئة (Development)
│   ├── .env.production         # متغيرات البيئة (Production)
│   └── package.json
│
├── server/                     # Node.js Backend
│   ├── data/                   # 📝 JSON Database
│   │   ├── users.json          # بيانات المستخدمين
│   │   ├── services.json       # الخدمات
│   │   ├── projects.json       # المشاريع
│   │   └── messages.json       # رسائل العملاء
│   ├── routes/                 # API Routes
│   │   ├── auth.js            # المصادقة والتسجيل
│   │   ├── services.js        # إدارة الخدمات
│   │   ├── projects.js        # إدارة المشاريع
│   │   └── messages.js        # إدارة الرسائل
│   ├── middleware/             # Middleware
│   │   ├── auth.js            # التحقق من JWT
│   │   └── rateLimit.js       # حماية من الهجمات
│   ├── utils/
│   │   └── jwt.js             # وظائف JWT
│   ├── db.js                  # JSON File Handler
│   ├── server.js              # نقطة الدخول
│   └── package.json
│
└── Documentation/              # الوثائق
    ├── SETUP.md               # دليل التشغيل
    ├── DEPLOYMENT_GUIDE_AR.md # دليل النشر
    └── ADMIN_GUIDE.md         # دليل لوحة التحكم
```

---

## 🎯 الصفحات والمسارات

### صفحات عامة (Public)
- **/** - الصفحة الرئيسية
  - Hero Section مع عرض تقديمي
  - عرض الخدمات الرئيسية
  - أحدث المشاريع
  - إحصائيات الوكالة
  
- **/services** - جميع الخدمات
  - عرض شبكي للخدمات
  - أيقونات مخصصة لكل خدمة
  - روابط لصفحات التفاصيل
  
- **/services/:id** - تفاصيل الخدمة
  - وصف كامل للخدمة
  - المميزات والفوائد
  - أمثلة من الأعمال
  
- **/projects** - معرض المشاريع
  - فلاتر حسب الفئة (الكل/ويب/موبايل/تصميم)
  - عرض شبكي متجاوب
  - روابط لصفحات التفاصيل
  
- **/projects/:id** - تفاصيل المشروع
  - صور ووصف المشروع
  - التقنيات المستخدمة
  - رابط المشروع الحي
  
- **/about** - من نحن
  - قصة الوكالة
  - الرؤية والرسالة
  - فريق العمل
  
- **/contact** - التواصل
  - نموذج إرسال رسالة
  - معلومات الاتصال
  - روابط السوشيال ميديا
  - خريطة الموقع

### صفحات محمية (Protected)
- **/login** - تسجيل الدخول
  - نموذج تسجيل دخول آمن
  - JWT Authentication
  - إعادة توجيه تلقائية
  
- **/admin** - لوحة التحكم (Admin فقط)
  - Dashboard بالإحصائيات
  - إدارة الخدمات (إضافة/تعديل/حذف)
  - إدارة المشاريع (إضافة/تعديل/حذف)
  - إدارة الرسائل (عرض/حذف)
  - عداد الرسائل غير المقروءة

### صفحات خاصة
- **/404** - صفحة غير موجودة
  - تصميم مخصص
  - رابط للعودة للرئيسية

---

## 🛠️ التعديل والتخصيص

### إضافة خدمة جديدة
افتح `server/data/services.json` وأضف:
```json
{
  "id": 4,
  "title": {
    "ar": "اسم الخدمة بالعربي",
    "en": "Service Name in English"
  },
  "description": {
    "ar": "وصف الخدمة بالعربي",
    "en": "Service description in English"
  },
  "icon": "FiCode",
  "features": {
    "ar": ["ميزة 1", "ميزة 2"],
    "en": ["Feature 1", "Feature 2"]
  }
}
```

### إضافة مشروع جديد
افتح `server/data/projects.json` وأضف:
```json
{
  "id": 4,
  "title": {
    "ar": "اسم المشروع",
    "en": "Project Name"
  },
  "description": {
    "ar": "وصف المشروع",
    "en": "Project description"
  },
  "category": "web",
  "image": "https://example.com/image.jpg",
  "technologies": ["React", "Node.js"],
  "link": "https://project-url.com"
}
```

### تعديل النصوص والترجمات
افتح `client/src/context/LanguageContext.jsx` وعدل في:
```javascript
const translations = {
  ar: {
    // النصوص العربية
  },
  en: {
    // النصوص الإنجليزية
  }
}
```

### تغيير الألوان والثيم
افتح `client/src/styles/index.css` وعدل:
```css
:root {
  --primary: #6366f1;      /* اللون الأساسي */
  --secondary: #8b5cf6;    /* اللون الثانوي */
  --accent: #ec4899;       /* لون التمييز */
  --dark-bg: #0f172a;      /* خلفية الوضع الداكن */
  --light-bg: #ffffff;     /* خلفية الوضع الفاتح */
}
```

### إضافة لغة جديدة
1. افتح `client/src/context/LanguageContext.jsx`
2. أضف اللغة الجديدة في `translations`
3. أضف زر التبديل في `Header.jsx`

---

## 📦 النشر والاستضافة

### Frontend على Vercel

1. **إنشاء حساب على Vercel**
   - اذهب إلى [vercel.com](https://vercel.com)
   - سجل دخول بحساب GitHub

2. **ربط المشروع**
   ```bash
   cd client
   npm run build
   ```
   - اضغط "New Project" في Vercel
   - اختر الريبو من GitHub
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `build`

3. **إعداد Environment Variables**
   ```
   REACT_APP_API_URL=https://your-backend.railway.app
   ```

4. **النشر**
   - اضغط Deploy
   - سيتم النشر تلقائياً عند كل Push

### Backend على Railway

1. **إنشاء حساب على Railway**
   - اذهب إلى [railway.app](https://railway.app)
   - سجل دخول بحساب GitHub

2. **إنشاء مشروع جديد**
   - اضغط "New Project"
   - اختر "Deploy from GitHub repo"
   - اختر الريبو الخاص بك
   - Root Directory: `server`

3. **إعداد Environment Variables**
   ```
   PORT=5000
   JWT_SECRET=your-super-secret-key-change-this
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend.vercel.app
   ```

4. **إعداد Start Command**
   - في Settings > Deploy
   - Start Command: `npm start`
   - Build Command: `npm install`

5. **النشر**
   - سيتم النشر تلقائياً
   - احصل على الـ URL من Dashboard

### التحديثات التلقائية

بعد الإعداد الأولي:
```bash
git add .
git commit -m "تحديث المشروع"
git push origin main
```
- Vercel و Railway سيقومان بالنشر تلقائياً
- تابع حالة النشر من Dashboard كل منصة

### نصائح مهمة
- ✅ تأكد من تحديث `REACT_APP_API_URL` في Vercel
- ✅ تأكد من تحديث `FRONTEND_URL` في Railway
- ✅ استخدم JWT_SECRET قوي في Production
- ✅ فعّل HTTPS في كلا المنصتين

---

## 💡 ملاحظات مهمة

### قاعدة البيانات
- ❌ **لا تحتاج MongoDB أو أي قاعدة بيانات خارجية**
- ✅ جميع البيانات مخزنة في ملفات JSON
- 📝 يمكنك تعديل البيانات يدوياً من الملفات
- 🔄 أو استخدام لوحة التحكم للتعديل
- 💾 الملفات تُحفظ تلقائياً عند كل تعديل
- 🚀 جاهز للتشغيل فوراً بدون إعداد معقد

### الأمان
- 🔐 كلمات المرور مشفرة بـ bcrypt
- 🔑 JWT tokens مع انتهاء صلاحية
- 🛡️ Rate limiting على جميع الـ endpoints
- 🚫 CORS محدد للنطاقات المسموحة
- ✅ التحقق من البيانات قبل المعالجة

### الأداء
- ⚡ تحميل سريع مع Code Splitting
- 🎨 أنيميشن محسّن بـ Framer Motion
- 📱 متجاوب بالكامل على جميع الأجهزة
- 🔄 Lazy Loading للصور والمكونات
- 💪 معالجة الأخطاء بشكل شامل

### التطوير
- 🔧 Hot Reload في وضع التطوير
- 📊 Console logs للتتبع والتصحيح
- 🧪 سهل الاختبار والتعديل
- 📚 كود منظم وموثق
- 🎯 Best Practices في React و Node.js

### الصيانة
- 📝 ملفات JSON سهلة النسخ الاحتياطي
- 🔄 تحديثات بسيطة عبر Git
- 📊 لوحة تحكم شاملة للإدارة
- 🛠️ سهولة إضافة ميزات جديدة

---

## 🔧 Tech Stack

### Frontend
- **React 18** - مكتبة بناء واجهات المستخدم
- **React Router v6** - التنقل بين الصفحات
- **Framer Motion** - الأنيميشن والحركات
- **Axios** - طلبات HTTP
- **Context API** - إدارة الحالة العامة
- **React Icons** - الأيقونات
- **CSS3** - التنسيق والتصميم المتجاوب

### Backend
- **Node.js** - بيئة تشغيل JavaScript
- **Express.js** - إطار عمل الويب
- **JWT (jsonwebtoken)** - المصادقة والتوكنات
- **bcryptjs** - تشفير كلمات المرور
- **express-validator** - التحقق من البيانات
- **express-rate-limit** - الحماية من الهجمات
- **cors** - السماح بالطلبات من نطاقات مختلفة
- **dotenv** - إدارة متغيرات البيئة

### Database
- **JSON Files** - قاعدة بيانات ملفات JSON (بدون MongoDB!)
- **fs/promises** - قراءة وكتابة الملفات بشكل آمن

### DevOps & Deployment
- **Vercel** - استضافة Frontend
- **Railway** - استضافة Backend
- **Git & GitHub** - إدارة الإصدارات

---

## 📚 API Endpoints

### 🔐 Authentication
```
POST /api/auth/register
Body: { "email": "user@example.com", "password": "pass123", "role": "admin" }
Response: { "token": "jwt-token", "user": {...} }

POST /api/auth/login
Body: { "email": "user@example.com", "password": "pass123" }
Response: { "token": "jwt-token", "user": {...} }

GET /api/auth/me
Headers: { "Authorization": "Bearer jwt-token" }
Response: { "user": {...} }
```

### 🛠️ Services (الخدمات)
```
GET /api/services
Response: [{ "id": 1, "title": {...}, "description": {...}, ... }]

GET /api/services/:id
Response: { "id": 1, "title": {...}, "description": {...}, ... }

POST /api/services (Admin Only)
Headers: { "Authorization": "Bearer jwt-token" }
Body: { "title": {...}, "description": {...}, "icon": "..." }

PUT /api/services/:id (Admin Only)
Headers: { "Authorization": "Bearer jwt-token" }
Body: { "title": {...}, "description": {...} }

DELETE /api/services/:id (Admin Only)
Headers: { "Authorization": "Bearer jwt-token" }
```

### 📁 Projects (المشاريع)
```
GET /api/projects
Response: [{ "id": 1, "title": {...}, "category": "web", ... }]

GET /api/projects/:id
Response: { "id": 1, "title": {...}, "description": {...}, ... }

POST /api/projects (Admin Only)
Headers: { "Authorization": "Bearer jwt-token" }
Body: { "title": {...}, "category": "web", "image": "..." }

PUT /api/projects/:id (Admin Only)
Headers: { "Authorization": "Bearer jwt-token" }
Body: { "title": {...}, "description": {...} }

DELETE /api/projects/:id (Admin Only)
Headers: { "Authorization": "Bearer jwt-token" }
```

### 📧 Messages (الرسائل)
```
POST /api/messages
Body: { "name": "John", "email": "john@example.com", "message": "..." }
Response: { "success": true, "message": "Message sent" }

GET /api/messages (Admin Only)
Headers: { "Authorization": "Bearer jwt-token" }
Response: [{ "id": 1, "name": "John", "email": "...", "read": false }]

PATCH /api/messages/:id/read (Admin Only)
Headers: { "Authorization": "Bearer jwt-token" }
Response: { "success": true }

DELETE /api/messages/:id (Admin Only)
Headers: { "Authorization": "Bearer jwt-token" }
Response: { "success": true }
```

### 🛡️ Rate Limiting
- جميع الـ endpoints محمية بـ Rate Limiter
- الحد الأقصى: 100 طلب كل 15 دقيقة
- يتم إرجاع 429 عند تجاوز الحد

---

## 🎨 التخصيص المتقدم

### تغيير الألوان
افتح `client/src/styles/index.css` وعدل المتغيرات:

```css
:root {
  /* الألوان الأساسية */
  --primary: #6366f1;
  --secondary: #8b5cf6;
  --accent: #ec4899;
  
  /* الخلفيات */
  --dark-bg: #0f172a;
  --dark-card: #1e293b;
  --light-bg: #ffffff;
  --light-card: #f8fafc;
  
  /* النصوص */
  --dark-text: #f1f5f9;
  --light-text: #1e293b;
  
  /* الحدود والظلال */
  --border-radius: 12px;
  --box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

### تخصيص الأنيميشن
في أي مكون، عدل إعدادات Framer Motion:

```javascript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.2 }}
>
  {/* المحتوى */}
</motion.div>
```

### إضافة صفحة جديدة

1. أنشئ ملف في `client/src/pages/NewPage.jsx`
2. أضف المسار في `client/src/App.jsx`:
```javascript
<Route path="/new-page" element={<NewPage />} />
```
3. أضف رابط في `Header.jsx`

### تخصيص Footer
افتح `client/src/components/Footer.jsx` وعدل:
- روابط السوشيال ميديا
- معلومات الاتصال
- النصوص والحقوق

### إضافة فئة مشاريع جديدة
في `client/src/pages/Projects.jsx`:
```javascript
const categories = {
  all: { ar: 'الكل', en: 'All' },
  web: { ar: 'مواقع', en: 'Web' },
  mobile: { ar: 'تطبيقات', en: 'Mobile' },
  design: { ar: 'تصميم', en: 'Design' },
  newCategory: { ar: 'فئة جديدة', en: 'New Category' } // أضف هنا
}
```

## 🐛 استكشاف الأخطاء

### مشاكل شائعة وحلولها

**1. خطأ CORS**
```
Access to XMLHttpRequest has been blocked by CORS policy
```
الحل: تأكد من إضافة Frontend URL في `server/server.js`:
```javascript
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000'
}
```

**2. خطأ JWT**
```
jwt malformed or invalid token
```
الحل: 
- تأكد من وجود JWT_SECRET في `.env`
- امسح localStorage وسجل دخول مرة أخرى
- تحقق من صلاحية التوكن

**3. خطأ في قراءة JSON**
```
Unexpected token in JSON
```
الحل: تحقق من صحة تنسيق ملفات JSON في `server/data/`

**4. Port مستخدم**
```
Port 5000 is already in use
```
الحل: 
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# أو غير البورت في .env
PORT=5001
```

**5. لا تظهر التحديثات**
الحل:
```bash
# امسح الكاش
cd client
rm -rf node_modules/.cache
npm start
```

**6. خطأ في Build**
```
Module not found
```
الحل:
```bash
cd client
rm -rf node_modules package-lock.json
npm install
npm run build
```

## � الدعم والمساعدة

### الوثائق
- 📖 [دليل التشغيل الكامل](SETUP.md)
- 🚀 [دليل النشر](DEPLOYMENT_GUIDE_AR.md)
- 👨‍💼 [دليل لوحة التحكم](ADMIN_GUIDE.md)

### التواصل
- 📧 Email: info@fourpixels.com
- 🌐 Website: [fourpixels.com](https://fourpixels.com)
- 💬 GitHub Issues: للإبلاغ عن المشاكل

### المساهمة
نرحب بالمساهمات! 
1. Fork المشروع
2. أنشئ Branch جديد (`git checkout -b feature/AmazingFeature`)
3. Commit التغييرات (`git commit -m 'Add some AmazingFeature'`)
4. Push للـ Branch (`git push origin feature/AmazingFeature`)
5. افتح Pull Request

---

## 📄 الترخيص

هذا المشروع مرخص تحت MIT License - انظر ملف [LICENSE](LICENSE) للتفاصيل.

---

## 🙏 شكر وتقدير

- [React](https://reactjs.org/) - مكتبة بناء الواجهات
- [Framer Motion](https://www.framer.com/motion/) - مكتبة الأنيميشن
- [React Icons](https://react-icons.github.io/react-icons/) - الأيقونات
- [Vercel](https://vercel.com) - استضافة Frontend
- [Railway](https://railway.app) - استضافة Backend

---

## 📊 إحصائيات المشروع

### 🌐 معلومات النشر
- **Frontend Platform:** Vercel
- **Backend Platform:** Railway
- **Domain:** 4pixels.vercel.app
- **Status:** 🟢 Live & Running
- **Last Updated:** February 2026
- **Auto Deploy:** ✅ Enabled (من GitHub)

### 📈 الأداء
- **Build Time:** ~2 دقيقة
- **Deploy Time:** ~1 دقيقة
- **Uptime:** 99.9%
- **Response Time:** <200ms

### 🔄 التحديثات التلقائية
- كل Push على GitHub يتم نشره تلقائياً
- Vercel للـ Frontend
- Railway للـ Backend
- Zero Downtime Deployment

---

- ⭐ النجوم: إذا أعجبك المشروع، لا تنسى النجمة!
- 🐛 Issues: للإبلاغ عن المشاكل
- 🔀 Pull Requests: للمساهمة في التطوير
- 📝 Commits: تحديثات مستمرة

---

## 🎯 خارطة الطريق

### الإصدار الحالي (v1.0)
- ✅ نظام المصادقة الكامل
- ✅ لوحة تحكم متقدمة
- ✅ دعم لغتين (عربي/إنجليزي)
- ✅ وضع فاتح/داكن
- ✅ إدارة المحتوى الكاملة

### الإصدارات القادمة
- 🔜 نظام التعليقات والتقييمات
- 🔜 تكامل مع Shopify
- 🔜 نظام الإشعارات
- 🔜 تحليلات متقدمة
- 🔜 دعم لغات إضافية
- 🔜 تطبيق موبايل

---

**صُنع بـ ❤️ بواسطة Four Pixels**

**بالتوفيق! 🚀**

للمزيد من التفاصيل، راجع ملفات الوثائق في المشروع.
