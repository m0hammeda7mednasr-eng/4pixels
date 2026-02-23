# الخطوات الجاية للرفع على الإنترنت 🚀

## ✅ تم بنجاح
- [x] الكود اترفع على GitHub
- [x] الـ repo: https://github.com/m0hammeda7mednasr-eng/4pixels

---

## الخطوة 1: رفع الباك على Railway (10 دقائق) 🚂

### أ. إنشاء حساب Railway
1. روح على: **https://railway.app**
2. اضغط **"Login with GitHub"**
3. سجل دخول بحساب GitHub بتاعك
4. اضغط **"Authorize Railway"**

### ب. إنشاء مشروع جديد
1. اضغط **"New Project"**
2. اختار **"Deploy from GitHub repo"**
3. اختار الـ repo: **`4pixels`**
4. Railway هيبدأ يحلل المشروع

### ج. إعدادات المشروع
1. **Root Directory**: اكتب `server`
2. **Build Command**: `npm install` (تلقائي)
3. **Start Command**: `node server.js` (تلقائي)
4. اضغط **"Deploy"**

### د. إضافة Environment Variables
1. في Railway Dashboard، اضغط على **"Variables"**
2. أضف المتغيرات دي:

```
PORT=5001
NODE_ENV=production
JWT_SECRET=4pixels-super-secret-key-change-this-123456789
CORS_ORIGIN=*
FRONTEND_URL=*
```

3. اضغط **"Add"** لكل متغير
4. اضغط **"Redeploy"**

### هـ. احصل على الـ URL
1. بعد الـ Deploy، هتلاقي URL زي:
   ```
   https://fourpixels-production.up.railway.app
   ```
2. **احفظ الـ URL ده، هتحتاجه في الخطوة الجاية!**

### و. اختبر الـ API
افتح المتصفح وروح على:
```
https://your-app.railway.app/api/services
```
لازم تشوف قائمة الخدمات بتاعتك!

---

## الخطوة 2: رفع الفرونت على Vercel (10 دقائق) ⚡

### أ. إنشاء حساب Vercel
1. روح على: **https://vercel.com**
2. اضغط **"Sign Up"**
3. اختار **"Continue with GitHub"**
4. سجل دخول وأذن لـ Vercel

### ب. Import المشروع
1. اضغط **"Add New Project"**
2. اختار الـ repo: **`4pixels`**
3. اضغط **"Import"**

### ج. إعدادات المشروع
1. **Framework Preset**: اختار **"Create React App"**
2. **Root Directory**: اكتب `client`
3. **Build Command**: `npm run build` (تلقائي)
4. **Output Directory**: `build` (تلقائي)

### د. Environment Variables
1. اضغط على **"Environment Variables"**
2. أضف:
   - **Name**: `REACT_APP_API_URL`
   - **Value**: `https://your-railway-url.railway.app/api`
   - (استخدم الـ URL من Railway!)
3. اضغط **"Add"**

### هـ. Deploy
1. اضغط **"Deploy"**
2. انتظر 2-3 دقائق
3. هتحصل على URL زي:
   ```
   https://4pixels.vercel.app
   ```

### و. اختبر الموقع
1. افتح الـ URL
2. تأكد من:
   - [ ] الصفحة الرئيسية تفتح
   - [ ] الخدمات تظهر
   - [ ] المشاريع تظهر
   - [ ] التقييمات تظهر

---

## الخطوة 3: تحديث CORS في Railway (2 دقيقة) 🔧

### بعد ما الموقع يشتغل على Vercel:

1. ارجع لـ **Railway Dashboard**
2. اضغط على **"Variables"**
3. غيّر المتغيرات دي:
   ```
   CORS_ORIGIN=https://4pixels.vercel.app
   FRONTEND_URL=https://4pixels.vercel.app
   ```
4. اضغط **"Redeploy"**

---

## الخطوة 4: ربط الدومين من Hostinger (15 دقيقة) 🌐

### A. ربط الدومين الرئيسي بـ Vercel

