export interface GlossaryTerm {
  slug: string;
  term: string;
  definition: string;
}

// Termes lies a la reputation d'entreprise dans les IA generatives. Contenu factuel
// et direct (pas de definition marketing) -- conforme a la discipline GEO deja
// appliquee ailleurs sur le site : affirmations verifiables, jamais de statistique
// inventee.
export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    slug: "geo",
    term: "GEO (Generative Engine Optimization)",
    definition:
      "L'ensemble des pratiques qui visent à améliorer la façon dont une entreprise apparaît dans les réponses des IA génératives (ChatGPT, Claude, Gemini, Perplexity, Mistral...), par opposition au référencement classique (SEO) qui vise les résultats de recherche traditionnels.",
  },
  {
    slug: "ia-generative",
    term: "IA générative",
    definition:
      "Une technologie capable de produire une réponse en langage naturel à une question, en se basant sur de vastes quantités de données d'entraînement. ChatGPT, Claude, Gemini, Perplexity et Mistral en sont des exemples grand public.",
  },
  {
    slug: "hallucination-ia",
    term: "Hallucination IA",
    definition:
      "Une information inventée ou déformée qu'une IA générative présente comme un fait, sans base réelle. Appliqué à une entreprise, cela va d'un horaire erroné jusqu'à une fausse annonce de fermeture.",
  },
  {
    slug: "llm",
    term: "LLM (grand modèle de langage)",
    definition:
      "Le type de modèle d'intelligence artificielle qui alimente les IA génératives conversationnelles. « LLM » et « IA générative » sont souvent utilisés l'un pour l'autre dans le langage courant.",
  },
  {
    slug: "prompt",
    term: "Prompt",
    definition:
      "La question ou l'instruction envoyée à une IA générative. La formulation d'un prompt influence directement la réponse obtenue — deux formulations proches peuvent produire des réponses différentes sur une même entreprise.",
  },
  {
    slug: "reputation-ia",
    term: "Réputation IA",
    definition:
      "La façon dont une entreprise est décrite, recommandée ou évaluée lorsqu'une IA générative répond à une question la concernant. Distincte de l'e-réputation classique (avis Google, réseaux sociaux), même si les deux sujets sont liés.",
  },
  {
    slug: "sentiment-ia",
    term: "Sentiment IA",
    definition:
      "Le ton — positif, neutre ou négatif — que porte une réponse d'IA générative à propos d'une entreprise, indépendamment de son exactitude factuelle. Une réponse peut être factuellement correcte tout en étant formulée de façon défavorable.",
  },
  {
    slug: "reponse-sourcee",
    term: "Réponse sourcée",
    definition:
      "Une réponse d'IA accompagnée de liens vers les pages web utilisées pour la construire. Perplexity, par exemple, sourcent systématiquement leurs réponses ; ChatGPT en mode conversationnel standard ne le fait pas toujours, ce qui rend une éventuelle erreur plus difficile à tracer.",
  },
  {
    slug: "ai-overview",
    term: "AI Overview",
    definition:
      "Le résumé généré par IA qui apparaît en tête de certains résultats de recherche Google, au-dessus des liens classiques. Distinct d'une IA conversationnelle, mais soumis aux mêmes risques d'erreur ou d'omission sur une entreprise.",
  },
  {
    slug: "fiche-de-verite",
    term: "Fiche de vérité",
    definition:
      "Chez Dopaguard, le document dans lequel un dirigeant valide les faits exacts concernant son entreprise (activité, tarifs, dirigeants, différenciateurs). Cette fiche sert de référence pour juger si une réponse d'IA est correcte ou comporte un écart.",
  },
  {
    slug: "anomalie-reputation-ia",
    term: "Anomalie de réputation IA",
    definition:
      "Un écart détecté entre ce qu'une IA générative affirme sur une entreprise et la réalité. Les types les plus fréquents : erreur factuelle, sentiment négatif, concurrent recommandé à tort, hallucination, information datée.",
  },
  {
    slug: "scan-reputation-ia",
    term: "Scan de réputation IA",
    definition:
      "Une vérification de ce que plusieurs IA génératives disent d'une entreprise donnée, à un instant précis. Un scan ponctuel donne une photo ; une surveillance récurrente (hebdomadaire chez Dopaguard) permet de détecter un écart dès son apparition.",
  },
];

export function getTermBySlug(slug: string): GlossaryTerm | undefined {
  return GLOSSARY_TERMS.find((term) => term.slug === slug);
}
