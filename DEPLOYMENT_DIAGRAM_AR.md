# مخطط الـ Deployment 📊

## البنية الحالية

```
┌─────────────────────────────────────────────────────────────┐
│                         المستخدم                             │
│                         (Browser)                            │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ HTTPS
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    Vercel (Frontend)                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  النسخة الشغالة:                                      │   │
│  │  4pixels-git-main-mohs-projects-0b03337a.vercel.app  │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  النسخة الرئيسية (فيها مشاكل):                      │   │
│  │  4pixels-two.vercel.app                              │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  - React App                                                 │
│  - Static Files                                              │
│  - Environment: REACT_APP_API_URL                            │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ API Calls
                     │ (CORS Protected)
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                   Railway (Backend)                          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  4pixels-production.up.railway.app                   │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  - Node.js + Express                                         │
│  - CORS Configuration                                        │
│  - JWT Authentication                                        │
│  - REST API Endpoints                                        │
│                                                              │
│  Environment Variables:                                      │
│  ├─ CORS_ORIGIN                                              │
│  ├─ FRONTEND_URL                                             │
│  ├─ JWT_SECRET                                               │
│  ├─ NODE_ENV                                                 │
│  └─ PORT (auto)                                              │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ File System
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                  JSON Database                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  server/data/                                        │   │
│  │  ├─ services.json                                    │   │
│  │  ├─ projects.json                                    │   │
│  │  ├─ reviews.json                                     │   │
│  │  ├─ messages.json                                    │   │
│  │  └─ users.json                                       │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## تدفق البيانات (Data Flow)

### 1. طلب الخدمات (Get Services)
```
User Browser
    │
    │ GET /services
    ▼
Vercel Frontend
    │
    │ axios.get('/api/services')
    │ URL: https://4pixels-production.up.railway.app/api/services
    ▼
Railway Backend
    │
    │ CORS Check ✅
    │ Read services.json
    ▼
JSON Database
    │
    │ Return data
    ▼
Railway Backend
    │
    │ Send JSON response
    ▼
Vercel Frontend
    │
    │ Display services
    ▼
User Browser
```

### 2. تسجيل الدخول (Login)
```
User Browser
    │
    │ POST /login
    │ { email, password }
    ▼
Vercel Frontend
    │
    │ axios.post('/api/auth/login')
    ▼
Railway Backend
    │
    │ CORS Check ✅
    │ Validate credentials
    │ Read users.json
    │ Compare bcrypt hash
    ▼
JSON Database
    │
    │ User found ✅
    ▼
Railway Backend
    │
    │ Generate JWT token
    │ Send { token, user }
    ▼
Vercel Frontend
    │
    │ Store token in localStorage
    │ Redirect to /admin
    ▼
User Browser
```

---

## المشكلة الحالية ❌

```
Vercel (4pixels-two.vercel.app)
    │
    │ Request to Railway
    ▼
Railway Backend
    │
    │ CORS Check ❌
    │ Origin not in allowedOrigins
    │
    └─> Error: Not allowed by CORS
```

**السبب**:
- Railway Variables فيها `FRONTEND_UR` (خطأ إملائي)
- مفيش `JWT_SECRET`
- `CORS_ORIGIN` مش مظبوط

---

## الحل ✅

```
Vercel (4pixels-git-main-mohs-projects-0b03337a.vercel.app)
    │
    │ Request to Railway
    ▼
Railway Backend
    │
    │ CORS Check ✅
    │ Origin in allowedOrigins
    │ OR origin.includes('vercel.app')
    │
    └─> Allow request ✅
```

**الإصلاح**:
1. حذف `FRONTEND_UR`
2. تحديث `CORS_ORIGIN` و `FRONTEND_URL`
3. إضافة `JWT_SECRET`
4. Redeploy

---

## API Endpoints

### Public (بدون Authentication)
```
GET  /api/services          - كل الخدمات
GET  /api/services/:id      - خدمة واحدة
GET  /api/projects          - كل المشاريع
GET  /api/projects/:id      - مشروع واحد
GET  /api/reviews           - كل التقييمات
GET  /api/reviews/active    - التقييمات النشطة
POST /api/messages          - إرسال رسالة
POST /api/auth/login        - تسجيل دخول
```

### Protected (يحتاج Token)
```
POST   /api/services        - إضافة خدمة
PUT    /api/services/:id    - تعديل خدمة
DELETE /api/services/:id    - حذف خدمة

POST   /api/projects        - إضافة مشروع
PUT    /api/projects/:id    - تعديل مشروع
DELETE /api/projects/:id    - حذف مشروع

POST   /api/reviews         - إضافة تقييم
PUT    /api/reviews/:id     - تعديل تقييم
PATCH  /api/reviews/:id/toggle - تفعيل/تعطيل
DELETE /api/reviews/:id     - حذف تقييم

GET    /api/messages        - كل الرسائل
DELETE /api/messages/:id    - حذف رسالة
```

---

## Environment Variables

### Vercel (Frontend)
```env
REACT_APP_API_URL=https://4pixels-production.up.railway.app/api
```

### Railway (Backend)
```env
# Required
CORS_ORIGIN=https://4pixels-git-main-mohs-projects-0b03337a.vercel.app
FRONTEND_URL=https://4pixels-git-main-mohs-projects-0b03337a.vercel.app
NODE_ENV=production
JWT_SECRET=4pixels-secret-key-2024-mohammed-ahmed
PORT=5001 (auto)

# Optional
SUPABASE_URL=https://kkwsonkyoaubyzkvfftl.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_KEY=sb_publishable_64PNNISj3KMJXAubknLRVQ...
```

---

## الملفات المهمة

### Frontend
```
client/
├── src/
│   ├── services/
│   │   └── api.js              ← API configuration
│   ├── pages/
│   │   ├── Home.jsx            ← الصفحة الرئيسية
│   │   ├── Admin.jsx           ← لوحة التحكم
│   │   ├── Login.jsx           ← تسجيل الدخول
│   │   ├── Services.jsx        ← الخدمات
│   │   └── Projects.jsx        ← المشاريع
│   └── context/
│       └── AuthContext.jsx     ← Authentication
├── .env.production             ← Production variables
└── package.json
```

### Backend
```
server/
├── routes/
│   ├── auth.js                 ← Authentication
│   ├── services.js             ← Services CRUD
│   ├── projects.js             ← Projects CRUD
│   ├── reviews.js              ← Reviews CRUD
│   └── messages.js             ← Messages CRUD
├── data/
│   ├── users.json              ← Admin credentials
│   ├── services.json           ← Services data
│   ├── projects.json           ← Projects data
│   ├── reviews.json            ← Reviews data
│   └── messages.json           ← Messages data
├── server.js                   ← Main server file
└── package.json
```

---

## الخلاصة

### الوضع الحالي:
- ✅ Backend شغال على Railway
- ✅ Frontend شغال على Vercel (النسخة الفرعية)
- ❌ CORS بيمنع الاتصال

### بعد الإصلاح:
- ✅ Backend شغال
- ✅ Frontend شغال
- ✅ CORS يسمح بالاتصال
- ✅ كل البيانات تظهر
- ✅ Login يشتغل

---

**للإصلاح**: شوف `RAILWAY_FIX_STEPS_AR.md`
