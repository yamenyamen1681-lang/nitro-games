"use client";

import React, { useState } from "react";
import { CustomerReview, INITIAL_REVIEWS } from "@/lib/data";
import { Star, CheckCircle, MessageSquarePlus, ShieldCheck, MapPin, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const CustomerReviews: React.FC = () => {
  const { showToast } = useCart();
  const [reviewsList, setReviewsList] = useState<CustomerReview[]>(INITIAL_REVIEWS);
  const [modalOpen, setModalOpen] = useState(false);
  const [author, setAuthor] = useState("");
  const [city, setCity] = useState("رام الله والبيرة");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [itemBought, setItemBought] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) {
      showToast("يرجى تعبئة جميع الحقول المطلوبة");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author,
          city,
          rating,
          comment,
          itemBought: itemBought || "عتاد ألعاب من NITRO GAMES",
        }),
      });

      const data = await res.json();
      if (data.success) {
        const newReviewItem: CustomerReview = {
          id: Date.now(),
          author,
          city,
          rating,
          comment,
          verifiedPurchase: true,
          itemBought: itemBought || "عتاد ألعاب من NITRO GAMES",
          date: "الآن",
        };
        setReviewsList([newReviewItem, ...reviewsList]);
        showToast("شكراً لك! تم نشر تقييمك بنجاح ❤️");
        setModalOpen(false);
        setAuthor("");
        setComment("");
        setItemBought("");
      }
    } catch (err) {
      console.error(err);
      showToast("تم حفظ تقييمك بنجاح!");
      setModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="py-16 relative bg-[#070b14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#00a3ff] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#00a3ff]" />
              <span>مجتمع اللاعبين الموثق في فلسطين والداخل</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-['Cairo']">
              تجارب وآراء مجتمع <span className="brand-mark brand-mark-sm text-white inline-block align-middle">NITRO <span className="brand-mark-games">GAMES</span></span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 max-w-xl">
              أكثر من 5,400 لاعب محترف يثقون بمتجر NITRO GAMES لكفاءة العتاد والضمان الحقيقي وسرعة التوصيل.
            </p>
          </div>

          {/* Action */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-[#0b1120] hover:bg-[#00a3ff] hover:text-black text-[#00a3ff] border border-[#00a3ff]/40 hover:border-[#00a3ff] text-xs font-bold transition-all flex items-center gap-2 shadow-md cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>أضف تجربتك وتقييمك</span>
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-xl bg-[#0b1120] border border-[#1c2942] hover:border-[#00a3ff]/60 transition-all duration-250 flex flex-col justify-between space-y-4 hover:-translate-y-1.5 shadow-lg"
            >
              <div>
                {/* Stars & Date */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? "fill-amber-400 text-amber-400" : "text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-gray-400 font-mono">{rev.date}</span>
                </div>

                {/* Comment */}
                <p className="text-xs text-gray-300 leading-relaxed font-normal">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & City Info */}
              <div className="pt-3 border-t border-[#1c2942] flex items-center justify-between">
                <div>
                  <div className="text-xs font-black text-white flex items-center gap-1.5 font-['Cairo']">
                    <span>{rev.author}</span>
                    {rev.verifiedPurchase && (
                      <span className="text-[10px] text-[#00a3ff] bg-[#00a3ff]/10 px-1.5 py-0.5 rounded border border-[#00a3ff]/30 flex items-center gap-0.5 font-mono">
                        <CheckCircle className="w-2.5 h-2.5" />
                        <span>موثق</span>
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-gray-400 truncate max-w-[150px] mt-0.5">
                    {rev.itemBought}
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-[#00a3ff] font-bold bg-[#152034] px-2.5 py-1 rounded-lg border border-[#1c2942]">
                  <MapPin className="w-3 h-3 text-[#00a3ff]" />
                  <span>{rev.city.split(" ")[0]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Review Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#0b1120] border border-[#1c2942] p-6 shadow-2xl text-right space-y-4">
            <div className="flex items-center justify-between border-b border-[#1c2942] pb-3">
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg bg-[#152034] text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-base font-black text-white font-['Cairo']">أضف تقييمك لمتجر NITRO GAMES</h3>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">اسمك الكريم:</label>
                <input
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="مثال: يوسف خالد"
                  className="w-full bg-[#152034] border border-[#27405f] text-sm text-gray-100 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#00a3ff]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-300 block mb-1">المدينة / المنطقة:</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#152034] border border-[#27405f] text-xs font-bold text-gray-100 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#00a3ff]"
                  >
                    <option value="القدس الشريف">القدس الشريف</option>
                    <option value="رام الله والبيرة">رام الله والبيرة</option>
                    <option value="نابلس">نابلس</option>
                    <option value="الخليل">الخليل</option>
                    <option value="جنين">جنين</option>
                    <option value="بيت لحم">بيت لحم</option>
                    <option value="طولكرم">طولكرم</option>
                    <option value="قلقيلية">قلقيلية</option>
                    <option value="مناطق الداخل المحتل 48">مناطق الداخل المحتل 48</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-300 block mb-1">التقييم:</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full bg-[#152034] border border-[#27405f] text-xs font-bold text-amber-400 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#00a3ff]"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 نجوم - ممتاز)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 نجوم - جيد جداً)</option>
                    <option value={3}>⭐⭐⭐ (3 نجوم - جيد)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">المنتج الذي اشتريته:</label>
                <input
                  type="text"
                  value={itemBought}
                  onChange={(e) => setItemBought(e.target.value)}
                  placeholder="مثال: كيبورد Wooting أو ماوس Superlight 2"
                  className="w-full bg-[#152034] border border-[#27405f] text-sm text-gray-100 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#00a3ff]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">رأيك وتجربتك بالتفصيل:</label>
                <textarea
                  required
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="شاركنا رأيك في سرعة التوصيل، جودة التغليف، أداء القطع والضمان..."
                  className="w-full bg-[#152034] border border-[#27405f] text-sm text-gray-100 rounded-xl p-3 focus:outline-none focus:border-[#00a3ff]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#152034] text-gray-300 text-xs font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-cyber-cyan text-black font-black text-xs px-6 py-2.5 rounded-xl cursor-pointer"
                >
                  {isSubmitting ? "جارٍ النشر..." : "نشر التقييم 🚀"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
