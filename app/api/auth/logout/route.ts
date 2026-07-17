import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const supabase = createServerSupabaseClient();
  await supabase.auth.signOut();

  // 303 (et non le 307 par défaut) : la requête d'origine est un POST (soumission de formulaire),
  // la redirection vers la landing doit repartir en GET.
  return NextResponse.redirect(new URL("/", request.url), 303);
}
