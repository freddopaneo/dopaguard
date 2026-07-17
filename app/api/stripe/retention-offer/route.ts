import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createStripeClient } from "@/lib/stripe/client";
import { sendRetentionOfferEmail } from "@/lib/email/resend";
import { getAppUrl } from "@/lib/app-url";

export async function POST() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Non connecté." }, { status: 401 });
  }

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("id, stripe_subscription_id, status, retention_offer_sent_at")
    .eq("profile_id", user.id)
    .maybeSingle();

  if (!subscription) {
    return NextResponse.json({ error: "Aucun abonnement actif." }, { status: 404 });
  }

  if (subscription.status === "canceled") {
    return NextResponse.json({ error: "Votre abonnement est déjà résilié." }, { status: 400 });
  }

  try {
    const stripe = createStripeClient();
    const coupon = await stripe.coupons.retrieve(process.env.STRIPE_RETENTION_COUPON_ID!);
    const percentOff = coupon.percent_off ?? 0;

    if (!subscription.retention_offer_sent_at) {
      await stripe.subscriptions.update(subscription.stripe_subscription_id, {
        discounts: [{ coupon: process.env.STRIPE_RETENTION_COUPON_ID! }],
      });

      await sendRetentionOfferEmail({
        to: user.email!,
        percentOff,
        dashboardUrl: `${getAppUrl()}/dashboard/parametres`,
      });

      // Écriture service_role : aucune policy d'écriture client sur subscriptions (cf. migration 0011).
      // Posée seulement après le succès des deux étapes précédentes -- un échec en cours de route reste
      // ainsi rejouable au prochain clic plutôt que de marquer à tort l'offre comme envoyée.
      const admin = createAdminClient();
      await admin.from("subscriptions").update({ retention_offer_sent_at: new Date().toISOString() }).eq("id", subscription.id);
    }

    return NextResponse.json({ percentOff, alreadyApplied: Boolean(subscription.retention_offer_sent_at) });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    try {
      const admin = createAdminClient();
      await admin.from("error_logs").insert({ source: "stripe-retention-offer", message, context: { userId: user.id } });
    } catch {
      // Le logging ne doit jamais empêcher de répondre au client.
    }
    return NextResponse.json({ error: "Une erreur est survenue. Réessayez plus tard." }, { status: 500 });
  }
}
