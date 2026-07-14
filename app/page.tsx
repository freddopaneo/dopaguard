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
      <header className="mx-auto flex max-w-5xl items-center px-6 py-8">
        <span className="text-sm font-semibold tracking-tight text-slate-900">
          {process.env.NEXT_PUBLIC_APP_NAME || "Dopaguard"}
        </span>
      </header>

      <main className="mx-auto flex max-w-5xl flex-col items-center px-6 pb-32 pt-12 text-center sm:pt-20">
        <section className="flex flex-col items-center gap-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3.5 py-1.5 text-xs font-medium text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full bg-dopaguard-accent" />
            Scan gratuit · Résultat en 3 minutes
          </span>

          <h1 className="max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
            Savez-vous ce que{" "}
            <span className="text-dopaguard-accent">ChatGPT</span> dit de votre
            entreprise ?
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-slate-500">
            Les IA génératives répondent chaque jour à des millions de questions sur des
            entreprises comme la vôtre — parfois avec des erreurs. Découvrez gratuitement ce
            qu&apos;elles disent vraiment.
          </p>

          <div className="mt-4 w-full">
            <ScanForm />
          </div>
        </section>

        <section className="mt-32 flex w-full flex-col gap-10 border-t border-slate-100 pt-20">
          <h2 className="text-xs font-medium uppercase tracking-widest text-slate-400">
            Ce que les IA peuvent dire par erreur — exemples illustratifs
          </h2>
          <div className="grid gap-10 text-left sm:grid-cols-3 sm:gap-8">
            {EXAMPLES.map((example) => (
              <div key={example.note} className="flex flex-col gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-dopaguard-critical" />
                <p className="text-[15px] leading-relaxed text-slate-600">
                  {example.quote.split(example.highlight).map((part, index, arr) => (
                    <span key={index}>
                      {part}
                      {index < arr.length - 1 && (
                        <span className="rounded bg-dopaguard-critical/10 px-1 py-0.5 text-dopaguard-critical">
                          {example.highlight}
                        </span>
                      )}
                    </span>
                  ))}
                </p>
                <p className="text-xs text-slate-400">{example.note}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-100 py-10 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} {process.env.NEXT_PUBLIC_APP_NAME || "Dopaguard"}
      </footer>
    </div>
  );
}
