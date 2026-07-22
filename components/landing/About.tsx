const PILLARS = [
  {
    label: "Expertise sectorielle",
    body: "Chaque solution est pensée pour les réalités concrètes d'un métier, pas pour l'IA en général.",
  },
  {
    label: "Solutions sur mesure",
    body: "Dopaneo.ai conçoit des outils dédiés, comme Dopaguard, plutôt que d'adapter un produit générique.",
  },
  {
    label: "Accompagnement de bout en bout",
    body: "De la mise en place au suivi dans la durée, pas seulement un outil livré et laissé de côté.",
  },
];

export function About() {
  return (
    <section id="a-propos" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-14 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-dopaguard-navy sm:text-4xl">
          À propos de Dopaneo.ai
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-dopaguard-navyMid/80">
          Dopaguard est développé par Dopaneo.ai, qui conçoit des solutions IA à spécificités
          métier — dont Dopaguard et Dopageo — et accompagne les entreprises dans leur mise en
          place, avec une approche pensée pour chaque secteur plutôt qu&apos;une IA générique.
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-3">
        {PILLARS.map((pillar) => (
          <div key={pillar.label} className="rounded-2xl border border-dopaguard-muted bg-white p-6">
            <h3 className="font-semibold text-dopaguard-navy">{pillar.label}</h3>
            <p className="mt-2 text-sm leading-relaxed text-dopaguard-navyMid/80">{pillar.body}</p>
          </div>
        ))}
      </div>

      <p className="mt-10 text-center text-sm text-dopaguard-navyMid/60">
        <a href="https://dopaneo.ai" target="_blank" rel="noreferrer" className="underline hover:text-dopaguard-navyMid">
          En savoir plus sur dopaneo.ai
        </a>
      </p>
    </section>
  );
}
