import type { PromptTemplate } from "./types";

export const recommendationPrompt: PromptTemplate = {
  category: "recommendation",
  language: "fr",
  template: "Recommanderais-tu {{brand}} à quelqu'un qui cherche ce type de produit ou service ? Pourquoi ?",
};
