import { Footer } from "@/components/landing/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dopaguard-cream text-dopaguard-navy">
      <div
        className="relative overflow-hidden px-6 py-24 text-center"
        style={{ background: "linear-gradient(135deg, #133742 0%, #0d2e38 100%)" }}
      >
        <a href="/" className="inline-flex items-center gap-2.5">
          <span className="text-xl font-bold tracking-tight text-white">
            {process.env.NEXT_PUBLIC_APP_NAME || "Dopaguard"}
          </span>
        </a>

        <p className="mt-10 text-xs font-medium uppercase tracking-widest text-white/50">Erreur 404</p>
        <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Cette page n&apos;existe pas (ou plus).</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/60">
          Le lien est peut-être obsolète ou mal orthographié. Voici où retrouver ce que vous cherchez.
        </p>

        <div className="mx-auto mt-8 flex max-w-md flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href="/"
            className="w-full rounded-lg bg-dopaguard-lime px-6 py-3 text-sm font-semibold text-dopaguard-navy hover:brightness-95 sm:w-auto"
          >
            Retour à l&apos;accueil
          </a>
          <a
            href="/secteurs"
            className="w-full rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/5 sm:w-auto"
          >
            Voir les secteurs
          </a>
          <a
            href="/blog"
            className="w-full rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/5 sm:w-auto"
          >
            Lire le blog
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
