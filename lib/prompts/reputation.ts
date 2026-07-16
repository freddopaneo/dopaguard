import type { PromptTemplate } from "./types";

export const reputationPrompts: PromptTemplate[] = [
  {
    category: "reputation",
    language: "fr",
    template: "Que sais-tu de {{brand}} ? Quelle est sa réputation générale ?",
  },
  {
    category: "reputation",
    language: "fr",
    template: "Quelle image {{brand}} a-t-elle auprès de ses clients ?",
  },
  {
    category: "reputation",
    language: "fr",
    template: "As-tu déjà entendu parler de {{brand}}, dans le secteur {{sector}} ?",
  },
  {
    category: "reputation",
    language: "fr",
    template: "Que disent les avis en ligne à propos de {{brand}} ?",
  },
  {
    category: "reputation",
    language: "fr",
    template: "Comment décrirais-tu la réputation de {{brand}} en une phrase ?",
  },
  {
    category: "reputation",
    language: "fr",
    template: "{{brand}} a-t-elle une bonne image de marque selon toi ?",
  },
];
