export type BlogCategory =
  | "reputation-ia"
  | "profession-liberale"
  | "hotellerie-restauration"
  | "commerce-ecommerce"
  | "services-entreprises"
  | "immobilier"
  | "sante"
  | "guide-pratique";

export const CATEGORY_LABELS: Record<BlogCategory, string> = {
  "reputation-ia": "Réputation IA",
  "profession-liberale": "Professions libérales",
  "hotellerie-restauration": "Hôtellerie-restauration",
  "commerce-ecommerce": "Commerce & e-commerce",
  "services-entreprises": "Services aux entreprises",
  immobilier: "Immobilier",
  sante: "Santé",
  "guide-pratique": "Guides pratiques",
};

export interface BlogArticleMeta {
  slug: string;
  title: string;
  description: string;
  category: BlogCategory;
  keywords: string[];
  publishedAt: string;
}

// Registre des métadonnées uniquement -- le contenu de chaque article vit dans
// content/blog/<slug>.tsx (composant JSX, même convention que components/legal/*),
// importé statiquement depuis content/blog/index.ts. Garder ce fichier synchrone
// avec cet index : chaque slug doit exister des deux côtés.
export const BLOG_ARTICLES: BlogArticleMeta[] = [
  // -- Piliers (vue d'ensemble du sujet) --
  {
    slug: "reputation-ia-guide-complet-tpe-pme",
    title: "Réputation IA : le guide complet pour les dirigeants de TPE/PME",
    description:
      "Ce que les IA génératives disent de votre entreprise influence vos clients. Comprendre le sujet, les risques et comment s'en protéger.",
    category: "reputation-ia",
    keywords: ["réputation entreprise IA", "réputation IA générative", "e-réputation ChatGPT"],
    publishedAt: "2026-07-19",
  },
  {
    slug: "comment-savoir-ce-que-chatgpt-dit-de-votre-entreprise",
    title: "Comment savoir ce que ChatGPT dit de votre entreprise",
    description:
      "La méthode pour interroger ChatGPT, Claude, Gemini et Perplexity sur votre entreprise, et repérer une erreur ou un sentiment négatif.",
    category: "guide-pratique",
    keywords: ["que dit ChatGPT de mon entreprise", "vérifier réputation ChatGPT"],
    publishedAt: "2026-07-19",
  },
  {
    slug: "5-erreurs-ia-generatives-entreprises",
    title: "Les 5 erreurs que les IA génératives commettent sur les entreprises",
    description:
      "Erreur factuelle, sentiment négatif, concurrent recommandé, hallucination, information datée : les 5 façons dont une IA peut se tromper sur vous.",
    category: "reputation-ia",
    keywords: ["erreur IA entreprise", "hallucination IA entreprise", "chatgpt erreur factuelle"],
    publishedAt: "2026-07-19",
  },
  {
    slug: "pourquoi-verification-ponctuelle-ne-suffit-pas",
    title: "Pourquoi une vérification ponctuelle de votre réputation IA ne suffit pas",
    description:
      "Une vérification un jour donné n'est qu'une photo. Pourquoi la réputation dans les IA génératives doit être surveillée dans la durée.",
    category: "reputation-ia",
    keywords: ["surveillance réputation IA", "vérification réputation entreprise"],
    publishedAt: "2026-07-19",
  },
  {
    slug: "chatgpt-gemini-perplexity-comparatif-entreprises",
    title: "ChatGPT, Gemini, Perplexity : ce que chaque IA peut dire de votre entreprise",
    description:
      "Panorama des principales IA génératives consultées par vos clients potentiels, et pourquoi les surveiller toutes plutôt qu'une seule.",
    category: "reputation-ia",
    keywords: ["ChatGPT Gemini Perplexity entreprise", "IA génératives comparatif"],
    publishedAt: "2026-07-19",
  },

  // -- Sectoriels (CDC : 6 segments) --
  {
    slug: "reputation-ia-professions-liberales",
    title: "Réputation IA pour les professions libérales : ce qu'il faut savoir",
    description:
      "Avocats, consultants, artisans qualifiés : comment une IA générative peut se tromper sur votre activité, et comment le détecter.",
    category: "profession-liberale",
    keywords: ["réputation cabinet IA", "ChatGPT cabinet fermé", "réputation avocat IA"],
    publishedAt: "2026-07-19",
  },
  {
    slug: "reputation-ia-hotellerie-restauration",
    title: "Réputation IA dans l'hôtellerie-restauration : les pièges à éviter",
    description:
      "Tarifs obsolètes, avis anciens relayés comme récents : ce que les IA génératives peuvent dire à tort sur un hôtel ou un restaurant.",
    category: "hotellerie-restauration",
    keywords: ["avis IA hôtel", "ChatGPT recommande hôtel", "réputation restaurant IA"],
    publishedAt: "2026-07-19",
  },
  {
    slug: "reputation-ia-commerce-ecommerce",
    title: "E-commerce : ce que les IA génératives disent de votre boutique en ligne",
    description:
      "Un client sur deux commence par une question à une IA avant d'acheter. Ce que cela signifie pour un commerce ou une boutique en ligne.",
    category: "commerce-ecommerce",
    keywords: ["réputation boutique en ligne IA", "e-commerce ChatGPT réputation"],
    publishedAt: "2026-07-19",
  },
  {
    slug: "reputation-ia-services-entreprises",
    title: "Réputation IA pour les prestataires de services aux entreprises",
    description:
      "Agences, cabinets de conseil, prestataires B2B : votre réputation dans les IA génératives influence aussi les décisions professionnelles.",
    category: "services-entreprises",
    keywords: ["réputation IA B2B", "réputation prestataire services IA"],
    publishedAt: "2026-07-19",
  },
  {
    slug: "reputation-ia-agences-immobilieres",
    title: "Agences immobilières : surveillez ce que l'IA dit de vous",
    description:
      "Un bien mal décrit ou une agence confondue avec une autre par une IA générative peut coûter un contact commercial. Comment s'en prémunir.",
    category: "immobilier",
    keywords: ["réputation agence immobilière IA", "ChatGPT immobilier"],
    publishedAt: "2026-07-19",
  },
  {
    slug: "reputation-ia-cabinets-medicaux",
    title: "Cabinets médicaux et paramédicaux : attention à votre réputation IA",
    description:
      "Une information de santé datée ou inexacte relayée par une IA générative peut avoir des conséquences directes sur la patientèle.",
    category: "sante",
    keywords: ["réputation cabinet médical IA", "réputation IA professionnel de santé"],
    publishedAt: "2026-07-19",
  },

  // -- Longue traîne / questions --
  {
    slug: "chatgpt-invente-informations-entreprise-que-faire",
    title: "ChatGPT invente des informations sur mon entreprise : que faire ?",
    description:
      "Comprendre pourquoi une IA générative peut halluciner un fait sur votre entreprise, et les options concrètes pour réagir.",
    category: "guide-pratique",
    keywords: ["ChatGPT invente informations entreprise", "hallucination IA que faire"],
    publishedAt: "2026-07-19",
  },
  {
    slug: "corriger-erreur-factuelle-ia-entreprise",
    title: "Comment corriger une erreur factuelle que l'IA raconte sur votre entreprise",
    description:
      "Les IA génératives n'ont pas de bouton \"corriger\" — voici ce qui influence réellement ce qu'elles disent, et comment agir dans la durée.",
    category: "guide-pratique",
    keywords: ["corriger erreur IA entreprise", "comment corriger chatgpt"],
    publishedAt: "2026-07-19",
  },
  {
    slug: "ia-declare-entreprise-fermee-a-tort",
    title: "Une IA a déclaré mon entreprise fermée alors qu'elle est toujours active",
    description:
      "Un cas fréquent et sérieux : pourquoi une IA générative peut affirmer à tort qu'une entreprise a cessé son activité, et quoi faire.",
    category: "guide-pratique",
    keywords: ["IA dit entreprise fermée", "chatgpt entreprise fermée à tort"],
    publishedAt: "2026-07-19",
  },
  {
    slug: "concurrent-recommande-a-la-place-de-mon-entreprise",
    title: "Un concurrent est recommandé à la place de mon entreprise par ChatGPT : pourquoi ?",
    description:
      "Comment une IA générative choisit de recommander une entreprise plutôt qu'une autre, et ce qui peut faire pencher la balance.",
    category: "guide-pratique",
    keywords: ["ChatGPT recommande concurrent", "IA préfère concurrent"],
    publishedAt: "2026-07-19",
  },
  {
    slug: "fiche-de-verite-informations-entreprise-ia",
    title: "Fiche de vérité : donner les bonnes informations aux IA sur votre entreprise",
    description:
      "Le principe de la fiche de vérité : centraliser les faits exacts de votre entreprise pour mieux détecter les écarts dans les réponses des IA.",
    category: "guide-pratique",
    keywords: ["fiche de vérité entreprise", "informations exactes IA entreprise"],
    publishedAt: "2026-07-19",
  },
  {
    slug: "importance-rapidite-alerte-reputation-ia",
    title: "Alerte réputation IA : pourquoi la rapidité de réaction compte",
    description:
      "Le temps entre l'apparition d'une erreur dans une IA générative et sa détection influence directement son impact sur votre activité.",
    category: "reputation-ia",
    keywords: ["alerte réputation IA", "réactivité réputation entreprise"],
    publishedAt: "2026-07-19",
  },
  {
    slug: "e-reputation-classique-vs-reputation-ia-generative",
    title: "E-réputation classique vs réputation dans les IA génératives : quelles différences",
    description:
      "Avis Google, réseaux sociaux, et désormais IA génératives : pourquoi ce sont deux sujets liés mais distincts à surveiller séparément.",
    category: "reputation-ia",
    keywords: ["e-réputation vs réputation IA", "différence avis Google IA"],
    publishedAt: "2026-07-19",
  },
  {
    slug: "cout-mauvaise-reputation-ia-entreprise",
    title: "Combien coûte une mauvaise réputation IA pour une entreprise ?",
    description:
      "Un client détourné par une réponse d'IA erronée ne se voit jamais dans une facture — pourquoi ce coût invisible est pourtant bien réel.",
    category: "reputation-ia",
    keywords: ["coût mauvaise réputation IA", "impact erreur IA entreprise"],
    publishedAt: "2026-07-19",
  },
  {
    slug: "auditer-gratuitement-reputation-ia-3-minutes",
    title: "Comment auditer gratuitement votre réputation dans les IA en 3 minutes",
    description:
      "La méthode la plus rapide pour découvrir ce que ChatGPT, Gemini et Perplexity disent aujourd'hui de votre entreprise, sans carte bancaire.",
    category: "guide-pratique",
    keywords: ["scan gratuit réputation IA", "audit réputation ChatGPT gratuit"],
    publishedAt: "2026-07-19",
  },
];

export function getArticleBySlug(slug: string): BlogArticleMeta | undefined {
  return BLOG_ARTICLES.find((article) => article.slug === slug);
}
