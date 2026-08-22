import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getCurrentBrand, SELECTED_BRAND_COOKIE } from "@/lib/dashboard/get-current-brand";
import { getSettings } from "@/lib/dashboard/get-settings";
import { getTruthSheet } from "@/lib/dashboard/get-truth-sheet";
import { getTruthSheetAttachments } from "@/lib/dashboard/get-attachments";
import { TruthSheetEditor } from "@/components/dashboard/TruthSheetEditor";
import { CompetitorTracker } from "@/components/dashboard/CompetitorTracker";

const COMPETITOR_TRACKING_PLANS = ["pro", "agence"];

export default async function FicheDeVeritePage() {
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

  const [truthSheet, attachments] = await Promise.all([
    getTruthSheet(supabase, brand.id),
    getTruthSheetAttachments(supabase, brand.id),
  ]);

  return (
    <div>
      <h1 className="mb-2 text-xl font-semibold text-white">Fiche de vérité</h1>
      <p className="mb-6 max-w-2xl text-sm text-white/60">
        C&apos;est la référence utilisée pour juger ce que les IA disent de {brand.name}. Modifiable à tout moment.
      </p>
      <TruthSheetEditor
        brandId={brand.id}
        initialValues={{
          legalStatus: truthSheet.legalStatus,
          offering: truthSheet.offering,
          pricingFacts: truthSheet.pricingFacts,
          keyPeople: truthSheet.keyPeople,
          differentiators: truthSheet.differentiators,
          knownCompetitors: truthSheet.knownCompetitors,
          forbiddenClaims: truthSheet.forbiddenClaims,
          openingHours: truthSheet.openingHours,
          address: truthSheet.address,
          officialLinks: truthSheet.officialLinks,
          certifications: truthSheet.certifications,
        }}
        initialLastValidatedAt={truthSheet.lastValidatedAt}
        initialAttachments={attachments}
      />
      {COMPETITOR_TRACKING_PLANS.includes(brand.plan ?? "") && (
        <div className="mt-6">
          <CompetitorTracker
            brandId={brand.id}
            knownCompetitors={truthSheet.knownCompetitors}
            initialTrackedCompetitor={brand.tracked_competitor}
          />
        </div>
      )}
    </div>
  );
}
