"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Product } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import { Flame, ShoppingBag } from "lucide-react";

interface DealsSectionProps {
  products: Product[];
}

export const DealsSection: React.FC<DealsSectionProps> = ({ products }) => {
  const { addToCart, setQuickViewProduct } = useCart();

  // Flash Sale Countdown Timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 18,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Pick top discounted items
  const dealProducts = products
    .filter((p) => p.discountPercent && p.discountPercent >= 15)
    .slice(0, 4);

  if (dealProducts.length === 0) return null;

  return (
    <section id="deals" className="py-14 relative overflow-hidden bg-[#080d18] border-y border-[#1c2942]">
      {/* Background Cyberpunk Glows */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#00a3ff]/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-[#00e5ff]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Banner Header with Digital Timer HUD */}
        <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-[#0b1120] via-[#162034] to-[#0b1120] border border-[#1c2942] mb-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          {/* Neon rim line */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#00a3ff] via-[#00e5ff] to-transparent animate-pulse" />

          <div className="space-y-2 text-right">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00e5ff]/15 border border-[#00e5ff]/40 text-[#00e5ff] text-xs font-black uppercase shadow-sm">
              <Flame className="w-4 h-4 text-[#00e5ff] animate-pulse" />
              <span>عروض الفلاش الأسبوعية • خصومات حصرية لفترة محدودة</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-['Cairo']">
              وفر حتى <span className="text-[#00a3ff] font-mono drop-shadow-[0_0_12px_#00a3ff]">20%</span> على نخبة عتاد البطولات
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 max-w-xl">
              أسعار خاصة تشمل التوصيل لكافة مدن فلسطين والداخل المحتل مع كفالة سنة كاملة وشحن سريع.
            </p>
          </div>

          {/* Futuristic Countdown Clock HUD */}
          <div className="flex items-center gap-2.5 bg-[#070b14] p-3.5 rounded-2xl border border-[#1c2942] shadow-inner">
            <div className="text-center px-3.5 py-2 bg-[#0b1120] rounded-xl min-w-[58px] border border-[#1c2942]">
              <div className="text-xl sm:text-2xl font-black text-white font-mono">
                {String(timeLeft.hours).padStart(2, "0")}
              </div>
              <div className="text-[10px] text-gray-400 font-bold">ساعة</div>
            </div>

            <span className="text-xl font-bold text-[#00e5ff] animate-pulse">:</span>

            <div className="text-center px-3.5 py-2 bg-[#0b1120] rounded-xl min-w-[58px] border border-[#1c2942]">
              <div className="text-xl sm:text-2xl font-black text-white font-mono">
                {String(timeLeft.minutes).padStart(2, "0")}
              </div>
              <div className="text-[10px] text-gray-400 font-bold">دقيقة</div>
            </div>

            <span className="text-xl font-bold text-[#00a3ff] animate-pulse">:</span>

            <div className="text-center px-3.5 py-2 bg-[#0b1120] rounded-xl min-w-[58px] border border-[#00a3ff]/30 shadow-[0_0_10px_rgba(0,163,255,0.2)]">
              <div className="text-xl sm:text-2xl font-black text-[#00a3ff] font-mono">
                {String(timeLeft.seconds).padStart(2, "0")}
              </div>
              <div className="text-[10px] text-[#00a3ff] font-bold">ثانية</div>
            </div>
          </div>
        </div>

        {/* Deals Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {dealProducts.map((product) => (
            <div
              key={product.id}
              className="group rounded-xl bg-[#0b1120] border border-[#1c2942] hover:border-[#00a3ff] transition-all duration-250 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden shadow-xl"
            >
              <div className="relative p-3.5 pb-0 flex items-center justify-between z-10">
                <span className="bg-[#00e5ff] text-white text-xs font-black px-2.5 py-0.5 rounded flex items-center gap-1 shadow-md">
                  <Flame className="w-3.5 h-3.5" />
                  <span>خصم {product.discountPercent}%</span>
                </span>
                <span className="text-[10px] font-bold text-gray-400 bg-black/60 px-2 py-0.5 rounded font-mono">
                  متبقي {product.stockQuantity} قطع
                </span>
              </div>

              {/* Image */}
              <div
                className="relative h-48 w-full p-4 cursor-pointer flex items-center justify-center bg-[#101a2e]"
                onClick={() => setQuickViewProduct(product)}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain transform group-hover:scale-108 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Body */}
              <div className="p-4 pt-2 flex flex-col justify-between flex-grow text-right space-y-3">
                <div>
                  <div className="text-[10px] font-bold text-[#00a3ff] font-mono uppercase">
                    {product.brand}
                  </div>
                  <h3
                    onClick={() => setQuickViewProduct(product)}
                    className="text-xs sm:text-sm font-bold text-white line-clamp-2 hover:text-[#00a3ff] transition-colors cursor-pointer leading-snug mt-1 font-['Cairo']"
                  >
                    {product.title}
                  </h3>

                  {/* Stock bar */}
                  <div className="mt-3 space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-gray-400 font-bold">
                      <span>إقبال مرتفع</span>
                      <span className="text-[#00a3ff] font-mono">80% محجوز</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#1e273c] overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#00e5ff] to-[#00a3ff] w-[80%]" />
                    </div>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="pt-3 border-t border-[#1c2942] flex items-center justify-between">
                  <div>
                    {product.originalPrice && (
                      <div className="text-xs text-gray-500 line-through font-mono">
                        {product.originalPrice.toLocaleString()} ₪
                      </div>
                    )}
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-black text-white font-mono">
                        {product.price.toLocaleString()}
                      </span>
                      <span className="text-xs font-bold text-[#00a3ff]">₪</span>
                    </div>
                  </div>

                  <button
                    onClick={() => addToCart(product, 1)}
                    className="btn-cyber-cyan text-black font-black text-xs px-3.5 py-2.5 rounded-lg flex items-center gap-1.5 transition-all shadow-md cursor-pointer hover:scale-105"
                    title="اغتنم العرض الآن"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>اغتنم العرض</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
