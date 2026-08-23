import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

// Sans ceci, Next.js met cette route en cache statique en production après le
// premier appel : la page de progression restait bloquée sur le tout premier
// résultat lu (status "verified", progress vide) au lieu de suivre le scan en
// cours, jusqu'à ce que /run renvoie directement le résultat final.
export const dynamic = "force-dynamic";

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createAdminClient();

  const { data: scan, error } = await supabase
    .from("free_scans")
    .select("id, brand_name, status, results, progress")
    .eq("id", params.id)
    .maybeSingle();

  if (error || !scan) {
    return NextResponse.json({ error: "Scan introuvable." }, { status: 404 });
  }

  return NextResponse.json({
    id: scan.id,
    brandName: scan.brand_name,
    status: scan.status,
    results: scan.status === "completed" ? scan.results : null,
    progress: scan.progress ?? [],
  });
}
