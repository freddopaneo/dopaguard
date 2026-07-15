import { callLLM, type LLMProvider } from "@/lib/llm-gateway";
import { PROMPT_TEMPLATES, renderPrompt } from "@/lib/prompts";
import { judgeResponse, type ResponseFlag } from "./judge";

const PROVIDERS: LLMProvider[] = ["openai", "anthropic", "perplexity"];

export interface ScanResponseEntry {
  provider: LLMProvider;
  model: string;
  category: string;
  promptSent: string;
  responseText: string | null;
  flags: ResponseFlag[];
  error: string | null;
}

export interface ScanResult {
  responses: ScanResponseEntry[];
  tokensIn: number;
  tokensOut: number;
  estimatedCostEur: number;
}

interface ChainResult extends ScanResponseEntry {
  tokensIn: number;
  tokensOut: number;
  estimatedCostEur: number;
}

async function runChain(brandName: string, category: string, template: string, provider: LLMProvider): Promise<ChainResult> {
  const prompt = renderPrompt(template, { brand: brandName });

  let scanResult;
  try {
    scanResult = await callLLM({ provider, prompt });
  } catch (error) {
    return {
      provider,
      model: "",
      category,
      promptSent: prompt,
      responseText: null,
      flags: [],
      error: error instanceof Error ? error.message : String(error),
      tokensIn: 0,
      tokensOut: 0,
      estimatedCostEur: 0,
    };
  }

  try {
    const judged = await judgeResponse(brandName, scanResult.text);
    return {
      provider,
      model: scanResult.model,
      category,
      promptSent: prompt,
      responseText: scanResult.text,
      flags: judged.flags,
      error: null,
      tokensIn: scanResult.tokensIn + judged.tokensIn,
      tokensOut: scanResult.tokensOut + judged.tokensOut,
      estimatedCostEur: scanResult.estimatedCostEur + judged.estimatedCostEur,
    };
  } catch {
    // Le scan a réussi mais le jugement a échoué : on garde la réponse brute sans annotations.
    return {
      provider,
      model: scanResult.model,
      category,
      promptSent: prompt,
      responseText: scanResult.text,
      flags: [],
      error: null,
      tokensIn: scanResult.tokensIn,
      tokensOut: scanResult.tokensOut,
      estimatedCostEur: scanResult.estimatedCostEur,
    };
  }
}

export async function runScan(brandName: string): Promise<ScanResult> {
  const chains = PROMPT_TEMPLATES.flatMap((template) =>
    PROVIDERS.map((provider) => ({ category: template.category, template: template.template, provider }))
  );

  const results = await Promise.all(
    chains.map(({ category, template, provider }) => runChain(brandName, category, template, provider))
  );

  const totals = results.reduce(
    (acc, r) => ({
      tokensIn: acc.tokensIn + r.tokensIn,
      tokensOut: acc.tokensOut + r.tokensOut,
      estimatedCostEur: acc.estimatedCostEur + r.estimatedCostEur,
    }),
    { tokensIn: 0, tokensOut: 0, estimatedCostEur: 0 }
  );

  const responses: ScanResponseEntry[] = results.map((r) => ({
    provider: r.provider,
    model: r.model,
    category: r.category,
    promptSent: r.promptSent,
    responseText: r.responseText,
    flags: r.flags,
    error: r.error,
  }));

  return { responses, ...totals };
}
