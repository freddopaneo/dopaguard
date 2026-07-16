import Stripe from "stripe";

// Client Stripe serveur : usage serveur uniquement, jamais exposé au client.
export function createStripeClient(): Stripe {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}
