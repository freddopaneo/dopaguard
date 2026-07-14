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
