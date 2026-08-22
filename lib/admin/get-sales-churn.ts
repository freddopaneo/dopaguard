import { createAdminClient } from "@/lib/supabase/admin";

export interface DailyCount {
  date: string; // YYYY-MM-DD
  count: number;
}

export interface SalesChurnOverview {
  newSubscriptionsByDay: DailyCount[];
  cancellationsByDay: DailyCount[];
  currentMonthChurnRatePercent: number | null;
}

const DAYS_WINDOW = 30;

function dayKey(iso: string): string {
  return iso.slice(0, 10);
}

function lastNDaysKeys(n: number): string[] {
  const keys: string[] = [];
  const now = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - i));
    keys.push(d.toISOString().slice(0, 10));
  }
  return keys;
}

function startOfCurrentMonthIso(): string {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).toISOString();
}

// Taux de churn du mois = résiliations survenues ce mois-ci ÷ abonnés actifs en
// début de mois (approximé par actifs actuels + résiliations de ce mois, faute
// d'un instantané historique quotidien -- suffisant pour un suivi directionnel).
export async function getSalesChurnOverview(): Promise<SalesChurnOverview> {
  const admin = createAdminClient();
  const windowStart = new Date(Date.now() - DAYS_WINDOW * 24 * 60 * 60 * 1000).toISOString();
  const monthStart = startOfCurrentMonthIso();

  const [{ data: created }, { data: canceled }, { count: activeNow }, { count: canceledThisMonth }] = await Promise.all([
    admin.from("subscriptions").select("created_at").gte("created_at", windowStart),
    admin.from("subscriptions").select("canceled_at").not("canceled_at", "is", null).gte("canceled_at", windowStart),
    admin.from("subscriptions").select("id", { count: "exact", head: true }).in("status", ["active", "trialing"]),
    admin
      .from("subscriptions")
      .select("id", { count: "exact", head: true })
      .not("canceled_at", "is", null)
      .gte("canceled_at", monthStart),
  ]);

  const days = lastNDaysKeys(DAYS_WINDOW);

  const newCounts: Record<string, number> = Object.fromEntries(days.map((d) => [d, 0]));
  for (const row of created ?? []) {
    const key = dayKey(row.created_at as string);
    if (key in newCounts) newCounts[key]++;
  }

  const cancelCounts: Record<string, number> = Object.fromEntries(days.map((d) => [d, 0]));
  for (const row of canceled ?? []) {
    const key = dayKey(row.canceled_at as string);
    if (key in cancelCounts) cancelCounts[key]++;
  }

  const activeStartOfMonth = (activeNow ?? 0) + (canceledThisMonth ?? 0);
  const churnRate = activeStartOfMonth > 0 ? ((canceledThisMonth ?? 0) / activeStartOfMonth) * 100 : null;

  return {
    newSubscriptionsByDay: days.map((date) => ({ date, count: newCounts[date] })),
    cancellationsByDay: days.map((date) => ({ date, count: cancelCounts[date] })),
    currentMonthChurnRatePercent: churnRate,
  };
}
