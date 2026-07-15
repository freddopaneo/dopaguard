type Plan = {
  name: string;
  price: string;
  recommended?: boolean;
  brands: string;
  ais: string;
  digest: boolean;
  criticalAlerts: boolean;
  competitors: string;
  whiteLabel: boolean;
  support: string;
};

const PLANS: Plan[] = [
  {
    name: "Essentiel",
    price: "69 €/mois",
    brands: "1",
    ais: "3",
    digest: true,
    criticalAlerts: false,
    competitors: "—",
    whiteLabel: false,
    support: "standard",
  },
  {
    name: "Pro",
    price: "149 €/mois",
    recommended: true,
    brands: "1",
    ais: "5",
    digest: true,
    criticalAlerts: true,
    competitors: "3",
    whiteLabel: false,
    support: "standard",
  },
  {
    name: "Agence",
    price: "349 €/mois",
    brands: "jusqu'à 10",
    ais: "5",
    digest: true,
    criticalAlerts: true,
    competitors: "3 par marque",
    whiteLabel: true,
    support: "prioritaire",
  },
];

function Check({ on }: { on: boolean }) {
  return on ? (
    <span className="text-dopaguard-success">✓</span>
  ) : (
    <span className="text-dopaguard-navyMid/30">—</span>
  );
}

export function PricingTable() {
  return (
    <section id="tarifs" className="mx-auto max-w-5xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-dopaguard-navy sm:text-4xl">
          Une réputation surveillée, à partir de 69 € par mois.
        </h2>
        <p className="mt-4 text-lg text-dopaguard-navyMid/80">
          Essai 14 jours. Sans engagement. Résiliable en un clic.
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-3">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`relative flex flex-col rounded-2xl border bg-white p-6 ${
              plan.recommended ? "border-dopaguard-lime shadow-[0_20px_60px_-15px_rgba(13,46,56,0.25)]" : "border-dopaguard-muted"
            }`}
          >
            {plan.recommended && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-dopaguard-lime px-3 py-1 text-xs font-semibold text-dopaguard-navy">
                Recommandé
              </span>
            )}
            <h3 className="text-lg font-semibold text-dopaguard-navy">{plan.name}</h3>
            <p className="mt-1 text-2xl font-bold text-dopaguard-navy">{plan.price}</p>

            <dl className="mt-6 flex flex-1 flex-col gap-3 text-sm text-dopaguard-navyMid">
              <div className="flex items-center justify-between border-t border-dopaguard-muted pt-3">
                <dt>Marques surveillées</dt>
                <dd className="font-medium">{plan.brands}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-dopaguard-muted pt-3">
                <dt>IA surveillées</dt>
                <dd className="font-medium">{plan.ais}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-dopaguard-muted pt-3">
                <dt>Digest hebdomadaire</dt>
                <dd><Check on={plan.digest} /></dd>
              </div>
              <div className="flex items-center justify-between border-t border-dopaguard-muted pt-3">
                <dt>Alertes critiques immédiates</dt>
                <dd><Check on={plan.criticalAlerts} /></dd>
              </div>
              <div className="flex items-center justify-between border-t border-dopaguard-muted pt-3">
                <dt>Suivi de concurrents</dt>
                <dd className="font-medium">{plan.competitors}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-dopaguard-muted pt-3">
                <dt>Rapports en marque blanche</dt>
                <dd><Check on={plan.whiteLabel} /></dd>
              </div>
              <div className="flex items-center justify-between border-t border-dopaguard-muted pt-3">
                <dt>Support</dt>
                <dd className="font-medium capitalize">{plan.support}</dd>
              </div>
            </dl>

            <button
              type="button"
              disabled
              className={`mt-6 w-full cursor-not-allowed rounded-xl px-4 py-2.5 text-sm font-semibold ${
                plan.recommended
                  ? "bg-dopaguard-navy text-white"
                  : "border border-dopaguard-navy/20 text-dopaguard-navy"
              }`}
            >
              Démarrer l&apos;essai de 14 jours
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
