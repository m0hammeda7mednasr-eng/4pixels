# دليل رفع الموقع على الإنترنت 🚀

## الخطة الكاملة

### الفرونت (React) → Vercel
- مجاني 100%
- سريع جداً
- SSL مجاني
- Custom domain

### الباك (Node.js) → Railway أو Render
- مجاني (مع حدود)
- قاعدة بيانات
- API endpoints

### الدومين → Hostinger
- ربط الدومين بـ Vercel
- ربط subdomain للـ API

---

## الجزء 1: تجهيز المشروع 📦

### 1. تحديث ملفات البيئة

#### `client/.env.production`
أنشئ ملف جديد:
```env
REACT_APP_API_URL=https://api.yourdomain.com/api
```

#### `server/.env`
تأكد من الإعدادات:
```env
PORT=5001
NODE_ENV=production
JWT_SECRET=your-super-secret-key-change-this
CORS_ORIGIN=https://yourdomain.com
```

### 2. تحديث package.json

#### `client/package.json`
أضف:
```json
{
  "scripts": {
    "build": "react-scripts build",
    "start": "react-scripts start"
  },
  "engines": {
    "node": "18.x"
  }
}
```

#### `server/package.json`
أضف:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "engines": {
    "node": "18.x"
  }
}
```

### 3. تحديث CORS في السيرفر

#### `server/server.js`
```javascript
const cors = require('cors');

// تحديث CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
```

---

## الجزء 2: رفع الباك على Railway 🚂

### الخطوة 1: إنشاء حساب
1. روح على: https://railway.app
2. سجل دخول بـ GitHub
3. اضغط "New Project"

### الخطوة 2: رفع الكود
```bash
# في مجلد المشروع الرئيسي
git init
git add .
git commit -m "Initial commit"

# أنشئ repo على GitHub
# ثم:
git remote add origin https://github.com/username/your-repo.git
git push -u origin main
```

### الخطوة 3: ربط Railway بـ GitHub
1. في Railway، اضغط "Deploy from GitHub repo"
2. اختار الـ repo بتاعك
3. اختار مجلد `server` كـ Root Directory
4. Railway هيكتشف Node.js تلقائياً

### الخطوة 4: إضافة Environment Variables
في Railway Dashboard:
1. اضغط على Variables
2. أضف:
   ```
   PORT=5001
   NODE_ENV=production
   JWT_SECRET=your-secret-key-here
   CORS_ORIGIN=https://yourdomain.com
   ```

### الخطوة 5: Deploy
1. اضغط "Deploy"
2. انتظر 2-3 دقائق
3. هتحصل على URL زي: `https://your-app.railway.app`

### الخطوة 6: اختبار الـ API
```bash
# جرب الـ API
curl https://your-app.railway.app/api/services
```

---

## الجزء 3: رفع الفرونت على Vercel ⚡

### الخطوة 1: إنشاء حساب
1. روح على: https://vercel.com
2. سجل دخول بـ GitHub
3. اضغط "Add New Project"

### الخطوة 2: Import المشروع
1. اختار الـ repo من GitHub
2. Root Directory: `client`
3. Framework Preset: Create React App
4. Build Command: `npm run build`
5. Output Directory: `build`

### الخطوة 3: Environment Variables
أضف في Vercel:
```
REACT_APP_API_URL=https://your-app.railway.app/api
```

### الخطوة 4: Deploy
1. اضغط "Deploy"
2. انتظر 1-2 دقيقة
3. هتحصل على URL زي: `https://your-app.vercel.app`

---

## الجزء 4: ربط الدومين من Hostinger 🌐

### A. ربط الدومين الرئيسي بـ Vercel (الفرونت)

#### في Vercel:
1. روح على Project Settings
2. Domains
3. اضغط "Add Domain"
4. اكتب: `yourdomain.com`
5. Vercel هيديك DNS records

#### في Hostinger:
1. سجل دخول على Hostinger
2. روح على Domain → DNS/Name Servers
3. أضف الـ records دي:

**Type A Record:**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

**Type CNAME Record:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### B. ربط Subdomain للـ API (الباك)

#### في Railway:
1. روح على Settings
2. Domains
3. اضغط "Generate Domain"
4. أو أضف custom domain: `api.yourdomain.com`

#### في Hostinger:
أضف CNAME record:
```
Type: CNAME
Name: api
Value: your-app.railway.app
TTL: 3600
```

### C. انتظر DNS Propagation
- ممكن ياخد من 5 دقائق لـ 48 ساعة
- عادة بيخلص في 1-2 ساعة
- تقدر تتابع على: https://dnschecker.org

---

## الجزء 5: تحديث الإعدادات النهائية 🔧

### 1. تحديث API URL في Vercel
```
REACT_APP_API_URL=https://api.yourdomain.com/api
```

### 2. تحديث CORS في Railway
```
CORS_ORIGIN=https://yourdomain.com
```

### 3. Redeploy
- Vercel: اضغط "Redeploy"
- Railway: اضغط "Redeploy"

---

## الجزء 6: SSL Certificates 🔒

### Vercel (تلقائي)
- SSL بيتفعل تلقائياً
- مجاني من Let's Encrypt
- مفيش حاجة تعملها

