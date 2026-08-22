import { HighlightedText } from "@/components/HighlightedText";

// Carte "reponse d'une IA" partagee entre la section detection de la page
// d'accueil et les exemples d'anomalies des pages secteurs : avatar radar,
// bulle de conversation, extrait problematique surligne, note d'avertissement.
function AiAvatar() {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-dopaguard-navy">
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-dopaguard-lime" aria-hidden>
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <line x1="12" y1="12" x2="16.5" y2="7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="12" r="1.6" fill="currentColor" />
      </svg>
    </span>
  );
}

export function AiResponseCard({
  quote,
  highlight,
  note,
  borderClassName,
  badge,
}: {
  quote: string;
  highlight: string;
  note: string;
  borderClassName: string;
  badge?: React.ReactNode;
}) {
  return (
    <div
      className={`flex h-full flex-col gap-3 rounded-2xl border bg-white p-5 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_40px_-20px_rgba(13,46,56,0.35)] ${borderClassName}`}
    >
      {badge}
      <div className="flex items-start gap-2.5">
        <AiAvatar />
        <div className="flex-1">
          <p className="text-[11px] font-medium uppercase tracking-wide text-dopaguard-navyMid/50">
            Réponse d&apos;une IA
          </p>
          <div className="mt-1.5 rounded-2xl rounded-tl-sm bg-dopaguard-muted/60 px-3.5 py-2.5">
            <p className="text-sm leading-relaxed text-dopaguard-navyMid">
              <HighlightedText text={quote} excerpts={[highlight]} />
            </p>
          </div>
        </div>
      </div>
      <div className="mt-auto flex items-start gap-2 border-t border-dopaguard-muted pt-3">
        <svg viewBox="0 0 24 24" fill="none" className="mt-0.5 h-4 w-4 shrink-0 text-dopaguard-critical" aria-hidden>
          <path d="M12 4l9 16H3l9-16z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M12 10v4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="12" cy="17" r="0.9" fill="currentColor" />
        </svg>
        <p className="text-xs leading-relaxed text-dopaguard-navyMid/70">{note}</p>
      </div>
    </div>
  );
}
