"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { X, ShoppingBag, Heart, Star, ShieldCheck, Truck, Check, MessageCircle } from "lucide-react";
import { STORE_CONTACT } from "@/lib/data";

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, wishlist, toggleWishlist } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const isWishlisted = wishlist.includes(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#0b1120] border border-[#1c2942] shadow-2xl overflow-hidden my-8 text-right">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 left-4 z-20 p-2 rounded-xl bg-black/60 text-gray-400 hover:text-white hover:bg-black transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Column */}
          <div className="relative h-64 md:h-full min-h-[300px] bg-[#101a2e] flex items-center justify-center p-6 border-b md:border-b-0 md:border-l border-[#1c2942]">
            <div className="relative w-full h-full min-h-[220px]">
              <Image
                src={quickViewProduct.image}
                alt={quickViewProduct.title}
                fill
                className="object-contain"
              />
            </div>
            {quickViewProduct.discountPercent && quickViewProduct.discountPercent > 0 ? (
              <span className="absolute top-4 right-4 bg-[#00e5ff] text-white text-xs font-black px-2.5 py-1 rounded shadow-md">
                -{quickViewProduct.discountPercent}%
              </span>
            ) : null}
          </div>

          {/* Details Column */}
          <div className="p-6 flex flex-col justify-between space-y-4">
            <div>
              {/* Brand & Category */}
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-[#00a3ff] font-bold font-mono uppercase tracking-wider">
                  {quickViewProduct.brand}
                </span>
                <span className="text-gray-400 font-medium">
                  {quickViewProduct.category.toUpperCase()}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-base sm:text-lg font-black text-white leading-snug font-['Cairo']">
                {quickViewProduct.title}
              </h2>

              {/* Ratings */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-black mr-1 text-gray-200">
                    {quickViewProduct.rating}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  ({quickViewProduct.reviewCount} تقييم موثق)
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-gray-300 mt-3 leading-relaxed">
                {quickViewProduct.description}
              </p>

              {/* Specs */}
              {quickViewProduct.specs && quickViewProduct.specs.length > 0 && (
                <div className="mt-4 p-3 rounded-xl bg-[#152034] border border-[#27405f] space-y-1.5">
                  <div className="text-[11px] font-bold text-[#00a3ff]">المواصفات الفنية:</div>
                  {quickViewProduct.specs.slice(0, 4).map((s, i) => (
                    <div key={i} className="text-xs text-gray-300 flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#00a3ff] flex-shrink-0" />
                      <span className="truncate">{s}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Badges */}
              <div className="grid grid-cols-2 gap-2 mt-4 text-[11px] text-gray-300">
                <div className="flex items-center gap-1.5 p-2 rounded-lg bg-[#152034] border border-[#27405f]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00e5ff]" />
                  <span>ضمان سنة كاملة ⭐</span>
                </div>
                <div className="flex items-center gap-1.5 p-2 rounded-lg bg-[#152034] border border-[#27405f]">
                  <Truck className="w-3.5 h-3.5 text-[#00a3ff]" />
                  <span>دفع عند الاستلام 🚚</span>
                </div>
              </div>
            </div>

            {/* Price, Quantity and Actions */}
            <div className="pt-4 border-t border-[#1c2942] space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-[11px] text-gray-400">السعر:</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-[#00a3ff] font-mono">
                      {quickViewProduct.price.toLocaleString()}
                    </span>
                    <span className="text-sm font-bold text-white">₪</span>
                    {quickViewProduct.originalPrice && (
                      <span className="text-xs text-gray-500 line-through font-mono mr-2">
                        {quickViewProduct.originalPrice.toLocaleString()} ₪
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity adjuster */}
                <div className="flex items-center gap-2 bg-[#152034] border border-[#27405f] rounded-xl p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 text-gray-300 font-bold"
                  >
                    -
                  </button>
                  <span className="text-sm font-black font-mono w-6 text-center text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 text-gray-300 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAddToCart}
                    className="btn-cyber-cyan flex-1 text-black font-black text-xs py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>أضف إلى السلة</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(quickViewProduct.id)}
                    className={`p-3 rounded-xl border transition-colors ${
                      isWishlisted
                        ? "bg-rose-500/20 text-rose-400 border-rose-500/40"
                        : "bg-[#152034] text-gray-400 border-[#27405f] hover:text-white"
                    }`}
                    title="المفضلة"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? "fill-rose-500" : ""}`} />
                  </button>
                </div>

                <a
                  href={`https://wa.me/${STORE_CONTACT.whatsapp}?text=${encodeURIComponent(
                    `مرحباً NITRO GAMES 🎮 أود الاستفسار والطلب المباشر لهذا المنتج:\n\n*${quickViewProduct.title}*\nالسعر: ${quickViewProduct.price} ₪\nالكمية: ${quantity}\nمع كفالة سنة وتوصيل سريع.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-black text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>طلب مباشر وسريع عبر الواتساب: {STORE_CONTACT.short}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
