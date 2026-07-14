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
    <div className="min-h-screen bg-white text-slate-900">
      <header className="mx-auto max-w-5xl px-6 py-6">
        <span className="text-lg font-bold text-dopaguard-bg">
          {process.env.NEXT_PUBLIC_APP_NAME || "Dopaguard"}
        </span>
      </header>

      <main className="mx-auto flex max-w-5xl flex-col items-center gap-16 px-6 pb-24 pt-8 text-center">
        <section className="flex flex-col items-center gap-6">
          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-dopaguard-bg sm:text-5xl">
            Savez-vous ce que ChatGPT dit de votre entreprise ?
          </h1>
          <p className="max-w-xl text-base text-slate-600 sm:text-lg">
            Les IA génératives répondent chaque jour à des millions de questions sur des
            entreprises comme la vôtre — parfois avec des erreurs. Découvrez en moins de
            3 minutes ce qu&apos;elles disent vraiment, gratuitement.
          </p>
          <ScanForm />
        </section>

        <section className="flex w-full flex-col gap-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Ce que les IA peuvent dire par erreur — exemples illustratifs
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {EXAMPLES.map((example) => (
              <div
                key={example.note}
                className="flex flex-col gap-3 rounded-lg border border-slate-200 p-5 text-left"
              >
                <p className="text-sm italic text-slate-700">
                  &ldquo;
                  {example.quote.split(example.highlight).map((part, index, arr) => (
                    <span key={index}>
                      {part}
                      {index < arr.length - 1 && (
                        <mark className="bg-dopaguard-critical/20 text-dopaguard-critical">
                          {example.highlight}
                        </mark>
                      )}
                    </span>
                  ))}
                  &rdquo;
                </p>
                <p className="text-xs text-slate-500">{example.note}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-100 py-8 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} {process.env.NEXT_PUBLIC_APP_NAME || "Dopaguard"}
      </footer>
    </div>
  );
}
