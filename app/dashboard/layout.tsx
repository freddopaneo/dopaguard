import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { DashboardNav } from "@/components/dashboard/DashboardNav";

const STATUS_LABELS: Record<string, string> = {
  trial: "Essai",
  active: "Actif",
  paused: "En pause",
  cancelled: "Résilié",
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: brand } = await supabase
    .from("brands")
    .select("id, name, status, onboarding_completed_at")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!brand || !brand.onboarding_completed_at) {
    redirect("/onboarding");
  }

  return (
    <div className="min-h-screen bg-dopaguard-navyDark text-white">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold">{process.env.NEXT_PUBLIC_APP_NAME || "Dopaguard"}</span>
          <span className="text-white/30">/</span>
          <span className="text-sm text-white/70">{brand.name}</span>
          <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white/50">
            {STATUS_LABELS[brand.status] ?? brand.status}
          </span>
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

      <DashboardNav />

      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
