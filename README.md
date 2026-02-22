# Four Pixels - Bilingual Digital Agency Portfolio

موقع بورتفوليو حديث ثنائي اللغة (عربي/إنجليزي) مع لوحة تحكم لوكالة Four Pixels الرقمية.

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

### 2. تشغيل السيرفر

```bash
cd server
npm start
```

السيرفر: http://localhost:5000

### 3. تشغيل الموقع

```bash
cd client
npm start
```

الموقع: http://localhost:3000

---

## 🔐 إنشاء Admin

استخدم Postman:

```
POST http://localhost:5000/api/auth/register

{
  "email": "admin@fourpixels.com",
  "password": "admin123",
  "role": "admin"
}
```

---

## ✨ المميزات

- ✅ عربي/إنجليزي مع RTL/LTR تلقائي
- 🌓 وضع فاتح/داكن
- 🎨 أنيميشن سلس (Framer Motion)
- 📱 متجاوب تمامًا
- 🔐 JWT Authentication
- ⚡ لوحة تحكم كاملة
- 📧 نموذج تواصل
- 💾 **بدون MongoDB - JSON Files فقط!**

---

## 📁 هيكل المشروع

```
four-pixels/
├── client/              # React Frontend
│   ├── src/
│   │   ├── components/  # Header, etc.
│   │   ├── pages/       # Home, Services, Projects, etc.
│   │   ├── context/     # Theme, Language, Auth
│   │   └── services/    # API calls
│   └── package.json
├── server/              # Node.js Backend
│   ├── data/           # 📝 JSON Database
│   │   ├── users.json
│   │   ├── services.json
│   │   ├── projects.json
│   │   └── messages.json
│   ├── routes/         # API Routes
│   ├── middleware/     # Auth
│   └── db.js          # JSON Handler
└── SETUP.md           # دليل التشغيل بالعربي
```

---

## 🎯 الصفحات

- **/** - الرئيسية (Hero + خدمات + مشاريع)
- **/services** - كل الخدمات
- **/projects** - Portfolio مع فلاتر
- **/about** - من نحن
- **/contact** - التواصل + سوشيال ميديا
- **/login** - تسجيل دخول
- **/admin** - لوحة التحكم (Admin فقط)

---

## 🛠️ التعديل

### إضافة خدمة
افتح `server/data/services.json`

### إضافة مشروع
افتح `server/data/projects.json`

### تعديل النصوص
افتح `client/src/context/LanguageContext.jsx`

---

## 📦 الرفع

### Frontend
```bash
cd client
npm run build
# ارفع build/ على Vercel/Netlify
```

### Backend
```bash
# ارفع server/ على Render/Railway
```

---

## 💡 ملاحظات مهمة

- ❌ **مش محتاج MongoDB خالص**
- ✅ كل البيانات في JSON files
- 📝 تقدر تعدل البيانات يدوي
- 🔄 أو من لوحة التحكم
- 🚀 جاهز للتشغيل فورًا

---

## 🔧 Tech Stack

**Frontend:**
- React 18
- React Router v6
- Framer Motion
- Axios
- Context API

**Backend:**
- Node.js & Express
- JWT Authentication
- bcryptjs
- JSON File Database (بدون MongoDB!)

---

## 📚 API Endpoints

### Auth
- `POST /api/auth/register` - تسجيل
- `POST /api/auth/login` - دخول
- `GET /api/auth/me` - المستخدم الحالي

### Services
- `GET /api/services` - كل الخدمات
- `GET /api/services/:id` - خدمة واحدة
- `POST /api/services` - إضافة (Admin)
- `PUT /api/services/:id` - تعديل (Admin)
- `DELETE /api/services/:id` - حذف (Admin)

### Projects
- `GET /api/projects` - كل المشاريع
- `GET /api/projects/:id` - مشروع واحد
- `POST /api/projects` - إضافة (Admin)
- `PUT /api/projects/:id` - تعديل (Admin)
- `DELETE /api/projects/:id` - حذف (Admin)

### Messages
- `POST /api/messages` - إرسال رسالة
- `GET /api/messages` - كل الرسائل (Admin)
- `DELETE /api/messages/:id` - حذف (Admin)

---

## 🎨 التخصيص

### تغيير الألوان
افتح `client/src/styles/index.css` وعدل:

```css
:root {
  --primary: #6366f1;
  --secondary: #8b5cf6;
  --accent: #ec4899;
}
```

### إضافة لغة جديدة
افتح `client/src/context/LanguageContext.jsx`

---

## 📞 الدعم

للدعم: info@fourpixels.com

---

## 📄 License

MIT

---

**بالتوفيق! 🚀**

شوف ملف `SETUP.md` للتفاصيل بالعربي
