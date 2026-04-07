import { GoogleGenAI, Type, ThinkingLevel } from "@google/genai";

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
    return res.status(500).json({ message: "GEMINI_API_KEY is missing on server" });
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
    return res.status(500).json({
      message: error?.message || "Unexpected server error during analysis",
    });
  }
}
