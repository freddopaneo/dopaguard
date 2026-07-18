import { getSubscribers } from "@/lib/admin/get-subscribers";
import { PLAN_LABELS, SUBSCRIPTION_STATUS_LABELS } from "@/lib/stripe/plans";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
}

export default async function AdminSubscribersPage() {
  const subscribers = await getSubscribers();

  return (
    <div>
      <h1 className="mb-2 text-xl font-semibold text-white">Abonnés</h1>
      <p className="mb-6 text-sm text-white/50">{subscribers.length} abonnement(s) au total.</p>

      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-white/40">
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Marque</th>
              <th className="px-4 py-3">Plan</th>
              <th className="px-4 py-3">Montant</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3">Début</th>
              <th className="px-4 py-3">Résilié le</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((s) => (
              <tr key={s.id} className="border-b border-white/5 last:border-0">
                <td className="px-4 py-3 text-white">{s.email}</td>
                <td className="px-4 py-3 text-white/70">{s.brandName ?? "—"}</td>
                <td className="px-4 py-3 text-white/70">{s.plan ? PLAN_LABELS[s.plan] : "—"}</td>
                <td className="px-4 py-3 text-white/70">{s.monthlyAmountEur ? `${s.monthlyAmountEur} €` : "—"}</td>
                <td className="px-4 py-3 text-white/70">{SUBSCRIPTION_STATUS_LABELS[s.status] ?? s.status}</td>
                <td className="px-4 py-3 text-white/50">{formatDate(s.createdAt)}</td>
                <td className="px-4 py-3 text-white/50">{s.canceledAt ? formatDate(s.canceledAt) : "—"}</td>
              </tr>
            ))}
            {subscribers.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-white/40">
                  Aucun abonnement pour l&apos;instant.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
