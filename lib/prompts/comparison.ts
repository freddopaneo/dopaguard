import type { PromptTemplate } from "./types";

export const comparisonPrompt: PromptTemplate = {
  category: "comparison",
  language: "fr",
  template: "Comment {{brand}} se positionne-t-elle par rapport à ses principaux concurrents ?",
};
