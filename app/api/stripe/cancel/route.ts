import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createStripeClient } from "@/lib/stripe/client";

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
    .select("stripe_subscription_id, status, retention_offer_sent_at")
    .eq("profile_id", user.id)
    .maybeSingle();

  if (!subscription) {
    return NextResponse.json({ error: "Aucun abonnement actif." }, { status: 404 });
  }

  if (subscription.status === "canceled") {
    return NextResponse.json({ error: "Votre abonnement est déjà résilié." }, { status: 400 });
  }

  // Empêche de contourner le parcours de rétention en appelant directement cette route.
  if (!subscription.retention_offer_sent_at) {
    return NextResponse.json({ error: "Merci de d'abord consulter l'offre de fidélité." }, { status: 400 });
  }

  try {
    const stripe = createStripeClient();
    await stripe.subscriptions.update(subscription.stripe_subscription_id, { cancel_at_period_end: true });

    // Ne PAS mettre à jour subscriptions/brands ici : le webhook existant
    // (customer.subscription.updated, cf. app/api/stripe/webhook/route.ts::syncSubscription)
    // le fait déjà quand Stripe émet l'événement -- une synchro manuelle ici dupliquerait cette logique.

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    try {
      const admin = createAdminClient();
      await admin.from("error_logs").insert({ source: "stripe-cancel", message, context: { userId: user.id } });
    } catch {
      // Le logging ne doit jamais empêcher de répondre au client.
    }
    return NextResponse.json({ error: "Une erreur est survenue. Réessayez plus tard." }, { status: 500 });
  }
}
