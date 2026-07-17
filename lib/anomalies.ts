export const ANOMALY_TYPE_LABELS: Record<string, string> = {
  factual_error: "Erreur factuelle",
  negative_sentiment: "Sentiment négatif",
  competitor_push: "Concurrent recommandé",
  hallucination: "Hallucination",
  outdated_info: "Information datée",
};

export const SEVERITY_ORDER = ["critical", "major", "minor"] as const;

export const SEVERITY_LABELS: Record<string, string> = {
  critical: "Critique",
  major: "Majeure",
  minor: "Mineure",
};

export const SEVERITY_BADGE_CLASSES: Record<string, string> = {
  critical: "bg-dopaguard-critical/15 text-dopaguard-critical border border-dopaguard-critical/30",
  major: "bg-dopaguard-teal/15 text-dopaguard-teal border border-dopaguard-teal/30",
  minor: "bg-white/10 text-white/60 border border-white/10",
};

export const STATUS_LABELS: Record<string, string> = {
  new: "Nouvelle",
  acknowledged: "Prise en compte",
  resolved: "Traitée",
};

export const STATUS_BADGE_CLASSES: Record<string, string> = {
  new: "bg-dopaguard-lime/15 text-dopaguard-lime border border-dopaguard-lime/30",
  acknowledged: "bg-dopaguard-teal/15 text-dopaguard-teal border border-dopaguard-teal/30",
  resolved: "bg-dopaguard-success/15 text-dopaguard-success border border-dopaguard-success/30",
};

const SEVERITY_RANK: Record<string, number> = { critical: 0, major: 1, minor: 2 };

export interface SortableAnomaly {
  status: string;
  severity: string;
  created_at: string;
}

// Ouvertes avant traitées, puis les plus sévères en premier, puis les plus récentes.
export function sortAnomalies<T extends SortableAnomaly>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const aOpen = a.status !== "resolved";
    const bOpen = b.status !== "resolved";
    if (aOpen !== bOpen) return aOpen ? -1 : 1;

    const severityDiff = (SEVERITY_RANK[a.severity] ?? 3) - (SEVERITY_RANK[b.severity] ?? 3);
    if (severityDiff !== 0) return severityDiff;

    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
}
