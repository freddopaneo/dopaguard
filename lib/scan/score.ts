// Calcule une cotation honnête à partir des vraies réponses du scan gratuit,
// sans appel réseau ni donnée inventée : une réponse est "propre" si le juge
// n'y a détecté aucun écart (lib/scan/judge.ts). Les réponses en erreur sont
// exclues du dénominateur — on ne note pas ce qui n'a pas pu être vérifié.

export interface ScoredResponse {
  provider: string;
  category: string;
  flags: unknown[];
  error: string | null;
}

export interface ScoreBreakdown {
  clean: number;
  total: number;
  score: number | null;
}

export type ScoreTier = "high" | "mid" | "low" | null;

// Les 3 types d'écarts que peut détecter le juge du scan gratuit (lib/scan/judge.ts).
// Important : un écart n'est pas toujours une erreur factuelle — "information_datee"
// signale surtout une IA qui hésite ou manque de données récentes, pas forcément
// une affirmation fausse.
export const FLAG_TYPE_LABELS: Record<string, string> = {
  sentiment_negatif: "Sentiment négatif",
  mention_concurrent: "Concurrent mentionné à votre place",
  information_datee: "Information datée ou incertaine",
};

function summarize(entries: ScoredResponse[]): ScoreBreakdown {
  const usable = entries.filter((e) => !e.error);
  const clean = usable.filter((e) => e.flags.length === 0).length;
  const total = usable.length;
  return { clean, total, score: total === 0 ? null : Math.round((clean / total) * 100) };
}

export function scoreTier(score: number | null): ScoreTier {
  if (score === null) return null;
  if (score >= 80) return "high";
  if (score >= 50) return "mid";
  return "low";
}

export function computeOverallScore(responses: ScoredResponse[]): ScoreBreakdown {
  return summarize(responses);
}

export function computeByProvider(responses: ScoredResponse[]): Record<string, ScoreBreakdown> {
  const byProvider: Record<string, ScoreBreakdown> = {};
  const providers = Array.from(new Set(responses.map((r) => r.provider)));
  for (const provider of providers) {
    byProvider[provider] = summarize(responses.filter((r) => r.provider === provider));
  }
  return byProvider;
}

export function computeByCategory(responses: ScoredResponse[]): Record<string, ScoreBreakdown> {
  const byCategory: Record<string, ScoreBreakdown> = {};
  const categories = Array.from(new Set(responses.map((r) => r.category)));
  for (const category of categories) {
    byCategory[category] = summarize(responses.filter((r) => r.category === category));
  }
  return byCategory;
}
