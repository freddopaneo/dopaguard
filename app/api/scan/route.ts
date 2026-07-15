import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { isIpRateLimited } from "@/lib/scan/rate-limit";
import { generateVerificationToken, hashToken } from "@/lib/scan/token";
import { sendMagicLinkEmail } from "@/lib/email/resend";

const scanRequestSchema = z.object({
  brandName: z.string().trim().min(1, "Nom de marque requis.").max(200),
  website: z.string().trim().min(1, "Site web requis."),
  email: z.string().trim().email("Email invalide."),
});

const TOKEN_TTL_MS = 30 * 60 * 1000;

function normalizeWebsite(website: string): string {
  return /^https?:\/\//i.test(website) ? website : `https://${website}`;
}

export async function POST(request: NextRequest) {
  const supabase = createAdminClient();

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const parsed = scanRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Requête invalide." }, { status: 400 });
  }

  const { brandName, email } = parsed.data;
  const website = normalizeWebsite(parsed.data.website);
  const ipAddress = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  try {
    const limited = await isIpRateLimited(supabase, ipAddress);
    if (limited) {
      return NextResponse.json(
        { error: "Trop de demandes depuis cette adresse. Réessayez dans une heure." },
        { status: 429 }
      );
    }

    const { data: existing, error: lookupError } = await supabase
      .from("free_scans")
      .select("id, status, token_expires_at")
      .eq("email", email)
      .maybeSingle();

    if (lookupError) throw lookupError;

    if (existing && existing.status !== "pending") {
      return NextResponse.json({ error: "Un scan gratuit a déjà été réalisé avec cet email." }, { status: 409 });
    }

    if (
      existing &&
      existing.status === "pending" &&
      existing.token_expires_at &&
      new Date(existing.token_expires_at) > new Date()
    ) {
      return NextResponse.json(
        { error: "Un email de vérification a déjà été envoyé. Vérifiez votre boîte mail." },
        { status: 409 }
      );
    }

    const token = generateVerificationToken();
    const tokenHash = hashToken(token);
    const expiresAt = new Date(Date.now() + TOKEN_TTL_MS).toISOString();

    if (existing) {
      const { error: updateError } = await supabase
        .from("free_scans")
        .update({
          brand_name: brandName,
          website,
          ip_address: ipAddress,
          verification_token_hash: tokenHash,
          token_expires_at: expiresAt,
          status: "pending",
        })
        .eq("id", existing.id);
      if (updateError) throw updateError;
    } else {
      const { error: insertError } = await supabase.from("free_scans").insert({
        email,
        brand_name: brandName,
        website,
        ip_address: ipAddress,
        verification_token_hash: tokenHash,
        token_expires_at: expiresAt,
        status: "pending",
      });
      if (insertError) throw insertError;
    }

    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
    const verifyUrl = `${appUrl}/scan/verify?token=${token}`;
    await sendMagicLinkEmail({ to: email, brandName, verifyUrl });

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    try {
      await supabase.from("error_logs").insert({
        source: "magic-link",
        message,
        context: { email, brandName },
      });
    } catch {
      // Le logging ne doit jamais empêcher de répondre au client.
    }
    return NextResponse.json({ error: "Une erreur est survenue. Réessayez plus tard." }, { status: 500 });
  }
}
