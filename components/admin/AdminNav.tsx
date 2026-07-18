"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/admin", label: "Abonnés" },
  { href: "/admin/revenus", label: "Revenus" },
  { href: "/admin/couts", label: "Coûts IA" },
  { href: "/admin/ventes", label: "Ventes & résiliations" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 overflow-x-auto border-b border-white/10 px-6">
      {NAV_ITEMS.map((item) => {
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
