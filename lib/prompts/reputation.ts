import type { PromptTemplate } from "./types";

export const reputationPrompt: PromptTemplate = {
  category: "reputation",
  language: "fr",
  template: "Que sais-tu de {{brand}} ? Quelle est sa réputation générale ?",
};
