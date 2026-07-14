import { ScanForm } from "@/components/ScanForm";

const EXAMPLES = [
  {
    quote: "Cette entreprise a cessé son activité en 2022 et n'est plus opérationnelle.",
    highlight: "cessé son activité en 2022",
    note: "Une IA a déclaré fermée une entreprise pourtant toujours active.",
  },
  {
    quote: "Pour ce type de besoin, je recommanderais plutôt un concurrent mieux établi sur ce marché.",
    highlight: "je recommanderais plutôt un concurrent",
    note: "Une IA a orienté l'utilisateur vers un concurrent plutôt que la marque interrogée.",
  },
  {
    quote: "Leurs tarifs démarrent autour de 15€/mois pour l'offre de base.",
    highlight: "15€/mois",
    note: "Une IA a cité un tarif obsolète, changé depuis plus d'un an.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-dopaguard-cream text-dopaguard-navy">
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #133742 0%, #0d2e38 100%)",
        }}
      >
        <header className="mx-auto flex max-w-5xl items-center px-6 py-8">
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
        <h2 className="text-xs font-medium uppercase tracking-widest text-dopaguard-navyMid/70">
          Ce que les IA peuvent dire par erreur — exemples illustratifs
        </h2>
        <div className="grid gap-6 text-left sm:grid-cols-3">
          {EXAMPLES.map((example) => (
            <div
              key={example.note}
              className="relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-dopaguard-muted bg-white p-6"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-3 -top-6 select-none text-8xl font-serif text-dopaguard-muted"
              >
                &ldquo;
              </span>
              <span className="relative inline-flex w-fit items-center gap-1.5 rounded-full bg-dopaguard-critical/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-dopaguard-critical">
                Exemple illustratif
              </span>
              <p className="relative text-[15px] leading-relaxed text-dopaguard-navyMid">
                {example.quote.split(example.highlight).map((part, index, arr) => (
                  <span key={index}>
                    {part}
                    {index < arr.length - 1 && (
                      <span className="rounded bg-dopaguard-critical/10 px-1 py-0.5 font-medium text-dopaguard-critical">
                        {example.highlight}
                      </span>
                    )}
                  </span>
                ))}
              </p>
              <p className="relative border-t border-dopaguard-muted pt-3 text-xs text-dopaguard-navyMid/60">
                {example.note}
              </p>
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
