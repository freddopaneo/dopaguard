import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { runBrandScan } from "@/lib/scan/run-brand-scan";

export const maxDuration = 300;

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const supabase = createAdminClient();
  const { data: brands, error } = await supabase
    .from("brands")
    .select("id, name, website, sector, plan")
    .in("status", ["trial", "active"]);

  if (error) {
    return NextResponse.json({ error: "Impossible de récupérer les marques." }, { status: 500 });
  }

  // Marques traitées séquentiellement (chacune batch déjà en interne à concurrence 3) :
  // reste sûr vis-à-vis des limites de débit tant que le nombre de clients est faible.
  const summaries = [];
  for (const brand of brands ?? []) {
    try {
      summaries.push(await runBrandScan(brand));
    } catch (scanError) {
      const message = scanError instanceof Error ? scanError.message : String(scanError);
      try {
        await supabase.from("error_logs").insert({ source: "weekly-scan", brand_id: brand.id, message, context: {} });
      } catch {
        // Le logging ne doit jamais interrompre le traitement des autres marques.
      }
    }
  }

  return NextResponse.json({ brandsProcessed: summaries.length, summaries });
}
