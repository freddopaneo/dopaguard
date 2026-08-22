import { getApiCostOverview } from "@/lib/admin/get-api-costs";

function formatEur(amount: number): string {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 2 }).format(amount);
}

export default async function AdminCostsPage() {
  const costs = await getApiCostOverview();
  const overThreshold = costs.costPerActiveBrandThisMonthEur !== null && costs.costPerActiveBrandThisMonthEur > 5;

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-white">Coûts IA</h1>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <p className="text-xs uppercase tracking-wide text-white/40">Coût total ce mois-ci</p>
          <p className="mt-2 text-3xl font-semibold text-white">{formatEur(costs.totalThisMonthEur)}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <p className="text-xs uppercase tracking-wide text-white/40">Coût total depuis le début</p>
          <p className="mt-2 text-3xl font-semibold text-white">{formatEur(costs.totalAllTimeEur)}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <p className="text-xs uppercase tracking-wide text-white/40">Marques actives</p>
          <p className="mt-2 text-3xl font-semibold text-white">{costs.activeBrandsCount}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <p className="text-xs uppercase tracking-wide text-white/40">Coût moyen / marque ce mois-ci</p>
          <p className={`mt-2 text-3xl font-semibold ${overThreshold ? "text-dopaguard-critical" : "text-white"}`}>
            {costs.costPerActiveBrandThisMonthEur !== null ? formatEur(costs.costPerActiveBrandThisMonthEur) : "—"}
          </p>
          <p className="mt-1 text-xs text-white/40">Cible du cahier des charges : moins de 5 € / marque / mois.</p>
        </div>
      </div>
    </div>
  );
}