#### في Vercel:
1. روح على **Project Settings**
2. اضغط على **"Domains"**
3. اضغط **"Add Domain"**
4. اكتب دومينك: `yourdomain.com`
5. Vercel هيديك DNS records

#### في Hostinger:
1. سجل دخول على **Hostinger**
2. روح على **Domains** → **Manage**
3. اضغط على **DNS/Name Servers**
4. أضف الـ records دي:

**A Record:**
```
Type: A
Name: @
Points to: 76.76.21.21
TTL: 3600
```

**CNAME Record:**
```
Type: CNAME
Name: www
Points to: cname.vercel-dns.com
TTL: 3600
```

5. اضغط **"Save"**

### B. ربط Subdomain للـ API

#### في Railway:
1. روح على **Settings**
2. اضغط على **"Networking"**
3. اضغط **"Custom Domain"**
4. اكتب: `api.yourdomain.com`
5. Railway هيديك CNAME value

#### في Hostinger:
أضف CNAME record:
```
Type: CNAME
Name: api
Points to: [القيمة من Railway]
TTL: 3600
```

### C. تحديث Environment Variables

#### في Vercel:
```
REACT_APP_API_URL=https://api.yourdomain.com/api
```

#### في Railway:
```
CORS_ORIGIN=https://yourdomain.com
FRONTEND_URL=https://yourdomain.com
```

### D. Redeploy كل حاجة
- **Vercel**: اضغط "Redeploy"
- **Railway**: اضغط "Redeploy"

### E. انتظر DNS Propagation
- من 5 دقائق لـ 48 ساعة
- عادة بياخد 1-2 ساعة
- تابع على: https://dnschecker.org

---

## الاختبار النهائي ✅

### 1. اختبر الـ API
```
https://api.yourdomain.com/api/services
```

### 2. اختبر الموقع
```
https://yourdomain.com
```

### 3. اختبر الوظائف
- [ ] الصفحة الرئيسية
- [ ] الخدمات
- [ ] المشاريع
- [ ] التقييمات
- [ ] Contact Form
- [ ] Admin Dashboard
- [ ] تسجيل الدخول

---

## المشاكل الشائعة 🔧

### 1. Build Failed في Vercel
**الحل:**
- شوف الـ logs في Vercel
- تأكد من `client` folder صحيح
- تأكد من `package.json` موجود

### 2. CORS Error
**الحل:**
- تأكد من `CORS_ORIGIN` في Railway
- تأكد من `REACT_APP_API_URL` في Vercel
- Redeploy الاتنين

### 3. API Not Found (404)
**الحل:**
- تأكد من الـ API URL صحيح
- تأكد من `/api` في الآخر
- تأكد من السيرفر شغال على Railway

---

## الروابط المهمة 🔗

### GitHub Repo:
```
https://github.com/m0hammeda7mednasr-eng/4pixels
```

### Railway:
```
https://railway.app
```

### Vercel:
```
https://vercel.com
```

### Hostinger:
```
https://hostinger.com
```

---

## التكاليف 💰

### مجاني تماماً:
- ✅ Vercel: Unlimited bandwidth
- ✅ Railway: $5 credit شهرياً
- ✅ SSL Certificates: مجاني
- ✅ GitHub: مجاني

### لو المشروع كبر:
- Railway: $5/شهر
- Vercel Pro: $20/شهر (optional)

---

## الدعم 💬

### Documentation:
- Railway: https://docs.railway.app
- Vercel: https://vercel.com/docs
- Hostinger: https://hostinger.com/tutorials

### لو محتاج مساعدة:
1. شوف الـ logs
2. تأكد من Environment Variables
3. جرب في Incognito Mode
4. تأكد من DNS propagation

---

**جاهز للرفع! ابدأ من الخطوة 1! 🚀**

الوقت المتوقع:
- Railway: 10 دقائق
- Vercel: 10 دقائق
- ربط الدومين: 15 دقيقة
- انتظار DNS: 1-2 ساعة

**المجموع: ~35 دقيقة + انتظار DNS**

بالتوفيق! 🎉
