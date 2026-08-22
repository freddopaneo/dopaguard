import { createAdminClient } from "@/lib/supabase/admin";
import { PLAN_PRICES_EUR, type PlanSlug } from "@/lib/stripe/plans";

export interface SubscriberRow {
  id: string;
  email: string;
  brandName: string | null;
  plan: PlanSlug | null;
  monthlyAmountEur: number | null;
  status: string;
  createdAt: string;
  canceledAt: string | null;
}

// Client_role : lit toutes les marques/tous les comptes, réservé à l'espace admin
// (jamais appelé sans vérification préalable de profiles.role = 'admin').
export async function getSubscribers(): Promise<SubscriberRow[]> {
  const admin = createAdminClient();
  const { data } = await admin
    .from("subscriptions")
    .select("id, plan, status, created_at, canceled_at, profiles(email), brands(name)")
    .order("created_at", { ascending: false });

  return (data ?? []).map((row: Record<string, unknown>) => {
    const plan = row.plan as PlanSlug | null;
    return {
      id: row.id as string,
      email: (row.profiles as { email: string } | null)?.email ?? "—",
      brandName: (row.brands as { name: string } | null)?.name ?? null,
      plan,
      monthlyAmountEur: plan ? PLAN_PRICES_EUR[plan] : null,
      status: row.status as string,
      createdAt: row.created_at as string,
      canceledAt: row.canceled_at as string | null,
    };
  });
}
