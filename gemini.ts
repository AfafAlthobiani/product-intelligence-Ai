import { ProductInput, AnalysisResult } from "./types";

export async function analyzeProduct(input: ProductInput): Promise<AnalysisResult> {
  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      const errorPayload = await response.json().catch(() => ({}));
      const message = errorPayload?.message || "Analysis request failed";
      throw new Error(message);
    }

    return (await response.json()) as AnalysisResult;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}
