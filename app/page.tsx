import { ScanForm } from "@/components/ScanForm";
import { HighlightedText } from "@/components/HighlightedText";

type Accent = "teal" | "lime" | "navy";

const ACCENT_BADGE: Record<Accent, string> = {
  teal: "bg-dopaguard-teal text-dopaguard-navy",
  lime: "bg-dopaguard-lime text-dopaguard-navy",
  navy: "bg-dopaguard-navy text-white",
};

const ACCENT_BORDER: Record<Accent, string> = {
  teal: "border-dopaguard-teal/40",
  lime: "border-dopaguard-lime/50",
  navy: "border-dopaguard-navy/20",
};

const EXAMPLE_GROUPS: {
  label: string;
  accent: Accent;
  examples: { quote: string; highlight: string; note: string }[];
}[] = [
  {
    label: "Profession libérale",
    accent: "teal",
    examples: [
      {
        quote:
          "Il semblerait que ce cabinet ait cessé son activité, je ne trouve pas d'informations récentes à son sujet.",
        highlight: "cessé son activité",
        note: "Une IA a laissé entendre qu'un professionnel indépendant avait arrêté son activité, faute d'informations récentes.",
      },
      {
        quote: "Pour ce type de dossier, il est recommandé de consulter un cabinet plus expérimenté dans ce domaine.",
        highlight: "un cabinet plus expérimenté",
        note: "Une IA a orienté l'utilisateur vers un concurrent plutôt que vers le professionnel interrogé.",
      },
    ],
  },
  {
    label: "Hôtel",
    accent: "lime",
    examples: [
      {
        quote: "Cet hôtel a reçu plusieurs avis mentionnant des problèmes de propreté récurrents.",
        highlight: "problèmes de propreté récurrents",
        note: "Une IA a relayé un sentiment négatif non vérifié sur la qualité de l'établissement.",
      },
      {
        quote: "Les chambres standard sont proposées à partir de 45€ la nuit.",
        highlight: "45€ la nuit",
        note: "Une IA a cité un tarif obsolète, en dessous des prix actuellement pratiqués.",
      },
    ],
  },
  {
    label: "Entreprise",
    accent: "navy",
    examples: [
      {
        quote: "Cette entreprise a cessé son activité en 2022 et n'est plus opérationnelle.",
        highlight: "cessé son activité en 2022",
        note: "Une IA a déclaré fermée une entreprise pourtant toujours active.",
      },
      {
        quote: "Leurs tarifs démarrent autour de 15€/mois pour l'offre de base.",
        highlight: "15€/mois",
        note: "Une IA a cité un tarif obsolète, changé depuis plus d'un an.",
      },
    ],
  },
];

function RadarLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-dopaguard-lime" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <circle cx="12" cy="12" r="5.5" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      <line x1="12" y1="12" x2="17.5" y2="6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
      <circle cx="16.5" cy="8" r="1.3" fill="currentColor" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-dopaguard-cream text-dopaguard-navy">
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #133742 0%, #0d2e38 100%)",
        }}
      >
        <header className="mx-auto flex max-w-5xl items-center gap-2 px-6 py-8">
          <RadarLogo />
          <span className="text-sm font-semibold tracking-tight text-white">
            {process.env.NEXT_PUBLIC_APP_NAME || "Dopaguard"}
          </span>
        </header>

        <main className="mx-auto flex max-w-5xl flex-col items-center px-6 pb-24 pt-8 text-center sm:pb-32 sm:pt-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-dopaguard-lime" />
            Scan gratuit · Résultat en 3 minutes
          </span>

          <h1 className="mt-8 max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Savez-vous ce que <span className="text-dopaguard-lime">ChatGPT</span>,{" "}
            <span className="text-dopaguard-lime">Claude</span> et{" "}
            <span className="text-dopaguard-lime">Perplexity</span> disent de votre
            entreprise ?
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/60">
            Les IA génératives répondent chaque jour à des millions de questions sur des
            entreprises comme la vôtre — parfois avec des erreurs. Découvrez gratuitement ce
            qu&apos;elles disent vraiment.
          </p>

          <div className="mt-10 w-full">
            <ScanForm />
          </div>
        </main>
      </div>

      <section className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-24">
        <div className="text-center">
          <h2 className="text-xs font-medium uppercase tracking-widest text-dopaguard-navyMid/70">
            Ce que les IA peuvent dire par erreur
          </h2>
          <p className="mt-2 text-sm text-dopaguard-navyMid/60">
            Exemples illustratifs, selon votre secteur d&apos;activité
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-3">
          {EXAMPLE_GROUPS.map((group) => (
            <div key={group.label} className="flex flex-col gap-4">
              <span
                className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ${ACCENT_BADGE[group.accent]}`}
              >
                {group.label}
              </span>

              {group.examples.map((example) => (
                <div
                  key={example.note}
                  className={`relative flex flex-col gap-3 overflow-hidden rounded-2xl border bg-white p-5 text-left ${ACCENT_BORDER[group.accent]}`}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-3 -top-6 select-none text-7xl font-serif text-dopaguard-muted"
                  >
                    &ldquo;
                  </span>
                  <p className="relative text-sm leading-relaxed text-dopaguard-navyMid">
                    <HighlightedText text={example.quote} excerpts={[example.highlight]} />
                  </p>
                  <p className="relative border-t border-dopaguard-muted pt-2.5 text-xs text-dopaguard-navyMid/60">
                    {example.note}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-dopaguard-muted py-10 text-center text-xs text-dopaguard-navyMid/50">
        © {new Date().getFullYear()} {process.env.NEXT_PUBLIC_APP_NAME || "Dopaguard"}
      </footer>
    </div>
  );
}
