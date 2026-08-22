import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getCurrentBrand, SELECTED_BRAND_COOKIE } from "@/lib/dashboard/get-current-brand";
import { getSettings } from "@/lib/dashboard/get-settings";
import { getOnboardingResumeStep, type OnboardingStep } from "@/lib/onboarding/get-resume-step";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";

export default async function OnboardingPage() {
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
    // Une agence n'a pas de "marque à elle" -- son point d'entrée est l'espace de
    // gestion des marques, pas l'assistant de fiche de vérité (réservé aux vraies
    // marques clientes, créées une par une depuis cet espace).
    const settings = await getSettings(supabase, user.id);
    if (settings.subscription?.plan === "agence") {
      redirect("/dashboard/marques");
    }
  }

  const initialStep: OnboardingStep = brand ? await getOnboardingResumeStep(supabase, brand) : 1;

  return (
    <div className="min-h-screen bg-dopaguard-cream px-6 py-10">
      <div className="mx-auto flex max-w-lg items-center justify-between">
        <span className="text-sm font-semibold text-dopaguard-navy">
          {process.env.NEXT_PUBLIC_APP_NAME || "Dopaguard"}
        </span>
        <form action="/api/stripe/portal" method="POST">
          <button type="submit" className="text-xs text-dopaguard-navyMid/60 underline hover:text-dopaguard-navyMid">
            Gérer mon abonnement
          </button>
        </form>
      </div>

      <div className="mx-auto mt-8 w-full max-w-lg rounded-2xl bg-white p-8 shadow-[0_20px_60px_-15px_rgba(13,46,56,0.15)]">
        <OnboardingWizard initialStep={initialStep} brandId={brand?.id} brandName={brand?.name} />
      </div>
    </div>
  );
}
