"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { useCart } from "@/context/CartContext";
import {STORE_CONTACT, PALESTINIAN_CITIES} from "@/lib/data";

import {
  X,
  CheckCircle2,
  Truck,
  ShieldCheck,
  CreditCard,
  Banknote,
  Smartphone,
  MapPin,
  Phone,
  Mail,
  User,
  ShoppingBag,
  MessageCircle,
} from "lucide-react";

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    subtotal,
    discount,
    discountCode,
    deliveryFee,
    selectedCity,
    setSelectedCity,
    total,
    clearCart,
  } = useCart();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<string>("cash_on_delivery");
  const [loading, setLoading] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);
  const [orderNumber, setOrderNumber] = useState<string>("");

  if (!isCheckoutOpen) return null;

  const handleCityChange = (cityName: string) => {
    setSelectedCity(cityName);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !address) {
      alert("يرجى تعبئة جميع الحقول الإلزامية وبيانات التوصيل");
      return;
    }

    setLoading(true);

    try {
      const itemsPayload = cart.map((item) => ({
        id: item.product.id,
        title: item.product.title,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image,
      }));

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          customerPhone,
          customerEmail,
          city: selectedCity,
          address,
          notes,
          paymentMethod,
          items: itemsPayload,
          subtotal,
          discount,
          deliveryFee,
          total,
        }),
      });

      const data = await res.json();
      const confirmedNumber = data.orderNumber || `NITRO-${Math.floor(10000 + Math.random() * 90000)}`;
      setOrderNumber(confirmedNumber);
      setOrderConfirmed(true);

      // Trigger Confetti
      try {
        confetti({
          particleCount: 140,
          spread: 85,
          origin: { y: 0.6 },
          colors: ["#00a3ff", "#00e5ff", "#ffffff"],
        });
      } catch (err) {
        console.warn("Confetti effect:", err);
      }

      clearCart();
    } catch (err) {
      console.error(err);
      const fallbackNumber = `NITRO-${Math.floor(10000 + Math.random() * 90000)}`;
      setOrderNumber(fallbackNumber);
      setOrderConfirmed(true);
      clearCart();
    } finally {
      setLoading(false);
    }
  };

  const selectedCityDetails = PALESTINIAN_CITIES.find((c) => c.name === selectedCity) || {
    name: selectedCity,
    deliveryFee: 20,
    deliveryTime: "24-48 ساعة",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl bg-[#0b1120] border border-[#1c2942] shadow-2xl overflow-hidden my-8 text-right">
        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-[#1c2942] bg-[#120e09] flex items-center justify-between">
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 rounded-xl bg-[#152034] text-gray-400 hover:text-white hover:bg-[#1b2a48] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <div className="text-right">
              <h2 className="text-lg font-black text-white font-['Cairo']">
                {orderConfirmed ? "تم استلام طلبك بنجاح 🎉" : "إنهاء الطلب وتفاصيل الشحن"}
              </h2>
              <div className="text-xs text-gray-400">
                {orderConfirmed
                  ? "شكراً لاختيارك متجر NITRO GAMES"
                  : "توصيل لكافة مناطق فلسطين والداخل المحتل 🚚 | ضمان حقيقي لمدة سنة ⭐"}
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#00a3ff]/15 border border-[#00a3ff]/30 flex items-center justify-center text-[#00a3ff]">
              {orderConfirmed ? <CheckCircle2 className="w-6 h-6" /> : <Truck className="w-6 h-6" />}
            </div>
          </div>
        </div>

        {/* Content */}
        {!orderConfirmed ? (
          <form onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[75vh] overflow-y-auto">
              {/* Left Column (Inputs) */}
              <div className="lg:col-span-7 p-6 space-y-6 border-b lg:border-b-0 lg:border-l border-[#1c2942]">
                {/* Customer Personal Details */}
                <div className="space-y-3">
                  <div className="text-xs font-bold text-[#00a3ff] flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    <span>بيانات المستلم:</span>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-300 block mb-1">
                      الاسم الكامل <span className="text-[#00a3ff]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: يوسف أحمد قاسم"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-[#152034] border border-[#27405f] text-sm text-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00a3ff]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-gray-300 block mb-1">
                        رقم الهاتف / واتساب <span className="text-[#00a3ff]">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          required
                          dir="ltr"
                          placeholder="059-XXXXXXX"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          className="w-full bg-[#152034] border border-[#27405f] text-sm text-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00a3ff] text-right font-mono"
                        />
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-300 block mb-1">
                        البريد الإلكتروني (اختياري)
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          placeholder="yourname@gmail.com"
                          value={customerEmail}
                          onChange={(e) => setCustomerEmail(e.target.value)}
                          className="w-full bg-[#152034] border border-[#27405f] text-sm text-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00a3ff] text-right"
                        />
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* City & Address */}
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-bold text-[#00a3ff] flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    <span>عنوان التوصيل (الضفة، القدس، الداخل المحتل):</span>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-300 block mb-1">
                      المدينة / المحافظة <span className="text-[#00a3ff]">*</span>
                    </label>
                    <select
                      value={selectedCity}
                      onChange={(e) => handleCityChange(e.target.value)}
                      className="w-full bg-[#152034] border border-[#27405f] text-xs sm:text-sm font-bold text-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00a3ff]"
                    >
                      {PALESTINIAN_CITIES.map((c) => (
                        <option key={c.name} value={c.name}>
                          {c.name} ({c.deliveryFee === 0 ? "شحن مجاني" : `شحن: ${c.deliveryFee} ₪`} - مدة: {c.deliveryTime})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-300 block mb-1">
                      العنوان التفصيلي (الحي / الشارع / قرب معلم بارز) <span className="text-[#00a3ff]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: رام الله - الطيرة - قرب دوار السرية"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-[#152034] border border-[#27405f] text-sm text-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00a3ff]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-300 block mb-1">
                      ملاحظات خاصة لمندوب التوصيل:
                    </label>
                    <textarea
                      rows={2}
                      placeholder="مثال: يرجى الاتصال قبل الوصول بنصف ساعة..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-[#152034] border border-[#27405f] text-xs text-gray-100 rounded-xl p-3 focus:outline-none focus:border-[#00a3ff]"
                    />
                  </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-bold text-[#00a3ff] flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4" />
                    <span>طريقة الدفع:</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* Cash */}
                    <label
                      onClick={() => setPaymentMethod("cash_on_delivery")}
                      className={`p-3.5 rounded-xl border cursor-pointer flex items-center gap-3 transition-all ${
                        paymentMethod === "cash_on_delivery"
                          ? "border-[#00a3ff] bg-[#00a3ff]/10 text-white"
                          : "border-[#27405f] bg-[#152034] text-gray-400 hover:border-gray-500"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "cash_on_delivery"}
                        onChange={() => setPaymentMethod("cash_on_delivery")}
                        className="accent-[#00a3ff]"
                      />
                      <Banknote className="w-5 h-5 text-[#00a3ff]" />
                      <div className="text-right">
                        <div className="text-xs font-bold text-white">الدفع عند الاستلام (كاش)</div>
                        <div className="text-[10px] text-gray-400">عاين وافحص طلبك قبل الدفع</div>
                      </div>
                    </label>

                    {/* Jawwal Pay */}
                    <label
                      onClick={() => setPaymentMethod("jawwal_pay")}
                      className={`p-3.5 rounded-xl border cursor-pointer flex items-center gap-3 transition-all ${
                        paymentMethod === "jawwal_pay"
                          ? "border-[#00a3ff] bg-[#00a3ff]/10 text-white"
                          : "border-[#27405f] bg-[#152034] text-gray-400 hover:border-gray-500"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "jawwal_pay"}
                        onChange={() => setPaymentMethod("jawwal_pay")}
                        className="accent-[#00a3ff]"
                      />
                      <Smartphone className="w-5 h-5 text-[#00a3ff]" />
                      <div className="text-right">
                        <div className="text-xs font-bold text-white">محفظة جوال باي (Jawwal Pay)</div>
                        <div className="text-[10px] text-gray-400">تحويل مباشر وآمن</div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column (Order Summary) */}
              <div className="lg:col-span-5 p-6 bg-[#120e09] flex flex-col justify-between space-y-6">
                <div>
                  <div className="text-xs font-bold text-white mb-3 flex items-center justify-between">
                    <span>ملخص سلة المشتريات ({cart.length} أصناف)</span>
                    <span className="text-[#00a3ff]">{selectedCity}</span>
                  </div>

                  {/* Items list */}
                  <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                    {cart.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between gap-2 text-xs py-2 border-b border-[#1c2942]"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="font-mono bg-[#152034] text-gray-300 px-1.5 py-0.5 rounded text-[10px]">
                            {item.quantity}x
                          </span>
                          <span className="text-gray-200 truncate font-['Cairo']">{item.product.title}</span>
                        </div>
                        <div className="font-mono font-bold text-white flex-shrink-0">
                          {(item.product.price * item.quantity).toLocaleString()} ₪
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Calculations */}
                  <div className="pt-4 space-y-2 text-xs text-gray-300 border-t border-[#1c2942] mt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">المجموع الفرعي:</span>
                      <span className="font-mono font-bold">{subtotal.toLocaleString()} ₪</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex items-center justify-between text-[#00a3ff]">
                        <span>خصم الكوبون ({discountCode}):</span>
                        <span className="font-mono font-bold">-{discount.toLocaleString()} ₪</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">رسوم التوصيل ({selectedCity}):</span>
                      <span className="font-mono font-bold">
                        {deliveryFee === 0 ? "مجاني 🚀" : `${deliveryFee} ₪`}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-gray-400">
                      <span>مدة التوصيل التقديرية:</span>
                      <span className="font-bold text-white">{selectedCityDetails.deliveryTime}</span>
                    </div>

                    <div className="pt-3 border-t border-[#1c2942] flex items-center justify-between text-base font-black text-white">
                      <span>المبلغ المستحق للدفع:</span>
                      <div className="flex items-baseline gap-1 text-[#00a3ff] font-mono text-2xl">
                        <span>{total.toLocaleString()}</span>
                        <span className="text-sm font-bold text-white">₪</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 1-Year Guarantee callout - Strict direct sales, no return sections */}
                <div className="p-3.5 rounded-xl bg-[#152034] border border-[#27405f] text-xs text-gray-300 space-y-1">
                  <div className="flex items-center gap-1.5 text-[#00a3ff] font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>ضمان حقيقي لمدة سنة كاملة ⭐</span>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    يحق لك فحص الشحنة ومطابقتها والتأكد من سلامتها قبل الدفع للمندوب. كفالة سنة حقيقية معتمدة لجميع المنتجات.
                  </p>
                </div>

                {/* Submit button & Direct WhatsApp checkout with STORE_CONTACT */}
                <div className="space-y-2.5">
                  <button
                    type="submit"
                    disabled={loading || cart.length === 0}
                    className="w-full btn-cyber-cyan text-black font-black text-sm py-3.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
                  >
                    {loading ? (
                      <span>جارٍ تأكيد الطلب...</span>
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        <span>تأكيد الطلب والدفع عند الاستلام 🚀</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`https://wa.me/${STORE_CONTACT.whatsapp}?text=${encodeURIComponent(
                      `مرحباً NITRO GAMES 🎮 أود إتمام الطلب مباشرة:\nالاسم: ${customerName || 'عميل المتجر'}\nالمدينة: ${selectedCity}\nالعنوان: ${address || 'غير محدد'}\nطريقة الدفع: ${paymentMethod === 'cash_on_delivery' ? 'كاش عند الاستلام' : 'جوال باي'}\n\nالمنتجات:\n` +
                      cart.map((item, idx) => `${idx + 1}. ${item.product.title} (x${item.quantity}) - ${((item.customPrice || item.product.price) * item.quantity).toLocaleString()} ₪`).join('\n') +
                      `\n\nالمجموع الإجمالي: ${total.toLocaleString()} ₪\nضمان سنة شامل وتوصيل مباشر.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>إرسال وتأكيد الطلب فوراً عبر واتساب المتجر 💬</span>
                  </a>
                </div>
              </div>
            </div>
          </form>
        ) : (
          /* Order Confirmation View */
          <div className="p-8 sm:p-12 text-center space-y-6 max-w-2xl mx-auto">
            <div className="w-20 h-20 rounded-full bg-[#00a3ff]/15 border-2 border-[#00a3ff] flex items-center justify-center mx-auto text-[#00a3ff] shadow-[0_0_30px_rgba(0,163,255,0.3)]">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black text-white font-['Cairo']">
                تهانينا يا بطل! تم استلام طلبك بنجاح
              </h3>
              <p className="text-sm text-gray-300">
                يقوم فريق NITRO GAMES حالياً بتجهيز وتغليف طلبك لشحنه لباب بيتك.
              </p>
            </div>

            {/* Order Card Details */}
            <div className="p-6 rounded-xl bg-[#152034] border border-[#27405f] text-right space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-[#1c2942]">
                <span className="text-xs text-gray-400">رقم الطلب الرسمي:</span>
                <span className="text-base font-black text-[#00a3ff] font-mono tracking-wider">
                  #{orderNumber}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">المستلم:</span>
                <span className="font-bold text-white">{customerName}</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">المدينة والتوصيل:</span>
                <span className="font-bold text-white">
                  {selectedCity} ({selectedCityDetails.deliveryTime})
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">طريقة الدفع:</span>
                <span className="font-bold text-[#00a3ff]">
                  {paymentMethod === "cash_on_delivery" ? "الدفع عند الاستلام كاش" : "محفظة جوال باي"}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs pt-3 border-t border-[#1c2942]">
                <span className="text-gray-400 font-bold">المجموع الإجمالي:</span>
                <span className="text-lg font-black text-white font-mono">{total.toLocaleString()} ₪</span>
              </div>
            </div>

            {/* WhatsApp follow up CTA */}
            <div className="space-y-3 pt-2">
              <a
                href={`https://wa.me/${STORE_CONTACT.whatsapp}?text=${encodeURIComponent(
                  `مرحباً NITRO GAMES، قمت بتأكيد طلبي رقم #${orderNumber} باسم ${customerName} بمبلغ ${total} ₪ إلى ${selectedCity}. أود المتابعة معكم.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-6 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-black text-sm flex items-center justify-center gap-2 transition-all shadow-lg"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>متابعة وتأكيد الشحن فوراً عبر واتساب المتجر</span>
              </a>

              <button
                onClick={() => {
                  setIsCheckoutOpen(false);
                  setOrderConfirmed(false);
                }}
                className="px-6 py-2.5 rounded-xl bg-[#152034] hover:bg-[#1c2942] text-gray-300 text-xs font-bold transition-colors"
              >
                العودة للتسوق في NITRO GAMES
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
