import { redirect } from "next/navigation";
import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getUserBrands } from "@/lib/dashboard/get-current-brand";
import { getSettings } from "@/lib/dashboard/get-settings";
import { BRAND_STATUS_LABELS } from "@/lib/dashboard/labels";
import { AgencyBrandingForm } from "@/components/dashboard/AgencyBrandingForm";

const MAX_BRANDS = 10;
const DEFAULT_PRIMARY_COLOR = "#c7ff98";

export default async function MarquesPage() {
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

  let { data: agency } = await supabase.from("agencies").select("id, name, logo_url, primary_color").eq("owner_id", user.id).maybeSingle();

  if (!agency) {
    const { data: created } = await supabase
      .from("agencies")
      .insert({ owner_id: user.id, name: "Mon agence" })
      .select("id, name, logo_url, primary_color")
      .single();
    agency = created;
  }

  const atLimit = brands.length >= MAX_BRANDS;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold text-white">Marques</h1>
        {atLimit ? (
          <span className="text-xs text-white/40">Limite de {MAX_BRANDS} marques atteinte.</span>
        ) : (
          <Link
            href="/dashboard/marques/nouvelle"
            className="rounded-lg bg-dopaguard-lime px-4 py-2 text-xs font-semibold text-dopaguard-navy transition-all hover:brightness-95"
          >
            Ajouter une marque
          </Link>
        )}
      </div>

      <div className="mb-8 flex flex-col gap-3">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-4"
          >
            <div>
              <p className="text-sm font-medium text-white">{brand.name}</p>
              {!brand.onboarding_completed_at && (
                <p className="mt-1 text-xs text-dopaguard-critical">Configuration incomplète</p>
              )}
            </div>
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white/50">
              {BRAND_STATUS_LABELS[brand.status] ?? brand.status}
            </span>
          </div>
        ))}
      </div>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/40">
          Personnalisation white-label des rapports
        </h2>
        {agency && (
          <AgencyBrandingForm
            initialName={agency.name}
            initialPrimaryColor={agency.primary_color ?? DEFAULT_PRIMARY_COLOR}
            hasLogo={Boolean(agency.logo_url)}
          />
        )}
      </section>
    </div>
  );
}
