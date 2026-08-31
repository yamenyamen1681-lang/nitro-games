export type CategoryType = "keyboards" | "mice" | "mousepads" | "microphones" | "headsets";

export interface Product {
  id: number;
  slug: string;
  title: string;
  titleEn: string;
  brand: string;
  category: CategoryType;
  price: number; // in ₪
  originalPrice?: number;
  discountPercent?: number;
  image: string;
  inStock: boolean;
  stockQuantity: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  description: string;
  specs: string[];
  isFeatured: boolean;
}

/* ===== Featured Hero Showcase (Admin-controlled) ===== */
export interface ShowcaseConfig {
  enabled: boolean;
  autoPlay: boolean;
  intervalMs: number;
  productIds: number[];
  badgeText: string;
  headline: string;
  ctaLabel: string;
}

/* ===== Store contact info (single source of truth — change here and it updates everywhere) ===== */
export const STORE_CONTACT = {
  /** WhatsApp number in international format, digits only (no +, no spaces) */
  whatsapp: "972595852044",
  /** Human-readable display format */
  display: "+972 59 585 2044",
  /** Short label used in compact UI spots */
  short: "059-585-2044",
};

export const DEFAULT_SHOWCASE: ShowcaseConfig = {
  enabled: true,
  autoPlay: true,
  intervalMs: 3600,
  productIds: [],
  badgeText: "LIVE SHOWCASE",
  headline: "عتاد البطولات • جاهز للشحن",
  ctaLabel: "تسوق الآن",
};

