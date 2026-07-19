import type { MetadataRoute } from "next";
import { getAppUrl } from "@/lib/app-url";

// Autorise explicitement les robots des IA génératives (GEO) en plus des moteurs
// classiques -- par défaut ils sont déjà autorisés en l'absence de règle, mais les
// lister explicitement documente l'intention et facilite un blocage ciblé futur si
// nécessaire (ex. un robot qui abuserait du crawl).
const AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-User",
  "anthropic-ai",
  "Google-Extended",
  "CCBot",
  "Bytespider",
  "Amazonbot",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  const appUrl = getAppUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/admin", "/api", "/onboarding", "/bienvenue"],
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/dashboard", "/admin", "/api", "/onboarding", "/bienvenue"],
      })),
    ],
    sitemap: `${appUrl}/sitemap.xml`,
  };
}
