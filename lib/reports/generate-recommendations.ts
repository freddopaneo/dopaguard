import { callLLM } from "@/lib/llm-gateway";

export interface RecommendationsResult {
  recommendations: string[];
  tokensIn: number;
  tokensOut: number;
  estimatedCostEur: number;
}

interface RecommendationsInput {
  brandName: string;
  monthLabel: string;
  score: number | null;
  previousScore: number | null;
  anomaliesOpenCount: number;
  anomaliesResolvedCount: number;
  topAnomalySummaries: { type: string; severity: string; summary: string | null }[];
}

function buildPrompt(input: RecommendationsInput): string {
  const scoreLine =
    input.score === null
      ? "Aucun score disponible pour ce mois."
      : `Score de réputation IA ce mois : ${input.score}/100${
          input.previousScore !== null ? ` (mois précédent : ${input.previousScore}/100)` : " (premier mois de suivi)"
        }.`;

  const anomaliesLines = input.topAnomalySummaries
    .map((a) => `- [${a.severity}] ${a.type} : ${a.summary ?? "sans résumé"}`)
    .join("\n");

  return `Voici le bilan du mois de ${input.monthLabel} pour l'entreprise "${input.brandName}", surveillée dans les IA génératives (ChatGPT, Claude, Gemini, Perplexity, Mistral).

${scoreLine}
Anomalies ouvertes : ${input.anomaliesOpenCount}. Anomalies résolues ce mois : ${input.anomaliesResolvedCount}.

Anomalies les plus sévères du mois :
${anomaliesLines || "Aucune anomalie ce mois."}

Propose entre 3 et 5 recommandations concrètes et actionnables, en français, pour que "${input.brandName}" améliore sa réputation dans les IA le mois prochain. Réponds strictement en JSON, sans aucun texte autour, au format :
{"recommendations": ["action 1", "action 2", "..."]}`;
}

function parseRecommendations(raw: string): string[] {
  try {
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    const parsed = JSON.parse(jsonMatch ? jsonMatch[0] : raw);
    if (typeof parsed !== "object" || parsed === null) return [];
    const list = (parsed as Record<string, unknown>).recommendations;
    if (!Array.isArray(list)) return [];
    return list.filter((item): item is string => typeof item === "string" && item.trim().length > 0).slice(0, 5);
  } catch {
    return [];
  }
}

export async function generateMonthlyRecommendations(input: RecommendationsInput): Promise<RecommendationsResult> {
  const result = await callLLM({ provider: "anthropic", prompt: buildPrompt(input) });
  const recommendations = parseRecommendations(result.text);

  return {
    recommendations,
    tokensIn: result.tokensIn,
    tokensOut: result.tokensOut,
    estimatedCostEur: result.estimatedCostEur,
  };
}
