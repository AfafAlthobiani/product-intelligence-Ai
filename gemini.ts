import { GoogleGenAI, Type, ThinkingLevel } from "@google/genai";
import { ProductInput, AnalysisResult } from "../types";

const apiKey = process.env.GEMINI_API_KEY;

export async function analyzeProduct(input: ProductInput): Promise<AnalysisResult> {
  const ai = new GoogleGenAI({ apiKey: apiKey! });
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

    Use professional Arabic. Data-driven logic only.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
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
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    
    // Clean potential markdown backticks if any (though responseMimeType: "application/json" should prevent this)
    const cleanJson = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}
