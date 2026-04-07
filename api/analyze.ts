import { GoogleGenAI, Type, ThinkingLevel } from "@google/genai";

function buildFallbackAnalysis(input: any) {
  const cost = Number(input?.costPrice || 0);
  const margin = Number(input?.desiredMargin || 30);
  const safePrice = Math.round(cost * (1 + margin / 100));
  const aggressivePrice = Math.round(cost * (1 + (margin + 10) / 100));
  const premiumPrice = Math.round(cost * (1 + (margin + 25) / 100));

  const competitors = [
    { name: "المتجر الأول", price: Math.round(cost * 1.2), strategy: "سعر متوسط مع عروض أسبوعية", offer: "شحن مجاني عند 200 ر.س" },
    { name: "المتجر الثاني", price: Math.round(cost * 1.35), strategy: "تركيز على الجودة", offer: "خصم 10% لأول طلب" },
    { name: "المتجر الثالث", price: Math.round(cost * 1.45), strategy: "حزم منتجات", offer: "اشترِ 2 واحصل على 1" },
    { name: "المتجر الرابع", price: Math.round(cost * 1.28), strategy: "سعر تنافسي", offer: "استرجاع مجاني" },
    { name: "المتجر الخامس", price: Math.round(cost * 1.55), strategy: "علامة فاخرة", offer: "تغليف هدية" },
  ];

  const min = Math.min(...competitors.map((c) => c.price));
  const max = Math.max(...competitors.map((c) => c.price));
  const avg = Math.round(competitors.reduce((sum, c) => sum + c.price, 0) / competitors.length);

  return {
    marketAnalysis: {
      competitors,
      averagePrice: avg,
      priceRange: { min, max },
      commonPricingStrategy: "التسعير المتوسط مع عروض دورية",
      commonOffers: ["شحن مجاني", "خصم أول طلب", "حزم توفير"],
      contentTrends: "المحتوى القصير مع إثبات اجتماعي قبل/بعد",
      descriptionLength: "متوسط إلى طويل",
      positioning: "Mixed",
      marketSummary: "السوق تنافسي ويكافئ الجمع بين القيمة والسرد العاطفي.",
      positioningGaps: ["ضمانات أوضح", "مقارنات فوائد مباشرة", "قصص عملاء أكثر"],
    },
    contentStrategies: [
      {
        type: "Emotional",
        headline: `غيّر تجربة ${input?.name || "منتجك"} اليوم`,
        hook: "رسالة عاطفية تربط المنتج بنمط الحياة.",
        benefits: ["رفع الثقة", "تجربة استخدام أفضل", "قيمة يومية واضحة"],
        objectionHandling: [{ objection: "السعر مرتفع", response: "القيمة الممتدة والعمر الأطول تقلل التكلفة الفعلية." }],
        cta: "ابدأ الآن",
        adCopy: "منتج مصمم ليعطيك فرقًا واضحًا من أول استخدام.",
        seoDescription: "تحليل ومزايا المنتج مع قيمة حقيقية للمستخدم.",
      },
      {
        type: "Authority",
        headline: "جودة موثقة بمعايير واضحة",
        hook: "اعرض حقائق ومقارنات مختصرة مدعومة بالبيانات.",
        benefits: ["تقليل التردد", "بناء الثقة", "رفع معدل التحويل"],
        objectionHandling: [{ objection: "هل هو مناسب؟", response: "نعرض حالات استخدام عملية تناسب شرائح متعددة." }],
        cta: "شاهد التفاصيل",
        adCopy: "بيانات واضحة ونتائج موثوقة لاتخاذ قرار شراء أسرع.",
        seoDescription: "دليل موثوق لاختيار المنتج المناسب.",
      },
      {
        type: "Value",
        headline: "أفضل قيمة مقابل السعر",
        hook: "قارن ما تدفعه بما تحصل عليه فعليًا.",
        benefits: ["سعر تنافسي", "مزايا عملية", "عرض واضح للعائد"],
        objectionHandling: [{ objection: "أبحث عن الأرخص", response: "الأهم هو تكلفة التملك الكلية لا سعر الشراء فقط." }],
        cta: "احسب توفيرك",
        adCopy: "حل عملي يمنحك قيمة أعلى بتكلفة مدروسة.",
        seoDescription: "منتج يقدم قيمة عالية وسعرًا مدروسًا.",
      },
    ],
    pricingEngine: {
      safe: {
        label: "Safe",
        price: safePrice,
        profit: safePrice - cost,
        margin: margin,
        riskLevel: "Low",
        conversionImpact: "مرتفع",
        logic: "يحافظ على تنافسية السعر مع ربح مستقر.",
      },
      aggressive: {
        label: "Aggressive",
        price: aggressivePrice,
        profit: aggressivePrice - cost,
        margin: margin + 10,
        riskLevel: "Medium",
        conversionImpact: "متوسط",
        logic: "يزيد الربح مع احتمالية انخفاض بسيط في التحويل.",
      },
      premium: {
        label: "Premium",
        price: premiumPrice,
        profit: premiumPrice - cost,
        margin: margin + 25,
        riskLevel: "High",
        conversionImpact: "أقل",
        logic: "يتطلب تموضعًا قويًا وتجربة علامة مميزة.",
      },
    },
    offerOptimizer: [
      {
        title: "حزمة قيمة",
        description: "دمج المنتج مع ملحق مكمل بسعر أقل من الشراء المنفصل.",
        netProfitImpact: Math.round((safePrice - cost) * 1.6),
        breakEvenQuantity: 25,
        psychologicalTrigger: "إدراك التوفير",
      },
      {
        title: "عرض محدود الوقت",
        description: "خصم قصير المدة لدفع قرار الشراء بسرعة.",
        netProfitImpact: Math.round((safePrice - cost) * 1.3),
        breakEvenQuantity: 30,
        psychologicalTrigger: "الندرة",
      },
      {
        title: "هدية مع الطلب",
        description: "إضافة هدية منخفضة التكلفة لرفع القيمة المدركة.",
        netProfitImpact: Math.round((safePrice - cost) * 1.2),
        breakEvenQuantity: 35,
        psychologicalTrigger: "المكافأة الفورية",
      },
    ],
    recommendation: {
      bestStrategy: "التسعير الآمن + محتوى قيمة",
      why: "أفضل توازن بين الربحية والاستقرار في التحويل.",
      impact: "تحسين متوقع في معدل التحويل مع نمو ربح تدريجي.",
      riskAssessment: "منخفض إلى متوسط",
    },
    deepSearchOutput: {
      summary: "نتيجة افتراضية: تم إنشاء التحليل محليًا لعرض النتائج لأن مفتاح Gemini غير متاح حاليًا.",
      keyFindings: [
        "السوق حساس للسعر مع تفضيل العروض المركبة.",
        "المحتوى المعتمد على القيمة يرفع الثقة والتحويل.",
        "التموضع المختلط (قيمة + موثوقية) الأنسب كبداية.",
      ],
      sources: [],
    },
  };
}

