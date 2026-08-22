import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getMonthlyReportData } from "@/lib/reports/get-monthly-data";
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
    .select("id, name, plan, owner_id, agency_id")
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

      // Réglages white-label (logo + couleur) si la marque appartient à une agence
      // qui les a configurés -- les deux doivent être renseignés, sinon on retombe
      // sur l'identité Dopaguard par défaut plutôt qu'une page de garde à moitié faite.
      let whiteLabel: { logoUrl: string; primaryColor: string } | null = null;
      if (brand.agency_id) {
        const { data: agency } = await supabase
          .from("agencies")
          .select("logo_url, primary_color")
          .eq("id", brand.agency_id)
          .maybeSingle();

        if (agency?.logo_url && agency?.primary_color) {
          const { data: signedLogo } = await supabase.storage.from("logos").createSignedUrl(agency.logo_url, 300);
          if (signedLogo) {
            whiteLabel = { logoUrl: signedLogo.signedUrl, primaryColor: agency.primary_color };
          }
        }
      }

      const pdfBuffer = await renderMonthlyReportPdf({
        brandName: brand.name,
        monthLabel: data.monthLabel,
        data,
        whiteLabel,
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

      summaries.push({ brandId: brand.id, generated: true });
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
