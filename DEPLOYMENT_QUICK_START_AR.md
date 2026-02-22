# دليل الرفع السريع 🚀

## الخطوات بالترتيب

### 1️⃣ تجهيز الكود (5 دقائق)

```bash
# في مجلد المشروع الرئيسي
git init
git add .
git commit -m "Ready for deployment"
```

### 2️⃣ رفع على GitHub (3 دقائق)

1. روح على https://github.com
2. اضغط "New repository"
3. اسم الـ repo: `fourpixels-website`
4. اضغط "Create repository"
5. في Terminal:

```bash
git remote add origin https://github.com/YOUR_USERNAME/fourpixels-website.git
git branch -M main
git push -u origin main
```

### 3️⃣ رفع الباك على Railway (10 دقائق)

#### أ. إنشاء الحساب
1. روح على: https://railway.app
2. اضغط "Login with GitHub"
3. اضغط "New Project"
4. اختار "Deploy from GitHub repo"
5. اختار `fourpixels-website`

#### ب. إعدادات المشروع
1. Root Directory: `server`
2. اضغط "Deploy"

#### ج. Environment Variables
اضغط على Variables وأضف:
```
PORT=5001
NODE_ENV=production
JWT_SECRET=change-this-to-random-string-123456789
CORS_ORIGIN=https://yourdomain.com
FRONTEND_URL=https://yourdomain.com
```

#### د. احصل على الـ URL
- بعد الـ Deploy، هتلاقي URL زي:
- `https://fourpixels-production.up.railway.app`
- احفظه، هتحتاجه في الخطوة الجاية

### 4️⃣ رفع الفرونت على Vercel (10 دقائق)

#### أ. إنشاء الحساب
1. روح على: https://vercel.com
2. اضغط "Sign Up with GitHub"
3. اضغط "Add New Project"
4. اختار `fourpixels-website`

#### ب. إعدادات المشروع
1. Root Directory: `client`
2. Framework Preset: Create React App
3. Build Command: `npm run build`
4. Output Directory: `build`

#### ج. Environment Variables
أضف:
```
REACT_APP_API_URL=https://fourpixels-production.up.railway.app/api
```
(استخدم الـ URL من Railway)

#### د. Deploy
1. اضغط "Deploy"
2. انتظر 2-3 دقائق
3. هتحصل على URL زي: `https://fourpixels.vercel.app`

### 5️⃣ تحديث CORS في Railway (2 دقيقة)

1. ارجع لـ Railway
2. Variables
3. غيّر `CORS_ORIGIN` لـ:
```
CORS_ORIGIN=https://fourpixels.vercel.app
FRONTEND_URL=https://fourpixels.vercel.app
```
4. اضغط "Redeploy"

### 6️⃣ اختبار الموقع (5 دقائق)

1. افتح: `https://fourpixels.vercel.app`
2. تأكد من:
   - [ ] الصفحة الرئيسية تفتح
   - [ ] الخدمات تظهر
   - [ ] المشاريع تظهر
   - [ ] فورم Contact يشتغل
   - [ ] Admin Dashboard يفتح

---

## 7️⃣ ربط الدومين من Hostinger (15 دقيقة)

### A. ربط الدومين الرئيسي بـ Vercel

#### في Vercel:
1. Project Settings → Domains
2. اضغط "Add Domain"
3. اكتب: `yourdomain.com`
4. Vercel هيديك DNS records

#### في Hostinger:
1. سجل دخول على Hostinger
2. Domains → Manage → DNS/Name Servers
3. أضف الـ records دي:

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

### B. ربط Subdomain للـ API

#### في Railway:
1. Settings → Networking
2. Custom Domain
3. اكتب: `api.yourdomain.com`
4. Railway هيديك CNAME value

#### في Hostinger:
أضف CNAME:
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

### D. Redeploy
- Vercel: اضغط "Redeploy"
- Railway: اضغط "Redeploy"

### E. انتظر DNS Propagation
- من 5 دقائق لـ 48 ساعة
- عادة 1-2 ساعة
- تابع على: https://dnschecker.org

---

## الملخص السريع ⚡

```
1. Git → GitHub (5 دقائق)
2. GitHub → Railway (باك) (10 دقائق)
3. GitHub → Vercel (فرونت) (10 دقائق)
4. تحديث CORS (2 دقيقة)
5. اختبار (5 دقائق)
6. ربط الدومين (15 دقيقة)
7. انتظار DNS (1-2 ساعة)

المجموع: ~45 دقيقة + انتظار DNS
```

---

## المشاكل الشائعة 🔧

### 1. Build Failed في Vercel
```bash
# جرب البناء محلياً أولاً
cd client
npm install
npm run build

# لو في أخطاء، اصلحها قبل الـ deploy
```

### 2. CORS Error
تأكد من:
- `CORS_ORIGIN` في Railway = URL الفرونت
- `REACT_APP_API_URL` في Vercel = URL الباك + `/api`

### 3. API Not Found (404)
تأكد من:
- الـ API URL صحيح
- فيه `/api` في الآخر
- السيرفر شغال على Railway

### 4. Domain Not Working
- انتظر DNS propagation
- تأكد من DNS records صحيحة
- استخدم https://dnschecker.org

---

## الأوامر المفيدة 📝

### تحديث الكود
```bash
git add .
git commit -m "Update"
git push

# Vercel و Railway هيعملوا auto-deploy
```

### مشاهدة Logs
- Railway: Dashboard → Deployments → View Logs
- Vercel: Dashboard → Deployments → View Function Logs

### Rollback
- Railway: Deployments → اختار deployment قديم → Redeploy
- Vercel: Deployments → اختار deployment قديم → Promote to Production

---

## الدعم 💬

### لو محتاج مساعدة:
1. شوف الـ logs في Railway/Vercel
2. تأكد من Environment Variables
3. جرب الموقع في Incognito Mode
4. تأكد من DNS propagation

### Resources:
- Railway Docs: https://docs.railway.app
- Vercel Docs: https://vercel.com/docs
- Hostinger Support: https://hostinger.com/support

---

## التكاليف 💰

### مجاني:
- ✅ Vercel: Unlimited bandwidth
- ✅ Railway: $5 credit شهرياً
- ✅ SSL Certificates: مجاني

### لو المشروع كبر:
- Railway: $5/شهر
- Vercel Pro: $20/شهر (optional)

---

**خلاص! موقعك على الإنترنت! 🎉**

الموقع بتاعك دلوقتي:
- ✅ على الإنترنت
- ✅ SSL مجاني (HTTPS)
- ✅ سريع جداً
- ✅ Auto-deploy من GitHub
- ✅ مربوط بالدومين بتاعك

**بالتوفيق! 🚀**
