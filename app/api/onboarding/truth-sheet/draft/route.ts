import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { scrapeWebsite } from "@/lib/firecrawl";
import { draftTruthSheet } from "@/lib/onboarding/draft-truth-sheet";

const draftRequestSchema = z.object({
  brandId: z.string().uuid(),
});

export const maxDuration = 90;

export async function POST(request: NextRequest) {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Non connecté." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const parsed = draftRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const { data: brand } = await supabase
    .from("brands")
    .select("id, name, website")
    .eq("id", parsed.data.brandId)
    .maybeSingle();

  if (!brand) {
    return NextResponse.json({ error: "Marque introuvable." }, { status: 404 });
  }

  try {
    const { markdown } = await scrapeWebsite(brand.website);
    const draft = await draftTruthSheet(brand.name, markdown);
    return NextResponse.json({ draft, scraped: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    try {
      const admin = createAdminClient();
      await admin.from("error_logs").insert({ source: "onboarding-truth-sheet-draft", message, context: { brandId: brand.id } });
    } catch {
      // Le logging ne doit jamais empêcher de répondre au client.
    }
    // Le brouillon échoue (site inaccessible, etc.) : le client remplit manuellement, ce n'est pas bloquant.
    return NextResponse.json({
      draft: { legalStatus: "", offering: "", pricingFacts: "", keyPeople: "", differentiators: "", knownCompetitors: [] },
      scraped: false,
    });
  }
}