function extractTextFromResponse(response: any): string {
  if (typeof response?.text === "function") {
    const textValue = response.text();
    if (typeof textValue === "string" && textValue.trim()) {
      return textValue;
    }
  }

  if (typeof response?.text === "string" && response.text.trim()) {
    return response.text;
  }

  const parts = response?.candidates?.[0]?.content?.parts;
  if (Array.isArray(parts)) {
    const collected = parts
      .map((part: any) => (typeof part?.text === "string" ? part.text : ""))
      .join("\n")
      .trim();
    if (collected) return collected;
  }

  return "";
}

function extractFirstJsonObject(raw: string): string {
  const cleaned = raw.replace(/```json|```/gi, "").trim();
  const start = cleaned.indexOf("{");
  if (start === -1) return cleaned;

  let depth = 0;
  let inString = false;
  let isEscaped = false;

  for (let i = start; i < cleaned.length; i++) {
    const char = cleaned[i];

    if (inString) {
      if (isEscaped) {
        isEscaped = false;
      } else if (char === "\\") {
        isEscaped = true;
      } else if (char === '"') {
        inString = false;
      }
      continue;
    }

    if (char === '"') {
      inString = true;
      continue;
    }

    if (char === "{") depth += 1;
    if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        return cleaned.slice(start, i + 1);
      }
    }
  }

  return cleaned;
}

