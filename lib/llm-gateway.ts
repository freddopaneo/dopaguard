export type LLMProvider = "openai" | "anthropic" | "perplexity" | "google" | "mistral";

export interface CallLLMParams {
  provider: LLMProvider;
  model?: string;
  prompt: string;
}

export interface CallLLMResult {
  provider: LLMProvider;
  model: string;
  text: string;
  tokensIn: number;
  tokensOut: number;
  estimatedCostEur: number;
}

export class LLMGatewayError extends Error {
  provider: LLMProvider;
  model: string;

  constructor(provider: LLMProvider, model: string, message: string) {
    super(message);
    this.name = "LLMGatewayError";
    this.provider = provider;
    this.model = model;
  }
}

const DEFAULT_MODELS: Record<LLMProvider, string> = {
  openai: "gpt-4o",
  anthropic: "claude-sonnet-5",
  perplexity: "sonar",
  google: "gemini-2.0-flash",
  mistral: "mistral-small-latest",
};

// Tarifs approximatifs en USD par million de tokens (entrée/sortie), juillet 2026.
// À ajuster si les fournisseurs changent leurs prix — n'affecte que l'estimation de coût, pas les appels.
const PRICING_USD_PER_MILLION: Record<LLMProvider, { in: number; out: number }> = {
  openai: { in: 2.5, out: 10 },
  anthropic: { in: 3, out: 15 },
  perplexity: { in: 1, out: 1 },
  google: { in: 0.1, out: 0.4 },
  mistral: { in: 0.2, out: 0.6 },
};

const USD_TO_EUR = 0.92;

const TIMEOUT_MS = 60_000;
const MAX_ATTEMPTS = 3;
const RETRY_DELAYS_MS = [1000, 2000];

function estimateCostEur(provider: LLMProvider, tokensIn: number, tokensOut: number): number {
  const pricing = PRICING_USD_PER_MILLION[provider];
  const usd = (tokensIn / 1_000_000) * pricing.in + (tokensOut / 1_000_000) * pricing.out;
  return usd * USD_TO_EUR;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithTimeout(url: string, init: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

interface RawLLMResult {
  text: string;
  tokensIn: number;
  tokensOut: number;
}

async function callOpenAI(model: string, prompt: string): Promise<RawLLMResult> {
  const res = await fetchWithTimeout("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    }),
  });
  if (!res.ok) throw new Error(`OpenAI ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return {
    text: data.choices[0].message.content,
    tokensIn: data.usage.prompt_tokens,
    tokensOut: data.usage.completion_tokens,
  };
}

async function callAnthropic(model: string, prompt: string): Promise<RawLLMResult> {
  const res = await fetchWithTimeout("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY ?? "",
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: 1024,
      // Pas de "temperature" ici : Claude Sonnet 5 rejette ce paramètre (erreur 400)
      // dès qu'il diffère de la valeur par défaut, à cause de son raisonnement adaptatif.
      messages: [{ role: "user", content: prompt }],
    }),
  });
  if (!res.ok) throw new Error(`Anthropic ${res.status}: ${await res.text()}`);
  const data = await res.json();
  // Claude Sonnet 5 peut émettre un bloc "thinking" avant le bloc "text" (raisonnement
  // adaptatif) -- prendre content[0] à l'aveugle récupérait parfois le bloc de réflexion
  // (sans champ .text) au lieu de la vraie réponse. On cherche explicitement le bloc texte.
  const textBlock = (data.content ?? []).find((block: { type: string }) => block.type === "text");
  if (!textBlock) throw new Error("Anthropic: aucun bloc de texte dans la réponse.");
  return {
    text: textBlock.text,
    tokensIn: data.usage.input_tokens,
    tokensOut: data.usage.output_tokens,
  };
}

async function callPerplexity(model: string, prompt: string): Promise<RawLLMResult> {
  const res = await fetchWithTimeout("https://api.perplexity.ai/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    }),
  });
  if (!res.ok) throw new Error(`Perplexity ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return {
    text: data.choices[0].message.content,
    tokensIn: data.usage.prompt_tokens,
    tokensOut: data.usage.completion_tokens,
  };
}

async function callGoogle(model: string, prompt: string): Promise<RawLLMResult> {
  const res = await fetchWithTimeout(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GOOGLE_AI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7 },
      }),
    }
  );
  if (!res.ok) throw new Error(`Google ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return {
    text: data.candidates[0].content.parts[0].text,
    tokensIn: data.usageMetadata.promptTokenCount,
    tokensOut: data.usageMetadata.candidatesTokenCount,
  };
}

async function callMistral(model: string, prompt: string): Promise<RawLLMResult> {
  const res = await fetchWithTimeout("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    }),
  });
  if (!res.ok) throw new Error(`Mistral ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return {
    text: data.choices[0].message.content,
    tokensIn: data.usage.prompt_tokens,
    tokensOut: data.usage.completion_tokens,
  };
}

const CALLERS: Record<LLMProvider, (model: string, prompt: string) => Promise<RawLLMResult>> = {
  openai: callOpenAI,
  anthropic: callAnthropic,
  perplexity: callPerplexity,
  google: callGoogle,
  mistral: callMistral,
};

export async function callLLM({ provider, model, prompt }: CallLLMParams): Promise<CallLLMResult> {
  const resolvedModel = model ?? DEFAULT_MODELS[provider];
  const caller = CALLERS[provider];

  let lastError: unknown;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const { text, tokensIn, tokensOut } = await caller(resolvedModel, prompt);
      return {
        provider,
        model: resolvedModel,
        text,
        tokensIn,
        tokensOut,
        estimatedCostEur: estimateCostEur(provider, tokensIn, tokensOut),
      };
    } catch (error) {
      lastError = error;
      if (attempt < MAX_ATTEMPTS) {
        await sleep(RETRY_DELAYS_MS[attempt - 1]);
      }
    }
  }

  const message = lastError instanceof Error ? lastError.message : String(lastError);
  throw new LLMGatewayError(provider, resolvedModel, message);
}
