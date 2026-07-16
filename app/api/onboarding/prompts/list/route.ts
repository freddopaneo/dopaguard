import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const CAP_ESSENTIEL = 20;
const CAP_OTHER = 30;
const DEFAULT_PER_CATEGORY = 4;

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

  const { data: brand } = await supabase.from("brands").select("plan").eq("id", brandId).maybeSingle();
  if (!brand) {
    return NextResponse.json({ error: "Marque introuvable." }, { status: 404 });
  }

  const cap = brand.plan === "essentiel" ? CAP_ESSENTIEL : CAP_OTHER;

  const { data: templates } = await supabase
    .from("prompt_templates")
    .select("id, category, template")
    .eq("is_active", true)
    .order("category", { ascending: true })
    .order("created_at", { ascending: true });

  const { data: existingSelection } = await supabase
    .from("brand_prompts")
    .select("prompt_template_id")
    .eq("brand_id", brandId)
    .eq("enabled", true);

  const selectedIds = new Set((existingSelection ?? []).map((row) => row.prompt_template_id));
  const seenPerCategory: Record<string, number> = {};

  const prompts = (templates ?? []).map((template) => {
    const index = seenPerCategory[template.category] ?? 0;
    seenPerCategory[template.category] = index + 1;

    const defaultSelected =
      selectedIds.size > 0 ? selectedIds.has(template.id) : index < DEFAULT_PER_CATEGORY;

    return { id: template.id, category: template.category, template: template.template, defaultSelected };
  });

  return NextResponse.json({ prompts, cap });
}
