// Visibilite : part des reponses ou les IA ont su parler de la marque. Affichee a
// part du score global -- qui melange exactitude, sentiment et position -- pour que
// le client distingue "les IA se trompent sur moi" de "les IA ne me connaissent
// pas". Meme distinction que sur le rapport de scan gratuit.

const THRESHOLD_HIGH = 80;
const THRESHOLD_MID = 50;

function tone(score: number) {
  if (score >= THRESHOLD_HIGH) return { color: "text-dopaguard-lime", label: "Les IA vous connaissent bien" };
  if (score >= THRESHOLD_MID) return { color: "text-dopaguard-teal", label: "Les IA vous connaissent mal" };
  return { color: "text-dopaguard-critical", label: "Vous êtes presque invisible" };
}

export function VisibilityCard({ score }: { score: number | null }) {
  if (score === null) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center">
        <span className="text-4xl font-bold text-white/30">—</span>
        <p className="text-sm text-white/60">Visibilité dans les IA</p>
        <p className="text-xs text-white/40">Disponible à partir de la prochaine analyse hebdomadaire.</p>
      </div>
    );
  }

  const { color, label } = tone(score);

  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center">
      <span className={`text-4xl font-bold ${color}`}>
        {score}
        <span className="text-lg font-medium text-white/40">/100</span>
      </span>
      <p className="text-sm text-white/60">Visibilité dans les IA</p>
      <p className="text-xs text-white/40">{label}</p>
    </div>
  );
}
