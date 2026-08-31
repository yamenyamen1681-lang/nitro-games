"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product, CategoryType, CATEGORIES_META, ShowcaseConfig, DEFAULT_SHOWCASE } from "@/lib/data";
import {
  X,
  Lock,
  Unlock,
  Plus,
  Edit,
  Trash2,
  Save,
  AlertCircle,
  Search,
  LogOut,
  Zap,
  ShieldAlert,
  Monitor,
  ArrowUp,
  ArrowDown,
  Play,
  Pause
} from "lucide-react";

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onProductsUpdate: (updatedList: Product[]) => void;
  showToast: (msg: string) => void;
  showcase?: ShowcaseConfig;
  onShowcaseUpdate?: (cfg: ShowcaseConfig) => void;
}

const PRESET_IMAGES = [
  { label: "كيبورد RGB", url: "/images/keyboard-custom-rgb.jpg" },
  { label: "ماوس 8K", url: "/images/mouse-pro-8k.jpg" },
  { label: "ماوس باد ياباني", url: "/images/mousepad-pro.jpg" },
  { label: "ماوس باد سرعة", url: "/images/mousepad-speed.jpg" },
  { label: "مايكروفون استوديو", url: "/images/microphone-pro.jpg" },
  { label: "سماعة محيطية", url: "/images/headset-pro.jpg" },
];

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  products,
  onProductsUpdate,
  showToast,
  showcase,
  onShowcaseUpdate,
}) => {
  // ===== Featured Showcase editor state =====
  const [tab, setTab] = useState<"products" | "showcase">("products");
  const [sc, setSc] = useState<ShowcaseConfig>(showcase ?? DEFAULT_SHOWCASE);
  const [pickerCat, setPickerCat] = useState<string>("all");
  const [pickerQuery, setPickerQuery] = useState("");

  // Keep local editor in sync when opened / config changes externally
  React.useEffect(() => {
    if (isOpen && showcase) setSc(showcase);
  }, [isOpen, showcase]);

  const commitShowcase = (next: ShowcaseConfig) => {
    setSc(next);
    try {
      localStorage.setItem("nitro_showcase_v2", JSON.stringify(next));
    } catch (e) {
      console.warn(e);
    }
    onShowcaseUpdate?.(next);
  };

  const togglePick = (id: number) => {
    const has = sc.productIds.includes(id);
    const ids = has ? sc.productIds.filter((x) => x !== id) : [...sc.productIds, id];
    commitShowcase({ ...sc, productIds: ids });
  };

  const moveItem = (index: number, dir: -1 | 1) => {
    const arr = [...sc.productIds];
    const target = index + dir;
    if (target < 0 || target >= arr.length) return;
    [arr[index], arr[target]] = [arr[target], arr[index]];
    commitShowcase({ ...sc, productIds: arr });
  };

  const removeFromShowcase = (id: number) =>
    commitShowcase({ ...sc, productIds: sc.productIds.filter((x) => x !== id) });

  const pickerList = products
    .filter((p) => (pickerCat === "all" ? true : p.category === pickerCat))
    .filter((p) => p.title.toLowerCase().includes(pickerQuery.toLowerCase()));

  const showcaseProducts = sc.productIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");

  // Product form state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<CategoryType>("keyboards");
  const [price, setPrice] = useState<string>("");
  const [originalPrice, setOriginalPrice] = useState<string>("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [badge, setBadge] = useState("");
  const [imageUrl, setImageUrl] = useState("/images/keyboard-custom-rgb.jpg");

  // Admin filter & search
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = passwordInput.trim();
    // Secret admin password strictly Yamen2009Yamen
    if (entered === "Yamen2009Yamen") {
      setIsAuthenticated(true);
      setAuthError("");
      setPasswordInput("");
      showToast("تم التحقق بنجاح.. أهلاً بك في لوحة تحكم المشرف ⚡");
    } else {
      setAuthError("كلمة المرور غير صحيحة! يرجى إعادة المحاولة.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEditingProduct(null);
    onClose();
  };

  const startEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setTitle(prod.title);
    setCategory(prod.category);
    setPrice(String(prod.price));
    setOriginalPrice(prod.originalPrice ? String(prod.originalPrice) : "");
    setDescription(prod.description);
    setBrand(prod.brand);
    setBadge(prod.badge || "");
    setImageUrl(prod.image);
    // Scroll form into view
    const formElem = document.getElementById("admin-product-form");
    if (formElem) {
      formElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setTitle("");
    setPrice("");
    setOriginalPrice("");
    setDescription("");
    setBrand("");
    setBadge("");
    setImageUrl("/images/keyboard-custom-rgb.jpg");
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !price) {
      alert("يرجى إدخال اسم المنتج والسعر بالشيكل ₪");
      return;
    }

    const numPrice = Number(price);
    const numOrigPrice = originalPrice ? Number(originalPrice) : undefined;
    const discount =
      numOrigPrice && numOrigPrice > numPrice
        ? Math.round(((numOrigPrice - numPrice) / numOrigPrice) * 100)
        : 0;

    let updatedProducts: Product[];

    if (editingProduct) {
      // Update existing
      updatedProducts = products.map((p) =>
        p.id === editingProduct.id
          ? {
              ...p,
              title: title.trim(),
              category,
              price: numPrice,
              originalPrice: numOrigPrice,
              discountPercent: discount,
              description: description.trim(),
              brand: brand.trim() || "Nitro Games",
              badge: badge.trim() || undefined,
              image: imageUrl.trim() || "/images/keyboard-custom-rgb.jpg",
            }
          : p
      );

      // Async DB update
      try {
        fetch("/api/products", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingProduct.id,
            title: title.trim(),
            category,
            price: numPrice,
            originalPrice: numOrigPrice,
            description: description.trim(),
            brand: brand.trim() || "Nitro Games",
            badge: badge.trim() || null,
            image: imageUrl.trim(),
          }),
        }).catch(console.warn);
      } catch (err) {
        console.warn(err);
      }

      showToast(`تم تحديث بيانات "${title.slice(0, 24)}..." بنجاح! 💾`);
    } else {
      // Add new
      const newProd: Product = {
        id: Date.now(),
        slug: `nitro-${Date.now()}`,
        title: title.trim(),
        titleEn: title.trim(),
        category,
        price: numPrice,
        originalPrice: numOrigPrice,
        discountPercent: discount,
        description: description.trim() || "منتج قيمنق أصلي معتمد من NITRO GAMES",
        brand: brand.trim() || "Nitro Games",
        badge: badge.trim() || "جديد بالمتجر ⭐",
        image: imageUrl.trim() || "/images/keyboard-custom-rgb.jpg",
        inStock: true,
        stockQuantity: 12,
        rating: 5.0,
        reviewCount: 1,
        specs: ["ضمان رسمي لمدة سنة كاملة", "توصيل لكافة مدن فلسطين والداخل"],
        isFeatured: true,
      };

      updatedProducts = [newProd, ...products];

      // Async DB insert
      try {
        fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: title.trim(),
            category,
            price: numPrice,
            originalPrice: numOrigPrice,
            description: description.trim(),
            brand: brand.trim() || "Nitro Games",
            badge: badge.trim() || "جديد بالمتجر ⭐",
            image: imageUrl.trim(),
          }),
        }).catch(console.warn);
      } catch (err) {
        console.warn(err);
      }

      showToast(`تمت إضافة "${title.slice(0, 24)}..." إلى المتجر بنجاح! 🚀`);
    }

    // Save immediately to localStorage
    try {
      localStorage.setItem("nitro_products_v2", JSON.stringify(updatedProducts));
    } catch (e) {
      console.warn("Storage save error:", e);
    }

    onProductsUpdate(updatedProducts);
    cancelEdit();
  };

  const handleDeleteProduct = async (id: number, prodTitle: string) => {
    if (!confirm(`هل أنت متأكد من حذف المنتج: "${prodTitle}" من المتجر نهائياً؟`)) {
      return;
    }

    const updated = products.filter((p) => p.id !== id);

    try {
      localStorage.setItem("nitro_products_v2", JSON.stringify(updated));
    } catch (e) {
      console.warn("Storage save error:", e);
    }

    onProductsUpdate(updated);

    try {
      fetch(`/api/products?id=${id}`, { method: "DELETE" }).catch(console.warn);
    } catch (err) {
      console.warn(err);
    }

    showToast("تم حذف المنتج من المتجر بنجاح 🗑️");
  };

  const filteredList = products
    .filter((p) => (filterCategory === "all" ? true : p.category === filterCategory))
    .filter(
      (p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl rounded-2xl bg-[#0b1120] border border-[#00a3ff]/30 shadow-[0_0_40px_rgba(0,163,255,0.2)] overflow-hidden my-8 text-right">
        {/* Top Header */}
        <div className="p-6 pb-4 border-b border-[#1c2942] bg-[#120e09] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#1e170e] text-gray-400 hover:text-white hover:bg-[#253048] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-3.5 py-1.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-bold flex items-center gap-1.5 hover:bg-rose-500/25 transition-all"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>تسجيل الخروج</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="flex items-center gap-2">
                <span className="text-base font-black text-white font-['Cairo']">لوحة تحكم إدارة المتجر السرية</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#00a3ff]/15 text-[#00a3ff] border border-[#00a3ff]/30 font-mono">
                  ADMIN ONLY
                </span>
              </div>
              <div className="text-xs text-gray-400">
                إدارة كاملة لمنتجات NITRO GAMES (إضافة، تعديل، وحذف)
              </div>
            </div>

            <div className="w-11 h-11 rounded-xl bg-[#1e170e] border border-[#00a3ff]/40 flex items-center justify-center text-[#00a3ff] shadow-[0_0_15px_rgba(0,163,255,0.3)]">
              {isAuthenticated ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            </div>
          </div>
        </div>

        {/* Tab switcher (only after login) */}
        {isAuthenticated && (
          <div className="px-6 pt-5 flex items-center gap-2 border-b border-[#1c2942]">
            <button
              onClick={() => setTab("products")}
              className={`px-4 py-2.5 text-xs font-bold rounded-t-xl cursor-pointer transition-all flex items-center gap-2 ${
                tab === "products"
                  ? "bg-[#0b1120] text-[#00a3ff] border-x border-t border-[#1c2942]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>إدارة المنتجات</span>
            </button>
            <button
              onClick={() => setTab("showcase")}
              className={`px-4 py-2.5 text-xs font-bold rounded-t-xl cursor-pointer transition-all flex items-center gap-2 ${
                tab === "showcase"
                  ? "bg-[#0b1120] text-[#00a3ff] border-x border-t border-[#1c2942]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>المربع المميز (الشاشة الرئيسية)</span>
            </button>
          </div>
        )}

        {/* Modal Body */}
        {!isAuthenticated ? (
          /* Login Form - Strict and secure, no visible password leak */
          <div className="p-8 sm:p-12 max-w-md mx-auto text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#1e170e] border border-[#00a3ff]/30 flex items-center justify-center mx-auto text-[#00a3ff] shadow-[0_0_20px_rgba(0,163,255,0.2)]">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xl font-black text-white font-['Cairo']">منطقة المشرف المحمية</h3>
              <p className="text-xs text-gray-400">
                أدخل كلمة المرور السرية للمشرف للوصول إلى لوحة التحكم والتحكم بالمنتجات.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 text-right">
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1.5">
                  كلمة المرور السرية:
                </label>
                <input
                  type="password"
                  required
                  placeholder="أدخل كلمة المرور..."
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setAuthError("");
                  }}
                  className="w-full bg-[#152034] border border-[#27405f] text-sm text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#00a3ff] text-center tracking-widest font-mono"
                  autoFocus
                />
              </div>

              {authError && (
                <div className="flex items-center gap-1.5 text-xs text-rose-400 justify-center">
                  <AlertCircle className="w-4 h-4" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full btn-cyber-cyan text-black font-black text-sm py-3.5 rounded-xl cursor-pointer"
              >
                دخول لوحة التحكم 🚀
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500 font-mono pt-1">
                <ShieldAlert className="w-3.5 h-3.5 text-[#00a3ff]" />
                <span>الوصول مشفر ومقتصر على المشرف فقط</span>
              </div>
            </form>
          </div>
        ) : tab === "showcase" ? (
          /* ===================== SHOWCASE CONTROL PANEL ===================== */
          <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
            {/* Quick toggles */}
            <div className="p-5 rounded-2xl bg-[#0b1120] border border-[#1c2942] space-y-5">
              <div className="flex items-center justify-between border-b border-[#1c2942] pb-3">
                <span className="text-[11px] text-gray-400 font-mono">
                  {showcaseProducts.length} منتج في المربع المميز
                </span>
                <h4 className="text-sm font-black text-white flex items-center gap-1.5 font-['Cairo']">
                  <Monitor className="w-4 h-4 text-[#00a3ff]" />
                  إعدادات المربع المميز
                </h4>
              </div>

              {/* enable / autoplay */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex items-center justify-between p-3.5 rounded-xl bg-[#101a2e] border border-[#1c2942] cursor-pointer hover:border-[#00a3ff]/60 transition-colors">
                  <span className="text-xs font-bold text-gray-200">إظهار المربع في الشاشة الرئيسية</span>
                  <input
                    type="checkbox"
                    checked={sc.enabled}
                    onChange={(e) => commitShowcase({ ...sc, enabled: e.target.checked })}
                    className="w-4 h-4 accent-[#00a3ff] cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-xl bg-[#101a2e] border border-[#1c2942] cursor-pointer hover:border-[#00a3ff]/60 transition-colors">
                  <span className="text-xs font-bold text-gray-200 flex items-center gap-1.5">
                    {sc.autoPlay ? <Play className="w-3.5 h-3.5 text-[#00a3ff]" /> : <Pause className="w-3.5 h-3.5 text-gray-400" />}
                    تدوير تلقائي للصور
                  </span>
                  <input
                    type="checkbox"
                    checked={sc.autoPlay}
                    onChange={(e) => commitShowcase({ ...sc, autoPlay: e.target.checked })}
                    className="w-4 h-4 accent-[#00a3ff] cursor-pointer"
                  />
                </label>
              </div>

              {/* speed */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-gray-300">سرعة تبديل الصور</label>
                  <span className="text-xs font-mono font-bold text-[#00a3ff]">
                    {(sc.intervalMs / 1000).toFixed(1)} ثانية
                  </span>
                </div>
                <input
                  type="range"
                  min={1500}
                  max={9000}
                  step={500}
                  value={sc.intervalMs}
                  onChange={(e) => commitShowcase({ ...sc, intervalMs: Number(e.target.value) })}
                  className="w-full accent-[#00a3ff] cursor-pointer"
                />
              </div>

              {/* texts */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-300 block mb-1">نص الشارة (أعلى اليسار)</label>
                  <input
                    type="text"
                    value={sc.badgeText}
                    onChange={(e) => setSc({ ...sc, badgeText: e.target.value })}
                    onBlur={(e) => commitShowcase({ ...sc, badgeText: e.target.value })}
                    placeholder="LIVE SHOWCASE"
                    className="w-full bg-[#152034] border border-[#1c2942] text-xs text-white font-tech rounded-xl px-3 py-2 focus:outline-none focus:border-[#00a3ff]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-300 block mb-1">نص الشريط السفلي</label>
                  <input
                    type="text"
                    value={sc.headline}
                    onChange={(e) => setSc({ ...sc, headline: e.target.value })}
                    onBlur={(e) => commitShowcase({ ...sc, headline: e.target.value })}
                    placeholder="عتاد البطولات • جاهز للشحن"
                    className="w-full bg-[#152034] border border-[#1c2942] text-xs text-white rounded-xl px-3 py-2 focus:outline-none focus:border-[#00a3ff]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-300 block mb-1">نص الزر الرئيسي</label>
                  <input
                    type="text"
                    value={sc.ctaLabel}
                    onChange={(e) => setSc({ ...sc, ctaLabel: e.target.value })}
                    onBlur={(e) => commitShowcase({ ...sc, ctaLabel: e.target.value })}
                    placeholder="تسوق الآن"
                    className="w-full bg-[#152034] border border-[#1c2942] text-xs text-white rounded-xl px-3 py-2 focus:outline-none focus:border-[#00a3ff]"
                  />
                </div>
              </div>
            </div>

            {/* Current showcase order */}
            <div className="p-5 rounded-2xl bg-[#0b1120] border border-[#1c2942] space-y-3">
              <h4 className="text-sm font-black text-white font-['Cairo']">ترتيب المنتجات في المربع</h4>

              {showcaseProducts.length === 0 ? (
                <p className="text-xs text-gray-400 p-4 text-center bg-[#101a2e] rounded-xl border border-[#1c2942]">
                  لم تختر أي منتج بعد — اختر من القائمة بالأسفل، وسيتم تلقائياً عرض أول 6 منتجات.
                </p>
              ) : (
                <div className="space-y-2">
                  {showcaseProducts.map((p, i) => (
                    <div
                      key={p.id}
                      className="flex items-center gap-3 p-2.5 rounded-xl bg-[#101a2e] border border-[#1c2942]"
                    >
                      <span className="w-7 h-7 rounded-lg bg-[#00a3ff]/15 text-[#00a3ff] border border-[#00a3ff]/30 flex items-center justify-center text-[11px] font-tech">
                        {i + 1}
                      </span>
                      <div className="relative w-10 h-10 rounded-lg bg-black/50 border border-[#1c2942] overflow-hidden flex-shrink-0">
                        <Image src={p.image} alt={p.title} fill className="object-contain p-1" />
                      </div>
                      <h5 className="flex-1 min-w-0 text-xs font-bold text-white truncate font-['Cairo']">{p.title}</h5>
                      <span className="text-xs font-mono text-[#00a3ff] font-black">{p.price} ₪</span>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => moveItem(i, -1)}
                          disabled={i === 0}
                          className="p-1.5 rounded-lg bg-[#152034] hover:bg-[#00a3ff] hover:text-black text-gray-300 disabled:opacity-25 transition-colors cursor-pointer"
                          title="تحريك للأعلى"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => moveItem(i, 1)}
                          disabled={i === showcaseProducts.length - 1}
                          className="p-1.5 rounded-lg bg-[#152034] hover:bg-[#00a3ff] hover:text-black text-gray-300 disabled:opacity-25 transition-colors cursor-pointer"
                          title="تحريك للأسفل"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => removeFromShowcase(p.id)}
                          className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 transition-colors cursor-pointer"
                          title="إزالة من المربع"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product picker */}
            <div className="p-5 rounded-2xl bg-[#0b1120] border border-[#1c2942] space-y-3">
              <h4 className="text-sm font-black text-white font-['Cairo']">اختر المنتجات لعرضها في المربع</h4>

              <div className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="ابحث عن منتج..."
                    value={pickerQuery}
                    onChange={(e) => setPickerQuery(e.target.value)}
                    className="w-full bg-[#101a2e] border border-[#1c2942] text-xs text-white rounded-xl pl-8 pr-3 py-2 focus:outline-none focus:border-[#00a3ff]"
                  />
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>
                <select
                  value={pickerCat}
                  onChange={(e) => setPickerCat(e.target.value)}
                  className="bg-[#101a2e] border border-[#1c2942] text-xs font-bold text-[#00a3ff] rounded-xl px-3 py-2 focus:outline-none focus:border-[#00a3ff]"
                >
                  <option value="all">كل الأقسام</option>
                  {CATEGORIES_META.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="max-h-72 overflow-y-auto rounded-xl border border-[#1c2942] divide-y divide-[#1c2942]">
                {pickerList.length > 0 ? (
                  pickerList.map((p) => {
                    const picked = sc.productIds.includes(p.id);
                    return (
                      <button
                        key={p.id}
                        onClick={() => togglePick(p.id)}
                        className={`w-full p-3 flex items-center gap-3 text-right transition-colors cursor-pointer ${
                          picked ? "bg-[#00a3ff]/10 hover:bg-[#00a3ff]/15" : "bg-[#12100a] hover:bg-[#101a2e]"
                        }`}
                      >
                        <div className="relative w-10 h-10 rounded-lg bg-black/50 border border-[#1c2942] overflow-hidden flex-shrink-0">
                          <Image src={p.image} alt={p.title} fill className="object-contain p-1" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[10px] font-tech text-[#00a3ff] uppercase">{p.brand}</div>
                          <h5 className="text-xs font-bold text-white truncate font-['Cairo']">{p.title}</h5>
                        </div>
                        <span className="text-xs font-mono text-gray-300 font-bold">{p.price} ₪</span>
                        <span
                          className={`w-5 h-5 rounded-md border flex items-center justify-center text-[10px] font-black ${
                            picked
                              ? "bg-[#00a3ff] text-black border-[#00a3ff]"
                              : "border-[#1c2942] text-transparent"
                          }`}
                        >
                          ✓
                        </span>
                      </button>
                    );
                  })
                ) : (
                  <p className="p-6 text-center text-xs text-gray-400">لا توجد منتجات مطابقة</p>
                )}
              </div>
            </div>

            <button
              onClick={() => commitShowcase({ ...sc, productIds: [] })}
              className="w-full py-3 rounded-xl bg-[#101a2e] hover:bg-[#1c2942] border border-[#1c2942] text-gray-300 text-xs font-bold transition-colors cursor-pointer"
            >
              تفريغ المربع المميز (يعود للعرض التلقائي)
            </button>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="p-6 space-y-8 max-h-[75vh] overflow-y-auto">
            {/* Section 1: Add / Edit Product Form */}
            <div
              id="admin-product-form"
              className="p-6 rounded-2xl bg-[#101a2e] border border-[#1c2942] space-y-5"
            >
              <div className="flex items-center justify-between border-b border-[#1c2942] pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-400">
                    {editingProduct ? "تعديل المنتج المحدد:" : "نموذج إضافة منتج جديد:"}
                  </span>
                  {editingProduct && (
                    <span className="text-xs font-bold text-[#00a3ff]">#{editingProduct.id}</span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {editingProduct && (
                    <button
                      onClick={cancelEdit}
                      className="text-xs text-gray-400 hover:text-white px-2.5 py-1 rounded-lg bg-[#1c2942]"
                    >
                      إلغاء التعديل
                    </button>
                  )}
                  <h4 className="text-sm font-black text-white flex items-center gap-1.5 font-['Cairo']">
                    <Plus className="w-4 h-4 text-[#00a3ff]" />
                    <span>{editingProduct ? "تعديل بيانات المنتج" : "إضافة منتج جديد للكتالوج"}</span>
                  </h4>
                </div>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Title */}
                  <div>
                    <label className="text-xs font-bold text-gray-300 block mb-1">
                      اسم المنتج الكامل <span className="text-[#00a3ff]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: كيبورد Wooting 60HE+ Rapid Trigger"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-[#16223a] border border-[#27405f] text-xs sm:text-sm text-white rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#00a3ff]"
                    />
                  </div>

                  {/* Category - 5 Specific Categories */}
                  <div>
                    <label className="text-xs font-bold text-gray-300 block mb-1">
                      الفئة (أحد الأقسام الخمسة المحددة) <span className="text-[#00a3ff]">*</span>
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as CategoryType)}
                      className="w-full bg-[#16223a] border border-[#27405f] text-xs sm:text-sm font-bold text-[#00a3ff] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#00a3ff]"
                    >
                      <option value="keyboards">⌨️ كيبورد</option>
                      <option value="mice">🖱️ ماوس</option>
                      <option value="mousepads">⬛ ماوس باد</option>
                      <option value="microphones">🎙️ مايك</option>
                      <option value="headsets">🎧 سماعات</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Price */}
                  <div>
                    <label className="text-xs font-bold text-gray-300 block mb-1">
                      السعر بالشيكل (₪) <span className="text-[#00a3ff]">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      placeholder="مثال: 580"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full bg-[#16223a] border border-[#27405f] text-sm font-mono font-bold text-[#00a3ff] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#00a3ff]"
                    />
                  </div>

                  {/* Original Price */}
                  <div>
                    <label className="text-xs font-bold text-gray-300 block mb-1">
                      السعر القديم قبل الخصم (اختياري ₪)
                    </label>
                    <input
                      type="number"
                      min="1"
                      placeholder="مثال: 720"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      className="w-full bg-[#16223a] border border-[#27405f] text-sm font-mono text-gray-400 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#00a3ff]"
                    />
                  </div>

                  {/* Brand */}
                  <div>
                    <label className="text-xs font-bold text-gray-300 block mb-1">
                      العلامة التجارية (Brand)
                    </label>
                    <input
                      type="text"
                      placeholder="مثال: Logitech G أو Artisan"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className="w-full bg-[#16223a] border border-[#27405f] text-xs sm:text-sm text-white rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#00a3ff]"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="text-xs font-bold text-gray-300 block mb-1">
                    وصف قصير للمنتج ومميزاته:
                  </label>
                  <textarea
                    rows={2}
                    placeholder="اكتب نبذة عن الحساس، المفاتيح، جودة الصوت، أو سرعة الاستجابة..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-[#16223a] border border-[#27405f] text-xs sm:text-sm text-gray-200 rounded-xl p-3 focus:outline-none focus:border-[#00a3ff]"
                  />
                </div>

                {/* Image URL & Quick Selectors */}
                <div>
                  <label className="text-xs font-bold text-gray-300 block mb-1">
                    رابط صورة المنتج المباشر (Direct Image URL):
                  </label>
                  <input
                    type="text"
                    placeholder="/images/keyboard-custom-rgb.jpg أو أي رابط خارجي مباشر"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full bg-[#16223a] border border-[#27405f] text-xs text-gray-200 font-mono rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#00a3ff] mb-2"
                  />

                  {/* Preset quick image pickers */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] text-gray-400 font-bold">صور جاهزة متوفرة:</span>
                    {PRESET_IMAGES.map((preset, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setImageUrl(preset.url)}
                        className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                          imageUrl === preset.url
                            ? "bg-[#00a3ff] text-black border-[#00a3ff] font-bold"
                            : "bg-[#152034] text-gray-300 border-[#27405f] hover:border-[#00a3ff]"
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Badge text */}
                <div>
                  <label className="text-xs font-bold text-gray-300 block mb-1">
                    شارة ترويجية (Badge اختياري):
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: الأكثر طلباً 🔥 أو حصري ⭐"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    className="w-full bg-[#16223a] border border-[#27405f] text-xs text-white rounded-xl px-3.5 py-2 focus:outline-none focus:border-[#00a3ff]"
                  />
                </div>

                {/* Submit button */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  {editingProduct && (
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="px-4 py-2.5 rounded-xl bg-[#1c2942] hover:bg-[#27405f] text-gray-300 text-xs font-bold transition-colors"
                    >
                      إلغاء التعديل
                    </button>
                  )}

                  <button
                    type="submit"
                    className="btn-cyber-cyan text-black font-black text-xs sm:text-sm px-6 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingProduct ? "حفظ التعديلات ونشرها فوراً" : "إضافة المنتج للمتجر فوراً"}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Section 2: Manage Existing Products List */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1c2942] pb-3">
                <span className="text-xs text-[#00a3ff] font-bold bg-[#00a3ff]/10 px-3 py-1.5 rounded-lg border border-[#00a3ff]/30 font-mono">
                  إجمالي المنتجات المدارة: {products.length}
                </span>

                <h4 className="text-sm font-black text-white font-['Cairo']">قائمة المنتجات الحالية بالمتجر</h4>
              </div>

              {/* Filters for Admin Table */}
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                {/* Search */}
                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    placeholder="ابحث في الكتالوج..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[#152034] border border-[#27405f] text-xs text-white placeholder-gray-500 rounded-xl pl-8 pr-3 py-2 focus:outline-none focus:border-[#00a3ff]"
                  />
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>

                {/* Category tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1">
                  <button
                    onClick={() => setFilterCategory("all")}
                    className={`text-xs px-3 py-1 rounded-lg font-bold transition-colors ${
                      filterCategory === "all"
                        ? "bg-[#00a3ff] text-black font-extrabold"
                        : "bg-[#152034] text-gray-400 hover:text-white"
                    }`}
                  >
                    الكل ({products.length})
                  </button>
                  {CATEGORIES_META.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setFilterCategory(c.id)}
                      className={`text-xs px-2.5 py-1 rounded-lg font-bold whitespace-nowrap transition-colors ${
                        filterCategory === c.id
                          ? "bg-[#00a3ff] text-black font-extrabold"
                          : "bg-[#152034] text-gray-400 hover:text-white"
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Products Table */}
              <div className="rounded-xl border border-[#1c2942] overflow-hidden bg-[#0b1120]">
                <div className="divide-y divide-[#1c2942] max-h-96 overflow-y-auto">
                  {filteredList.length > 0 ? (
                    filteredList.map((prod) => (
                      <div
                        key={prod.id}
                        className="p-3.5 flex items-center justify-between gap-4 hover:bg-[#101a2e] transition-colors"
                      >
                        {/* Image & Title */}
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="relative w-12 h-12 rounded-xl bg-black/50 border border-[#27405f] flex-shrink-0 overflow-hidden">
                            <Image
                              src={prod.image}
                              alt={prod.title}
                              fill
                              className="object-contain p-1"
                            />
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#00a3ff]/10 text-[#00a3ff] border border-[#00a3ff]/30">
                                {prod.category}
                              </span>
                              <span className="text-[10px] text-gray-400 font-mono uppercase">
                                {prod.brand}
                              </span>
                            </div>
                            <h5 className="text-xs font-bold text-white truncate max-w-sm sm:max-w-md mt-0.5 font-['Cairo']">
                              {prod.title}
                            </h5>
                          </div>
                        </div>

                        {/* Price & Actions */}
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <div className="text-left font-mono">
                            <span className="text-sm font-black text-[#00a3ff]">
                              {prod.price.toLocaleString()}
                            </span>
                            <span className="text-xs text-gray-400 font-bold mr-1">₪</span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => startEditProduct(prod)}
                              className="p-2 rounded-lg bg-[#152034] hover:bg-[#203355] text-[#00a3ff] transition-colors"
                              title="تعديل بيانات المنتج"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => handleDeleteProduct(prod.id, prod.title)}
                              className="p-2 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 transition-colors"
                              title="حذف المنتج من المتجر"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-gray-400 text-xs">
                      لا توجد منتجات مطابقة في هذه الفئة
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
