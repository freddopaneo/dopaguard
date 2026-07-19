export function Footer() {
  return (
    <footer className="border-t border-dopaguard-muted py-10 text-center text-xs text-dopaguard-navyMid/50">
      <p>
        © {new Date().getFullYear()} {process.env.NEXT_PUBLIC_APP_NAME || "Dopaguard"} — Dopaneo.ai
      </p>
      <p className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
        <a href="/blog" className="hover:text-dopaguard-navyMid">
          Blog
        </a>
        <span aria-hidden>·</span>
        <a href="/mentions-legales" className="hover:text-dopaguard-navyMid">
          Mentions légales
        </a>
        <span aria-hidden>·</span>
        <a href="/cgv" className="hover:text-dopaguard-navyMid">
          CGV
        </a>
        <span aria-hidden>·</span>
        <a href="/confidentialite" className="hover:text-dopaguard-navyMid">
          Confidentialité
        </a>
      </p>
      <p className="mt-2">
        Un abonnement en cours ?{" "}
        <a href="/login" className="underline hover:text-dopaguard-navyMid">
          Comment résilier mon abonnement
        </a>
      </p>
    </footer>
  );
}
