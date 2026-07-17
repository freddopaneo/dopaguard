"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  href: string;
  label: string;
  enabled: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Vue d'ensemble", enabled: true },
  { href: "/dashboard/anomalies", label: "Anomalies", enabled: false },
  { href: "/dashboard/reponses", label: "Réponses brutes", enabled: false },
  { href: "/dashboard/fiche-de-verite", label: "Fiche de vérité", enabled: false },
  { href: "/dashboard/parametres", label: "Paramètres", enabled: false },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 overflow-x-auto border-b border-white/10 px-6">
      {NAV_ITEMS.map((item) => {
        if (!item.enabled) {
          return (
            <span
              key={item.href}
              className="flex shrink-0 items-center gap-2 border-b-2 border-transparent px-3 py-3 text-sm text-white/30"
            >
              {item.label}
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-white/40">Bientôt</span>
            </span>
          );
        }

        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`shrink-0 border-b-2 px-3 py-3 text-sm font-medium transition-colors ${
              isActive ? "border-dopaguard-lime text-dopaguard-lime" : "border-transparent text-white/70 hover:text-white"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
