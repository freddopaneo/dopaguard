import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const agencyRequestSchema = z.object({
  name: z.string().trim().min(1).max(200).optional(),
  primaryColor: z
    .string()
    .regex(/^#[0-9a-fA-F]{6}$/, "Couleur invalide (format hexadécimal attendu, ex. #22D3EE).")
    .optional(),
});

export async function PATCH(request: NextRequest) {
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

  const parsed = agencyRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Requête invalide." }, { status: 400 });
  }

  const updates: Record<string, string> = {};
  if (parsed.data.name !== undefined) updates.name = parsed.data.name;
  if (parsed.data.primaryColor !== undefined) updates.primary_color = parsed.data.primaryColor;

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "Aucune modification fournie." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("agencies")
    .update(updates)
    .eq("owner_id", user.id)
    .select("id, name, logo_url, primary_color")
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: "Une erreur est survenue. Réessayez plus tard." }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ error: "Agence introuvable." }, { status: 404 });
  }

  return NextResponse.json({ agency: data });
}
