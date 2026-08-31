# 🎮 NITRO GAMES — نيترو قيمز

متجر عتاد جيمينج احترافي (كيبورد، ماوس، ماوس باد، مايك، سماعات) في فلسطين.

---

# 📥 وين أجيب المشروع؟ (3 طرق)

## الطريقة 1: من محرر الكود في المتصفح (الأسهل) ⭐

لو بتشتغل على المشروع في **Cursor / VS Code / Replit**:

1. اضغط بزر الماوس الأيمن على مجلد المشروع في الشريط الجانبي
2. اختر **"Reveal in Finder"** (ماك) أو **"Reveal in Explorer"** (ويندوز)
3. يفتح لك مجلد المشروع على جهازك ✅

**أو بالكيبورد:**
- ماك: `Cmd + O` ثم اختر المجلد
- ويندوز: `Ctrl + O` ثم اختر المجلد

---

## الطريقة 2: تنزيل كملف مضغوط ZIP

### لو على Replit / Codesandbox:
- اضغط على قائمة **⋮** (ثلاث نقاط) أعلى اليسار
- اختر **"Download as zip"**
- فك الضغط على جهازك ✅

### لو على GitHub (لو رفعته قبل):
- اضغط الزر الأخضر **`<> Code`**
- اختر **"Download ZIP"**

---

## الطريقة 3: تحميل كل ملف يدوياً

انسخ محتوى كل ملف من المحرر والصقه في ملف جديد بنفس الاسم على جهازك.

---

# 📁 هيكل المشروع (ما تحتاجه فقط)

```
nitro-games/
├── src/
│   ├── app/
│   │   ├── api/           ← الواجهات البرمجية (لا تعدّلها)
│   │   ├── layout.tsx     ← الإعدادات العامة + SEO
│   │   ├── page.tsx       ← الصفحة الرئيسية
│   │   ├── globals.css    ← الألوان والتصميم
│   │   ├── robots.ts      ← لجوجل
│   │   └── sitemap.ts     ← خريطة الموقع لجوجل
│   ├── components/        ← كل أجزاء الموقع
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── AdminDashboardModal.tsx  ← لوحة التحكم
│   │   ├── CartDrawer.tsx
│   │   └── ...
│   ├── context/
│   │   └── CartContext.tsx
│   ├── db/
│   │   ├── index.ts
│   │   └── schema.ts
│   └── lib/
│       └── data.ts        ← ⭐ كل المنتجات + رقم الواتساب هنا
├── public/
│   └── images/            ← صور المنتجات
├── package.json           ← ⭐ مهم جداً
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── drizzle.config.json
└── .env                   ← ⭐ رابط موقعك + قاعدة البيانات
```

### الملفات الإلزامية للنشر على Vercel:
| الملف | لماذا |
|---|---|
| `package.json` | يعرّف المشروع وتبعياته |
| `next.config.ts` | إعدادات Next.js |
| `tsconfig.json` | إعدادات TypeScript |
| `postcss.config.mjs` | إعدادات Tailwind |
| `src/` | كل الكود |
| `public/` | الصور |
| `.env` | المتغيرات (لو عندك قاعدة بيانات) |

---

# 🚀 النشر على Vercel (مجاني)

## الخطوة 1: ارفع المشروع لـ GitHub

### بالواجهة الرسومية (GitHub Desktop):
1. حمّل: https://desktop.github.com
2. سجّل حساب: https://github.com/signup
3. في GitHub Desktop:
   - `File` → `Add Local Repository`
   - اختر مجلد المشروع
   - اضغط **"Create & Add Repository"**
4. اكتب رسالة مثل: `first commit`
5. اضغط **"Commit to main"**
6. اضغط **"Publish repository"** ✅

## الخطوة 2: انشر على Vercel

1. اذهب: https://vercel.com
2. اضغط **"Sign Up"** → **"Continue with GitHub"**
3. اضغط **"Add New..."** → **"Project"**
4. اختر مستودع `nitro-games`
5. اضغط **"Deploy"** (بدون تغيير أي إعدادات)
6. انتظر 2-3 دقائق ⏳
7. تحصل على رابط مثل: `nitro-games-xyz.vercel.app` ✅

