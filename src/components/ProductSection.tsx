"use client";

import React, { useState, useMemo } from "react";
import { Product, CategoryType } from "@/lib/data";
import { ProductCard } from "./ProductCard";
import { Sparkles, ArrowUpDown, Keyboard, Mouse, Square, Mic, Headphones, Flame, Zap } from "lucide-react";

interface ProductSectionProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
}

export const ProductSection: React.FC<ProductSectionProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  searchQuery,
}) => {
  const [filterTab, setFilterTab] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("popular");

  const filterTabs = [
    { id: "all", label: "جميع الأقسام", icon: Sparkles },
    { id: "keyboards", label: "كيبورد", icon: Keyboard },
    { id: "mice", label: "ماوس", icon: Mouse },
    { id: "mousepads", label: "ماوس باد", icon: Square },
    { id: "microphones", label: "مايك", icon: Mic },
    { id: "headsets", label: "سماعات", icon: Headphones },
    { id: "bestseller", label: "الأكثر طلباً 🔥", icon: Flame },
  ];

  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category or Tab filter
    if (selectedCategory && selectedCategory !== "all") {
      list = list.filter((p) => p.category === selectedCategory);
    } else if (filterTab === "bestseller") {
      list = list.filter((p) => p.isFeatured || (p.discountPercent && p.discountPercent >= 16));
    } else if (filterTab !== "all") {
      list = list.filter((p) => p.category === filterTab);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Sorting
    return list.sort((a, b) => {
      if (sortBy === "price_asc") return a.price - b.price;
      if (sortBy === "price_desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return b.reviewCount - a.reviewCount;
    });
  }, [products, selectedCategory, filterTab, searchQuery, sortBy]);

  return (
    <section id="products" className="py-14 relative bg-[#070b14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#00a3ff] uppercase tracking-wider mb-2">
              <Zap className="w-4 h-4 text-[#00a3ff]" />
              <span>كتالوج الأجهزة والعتاد الاحترافي</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-['Cairo']">
              عتاد الجيمينج الأصلي مع <span className="text-[#00a3ff] neon-cyan-text">كفالة سنة كاملة</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              تصفح الكيبوردات، الماوسات، الماوس باد، المايكات، والسماعات المعتمدة لدى محترفي الرياضات الإلكترونية.
            </p>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <ArrowUpDown className="w-4 h-4 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#0b1120] border border-[#1c2942] text-xs font-bold text-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#00a3ff]"
            >
              <option value="popular">الأكثر طلباً وشعبية</option>
              <option value="rating">الأعلى تقييماً (5 نجوم)</option>
              <option value="price_asc">السعر: من الأقل للأعلى</option>
              <option value="price_desc">السعر: من الأعلى للأقل</option>
            </select>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {filterTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive =
              selectedCategory === "all" || !selectedCategory
                ? filterTab === tab.id
                : selectedCategory === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => {
                  onSelectCategory("all");
                  setFilterTab(tab.id);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? "bg-[#00a3ff] text-black font-extrabold shadow-[0_0_15px_rgba(0,163,255,0.3)] scale-105"
                    : "bg-[#0b1120] text-gray-300 border border-[#1c2942] hover:border-[#00a3ff]/50 hover:text-white"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Search / Category Indicator */}
        {(searchQuery || (selectedCategory && selectedCategory !== "all")) && (
          <div className="mb-6 flex items-center justify-between p-3.5 rounded-xl bg-[#0b1120] border border-[#1c2942] text-xs">
            <span className="text-gray-300">
              {searchQuery && `نتائج البحث عن: "${searchQuery}"`}
              {selectedCategory && selectedCategory !== "all" && ` • القسم المحدد: ${selectedCategory}`}
              {` (${filteredProducts.length} منتج)`}
            </span>
            <button
              onClick={() => {
                onSelectCategory("all");
                setFilterTab("all");
              }}
              className="text-[#00a3ff] hover:underline font-bold"
            >
              إلغاء الفلترة وعرض الكل
            </button>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {filteredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 rounded-2xl bg-[#0b1120] border border-[#1c2942] space-y-3">
            <div className="text-4xl">⚡</div>
            <h3 className="text-lg font-bold text-white">لم يتم العثور على منتجات مطابقة</h3>
            <p className="text-xs text-gray-400">
              جرّب البحث بكلمات أخرى أو اختر قسماً آخر من الأقسام الخمسة.
            </p>
            <button
              onClick={() => {
                onSelectCategory("all");
                setFilterTab("all");
              }}
              className="mt-3 px-5 py-2.5 rounded-xl btn-cyber-cyan text-black font-bold text-xs"
            >
              عرض جميع الأقسام
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
