import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createStripeClient } from "@/lib/stripe/client";
import { getAppUrl } from "@/lib/app-url";

export async function POST(request: NextRequest) {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url), 303);
  }

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("profile_id", user.id)
    .maybeSingle();

  if (!subscription) {
    return NextResponse.redirect(new URL("/onboarding", request.url), 303);
  }

  const stripe = createStripeClient();
  const portalSession = await stripe.billingPortal.sessions.create({
    customer: subscription.stripe_customer_id,
    return_url: `${getAppUrl()}/onboarding`,
  });

  // 303 (et non le 307 par défaut) : la requête d'origine est un POST (soumission de formulaire),
  // mais la page Stripe hébergée n'accepte que du GET -- 307 préserverait POST et casserait la redirection.
  return NextResponse.redirect(portalSession.url, 303);
}
