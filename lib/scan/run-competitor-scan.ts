import { createAdminClient } from "@/lib/supabase/admin";
import { callLLM } from "@/lib/llm-gateway";
import { renderPrompt } from "@/lib/prompts";
import { reputationPrompts } from "@/lib/prompts/reputation";
import { recommendationPrompts } from "@/lib/prompts/recommendation";
import { comparisonPrompts } from "@/lib/prompts/comparison";
import { getIsoWeek } from "./iso-week";
import { mapWithConcurrency } from "./concurrency";
import { PLAN_PROVIDERS } from "./run-brand-scan";

const CONCURRENCY = 3;

// 3 prompts génériques (un par catégorie), pas les 20-30 du client : un concurrent
// n'a pas de fiche de vérité, les prompts tarifs/factuels n'ont pas de sens pour lui
// -- cf. décision de cadrage du Sprint 5 (garder le coût maîtrisé, un seul concurrent
// suivi à la fois).
const COMPETITOR_PROMPT_TEMPLATES = [reputationPrompts[0], recommendationPrompts[0], comparisonPrompts[0]];

export interface BrandForCompetitorScan {
  id: string;
  plan: string | null;
}

export interface CompetitorScanSummary {
  brandId: string;
  callsMade: number;
  callsSkipped: number;
  errors: number;
}

// Interroge les mêmes IA que la marque au sujet de son concurrent suivi, avec un jeu
// de prompts réduit et fixe -- même mécanique d'idempotence que runBrandScan (rien
// n'est rejoué si déjà présent pour la semaine ISO courante).
export async function runCompetitorScan(brand: BrandForCompetitorScan, competitorName: string): Promise<CompetitorScanSummary> {
  const supabase = createAdminClient();
  const { week, year } = getIsoWeek(new Date());
  const providers = PLAN_PROVIDERS[brand.plan ?? "essentiel"] ?? PLAN_PROVIDERS.essentiel;

  const promptRows: { id: string; template: string }[] = [];
  for (const promptTemplate of COMPETITOR_PROMPT_TEMPLATES) {
    const { data } = await supabase
      .from("prompt_templates")
      .select("id, template")
      .eq("template", promptTemplate.template)
      .limit(1)
      .maybeSingle();
    if (data) promptRows.push(data);
  }

  const { data: existing } = await supabase
    .from("llm_responses")
    .select("prompt_template_id, llm_provider")
    .eq("brand_id", brand.id)
    .eq("week_number", week)
    .eq("year", year)
    .eq("competitor_name", competitorName);

  const doneKeys = new Set((existing ?? []).map((row) => `${row.prompt_template_id}:${row.llm_provider}`));

  const pairs = promptRows
    .flatMap((p) => providers.map((provider) => ({ promptTemplateId: p.id, template: p.template, provider })))
    .filter((pair) => !doneKeys.has(`${pair.promptTemplateId}:${pair.provider}`));

  let callsMade = 0;
  let errors = 0;

  await mapWithConcurrency(pairs, CONCURRENCY, async (pair) => {
    const prompt = renderPrompt(pair.template, { brand: competitorName });

    try {
      const result = await callLLM({ provider: pair.provider, prompt });

      const { error: insertError } = await supabase.from("llm_responses").insert({
        brand_id: brand.id,
        prompt_template_id: pair.promptTemplateId,
        llm_provider: pair.provider,
        llm_model: result.model,
        prompt_sent: prompt,
        response_text: result.text,
        week_number: week,
        year,
        competitor_name: competitorName,
      });
      if (insertError) throw insertError;

      const { error: usageError } = await supabase.from("api_usage").insert({
        brand_id: brand.id,
        provider: pair.provider,
        tokens_in: result.tokensIn,
        tokens_out: result.tokensOut,
        estimated_cost_eur: result.estimatedCostEur,
      });
      if (usageError) throw usageError;

      callsMade++;
    } catch (error) {
      errors++;
      const message = error instanceof Error ? error.message : String(error);
      try {
        await supabase.from("error_logs").insert({
          source: "weekly-scan-competitor",
          brand_id: brand.id,
          message,
          context: { provider: pair.provider, promptTemplateId: pair.promptTemplateId, competitorName },
        });
      } catch {
        // Le logging ne doit jamais interrompre le scan des autres prompts/marques.
      }
    }
  });

  return { brandId: brand.id, callsMade, callsSkipped: doneKeys.size, errors };
}
