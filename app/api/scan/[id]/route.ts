import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createAdminClient();

  const { data: scan, error } = await supabase
    .from("free_scans")
    .select("id, brand_name, status, results")
    .eq("id", params.id)
    .maybeSingle();

  if (error || !scan) {
    return NextResponse.json({ error: "Scan introuvable." }, { status: 404 });
  }

  return NextResponse.json({
    id: scan.id,
    brandName: scan.brand_name,
    status: scan.status,
    results: scan.status === "completed" ? scan.results : null,
  });
}
