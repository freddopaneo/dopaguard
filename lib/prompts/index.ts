import { reputationPrompts } from "./reputation";
import { reliabilityPrompts } from "./reliability";
import { recommendationPrompts } from "./recommendation";
import { comparisonPrompts } from "./comparison";
import { factualPrompts } from "./factual";
import type { PromptTemplate } from "./types";

export * from "./types";

// Ensemble complet (6 par catégorie x 5 = 30), utilisé pour le choix des prompts
// de l'onboarding (CDC 6.2 : 20 par défaut, jusqu'à 30 pour Pro/Agence).
export const ALL_PROMPT_TEMPLATES: PromptTemplate[] = [
  ...reputationPrompts,
  ...reliabilityPrompts,
  ...recommendationPrompts,
  ...comparisonPrompts,
  ...factualPrompts,
];

// Sous-ensemble historique (1 par catégorie), utilisé par le scan gratuit
// (lib/scan/run-scan.ts) -- ne pas étendre, sous peine de multiplier son coût.
export const PROMPT_TEMPLATES: PromptTemplate[] = [
  reputationPrompts[0],
  reliabilityPrompts[0],
  recommendationPrompts[0],
  comparisonPrompts[0],
  factualPrompts[0],
];

export function renderPrompt(
  template: string,
  vars: { brand: string; website?: string; sector?: string }
): string {
  return template
    .replace(/{{brand}}/g, vars.brand)
    .replace(/{{website}}/g, vars.website ?? "")
    .replace(/{{sector}}/g, vars.sector ?? "");
}
