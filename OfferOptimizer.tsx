import React from "react";
import { OfferIdea } from "../types";
import { Gift, Timer, ShoppingBag, TrendingUp, Calculator, BrainCircuit } from "lucide-react";

interface Props {
  offers: OfferIdea[];
}

export default function OfferOptimizer({ offers }: Props) {
  const getIcon = (title: string) => {
    if (title.includes("حزمة") || title.includes("Bundle")) return <Gift className="w-6 h-6" />;
    if (title.includes("ندرة") || title.includes("Scarcity") || title.includes("وقت")) return <Timer className="w-6 h-6" />;
    return <ShoppingBag className="w-6 h-6" />;
  };

  return (
    <div className="space-y-8" dir="rtl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {offers.map((offer, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm hover:shadow-xl transition-all">
            <div className={`p-3 rounded-2xl w-fit mb-6 ${
              i === 0 ? "bg-emerald-50 text-emerald-600" :
              i === 1 ? "bg-blue-50 text-blue-600" :
              "bg-amber-50 text-amber-600"
            }`}>
              {getIcon(offer.title)}
            </div>

            <h3 className="text-xl font-bold text-zinc-900 mb-2">{offer.title}</h3>
            <p className="text-zinc-500 text-sm leading-relaxed mb-8">{offer.description}</p>

            <div className="space-y-4 pt-6 border-t border-zinc-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <TrendingUp className="w-4 h-4" /> تأثير الربح الصافي
                </div>
                <span className="font-bold text-emerald-600">+{offer.netProfitImpact} SAR</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <Calculator className="w-4 h-4" /> كمية نقطة التعادل
                </div>
                <span className="font-bold text-zinc-900">{offer.breakEvenQuantity} وحدة</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <BrainCircuit className="w-4 h-4" /> المحفز النفسي
                </div>
                <span className="px-3 py-1 bg-zinc-100 text-zinc-700 text-[10px] font-bold rounded-full uppercase">
                  {offer.psychologicalTrigger}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-600 text-white p-10 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-4">لماذا العروض المخصصة؟</h3>
          <p className="text-blue-100 text-lg leading-relaxed max-w-2xl">
            العروض ليست مجرد تخفيضات؛ إنها أدوات لزيادة قيمة سلة المشتريات (AOV) وتقليل تكلفة اكتساب العميل (CAC). العروض المقترحة أعلاه مصممة لتناسب سلوك المستهلك في الخليج الذي يفضل "القيمة المضافة" على "التخفيض المباشر".
          </p>
        </div>
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-500 rounded-full blur-3xl opacity-50" />
        <div className="absolute -left-20 -top-20 w-80 h-80 bg-blue-400 rounded-full blur-3xl opacity-30" />
      </div>
    </div>
  );
}
