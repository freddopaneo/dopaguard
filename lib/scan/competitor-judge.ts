import { callLLM } from "@/lib/llm-gateway";
import type { RecommendationPosition } from "./anomaly-judge";

const RECOMMENDATION_POSITIONS: RecommendationPosition[] = [
  "recommended",
  "neutral",
  "competitor_preferred",
  "not_mentioned",
];

export interface CompetitorJudgeResult {
  sentimentScore: number;
  recommendationPosition: RecommendationPosition;
  tokensIn: number;
  tokensOut: number;
  estimatedCostEur: number;
}

// Juge simplifié pour le suivi des concurrents (CDC 2.2) : pas de fiche de vérité
// pour un concurrent, donc pas d'exactitude ni d'anomalie possibles -- seulement le
// ton et la position de recommandation, à partir de la même réponse brute stockée.
function buildPrompt(competitorName: string, responseText: string): string {
  return `Voici une réponse donnée par une IA générative à une question sur l'entreprise "${competitorName}" :

"""
${responseText.slice(0, 6000)}
"""

Évalue uniquement le ton et la position de "${competitorName}" dans cette réponse. Réponds strictement en JSON, sans aucun texte autour, au format :
{"sentiment_score": 0, "recommendation_position": "recommended|neutral|competitor_preferred|not_mentioned"}

sentiment_score (0-100) : à quel point le ton envers "${competitorName}" est positif. recommendation_position : la place de "${competitorName}" dans la réponse (recommended = mise en avant positivement, competitor_preferred = un autre acteur lui est préféré, not_mentioned = pas vraiment abordée, neutral = sinon).`;
}

function clampScore(value: unknown): number {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return 50;
  return Math.max(0, Math.min(100, Math.round(n)));
}

function parseOutput(raw: string): { sentimentScore: number; recommendationPosition: RecommendationPosition } {
  const fallback = { sentimentScore: 50, recommendationPosition: "neutral" as RecommendationPosition };

  let parsed: unknown;
  try {
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    parsed = JSON.parse(jsonMatch ? jsonMatch[0] : raw);
  } catch {
    return fallback;
  }

  if (typeof parsed !== "object" || parsed === null) return fallback;
  const obj = parsed as Record<string, unknown>;

  const recommendationPosition = RECOMMENDATION_POSITIONS.includes(obj.recommendation_position as RecommendationPosition)
    ? (obj.recommendation_position as RecommendationPosition)
    : fallback.recommendationPosition;

  return { sentimentScore: clampScore(obj.sentiment_score), recommendationPosition };
}

export async function judgeCompetitorResponse(competitorName: string, responseText: string): Promise<CompetitorJudgeResult> {
  const result = await callLLM({ provider: "anthropic", prompt: buildPrompt(competitorName, responseText) });
  const parsed = parseOutput(result.text);

  return {
    ...parsed,
    tokensIn: result.tokensIn,
    tokensOut: result.tokensOut,
    estimatedCostEur: result.estimatedCostEur,
  };
}
