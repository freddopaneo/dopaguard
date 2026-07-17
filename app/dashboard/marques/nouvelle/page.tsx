import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getUserBrands } from "@/lib/dashboard/get-current-brand";
import { getSettings } from "@/lib/dashboard/get-settings";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";

const MAX_BRANDS = 10;

export default async function NouvelleMarquePage() {
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
  if (brands.length >= MAX_BRANDS) {
    redirect("/dashboard/marques");
  }

  return (
    <div className="mx-auto w-full max-w-lg rounded-2xl bg-white p-8 shadow-[0_20px_60px_-15px_rgba(13,46,56,0.15)]">
      <OnboardingWizard initialStep={1} />
    </div>
  );
}
