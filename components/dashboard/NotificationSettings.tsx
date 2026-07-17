"use client";

import { useState } from "react";

type NotificationKey = "notifyCriticalAlerts" | "notifyWeeklyDigest";

interface Values {
  notifyCriticalAlerts: boolean;
  notifyWeeklyDigest: boolean;
}

const ITEMS: { key: NotificationKey; label: string; description: string }[] = [
  {
    key: "notifyCriticalAlerts",
    label: "Alertes critiques immédiates",
    description: "Un email dès qu'une anomalie critique est détectée.",
  },
  {
    key: "notifyWeeklyDigest",
    label: "Bilan hebdomadaire",
    description: "Un résumé de votre score et des anomalies chaque semaine.",
  },
];

export function NotificationSettings({
  initialNotifyCriticalAlerts,
  initialNotifyWeeklyDigest,
}: {
  initialNotifyCriticalAlerts: boolean;
  initialNotifyWeeklyDigest: boolean;
}) {
  const [values, setValues] = useState<Values>({
    notifyCriticalAlerts: initialNotifyCriticalAlerts,
    notifyWeeklyDigest: initialNotifyWeeklyDigest,
  });
  const [pendingKey, setPendingKey] = useState<NotificationKey | null>(null);
  const [errorKey, setErrorKey] = useState<NotificationKey | null>(null);

  async function toggle(key: NotificationKey) {
    const previous = values;
    const next = { ...values, [key]: !values[key] };
    setValues(next);
    setPendingKey(key);
    setErrorKey(null);

    try {
      const res = await fetch("/api/settings/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next),
      });
      if (!res.ok) {
        setValues(previous);
        setErrorKey(key);
      }
    } catch {
      setValues(previous);
      setErrorKey(key);
    } finally {
      setPendingKey(null);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {ITEMS.map((item) => (
        <div key={item.key} className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-white">{item.label}</p>
            <p className="text-xs text-white/40">{item.description}</p>
            {errorKey === item.key && (
              <p className="mt-1 text-xs font-medium text-dopaguard-critical">Une erreur est survenue, réessayez.</p>
            )}
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={values[item.key]}
            disabled={pendingKey === item.key}
            onClick={() => toggle(item.key)}
            className={`relative h-6 w-11 shrink-0 rounded-full transition-colors disabled:opacity-50 ${
              values[item.key] ? "bg-dopaguard-lime" : "bg-white/10"
            }`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                values[item.key] ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
      ))}
    </div>
  );
}
