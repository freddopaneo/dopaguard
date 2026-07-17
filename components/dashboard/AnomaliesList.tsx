"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { PROVIDER_ORDER, PROVIDER_LABELS } from "@/lib/providers";
import {
  ANOMALY_TYPE_LABELS,
  SEVERITY_ORDER,
  SEVERITY_LABELS,
  SEVERITY_BADGE_CLASSES,
  STATUS_LABELS,
  STATUS_BADGE_CLASSES,
  sortAnomalies,
} from "@/lib/anomalies";
import type { AnomalyWithProvider } from "@/lib/dashboard/get-anomalies";

const STATUS_ORDER = ["new", "acknowledged", "resolved"];
const FILTER_SELECT_CLASSES =
  "rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none focus:border-white/30";

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
}

export function AnomaliesList({ initialAnomalies }: { initialAnomalies: AnomalyWithProvider[] }) {
  const [anomalies, setAnomalies] = useState(initialAnomalies);
  const [typeFilter, setTypeFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [providerFilter, setProviderFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [errorId, setErrorId] = useState<string | null>(null);

  const visible = useMemo(() => {
    const filtered = anomalies.filter(
      (a) =>
        (typeFilter === "all" || a.type === typeFilter) &&
        (severityFilter === "all" || a.severity === severityFilter) &&
        (providerFilter === "all" || a.llmProvider === providerFilter) &&
        (statusFilter === "all" || a.status === statusFilter)
    );
    return sortAnomalies(filtered);
  }, [anomalies, typeFilter, severityFilter, providerFilter, statusFilter]);

  function resetFilters() {
    setTypeFilter("all");
    setSeverityFilter("all");
    setProviderFilter("all");
    setStatusFilter("all");
  }

  async function handleResolve(id: string) {
    setPendingId(id);
    setErrorId(null);

    try {
      const res = await fetch(`/api/anomalies/${id}/resolve`, { method: "POST" });
      const data = await res.json();

      if (!res.ok) {
        setErrorId(id);
        return;
      }

      setAnomalies((prev) => prev.map((a) => (a.id === id ? { ...a, status: data.status } : a)));
    } catch {
      setErrorId(id);
    } finally {
      setPendingId(null);
    }
  }

  if (anomalies.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-12 text-center">
        <p className="text-white/70">Aucune anomalie détectée pour l&apos;instant.</p>
        <p className="mt-1 text-sm text-white/40">Tout est sous contrôle.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-3">
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className={FILTER_SELECT_CLASSES}>
          <option value="all">Tous les types</option>
          {Object.entries(ANOMALY_TYPE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        <select value={severityFilter} onChange={(e) => setSeverityFilter(e.target.value)} className={FILTER_SELECT_CLASSES}>
          <option value="all">Toutes les sévérités</option>
          {SEVERITY_ORDER.map((value) => (
            <option key={value} value={value}>
              {SEVERITY_LABELS[value]}
            </option>
          ))}
        </select>

        <select value={providerFilter} onChange={(e) => setProviderFilter(e.target.value)} className={FILTER_SELECT_CLASSES}>
          <option value="all">Toutes les IA</option>
          {PROVIDER_ORDER.map((value) => (
            <option key={value} value={value}>
              {PROVIDER_LABELS[value]}
            </option>
          ))}
        </select>

        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={FILTER_SELECT_CLASSES}>
          <option value="all">Tous les statuts</option>
          {STATUS_ORDER.map((value) => (
            <option key={value} value={value}>
              {STATUS_LABELS[value]}
            </option>
          ))}
        </select>
      </div>

      {visible.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-12 text-center">
          <p className="text-white/60">Aucune anomalie ne correspond à ces filtres.</p>
          <button type="button" onClick={resetFilters} className="mt-2 text-sm text-dopaguard-lime underline underline-offset-2">
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {visible.map((anomaly) => {
            const isExpanded = expandedId === anomaly.id;
            const isPending = pendingId === anomaly.id;

            return (
              <div key={anomaly.id} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : anomaly.id)}
                  className="flex w-full flex-col gap-2 text-left sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${SEVERITY_BADGE_CLASSES[anomaly.severity] ?? ""}`}>
                      {SEVERITY_LABELS[anomaly.severity] ?? anomaly.severity}
                    </span>
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${STATUS_BADGE_CLASSES[anomaly.status] ?? ""}`}>
                      {STATUS_LABELS[anomaly.status] ?? anomaly.status}
                    </span>
                    <span className="text-sm font-medium text-white">{ANOMALY_TYPE_LABELS[anomaly.type] ?? anomaly.type}</span>
                    <span className="text-xs text-white/40">
                      {anomaly.llmProvider ? PROVIDER_LABELS[anomaly.llmProvider] ?? anomaly.llmProvider : "—"}
                    </span>
                  </div>
                  <span className="text-xs text-white/40">{formatDate(anomaly.created_at)}</span>
                </button>

                {anomaly.summary && <p className="mt-2 text-sm text-white/70">{anomaly.summary}</p>}

                {isExpanded && (
                  <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4">
                    {anomaly.evidence && (
                      <div>
                        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-white/40">Extrait</p>
                        <p className="text-sm italic text-white/70">« {anomaly.evidence} »</p>
                      </div>
                    )}
                    {anomaly.expected_truth && (
                      <div className="border-l-2 border-dopaguard-teal pl-3">
                        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-white/40">Ce qui est vrai</p>
                        <p className="text-sm text-white/70">{anomaly.expected_truth}</p>
                      </div>
                    )}

                    {anomaly.status !== "resolved" && (
                      <div className="flex items-center gap-3">
                        <Button type="button" disabled={isPending} onClick={() => handleResolve(anomaly.id)} className="px-4 py-2 text-xs">
                          {isPending ? "Traitement…" : "Marquer comme traité"}
                        </Button>
                        {errorId === anomaly.id && (
                          <p className="text-xs font-medium text-dopaguard-critical">Une erreur est survenue, réessayez.</p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