### Railway (تلقائي)
- SSL بيتفعل تلقائياً
- مجاني
- مفيش حاجة تعملها

---

## البديل: استخدام Render بدل Railway

### لو عاوز تستخدم Render:

1. روح على: https://render.com
2. سجل دخول بـ GitHub
3. اضغط "New Web Service"
4. اختار الـ repo
5. Root Directory: `server`
6. Build Command: `npm install`
7. Start Command: `node server.js`
8. أضف Environment Variables
9. Deploy

---

## الجزء 7: قاعدة البيانات (اختياري) 💾

### لو عاوز تستخدم قاعدة بيانات بدل JSON:

#### Option 1: MongoDB Atlas (مجاني)
1. روح على: https://mongodb.com/cloud/atlas
2. أنشئ cluster مجاني
3. احصل على Connection String
4. أضفه في Railway Environment Variables

#### Option 2: Supabase (مجاني)
1. روح على: https://supabase.com
2. أنشئ project جديد
3. احصل على API keys
4. استخدم Supabase client في الكود

#### Option 3: Railway PostgreSQL
1. في Railway، اضغط "New"
2. اختار "Database" → "PostgreSQL"
3. هيديك connection string تلقائياً

---

## الجزء 8: الاختبار النهائي ✅

### 1. اختبر الـ API
```bash
curl https://api.yourdomain.com/api/services
```

### 2. اختبر الموقع
```
https://yourdomain.com
```

### 3. اختبر الوظائف
- [ ] الصفحة الرئيسية تفتح
- [ ] الخدمات تظهر
- [ ] المشاريع تظهر
- [ ] التقييمات تظهر
- [ ] فورم Contact يشتغل
- [ ] Admin Dashboard يفتح
- [ ] تسجيل الدخول يشتغل
- [ ] إضافة/تعديل/حذف يشتغل

---

## الملفات المطلوبة للـ Deployment

### 1. `.gitignore` (في الـ root)
```
# Dependencies
node_modules/
client/node_modules/
server/node_modules/

# Environment
.env
.env.local
.env.production
client/.env
server/.env

# Build
client/build/
dist/

# Logs
*.log
npm-debug.log*

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
```

### 2. `vercel.json` (في مجلد client)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/static/(.*)",
      "dest": "/static/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### 3. `railway.json` (في مجلد server - اختياري)
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "node server.js",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

---

## التكاليف 💰

### مجاني تماماً:
- ✅ Vercel: Unlimited bandwidth
- ✅ Railway: $5 credit شهرياً (كافي لمشروع صغير)
- ✅ Render: 750 ساعة مجانية شهرياً
- ✅ MongoDB Atlas: 512MB مجاني
- ✅ Supabase: 500MB database مجاني

### لو المشروع كبر:
- Vercel Pro: $20/شهر
- Railway: $5/شهر لكل service
- Render: $7/شهر

---

## المشاكل الشائعة والحلول 🔧

### 1. CORS Error
**الحل:**
```javascript
// في server.js
app.use(cors({
  origin: [
    'https://yourdomain.com',
    'https://www.yourdomain.com',
    'http://localhost:3000'
  ],
  credentials: true
}));
```

### 2. API Not Found (404)
**الحل:**
- تأكد من الـ API URL في `.env.production`
- تأكد من الـ routes في السيرفر
- تأكد من الـ base path: `/api`

### 3. Build Failed
**الحل:**
```bash
# جرب البناء محلياً
cd client
npm run build

# لو في أخطاء، اصلحها قبل الـ deploy
```

### 4. Environment Variables Not Working
**الحل:**
- تأكد من البادئة `REACT_APP_` للفرونت
- Redeploy بعد تغيير الـ variables
- تأكد من عدم وجود مسافات في القيم

### 5. Domain Not Working
**الحل:**
- انتظر DNS propagation (حتى 48 ساعة)
- تأكد من الـ DNS records صحيحة
- استخدم https://dnschecker.org للتحقق

---

## الخطوات السريعة (TL;DR) ⚡

```bash
# 1. تجهيز الكود
git init
git add .
git commit -m "Ready for deployment"
git push origin main

# 2. رفع الباك على Railway
- ربط GitHub repo
- اختار مجلد server
- أضف Environment Variables
- Deploy

# 3. رفع الفرونت على Vercel
- ربط GitHub repo
- اختار مجلد client
- أضف REACT_APP_API_URL
- Deploy

# 4. ربط الدومين
- في Hostinger: أضف DNS records
- في Vercel: أضف custom domain
- في Railway: أضف custom subdomain
- انتظر DNS propagation

# 5. اختبر كل حاجة
- الموقع يفتح
- الـ API يشتغل
- الوظائف تشتغل
```

---

## الدعم والمساعدة 📞

### Documentation:
- Vercel: https://vercel.com/docs
- Railway: https://docs.railway.app
- Render: https://render.com/docs

### Community:
- Vercel Discord
- Railway Discord
- Stack Overflow

---

**جاهز للرفع! 🚀**

لو محتاج مساعدة في أي خطوة، قولي وهساعدك!
