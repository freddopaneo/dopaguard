import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { runScan } from "@/lib/scan/run-scan";

export const maxDuration = 120;

export async function POST(_request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createAdminClient();

  const { data: scan, error: lookupError } = await supabase
    .from("free_scans")
    .select("id, brand_name, status, results")
    .eq("id", params.id)
    .maybeSingle();

  if (lookupError || !scan) {
    return NextResponse.json({ error: "Scan introuvable." }, { status: 404 });
  }

  if (scan.status === "completed") {
    return NextResponse.json({ status: "completed", results: scan.results });
  }

  if (scan.status !== "verified") {
    // Déjà 'scanning' (une autre requête a la main) ou pas encore vérifié : rien à faire ici,
    // le client doit interroger GET /api/scan/{id} pour suivre l'avancement.
    return NextResponse.json({ status: scan.status });
  }

  // Verrou optimiste : ne démarre que si le statut est encore 'verified' au moment de l'update,
  // pour éviter deux exécutions concurrentes du même scan (donc un double coût).
  const { data: locked, error: lockError } = await supabase
    .from("free_scans")
    .update({ status: "scanning" })
    .eq("id", scan.id)
    .eq("status", "verified")
    .select("id")
    .maybeSingle();

  if (lockError) {
    try {
      await supabase.from("error_logs").insert({
        source: "scan-engine",
        message: `Echec du verrou de scan: ${lockError.message}`,
        context: { scanId: scan.id },
      });
    } catch {
      // Le logging ne doit jamais empêcher de répondre au client.
    }
    return NextResponse.json({ error: "Une erreur est survenue pendant le scan." }, { status: 500 });
  }

  if (!locked) {
    return NextResponse.json({ status: "scanning" });
  }

  try {
    const result = await runScan(scan.brand_name);

    for (const entry of result.responses) {
      if (entry.error) {
        try {
          await supabase.from("error_logs").insert({
            source: "scan-engine",
            message: entry.error,
            context: { scanId: scan.id, provider: entry.provider, category: entry.category },
          });
        } catch {
          // Le logging ne doit jamais empêcher la suite du traitement.
        }
      }
    }

    const results = { responses: result.responses };

    await supabase
      .from("free_scans")
      .update({
        results,
        tokens_in: result.tokensIn,
        tokens_out: result.tokensOut,
        estimated_cost_eur: result.estimatedCostEur,
        status: "completed",
      })
      .eq("id", scan.id);

    return NextResponse.json({ status: "completed", results });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    try {
      await supabase.from("error_logs").insert({ source: "scan-engine", message, context: { scanId: scan.id } });
    } catch {
      // idem
    }
    // Remettre en 'verified' pour permettre une nouvelle tentative plutôt que de rester bloqué en 'scanning'.
    await supabase.from("free_scans").update({ status: "verified" }).eq("id", scan.id);
    return NextResponse.json({ error: "Une erreur est survenue pendant le scan." }, { status: 500 });
  }
}
