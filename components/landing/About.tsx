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
    isQuote: true,
    text: "Depuis que nous surveillons notre réputation dans les IA avec Dopaguard, le retour est excellent : nos demandes clients ont augmenté de plus de 30 %.",
    author: "Frédéric Dupeyron",
    role: "Associé, Bike2Mobility",
  },
  {
    isQuote: false,
    text: "OOM Deco surveille sa réputation avec Dopaguard depuis son lancement, pour identifier les bons leviers de positionnement et rester alignée avec ce que ses clients trouvent réellement à son sujet dans les IA génératives.",
    author: "OOM Deco",
    role: "Cliente Dopaguard",
  },
  {
    isQuote: false,
    text: "Le nom « La Plage » étant très générique, les IA ne rattachaient pas toujours l'établissement à l'Île de Ré — ChatGPT donnait par moments une réponse totalement fausse. Grâce au rapport Dopaguard, le restaurant a adapté sa communication pour ressortir clairement comme un restaurant à Rivedoux-Plage, sur l'Île de Ré.",
    author: "M. Lagord",
    role: "Restaurant La Plage, Rivedoux-Plage (Île de Ré)",
  },
];

export function About() {
  return (
    <section id="a-propos" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-14 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-dopaguard-navy sm:text-4xl">Le mot du fondateur</h2>
      </div>

      <div className="mx-auto mt-8 max-w-2xl rounded-2xl border-l-4 border-dopaguard-lime bg-white p-7 sm:p-8">
        <p className="text-base leading-relaxed text-dopaguard-navyMid">
          &laquo;&nbsp;Entrepreneur dans la tech et la mobilité depuis plus de 20 ans, je cherche en permanence à
          optimiser mes entreprises — et à partager ce qui fonctionne avec nos clients. C&apos;est pour cela que
          j&apos;ai fondé Dopaneo.ai : avec une équipe d&apos;experts à mes côtés, nous construisons des solutions IA
          concrètes et nous accompagnons leur mise en place dans la durée, plutôt que de livrer un outil et de passer
          au suivant.&nbsp;&raquo;
        </p>
        <div className="mt-5 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-dopaguard-navy text-sm font-bold text-dopaguard-lime">
            FD
          </span>
          <div>
            <p className="text-sm font-semibold text-dopaguard-navy">Frédéric Dubois</p>
            <p className="text-xs text-dopaguard-navyMid/60">Fondateur, Dopaneo.ai</p>
          </div>
        </div>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-3">
        {SOLUTIONS.map((solution) => (
          <div key={solution.label} className="rounded-2xl border border-dopaguard-muted bg-white p-6">
            <h3 className="font-semibold text-dopaguard-navy">{solution.label}</h3>
            <p className="mt-2 text-sm leading-relaxed text-dopaguard-navyMid/80">{solution.body}</p>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-16 max-w-5xl">
        <p className="text-center text-xs font-semibold uppercase tracking-wide text-dopaguard-teal">
          Ils surveillent leur réputation avec Dopaguard
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.author}
              className="flex flex-col gap-4 rounded-2xl border-l-4 border-dopaguard-lime bg-white p-6"
            >
              <p className="text-sm leading-relaxed text-dopaguard-navyMid">
                {testimonial.isQuote ? `« ${testimonial.text} »` : testimonial.text}
              </p>
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
