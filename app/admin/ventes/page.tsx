import { getSalesChurnOverview } from "@/lib/admin/get-sales-churn";
import { DailyBarChart } from "@/components/admin/DailyBarChart";

export default async function AdminSalesChurnPage() {
  const overview = await getSalesChurnOverview();
  const newTotal = overview.newSubscriptionsByDay.reduce((sum, d) => sum + d.count, 0);
  const canceledTotal = overview.cancellationsByDay.reduce((sum, d) => sum + d.count, 0);

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-white">Ventes & résiliations</h1>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <p className="text-xs uppercase tracking-wide text-white/40">Nouveaux abonnements (30 j)</p>
          <p className="mt-2 text-3xl font-semibold text-white">{newTotal}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <p className="text-xs uppercase tracking-wide text-white/40">Résiliations (30 j)</p>
          <p className="mt-2 text-3xl font-semibold text-white">{canceledTotal}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <p className="text-xs uppercase tracking-wide text-white/40">Taux de churn (mois en cours)</p>
          <p className="mt-2 text-3xl font-semibold text-white">
            {overview.currentMonthChurnRatePercent !== null ? `${overview.currentMonthChurnRatePercent.toFixed(1)} %` : "—"}
          </p>
        </div>
      </div>

      <div className="mb-6 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
        <p className="mb-4 text-sm text-white/60">Nouveaux abonnements par jour</p>
        <DailyBarChart data={overview.newSubscriptionsByDay} color="#c7ff98" />
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
        <p className="mb-4 text-sm text-white/60">Résiliations par jour</p>
        <DailyBarChart data={overview.cancellationsByDay} color="#EF4444" />
      </div>
    </div>
  );
}
