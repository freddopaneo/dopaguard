import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getUserBrands } from "@/lib/dashboard/get-current-brand";
import { getSettings } from "@/lib/dashboard/get-settings";
import { getOnboardingResumeStep } from "@/lib/onboarding/get-resume-step";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";

const MAX_BRANDS = 10;

export default async function NouvelleMarquePage({ searchParams }: { searchParams: { brandId?: string } }) {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const settings = await getSettings(supabase, user.id);
  if (settings.subscription?.plan !== "agence") {
    redirect("/dashboard");
  }

  const brands = await getUserBrands(supabase, user.id);

  // Reprise d'une marque déjà créée mais pas encore terminée (ex. le client a
  // fermé l'onglet en cours de route) -- retrouvée via le lien "Configuration
  // incomplète" de l'espace agence, jamais via une saisie libre de l'utilisateur.
  if (searchParams.brandId) {
    const existing = brands.find((b) => b.id === searchParams.brandId);
    if (!existing || existing.onboarding_completed_at) {
      redirect("/dashboard/marques");
    }

    const resumeStep = await getOnboardingResumeStep(supabase, existing);

    return (
      <div className="mx-auto w-full max-w-lg rounded-2xl bg-white p-8 shadow-[0_20px_60px_-15px_rgba(13,46,56,0.15)]">
        <OnboardingWizard initialStep={resumeStep} brandId={existing.id} brandName={existing.name} />
      </div>
    );
  }

  if (brands.length >= MAX_BRANDS) {
    redirect("/dashboard/marques");
  }

  return (
    <div className="mx-auto w-full max-w-lg rounded-2xl bg-white p-8 shadow-[0_20px_60px_-15px_rgba(13,46,56,0.15)]">
      <OnboardingWizard initialStep={1} />
    </div>
  );
}