function extractGroundedSources(response: any): { title: string; url: string }[] {
  const chunks = response?.candidates?.[0]?.groundingMetadata?.groundingChunks;
  if (!Array.isArray(chunks)) return [];

  const seen = new Set<string>();
  const sources: { title: string; url: string }[] = [];

  for (const chunk of chunks) {
    const title = chunk?.web?.title;
    const url = chunk?.web?.uri;
    if (typeof title !== "string" || typeof url !== "string") continue;
    if (seen.has(url)) continue;

    seen.add(url);
    sources.push({ title, url });
  }

  return sources;
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(200).json(buildFallbackAnalysis(req.body || {}));
  }

  try {
    const input = req.body || {};
    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
      Act as a Senior AI Product Strategist and Market Analyst.
      Analyze this product for a Gulf merchant:
      - Name: ${input.name}
      - Category: ${input.category}
      - Audience: ${input.targetAudience}
      - Cost: ${input.costPrice} SAR
      - Margin: ${input.desiredMargin}%

      Output a JSON report in Arabic covering:
      1. Competitor simulation (5-10 competitors).
      2. Market analysis (avg price, range, trends).
      3. 3 Content strategies (Emotional, Authority, Value).
      4. 3 Pricing options (Safe, Aggressive, Premium) based on ${input.costPrice} SAR cost.
      5. 3 Offer ideas.
      6. Final recommendation.
      7. Deep search output: short summary, key findings, and verified source URLs.

      Use professional Arabic. Data-driven logic only.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            marketAnalysis: {
              type: Type.OBJECT,
              properties: {
                competitors: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      price: { type: Type.NUMBER },
                      strategy: { type: Type.STRING },
                      offer: { type: Type.STRING }
                    }
                  }
                },
                averagePrice: { type: Type.NUMBER },
                priceRange: {
                  type: Type.OBJECT,
                  properties: {
                    min: { type: Type.NUMBER },
                    max: { type: Type.NUMBER }
                  }
                },
                commonPricingStrategy: { type: Type.STRING },
                commonOffers: { type: Type.ARRAY, items: { type: Type.STRING } },
                contentTrends: { type: Type.STRING },
                descriptionLength: { type: Type.STRING },
                positioning: { type: Type.STRING },
                marketSummary: { type: Type.STRING },
                positioningGaps: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            },
            contentStrategies: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  type: { type: Type.STRING },
                  headline: { type: Type.STRING },
                  hook: { type: Type.STRING },
                  benefits: { type: Type.ARRAY, items: { type: Type.STRING } },
                  objectionHandling: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        objection: { type: Type.STRING },
                        response: { type: Type.STRING }
                      }
                    }
                  },
                  cta: { type: Type.STRING },
                  adCopy: { type: Type.STRING },
                  seoDescription: { type: Type.STRING }
                }
              }
            },
            pricingEngine: {
              type: Type.OBJECT,
              properties: {
                safe: {
                  type: Type.OBJECT,
                  properties: {
                    label: { type: Type.STRING },
                    price: { type: Type.NUMBER },
                    profit: { type: Type.NUMBER },
                    margin: { type: Type.NUMBER },
                    riskLevel: { type: Type.STRING },
                    conversionImpact: { type: Type.STRING },
                    logic: { type: Type.STRING }
                  }
                },
                aggressive: {
                  type: Type.OBJECT,
                  properties: {
                    label: { type: Type.STRING },
                    price: { type: Type.NUMBER },
                    profit: { type: Type.NUMBER },
                    margin: { type: Type.NUMBER },
                    riskLevel: { type: Type.STRING },
                    conversionImpact: { type: Type.STRING },
                    logic: { type: Type.STRING }
                  }
                },
                premium: {
                  type: Type.OBJECT,
                  properties: {
                    label: { type: Type.STRING },
                    price: { type: Type.NUMBER },
                    profit: { type: Type.NUMBER },
                    margin: { type: Type.NUMBER },
                    riskLevel: { type: Type.STRING },
                    conversionImpact: { type: Type.STRING },
                    logic: { type: Type.STRING }
                  }
                }
              }
            },
            offerOptimizer: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  netProfitImpact: { type: Type.NUMBER },
                  breakEvenQuantity: { type: Type.NUMBER },
                  psychologicalTrigger: { type: Type.STRING }
                }
              }
            },
            recommendation: {
              type: Type.OBJECT,
              properties: {
                bestStrategy: { type: Type.STRING },
                why: { type: Type.STRING },
                impact: { type: Type.STRING },
                riskAssessment: { type: Type.STRING }
              }
            },
            deepSearchOutput: {
              type: Type.OBJECT,
              properties: {
                summary: { type: Type.STRING },
                keyFindings: { type: Type.ARRAY, items: { type: Type.STRING } },
                sources: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      url: { type: Type.STRING }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });

    const text = extractTextFromResponse(response);
    if (!text) {
      return res.status(502).json({ message: "Empty response from AI" });
    }

    const jsonText = extractFirstJsonObject(text);
    const parsed = JSON.parse(jsonText);

    if (!parsed.deepSearchOutput) {
      parsed.deepSearchOutput = {
        summary: "",
        keyFindings: [],
        sources: extractGroundedSources(response),
      };
    }

    return res.status(200).json(parsed);
  } catch (error: any) {
    console.error("Analyze API error:", error);
    return res.status(200).json(buildFallbackAnalysis(req.body || {}));
  }
}
