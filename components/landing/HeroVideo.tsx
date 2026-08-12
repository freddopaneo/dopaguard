// Aperçu animé du produit complet (abonnement, pas le scan gratuit lui-même) --
// d'où la légende ci-dessous : le scan gratuit interroge 3 IA, pas 5, et
// n'envoie aucune alerte email, contrairement à ce que montre la vidéo.
export function HeroVideo() {
  return (
    <div className="flex flex-col gap-2.5">
      <video
        className="w-full rounded-2xl shadow-[0_20px_60px_-15px_rgba(13,46,56,0.35)]"
        autoPlay
        muted
        loop
        playsInline
        poster="/videos/dopaguard-hero-poster.jpg"
        width={1920}
        height={1080}
      >
        <source src="/videos/dopaguard-hero.mp4" type="video/mp4" />
      </video>
      <p className="text-center text-xs text-white/40">
        Aperçu de l&apos;abonnement complet. Le scan gratuit ci-dessous analyse 3 IA en 3 minutes, sans carte
        bancaire.
      </p>
    </div>
  );
}
