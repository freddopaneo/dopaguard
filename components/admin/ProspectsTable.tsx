"use client";

import { useMemo, useState } from "react";
import type { ProspectRow } from "@/lib/admin/get-prospects";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
}

const STATUS_LABELS: Record<string, string> = {
  pending: "Email non vérifié",
  verified: "Vérifié",
  scanning: "Scan en cours",
  completed: "Scan terminé",
  expired: "Lien expiré",
};

function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="text-xs text-white/40 underline-offset-2 transition-colors hover:text-dopaguard-lime hover:underline"
      aria-label={`Copier l'adresse ${email}`}
    >
      {copied ? "Copié ✓" : "Copier"}
    </button>
  );
}

export function ProspectsTable({ prospects }: { prospects: ProspectRow[] }) {
  const [onlyNonCustomers, setOnlyNonCustomers] = useState(false);

  const nonCustomerCount = useMemo(() => prospects.filter((p) => !p.isCustomer).length, [prospects]);
  const visible = onlyNonCustomers ? prospects.filter((p) => !p.isCustomer) : prospects;

  return (
    <div>
      <h1 className="mb-2 text-xl font-semibold text-white">Prospects — scans gratuits</h1>
      <p className="mb-5 text-sm text-white/50">
        {prospects.length} scan(s) au total · {nonCustomerCount} sans abonnement à relancer.
      </p>

      <div className="mb-5 flex gap-1">
        {[
          { label: "Tous", active: !onlyNonCustomers, onClick: () => setOnlyNonCustomers(false) },
          { label: "Pas encore clients", active: onlyNonCustomers, onClick: () => setOnlyNonCustomers(true) },
        ].map((tab) => (
          <button
            key={tab.label}
            type="button"
            onClick={tab.onClick}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              tab.active ? "bg-dopaguard-lime text-dopaguard-navy" : "bg-white/5 text-white/60 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-white/40">
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Marque</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Site web</th>
              <th className="px-4 py-3">Écarts</th>
              <th className="px-4 py-3">État</th>
              <th className="px-4 py-3">Rapport</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((prospect) => (
              <tr key={prospect.id} className="border-b border-white/5 last:border-0">
                <td className="whitespace-nowrap px-4 py-3 text-white/50">{formatDate(prospect.createdAt)}</td>
                <td className="px-4 py-3 font-medium text-white">{prospect.brandName}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-white/70">{prospect.email}</span>
                    <CopyEmailButton email={prospect.email} />
                  </div>
                </td>
                <td className="px-4 py-3 text-white/50">
                  {prospect.website ? (
                    <a
                      href={prospect.website.startsWith("http") ? prospect.website : `https://${prospect.website}`}
                      target="_blank"
                      rel="noreferrer"
                      className="underline-offset-2 hover:text-white hover:underline"
                    >
                      {prospect.website.replace(/^https?:\/\//, "")}
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="px-4 py-3">
                  {prospect.flaggedCount === null ? (
                    <span className="text-white/30">—</span>
                  ) : prospect.flaggedCount === 0 ? (
                    <span className="text-white/50">Aucun</span>
                  ) : (
                    <span className="font-medium text-dopaguard-critical">{prospect.flaggedCount}</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {prospect.isCustomer ? (
                    <span className="whitespace-nowrap rounded-full bg-dopaguard-lime/15 px-2.5 py-1 text-xs font-semibold text-dopaguard-lime">
                      Client
                    </span>
                  ) : (
                    <span className="whitespace-nowrap text-xs text-white/50">
                      {STATUS_LABELS[prospect.status] ?? prospect.status}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {prospect.hasReport ? (
                    <a
                      href={`/scan/${prospect.id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="whitespace-nowrap text-xs font-medium text-dopaguard-teal underline-offset-2 hover:underline"
                    >
                      Voir →
                    </a>
                  ) : (
                    <span className="text-xs text-white/30">—</span>
                  )}
                </td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-white/40">
                  {onlyNonCustomers ? "Tous les prospects sont clients." : "Aucun scan gratuit pour l'instant."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