export const CATEGORIES_META: {
  id: CategoryType;
  name: string;
  nameEn: string;
  desc: string;
  iconName: string;
  color: string;
}[] = [
  {
    id: "keyboards",
    name: "كيبورد",
    nameEn: "Keyboards",
    desc: "كيبوردات ميكانيكية وRapid Trigger مغناطيسية باستجابة 0.1 ملم",
    iconName: "Keyboard",
    color: "from-purple-500/20 to-magenta-500/10",
  },
  {
    id: "mice",
    name: "ماوس",
    nameEn: "Gaming Mice",
    desc: "ماوسات رياضات إلكترونية خفيفة الوزن بتردد 8000Hz وحساس Focus Pro",
    iconName: "Mouse",
    color: "from-magenta-500/20 to-purple-500/10",
  },
  {
    id: "mousepads",
    name: "ماوس باد",
    nameEn: "Mousepads",
    desc: "أسطح Artisan اليابانية وقواعد بورون للتحكم المطلق والإيقاف الفوري",
    iconName: "Square",
    color: "from-violet-500/20 to-indigo-500/10",
  },
  {
    id: "microphones",
    name: "مايك",
    nameEn: "Microphones",
    desc: "مايكروفونات استوديو وبث ألعاب سلكية ومكثفة مع عزل ذكي للضوضاء",
    iconName: "Mic",
    color: "from-pink-500/20 to-purple-500/10",
  },
  {
    id: "headsets",
    name: "سماعات",
    nameEn: "Headsets",
    desc: "سماعات محيطية 360° ودرايفرات جرافين مع إلغاء نشط للضوضاء ANC",
    iconName: "Headphones",
    color: "from-fuchsia-500/20 to-violet-500/10",
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  // 1. الكيبوردات (Keyboards)
  {
    id: 1,
    slug: "wooting-60he-plus",
    title: "كيبورد Wooting 60HE+ Hall Effect التناظري | ميزة Rapid Trigger الأصلية",
    titleEn: "Wooting 60HE+ Analog Mechanical Keyboard Rapid Trigger",
    brand: "Wooting",
    category: "keyboards",
    price: 920,
    originalPrice: 1080,
    discountPercent: 15,
    image: "/images/keyboard-custom-rgb.jpg",
    inStock: true,
    stockQuantity: 11,
    rating: 5.0,
    reviewCount: 124,
    badge: "الأكثر طلباً عالمياً 🏆",
    description: "الكيبورد الذي غير تاريخ ألعاب الرياضات الإلكترونية! سويتشات Lekker المغناطيسية مع ميزة Rapid Trigger الحصرية لسرعة حركة وتوقف فورية في ألعاب الشوتر.",
    specs: [
      "سويتشات: Gateron Lekker Hall Effect Magnetic Switches",
      "نقطة التفعيل: قابلة للتعديل من 0.1 ملم إلى 4.0 ملم",
      "ميزة Rapid Trigger لسرعة خاطفة في التوقف والانعطاف",
      "أغطية مفاتيح PBT Double-shot مقاومة للتآكل",
      "برنامج Wootility للضبط الفوري عبر المتصفح بدون تثبيت"
    ],
    isFeatured: true,
  },
  {
    id: 2,
    slug: "asus-rog-azoth-oled",
    title: "كيبورد ASUS ROG Azoth 75% اللاسلكي الميكانيكي مع شاشة OLED ذكية ومقبض تحكم",
    titleEn: "ASUS ROG Azoth 75% Custom Wireless Mechanical Keyboard",
    brand: "ASUS ROG",
    category: "keyboards",
    price: 990,
    originalPrice: 1190,
    discountPercent: 17,
    image: "/images/keyboard-custom-rgb.jpg",
    inStock: true,
    stockQuantity: 8,
    rating: 4.9,
    reviewCount: 46,
    badge: "شاشة OLED كاستم ⚡",
    description: "كيبورد كاستم متكامل بنظام Gasket Mount وثلاث طبقات كتم صوت مع شاشة OLED لعرض درجات الحرارة ورسوم GIF المتحركة وسويتشات مشحمة مسبقاً.",
    specs: [
      "بناء Gasket Mount من السيليكون لراحة وصوت عميق",
      "شاشة 2 بوصة OLED مع مقبض تحكم ثلاثي الاتجاهات",
      "اتصال لاسلكي ثلاثي SpeedNova 2.4GHz وبلوتوث وType-C",
      "عدة تشحيم كاملة مرفقة داخل الصندوق"
    ],
    isFeatured: true,
  },
  {
    id: 3,
    slug: "drunkdeer-a75-pro",
    title: "كيبورد DrunkDeer A75 Rapid Trigger المغناطيسي المخصص لمحترفي Valorant",
    titleEn: "DrunkDeer A75 Rapid Trigger Magnetic Gaming Keyboard",
    brand: "DrunkDeer",
    category: "keyboards",
    price: 560,
    originalPrice: 660,
    discountPercent: 15,
    image: "/images/keyboard-custom-rgb.jpg",
    inStock: true,
    stockQuantity: 14,
    rating: 4.8,
    reviewCount: 52,
    badge: "بطل القيمة الخارقة 🔥",
    description: "أفضل كيبورد مغناطيسي اقتصادي بحجم 75% مع ميزة Rapid Trigger حقيقية وسويتشات Hall Effect سريعة ومقبض معدني للتحكم بمستوى الصوت.",
    specs: [
      "سويتشات مغناطيسية حساسة جداً بقوة 0.2 ملم",
      "حجم 75% مع مفاتيح الأسهم الكاملة وKnob للصوت",
      "إضاءة RGB نيون قابلة للتخصيص ومقاومة للماء"
    ],
    isFeatured: false,
  },

  // 2. الماوسات (Mice)
  {
    id: 4,
    slug: "logitech-g-pro-x-superlight-2",
    title: "ماوس الألعاب اللاسلكي Logitech G PRO X SUPERLIGHT 2 - أسود / أبيض",
    titleEn: "Logitech G PRO X SUPERLIGHT 2 Wireless 8K Gaming Mouse",
    brand: "Logitech G",
    category: "mice",
    price: 580,
    originalPrice: 720,
    discountPercent: 19,
    image: "/images/mouse-pro-8k.jpg",
    inStock: true,
    stockQuantity: 18,
    rating: 5.0,
    reviewCount: 98,
    badge: "سلاح المحترفين 🎯",
    description: "الماوس الأيقوني لبطولات الرياضات الإلكترونية بحساس HERO 2 ودعم تردد حتى 8000Hz، مع سويتشات Lightforce الهجينة ووزن 60 غرام فقط وبطارية 95 ساعة.",
    specs: [
      "الوزن: 60 غرام فائق الخفة ومتماثل",
      "الحساس: HERO 2 بدقة 32,000 DPI وسرعة 500+ IPS",
      "سويتشات Lightforce الضوئية-الميكانيكية الهجينة",
      "عمر بطارية 95 ساعة وشحن سريع عبر USB-C",
      "زلاجات PTFE نقية 100% لانزلاق خالي من الاحتكاك"
    ],
    isFeatured: true,
  },
  {
    id: 5,
    slug: "razer-viper-v3-pro",
    title: "ماوس الألعاب اللاسلكي Razer Viper V3 Pro - تردد 8000Hz لاسلكي حقيقي",
    titleEn: "Razer Viper V3 Pro Wireless Gaming Mouse 8000Hz",
    brand: "Razer",
    category: "mice",
    price: 640,
    originalPrice: 790,
    discountPercent: 19,
    image: "/images/mouse-pro-8k.jpg",
    inStock: true,
    stockQuantity: 14,
    rating: 5.0,
    reviewCount: 77,
    badge: "8K Polling Rate ⚡",
    description: "الجيل الأحدث من عائلة فايبر الشهيرة. مزود بدونجل HyperPolling 8K اللاسلكي المدمج وحساس Focus Pro 35K الجيل الثاني، بوزن مذهل 54 غرام فقط.",
    specs: [
      "وزن 54 غرام فقط مع توازن هوائي مثالي",
      "تردد استجابة 8000Hz لاسلكي حقيقي (0.125ms)",
      "حساس Razer Focus Pro 35K Optical Gen-2",
      "سويتشات بصرية Gen-3 بعمر 90 مليون نقرة"
    ],
    isFeatured: true,
  },
  {
    id: 6,
    slug: "finalmouse-ultralightx",
    title: "ماوس Finalmouse UltralightX Lion - هيكل من ألياف الكربون الفضائية (31g)",
    titleEn: "Finalmouse UltralightX Lion Carbon Fiber Wireless",
    brand: "Finalmouse",
    category: "mice",
    price: 980,
    originalPrice: 1200,
    discountPercent: 18,
    image: "/images/mouse-pro-8k.jpg",
    inStock: true,
    stockQuantity: 5,
    rating: 5.0,
    reviewCount: 34,
    badge: "أخف ماوس بالعالم 💎",
    description: "أخف ماوس لاسلكي احترافي في العالم بوزن 31 غرام فقط مصنوع من مركب ألياف الكربون المقوى. تحكم لحظي بدون أي مجهود في المعصم.",
    specs: [
      "الوزن الخارق: 31 غرام فقط!",
      "هيكل من ألياف الكربون الفضائي عالية المتانة",
      "تردد استجابة Tournament Wireless حتى 8000Hz"
    ],
    isFeatured: false,
  },

  // 3. الماوس باد (Mousepads)
  {
    id: 7,
    slug: "artisan-ninja-fx-zero-soft",
    title: "ماوس باد ياباني Artisan Ninja FX Zero Soft - حجم XL (تحكم ودقة متناهية)",
    titleEn: "Artisan Ninja FX Zero Soft XL Japanese Gaming Mousepad",
    brand: "Artisan Japan",
    category: "mousepads",
    price: 280,
    originalPrice: 340,
    discountPercent: 17,
    image: "/images/mousepad-pro.jpg",
    inStock: true,
    stockQuantity: 24,
    rating: 5.0,
    reviewCount: 110,
    badge: "الماوس باد رقم 1 عالمياً 🇯🇵",
    description: "الماوس باد الياباني الأشهر في العالم والأكثر استخداماً في بطولات فالورانت وCS2. نسيج ميكروي مع قاعدة بورون تلتصق بالطاولة وتمنحك قوة إيقاف فورية للماوس.",
    specs: [
      "صناعة يابانية أصلية 100% في كوبه - اليابان",
      "قاعدة بورون خاصة (Special Poron Base) تمنع الانزلاق",
      "أبعاد XL (490 × 420 مم) بسماكة 4 مم ناعمة",
      "خياطة حواف مخفية منخفضة عن السطح لراحة المعصم"
    ],
    isFeatured: true,
  },
  {
    id: 8,
    slug: "artisan-hayate-otsu-fx-mid",
    title: "ماوس باد ياباني Artisan FX Hayate Otsu Mid - نبيذي / أسود XL هايبرد",
    titleEn: "Artisan FX Hayate Otsu Mid XL Gaming Mousepad",
    brand: "Artisan Japan",
    category: "mousepads",
    price: 310,
    originalPrice: 370,
    discountPercent: 16,
    image: "/images/mousepad-speed.jpg",
    inStock: true,
    stockQuantity: 16,
    rating: 4.9,
    reviewCount: 64,
    badge: "سرعة وتحكم هايبرد 🌪️",
    description: "إصدار Hayate Otsu المطور، يمنحك انزلاقاً فائق السلاسة مع قوة إيقاف لحظية لا تضاهى، مقاوم للرطوبة وتغيرات الطقس 100%.",
    specs: [
      "سطح هايبرد للسرعة والدقة العالية في التصويب",
      "إسفنج ياباني Mid بصلابة متجانسة وثابتة",
      "مقاس 490 × 420 × 3 مم مريح للذراع"
    ],
    isFeatured: true,
  },
  {
    id: 9,
    slug: "steelseries-qck-heavy-xxl",
    title: "ماوس باد SteelSeries QcK Heavy XXL - سماكة 6 مم لراحة الذراع وعزل السطح",
    titleEn: "SteelSeries QcK Heavy XXL Thick Desk Mat",
    brand: "SteelSeries",
    category: "mousepads",
    price: 180,
    originalPrice: 220,
    discountPercent: 18,
    image: "/images/mousepad-speed.jpg",
    inStock: true,
    stockQuantity: 28,
    rating: 4.8,
    reviewCount: 89,
    badge: "الأكثر شعبية 🌟",
    description: "الماوس باد الممتد الأسطوري بسماكة 6 مم يتسع للماوس والكيبورد معاً ويعزل اليد عن برودة وصلابة سطح المكتب.",
    specs: [
      "أبعاد 900 × 400 × 6 مم (ممتد Desk Mat)",
      "قماش Micro-woven النقي مع قاعدة مطاطية غير قابلة للانزلاق",
      "سماكة 6 مم مريحة جداً لجلسات اللعب الطويلة"
    ],
    isFeatured: false,
  },

  // 4. المايكات (Microphones)
  {
    id: 10,
    slug: "shure-sm7b-dynamic-mic",
    title: "مايكروفون Shure SM7B الديناميكي الاستوديو الأسطوري للبث والتعليق والبودكاست",
    titleEn: "Shure SM7B Legendary Studio Vocal Microphone",
    brand: "Shure",
    category: "microphones",
    price: 1450,
    originalPrice: 1690,
    discountPercent: 14,
    image: "/images/microphone-pro.jpg",
    inStock: true,
    stockQuantity: 6,
    rating: 5.0,
    reviewCount: 73,
    badge: "معيار الستريمرز العالمي 🎙️",
    description: "المايكروفون الأكثر شهرة واستخداماً لدى كبار صناع المحتوى واستوديوهات البث في العالم. عزل كهرومغناطيسي وفلتر بوب مدمج لصوت إذاعي دافئ ونقي.",
    specs: [
      "نوع الكبسولة: ديناميكية بنمط قطبي قلبي Cardioid",
      "نطاق استجابة ترددية واسع وناعم من 50Hz إلى 20kHz",
      "عزل هوائي داخلي يمنع انتقال اهتزازات المكتب",
      "منفذ XLR احترافي يتطلب كرت صوت أو مضخم إشارة"
    ],
    isFeatured: true,
  },
  {
    id: 11,
    slug: "hyperx-quadcast-s-rgb",
    title: "مايكروفون HyperX QuadCast S المضيء مع إضاءة RGB مذهلة وفلتر بوب مانع للاهتزاز",
    titleEn: "HyperX QuadCast S USB Condenser Microphone RGB",
    brand: "HyperX",
    category: "microphones",
    price: 590,
    originalPrice: 720,
    discountPercent: 18,
    image: "/images/microphone-pro.jpg",
    inStock: true,
    stockQuantity: 15,
    rating: 4.9,
    reviewCount: 91,
    badge: "إضاءة RGB ديناميكية ✨",
    description: "مايك مكثف USB متكامل مزود بمانع اهتزاز مدمج ومستشعر كتم صوت يعمل باللمس في الأعلى مع مؤشر LED وإضاءة RGB مذهلة متناسقة مع برامج البث.",
    specs: [
      "اتصال USB مباشر (Plug & Play) متوافق مع PC وPS5",
      "مستشعر Tap-to-Mute سريع في الأعلى مع مؤشر إضاءة",
      "أربعة أنماط قطبية قابلة للاختيار (ستيريو، شامل، قلبي، ثنائي)",
      "قاعدة Shock Mount مدمجة لامتصاص صدمات الكيبورد"
    ],
    isFeatured: true,
  },
  {
    id: 12,
    slug: "roode-podmic-usb-xlr",
    title: "مايكروفون Rode PodMic USB & XLR الديناميكي مع معالجة DSP صوتية رقمية",
    titleEn: "Rode PodMic USB Dynamic Broadcast Microphone",
    brand: "Røde",
    category: "microphones",
    price: 680,
    originalPrice: 790,
    discountPercent: 14,
    image: "/images/microphone-pro.jpg",
    inStock: true,
    stockQuantity: 9,
    rating: 4.8,
    reviewCount: 42,
    badge: "منفذ مزدوج USB/XLR 🚀",
    description: "مايك بث احترافي من رود يوفر منفذ USB-C مباشر ومنفذ XLR تقليدي مع شريحة DSP داخلية للتحسين الصوتي التلقائي ومخرج لسماعة الرأس بدون تأخير.",
    specs: [
      "اتصال مزدوج USB-C و XLR تناظري",
      "معالجة APHEX DSP مدمجة لصوت إذاعي ممتلئ",
      "هيكل معدني صلب بالكامل مصمم لسنوات طويلة من الاستخدام"
    ],
    isFeatured: false,
  },

  // 5. السماعات (Headsets)
  {
    id: 13,
    slug: "steelseries-arctis-nova-pro",
    title: "سماعة SteelSeries Arctis Nova Pro Wireless مع محطة GameDAC وبطاريتين",
    titleEn: "SteelSeries Arctis Nova Pro Wireless Gaming Headset",
    brand: "SteelSeries",
    category: "headsets",
    price: 1390,
    originalPrice: 1650,
    discountPercent: 15,
    image: "/images/headset-pro.jpg",
    inStock: true,
    stockQuantity: 9,
    rating: 5.0,
    reviewCount: 68,
    badge: "صوت محيطي 360° 🎧",
    description: "قمة الصوتيات في عالم الجيمينج! عزل ضوضاء نشط ANC، محطة GameDAC بشاشة OLED، ونظام بطاريات مزدوجة قابلة للتبديل الفوري دون انقطاع الصوت إطلاقاً.",
    specs: [
      "مشغلات صوت Hi-Res عالية الدقة مع صوت مكاني 360°",
      "نظام إلغاء الضوضاء النشط الهجين 4-Mic ANC",
      "بطاريتان قابلتان للتبديل الفوري Hot-Swap للعب بلا توقف",
      "مايكروفون ClearCast Gen 2 المدعوم بالذكاء الاصطناعي"
    ],
    isFeatured: true,
  },
  {
    id: 14,
    slug: "hyperx-cloud-iii-wireless",
    title: "سماعة HyperX Cloud III اللاسلكية للألعاب | بطارية تدوم 120 ساعة متواصلة",
    titleEn: "HyperX Cloud III Wireless Gaming Headset 120h Battery",
    brand: "HyperX",
    category: "headsets",
    price: 650,
    originalPrice: 780,
    discountPercent: 16,
    image: "/images/headset-pro.jpg",
    inStock: true,
    stockQuantity: 17,
    rating: 4.9,
    reviewCount: 95,
    badge: "راحة أسطورية وبطارية 120h ☁️",
    description: "الأسطورة عادت ببطارية خارقة 120 ساعة بشحنة واحدة فقط! وسائد ميموري فوم مريحة للغاية ودرايفرات 53mm مائلة لتحديد خطوات الأعداء بدقة.",
    specs: [
      "عمر بطارية لا يصدق حتى 120 ساعة متواصلة",
      "مشغلات 53mm مائلة لزاوية الأذن لواقعية صوتية",
      "مايك 10mm فائق الوضوح مع مؤشر LED لكتم الصوت",
      "إطار ألمنيوم صلب مقاوم للانحناء والاستخدام اليومي"
    ],
    isFeatured: true,
  },
  {
    id: 15,
    slug: "logitech-g-pro-x-2",
    title: "سماعة Logitech G PRO X 2 LIGHTSPEED اللاسلكية بمشغلات الجرافين النقية",
    titleEn: "Logitech G PRO X 2 LIGHTSPEED Wireless Graphene",
    brand: "Logitech G",
    category: "headsets",
    price: 890,
    originalPrice: 1050,
    discountPercent: 15,
    image: "/images/headset-pro.jpg",
    inStock: true,
    stockQuantity: 11,
    rating: 4.9,
    reviewCount: 54,
    badge: "درايفرات جرافين 50mm 🎼",
    description: "أول سماعة ألعاب في العالم تستخدم مشغلات الجرافين 50mm لنقاء صوتي متناهي وتشويش منعدم، مع اتصال ثلاثي وبطارية 50 ساعة.",
    specs: [
      "مشغلات 50mm Pro-G Graphene الثورية",
      "اتصال لاسلكي LIGHTSPEED 2.4GHz وبلوتوث و3.5mm",
      "مفصلات دوارة متينة مع وسائد جلدية ومخملية بديلة"
    ],
    isFeatured: false,
  },
];

export interface CustomerReview {
  id: number;
  author: string;
  city: string;
  rating: number;
  comment: string;
  verifiedPurchase: boolean;
  itemBought: string;
  date: string;
}

export const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: 1,
    author: "محمد عبد الله",
    city: "رام الله",
    rating: 5,
    comment: "طلبت ماوس Logitech Superlight 2 مع كيبورد Wooting 60HE+ ووصلوني في أقل من 24 ساعة لباب بيتي في الطيرة! تغليف مصفح وضمان حقيقي، سرعة استجابة الكيبورد خرافية في فالورانت.",
    verifiedPurchase: true,
    itemBought: "ماوس Superlight 2 + كيبورد Wooting 60HE+",
    date: "منذ يومين"
  },
  {
    id: 2,
    author: "أحمد الجعبري",
    city: "الخليل",
    rating: 5,
    comment: "ماوس باد Artisan Zero Soft الياباني أصلي 100%، وأخذت معه مايك HyperX QuadCast S للبث. الصوت نقي جداً وعزل الماوس باد خيالي. تعامل راقي والدفع عند الاستلام كاش بعد الفحص.",
    verifiedPurchase: true,
    itemBought: "ماوس باد Artisan Zero + مايك QuadCast S",
    date: "منذ 4 أيام"
  },
  {
    id: 3,
    author: "طارق سلهب",
    city: "القدس الشريف",
    rating: 5,
    comment: "سماعة SteelSeries Arctis Nova Pro اللاسلكية أصلية مع محطة الـ DAC والبطاريتين. عزل الـ ANC ممتاز وخدمة التوصيل للقدس كانت سريعة جداً. متجر NITRO GAMES هو الأول بدون منازع.",
    verifiedPurchase: true,
    itemBought: "سماعة Arctis Nova Pro Wireless",
    date: "منذ أسبوع"
  },
  {
    id: 4,
    author: "خالد المصري",
    city: "نابلس",
    rating: 5,
    comment: "مايك Shure SM7B مع كيبورد ASUS ROG Azoth... السيت اب تحول إلى استوديو فضائي احترافي! التصميم والمصداقية عند NITRO GAMES تستاهل 10 نجوم.",
    verifiedPurchase: true,
    itemBought: "مايك Shure SM7B + كيبورد ROG Azoth",
    date: "منذ أسبوعين"
  }
];

