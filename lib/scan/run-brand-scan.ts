import { createAdminClient } from "@/lib/supabase/admin";
import { callLLM, type LLMProvider } from "@/lib/llm-gateway";
import { renderPrompt } from "@/lib/prompts";
import { getIsoWeek } from "./iso-week";
import { mapWithConcurrency } from "./concurrency";

const PLAN_PROVIDERS: Record<string, LLMProvider[]> = {
  essentiel: ["openai", "anthropic", "perplexity"],
  pro: ["openai", "anthropic", "perplexity", "google", "mistral"],
  agence: ["openai", "anthropic", "perplexity", "google", "mistral"],
};

const CONCURRENCY = 3;

export interface BrandForScan {
  id: string;
  name: string;
  website: string;
  sector: string | null;
  plan: string | null;
}

export interface BrandScanSummary {
  brandId: string;
  callsMade: number;
  callsSkipped: number;
  errors: number;
}

// Interroge les IA du plan de la marque pour ses prompts actifs et stocke les
// réponses brutes -- aucune analyse ici (CDC 6.3, "stockage brut systématique
// avant analyse"), le jugement/scores arrivent à l'Étape 6.
export async function runBrandScan(brand: BrandForScan): Promise<BrandScanSummary> {
  const supabase = createAdminClient();
  const { week, year } = getIsoWeek(new Date());
  const providers = PLAN_PROVIDERS[brand.plan ?? "essentiel"] ?? PLAN_PROVIDERS.essentiel;

  const { data: brandPrompts } = await supabase
    .from("brand_prompts")
    .select("prompt_template_id, prompt_templates(id, template)")
    .eq("brand_id", brand.id)
    .eq("enabled", true);

  interface JoinedPrompt {
    id: string;
    template: string;
  }

  const prompts: JoinedPrompt[] = ((brandPrompts ?? []) as unknown as { prompt_templates: JoinedPrompt | null }[])
    .map((row) => row.prompt_templates)
    .filter((template): template is JoinedPrompt => Boolean(template));

  const { data: existing } = await supabase
    .from("llm_responses")
    .select("prompt_template_id, llm_provider")
    .eq("brand_id", brand.id)
    .eq("week_number", week)
    .eq("year", year);

  const doneKeys = new Set((existing ?? []).map((row) => `${row.prompt_template_id}:${row.llm_provider}`));

  const pairs = prompts
    .flatMap((p) => providers.map((provider) => ({ promptTemplateId: p.id, template: p.template, provider })))
    .filter((pair) => !doneKeys.has(`${pair.promptTemplateId}:${pair.provider}`));

  let callsMade = 0;
  let errors = 0;

  await mapWithConcurrency(pairs, CONCURRENCY, async (pair) => {
    const prompt = renderPrompt(pair.template, {
      brand: brand.name,
      website: brand.website,
      sector: brand.sector ?? undefined,
    });

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
          source: "weekly-scan",
          brand_id: brand.id,
          message,
          context: { provider: pair.provider, promptTemplateId: pair.promptTemplateId },
        });
      } catch {
        // Le logging ne doit jamais interrompre le scan des autres prompts/marques.
      }
    }
  });

  return { brandId: brand.id, callsMade, callsSkipped: doneKeys.size, errors };
}
