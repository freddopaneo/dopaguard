import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function OnboardingPage() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center px-6"
      style={{ background: "linear-gradient(135deg, #133742 0%, #0d2e38 100%)" }}
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-[0_20px_60px_-15px_rgba(13,46,56,0.35)]">
        <h1 className="text-xl font-bold text-dopaguard-navy">Bienvenue, {user.email}</h1>
        <p className="mt-3 text-sm leading-relaxed text-dopaguard-navyMid">
          La configuration de votre fiche de vérité arrive très prochainement. Vous recevrez un
          email dès qu&apos;elle sera disponible.
        </p>
        <form action="/api/stripe/portal" method="POST" className="mt-6">
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-lg border border-dopaguard-navy/20 px-6 py-3 text-sm font-semibold text-dopaguard-navy transition-colors hover:bg-dopaguard-muted"
          >
            Gérer mon abonnement
          </button>
        </form>
      </div>
    </div>
  );
}
