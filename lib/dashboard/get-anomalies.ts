import type { createServerSupabaseClient } from "@/lib/supabase/server";

export interface AnomalyWithProvider {
  id: string;
  type: string;
  severity: string;
  summary: string | null;
  evidence: string | null;
  expected_truth: string | null;
  status: string;
  created_at: string;
  llmProvider: string | null;
}

export async function getAnomalies(
  supabase: ReturnType<typeof createServerSupabaseClient>,
  brandId: string
): Promise<AnomalyWithProvider[]> {
  const { data } = await supabase
    .from("anomalies")
    .select("id, type, severity, summary, evidence, expected_truth, status, created_at, llm_responses(llm_provider)")
    .eq("brand_id", brandId)
    .order("created_at", { ascending: false });

  return (data ?? []).map((row: Record<string, unknown>) => ({
    id: row.id as string,
    type: row.type as string,
    severity: row.severity as string,
    summary: row.summary as string | null,
    evidence: row.evidence as string | null,
    expected_truth: row.expected_truth as string | null,
    status: row.status as string,
    created_at: row.created_at as string,
    llmProvider: (row.llm_responses as { llm_provider: string } | null)?.llm_provider ?? null,
  }));
}
