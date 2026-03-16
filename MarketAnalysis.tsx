import React from "react";
import { MarketAnalysis as MarketAnalysisType } from "../types";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { TrendingUp, Target, Users, Layout, FileText, Info } from "lucide-react";

interface Props {
  data: MarketAnalysisType;
}

export default function MarketAnalysis({ data }: Props) {
  const chartData = data.competitors.map(c => ({
    name: c.name,
    price: c.price,
  }));

  return (
    <div className="space-y-8" dir="rtl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 rounded-xl">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-bold text-zinc-900">متوسط سعر السوق</h3>
          </div>
          <p className="text-3xl font-bold text-blue-600">{data.averagePrice} SAR</p>
          <p className="text-sm text-zinc-500 mt-2">النطاق: {data.priceRange.min} - {data.priceRange.max} SAR</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-50 rounded-xl">
              <Target className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="font-bold text-zinc-900">استراتيجية التسعير الشائعة</h3>
          </div>
          <p className="text-lg font-medium text-emerald-700">{data.commonPricingStrategy}</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-50 rounded-xl">
              <Users className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="font-bold text-zinc-900">التموضع السوقي</h3>
          </div>
          <p className="text-lg font-medium text-amber-700">{data.positioning}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-zinc-400" /> مقارنة أسعار المنافسين
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="price" radius={[8, 8, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#10b981' : '#3b82f6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Layout className="w-5 h-5 text-zinc-400" /> اتجاهات المحتوى
            </h3>
            <p className="text-zinc-600 leading-relaxed">{data.contentTrends}</p>
          </div>
          <div className="pt-6 border-t border-zinc-50">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-zinc-400" /> فجوات التموضع (فرص)
            </h3>
            <ul className="space-y-3">
              {(data.positioningGaps || []).map((gap, i) => (
                <li key={i} className="flex items-start gap-3 text-zinc-600">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  {gap}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900 text-white p-8 rounded-3xl shadow-xl">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Info className="w-5 h-5 text-emerald-400" /> ملخص السوق
        </h3>
        <p className="text-zinc-300 leading-relaxed text-lg">{data.marketSummary}</p>
      </div>
    </div>
  );
}
