import { callLLM } from "@/lib/llm-gateway";

export type AnomalyType = "factual_error" | "negative_sentiment" | "competitor_push" | "hallucination" | "outdated_info";
export type AnomalySeverity = "critical" | "major" | "minor";
export type RecommendationPosition = "recommended" | "neutral" | "competitor_preferred" | "not_mentioned";

const ANOMALY_TYPES: AnomalyType[] = [
  "factual_error",
  "negative_sentiment",
  "competitor_push",
  "hallucination",
  "outdated_info",
];
const SEVERITIES: AnomalySeverity[] = ["critical", "major", "minor"];
const RECOMMENDATION_POSITIONS: RecommendationPosition[] = [
  "recommended",
  "neutral",
  "competitor_preferred",
  "not_mentioned",
];

export interface Anomaly {
  type: AnomalyType;
  severity: AnomalySeverity;
  summary: string;
  evidence: string;
  expectedTruth: string;
  recommendedAction: string;
}

export interface TruthSheetInput {
  legalStatus: string | null;
  offering: string | null;
  pricingFacts: string | null;
  keyPeople: string | null;
  differentiators: string | null;
  knownCompetitors: string[] | null;
  forbiddenClaims: string | null;
}

export interface JudgeResult {
  anomalies: Anomaly[];
  sentimentScore: number;
  accuracyScore: number;
  recommendationPosition: RecommendationPosition;
  tokensIn: number;
  tokensOut: number;
  estimatedCostEur: number;
}

function buildTruthSheetBlock(truthSheet: TruthSheetInput): string {
  return `- Statut/ancienneté : ${truthSheet.legalStatus || "non renseigné"}
- Produits/services : ${truthSheet.offering || "non renseigné"}
- Faits tarifaires : ${truthSheet.pricingFacts || "non renseigné"}
- Dirigeants : ${truthSheet.keyPeople || "non renseigné"}
- Points forts : ${truthSheet.differentiators || "non renseigné"}
- Concurrents connus : ${(truthSheet.knownCompetitors ?? []).join(", ") || "non renseigné"}
- Ce qui ne doit JAMAIS être dit (forbidden_claims) : ${truthSheet.forbiddenClaims || "aucun"}`;
}

// Certaines réponses (notamment Perplexity/Gemini) peuvent être très longues,
// ce qui a fait dépasser le délai de 60s de lib/llm-gateway.ts lors des tests --
// tronquée ici (le juge n'a pas besoin du texte intégral pour évaluer exactitude/ton).
const MAX_RESPONSE_TEXT_LENGTH = 6000;

function buildJudgePrompt(brandName: string, truthSheet: TruthSheetInput, responseText: string): string {
  return `Voici la fiche de vérité de l'entreprise "${brandName}" :

${buildTruthSheetBlock(truthSheet)}

Voici une réponse donnée par une IA générative à une question sur "${brandName}" :

"""
${responseText.slice(0, MAX_RESPONSE_TEXT_LENGTH)}
"""

Compare cette réponse à la fiche de vérité et identifie les anomalies. Réponds strictement en JSON, sans aucun texte autour, au format :
{
  "anomalies": [
    {"type": "factual_error|negative_sentiment|competitor_push|hallucination|outdated_info", "severity": "critical|major|minor", "summary": "résumé en une phrase", "evidence": "extrait exact de la réponse ci-dessus", "expected_truth": "ce que dit la fiche de vérité", "recommended_action": "action concrète et spécifique à mettre en place pour corriger la cause de cette anomalie (ex. mettre à jour telle information à tel endroit), en une ou deux phrases"}
  ],
  "sentiment_score": 0,
  "accuracy_score": 0,
  "recommendation_position": "recommended|neutral|competitor_preferred|not_mentioned"
}

Règles de sévérité :
- critical : la réponse contient un élément listé dans "forbidden_claims", déclare l'entreprise fermée/en difficulté, ou attribue un fait gravement faux (fraude, procès inexistant).
- major : erreur factuelle sur l'offre, les prix ou les dirigeants, ou recommandation explicite d'un concurrent à la place de "${brandName}".
- minor : information datée, imprécision, ton tiède.

sentiment_score (0-100) : à quel point le ton envers "${brandName}" est positif. accuracy_score (0-100) : à quel point la réponse est factuellement exacte par rapport à la fiche de vérité. recommendation_position : la place de "${brandName}" dans la réponse.

Si aucune anomalie n'est trouvée, réponds avec un tableau "anomalies" vide.`;
}

function clampScore(value: unknown): number {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return 50;
  return Math.max(0, Math.min(100, Math.round(n)));
}

function parseJudgeOutput(
  raw: string,
  responseText: string
): { anomalies: Anomaly[]; sentimentScore: number; accuracyScore: number; recommendationPosition: RecommendationPosition } {
  const fallback = {
    anomalies: [] as Anomaly[],
    sentimentScore: 50,
    accuracyScore: 50,
    recommendationPosition: "neutral" as RecommendationPosition,
  };

  let parsed: unknown;
  try {
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    parsed = JSON.parse(jsonMatch ? jsonMatch[0] : raw);
  } catch {
    return fallback;
  }

  if (typeof parsed !== "object" || parsed === null) return fallback;
  const obj = parsed as Record<string, unknown>;

  const rawAnomalies = Array.isArray(obj.anomalies) ? obj.anomalies : [];
  const anomalies: Anomaly[] = rawAnomalies
    .filter(
      (a): a is Record<string, unknown> =>
        typeof a === "object" &&
        a !== null &&
        ANOMALY_TYPES.includes((a as Record<string, unknown>).type as AnomalyType) &&
        SEVERITIES.includes((a as Record<string, unknown>).severity as AnomalySeverity) &&
        typeof (a as Record<string, unknown>).evidence === "string" &&
        responseText.includes((a as Record<string, unknown>).evidence as string)
    )
    .map((a) => ({
      type: a.type as AnomalyType,
      severity: a.severity as AnomalySeverity,
      summary: typeof a.summary === "string" ? a.summary : "",
      evidence: a.evidence as string,
      expectedTruth: typeof a.expected_truth === "string" ? a.expected_truth : "",
      recommendedAction: typeof a.recommended_action === "string" ? a.recommended_action : "",
    }));

  const recommendationPosition = RECOMMENDATION_POSITIONS.includes(obj.recommendation_position as RecommendationPosition)
    ? (obj.recommendation_position as RecommendationPosition)
    : fallback.recommendationPosition;

  return {
    anomalies,
    sentimentScore: clampScore(obj.sentiment_score),
    accuracyScore: clampScore(obj.accuracy_score),
    recommendationPosition,
  };
}

export async function judgeWithTruthSheet(
  brandName: string,
  truthSheet: TruthSheetInput,
  responseText: string
): Promise<JudgeResult> {
  const result = await callLLM({ provider: "anthropic", prompt: buildJudgePrompt(brandName, truthSheet, responseText) });
  const parsed = parseJudgeOutput(result.text, responseText);

  return {
    ...parsed,
    tokensIn: result.tokensIn,
    tokensOut: result.tokensOut,
    estimatedCostEur: result.estimatedCostEur,
  };
}
