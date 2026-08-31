import type { MetadataRoute } from "next";

/**
 * 🔗 ضع رابط موقعك الحقيقي هنا (أو عبر متغير البيئة NEXT_PUBLIC_SITE_URL)
 * مثال: "https://nitrogames.ps"
 */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nitro-games.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    // الأقسام الخمسة — تُفهرس كمراسي داخل الصفحة الرئيسية
    ...(
      [
        ["#products", "0.9"],
        ["#categories", "0.8"],
        ["#deals", "0.8"],
        ["#reviews", "0.6"],
      ] as const
    ).map(([hash, priority]) => ({
      url: `${SITE_URL}/${hash}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: Number(priority),
    })),
  ];
}
