import type { PromptTemplate } from "./types";

export const factualPrompts: PromptTemplate[] = [
  {
    category: "factual",
    language: "fr",
    template: "Peux-tu me donner des informations factuelles sur {{brand}} (activité, ancienneté, tarifs, siège social) ?",
  },
  {
    category: "factual",
    language: "fr",
    template: "Quelle est l'activité exacte de {{brand}} ?",
  },
  {
    category: "factual",
    language: "fr",
    template: "Où se situe le siège social de {{brand}} ?",
  },
  {
    category: "factual",
    language: "fr",
    template: "Quels sont les tarifs pratiqués par {{brand}} ?",
  },
  {
    category: "factual",
    language: "fr",
    template: "Depuis quand {{brand}} existe-t-elle ?",
  },
  {
    category: "factual",
    language: "fr",
    template: "Peux-tu me donner la fiche d'identité de {{brand}} (site {{website}}) ?",
  },
];
