"use client";

import { useEffect, useState } from "react";
import { HighlightedText } from "@/components/HighlightedText";

const PROGRESS_MESSAGES = [
  "Interrogation de ChatGPT…",
  "Interrogation de Claude…",
  "Interrogation de Perplexity…",
  "Analyse des réponses…",
];

const PROVIDER_LABELS: Record<string, string> = {
  openai: "ChatGPT (OpenAI)",
  anthropic: "Claude (Anthropic)",
  perplexity: "Perplexity",
};

const CATEGORY_LABELS: Record<string, string> = {
  reputation: "Réputation",
  reliability: "Fiabilité",
  recommendation: "Recommandation",
  comparison: "Comparaison",
  factual: "Factuel",
};

const PROVIDER_ORDER = ["openai", "anthropic", "perplexity"];

interface ScanResponseEntry {
  provider: string;
  category: string;
  responseText: string | null;
  flags: { excerpt: string }[];
  error: string | null;
}

type ViewState = "checking" | "progress" | "completed" | "notFound" | "runFailed";

const HERO_GRADIENT = { background: "linear-gradient(135deg, #133742 0%, #0d2e38 100%)" };

function FullScreenCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center px-6" style={HERO_GRADIENT}>
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-[0_20px_60px_-15px_rgba(13,46,56,0.35)]">
        <h1 className="text-xl font-bold text-dopaguard-navy">{title}</h1>
        <p className="mt-3 text-sm leading-relaxed text-dopaguard-navyMid">{body}</p>
      </div>
    </div>
  );
}

export default function ScanResultsPage({ params }: { params: { id: string } }) {
  const [view, setView] = useState<ViewState>("checking");
  const [brandName, setBrandName] = useState("");
  const [responses, setResponses] = useState<ScanResponseEntry[]>([]);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % PROGRESS_MESSAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let cancelled = false;
    let pollTimer: ReturnType<typeof setTimeout>;

    async function poll() {
      const res = await fetch(`/api/scan/${params.id}`);
      if (cancelled) return;
      if (!res.ok) {
        setView("notFound");
        return;
      }
      const data = await res.json();
      if (cancelled) return;
      setBrandName(data.brandName);

      if (data.status === "completed") {
        if (data.results?.responses?.length) {
          setResponses(data.results.responses);
        }
        setView("completed");
        return;
      }

      if (data.status === "scanning") {
        setView("progress");
        pollTimer = setTimeout(poll, 3000);
        return;
      }

      if (data.status === "verified") {
        setView("progress");
        const runRes = await fetch(`/api/scan/${params.id}/run`, { method: "POST" });
        if (cancelled) return;
        const runData = await runRes.json();

        if (runRes.ok && runData.status === "completed") {
          if (runData.results?.responses?.length) {
            setResponses(runData.results.responses);
          }
          setView("completed");
        } else if (runRes.ok && runData.status === "scanning") {
          pollTimer = setTimeout(poll, 3000);
        } else {
          setView("runFailed");
        }
        return;
      }

      setView("notFound");
    }

    poll();

    return () => {
      cancelled = true;
      clearTimeout(pollTimer);
    };
  }, [params.id]);

  if (view === "checking" || view === "progress") {
    return (
      <div className="flex min-h-screen items-center justify-center px-6" style={HERO_GRADIENT}>
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-dopaguard-lime" />
          <p className="mt-6 text-lg font-medium text-white">{PROGRESS_MESSAGES[messageIndex]}</p>
          <p className="mt-2 text-sm text-white/50">Ça prend généralement moins de 2 minutes.</p>
        </div>
      </div>
    );
  }

  if (view === "notFound") {
    return (
      <FullScreenCard
        title="Scan introuvable"
        body="Ce lien n'est plus valide. Relancez un scan gratuit depuis la page d'accueil."
      />
    );
  }

  if (view === "runFailed") {
    return (
      <div className="flex min-h-screen items-center justify-center px-6" style={HERO_GRADIENT}>
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-[0_20px_60px_-15px_rgba(13,46,56,0.35)]">
          <h1 className="text-xl font-bold text-dopaguard-navy">Le scan a rencontré un problème</h1>
          <p className="mt-3 text-sm leading-relaxed text-dopaguard-navyMid">
            Réessayez dans quelques instants.
          </p>
          <button
            type="button"
            onClick={() => setView("checking")}
            className="mt-5 rounded-lg bg-dopaguard-navy px-6 py-3 text-sm font-semibold text-white"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dopaguard-cream text-dopaguard-navy">
      <div className="px-6 py-16 text-center" style={HERO_GRADIENT}>
        <p className="text-xs font-medium uppercase tracking-widest text-white/50">Résultats du scan</p>
        <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Ce que les IA disent de {brandName}</h1>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 sm:grid-cols-3">
          {PROVIDER_ORDER.map((provider) => (
            <div key={provider} className="flex flex-col gap-4">
              <span className="inline-flex w-fit items-center rounded-full bg-dopaguard-navy px-3 py-1 text-xs font-semibold text-white">
                {PROVIDER_LABELS[provider]}
              </span>
              {responses
                .filter((r) => r.provider === provider)
                .map((r) => (
                  <div
                    key={r.category}
                    className="relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-dopaguard-muted bg-white p-5 text-left"
                  >
                    <span className="text-xs font-semibold uppercase tracking-wide text-dopaguard-navyMid/60">
                      {CATEGORY_LABELS[r.category] ?? r.category}
                    </span>
                    {r.error || !r.responseText ? (
                      <p className="text-sm text-dopaguard-navyMid/60">Réponse indisponible pour cette question.</p>
                    ) : (
                      <p className="text-sm leading-relaxed text-dopaguard-navyMid">
                        <HighlightedText text={r.responseText} excerpts={r.flags.map((f) => f.excerpt)} />
                      </p>
                    )}
                  </div>
                ))}
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-4 rounded-2xl bg-white p-10 text-center">
          <h2 className="text-xl font-bold text-dopaguard-navy">Surveillez votre réputation IA en continu</h2>
          <p className="max-w-md text-sm text-dopaguard-navyMid">
            Essai 14 jours, sans engagement. Disponible très prochainement.
          </p>
          <button
            type="button"
            disabled
            className="cursor-not-allowed rounded-lg bg-dopaguard-lime px-6 py-3.5 text-sm font-semibold text-dopaguard-navy opacity-50"
          >
            Essai 14 jours →
          </button>
        </div>
      </div>
    </div>
  );
}