export const PALESTINIAN_CITIES = [
  { name: "رام الله والبيرة", deliveryFee: 20, deliveryTime: "24 ساعة" },
  { name: "القدس الشريف", deliveryFee: 30, deliveryTime: "24-48 ساعة" },
  { name: "نابلس", deliveryFee: 20, deliveryTime: "24 ساعة" },
  { name: "الخليل", deliveryFee: 20, deliveryTime: "24 ساعة" },
  { name: "جنين", deliveryFee: 20, deliveryTime: "24 ساعة" },
  { name: "بيت لحم", deliveryFee: 20, deliveryTime: "24 ساعة" },
  { name: "طولكرم", deliveryFee: 20, deliveryTime: "24 ساعة" },
  { name: "قلقيلية", deliveryFee: 20, deliveryTime: "24 ساعة" },
  { name: "سلفيت", deliveryFee: 20, deliveryTime: "24 ساعة" },
  { name: "طوباس", deliveryFee: 20, deliveryTime: "24 ساعة" },
  { name: "أريحا والأغوار", deliveryFee: 25, deliveryTime: "24-48 ساعة" },
  { name: "قطاع غزة (شحن خاص عند التوفر)", deliveryFee: 35, deliveryTime: "حسب التنسيق" },
  { name: "مناطق الداخل المحتل (48 / حيفا، يافا، الناصرة، عكا)", deliveryFee: 50, deliveryTime: "48-72 ساعة" },
];
