export type PromptCategory =
  | "reputation"
  | "reliability"
  | "recommendation"
  | "comparison"
  | "factual";

export interface PromptTemplate {
  category: PromptCategory;
  template: string;
  language: "fr";
}

export const CATEGORY_ORDER: PromptCategory[] = ["reputation", "reliability", "recommendation", "comparison", "factual"];

export const CATEGORY_LABELS: Record<string, string> = {
  reputation: "Réputation",
  reliability: "Fiabilité",
  recommendation: "Recommandation",
  comparison: "Comparaison",
  factual: "Factuel",
};

export const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  reputation: "Image générale perçue",
  reliability: "Confiance et légitimité",
  recommendation: "Orienterait-elle un client vers vous ?",
  comparison: "Positionnement face à la concurrence",
  factual: "Exactitude des faits bruts",
};
