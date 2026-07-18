export const PLAN_SLUGS = ["essentiel", "pro", "agence"] as const;

export type PlanSlug = (typeof PLAN_SLUGS)[number];

export const PLAN_LABELS: Record<PlanSlug, string> = {
  essentiel: "Essentiel",
  pro: "Pro",
  agence: "Agence",
};

export const PLAN_PRICE_IDS: Record<PlanSlug, string> = {
  essentiel: process.env.STRIPE_PRICE_ESSENTIEL_ID!,
  pro: process.env.STRIPE_PRICE_PRO_ID!,
  agence: process.env.STRIPE_PRICE_AGENCE_ID!,
};

// Montants du CDC (section 6.8), pour l'affichage seul (cockpit admin) -- à ajuster
// ici si les prix changent un jour côté Stripe, aucune source unique possible sans
// appeler l'API Stripe à chaque affichage.
export const PLAN_PRICES_EUR: Record<PlanSlug, number> = {
  essentiel: 69,
  pro: 149,
  agence: 349,
};

export const SUBSCRIPTION_STATUS_LABELS: Record<string, string> = {
  active: "Actif",
  trialing: "Période d'essai",
  past_due: "Paiement en retard",
  canceled: "Résilié",
  incomplete: "Incomplet",
  incomplete_expired: "Expiré",
  paused: "En pause",
  unpaid: "Impayé",
};

export function planSlugFromPriceId(priceId: string): PlanSlug | null {
  const entry = (Object.entries(PLAN_PRICE_IDS) as [PlanSlug, string][]).find(
    ([, id]) => id === priceId
  );
  return entry ? entry[0] : null;
}
