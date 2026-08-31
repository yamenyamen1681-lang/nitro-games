import { pgTable, serial, text, integer, boolean, timestamp, jsonb, real } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  titleEn: text("title_en").notNull(),
  brand: text("brand").notNull(),
  category: text("category").notNull(),
  price: integer("price").notNull(),
  originalPrice: integer("original_price"),
  discountPercent: integer("discount_percent").default(0),
  image: text("image").notNull(),
  inStock: boolean("in_stock").default(true).notNull(),
  stockQuantity: integer("stock_quantity").default(15).notNull(),
  rating: real("rating").default(5.0).notNull(),
  reviewCount: integer("review_count").default(24).notNull(),
  badge: text("badge"),
  description: text("description").notNull(),
  specs: jsonb("specs").$type<string[]>(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  isBuild: boolean("is_build").default(false).notNull(),
  buildTier: text("build_tier"),
  fpsEstimates: jsonb("fps_estimates").$type<Record<string, string>>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: text("order_number").notNull().unique(),
  customerName: text("customer_name").notNull(),
  customerPhone: text("customer_phone").notNull(),
  customerEmail: text("customer_email"),
  city: text("city").notNull(),
  address: text("address").notNull(),
  notes: text("notes"),
  paymentMethod: text("payment_method").notNull(),
  items: jsonb("items").$type<{
    id: number;
    title: string;
    price: number;
    quantity: number;
    image: string;
  }[]>().notNull(),
  subtotal: integer("subtotal").notNull(),
  discount: integer("discount").default(0).notNull(),
  deliveryFee: integer("delivery_fee").notNull(),
  total: integer("total").notNull(),
  status: text("status").default("قيد التجهيز").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  productId: integer("product_id"),
  author: text("author").notNull(),
  city: text("city").notNull(),
  rating: integer("rating").default(5).notNull(),
  comment: text("comment").notNull(),
  verifiedPurchase: boolean("verified_purchase").default(true).notNull(),
  itemBought: text("item_bought"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const newsletter = pgTable("newsletter", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  discountCode: text("discount_code").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* ============================================================
   تهيئة قاعدة البيانات تلقائياً (Auto-Migration)
   مدمجة هنا حتى لا تحتاج ملفاً منفصلاً.
   تُنشئ الجداول والفهارس لو غير موجودة — آمنة للتشغيل المتكرر.
   ============================================================ */
import { pool } from "./index";

let dbReady = false;
let readyPromise: Promise<boolean> | null = null;

const DDL = `
  CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    title_en TEXT NOT NULL,
    brand TEXT NOT NULL,
    category TEXT NOT NULL,
    price INTEGER NOT NULL,
    original_price INTEGER,
    discount_percent INTEGER DEFAULT 0,
    image TEXT NOT NULL,
    in_stock BOOLEAN NOT NULL DEFAULT true,
    stock_quantity INTEGER NOT NULL DEFAULT 15,
    rating REAL NOT NULL DEFAULT 5.0,
    review_count INTEGER NOT NULL DEFAULT 24,
    badge TEXT,
    description TEXT NOT NULL,
    specs JSONB,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    is_build BOOLEAN NOT NULL DEFAULT false,
    build_tier TEXT,
    fps_estimates JSONB,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    order_number TEXT NOT NULL UNIQUE,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT,
    city TEXT NOT NULL,
    address TEXT NOT NULL,
    notes TEXT,
    payment_method TEXT NOT NULL,
    items JSONB NOT NULL,
    subtotal INTEGER NOT NULL,
    discount INTEGER NOT NULL DEFAULT 0,
    delivery_fee INTEGER NOT NULL,
    total INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'قيد التجهيز',
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    product_id INTEGER,
    author TEXT NOT NULL,
    city TEXT NOT NULL,
    rating INTEGER NOT NULL DEFAULT 5,
    comment TEXT NOT NULL,
    verified_purchase BOOLEAN NOT NULL DEFAULT true,
    item_bought TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS newsletter (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    discount_code TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
  );

  CREATE INDEX IF NOT EXISTS idx_products_category  ON products(category);
  CREATE INDEX IF NOT EXISTS idx_products_featured  ON products(is_featured);
  CREATE INDEX IF NOT EXISTS idx_orders_created     ON orders(created_at DESC);
  CREATE INDEX IF NOT EXISTS idx_reviews_created    ON reviews(created_at DESC);
`;

/**
 * تُنشئ الجداول لو غير موجودة.
 * تُنفّذ مرة واحدة فقط لكل عملية تشغيل (Serverless-safe).
 * لو فشلت، يكمل الموقع بالاعتماد على localStorage بدون انهيار.
 */
export async function ensureDbReady(): Promise<boolean> {
  if (dbReady) return true;
  if (readyPromise) return readyPromise;

  readyPromise = (async () => {
    const client = await pool.connect();
    try {
      await client.query(DDL);
      dbReady = true;
      return true;
    } catch (err) {
      console.warn("DB init skipped (falling back to localStorage):", err);
      readyPromise = null;
      return false;
    } finally {
      client.release();
    }
  })();

  return readyPromise;
}
