"use client";

import React, { useState } from "react";
import { Mail, Zap, Check, Copy, Gift } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const NewsletterSection: React.FC = () => {
  const { showToast } = useCart();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      showToast("يرجى إدخال بريد إلكتروني صحيح");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.code) {
        setCouponCode(data.code);
        showToast("تهانينا! حصلت على كود خصم 10% فوري 🎁");
      }
    } catch (err) {
      console.error(err);
      setCouponCode("NITRO10");
      showToast("أهلاً بك! كود الخصم هو NITRO10");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (couponCode) {
      navigator.clipboard.writeText(couponCode);
      setCopied(true);
      showToast("تم نسخ الكود بنجاح! الصقه عند إنهاء الطلب 📋");
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <section className="py-16 relative overflow-hidden bg-[#070b14]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-2xl p-8 sm:p-12 bg-[#0b1120] border border-[#1c2942] shadow-2xl text-center overflow-hidden">
          {/* Top Line accent */}
          <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-transparent via-[#00a3ff] to-transparent animate-pulse" />

          <div className="max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00a3ff]/10 border border-[#00a3ff]/30">
              <Gift className="w-4 h-4 text-[#00a3ff]" />
              <span className="text-xs font-bold text-[#00a3ff] uppercase tracking-wider">
                كوبون خصم فوري 10% لجميع المشتركين الجدد
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white font-['Cairo']">
              انضم إلى مجتمع <span className="brand-mark brand-mark-sm text-white inline-block align-middle">NITRO <span className="brand-mark-games">VIP</span></span>
            </h2>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              كن أول من يعلم عن وصول شحنات ماوسات الـ 8K وكيبوردات Wooting وماوس بادات Artisan والعروض السرية.
            </p>

            {!couponCode ? (
              <form onSubmit={handleSubmit} className="pt-4 max-w-md mx-auto flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="أدخل بريدك الإلكتروني هنا..."
                    className="w-full bg-[#152034] text-sm text-gray-100 placeholder-gray-500 rounded-xl pl-4 pr-10 py-3.5 border border-[#27405f] focus:outline-none focus:border-[#00a3ff] text-right"
                  />
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-cyber-cyan text-black font-black text-xs sm:text-sm px-6 py-3.5 rounded-xl cursor-pointer hover:scale-105 transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-lg"
                >
                  <Zap className="w-4 h-4" />
                  <span>{loading ? "جارٍ التفعيل..." : "احصل على كود 10%"}</span>
                </button>
              </form>
            ) : (
              <div className="pt-4 max-w-md mx-auto animate-fade-in">
                <div className="p-4 rounded-xl bg-[#152034] border border-[#00a3ff]/50 flex items-center justify-between shadow-lg">
                  <div className="text-right">
                    <div className="text-[11px] text-gray-400">كود الخصم الحصري الخاص بك:</div>
                    <div className="text-xl font-black text-[#00a3ff] font-mono tracking-widest">
                      {couponCode}
                    </div>
                  </div>

                  <button
                    onClick={handleCopy}
                    className="px-4 py-2 rounded-lg bg-[#00a3ff] text-black font-black text-xs flex items-center gap-1.5 hover:bg-[#ffb340] transition-all shadow-md"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? "تم النسخ!" : "نسخ الكود"}</span>
                  </button>
                </div>
                <div className="text-xs text-gray-400 mt-2">
                  ✅ استخدم الكود في سلة المشتريات أو صفحة إنهاء الطلب
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
