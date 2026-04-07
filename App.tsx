import React, { useState } from "react";
import { ProductInput, AnalysisResult } from "./types";
import { analyzeProduct } from "./gemini";
import InputForm from "./InputForm";
import MarketAnalysis from "./MarketAnalysis";
import ContentStrategy from "./ContentStrategy";
import PricingEngine from "./PricingEngine";
import OfferOptimizer from "./OfferOptimizer";
import SummaryDashboard from "./SummaryDashboard";
import { LayoutDashboard, TrendingUp, FileText, Wallet, Gift, Sparkles, RefreshCcw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Helmet } from "react-helmet-async";

type Tab = "summary" | "market" | "content" | "pricing" | "offers";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("summary");
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (input: ProductInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await analyzeProduct(input);
      setResult(data);
      setActiveTab("summary");
      
      // SEO Ping to notify search engines (simulated)
      try {
        await fetch("/api/seo/ping", { method: "POST" });
      } catch (pingErr) {
        console.warn("SEO Ping failed, but analysis succeeded:", pingErr);
      }
    } catch (err) {
      console.error(err);
      setError("حدث خطأ أثناء تحليل البيانات. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setActiveTab("summary");
  };

  const seoData = result ? {
    title: `تحليل منتج ${result.marketAnalysis.averagePrice} | Product Intelligence AI`,
    description: result.recommendation.why,
    keywords: `${result.marketAnalysis.contentTrends}, تحليل السوق, تسعير المنتجات`,
    url: window.location.href,
    image: "https://picsum.photos/seed/seo/1200/630"
  } : {
    title: "Product Intelligence AI - Smart Market Analyzer",
    description: "نظام ذكاء اصطناعي متطور يحلل السوق، المنافسين، وسلوك المستهلك في الخليج ليمنحك أفضل تسعير ومحتوى تسويقي.",
    keywords: "ذكاء اصطناعي, تحليل سوق, تجارة إلكترونية, الخليج, تسعير, محتوى تسويقي",
    url: window.location.href,
    image: "https://picsum.photos/seed/main/1200/630"
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-emerald-100 selection:text-emerald-900" dir="rtl">
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />
        <link rel="canonical" href={seoData.url} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={seoData.url} />
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:image" content={seoData.image} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={seoData.url} />
        <meta property="twitter:title" content={seoData.title} />
        <meta property="twitter:description" content={seoData.description} />
        <meta property="twitter:image" content={seoData.image} />

        {/* Structured Data JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Product Intelligence AI",
            "description": seoData.description,
            "url": seoData.url,
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "All",
            "author": {
              "@type": "Person",
              "name": "OwnerAfaf"
            }
          })}
        </script>
      </Helmet>

      {/* Header */}
      <header className="bg-white border-b border-zinc-100 sticky top-0 z-50 backdrop-blur-xl bg-white/80">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-600 rounded-2xl shadow-lg shadow-emerald-200">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black text-zinc-900 tracking-tight">Product Intelligence AI</h1>
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Smart Market Analyzer</p>
            </div>
          </div>
          
          {result && (
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-zinc-500 hover:text-zinc-900 transition-all bg-zinc-50 hover:bg-zinc-100 rounded-xl"
            >
              <RefreshCcw className="w-4 h-4" />
              تحليل جديد
            </button>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-24 space-y-8 text-center"
            >
              <div className="relative">
                <div className="w-24 h-24 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin" />
                <Sparkles className="w-8 h-8 text-emerald-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-zinc-900">جاري تحليل السوق...</h3>
                <p className="text-zinc-500 max-w-md mx-auto">
                  يقوم نظام الذكاء الاصطناعي الآن بمحاكاة المنافسين وتحليل استراتيجيات التسعير المثالية لمنتجك.
                </p>
              </div>
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" />
              </div>
            </motion.div>
          ) : !result ? (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <div className="text-center space-y-4 max-w-3xl mx-auto">
                <h2 className="text-5xl font-black text-zinc-900 leading-tight">
                  حول بيانات منتجك إلى <span className="text-emerald-600">استراتيجية رابحة</span>
                </h2>
                <p className="text-xl text-zinc-500 leading-relaxed">
                  نظام ذكاء اصطناعي متطور يحلل السوق، المنافسين، وسلوك المستهلك في الخليج ليمنحك أفضل تسعير ومحتوى تسويقي.
                </p>
              </div>
              <InputForm onSubmit={handleAnalyze} isLoading={isLoading} />
              {error && (
                <div className="max-w-2xl mx-auto p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-center font-medium">
                  {error}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              {/* Navigation Tabs */}
              <nav className="flex flex-wrap gap-2 p-1.5 bg-white border border-zinc-100 rounded-3xl shadow-sm w-fit mx-auto sticky top-24 z-40">
                {[
                  { id: "summary", label: "لوحة التحكم", icon: LayoutDashboard },
                  { id: "market", label: "تحليل السوق", icon: TrendingUp },
                  { id: "content", label: "استراتيجية المحتوى", icon: FileText },
                  { id: "pricing", label: "محرك التسعير", icon: Wallet },
                  { id: "offers", label: "محسن العروض", icon: Gift },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as Tab)}
                    className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl font-bold text-sm transition-all ${
                      activeTab === tab.id
                        ? "bg-zinc-900 text-white shadow-lg shadow-zinc-200"
                        : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </nav>

              {/* Tab Content */}
              <div className="mt-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {activeTab === "summary" && <SummaryDashboard result={result} />}
                    {activeTab === "market" && <MarketAnalysis data={result.marketAnalysis} />}
                    {activeTab === "content" && <ContentStrategy strategies={result.contentStrategies} />}
                    {activeTab === "pricing" && <PricingEngine pricing={result.pricingEngine} />}
                    {activeTab === "offers" && <OfferOptimizer offers={result.offerOptimizer} />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-12 border-t border-zinc-100 bg-white text-center">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center gap-4">
          <span className="text-lg font-black text-zinc-900 tracking-widest"> ✦ OwnerAfaf ✦</span>
          
          <div className="flex flex-wrap justify-center gap-6 my-2">
            <a 
              href="https://www.instagram.com/ownerafaf/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-[#E4A5D0] transition-colors text-xs flex items-center gap-1.5 font-medium"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              ownerafaf@
            </a>
            <a 
              href="https://x.com/ownerafaf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-[#A990D4] transition-colors text-xs flex items-center gap-1.5 font-medium"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              ownerafaf@
            </a>
            <a 
              href="https://blogownerafaf.wordpress.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-[#2ECC71] transition-colors text-xs flex items-center gap-1.5 font-medium"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zM2.007 12.279l5.274 14.44A10.019 10.019 0 012 12c0-.241.007-.481.007-.721zm9.993 9.938a9.974 9.974 0 01-2.832-.411l3.007-8.733 3.082 8.445a.956.956 0 00.073.142 9.984 9.984 0 01-3.33.557zm1.37-14.571c.599-.031 1.138-.094 1.138-.094.535-.063.472-.85-.063-.819 0 0-1.611.126-2.65.126-0.977 0-2.619-.126-2.619-.126-.536-.031-.599.787-.063.819 0 0 .507.063 1.044.094l1.55 4.248-2.177 6.527-3.622-10.775c.6-.031 1.138-.094 1.138-.094.535-.063.472-.85-.063-.819 0 0-1.611.126-2.65.126a18.6 18.6 0 01-.432-.008A10.003 10.003 0 0112 2c2.705 0 5.167 1.013 7.02 2.674a6.453 6.453 0 00-.41-.014c-.977 0-1.67.85-1.67 1.762 0 .819.472 1.511.976 2.33.378.662.819 1.511.819 2.738 0 .85-.326 1.836-.756 3.211l-.991 3.312-3.588-10.776z"/></svg>
              المدونة
            </a>
            <a 
              href="https://s.salla.sa/experts/service-provider/1744104089" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-[#00955d] transition-colors text-xs flex items-center gap-1.5 font-medium"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-1 14H5c-.55 0-1-.45-1-1V7c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1zm-7-2l-4-4 1.41-1.41L12 13.17l5.59-5.58L19 9l-7 7z"/></svg>
              مزود خدمات سلة
            </a>
          </div>

          <p className="text-zinc-400 text-sm font-medium">
            خدمات التسويق / تصميم / وحلول الأعمال ·❥ ⍨ 🇸🇦
          </p>
          <p className="text-zinc-300 text-[10px] mt-2">
            © {new Date().getFullYear()} Product Intelligence AI. جميع الحقوق محفوظة.
          </p>
        </div>
      </footer>
    </div>
  );
}
