import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getMonthlyReportData } from "@/lib/reports/get-monthly-data";
import { generateMonthlyRecommendations } from "@/lib/reports/generate-recommendations";
import { renderMonthlyReportPdf } from "@/lib/reports/render-pdf";
import { sendMonthlyReportEmail } from "@/lib/email/resend";
import { getAppUrl } from "@/lib/app-url";

export const maxDuration = 300;

const SIGNED_URL_EXPIRY_SECONDS = 60 * 60 * 24 * 365; // 1 an -- le lien part par email, doit rester utilisable longtemps.

function getPreviousMonth(date: Date): { month: number; year: number } {
  const month = date.getUTCMonth(); // 0-11, mois précédent le mois en cours (0-indexed = déjà "mois - 1")
  if (month === 0) return { month: 12, year: date.getUTCFullYear() - 1 };
  return { month, year: date.getUTCFullYear() };
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { month, year } = getPreviousMonth(new Date());

  const supabase = createAdminClient();
  const { data: brands, error } = await supabase
    .from("brands")
    .select("id, name, plan, owner_id")
    .in("status", ["trial", "active"]);

  if (error) {
    return NextResponse.json({ error: "Impossible de récupérer les marques." }, { status: 500 });
  }

  const summaries: Record<string, unknown>[] = [];

  for (const brand of brands ?? []) {
    try {
      const { data: existing } = await supabase
        .from("reports")
        .select("id")
        .eq("brand_id", brand.id)
        .eq("month", month)
        .eq("year", year)
        .maybeSingle();

      if (existing) {
        summaries.push({ brandId: brand.id, skipped: "already_generated" });
        continue;
      }

      const data = await getMonthlyReportData(supabase, { brandId: brand.id, plan: brand.plan, month, year });

      if (data.score.weeksIncluded === 0) {
        summaries.push({ brandId: brand.id, skipped: "no_data_yet" });
        continue;
      }

      const topAnomalySummaries = [...data.anomalies.open, ...data.anomalies.resolved]
        .slice(0, 5)
        .map((a) => ({ type: a.type, severity: a.severity, summary: a.summary }));

      const recos = await generateMonthlyRecommendations({
        brandName: brand.name,
        monthLabel: data.monthLabel,
        score: data.score.current,
        previousScore: data.score.previous,
        anomaliesOpenCount: data.anomalies.open.length,
        anomaliesResolvedCount: data.anomalies.resolved.length,
        topAnomalySummaries,
      });

      const { error: usageError } = await supabase.from("api_usage").insert({
        brand_id: brand.id,
        provider: "anthropic",
        tokens_in: recos.tokensIn,
        tokens_out: recos.tokensOut,
        estimated_cost_eur: recos.estimatedCostEur,
      });
      if (usageError) throw usageError;

      const pdfBuffer = await renderMonthlyReportPdf({
        brandName: brand.name,
        monthLabel: data.monthLabel,
        data,
        recommendations: recos.recommendations,
      });

      const path = `${brand.id}/${year}-${String(month).padStart(2, "0")}.pdf`;
      const { error: uploadError } = await supabase.storage
        .from("reports")
        .upload(path, pdfBuffer, { contentType: "application/pdf", upsert: true });
      if (uploadError) throw uploadError;

      const { data: signed, error: signedError } = await supabase.storage
        .from("reports")
        .createSignedUrl(path, SIGNED_URL_EXPIRY_SECONDS);
      if (signedError || !signed) throw signedError || new Error("Échec de génération de l'URL signée.");

      const { error: insertError } = await supabase
        .from("reports")
        .insert({ brand_id: brand.id, month, year, pdf_url: signed.signedUrl });
      if (insertError) throw insertError;

      const { data: owner } = await supabase.from("profiles").select("email").eq("id", brand.owner_id).maybeSingle();
      if (owner?.email) {
        await sendMonthlyReportEmail({
          to: owner.email,
          brandName: brand.name,
          monthLabel: data.monthLabel,
          pdfUrl: signed.signedUrl,
          dashboardUrl: `${getAppUrl()}/login`,
        });
      }

      summaries.push({ brandId: brand.id, generated: true, recommendationsCount: recos.recommendations.length });
    } catch (genError) {
      const message = genError instanceof Error ? genError.message : String(genError);
      try {
        await supabase.from("error_logs").insert({ source: "monthly-reports", brand_id: brand.id, message, context: {} });
      } catch {
        // Le logging ne doit jamais interrompre le traitement des autres marques.
      }
      summaries.push({ brandId: brand.id, error: message });
    }
  }

  return NextResponse.json({ month, year, brandsProcessed: summaries.length, summaries });
}
