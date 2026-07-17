"use client";

import { useRouter } from "next/navigation";
import type { WeekOption } from "@/lib/dashboard/get-responses";

export function WeekSelector({
  weeks,
  selectedWeek,
  selectedYear,
}: {
  weeks: WeekOption[];
  selectedWeek: number;
  selectedYear: number;
}) {
  const router = useRouter();

  return (
    <select
      value={`${selectedYear}-${selectedWeek}`}
      onChange={(e) => {
        const [year, week] = e.target.value.split("-");
        router.push(`/dashboard/reponses?week=${week}&year=${year}`);
      }}
      className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none focus:border-white/30"
    >
      {weeks.map((w) => (
        <option key={`${w.year}-${w.week}`} value={`${w.year}-${w.week}`}>
          Semaine {w.week} — {w.year}
        </option>
      ))}
    </select>
  );
}
