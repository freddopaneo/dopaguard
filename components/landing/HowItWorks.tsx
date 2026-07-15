const STEPS = [
  {
    label: "Fiche de vérité",
    body: "Vous validez, en quelques clics, les faits qui vous concernent : activité, tarifs, horaires, positionnement. C'est la référence sur laquelle Dopaguard s'appuie pour juger les réponses des IA.",
  },
  {
    label: "Interrogation hebdomadaire des IA",
    body: "Chaque semaine, Dopaguard interroge 3 à 5 IA selon votre plan (ChatGPT, Claude, Gemini, Perplexity, Mistral) avec des questions qu'un vrai client poserait.",
  },
  {
    label: "Alertes",
    body: "Une anomalie critique déclenche un email immédiat. Sinon, vous recevez un digest hebdomadaire avec votre score et les écarts détectés.",
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-dopaguard-navy sm:text-4xl">
          Comment ça marche
        </h2>
      </div>

      <div className="mt-14 grid gap-8 sm:grid-cols-3">
        {STEPS.map((step, index) => (
          <div key={step.label} className="relative rounded-2xl border border-dopaguard-muted bg-white p-6">
            <span className="text-5xl font-bold text-dopaguard-muted">{index + 1}</span>
            <h3 className="mt-3 font-semibold text-dopaguard-navy">{step.label}</h3>
            <p className="mt-2 text-sm leading-relaxed text-dopaguard-navyMid/80">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
