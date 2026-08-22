import { getRevenueOverview } from "@/lib/admin/get-revenue";
import { PLAN_LABELS } from "@/lib/stripe/plans";

function formatEur(amount: number): string {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(amount);
}

export default async function AdminRevenuePage() {
  const revenue = await getRevenueOverview();

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-white">Revenus</h1>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <p className="text-xs uppercase tracking-wide text-white/40">Abonnés actifs</p>
          <p className="mt-2 text-3xl font-semibold text-white">{revenue.activeCount}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <p className="text-xs uppercase tracking-wide text-white/40">Revenu mensuel récurrent (MRR)</p>
          <p className="mt-2 text-3xl font-semibold text-white">{formatEur(revenue.mrrEur)}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <p className="text-xs uppercase tracking-wide text-white/40">Projection sur 12 mois</p>
          <p className="mt-2 text-3xl font-semibold text-white">{formatEur(revenue.projection12MonthsEur)}</p>
          <p className="mt-1 text-xs text-white/40">À MRR constant — pas une prévision de croissance.</p>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/40">Détail par plan</h2>
        <div className="flex flex-col gap-3">
          {revenue.byPlan.map((p) => (
            <div key={p.plan} className="flex items-center justify-between text-sm">
              <span className="text-white">{PLAN_LABELS[p.plan]}</span>
              <span className="text-white/60">
                {p.count} abonné(s) · {formatEur(p.mrrEur)}/mois
              </span>
            </div>
          ))}
          {revenue.byPlan.length === 0 && <p className="text-sm text-white/40">Aucun abonné actif pour l&apos;instant.</p>}
        </div>
      </div>
    </div>
  );
}
