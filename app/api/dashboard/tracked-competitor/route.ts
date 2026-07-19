import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const schema = z.object({
  brandId: z.string().uuid(),
  competitor: z.string().trim().min(1).max(200).nullable(),
});

export async function POST(request: NextRequest) {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  // RLS ("brands_update_own") garantit déjà que seule une marque possédée par
  // l'utilisateur courant peut être modifiée -- pas de vérification supplémentaire
  // nécessaire côté code.
  const { error } = await supabase
    .from("brands")
    .update({ tracked_competitor: parsed.data.competitor })
    .eq("id", parsed.data.brandId);

  if (error) {
    return NextResponse.json({ error: "Une erreur est survenue." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
