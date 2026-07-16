import type { PromptTemplate } from "./types";

export const recommendationPrompts: PromptTemplate[] = [
  {
    category: "recommendation",
    language: "fr",
    template: "Recommanderais-tu {{brand}} à quelqu'un qui cherche ce type de produit ou service ? Pourquoi ?",
  },
  {
    category: "recommendation",
    language: "fr",
    template: "Si un ami me demandait un avis sur {{brand}}, que lui dirais-tu ?",
  },
  {
    category: "recommendation",
    language: "fr",
    template: "Vaut-il mieux choisir {{brand}} ou un de ses concurrents ?",
  },
  {
    category: "recommendation",
    language: "fr",
    template: "Conseillerais-tu {{brand}} pour un premier achat dans le secteur {{sector}} ?",
  },
  {
    category: "recommendation",
    language: "fr",
    template: "Quels sont les points forts et les points faibles de {{brand}} ?",
  },
  {
    category: "recommendation",
    language: "fr",
    template: "Recommanderais-tu {{brand}} sans réserve ?",
  },
];
