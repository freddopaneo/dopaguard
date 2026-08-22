import { createAdminClient } from "@/lib/supabase/admin";

export interface ApiCostOverview {
  totalAllTimeEur: number;
  totalThisMonthEur: number;
  activeBrandsCount: number;
  costPerActiveBrandThisMonthEur: number | null;
}

function startOfCurrentMonthIso(): string {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).toISOString();
}

// CDC 9.6 : "coût API moyen par marque < 5 €/mois vérifiable dans la table api_usage".
export async function getApiCostOverview(): Promise<ApiCostOverview> {
  const admin = createAdminClient();
  const monthStart = startOfCurrentMonthIso();

  const [{ data: allTime }, { data: thisMonth }, { count: activeBrandsCount }] = await Promise.all([
    admin.from("api_usage").select("estimated_cost_eur"),
    admin.from("api_usage").select("estimated_cost_eur").gte("created_at", monthStart),
    admin.from("brands").select("id", { count: "exact", head: true }).in("status", ["trial", "active"]),
  ]);

  const totalAllTimeEur = (allTime ?? []).reduce((sum, r) => sum + Number(r.estimated_cost_eur ?? 0), 0);
  const totalThisMonthEur = (thisMonth ?? []).reduce((sum, r) => sum + Number(r.estimated_cost_eur ?? 0), 0);
  const brandsCount = activeBrandsCount ?? 0;

  return {
    totalAllTimeEur,
    totalThisMonthEur,
    activeBrandsCount: brandsCount,
    costPerActiveBrandThisMonthEur: brandsCount > 0 ? totalThisMonthEur / brandsCount : null,
  };
}
