"use client";

import React, { useState, useEffect } from "react";
import { Truck, X, Zap, ShieldCheck, Star, Gift, Mouse, Banknote, Headphones } from "lucide-react";

const HIGHLIGHT_MESSAGES = [
  { text: "عتاد أصلي 100% من الوكلاء المعتمدين", icon: Star },
  { text: "ضمان حقيقي لمدة سنة على كل المنتجات ⭐", icon: ShieldCheck },
  { text: "سويتشات Rapid Trigger باستجابة 0.1 ملم ⚡", icon: Zap },
  { text: "خصم 10% فوري بكود: NITRO10", icon: Gift },
  { text: "ماوسات لاسلكية بتردد 8000Hz 🖱️", icon: Mouse },
  { text: "دفع عند الاستلام — افحص قبل ما تدفع 💵", icon: Banknote },
  { text: "صوت محيطي 360° مع عزل ANC 🎧", icon: Headphones },
  { text: "توصيل سريع لكافة مناطق فلسطين والداخل المحتل 🚚", icon: Truck },
];

export const LiveSalesToast: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [closedManually, setClosedManually] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (closedManually) return;

    // First appearance
    const first = setTimeout(() => setVisible(true), 3000);

    // Rotate the delivery message every 5s
    const rotator = setInterval(() => {
      setIndex((i) => (i + 1) % HIGHLIGHT_MESSAGES.length);
    }, 5000);

    // Hide / show cycle
    const cycle = setInterval(() => {
      setVisible(false);
      setTimeout(() => setVisible(true), 1200);
    }, 14000);

    return () => {
      clearTimeout(first);
      clearInterval(rotator);
      clearInterval(cycle);
    };
  }, [closedManually]);

  if (closedManually || !visible) return null;

  const current = HIGHLIGHT_MESSAGES[index];
  const Icon = current.icon;

  return (
    <div className="fixed bottom-5 right-5 z-40 max-w-sm transition-all duration-500">
      <div className="relative p-4 pr-4 pl-3 rounded-2xl bg-[#0b1120] border border-[#00a3ff]/35 shadow-[0_10px_35px_rgba(0,0,0,.85),0_0_20px_rgba(0,163,255,.15)] flex items-center gap-3.5 text-right">
        {/* Glowing icon */}
        <div className="relative w-11 h-11 rounded-xl bg-[#152034] border border-[#00a3ff]/40 flex items-center justify-center flex-shrink-0 text-[#00a3ff]">
          <Icon className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00a3ff] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00a3ff]"></span>
          </span>
        </div>

        {/* Message */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[10px] font-black text-[#02121f] bg-[#00e5ff] px-2 py-0.5 rounded-full font-tech">
              NITRO GAMES
            </span>
            <span className="text-[10px] font-bold text-[#00a3ff]">مزايا المتجر</span>
          </div>

          <p
            key={index}
            className="animate-fade-in-down text-xs sm:text-[13px] font-bold text-gray-100 leading-relaxed font-['Cairo']"
          >
            {current.text}
          </p>
        </div>

        {/* Close */}
        <button
          onClick={() => {
            setVisible(false);
            setClosedManually(true);
          }}
          className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors self-start"
          aria-label="إغلاق الإشعار"
          title="إغلاق الإشعار"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
