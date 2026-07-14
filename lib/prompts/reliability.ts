import type { PromptTemplate } from "./types";

export const reliabilityPrompt: PromptTemplate = {
  category: "reliability",
  language: "fr",
  template: "Est-ce que {{brand}} est une entreprise fiable et sérieuse ? Est-elle toujours en activité ?",
};
