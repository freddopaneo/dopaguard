import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getSettings } from "@/lib/dashboard/get-settings";
import { NotificationSettings } from "@/components/dashboard/NotificationSettings";
import { Button } from "@/components/ui/Button";
import { PLAN_LABELS } from "@/lib/stripe/plans";

const SUBSCRIPTION_STATUS_LABELS: Record<string, string> = {
  active: "Actif",
  trialing: "Période d'essai",
  past_due: "Paiement en retard",
  canceled: "Résilié",
  incomplete: "Incomplet",
  incomplete_expired: "Expiré",
  paused: "En pause",
  unpaid: "Impayé",
};

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export default async function ParametresPage() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: brand } = await supabase
    .from("brands")
    .select("id")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!brand) {
    redirect("/onboarding");
  }

  const settings = await getSettings(supabase, user.id);

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-white">Paramètres</h1>

      <section className="mb-6 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/40">Plan &amp; facturation</h2>
        {settings.subscription ? (
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-white">
                Plan{" "}
                <span className="font-semibold">
                  {(settings.subscription.plan && PLAN_LABELS[settings.subscription.plan]) ?? settings.subscription.plan}
                </span>
              </p>
              <p className="text-sm text-white/50">
                Statut :{" "}
                {(settings.subscription.status && SUBSCRIPTION_STATUS_LABELS[settings.subscription.status]) ??
                  settings.subscription.status}
                {settings.subscription.currentPeriodEnd &&
                  ` · Prochaine facturation le ${formatDate(settings.subscription.currentPeriodEnd)}`}
              </p>
            </div>
            <form action="/api/stripe/portal" method="POST">
              <Button type="submit">Gérer ma facturation</Button>
            </form>
          </div>
        ) : (
          <p className="text-sm text-white/50">Aucun abonnement actif.</p>
        )}
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/40">Notifications</h2>
        <NotificationSettings
          initialNotifyCriticalAlerts={settings.notifications.notifyCriticalAlerts}
          initialNotifyWeeklyDigest={settings.notifications.notifyWeeklyDigest}
        />
      </section>
    </div>
  );
}
