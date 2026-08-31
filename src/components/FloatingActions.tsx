"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, ArrowUp } from "lucide-react";
import { STORE_CONTACT } from "@/lib/data";

export const FloatingActions: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-5 left-5 z-40 flex flex-col items-center gap-3">
      {/* Back to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-11 h-11 rounded-xl bg-[#0b1120] border border-[#1c2942] hover:border-[#00a3ff] text-gray-300 hover:text-[#00a3ff] flex items-center justify-center shadow-lg transition-all hover:-translate-y-1"
          title="الرجوع للأعلى"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Floating Quick Order WhatsApp Button with STORE_CONTACT */}
      <a
        href={`https://wa.me/${STORE_CONTACT.whatsapp}?text=${encodeURIComponent(
          "مرحباً NITRO GAMES، أود الاستفسار وطلب استشارة لعتاد الألعاب المتوفر لديكم."
        )}`}
        target="_blank"
        rel="noreferrer"
        className="relative group w-14 h-14 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-black flex items-center justify-center shadow-[0_8px_25px_rgba(37,211,102,0.45)] hover:scale-110 transition-all cursor-pointer"
        title={`دردشة سريعة واستشارة عبر الواتساب: ${STORE_CONTACT.short}`}
      >
        <MessageCircle className="w-7 h-7 fill-black text-black" />

        {/* Pulsing indicator */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#00a3ff]"></span>
        </span>

        {/* Hover Tooltip */}
        <span className="absolute left-16 bg-[#0b1120] text-white border border-[#1c2942] text-xs font-bold px-3.5 py-1.5 rounded-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-2xl">
          دردشة سريعة وطلب استشارة عبر الواتساب 💬
        </span>
      </a>
    </div>
  );
};
