import { callLLM } from "@/lib/llm-gateway";

export interface TruthSheetDraft {
  legalStatus: string;
  offering: string;
  pricingFacts: string;
  keyPeople: string;
  differentiators: string;
  knownCompetitors: string[];
  openingHours: string;
  address: string;
  officialLinks: string;
  certifications: string;
}

const EMPTY_DRAFT: TruthSheetDraft = {
  legalStatus: "",
  offering: "",
  pricingFacts: "",
  keyPeople: "",
  differentiators: "",
  knownCompetitors: [],
  openingHours: "",
  address: "",
  officialLinks: "",
  certifications: "",
};

function buildDraftPrompt(brandName: string, websiteMarkdown: string): string {
  return `Voici le contenu du site web de l'entreprise "${brandName}" (extrait, format markdown) :

"""
${websiteMarkdown.slice(0, 8000)}
"""

À partir de ce contenu, propose un brouillon de fiche d'identité pour cette entreprise. Réponds strictement en JSON, sans aucun texte autour, au format :
{"legal_status": "...", "offering": "...", "pricing_facts": "...", "key_people": "...", "differentiators": "...", "known_competitors": ["...", "..."], "opening_hours": "...", "address": "...", "official_links": "...", "certifications": "..."}

Consignes :
- legal_status : statut/ancienneté si mentionné (ex. "SARL en activité, créée en 2019"), sinon chaîne vide.
- offering : description synthétique des produits/services proposés.
- pricing_facts : faits tarifaires publics mentionnés sur le site, sinon chaîne vide.
- key_people : dirigeants/fondateurs mentionnés, sinon chaîne vide.
- differentiators : points forts mis en avant par l'entreprise elle-même.
- known_competitors : liste de concurrents si mentionnés explicitement, sinon liste vide.
- opening_hours : horaires d'ouverture si mentionnés, sinon chaîne vide.
- address : adresse et coordonnées officielles si mentionnées, sinon chaîne vide.
- official_links : site et réseaux sociaux officiels mentionnés (un par ligne), sinon chaîne vide.
- certifications : certifications/labels mentionnés, sinon chaîne vide.
Ne déduis rien qui ne soit pas présent dans le texte fourni.`;
}

function parseDraft(raw: string): TruthSheetDraft {
  try {
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    const parsed = JSON.parse(jsonMatch ? jsonMatch[0] : raw);
    if (typeof parsed !== "object" || parsed === null) return EMPTY_DRAFT;

    return {
      legalStatus: typeof parsed.legal_status === "string" ? parsed.legal_status : "",
      offering: typeof parsed.offering === "string" ? parsed.offering : "",
      pricingFacts: typeof parsed.pricing_facts === "string" ? parsed.pricing_facts : "",
      keyPeople: typeof parsed.key_people === "string" ? parsed.key_people : "",
      differentiators: typeof parsed.differentiators === "string" ? parsed.differentiators : "",
      knownCompetitors: Array.isArray(parsed.known_competitors)
        ? parsed.known_competitors.filter((c: unknown) => typeof c === "string")
        : [],
      openingHours: typeof parsed.opening_hours === "string" ? parsed.opening_hours : "",
      address: typeof parsed.address === "string" ? parsed.address : "",
      officialLinks: typeof parsed.official_links === "string" ? parsed.official_links : "",
      certifications: typeof parsed.certifications === "string" ? parsed.certifications : "",
    };
  } catch {
    return EMPTY_DRAFT;
  }
}

// forbidden_claims n'est jamais proposé par l'IA : c'est au client de définir
// ce qui ne doit jamais être dit sur sa marque, pas à l'IA de le deviner.
export async function draftTruthSheet(brandName: string, websiteMarkdown: string): Promise<TruthSheetDraft> {
  try {
    const result = await callLLM({ provider: "anthropic", prompt: buildDraftPrompt(brandName, websiteMarkdown) });
    return parseDraft(result.text);
  } catch {
    return EMPTY_DRAFT;
  }
}
