import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
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

  const { data: brand } = await supabase
    .from("brands")
    .select("id")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!brand) {
    redirect("/onboarding");
  }

  const anomalies = await getAnomalies(supabase, brand.id);

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-white">Anomalies</h1>
      <AnomaliesList initialAnomalies={anomalies} />
    </div>
  );
}
