import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { BrandSwitcher } from "@/components/dashboard/BrandSwitcher";
import { getCurrentBrand, getUserBrands, SELECTED_BRAND_COOKIE } from "@/lib/dashboard/get-current-brand";
import { getSettings } from "@/lib/dashboard/get-settings";
import { BRAND_STATUS_LABELS } from "@/lib/dashboard/labels";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const selectedBrandId = cookies().get(SELECTED_BRAND_COOKIE)?.value ?? null;
  const brand = await getCurrentBrand(supabase, user.id, selectedBrandId);
  const settings = await getSettings(supabase, user.id);
  const isAgence = settings.subscription?.plan === "agence";

  // Une agence n'a pas forcément de marque configurée (elle n'en a pas "à elle") --
  // seuls les comptes Essentiel/Pro, pour qui l'onboarding EST la configuration du
  // compte, sont renvoyés vers l'assistant tant qu'aucune marque n'est prête. Les
  // pages qui ont besoin d'une marque concrète (Vue d'ensemble, Anomalies, etc.)
  // redirigent elles-mêmes vers l'espace de gestion des marques le cas échéant.
  if (!isAgence && (!brand || !brand.onboarding_completed_at)) {
    redirect("/onboarding");
  }

  const brands = isAgence ? await getUserBrands(supabase, user.id) : [];

  return (
    <div className="min-h-screen bg-dopaguard-navyDark text-white">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold">{process.env.NEXT_PUBLIC_APP_NAME || "Dopaguard"}</span>
          <span className="text-white/30">/</span>
          {brand ? (
            isAgence && brands.length > 0 ? (
              <BrandSwitcher brands={brands} selectedBrandId={brand.id} />
            ) : (
              <span className="text-sm text-white/70">{brand.name}</span>
            )
          ) : (
            <span className="text-sm text-white/70">Espace agence</span>
          )}
          {brand && (
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white/50">
              {BRAND_STATUS_LABELS[brand.status] ?? brand.status}
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <form action="/api/stripe/portal" method="POST">
            <button type="submit" className="text-xs text-white/50 underline underline-offset-2 hover:text-white/80">
              Gérer mon abonnement
            </button>
          </form>
          <form action="/api/auth/logout" method="POST">
            <button type="submit" className="text-xs text-white/50 underline underline-offset-2 hover:text-white/80">
              Se déconnecter
            </button>
          </form>
        </div>
      </div>

      <DashboardNav isAgence={isAgence} />

      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
