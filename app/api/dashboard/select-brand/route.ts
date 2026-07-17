import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { SELECTED_BRAND_COOKIE } from "@/lib/dashboard/get-current-brand";

const selectBrandRequestSchema = z.object({
  brandId: z.string().uuid(),
});

export async function POST(request: NextRequest) {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Non connecté." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const parsed = selectBrandRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Requête invalide." }, { status: 400 });
  }

  // Vérifie que la marque appartient bien au compte avant de persister le choix --
  // RLS protège déjà l'accès aux données, mais évite de laisser un cookie pointer
  // durablement vers une marque étrangère (id mort ou non pertinent).
  const { data: brand } = await supabase.from("brands").select("id").eq("id", parsed.data.brandId).eq("owner_id", user.id).maybeSingle();

  if (!brand) {
    return NextResponse.json({ error: "Marque introuvable." }, { status: 404 });
  }

  cookies().set(SELECTED_BRAND_COOKIE, brand.id, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  return NextResponse.json({ ok: true });
}
