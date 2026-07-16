import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { createStripeClient } from "@/lib/stripe/client";
import { PLAN_PRICE_IDS, PLAN_SLUGS } from "@/lib/stripe/plans";
import { getAppUrl } from "@/lib/app-url";

const checkoutRequestSchema = z.object({
  plan: z.enum(PLAN_SLUGS),
});

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const parsed = checkoutRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Offre invalide." }, { status: 400 });
  }

  const { plan } = parsed.data;
  const appUrl = getAppUrl();

  try {
    const stripe = createStripeClient();

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: PLAN_PRICE_IDS[plan], quantity: 1 }],
      subscription_data: { trial_period_days: 14 },
      success_url: `${appUrl}/bienvenue`,
      cancel_url: `${appUrl}/#tarifs`,
    });

    if (!session.url) {
      throw new Error("Stripe n'a pas renvoyé d'URL de session.");
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    try {
      const supabase = createAdminClient();
      await supabase.from("error_logs").insert({
        source: "stripe-checkout",
        message,
        context: { plan },
      });
    } catch {
      // Le logging ne doit jamais empêcher de répondre au client.
    }
    return NextResponse.json({ error: "Une erreur est survenue. Réessayez plus tard." }, { status: 500 });
  }
}
