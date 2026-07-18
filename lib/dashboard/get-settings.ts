import type { createServerSupabaseClient } from "@/lib/supabase/server";
import type { PlanSlug } from "@/lib/stripe/plans";

export interface SettingsRecord {
  subscription: {
    plan: PlanSlug | null;
    status: string | null;
    currentPeriodEnd: string | null;
  } | null;
  notifications: {
    notifyCriticalAlerts: boolean;
    notifyWeeklyDigest: boolean;
  };
  hasPendingDeletionRequest: boolean;
}

export async function getSettings(
  supabase: ReturnType<typeof createServerSupabaseClient>,
  userId: string
): Promise<SettingsRecord> {
  const [subscriptionResult, profileResult, deletionRequestResult] = await Promise.all([
    supabase
      .from("subscriptions")
      .select("plan, status, current_period_end")
      .eq("profile_id", userId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase.from("profiles").select("notify_critical_alerts, notify_weekly_digest").eq("id", userId).maybeSingle(),
    supabase.from("account_deletion_requests").select("id").eq("profile_id", userId).is("processed_at", null).maybeSingle(),
  ]);

  return {
    subscription: subscriptionResult.data
      ? {
          plan: subscriptionResult.data.plan as PlanSlug | null,
          status: subscriptionResult.data.status,
          currentPeriodEnd: subscriptionResult.data.current_period_end,
        }
      : null,
    notifications: {
      notifyCriticalAlerts: profileResult.data?.notify_critical_alerts ?? true,
      notifyWeeklyDigest: profileResult.data?.notify_weekly_digest ?? true,
    },
    hasPendingDeletionRequest: Boolean(deletionRequestResult.data),
  };
}
