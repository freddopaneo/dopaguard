import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Non connecté." }, { status: 401 });
  }

  const brandId = request.nextUrl.searchParams.get("brandId");
  if (!brandId) {
    return NextResponse.json({ error: "brandId requis." }, { status: 400 });
  }

  const { data: brand } = await supabase.from("brands").select("name, plan").eq("id", brandId).maybeSingle();
  if (!brand) {
    return NextResponse.json({ error: "Marque introuvable." }, { status: 404 });
  }

  const { count } = await supabase
    .from("brand_prompts")
    .select("id", { count: "exact", head: true })
    .eq("brand_id", brandId)
    .eq("enabled", true);

  return NextResponse.json({ brandName: brand.name, plan: brand.plan, promptCount: count ?? 0 });
}
