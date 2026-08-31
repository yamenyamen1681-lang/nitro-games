"use client";

import React from "react";
import { Truck, ShieldCheck, Banknote, Zap } from "lucide-react";

export const TrustBadges: React.FC = () => {
  const badges = [
    {
      icon: Truck,
      title: "توصيل للضفة والقدس والداخل المحتل",
      desc: "شحن سريع ومباشر لكافة مدن فلسطين والقرى والداخل المحتل لباب بيتك مع تغليف مصفح ضد الصدمات.",
      accent: "from-[#00a3ff]/20 via-[#00a3ff]/5 to-transparent",
      border: "hover:border-[#00a3ff]",
      color: "text-[#00a3ff]",
      badge: "شحن سريع 🚚",
    },
    {
      icon: ShieldCheck,
      title: "ضمان حقيقي لمدة سنة كاملة",
      desc: "كفالة رسمية موثقة ومعتمدة لجميع الكيبوردات والماوسات والماوس بادات والمايكات والسماعات.",
      accent: "from-[#00e5ff]/20 via-[#00e5ff]/5 to-transparent",
      border: "hover:border-[#00e5ff]",
      color: "text-[#00e5ff]",
      badge: "كفالة سنة ⭐",
    },
    {
      icon: Banknote,
      title: "الدفع عند الاستلام",
      desc: "عاين قطعتك وافحص كرتونة المصنع بنفسك قبل الدفع نقداً أو عبر محفظة جوال باي وبال باي.",
      accent: "from-[#00a3ff]/20 via-[#00a3ff]/5 to-transparent",
      border: "hover:border-[#00a3ff]",
      color: "text-[#00a3ff]",
      badge: "أمان 100% 💵",
    },
    {
      icon: Zap,
      title: "أفضل الأسعار المنافسة",
      desc: "أسعار رسمية منافسة مع عروض وخصومات حصرية مباشرة بدون أي وسطاء على أفضل العتاد.",
      accent: "from-[#00e5ff]/20 via-[#00e5ff]/5 to-transparent",
      border: "hover:border-[#00e5ff]",
      color: "text-[#00e5ff]",
      badge: "أسعار منافسة ⚡",
    },
  ];

  return (
    <section className="py-8 relative bg-[#070b14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {badges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className={`relative group p-6 rounded-xl bg-[#0b1120] border border-[#1c2942] ${badge.border} transition-all duration-250 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.7)] overflow-hidden`}
              >
                {/* Hover gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${badge.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                />

                <div className="relative z-10 flex flex-col items-start text-right space-y-3">
                  <div className="w-full flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl bg-[#152034] border border-[#27405f] flex items-center justify-center ${badge.color} transition-all shadow-inner group-hover:scale-110`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#152034] text-gray-300 border border-[#27405f] font-mono shadow-sm">
                      {badge.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-white group-hover:text-[#00a3ff] transition-colors font-['Cairo']">
                    {badge.title}
                  </h3>

                  <p className="text-xs text-gray-400 leading-relaxed font-normal">
                    {badge.desc}
                  </p>
                </div>

                {/* Bottom line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00a3ff]/0 to-transparent group-hover:via-[#00a3ff] transition-all duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
