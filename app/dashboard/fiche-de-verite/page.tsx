import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getTruthSheet } from "@/lib/dashboard/get-truth-sheet";
import { TruthSheetEditor } from "@/components/dashboard/TruthSheetEditor";

export default async function FicheDeVeritePage() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: brand } = await supabase
    .from("brands")
    .select("id, name")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!brand) {
    redirect("/onboarding");
  }

  const truthSheet = await getTruthSheet(supabase, brand.id);

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
        }}
        initialLastValidatedAt={truthSheet.lastValidatedAt}
      />
    </div>
  );
}
