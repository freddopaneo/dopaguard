import type { Metadata } from "next";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { About } from "@/components/landing/About";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getAppUrl } from "@/lib/app-url";
import { ORGANIZATION_JSON_LD, PRODUCT_JSON_LD } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Dopaguard vs vérifier soi-même : pourquoi automatiser la surveillance IA",
  description:
    "Poser une question à ChatGPT est gratuit. La suivre chaque semaine, sur plusieurs IA, avec une alerte dès qu'un problème apparaît, ne l'est pas — sauf à y consacrer du temps indéfiniment.",
  alternates: { canonical: `${getAppUrl()}/vs-verification-manuelle` },
};

const ROWS: { label: string; manual: string; dopaguard: string }[] = [
  {
    label: "Fréquence",
    manual: "Quand vous y pensez — souvent jamais",
    dopaguard: "Chaque semaine, automatiquement",
  },
  {
    label: "Nombre d'IA vérifiées",
    manual: "Généralement une seule, celle que vous avez sous la main",
    dopaguard: "3 à 5 IA selon votre formule (ChatGPT, Claude, Gemini, Perplexity, Mistral)",
  },
  {
    label: "Détection d'un écart",
    manual: "À vous de le repérer en relisant la réponse",
    dopaguard: "Chaque réponse est comparée automatiquement à votre fiche de vérité",
  },
  {
    label: "Alerte",
    manual: "Aucune — vous découvrez le problème par hasard, ou trop tard",
    dopaguard: "Immédiate sur anomalie critique",
  },
  {
    label: "Historique",
    manual: "Aucun — chaque vérification repart de zéro",
    dopaguard: "Conservé, consultable à tout moment",
  },
  {
    label: "Temps passé",
    manual: "10 à 20 minutes par vérification, à refaire indéfiniment",
    dopaguard: "3 minutes pour le scan initial, puis automatique",
  },
];

const REBUTTALS = [
  {
    question: "Je peux demander moi-même à ChatGPT ce qu'il pense de mon entreprise, non ?",
    answer:
      "Oui, ponctuellement. Mais il faudrait le refaire chaque semaine, sur plusieurs IA, avec les bonnes questions, et repérer une nuance parfois discrète dans la façon dont votre entreprise est décrite. C'est exactement le travail que Dopaguard automatise.",
  },
  {
    question: "Pourquoi payer, alors que poser une question à une IA est gratuit ?",
    answer:
      "Poser une question est gratuit. La suivre dans le temps, sur plusieurs IA, avec une alerte dès qu'un problème apparaît, ne l'est pas — sauf à y consacrer du temps chaque semaine, ce que personne ne fait vraiment dans la durée.",
  },
  {
    question: "Une vérification ponctuelle ne suffit-elle pas si tout va bien aujourd'hui ?",
    answer:
      "Une vérification ponctuelle est une photo. Vos informations changent, les IA se mettent à jour, de nouveaux contenus vous concernant apparaissent, vos concurrents avancent. Ce qui était vrai aujourd'hui peut être faux dans un mois, sans que vous en soyez jamais informé.",
  },
];

export default function VsManualVerificationPage() {
  return (
    <div className="min-h-screen bg-dopaguard-cream text-dopaguard-navy">
      {/* eslint-disable-next-line react/no-danger -- JSON-LD statique, aucune donnée utilisateur. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }} />
      {/* eslint-disable-next-line react/no-danger -- JSON-LD statique, aucune donnée utilisateur. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PRODUCT_JSON_LD) }} />

      <div
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #133742 0%, #0d2e38 100%)" }}
      >
        <SiteHeader />
        <div className="mx-auto max-w-3xl px-6 pb-16 pt-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-dopaguard-lime" />
            Comparatif
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl">
            Vérifier soi-même vs <span className="text-dopaguard-lime">laisser Dopaguard</span> le faire
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/60">
            Poser une question à ChatGPT est gratuit et prend dix secondes. Le vrai coût est ailleurs : le refaire
            chaque semaine, sur plusieurs IA, sans jamais oublier — et repérer un écart avant qu&apos;un client ne
            parte ailleurs.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 pt-6">
        <Breadcrumbs items={[{ label: "Accueil", href: "/" }, { label: "Vérifier soi-même vs Dopaguard" }]} />
      </div>

      <section className="mx-auto max-w-4xl px-6 py-14">
        <div className="overflow-x-auto rounded-2xl border border-dopaguard-muted bg-white">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-dopaguard-muted text-left">
                <th className="p-4 font-semibold text-dopaguard-navy">&nbsp;</th>
                <th className="p-4 font-semibold text-dopaguard-navyMid/70">Vérifier soi-même</th>
                <th className="p-4 font-semibold text-dopaguard-navy">Dopaguard</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.label} className="border-b border-dopaguard-muted last:border-0">
                  <td className="p-4 font-medium text-dopaguard-navy">{row.label}</td>
                  <td className="p-4 text-dopaguard-navyMid/70">{row.manual}</td>
                  <td className="p-4 font-medium text-dopaguard-navy">{row.dopaguard}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-6 pb-14">
        <h2 className="text-center text-3xl font-bold tracking-tight text-dopaguard-navy sm:text-4xl">
          Les questions qu&apos;on nous pose
        </h2>
        <div className="mt-8 flex flex-col gap-5">
          {REBUTTALS.map((item) => (
            <div key={item.question} className="rounded-2xl border border-dopaguard-muted bg-white p-6">
              <p className="font-semibold text-dopaguard-navy">{item.question}</p>
              <p className="mt-2 text-sm leading-relaxed text-dopaguard-navyMid/80">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <About />

      <section className="mx-auto max-w-3xl px-6 py-12 text-center sm:py-20">
        <h2 className="text-3xl font-bold tracking-tight text-dopaguard-navy sm:text-4xl">
          Commencez par le scan gratuit, gardez la surveillance ensuite.
        </h2>
        <a
          href="/#scan-form"
          className="mt-8 inline-flex items-center justify-center rounded-xl bg-dopaguard-navy px-6 py-3 text-sm font-semibold text-white hover:bg-dopaguard-navyMid"
        >
          Lancer mon scan gratuit (3 min)
        </a>
      </section>

      <Footer />
    </div>
  );
}
