import React, { useState } from "react";
import { ContentStrategy as ContentStrategyType } from "../types";
import { Heart, Shield, Zap, CheckCircle2, MessageCircle, Share2, Search, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Props {
  strategies: ContentStrategyType[];
}

export default function ContentStrategy({ strategies }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "Emotional": return <Heart className="w-5 h-5" />;
      case "Authority": return <Shield className="w-5 h-5" />;
      case "Value": return <Zap className="w-5 h-5" />;
      default: return <Zap className="w-5 h-5" />;
    }
  };

  const current = strategies[activeIndex];

  return (
    <div className="space-y-8" dir="rtl">
      <div className="flex flex-wrap gap-4 p-2 bg-zinc-100 rounded-2xl w-fit">
        {strategies.map((s, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              activeIndex === i 
                ? "bg-white text-zinc-900 shadow-sm" 
                : "text-zinc-500 hover:text-zinc-700"
            }`}
          >
            {getIcon(s.type)}
            {s.type === "Emotional" ? "تحويل عاطفي" : s.type === "Authority" ? "سلطة وثقة" : "قيمة ذكية"}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">العنوان الرئيسي</span>
                <h3 className="text-3xl font-black text-zinc-900 leading-tight">{current.headline}</h3>
              </div>
              
              <div className="space-y-2">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">الخطاف (Hook)</span>
                <p className="text-xl text-zinc-600 italic leading-relaxed">"{current.hook}"</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-zinc-50">
                <div className="space-y-4">
                  <h4 className="font-bold flex items-center gap-2 text-zinc-900">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" /> المميزات والفوائد
                  </h4>
                  <ul className="space-y-3">
                    {(current.benefits || []).map((b, i) => (
                      <li key={i} className="text-zinc-600 flex items-start gap-2">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-200 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold flex items-center gap-2 text-zinc-900">
                    <MessageCircle className="w-5 h-5 text-blue-500" /> التعامل مع الاعتراضات
                  </h4>
                  <div className="space-y-4">
                    {(current.objectionHandling || []).map((obj, i) => (
                      <div key={i} className="bg-zinc-50 p-4 rounded-xl space-y-1">
                        <p className="text-sm font-bold text-zinc-700 italic">"{obj.objection}"</p>
                        <p className="text-sm text-zinc-600">{obj.response}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-8 flex items-center justify-between">
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-emerald-200 transition-all flex items-center gap-2">
                  {current.cta}
                  <Zap className="w-5 h-5" />
                </button>
                <div className="flex gap-2">
                  <button className="p-3 bg-zinc-100 hover:bg-zinc-200 rounded-xl transition-all">
                    <Share2 className="w-5 h-5 text-zinc-600" />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 text-white p-8 rounded-3xl shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Search className="w-5 h-5 text-emerald-400" /> وصف SEO طويل
                </h3>
                <button 
                  onClick={() => copyToClipboard(current.seoDescription, "seo")}
                  className="p-2 hover:bg-white/10 rounded-lg transition-all"
                >
                  {copied === "seo" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-zinc-300 leading-relaxed">{current.seoDescription}</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold flex items-center gap-2 text-zinc-900">
                  <Share2 className="w-5 h-5 text-blue-500" /> نص إعلاني قصير
                </h3>
                <button 
                  onClick={() => copyToClipboard(current.adCopy, "ad")}
                  className="p-2 hover:bg-zinc-100 rounded-lg transition-all"
                >
                  {copied === "ad" ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-zinc-400" />}
                </button>
              </div>
              <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100">
                <p className="text-zinc-700 whitespace-pre-wrap leading-relaxed">{current.adCopy}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full">#إعلان</span>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full">#تسويق</span>
                <span className="px-3 py-1 bg-amber-50 text-amber-600 text-xs font-bold rounded-full">#فرصة</span>
              </div>
            </div>

            <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100 space-y-4">
              <h4 className="font-bold text-emerald-900">لماذا تختار هذه الاستراتيجية؟</h4>
              <p className="text-emerald-800 text-sm leading-relaxed">
                {current.type === "Emotional" 
                  ? "تركز هذه الاستراتيجية على بناء رابط عاطفي قوي مع العميل، مما يقلل من حساسية السعر ويزيد من الولاء للعلامة التجارية."
                  : current.type === "Authority"
                  ? "تركز هذه الاستراتيجية على بناء المصداقية والخبرة، مما يجعل العميل يشعر بالأمان والثقة قبل اتخاذ قرار الشراء."
                  : "تركز هذه الاستراتيجية على القيمة المضافة والذكاء في الشراء، مما يجذب العملاء الباحثين عن أفضل عائد مقابل استثمارهم."}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
