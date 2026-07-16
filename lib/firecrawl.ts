export class FirecrawlError extends Error {}

const TIMEOUT_MS = 60_000;
const MAX_ATTEMPTS = 3;
const RETRY_DELAYS_MS = [1000, 2000];

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

export interface ScrapeResult {
  markdown: string;
}

// Appel direct à l'API REST Firecrawl (pas de SDK tiers, même philosophie que lib/llm-gateway.ts).
export async function scrapeWebsite(url: string): Promise<ScrapeResult> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const res = await fetchWithTimeout("https://api.firecrawl.dev/v1/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.FIRECRAWL_API_KEY}`,
        },
        body: JSON.stringify({ url, formats: ["markdown"] }),
      });

      if (!res.ok) throw new Error(`Firecrawl ${res.status}: ${await res.text()}`);

      const data = await res.json();
      const markdown = data?.data?.markdown;
      if (typeof markdown !== "string") {
        throw new Error("Firecrawl: réponse sans contenu markdown.");
      }

      return { markdown };
    } catch (error) {
      lastError = error;
      if (attempt < MAX_ATTEMPTS) {
        await sleep(RETRY_DELAYS_MS[attempt - 1]);
      }
    }
  }

  const message = lastError instanceof Error ? lastError.message : String(lastError);
  throw new FirecrawlError(message);
}
