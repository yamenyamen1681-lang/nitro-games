"use client";

import React from "react";
import Image from "next/image";
import { Keyboard, Mouse, Square, Mic, Headphones, ArrowLeft, Zap } from "lucide-react";
import { CategoryType } from "@/lib/data";

interface CategoryGridProps {
  onSelectCategory: (cat: CategoryType) => void;
  selectedCategory: string;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onSelectCategory, selectedCategory }) => {
  const categoriesList = [
    {
      id: "keyboards" as CategoryType,
      name: "كيبورد",
      nameEn: "Mechanical & Rapid Trigger",
      desc: "سويتشات تناظرية مغناطيسية، ميزة Rapid Trigger الفورية، وشاشات OLED",
      count: "عتاد احترافي",
      icon: Keyboard,
      image: "/images/keyboard-custom-rgb.jpg",
      highlight: "Rapid Trigger 0.1mm",
      accent: "#00a3ff",
    },
    {
      id: "mice" as CategoryType,
      name: "ماوس",
      nameEn: "Esports 8K Wireless",
      desc: "أخف ماوسات بطولات في العالم بتردد 8000Hz وحساسات بصرية نقية",
      count: "دقة استثنائية",
      icon: Mouse,
      image: "/images/mouse-pro-8k.jpg",
      highlight: "8000Hz Polling",
      accent: "#00e5ff",
    },
    {
      id: "mousepads" as CategoryType,
      name: "ماوس باد",
      nameEn: "Artisan & Pro Gaming Pads",
      desc: "ماوس بادات يابانية وزجاجية مع قواعد بورون Poron لقوة إيقاف وتحكم مطلقة",
      count: "صناعة يابانية",
      icon: Square,
      image: "/images/mousepad-pro.jpg",
      highlight: "Artisan Poron",
      accent: "#00a3ff",
    },
    {
      id: "microphones" as CategoryType,
      name: "مايك",
      nameEn: "Broadcast & Studio Mics",
      desc: "مايكروفونات استوديو وبث ألعاب بنقاء إذاعي وعزل احترافي للضوضاء",
      count: "صوت إذاعي نقي",
      icon: Mic,
      image: "/images/microphone-pro.jpg",
      highlight: "Studio Quality",
      accent: "#00e5ff",
    },
    {
      id: "headsets" as CategoryType,
      name: "سماعات",
      nameEn: "Pro Spatial Audio",
      desc: "سماعات محيطية 360° مع إلغاء نشط للضوضاء وبطاريات تدوم حتى 120 ساعة",
      count: "صوت محيطي 360°",
      icon: Headphones,
      image: "/images/headset-pro.jpg",
      highlight: "ANC & Hi-Res",
      accent: "#00a3ff",
    },
  ];

  const handleCardClick = (catId: CategoryType) => {
    onSelectCategory(catId);
    const elem = document.getElementById("products");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="categories" className="py-14 relative bg-[#070b14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#00a3ff] uppercase tracking-wider mb-2">
              <Zap className="w-4 h-4 text-[#00a3ff]" />
              <span>أقسام المتجر الخمسة المعتمدة</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-['Cairo']">
              تصفح العتاد حسب القسم في <span className="brand-mark brand-mark-sm text-white inline-block align-middle">NITRO <span className="brand-mark-games">GAMES</span></span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 max-w-md">
            جميع المنتجات المعروضة في الأقسام أصلية 100% ومشمولة بضمان حقيقي لمدة سنة مع الدفع عند الاستلام.
          </p>
        </div>

        {/* 5 Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {categoriesList.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => handleCardClick(cat.id)}
                className={`relative group cursor-pointer rounded-xl overflow-hidden bg-[#0b1120] border ${
                  isSelected
                    ? "border-[#00a3ff] shadow-[0_0_25px_rgba(0,163,255,0.3)]"
                    : "border-[#1c2942] hover:border-[#00a3ff]/70"
                } transition-all duration-250 hover:-translate-y-1.5 flex flex-col justify-between`}
              >
                {/* Background Image */}
                <div className="relative h-44 w-full overflow-hidden bg-[#101a2e]">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover object-center group-hover:scale-108 transition-transform duration-500 opacity-60 group-hover:opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] via-[#0b1120]/70 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-4 flex flex-col justify-between z-10 text-right">
                  {/* Top: Highlight pill & Icon */}
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[10px] font-black px-2 py-0.5 rounded bg-black/80 font-mono border"
                      style={{ color: cat.accent, borderColor: `${cat.accent}55` }}
                    >
                      {cat.highlight}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-[#152034] border border-[#27405f] flex items-center justify-center text-gray-300 group-hover:bg-[#00a3ff] group-hover:text-black transition-all">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Bottom: Name & CTA */}
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-white group-hover:text-[#00a3ff] transition-colors leading-tight font-['Cairo']">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                      {cat.desc}
                    </p>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#1c2942] text-xs">
                      <span className="font-mono text-[#00a3ff] font-bold">{cat.count}</span>
                      <span className="flex items-center gap-1 text-white font-bold group-hover:text-[#00a3ff] group-hover:translate-x-[-3px] transition-all">
                        <span>تصفح</span>
                        <ArrowLeft className="w-3.5 h-3.5 text-[#00a3ff]" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Active Indicator Glow Bottom */}
                {isSelected && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#00a3ff] shadow-[0_0_10px_#00a3ff]" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
