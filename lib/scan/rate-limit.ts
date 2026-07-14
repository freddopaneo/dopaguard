import type { SupabaseClient } from "@supabase/supabase-js";

const MAX_REQUESTS_PER_IP_PER_HOUR = 3;

export async function isIpRateLimited(supabase: SupabaseClient, ipAddress: string): Promise<boolean> {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

  const { count, error } = await supabase
    .from("free_scans")
    .select("id", { count: "exact", head: true })
    .eq("ip_address", ipAddress)
    .gte("created_at", oneHourAgo);

  if (error) {
    throw error;
  }

  return (count ?? 0) >= MAX_REQUESTS_PER_IP_PER_HOUR;
}
