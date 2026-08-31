"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/lib/data";

export interface CartItem {
  product: Product;
  quantity: number;
  customSpecs?: string[];
  customPrice?: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, customSpecs?: string[], customPrice?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  discount: number;
  discountCode: string;
  applyDiscountCode: (code: string) => { success: boolean; message: string };
  removeDiscountCode: () => void;
  deliveryFee: number;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  total: number;
  totalItemsCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  wishlist: number[];
  toggleWishlist: (productId: number) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discountCode, setDiscountCode] = useState<string>("");
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [selectedCity, setSelectedCity] = useState<string>("رام الله والبيرة");
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("nitro_cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedWishlist = localStorage.getItem("nitro_wishlist");
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch (e) {
      console.warn("Storage load error:", e);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("nitro_cart", JSON.stringify(cart));
    } catch (e) {
      console.warn("Storage save error:", e);
    }
  }, [cart]);

  // Save wishlist
  useEffect(() => {
    try {
      localStorage.setItem("nitro_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.warn("Storage save error:", e);
    }
  }, [wishlist]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  };

  const addToCart = (product: Product, quantity = 1, customSpecs?: string[], customPrice?: number) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id && !customSpecs);
      if (existingIndex > -1 && !customSpecs) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity, customSpecs, customPrice }];
    });
    showToast(`تمت إضافة "${product.title.slice(0, 32)}..." إلى سلة المشتريات 🎮`);
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast("تم حذف المنتج من السلة");
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast("تمت إزالة المنتج من المفضلة");
        return prev.filter((id) => id !== productId);
      } else {
        showToast("تمت إضافة المنتج إلى قائمة المفضلة ❤️");
        return [...prev, productId];
      }
    });
  };

  // Subtotal calculation
  const subtotal = cart.reduce((acc, item) => {
    const itemPrice = item.customPrice || item.product.price;
    return acc + itemPrice * item.quantity;
  }, 0);

  // Delivery fee logic
  const getDeliveryFee = () => {
    if (subtotal === 0) return 0;
    if (subtotal >= 1000) return 0; // Free shipping over 1000 ₪
    if (selectedCity.includes("القدس")) return 30;
    if (selectedCity.includes("الداخل")) return 50;
    if (selectedCity.includes("غزة")) return 35;
    if (selectedCity.includes("أريحا")) return 25;
    return 20;
  };

  const deliveryFee = getDeliveryFee();

  // Coupon discount calculation
  const discount = Math.round((subtotal * discountPercent) / 100);
  const total = Math.max(0, subtotal - discount + deliveryFee);
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const applyDiscountCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === "NITRO10") {
      setDiscountCode("NITRO10");
      setDiscountPercent(10);
      return { success: true, message: "مبروك! تم تفعيل خصم 10% بنجاح 🔥" };
    } else if (clean === "SUPERGAME" || clean === "SUPERGAMES") {
      setDiscountCode("SUPERGAMES");
      setDiscountPercent(15);
      return { success: true, message: "كود سوبر قيمز الحصري: تم تفعيل خصم 15% 🚀" };
    } else if (clean === "PALESTINE") {
      setDiscountCode("PALESTINE");
      setDiscountPercent(5);
      return { success: true, message: "فخر فلسطين: تم تطبيق خصم 5% ودعم الشحن 🇵🇸" };
    } else {
      return { success: false, message: "كود الخصم غير صالح أو منتهي الصلاحية" };
    }
  };

  const removeDiscountCode = () => {
    setDiscountCode("");
    setDiscountPercent(0);
    showToast("تمت إزالة كود الخصم");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        discount,
        discountCode,
        applyDiscountCode,
        removeDiscountCode,
        deliveryFee,
        selectedCity,
        setSelectedCity,
        total,
        totalItemsCount,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        quickViewProduct,
        setQuickViewProduct,
        wishlist,
        toggleWishlist,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
