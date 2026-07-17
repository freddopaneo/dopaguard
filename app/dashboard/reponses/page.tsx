import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getCurrentBrand, SELECTED_BRAND_COOKIE } from "@/lib/dashboard/get-current-brand";
import { getAvailableWeeks, getResponsesForWeek } from "@/lib/dashboard/get-responses";
import { WeekSelector } from "@/components/dashboard/WeekSelector";
import { ResponseCard } from "@/components/dashboard/ResponseCard";
import { ALL_PROVIDERS, PROVIDER_LABELS } from "@/lib/providers";
import { CATEGORY_ORDER } from "@/lib/prompts/types";

export default async function ReponsesPage({ searchParams }: { searchParams: { week?: string; year?: string } }) {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const selectedBrandId = cookies().get(SELECTED_BRAND_COOKIE)?.value ?? null;
  const brand = await getCurrentBrand(supabase, user.id, selectedBrandId);

  if (!brand) {
    redirect("/onboarding");
  }

  const weeks = await getAvailableWeeks(supabase, brand.id);

  if (weeks.length === 0) {
    return (
      <div>
        <h1 className="mb-6 text-xl font-semibold text-white">Réponses brutes</h1>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-12 text-center">
          <p className="text-white/70">Votre historique de réponses arrivera après le premier cycle hebdomadaire.</p>
        </div>
      </div>
    );
  }

  const requestedWeek = Number(searchParams.week);
  const requestedYear = Number(searchParams.year);
  const requested = weeks.find((w) => w.week === requestedWeek && w.year === requestedYear);
  const selected = requested ?? weeks[0];

  const responses = await getResponsesForWeek(supabase, brand.id, selected.week, selected.year);
  const presentProviders = new Set(responses.map((r) => r.provider));
  const providers = ALL_PROVIDERS.filter((p) => presentProviders.has(p));

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold text-white">Réponses brutes</h1>
        <WeekSelector weeks={weeks} selectedWeek={selected.week} selectedYear={selected.year} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {providers.map((provider) => (
          <div key={provider} className="flex flex-col gap-4">
            <span className="inline-flex w-fit items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
              {PROVIDER_LABELS[provider]}
            </span>
            {CATEGORY_ORDER.map((category) =>
              responses
                .filter((r) => r.provider === provider && r.category === category)
                .map((r) => <ResponseCard key={r.id} category={r.category} responseText={r.responseText} />)
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
