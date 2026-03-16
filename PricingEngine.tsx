import React from "react";
import { PricingOption } from "../types";
import { ShieldCheck, Rocket, Crown, ArrowUpRight, AlertCircle, Info } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface Props {
  pricing: {
    safe: PricingOption;
    aggressive: PricingOption;
    premium: PricingOption;
  };
}

export default function PricingEngine({ pricing }: Props) {
  const options = [pricing.safe, pricing.aggressive, pricing.premium];
  
  const chartData = options.map(o => ({
    name: o.label,
    profit: o.profit,
    price: o.price
  }));

  return (
    <div className="space-y-8" dir="rtl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {options.map((option, i) => (
          <div 
            key={i}
            className={`relative overflow-hidden bg-white p-8 rounded-3xl border transition-all hover:shadow-xl ${
              option.label.includes("Premium") || option.label.includes("بريميوم") || option.label.includes("تميز")
                ? "border-amber-200 shadow-amber-50" 
                : "border-zinc-100 shadow-sm"
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className={`p-3 rounded-2xl ${
                i === 0 ? "bg-emerald-50 text-emerald-600" :
                i === 1 ? "bg-blue-50 text-blue-600" :
                "bg-amber-50 text-amber-600"
              }`}>
                {i === 0 ? <ShieldCheck className="w-6 h-6" /> :
                 i === 1 ? <Rocket className="w-6 h-6" /> :
                 <Crown className="w-6 h-6" />}
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                option.riskLevel === "Low" ? "bg-emerald-100 text-emerald-700" :
                option.riskLevel === "Medium" ? "bg-blue-100 text-blue-700" :
                "bg-red-100 text-red-700"
              }`}>
                مخاطرة {option.riskLevel === "Low" ? "منخفضة" : option.riskLevel === "Medium" ? "متوسطة" : "عالية"}
              </div>
            </div>

            <h3 className="text-xl font-bold text-zinc-900 mb-2">{option.label}</h3>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-4xl font-black text-zinc-900">{option.price}</span>
              <span className="text-zinc-500 font-bold">SAR</span>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-500">صافي الربح</span>
                <span className="font-bold text-emerald-600">+{option.profit} SAR</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-500">هامش الربح</span>
                <span className="font-bold text-zinc-900">{option.margin}%</span>
              </div>
              <div className="pt-4 border-t border-zinc-50">
                <p className="text-xs text-zinc-400 mb-1">تأثير التحويل المتوقع</p>
                <p className="text-sm font-medium text-zinc-700">{option.conversionImpact}</p>
              </div>
            </div>

            <div className="bg-zinc-50 p-4 rounded-2xl">
              <p className="text-xs text-zinc-500 leading-relaxed">
                <Info className="w-3 h-3 inline-block ml-1 mb-0.5" />
                {option.logic}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <ArrowUpRight className="w-5 h-5 text-emerald-500" /> محاكاة الأرباح لكل وحدة
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="profit" radius={[8, 8, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#10b981' : index === 1 ? '#3b82f6' : '#f59e0b'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-zinc-900 text-white p-8 rounded-3xl shadow-xl flex flex-col justify-center">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-red-500/20 rounded-2xl">
              <AlertCircle className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">تنبيه استراتيجي</h3>
              <p className="text-zinc-400 leading-relaxed">
                يعتمد نجاح التسعير "المتميز" على جودة المحتوى وتجربة العميل. إذا لم تكن علامتك التجارية معروفة بعد، ننصح بالبدء بالتسعير "الآمن" أو "الهجومي" لبناء قاعدة عملاء أولاً.
              </p>
              <div className="mt-6 flex gap-4">
                <div className="bg-white/5 p-4 rounded-2xl flex-1">
                  <p className="text-xs text-zinc-500 mb-1">أعلى ربح ممكن</p>
                  <p className="text-2xl font-bold text-amber-400">{pricing.premium.profit} SAR</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl flex-1">
                  <p className="text-xs text-zinc-500 mb-1">أقل مخاطرة</p>
                  <p className="text-2xl font-bold text-emerald-400">{pricing.safe.profit} SAR</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
