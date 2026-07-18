"use client";

import { useRouter } from "next/navigation";
import type { BrandListItem } from "@/lib/dashboard/get-current-brand";

export function BrandSwitcher({ brands, selectedBrandId }: { brands: BrandListItem[]; selectedBrandId: string }) {
  const router = useRouter();

  async function handleChange(value: string) {
    if (value === "__manage__") {
      router.push("/dashboard/marques");
      return;
    }

    await fetch("/api/dashboard/select-brand", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ brandId: value }),
    });
    router.refresh();
  }

  return (
    <select
      value={selectedBrandId}
      onChange={(e) => handleChange(e.target.value)}
      className="rounded-lg border border-white/10 bg-white/[0.04] px-2 py-1 text-sm text-white outline-none focus:border-white/30"
    >
      {brands.map((b) => (
        <option key={b.id} value={b.id}>
          {b.name}
        </option>
      ))}
      <option value="__manage__">Gérer les marques…</option>
    </select>
  );
}
