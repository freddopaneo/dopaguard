import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getCurrentBrand, SELECTED_BRAND_COOKIE } from "@/lib/dashboard/get-current-brand";
import { getSettings } from "@/lib/dashboard/get-settings";
import { getAnomalies } from "@/lib/dashboard/get-anomalies";
import { AnomaliesList } from "@/components/dashboard/AnomaliesList";

export default async function AnomaliesPage() {
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

  const anomalies = await getAnomalies(supabase, brand.id);

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-white">Anomalies</h1>
      <AnomaliesList initialAnomalies={anomalies} />
    </div>
  );
}