## الخطوة 3: أضف قاعدة بيانات (مجانية)

الموقع يحتاج PostgreSQL. خيار مجاني:

### على Vercel:
1. في لوحة Vercel → **"Storage"**
2. اختر **"Neon"** أو **"Vercel Postgres"** (الخطة المجانية)
3. اضغط **"Create"**
4. يضيف `DATABASE_URL` تلقائياً ✅

### أو على Neon مباشرة:
1. سجّل: https://neon.tech (مجاني)
2. أنشئ مشروع → انسخ `DATABASE_URL`
3. في Vercel → **Settings** → **Environment Variables**
4. أضف: `DATABASE_URL` = الرابط الذي نسخته

## الخطوة 4: حدّث رابط موقعك

في Vercel → **Settings** → **Environment Variables**:

```
NEXT_PUBLIC_SITE_URL = https://nitro-games-xyz.vercel.app
```

(غيّره للرابط الحقيقي الذي أعطوك إياه)

---

# 🔍 الظهور على جوجل (مجاني)

## أرسل موقعك لجوجل:

1. اذهب: https://search.google.com/search-console
2. سجّل بحساب جيميل
3. اضغط **"Add Property"** → **"URL Prefix"**
4. أدخل رابطك من Vercel
5. **طريقة التحقق:**
   - اختر **"HTML Tag"**
   - انسخ الكود مثل:
     ```html
     <meta name="google-site-verification" content="ABC123..." />
     ```
   - أرسله لي وسأضعه في `layout.tsx`
   - أو أضفه بنفسك داخل `<head>`
6. اضغط **"Verify"** ✅

## أرسل خريطة الموقع:

في Search Console → **"Sitemaps"** → أدخل:
```
sitemap.xml
```
اضغط **"Submit"** ✅

## طلب فهرسة سريع:

1. في Search Console → **"URL Inspection"**
2. الصق رابط موقعك
3. اضغط **"Request Indexing"** ✅

**النتيجة:** يظهر موقعك خلال 2-7 أيام عند البحث «نيترو قيمز»

---

# 🎛️ استخدام لوحة التحكم

## الدخول:
1. اضغط زر **«لوحة المشرف»** في الشريط العلوي
2. أو اضغط `Ctrl + Shift + A`
3. كلمة المرور: `Yamen2009Yamen`

## التبويبات:

### 📦 إدارة المنتجات
- إضافة / تعديل / حذف منتج
- الحفظ تلقائي في المتصفح (localStorage)

### 🖼️ المربع المميز
- تشغيل/إيقاف المربع في الصفحة الرئيسية
- سرعة تبديل الصور
- اختيار المنتجات وترتيبها
- تعديل النصوص

---

# ⚙️ إعدادات مهمة

## تغيير رقم الواتساب:
في ملف `src/lib/data.ts`:
```ts
export const STORE_CONTACT = {
  whatsapp: "972595852044",        // ← غيّر الرقم هنا
  display: "+972 59 585 2044",     // ← الصيغة الكاملة
  short: "059-585-2044",           // ← الصيغة المختصرة
};
```

## تغيير كلمة مرور اللوحة:
في ملف `src/components/AdminDashboardModal.tsx`:
ابحث عن `Yamen2009Yamen` وغيّرها.

---

# 🛠️ تشغيل محلي على جهازك

```bash
# 1. ثبّت البرامج المطلوبة (مرة واحدة)
#    - Node.js: https://nodejs.org (اختر LTS)

# 2. افتح الترمينال في مجلد المشروع
cd nitro-games

# 3. ثبّت التبعيات
npm install

# 4. شغّل الموقع
npm run dev

# 5. افتح المتصفح على
http://localhost:3000
```

---

# 📞 الدعم

| الخدمة | الرابط |
|---|---|
| Vercel (استضافة) | https://vercel.com |
| Neon (قاعدة بيانات) | https://neon.tech |
| GitHub | https://github.com |
| Search Console | https://search.google.com/search-console |

---

© NITRO GAMES — فلسطين 🇵🇸
