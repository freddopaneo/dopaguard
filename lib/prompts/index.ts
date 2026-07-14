import { reputationPrompt } from "./reputation";
import { reliabilityPrompt } from "./reliability";
import { recommendationPrompt } from "./recommendation";
import { comparisonPrompt } from "./comparison";
import { factualPrompt } from "./factual";
import type { PromptTemplate } from "./types";

export * from "./types";

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  reputationPrompt,
  reliabilityPrompt,
  recommendationPrompt,
  comparisonPrompt,
  factualPrompt,
];

export function renderPrompt(template: string, vars: { brand: string }): string {
  return template.replace(/{{brand}}/g, vars.brand);
}
