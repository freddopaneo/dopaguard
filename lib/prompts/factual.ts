import type { PromptTemplate } from "./types";

export const factualPrompt: PromptTemplate = {
  category: "factual",
  language: "fr",
  template: "Peux-tu me donner des informations factuelles sur {{brand}} (activité, ancienneté, tarifs, siège social) ?",
};
