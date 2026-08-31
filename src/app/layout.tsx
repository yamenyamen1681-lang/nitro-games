import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nitro-games.example.com";
const STORE_NAME_AR = "نيترو قيمز";
const STORE_NAME_EN = "NITRO GAMES";
const WHATSAPP = "972595852044";

const description =
  "NITRO GAMES (نيترو قيمز) — خياركم الأفضل في فلسطين للعتاد الاحترافي: كيبورد، ماوس، ماوس باد، مايك، سماعات. توصيل لكافة مناطق فلسطين والداخل المحتل مع ضمان حقيقي لمدة سنة.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  // ===== العنوان والوصف =====
  title: {
    default: "نيترو قيمز | NITRO GAMES — متجر عتاد الجيمينج في فلسطين",
    template: "%s | NITRO GAMES فلسطين",
  },
  description,

  // ===== كلمات مفتاحية (عربي + إنجليزي + أخطاء إملائية شائعة) =====
  keywords: [
    // عربي
    "نيترو قيمز",
    "نتيرو قيمز",
    "نيتروقيز",
    "متجر قيمنق فلسطين",
    "قيمنق فلسطين",
    "عتاد قيمنق",
    "كيبورد قيمنق",
    "ماوس قيمنق",
    "ماوس باد",
    "مايك قيمنق",
    "سماعات قيمنق",
    "متجر ألعاب فلسطين",
    "رام الله",
    "القدس",
    // إنجليزي
    "Nitro Games",
    "NitroGames",
    "NITRO GAMES Palestine",
    "gaming store palestine",
    "gaming peripherals palestine",
    "esports gear palestine",
    "keyboard palestine",
    "gaming mouse palestine",
    "mousepad",
    "microphone",
    "headset",
    "Wooting",
    "Artisan",
    "Logitech Superlight",
    "Razer Viper",
  ],

  authors: [{ name: "NITRO GAMES", url: SITE_URL }],
  creator: "NITRO GAMES",
  publisher: "NITRO GAMES",

  // ===== الظهور عند المشاركة (واتساب / فيسبوك / تويتر) =====
  openGraph: {
    type: "website",
    locale: "ar_PS",
    alternateLocale: ["ar", "en_US"],
    url: SITE_URL,
    siteName: "NITRO GAMES — نيترو قيمز",
    title: "نيترو قيمز | NITRO GAMES — خياركم الأفضل في فلسطين",
    description,
    images: [
      {
        url: "/images/deep-space-nebula.jpg",
        width: 1200,
        height: 630,
        alt: "NITRO GAMES — نيترو قيمز متجر عتاد الجيمينج في فلسطين",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "نيترو قيمز | NITRO GAMES فلسطين",
    description,
    images: ["/images/deep-space-nebula.jpg"],
  },

  // ===== التطبيق على الجوال =====
  applicationName: "NITRO GAMES",
  appleWebApp: {
    capable: true,
    title: "NITRO GAMES",
    statusBarStyle: "black-translucent",
  },

  formatDetection: { telephone: true, address: true, email: true },

  // ✅ تحقق ملكية الموقع من Google Search Console
  verification: {
    google: "h76rf_kHvTkGfk9555FJHDcUsRzGri8qgwrGrYlYtqI",
  },

  alternates: {
    canonical: SITE_URL,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: { icon: "/favicon.ico" },
};

/** البيانات المنظمة — تساعد جوجل على فهم أن "نيترو قيمز" = NITRO GAMES = متجر */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Store",
      "@id": `${SITE_URL}/#store`,
      name: [
        { "@language": "ar", "@value": STORE_NAME_AR },
        { "@language": "en", "@value": STORE_NAME_EN },
      ],
      alternateName: [STORE_NAME_AR, STORE_NAME_EN, "NitroGames", "نيترو قيمز"],
      url: SITE_URL,
      image: `${SITE_URL}/images/deep-space-nebula.jpg`,
      description,
      telephone: `+${WHATSAPP}`,
      priceRange: "₪₪",
      currenciesAccepted: "ILS",
      paymentAccepted: "Cash on Delivery, JawwalPay, PalPay",
      address: {
        "@type": "PostalAddress",
        addressCountry: "PS",
        addressRegion: "فلسطين",
      },
      areaServed: [
        { "@type": "Country", name: "فلسطين" },
        { "@type": "Place", name: "الضفة الغربية" },
        { "@type": "Place", name: "القدس" },
        { "@type": "Place", name: "الداخل المحتل 48" },
      ],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "10:00",
          closes: "23:00",
        },
      ],
      makesOffer: [
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "كيبورد" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "ماوس" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "ماوس باد" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "مايك" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "سماعات" } },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "NITRO GAMES — نيترو قيمز",
      inLanguage: "ar",
      publisher: { "@id": `${SITE_URL}/#store` },
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className="dark">
      <head>
        {/* ✅ تحقق ملكية الموقع من Google Search Console */}
        <meta
          name="google-site-verification"
          content="h76rf_kHvTkGfk9555FJHDcUsRzGri8qgwrGrYlYtqI"
        />
        <meta name="theme-color" content="#00a3ff" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&family=Tajawal:wght@400;500;700;800;900&family=Michroma&family=Chakra+Petch:wght@600;700&family=Orbitron:wght@600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* البيانات المنظمة لجوجل */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#05070d] text-gray-100 antialiased selection:bg-[#00a3ff] selection:text-black font-['Tajawal','Cairo',sans-serif]">
        {children}
      </body>
    </html>
  );
}
