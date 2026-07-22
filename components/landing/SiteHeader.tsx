"use client";

import { useState } from "react";

const NAV_LINKS = [
  { label: "Produits", href: "#produits" },
  { label: "Scanner mon entreprise", href: "#scan-form" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "FAQ", href: "#faq" },
  { label: "À propos", href: "#a-propos" },
];

function RadarLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-9 w-9 shrink-0 text-dopaguard-lime" aria-hidden>
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
    <header className="mx-auto max-w-7xl px-6 py-6">
      <div className="flex items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2.5">
          <RadarLogo />
          <span className="text-xl font-bold tracking-tight text-white">
            {process.env.NEXT_PUBLIC_APP_NAME || "Dopaguard"}
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/70 transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a href="/login" className="text-sm font-medium text-white/60 underline-offset-2 hover:text-white hover:underline">
            Se connecter
          </a>
          <a
            href="#scan-form"
            className="inline-flex items-center justify-center rounded-lg bg-dopaguard-lime px-4 py-2 text-sm font-semibold text-dopaguard-navy transition hover:brightness-95"
          >
            Démarrer gratuitement
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          className="text-white/80 hover:text-white lg:hidden"
        >
          <MenuIcon open={mobileOpen} />
        </button>
      </div>

      {mobileOpen && (
        <nav className="mt-5 flex flex-col gap-1 border-t border-white/10 pt-5 lg:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-2 py-2.5 text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-2 flex flex-col gap-3 border-t border-white/10 pt-4">
            <a
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium text-white/60 hover:text-white"
            >
              Se connecter
            </a>
            <a
              href="#scan-form"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center rounded-lg bg-dopaguard-lime px-4 py-2.5 text-sm font-semibold text-dopaguard-navy"
            >
              Démarrer gratuitement
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
