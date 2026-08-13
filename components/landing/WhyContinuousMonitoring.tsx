// Icones SVG dessinees a la main, une par raison (convention du projet : SVG
// inline, aucune lib graphique). Les 4 raisons sont paralleles, pas une sequence :
// des icones illustratives remplacent les anciens numeros.
function InfoChangesIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
      <rect x="4" y="4" width="13" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 9h5M8 13h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M19.5 8.5l-6.2 6.2-.8 2.6 2.6-.8 6.2-6.2a1.3 1.3 0 000-1.8 1.3 1.3 0 00-1.8 0z" fill="#c7ff98" stroke="#133742" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

function ModelUpdateIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
      <path d="M19 12a7 7 0 01-12.1 4.8M5 12a7 7 0 0112.1-4.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M17.5 4.5v3h-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 19.5v-3h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="2" fill="#60d9d1" />
    </svg>
  );
}

function NewContentIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
      <path d="M4 8l10-4v14L4 14V8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M14 8.5c2 .4 3.5 1.8 3.5 3.5s-1.5 3.1-3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M6 14v4.5a1.5 1.5 0 003 0V15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="19.5" cy="6" r="2.5" fill="#EF4444" />
    </svg>
  );
}

function CompetitorRiseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
      <path d="M4 19h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M5 15l4.5-4.5 3.5 3L19 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.5 7.5H19V11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9.5" cy="10.5" r="1.6" fill="#60d9d1" />
      <circle cx="19" cy="7.5" r="1.6" fill="#EF4444" />
    </svg>
  );
}

const REASONS = [
  {
    title: "Vos informations évoluent.",
    body: "Nouveaux prix, horaires, offres, équipe, adresse : chaque changement met du temps à être compris par les IA — et en attendant, elles répondent faux.",
    icon: InfoChangesIcon,
    tint: "bg-dopaguard-lime/20",
  },
  {
    title: "Les IA se mettent à jour sans prévenir.",
    body: "ChatGPT, Gemini et les autres changent de version et de sources régulièrement. Une réponse correcte aujourd'hui peut devenir fausse demain, du jour au lendemain.",
    icon: ModelUpdateIcon,
    tint: "bg-dopaguard-teal/20",
  },
  {
    title: "De nouveaux contenus vous concernant apparaissent.",
    body: "Un avis client, un article de presse, un post : dès qu'un contenu est publié, il peut être absorbé par les IA — y compris un signal négatif que vous n'avez pas vu passer.",
    icon: NewContentIcon,
    tint: "bg-dopaguard-teal/20",
  },
  {
    title: "Vos concurrents avancent.",
    body: "Pendant que vous ne regardez pas, un concurrent qui soigne sa présence en ligne peut vous prendre la place de « recommandé » dans les réponses des IA.",
    icon: CompetitorRiseIcon,
    tint: "bg-dopaguard-lime/20",
  },
];

export function WhyContinuousMonitoring() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-14 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-dopaguard-navy sm:text-4xl">
          Vérifier une fois ne sert à rien. Votre réputation IA change chaque semaine.
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-dopaguard-navyMid/80">
          Un scan ponctuel est une photo. Votre réputation, elle, est en mouvement permanent.
          Voici pourquoi la surveillance continue est le seul vrai rempart :
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {REASONS.map((reason) => {
          const Icon = reason.icon;
          return (
            <div
              key={reason.title}
              className="flex gap-4 rounded-2xl border border-dopaguard-muted bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_40px_-20px_rgba(13,46,56,0.35)]"
            >
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-dopaguard-navy ${reason.tint}`}
              >
                <Icon />
              </span>
              <div>
                <h3 className="font-semibold text-dopaguard-navy">{reason.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-dopaguard-navyMid/80">{reason.body}</p>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mx-auto mt-12 max-w-2xl rounded-2xl bg-dopaguard-navy px-6 py-6 text-center text-base font-medium leading-relaxed text-white">
        C&apos;est exactement pour cela que Dopaguard ne fait pas qu&apos;un scan : il
        surveille, chaque semaine, et vous prévient.{" "}
        <span className="text-dopaguard-lime">Une réputation à jour est une réputation surveillée.</span>
      </p>
    </section>
  );
}
