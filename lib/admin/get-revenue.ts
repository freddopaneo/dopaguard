import { createAdminClient } from "@/lib/supabase/admin";
import { PLAN_PRICES_EUR, type PlanSlug } from "@/lib/stripe/plans";

export interface RevenueOverview {
  activeCount: number;
  mrrEur: number;
  projection12MonthsEur: number;
  byPlan: { plan: PlanSlug; count: number; mrrEur: number }[];
}

const ACTIVE_STATUSES = ["active", "trialing"];

export async function getRevenueOverview(): Promise<RevenueOverview> {
  const admin = createAdminClient();
  const { data } = await admin.from("subscriptions").select("plan, status").in("status", ACTIVE_STATUSES);

  const countByPlan: Record<string, number> = {};
  for (const row of data ?? []) {
    const plan = row.plan as PlanSlug | null;
    if (!plan) continue;
    countByPlan[plan] = (countByPlan[plan] ?? 0) + 1;
  }

  const byPlan = (Object.entries(countByPlan) as [PlanSlug, number][]).map(([plan, count]) => ({
    plan,
    count,
    mrrEur: count * PLAN_PRICES_EUR[plan],
  }));

  const mrrEur = byPlan.reduce((sum, p) => sum + p.mrrEur, 0);
  const activeCount = byPlan.reduce((sum, p) => sum + p.count, 0);

  return {
    activeCount,
    mrrEur,
    projection12MonthsEur: mrrEur * 12,
    byPlan,
  };
}
