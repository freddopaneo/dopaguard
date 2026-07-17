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

export function planSlugFromPriceId(priceId: string): PlanSlug | null {
  const entry = (Object.entries(PLAN_PRICE_IDS) as [PlanSlug, string][]).find(
    ([, id]) => id === priceId
  );
  return entry ? entry[0] : null;
}
