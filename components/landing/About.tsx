const SOLUTIONS = [
  {
    label: "Dopaneo",
    body: "Un scan pour évaluer la maturité IA d'une entreprise — où elle en est, où sont ses marges de progression.",
  },
  {
    label: "Dopageo.ai",
    body: "Optimise le positionnement d'une entreprise dans les réponses des IA génératives, pour y être recommandée.",
  },
  {
    label: "Dopaguard.ai",
    body: "Surveille dans la durée ce que ces mêmes IA disent d'une entreprise, une fois qu'elle y est visible.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Depuis que nous surveillons notre réputation dans les IA avec Dopaguard, le retour est excellent : nos demandes clients ont augmenté de plus de 30 %.",
    author: "Frédéric Dupeyron",
    role: "Associé, Bike2Mobility",
  },
  {
    quote:
      "OOM Deco surveille sa réputation avec Dopaguard depuis son lancement. L'entreprise s'en sert pour identifier les bons leviers de positionnement et rester alignée avec ce que ses clients trouvent réellement à son sujet dans les IA génératives.",
    author: "OOM Deco",
    role: "Cliente Dopaguard",
  },
];

export function About() {
  return (
    <section id="a-propos" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-14 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-wide text-dopaguard-teal">Fondateur</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-dopaguard-navy sm:text-4xl">Frédéric Dubois</h2>
        <p className="mt-4 text-lg leading-relaxed text-dopaguard-navyMid/80">
          Entrepreneur dans la tech et la mobilité depuis plus de 15 ans, toujours à la recherche de nouvelles façons
          d&apos;optimiser ses entreprises et curieux de partager cette expertise avec ses clients. Il a fondé
          Dopaneo.ai pour transformer cette approche en solutions concrètes, avec un accompagnement dans la durée
          plutôt qu&apos;un outil livré et laissé de côté.
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-3">
        {SOLUTIONS.map((solution) => (
          <div key={solution.label} className="rounded-2xl border border-dopaguard-muted bg-white p-6">
            <h3 className="font-semibold text-dopaguard-navy">{solution.label}</h3>
            <p className="mt-2 text-sm leading-relaxed text-dopaguard-navyMid/80">{solution.body}</p>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-16 max-w-3xl">
        <p className="text-center text-xs font-semibold uppercase tracking-wide text-dopaguard-teal">
          Ils surveillent leur réputation avec Dopaguard
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.author}
              className="flex flex-col gap-4 rounded-2xl border-l-4 border-dopaguard-lime bg-white p-6"
            >
              <p className="text-sm leading-relaxed text-dopaguard-navyMid">&laquo; {testimonial.quote} &raquo;</p>
              <div>
                <p className="text-sm font-semibold text-dopaguard-navy">{testimonial.author}</p>
                <p className="text-xs text-dopaguard-navyMid/60">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-10 text-center text-sm text-dopaguard-navyMid/60">
        <a href="https://dopaneo.ai" target="_blank" rel="noreferrer" className="underline hover:text-dopaguard-navyMid">
          En savoir plus sur dopaneo.ai
        </a>
      </p>
    </section>
  );
}
