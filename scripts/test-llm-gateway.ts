try {
  process.loadEnvFile(".env.local");
} catch {
  // .env.local absent : les variables doivent déjà être exportées dans l'environnement.
}

import { callLLM, type LLMProvider } from "../lib/llm-gateway";

const PROVIDERS: LLMProvider[] = ["openai", "anthropic", "perplexity"];

async function main() {
  for (const provider of PROVIDERS) {
    try {
      const result = await callLLM({ provider, prompt: "Réponds uniquement par le mot OK." });
      console.log(
        `[${provider}] OK — modèle ${result.model}, ${result.tokensIn} tokens entrée / ${result.tokensOut} tokens sortie, ~${result.estimatedCostEur.toFixed(5)} €`
      );
    } catch (error) {
      console.error(`[${provider}] ÉCHEC —`, error instanceof Error ? error.message : error);
    }
  }
}

main();
