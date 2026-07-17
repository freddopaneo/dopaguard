export function OpenAnomaliesCard({ count }: { count: number }) {
  const hasAnomalies = count > 0;

  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center">
      <span className={`text-4xl font-bold ${hasAnomalies ? "text-dopaguard-critical" : "text-dopaguard-success"}`}>{count}</span>
      <p className="text-sm text-white/60">Anomalie{count > 1 ? "s" : ""} ouverte{count > 1 ? "s" : ""}</p>
      {!hasAnomalies && <p className="text-xs text-white/40">Tout est sous contrôle.</p>}
    </div>
  );
}
