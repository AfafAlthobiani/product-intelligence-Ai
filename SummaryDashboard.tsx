import React from "react";
import { AnalysisResult } from "./types";
import { Award, Target, TrendingUp, AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface Props {
  result: AnalysisResult;
}

export default function SummaryDashboard({ result }: Props) {
  const { recommendation } = result;

  return (
    <div className="space-y-8" dir="rtl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-emerald-600 text-white p-10 rounded-3xl shadow-xl shadow-emerald-100 relative overflow-hidden flex flex-col justify-between"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-white/20 rounded-2xl">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold">الاستراتيجية الموصى بها</h3>
            </div>
            <h4 className="text-4xl font-black mb-6 leading-tight">{recommendation.bestStrategy}</h4>
            <p className="text-emerald-100 text-lg leading-relaxed mb-8">{recommendation.why}</p>
          </div>
          
          <div className="relative z-10 flex items-center gap-4 p-4 bg-white/10 rounded-2xl border border-white/20">
            <CheckCircle2 className="w-6 h-6 text-emerald-300" />
            <p className="text-sm font-medium">هذه الاستراتيجية تحقق أعلى توازن بين الربحية والنمو.</p>
          </div>

          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-500 rounded-full blur-3xl opacity-50" />
        </motion.div>

        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-50 rounded-xl">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900">التأثير المتوقع</h3>
            </div>
            <p className="text-zinc-600 text-lg leading-relaxed">{recommendation.impact}</p>
          </div>

          <div className="bg-amber-50 p-8 rounded-3xl border border-amber-100 space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-amber-100 rounded-xl">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-amber-900">تقييم المخاطر</h3>
            </div>
            <p className="text-amber-800 text-lg leading-relaxed">{recommendation.riskAssessment}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm overflow-hidden">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-zinc-900">
          <TrendingUp className="w-5 h-5 text-emerald-600" /> مقارنة خيارات التسعير
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="border-b border-zinc-100">
                <th className="pb-4 font-bold text-zinc-500 text-sm">الخيار</th>
                <th className="pb-4 font-bold text-zinc-500 text-sm">السعر (SAR)</th>
                <th className="pb-4 font-bold text-zinc-500 text-sm">صافي الربح</th>
                <th className="pb-4 font-bold text-zinc-500 text-sm">الهامش</th>
                <th className="pb-4 font-bold text-zinc-500 text-sm">المخاطرة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {[result.pricingEngine.safe, result.pricingEngine.aggressive, result.pricingEngine.premium].map((option, i) => (
                <tr key={i} className="group hover:bg-zinc-50 transition-all">
                  <td className="py-5 font-bold text-zinc-900">{option.label}</td>
                  <td className="py-5 text-zinc-600 font-medium">{option.price}</td>
                  <td className="py-5 text-emerald-600 font-bold">+{option.profit} SAR</td>
                  <td className="py-5 text-zinc-600">{option.margin}%</td>
                  <td className="py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      option.riskLevel === "Low" ? "bg-emerald-100 text-emerald-700" :
                      option.riskLevel === "Medium" ? "bg-blue-100 text-blue-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      {option.riskLevel === "Low" ? "منخفضة" : option.riskLevel === "Medium" ? "متوسطة" : "عالية"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-zinc-900 text-white p-10 rounded-3xl shadow-xl">
        <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
          <Target className="w-6 h-6 text-emerald-400" /> خطوات التنفيذ القادمة
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { step: "1", title: "تحديث المحتوى", desc: "ابدأ بتطبيق العناوين والخطافات المقترحة في صفحة المنتج." },
            { step: "2", title: "اختبار السعر", desc: "طبق السعر الآمن لمدة أسبوعين وراقب معدل التحويل." },
            { step: "3", title: "إطلاق العرض", desc: "فعل عرض الحزمة (Bundle) لزيادة متوسط قيمة الطلب." }
          ].map((item, i) => (
            <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-3">
              <span className="text-4xl font-black text-emerald-500/30">{item.step}</span>
              <h4 className="text-lg font-bold">{item.title}</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
