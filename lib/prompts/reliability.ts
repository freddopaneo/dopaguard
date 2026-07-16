import type { PromptTemplate } from "./types";

export const reliabilityPrompts: PromptTemplate[] = [
  {
    category: "reliability",
    language: "fr",
    template: "Est-ce que {{brand}} est une entreprise fiable et sérieuse ? Est-elle toujours en activité ?",
  },
  {
    category: "reliability",
    language: "fr",
    template: "Peut-on faire confiance à {{brand}} pour un achat important ?",
  },
  {
    category: "reliability",
    language: "fr",
    template: "{{brand}} est-elle toujours en activité aujourd'hui ?",
  },
  {
    category: "reliability",
    language: "fr",
    template: "Y a-t-il des signaux qui inquiéteraient sur le sérieux de {{brand}} ?",
  },
  {
    category: "reliability",
    language: "fr",
    template: "Combien de temps {{brand}} existe-t-elle sur le marché ?",
  },
  {
    category: "reliability",
    language: "fr",
    template: "{{brand}} respecte-t-elle ses engagements envers ses clients ?",
  },
];
