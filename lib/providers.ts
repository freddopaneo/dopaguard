export const PROVIDER_ORDER = ["openai", "anthropic", "perplexity"] as const;

export const PROVIDER_LABELS: Record<string, string> = {
  openai: "ChatGPT (OpenAI)",
  anthropic: "Claude (Anthropic)",
  perplexity: "Perplexity",
};

export const PROVIDER_SHORT_LABELS: Record<string, string> = {
  openai: "ChatGPT",
  anthropic: "Claude",
  perplexity: "Perplexity",
};
