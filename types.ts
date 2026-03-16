export interface ProductInput {
  name: string;
  category: string;
  targetAudience: string;
  costPrice: number;
  desiredMargin: number;
}

export interface Competitor {
  name: string;
  price: number;
  strategy: string;
  offer: string;
}

export interface MarketAnalysis {
  competitors: Competitor[];
  averagePrice: number;
  priceRange: { min: number; max: number };
  commonPricingStrategy: string;
  commonOffers: string[];
  contentTrends: string;
  descriptionLength: string;
  positioning: "Emotional" | "Rational" | "Mixed";
  marketSummary: string;
  positioningGaps: string[];
}

export interface ContentStrategy {
  type: "Emotional" | "Authority" | "Value";
  headline: string;
  hook: string;
  benefits: string[];
  objectionHandling: { objection: string; response: string }[];
  cta: string;
  adCopy: string;
  seoDescription: string;
}

export interface PricingOption {
  label: string;
  price: number;
  profit: number;
  margin: number;
  riskLevel: "Low" | "Medium" | "High";
  conversionImpact: string;
  logic: string;
}

export interface OfferIdea {
  title: string;
  description: string;
  netProfitImpact: number;
  breakEvenQuantity: number;
  psychologicalTrigger: string;
}

export interface AnalysisResult {
  marketAnalysis: MarketAnalysis;
  contentStrategies: ContentStrategy[];
  pricingEngine: {
    safe: PricingOption;
    aggressive: PricingOption;
    premium: PricingOption;
  };
  offerOptimizer: OfferIdea[];
  recommendation: {
    bestStrategy: string;
    why: string;
    impact: string;
    riskAssessment: string;
  };
}
