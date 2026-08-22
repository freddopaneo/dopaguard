import { getAppUrl } from "@/lib/app-url";
import { PLAN_PRICES_EUR } from "@/lib/stripe/plans";

export const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Dopaguard",
  url: getAppUrl(),
  parentOrganization: { "@type": "Organization", name: "Dopaneo.ai" },
};

export const PRODUCT_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Dopaguard",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "Surveillance hebdomadaire de la réputation d'une entreprise dans les IA génératives.",
  offers: [
    { "@type": "Offer", name: "Essentiel", price: PLAN_PRICES_EUR.essentiel, priceCurrency: "EUR" },
    { "@type": "Offer", name: "Pro", price: PLAN_PRICES_EUR.pro, priceCurrency: "EUR" },
    { "@type": "Offer", name: "Agence", price: PLAN_PRICES_EUR.agence, priceCurrency: "EUR" },
  ],
};
