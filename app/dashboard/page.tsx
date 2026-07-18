import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getCurrentBrand, SELECTED_BRAND_COOKIE } from "@/lib/dashboard/get-current-brand";
import { getSettings } from "@/lib/dashboard/get-settings";
import { getDashboardOverview } from "@/lib/dashboard/get-overview";
import { ScoreGauge } from "@/components/dashboard/ScoreGauge";
import { ScoreEvolutionChart } from "@/components/dashboard/ScoreEvolutionChart";
import { ScoreByProviderChart } from "@/components/dashboard/ScoreByProviderChart";
import { OpenAnomaliesCard } from "@/components/dashboard/OpenAnomaliesCard";

function EmptyOverviewState({ brandName }: { brandName: string }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-12 text-center">
      <h2 className="text-lg font-semibold text-white">Votre première analyse est en cours</h2>
      <p className="max-w-md text-sm leading-relaxed text-white/60">
        Si vous venez de terminer votre configuration, les premiers résultats pour {brandName} apparaissent
        généralement en quelques minutes — actualisez cette page dans un instant. Sinon, ils arriveront au prochain
        passage de notre surveillance hebdomadaire.
      </p>
    </div>
  );
}

export default async function DashboardOverviewPage() {
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
    const settings = await getSettings(supabase, user.id);
    redirect(settings.subscription?.plan === "agence" ? "/dashboard/marques" : "/onboarding");
  }

  const overview = await getDashboardOverview(supabase, brand.id);

  if (overview.scores.length === 0) {
    return <EmptyOverviewState brandName={brand.name} />;
  }

  const latest = overview.scores[overview.scores.length - 1];

  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <ScoreGauge score={latest.globalScore ?? 0} />
        <ScoreEvolutionChart points={overview.scores} />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <ScoreByProviderChart scoreByProvider={latest.scoreByProvider} />
        <OpenAnomaliesCard count={overview.openAnomaliesCount} />
      </div>
    </div>
  );
}
