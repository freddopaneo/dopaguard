import type { PromptTemplate } from "./types";

export const comparisonPrompts: PromptTemplate[] = [
  {
    category: "comparison",
    language: "fr",
    template: "Comment {{brand}} se positionne-t-elle par rapport à ses principaux concurrents ?",
  },
  {
    category: "comparison",
    language: "fr",
    template: "Quels sont les principaux concurrents de {{brand}} ?",
  },
  {
    category: "comparison",
    language: "fr",
    template: "En quoi {{brand}} se différencie-t-elle des autres acteurs du secteur {{sector}} ?",
  },
  {
    category: "comparison",
    language: "fr",
    template: "{{brand}} est-elle plus chère ou moins chère que ses concurrents ?",
  },
  {
    category: "comparison",
    language: "fr",
    template: "Qui domine le marché entre {{brand}} et ses concurrents directs ?",
  },
  {
    category: "comparison",
    language: "fr",
    template: "Quel est le principal avantage de {{brand}} face à la concurrence ?",
  },
];
