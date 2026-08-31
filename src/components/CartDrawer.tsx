"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { STORE_CONTACT } from "@/lib/data";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
  Truck,
  Tag,
  Check,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discount,
    discountCode,
    applyDiscountCode,
    removeDiscountCode,
    deliveryFee,
    total,
    setIsCheckoutOpen,
    showToast,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState("");
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const freeShippingThreshold = 1000;
  const remaining = Math.max(0, freeShippingThreshold - subtotal);
  const progress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const result = applyDiscountCode(inputCoupon);
    if (result.success) {
      showToast(result.message);
      setCouponError(null);
      setInputCoupon("");
    } else {
      setCouponError(result.message);
    }
  };

  const orderMessage = encodeURIComponent(
    `مرحباً NITRO GAMES 🎮 أود إتمام الطلب مباشرة من السلة:\n\n` +
      cart
        .map(
          (item, idx) =>
            `${idx + 1}. ${item.product.title} (الكمية: ${item.quantity}) - ${(
              (item.customPrice || item.product.price) * item.quantity
            ).toLocaleString()} ₪`
        )
        .join("\n") +
      `\n\nالمجموع الإجمالي: ${total.toLocaleString()} ₪\nيرجى تأكيد التوصيل (الضفة / القدس / الداخل المحتل).`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-[#070b14] border-r border-[#1c2942] shadow-2xl flex flex-col justify-between text-right">
          {/* Top bar */}
          <div className="p-5 border-b border-[#1c2942] bg-[#0b1120] flex items-center justify-between">
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl bg-[#101a2e] text-gray-400 hover:text-white hover:bg-[#152034] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className="text-base font-black text-white font-['Cairo']">سلة المشتريات</span>
              <div className="w-8 h-8 rounded-lg bg-[#00a3ff]/15 border border-[#00a3ff]/30 flex items-center justify-center text-[#00a3ff]">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Free shipping bar */}
          <div className="bg-[#0b1120] px-5 py-3 border-b border-[#1c2942] space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-300 font-bold">
                {remaining > 0 ? (
                  <>
                    أضف عتاد بقيمة{" "}
                    <span className="text-[#00a3ff] font-mono font-black">
                      {remaining.toLocaleString()} ₪
                    </span>{" "}
                    للشحن المجاني!
                  </>
                ) : (
                  <span className="text-[#00e5ff] flex items-center gap-1 font-bold">
                    <Truck className="w-4 h-4" />
                    تهانينا! طلبيتك مؤهلة للشحن المجاني السريع 🚀
                  </span>
                )}
              </span>
              <span className="text-[11px] font-mono text-gray-400">{progress}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#1c2942] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#0066ff] to-[#00e5ff] transition-all duration-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-20 h-20 rounded-2xl bg-[#0b1120] border border-[#1c2942] flex items-center justify-center text-gray-500">
                  <ShoppingBag className="w-10 h-10 text-[#00a3ff]" />
                </div>
                <h3 className="text-lg font-bold text-white font-['Cairo']">سلة المشتريات فارغة حالياً</h3>
                <p className="text-xs text-gray-400 max-w-xs">
                  اختر من بين الكيبوردات، الماوسات، الماوس باد، المايكات، والسماعات وابدأ طلبك الآن.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="btn-neon text-black font-bold text-xs px-6 py-3 rounded-xl cursor-pointer"
                >
                  استكشف العتاد الاحترافي
                </button>
              </div>
            ) : (
              cart.map((item, index) => {
                const itemPrice = item.customPrice || item.product.price;
                return (
                  <div
                    key={`${item.product.id}-${index}`}
                    className="p-3.5 rounded-xl bg-[#0b1120] border border-[#1c2942] flex gap-3.5 items-center"
                  >
                    <div className="relative w-16 h-16 rounded-lg bg-[#05070d] border border-[#1c2942] p-1 flex-shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.title}
                        fill
                        className="object-contain"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-bold text-[#00a3ff] uppercase font-mono truncate">
                        {item.product.brand}
                      </div>
                      <h4 className="text-xs font-bold text-white truncate leading-tight mt-0.5 font-['Cairo']">
                        {item.product.title}
                      </h4>

                      <div className="flex items-center justify-between mt-2">
                        <div className="text-xs font-black text-white font-mono">
                          {itemPrice.toLocaleString()}{" "}
                          <span className="text-[10px] text-[#00a3ff]">₪</span>
                        </div>

                        <div className="flex items-center gap-1.5 bg-[#101a2e] border border-[#1c2942] rounded-lg p-0.5">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white rounded"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold font-mono px-1 text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white rounded"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-1.5 text-gray-500 hover:text-rose-400 transition-colors"
                      title="حذف من السلة"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#1c2942] bg-[#0b1120] space-y-4">
              {/* Coupon */}
              <div>
                {!discountCode ? (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="كود الخصم (مثال: NITRO10)"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      className="flex-1 bg-[#101a2e] border border-[#1c2942] text-xs text-white rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#00a3ff] text-right font-mono"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-xl bg-[#1c2942] hover:bg-[#00a3ff] hover:text-black text-gray-200 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Tag className="w-3.5 h-3.5" />
                      <span>تطبيق</span>
                    </button>
                  </form>
                ) : (
                  <div className="p-2.5 rounded-xl bg-[#00a3ff]/10 border border-[#00a3ff]/40 flex items-center justify-between text-xs">
                    <span className="text-[#00a3ff] font-bold flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5" />
                      تم تفعيل الكود: {discountCode}
                    </span>
                    <button
                      onClick={removeDiscountCode}
                      className="text-xs text-rose-400 hover:underline"
                    >
                      إلغاء
                    </button>
                  </div>
                )}
                {couponError && <div className="text-[11px] text-rose-400 mt-1">{couponError}</div>}
              </div>

              {/* Totals */}
              <div className="space-y-1.5 text-xs text-gray-300">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">المجموع الفرعي:</span>
                  <span className="font-mono font-bold">{subtotal.toLocaleString()} ₪</span>
                </div>

                {discount > 0 && (
                  <div className="flex items-center justify-between text-[#00e5ff]">
                    <span>قيمة الخصم:</span>
                    <span className="font-mono font-bold">-{discount.toLocaleString()} ₪</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-gray-400">رسوم التوصيل التقديرية:</span>
                  <span className="font-mono font-bold">
                    {deliveryFee === 0 ? "مجاني 🚀" : `${deliveryFee} ₪`}
                  </span>
                </div>

                <div className="pt-2 border-t border-[#1c2942] flex items-center justify-between text-base font-black text-white">
                  <span>المجموع الإجمالي:</span>
                  <div className="flex items-baseline gap-1 text-[#00a3ff] font-mono text-xl">
                    <span>{total.toLocaleString()}</span>
                    <span className="text-xs font-bold text-white">₪</span>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-2.5 pt-1">
                <a
                  href={`https://wa.me/${STORE_CONTACT.whatsapp}?text=${orderMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer hover:scale-[1.02]"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>إتمام الطلب مباشرة عبر الواتساب 💬</span>
                </a>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full btn-neon text-black font-black text-xs sm:text-sm py-3.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] transition-all"
                >
                  <span>أو إدخال بيانات التوصيل والدفع عند الاستلام</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>

              <div className="text-[11px] text-center text-gray-400 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00a3ff]" />
                <span>دفع عند الاستلام • ضمان سنة حقيقي على جميع المنتجات ⭐</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
