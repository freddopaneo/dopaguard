// Calcule une cotation honnête à partir des vraies réponses du scan gratuit,
// sans appel réseau ni donnée inventée. Deux mesures distinctes, car elles
// répondent à deux questions différentes :
//   - fiabilité : quand les IA parlent de vous, disent-elles juste ?
//   - visibilité : les IA vous connaissent-elles seulement ?
// Les confondre donnait un 0/100 à une entreprise simplement inconnue des IA,
// la même note qu'une entreprise activement dénigrée.
// Les réponses en erreur sont exclues du dénominateur — on ne note pas ce qui
// n'a pas pu être vérifié.

export interface ScoredFlag {
  type: string;
}

export interface ScoredResponse {
  provider: string;
  category: string;
  flags: ScoredFlag[];
  error: string | null;
}

export interface ScoreBreakdown {
  clean: number;
  total: number;
  score: number | null;
}

export type ScoreTier = "high" | "mid" | "low" | null;

// Signale que l'IA ne connaît pas l'entreprise -- ce n'est pas une anomalie
// commise par l'IA, mais un manque de visibilité, compté séparément.
export const ABSENCE_FLAG = "information_absente";

export const FLAG_TYPE_LABELS: Record<string, string> = {
  sentiment_negatif: "Sentiment négatif",
  mention_concurrent: "Concurrent mentionné à votre place",
  information_datee: "Information datée ou incertaine",
  [ABSENCE_FLAG]: "L'IA ne vous connaît pas",
};

function isAnomaly(flag: ScoredFlag): boolean {
  return flag.type !== ABSENCE_FLAG;
}

function usableResponses(entries: ScoredResponse[]): ScoredResponse[] {
  return entries.filter((e) => !e.error);
}

function ratio(clean: number, total: number): ScoreBreakdown {
  return { clean, total, score: total === 0 ? null : Math.round((clean / total) * 100) };
}

/** Fiabilité : part des réponses sans anomalie réelle (absence de connaissance exclue). */
function summarizeReliability(entries: ScoredResponse[]): ScoreBreakdown {
  const usable = usableResponses(entries);
  return ratio(usable.filter((e) => !e.flags.some(isAnomaly)).length, usable.length);
}

/** Visibilité : part des réponses où l'IA a réellement su parler de l'entreprise. */
function summarizeVisibility(entries: ScoredResponse[]): ScoreBreakdown {
  const usable = usableResponses(entries);
  return ratio(usable.filter((e) => !e.flags.some((f) => f.type === ABSENCE_FLAG)).length, usable.length);
}

export function scoreTier(score: number | null): ScoreTier {
  if (score === null) return null;
  if (score >= 80) return "high";
  if (score >= 50) return "mid";
  return "low";
}

export function computeReliabilityScore(responses: ScoredResponse[]): ScoreBreakdown {
  return summarizeReliability(responses);
}

export function computeVisibilityScore(responses: ScoredResponse[]): ScoreBreakdown {
  return summarizeVisibility(responses);
}

/** Conservé pour les usages qui ne veulent qu'une seule note : la fiabilité. */
export function computeOverallScore(responses: ScoredResponse[]): ScoreBreakdown {
  return summarizeReliability(responses);
}

export function computeByProvider(responses: ScoredResponse[]): Record<string, ScoreBreakdown> {
  const byProvider: Record<string, ScoreBreakdown> = {};
  for (const provider of Array.from(new Set(responses.map((r) => r.provider)))) {
    byProvider[provider] = summarizeReliability(responses.filter((r) => r.provider === provider));
  }
  return byProvider;
}

export function computeByCategory(responses: ScoredResponse[]): Record<string, ScoreBreakdown> {
  const byCategory: Record<string, ScoreBreakdown> = {};
  for (const category of Array.from(new Set(responses.map((r) => r.category)))) {
    byCategory[category] = summarizeReliability(responses.filter((r) => r.category === category));
  }
  return byCategory;
}

/** Nombre de réponses où l'IA a déclaré ne pas connaître l'entreprise. */
export function countUnknownResponses(responses: ScoredResponse[]): number {
  return usableResponses(responses).filter((e) => e.flags.some((f) => f.type === ABSENCE_FLAG)).length;
}
