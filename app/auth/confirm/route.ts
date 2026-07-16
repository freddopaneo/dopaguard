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
      return NextResponse.redirect(new URL("/onboarding", request.url));
    }
  }

  return NextResponse.redirect(new URL("/login?erreur=lien_invalide", request.url));
}
