"use client";

import { useState } from "react";

const NAV_LINKS = [
  { label: "Produits", href: "#produits" },
  { label: "Secteurs", href: "/secteurs" },
  { label: "Scanner mon entreprise", href: "#scan-form" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "FAQ", href: "#faq" },
  { label: "À propos", href: "#a-propos" },
];

function RadarLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-9 w-9 shrink-0 text-dopaguard-teal" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <circle cx="12" cy="12" r="5.5" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      <line x1="12" y1="12" x2="17.5" y2="6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
      <circle cx="16.5" cy="8" r="1.3" fill="currentColor" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
        <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-dopaguard-navy/[0.07] bg-dopaguard-cream/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2.5">
          <RadarLogo />
          <span className="text-xl font-bold tracking-tight text-dopaguard-navy">
            {process.env.NEXT_PUBLIC_APP_NAME || "Dopaguard"}
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-sm font-medium text-dopaguard-navyMid transition hover:bg-dopaguard-navy/[0.06] hover:text-dopaguard-navy"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a href="/login" className="text-sm font-medium text-dopaguard-navyMid underline-offset-2 hover:text-dopaguard-navy hover:underline">
            Se connecter
          </a>
          <a
            href="#scan-form"
            className="inline-flex items-center justify-center rounded-full bg-dopaguard-navy px-5 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_-12px_rgba(19,55,66,.7)] transition hover:-translate-y-0.5 hover:bg-dopaguard-navyMid"
          >
            Démarrer gratuitement
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          className="text-dopaguard-navy lg:hidden"
        >
          <MenuIcon open={mobileOpen} />
        </button>
      </div>

      {mobileOpen && (
        <nav className="mt-4 flex flex-col gap-1 border-t border-dopaguard-navy/10 pt-4 lg:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-2 py-2.5 text-sm font-medium text-dopaguard-navyMid hover:bg-dopaguard-navy/5 hover:text-dopaguard-navy"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-2 flex flex-col gap-3 border-t border-dopaguard-navy/10 pt-4">
            <a
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium text-dopaguard-navyMid hover:text-dopaguard-navy"
            >
              Se connecter
            </a>
            <a
              href="#scan-form"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center rounded-full bg-dopaguard-navy px-4 py-2.5 text-sm font-semibold text-white"
            >
              Démarrer gratuitement
            </a>
          </div>
        </nav>
      )}
      </div>
    </header>
  );
}
