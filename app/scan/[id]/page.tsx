"use client";

import { useEffect, useState } from "react";
// Ecran d'attente : visualisation animee des vrais evenements du scan.
import { ScanVisualizer, type ScanProgressEntry } from "@/components/scan/ScanVisualizer";
import { ScanEventLog } from "@/components/scan/ScanEventLog";
// Ecran de resultats : refondu sur main pendant que cette branche etait en pause
// (deux jauges fiabilite/visibilite + accordeon par categorie). L'ancienne grille
// a 3 colonnes que cette branche connaissait n'existe plus.
import { ScanScoreGauge } from "@/components/scan/ScanScoreGauge";
import { ScanProviderSummary } from "@/components/scan/ScanProviderSummary";
import { ScanCategoryAccordion } from "@/components/scan/ScanCategoryAccordion";
import { ScanClosingPitch } from "@/components/scan/ScanClosingPitch";
import { computeReliabilityScore, computeVisibilityScore, countUnknownResponses } from "@/lib/scan/score";

interface ScanResponseEntry {
  provider: string;
  category: string;
  responseText: string | null;
  flags: { type: string; excerpt: string; explanation: string }[];
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
  const [progress, setProgress] = useState<ScanProgressEntry[]>([]);

  // Sondage rapide et indépendant du flux principal ci-dessous : pendant que
  // POST /run travaille côté serveur (jusqu'à 2 minutes), ce sondage lit les
  // vrais événements déjà écrits en base pour alimenter la visualisation en direct.
  useEffect(() => {
    if (view !== "checking" && view !== "progress") return;

    let cancelled = false;
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/scan/${params.id}`);
        if (cancelled || !res.ok) return;
        const data = await res.json();
        if (cancelled) return;
        if (Array.isArray(data.progress)) {
          setProgress(data.progress);
        }
      } catch {
        // Un sondage raté n'a aucune conséquence, le suivant reprendra l'affichage.
      }
    }, 1200);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [params.id, view]);

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
      <div className="flex min-h-screen flex-col items-center justify-center px-6 py-16" style={HERO_GRADIENT}>
        <ScanVisualizer progress={progress} />
        <ScanEventLog progress={progress} />
        <p className="mt-6 text-sm text-white/50">Ça prend généralement moins de 2 minutes.</p>
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

  const unknownCount = countUnknownResponses(responses);
  const usableCount = responses.filter((r) => !r.error).length;

  return (
    <div className="min-h-screen bg-dopaguard-cream text-dopaguard-navy">
      <div className="px-6 py-16 text-center" style={HERO_GRADIENT}>
        <p className="text-xs font-medium uppercase tracking-widest text-white/50">Résultats du scan</p>
        <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Ce que les IA disent de {brandName}</h1>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="grid gap-4 sm:grid-cols-2">
          <ScanScoreGauge score={computeReliabilityScore(responses).score} kind="reliability" />
          <ScanScoreGauge score={computeVisibilityScore(responses).score} kind="visibility" />
        </div>

        <div className="mt-4 flex flex-col gap-3">
          <ScanProviderSummary responses={responses} />
          <p className="text-xs leading-relaxed text-dopaguard-navyMid/60">
            Ces deux notes répondent à des questions différentes. La <strong>fiabilité</strong> mesure, quand les IA
            parlent de vous, si ce qu&apos;elles disent est exact. La <strong>visibilité</strong> mesure si elles vous
            connaissent seulement : {unknownCount} réponse{unknownCount > 1 ? "s" : ""} sur {usableCount} montre
            {unknownCount > 1 ? "nt" : ""} une IA qui déclare ne pas avoir d&apos;information fiable sur vous. Une
            entreprise inconnue des IA n&apos;a rien fait de mal — mais elle est absente des recommandations faites à
            vos futurs clients.
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-dopaguard-muted bg-white px-5 py-4 text-center text-sm text-dopaguard-navyMid">
          Cette photo a été prise aujourd&apos;hui — ce que dit une IA peut changer la semaine prochaine.{" "}
          <a href="/#tarifs" className="font-semibold text-dopaguard-navy underline underline-offset-2">
            Essai 14 jours →
          </a>
        </div>

        <h2 className="mt-10 text-lg font-semibold text-dopaguard-navy">Le détail, catégorie par catégorie</h2>
        <p className="mt-1 text-sm text-dopaguard-navyMid/70">Cliquez sur une catégorie pour voir les réponses complètes des 3 IA.</p>
        <div className="mt-4">
          <ScanCategoryAccordion responses={responses} />
        </div>

        <p className="mt-6 text-xs leading-relaxed text-dopaguard-navyMid/60">
          Un écart n&apos;est pas toujours une erreur factuelle : il peut aussi s&apos;agir d&apos;une IA qui hésite ou
          manque d&apos;informations récentes sur vous. Les passages où l&apos;IA déclare simplement ne pas vous
          connaître sont comptés à part, dans la visibilité — ils ne pénalisent pas votre fiabilité.
        </p>

        <ScanClosingPitch
          reliability={computeReliabilityScore(responses).score}
          visibility={computeVisibilityScore(responses).score}
          unknownCount={unknownCount}
          usableCount={usableCount}
        />
      </div>
    </div>
  );
}
