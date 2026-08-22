function scoreColor(score: number | null): string {
  if (score === null) return "text-white/40";
  if (score >= 80) return "text-dopaguard-success";
  if (score >= 50) return "text-dopaguard-teal";
  return "text-dopaguard-critical";
}

function ScoreBlock({ label, score }: { label: string; score: number | null }) {
  return (
    <div className="flex flex-1 flex-col items-center gap-1 text-center">
      <p className="text-xs uppercase tracking-wide text-white/40">{label}</p>
      <p className={`text-3xl font-bold ${scoreColor(score)}`}>{score ?? "—"}</p>
    </div>
  );
}

export function CompetitorComparisonCard({
  brandName,
  brandScore,
  competitorName,
  competitorScore,
}: {
  brandName: string;
  brandScore: number | null;
  competitorName: string;
  competitorScore: number | null;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
      <p className="mb-4 text-sm text-white/60">Vous vs {competitorName}</p>
      <div className="flex items-center gap-4">
        <ScoreBlock label={brandName} score={brandScore} />
        <span className="text-white/20">vs</span>
        <ScoreBlock label={competitorName} score={competitorScore} />
      </div>
      <p className="mt-4 text-xs text-white/40">
        Score du concurrent estimé sans fiche de vérité (ton + position de recommandation uniquement) — non
        strictement comparable à l&apos;identique.
      </p>
    </div>
  );
}
