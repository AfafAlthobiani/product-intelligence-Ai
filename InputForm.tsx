import React, { useState } from "react";
import { ProductInput } from "./types";
import { Package, Tag, Users, Wallet, Percent, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface Props {
  onSubmit: (input: ProductInput) => void;
  isLoading: boolean;
}

export default function InputForm({ onSubmit, isLoading }: Props) {
  const [formData, setFormData] = useState<ProductInput>({
    name: "",
    category: "",
    targetAudience: "",
    costPrice: 0,
    desiredMargin: 30,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-xl border border-zinc-100"
      dir="rtl"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-emerald-50 rounded-2xl">
          <Sparkles className="w-6 h-6 text-emerald-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-zinc-900">تحليل ذكاء المنتج</h2>
          <p className="text-zinc-500">أدخل تفاصيل منتجك للحصول على تحليل سوقي عميق</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-zinc-700">
              <Package className="w-4 h-4" /> اسم المنتج
            </label>
            <input
              required
              type="text"
              placeholder="مثال: عباية حرير فاخرة"
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-zinc-700">
              <Tag className="w-4 h-4" /> التصنيف
            </label>
            <input
              required
              type="text"
              placeholder="مثال: أزياء نسائية"
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-zinc-700">
            <Users className="w-4 h-4" /> الجمهور المستهدف
          </label>
          <input
            required
            type="text"
            placeholder="مثال: سيدات الأعمال في الرياض وجدة"
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
            value={formData.targetAudience}
            onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-zinc-700">
              <Wallet className="w-4 h-4" /> سعر التكلفة (SAR)
            </label>
            <input
              required
              type="number"
              min="0"
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
              value={formData.costPrice || ""}
              onChange={(e) => setFormData({ ...formData, costPrice: Number(e.target.value) })}
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-zinc-700">
              <Percent className="w-4 h-4" /> هامش الربح المطلوب (%)
            </label>
            <input
              required
              type="number"
              min="1"
              max="1000"
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
              value={formData.desiredMargin}
              onChange={(e) => setFormData({ ...formData, desiredMargin: Number(e.target.value) })}
            />
          </div>
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              جاري التحليل...
            </>
          ) : (
            <>
              بدء التحليل الذكي
              <Sparkles className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}
