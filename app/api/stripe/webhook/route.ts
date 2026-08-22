import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createStripeClient } from "@/lib/stripe/client";
import { createAdminClient, type AdminClient } from "@/lib/supabase/admin";
import { planSlugFromPriceId } from "@/lib/stripe/plans";
import { sendLoginLink } from "@/lib/auth/send-login-link";

export const runtime = "nodejs";

async function logError(supabase: AdminClient, message: string, context: Record<string, unknown>) {
  try {
    await supabase.from("error_logs").insert({ source: "stripe-webhook", message, context });
  } catch {
    // Le logging ne doit jamais faire échouer le traitement du webhook.
  }
}

function subscriptionPeriodEnd(subscription: Stripe.Subscription): string | null {
  const seconds = subscription.items.data[0]?.current_period_end;
  return seconds ? new Date(seconds * 1000).toISOString() : null;
}

async function handleCheckoutCompleted(
  stripe: Stripe,
  supabase: AdminClient,
  session: Stripe.Checkout.Session
) {
  const email = session.customer_details?.email || session.customer_email;
  if (!email) throw new Error("Email absent de la session Checkout.");

  const subscriptionId = typeof session.subscription === "string" ? session.subscription : session.subscription?.id;
  const customerId = typeof session.customer === "string" ? session.customer : session.customer?.id;
  if (!subscriptionId || !customerId) throw new Error("Abonnement ou client Stripe absent de la session.");

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const priceId = subscription.items.data[0]?.price.id;
  const plan = priceId ? planSlugFromPriceId(priceId) : null;
  if (!plan) throw new Error(`Prix Stripe inconnu: ${priceId}`);

  const { data: existingProfile } = await supabase.from("profiles").select("id").eq("email", email).maybeSingle();

  let profileId: string;
  if (existingProfile) {
    profileId = existingProfile.id;
  } else {
    const { data: created, error: createError } = await supabase.auth.admin.createUser({
      email,
      email_confirm: true,
    });
    if (createError || !created.user) {
      throw new Error(createError?.message || "Échec de création du compte.");
    }
    profileId = created.user.id;
  }

  const { error: upsertError } = await supabase.from("subscriptions").upsert(
    {
      profile_id: profileId,
      stripe_customer_id: customerId,
      stripe_subscription_id: subscriptionId,
      plan,
      status: subscription.status,
      current_period_end: subscriptionPeriodEnd(subscription),
    },
    { onConflict: "stripe_subscription_id" }
  );
  if (upsertError) throw upsertError;

  await sendLoginLink(email);
}

async function syncSubscription(supabase: AdminClient, subscription: Stripe.Subscription) {
  const priceId = subscription.items.data[0]?.price.id;
  const plan = priceId ? planSlugFromPriceId(priceId) : null;

  const { data: existing } = await supabase
    .from("subscriptions")
    .select("id, brand_id")
    .eq("stripe_subscription_id", subscription.id)
    .maybeSingle();

  if (!existing) {
    // Rien à synchroniser : le checkout.session.completed correspondant n'a pas encore été traité.
    return;
  }

  const { error: updateError } = await supabase
    .from("subscriptions")
    .update({
      status: subscription.status,
      current_period_end: subscriptionPeriodEnd(subscription),
      canceled_at: subscription.canceled_at ? new Date(subscription.canceled_at * 1000).toISOString() : null,
      ...(plan ? { plan } : {}),
    })
    .eq("id", existing.id);
  if (updateError) throw updateError;

  if (existing.brand_id) {
    const brandStatus =
      subscription.status === "active" || subscription.status === "trialing"
        ? "active"
        : subscription.status === "canceled"
          ? "cancelled"
          : subscription.status === "past_due" || subscription.status === "unpaid"
            ? "paused"
            : null;

    if (brandStatus) {
      // Résout owner_id via la marque déjà liée, pour propager le statut à TOUTES les
      // marques du compte -- pertinent pour un compte Agence avec jusqu'à 10 marques
      // sous un même abonnement, pas seulement celle historiquement pointée par
      // brand_id. No-op fonctionnel pour un compte Essentiel/Pro (une seule marque).
      const { data: linkedBrand } = await supabase.from("brands").select("owner_id").eq("id", existing.brand_id).maybeSingle();
      const { error: brandError } = linkedBrand
        ? await supabase.from("brands").update({ status: brandStatus }).eq("owner_id", linkedBrand.owner_id)
        : await supabase.from("brands").update({ status: brandStatus }).eq("id", existing.brand_id);
      if (brandError) throw brandError;
    }
  }
}

async function handlePaymentFailed(stripe: Stripe, supabase: AdminClient, invoice: Stripe.Invoice) {
  const subscriptionRef = invoice.parent?.subscription_details?.subscription;
  const subscriptionId = typeof subscriptionRef === "string" ? subscriptionRef : subscriptionRef?.id;
  if (!subscriptionId) return;

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  // On ne réagit qu'aux échecs définitifs (Stripe a déjà retenté plusieurs fois) : past_due/unpaid.
  if (subscription.status !== "past_due" && subscription.status !== "unpaid") return;

  await syncSubscription(supabase, subscription);
}

export async function POST(request: NextRequest) {
  const stripe = createStripeClient();
  const supabase = createAdminClient();

  const signature = request.headers.get("stripe-signature");
  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    if (!signature) throw new Error("En-tête stripe-signature absent.");
    event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    await logError(supabase, `Signature invalide: ${message}`, {});
    return NextResponse.json({ error: "Signature invalide." }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(stripe, supabase, event.data.object as Stripe.Checkout.Session);
        break;
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        await syncSubscription(supabase, event.data.object as Stripe.Subscription);
        break;
      case "invoice.payment_failed":
        await handlePaymentFailed(stripe, supabase, event.data.object as Stripe.Invoice);
        break;
      default:
        break;
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    await logError(supabase, message, { eventType: event.type, eventId: event.id });
  }

  return NextResponse.json({ received: true });
}
