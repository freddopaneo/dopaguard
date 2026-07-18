import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type");

  if (tokenHash && type === "magiclink") {
    const supabase = createServerSupabaseClient();
    const { error } = await supabase.auth.verifyOtp({ type: "magiclink", token_hash: tokenHash });

    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const [{ data: brand }, { data: subscription }] = await Promise.all([
        supabase
          .from("brands")
          .select("onboarding_completed_at")
          .eq("owner_id", user!.id)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle(),
        supabase.from("subscriptions").select("plan").eq("profile_id", user!.id).maybeSingle(),
      ]);

      let destination = "/onboarding";
      if (brand?.onboarding_completed_at) {
        destination = "/dashboard";
      } else if (!brand && subscription?.plan === "agence") {
        // Une agence n'a pas de marque à elle -- son point d'entrée est l'espace
        // de gestion des marques, pas l'assistant de fiche de vérité.
        destination = "/dashboard/marques";
      }
      return NextResponse.redirect(new URL(destination, request.url));
    }
  }

  return NextResponse.redirect(new URL("/login?erreur=lien_invalide", request.url));
}
