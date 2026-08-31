"use client";

import React from "react";
import {STORE_CONTACT, CategoryType} from "@/lib/data";

import {
  Gamepad2,
  ShieldCheck,
  Truck,
  PhoneCall,
  Heart,
  MessageCircle,
  Keyboard,
  Mouse,
  Square,
  Mic,
  Headphones,
  Lock,
  Zap
} from "lucide-react";

interface FooterProps {
  onOpenAdmin?: () => void;
  onSelectCategory?: (cat: CategoryType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onSelectCategory }) => {
  const handleCategoryClick = (cat: CategoryType) => {
    if (onSelectCategory) {
      onSelectCategory(cat);
    }
    const elem = document.getElementById("products");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer id="footer" className="bg-[#070b14] border-t border-[#1c2942] text-gray-400 text-right pt-16 pb-12 relative overflow-hidden">
      {/* Background neon glows */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00a3ff]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#00e5ff]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#0b1120] border border-[#00a3ff]/40 flex items-center justify-center text-[#00a3ff] shadow-[0_0_15px_rgba(0,163,255,0.25)]">
                <Zap className="w-6 h-6" />
              </div>

              <div>
                <div className="brand-mark brand-mark-sm text-white">
                  NITRO <span className="brand-mark-games">GAMES</span>
                </div>
                <div className="brand-sub mt-1">PALESTINE</div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-sm">
              NITRO GAMES: خياركم الأفضل في فلسطين للعتاد الاحترافي.. ارفع مستوى لعبك! المتجر المتخصص الأول في فلسطين لأجهزة (كيبورد، ماوس، ماوس باد، مايك، سماعات) مع كفالة حقيقية لمدة سنة وتوصيل لكافة المناطق والداخل المحتل.
            </p>

            <div className="space-y-2 pt-1 text-xs">
              <div className="flex items-center gap-2 text-gray-300">
                <Truck className="w-4 h-4 text-[#00a3ff] flex-shrink-0" />
                <span>توصيل لكافة مناطق فلسطين والقدس والداخل المحتل 🚚</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <ShieldCheck className="w-4 h-4 text-[#00e5ff] flex-shrink-0" />
                <span>ضمان حقيقي لمدة سنة على جميع المنتجات ⭐</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <PhoneCall className="w-4 h-4 text-[#00a3ff] flex-shrink-0" />
                <span dir="ltr" className="font-mono text-[#00a3ff] font-bold">{STORE_CONTACT.display}</span>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-white font-['Cairo']">روابط سريعة</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#hero" className="hover:text-[#00a3ff] transition-colors">
                  الصفحة الرئيسية
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-[#00a3ff] transition-colors">
                  جميع المنتجات والعتاد
                </a>
              </li>
              <li>
                <a href="#deals" className="hover:text-[#00a3ff] transition-colors">
                  عروض الفلاش والتخفيضات
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#00a3ff] transition-colors">
                  آراء وتجارب اللاعبين
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: The 5 Store Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-white font-['Cairo']">أقسام المتجر الخمسة</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleCategoryClick("keyboards")}
                  className="hover:text-[#00a3ff] transition-colors flex items-center gap-1.5"
                >
                  <Keyboard className="w-3.5 h-3.5 text-gray-400" />
                  <span>كيبورد (Keyboards)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick("mice")}
                  className="hover:text-[#00a3ff] transition-colors flex items-center gap-1.5"
                >
                  <Mouse className="w-3.5 h-3.5 text-gray-400" />
                  <span>ماوس (Mice 8K)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick("mousepads")}
                  className="hover:text-[#00a3ff] transition-colors flex items-center gap-1.5"
                >
                  <Square className="w-3.5 h-3.5 text-gray-400" />
                  <span>ماوس باد (Mousepads)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick("microphones")}
                  className="hover:text-[#00a3ff] transition-colors flex items-center gap-1.5"
                >
                  <Mic className="w-3.5 h-3.5 text-gray-400" />
                  <span>مايك (Microphones)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick("headsets")}
                  className="hover:text-[#00a3ff] transition-colors flex items-center gap-1.5"
                >
                  <Headphones className="w-3.5 h-3.5 text-gray-400" />
                  <span>سماعات (Headsets)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Payment & Direct WhatsApp */}
          <div className="space-y-4">
            <h4 className="text-sm font-black text-white font-['Cairo']">طرق الدفع والتوصيل</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              افحص طلبك وكرتونة المصنع بنفسك قبل الدفع:
            </p>

            <div className="flex flex-wrap gap-2 text-[10px] font-bold">
              <span className="px-2.5 py-1 rounded-lg bg-[#0b1120] border border-[#1c2942] text-white">
                💵 كاش عند الاستلام
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#0b1120] border border-[#1c2942] text-[#00a3ff]">
                📱 جوال باي
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#0b1120] border border-[#1c2942] text-teal-300">
                💳 بال باي
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#0b1120] border border-[#1c2942] text-sky-300">
                💳 فيزا / ماستر
              </span>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${STORE_CONTACT.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-[#0b1120] hover:bg-[#152034] border border-[#00a3ff]/40 hover:border-[#00a3ff] text-[#00a3ff] text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#00a3ff]" />
                <span>واتساب المبيعات: {STORE_CONTACT.short}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Secure Admin Trigger without leaking password */}
        <div className="pt-8 border-t border-[#1c2942] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            جميع الحقوق محفوظة © {new Date().getFullYear()} لمتجر{" "}
            <span className="brand-mark brand-mark-sm text-white">NITRO <span className="brand-mark-games">GAMES</span></span>.
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1 text-gray-400">
              صُنع بكل <Heart className="w-3.5 h-3.5 text-[#00e5ff] fill-[#00e5ff]" /> لعشاق الألعاب في فلسطين
            </span>

            {/* Hidden admin portal trigger without leaking any password text */}
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="opacity-30 hover:opacity-100 hover:text-[#00a3ff] transition-all p-1.5 rounded-lg bg-white/5 flex items-center gap-1 cursor-pointer"
                title="لوحة الإدارة"
              >
                <Lock className="w-3.5 h-3.5" />
                <span className="text-[10px] hidden sm:inline">Admin</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
