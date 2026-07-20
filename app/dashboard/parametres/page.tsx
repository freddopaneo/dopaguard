import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getCurrentBrand, SELECTED_BRAND_COOKIE } from "@/lib/dashboard/get-current-brand";
import { getSettings } from "@/lib/dashboard/get-settings";
import { NotificationSettings } from "@/components/dashboard/NotificationSettings";
import { PasswordSettings } from "@/components/dashboard/PasswordSettings";
import { AccountDeletion } from "@/components/dashboard/AccountDeletion";
import { Button } from "@/components/ui/Button";
import { PLAN_LABELS, SUBSCRIPTION_STATUS_LABELS } from "@/lib/stripe/plans";

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

  const selectedBrandId = cookies().get(SELECTED_BRAND_COOKIE)?.value ?? null;
  const brand = await getCurrentBrand(supabase, user.id, selectedBrandId);
  const settings = await getSettings(supabase, user.id);

  if (!brand) {
    redirect(settings.subscription?.plan === "agence" ? "/dashboard/marques" : "/onboarding");
  }

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

      <section className="mb-6 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/40">Notifications</h2>
        <NotificationSettings
          initialNotifyCriticalAlerts={settings.notifications.notifyCriticalAlerts}
          initialNotifyWeeklyDigest={settings.notifications.notifyWeeklyDigest}
        />
      </section>

      <section className="mb-6 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/40">Sécurité</h2>
        <PasswordSettings />
      </section>

      <section className="mb-6 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/40">Documents légaux</h2>
        <div className="flex flex-wrap gap-4 text-sm">
          <a href="/mentions-legales" target="_blank" rel="noreferrer" className="text-white/70 underline hover:text-white">
            Mentions légales
          </a>
          <a href="/cgv" target="_blank" rel="noreferrer" className="text-white/70 underline hover:text-white">
            CGV
          </a>
          <a href="/confidentialite" target="_blank" rel="noreferrer" className="text-white/70 underline hover:text-white">
            Politique de confidentialité
          </a>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/40">Compte</h2>
        <AccountDeletion initialHasPendingRequest={settings.hasPendingDeletionRequest} />
      </section>
    </div>
  );
}
