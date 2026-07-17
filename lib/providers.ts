export const PROVIDER_ORDER = ["openai", "anthropic", "perplexity"] as const;

// Ordre canonique d'affichage pour les vues qui couvrent les 5 fournisseurs (Pro/Agence),
// contrairement à PROVIDER_ORDER volontairement limité à 3 (plan Essentiel).
export const ALL_PROVIDERS = ["openai", "anthropic", "perplexity", "google", "mistral"] as const;

export const PROVIDER_LABELS: Record<string, string> = {
  openai: "ChatGPT (OpenAI)",
  anthropic: "Claude (Anthropic)",
  perplexity: "Perplexity",
  google: "Gemini (Google)",
  mistral: "Mistral",
};

export const PROVIDER_SHORT_LABELS: Record<string, string> = {
  openai: "ChatGPT",
  anthropic: "Claude",
  perplexity: "Perplexity",
  google: "Gemini",
  mistral: "Mistral",
};
