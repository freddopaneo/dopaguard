export type VerticalAccent = "teal" | "lime" | "navy";

export interface VerticalPainExample {
  quote: string;
  highlight: string;
  note: string;
}

export interface VerticalFaqItem {
  question: string;
  answer: string;
}

export interface VerticalMeta {
  slug: string;
  label: string;
  angle: string;
  /** Sous-chaîne exacte de `angle` à mettre en évidence (lime) dans le H1. */
  heroHighlight: string;
  heroKicker: string;
  heroSubtitle: string;
  painExamples: [VerticalPainExample, VerticalPainExample];
  faqItems: VerticalFaqItem[];
  relatedArticleSlug: string;
  metaTitle: string;
  metaDescription: string;
  accent: VerticalAccent;
}

// Registre des métadonnées et du contenu des pages verticales -- même convention
// que lib/blog/articles.ts. Une seule route dynamique (app/secteurs/[slug]/page.tsx)
// consomme ce registre plutôt que 5 pages dupliquées.
export const VERTICALS: VerticalMeta[] = [
  {
    slug: "hotels",
    label: "Hôtels",
    angle: "ChatGPT recommande-t-il votre hôtel ?",
    heroHighlight: "ChatGPT",
    heroKicker: "Scan gratuit · Secteur hôtellerie",
    heroSubtitle:
      "Les voyageurs ne cherchent plus une adresse sur un moteur de recherche, ils demandent directement à une IA : « trouve-moi un bon hôtel dans le coin ». Quand l'IA se trompe — une adresse déclarée fermée en pleine saison, une carte tarifaire obsolète, le concurrent d'en face recommandé à votre place — le voyageur ne rappelle pas pour vérifier, il réserve ailleurs.",
    painExamples: [
      {
        quote: "Cet hôtel a reçu plusieurs avis mentionnant des problèmes de propreté récurrents récemment.",
        highlight: "problèmes de propreté récurrents",
        note: "Une IA a relayé un sentiment négatif non vérifié sur la qualité réelle de l'établissement.",
      },
      {
        quote: "Les chambres standard sont proposées à partir de 45€ la nuit, selon les dernières données.",
        highlight: "45€ la nuit",
        note: "Une IA a cité un tarif obsolète, en dessous des prix actuellement pratiqués par l'hôtel.",
      },
    ],
    faqItems: [
      {
        question: "Est-ce adapté à un hôtel indépendant, pas seulement aux grandes chaînes ?",
        answer:
          "Oui. Dopaguard s'adresse à tout établissement, indépendant ou en réseau, dès lors que des voyageurs se renseignent en ligne avant de réserver.",
      },
      {
        question: "Les IA parlent-elles vraiment des hôtels ?",
        answer:
          "Oui, de plus en plus. Un voyageur qui demande « un bon hôtel dans telle ville » à ChatGPT ou Perplexity reçoit une réponse construite à partir d'informations disponibles en ligne — parfois datées ou inexactes.",
      },
      {
        question: "Que se passe-t-il si Dopaguard détecte une erreur sur mon établissement ?",
        answer:
          "Vous recevez une alerte avec l'extrait exact de ce que l'IA a dit, la vérité attendue que vous avez validée, et une recommandation pour corriger la source.",
      },
      {
        question: "Combien de temps avant de voir un premier résultat ?",
        answer:
          "Le scan gratuit donne un résultat en quelques minutes. La surveillance hebdomadaire démarre dès la semaine suivant votre inscription.",
      },
    ],
    relatedArticleSlug: "reputation-ia-hotellerie-restauration",
    metaTitle: "ChatGPT recommande-t-il votre hôtel ?",
    metaDescription:
      "Découvrez gratuitement ce que ChatGPT, Claude et Perplexity disent de votre hôtel, et surveillez votre réputation dans les IA chaque semaine.",
    accent: "lime",
  },
  {
    slug: "restaurants",
    label: "Restaurants",
    angle: "Quelle adresse l'IA recommande-t-elle à votre place ?",
    heroHighlight: "l'IA",
    heroKicker: "Scan gratuit · Secteur restauration",
    heroSubtitle:
      "Avant de réserver une table, de plus en plus de clients demandent directement à une IA : « quel est le meilleur restaurant dans le quartier ? ». Si l'IA ne vous connaît pas bien, ne vous mentionne pas, ou recommande l'établissement d'en face à votre place, ce client ne viendra jamais frapper à votre porte — et vous ne le saurez jamais.",
    painExamples: [
      {
        quote: "Ce restaurant semble avoir fermé ses portes, aucune activité récente n'a été signalée.",
        highlight: "semble avoir fermé ses portes",
        note: "Une IA a laissé entendre qu'un restaurant en pleine activité avait cessé de fonctionner.",
      },
      {
        quote: "La carte propose principalement des plats autour de 12 à 15€, un excellent rapport qualité-prix.",
        highlight: "12 à 15€",
        note: "Une IA a cité des tarifs obsolètes, très en dessous de la carte actuelle du restaurant.",
      },
    ],
    faqItems: [
      {
        question: "Un client qui demande une recommandation à l'IA, c'est vraiment fréquent ?",
        answer:
          "De plus en plus. « Trouve-moi une bonne table » ou « quel restaurant pour un dîner d'affaires » sont des questions couramment posées à ChatGPT, Gemini ou Perplexity, surtout en dehors du quartier habituel du client.",
      },
      {
        question: "Est-ce que ça remplace les avis Google ou TripAdvisor ?",
        answer:
          "Non, ça les complète. Les avis restent visibles sur ces plateformes, mais les IA génératives en font une synthèse propre, parfois datée ou incomplète, qui devient la réponse que le client retient.",
      },
      {
        question: "Que couvre le scan gratuit ?",
        answer:
          "Un aperçu immédiat de ce que 3 IA (ChatGPT, Claude, Perplexity) répondent aujourd'hui sur votre établissement — réputation, fiabilité, recommandation face à la concurrence.",
      },
      {
        question: "Et si mon restaurant change souvent de carte ou d'horaires ?",
        answer:
          "C'est justement le cas d'usage : une vérification faite une fois devient vite obsolète. Dopaguard surveille chaque semaine, pas une seule fois.",
      },
    ],
    relatedArticleSlug: "reputation-ia-hotellerie-restauration",
    metaTitle: "Quelle adresse l'IA recommande-t-elle à votre place ?",
    metaDescription:
      "Découvrez gratuitement ce que ChatGPT, Claude et Perplexity disent de votre restaurant, et surveillez votre réputation dans les IA chaque semaine.",
    accent: "teal",
  },
  {
    slug: "immobilier",
    label: "Immobilier",
    angle: "Quelle agence ChatGPT recommande-t-il dans votre ville ?",
    heroHighlight: "ChatGPT",
    heroKicker: "Scan gratuit · Secteur immobilier",
    heroSubtitle:
      "Avant de pousser une porte, de plus en plus d'acheteurs et de locataires demandent à une IA : « quelle est la meilleure agence immobilière du secteur ? », « cette agence est-elle fiable ? ». Quand l'IA se trompe — une adresse fermée, un avis ancien présenté comme récent, une agence concurrente recommandée à votre place — le prospect appelle simplement ailleurs.",
    painExamples: [
      {
        quote: "Cette agence semblait avoir cessé son activité dans ce secteur, aucune information récente n'est disponible.",
        highlight: "cessé son activité",
        note: "Une IA a laissé entendre qu'une agence toujours active, avec un portefeuille en cours, avait fermé.",
      },
      {
        quote: "Les honoraires de cette agence démarrent autour de 3% du prix de vente, selon les données disponibles.",
        highlight: "3% du prix de vente",
        note: "Une IA a cité un taux d'honoraires obsolète, différent de la grille tarifaire actuelle de l'agence.",
      },
    ],
    faqItems: [
      {
        question: "Ça concerne aussi les agences indépendantes, pas que les réseaux nationaux ?",
        answer:
          "Oui, en particulier. Une agence indépendante n'a pas de service communication dédié pour surveiller ce que les IA disent d'elle — Dopaguard le fait à sa place.",
      },
      {
        question: "L'IA peut-elle vraiment recommander un concurrent à ma place ?",
        answer:
          "Oui. Quand un prospect demande « quelle agence pour vendre dans telle ville », l'IA construit une réponse à partir de ce qu'elle trouve — et peut mettre en avant une agence concurrente mieux référencée, même si elle n'est pas la plus adaptée.",
      },
      {
        question: "Est-ce que ça couvre les biens en cours de commercialisation ?",
        answer:
          "Dopaguard surveille la réputation de votre agence dans son ensemble (fiabilité, activité, positionnement), pas fiche par fiche un bien précis.",
      },
      {
        question: "Combien de temps pour voir un premier résultat ?",
        answer: "Le scan gratuit donne un résultat en quelques minutes, sans carte bancaire.",
      },
    ],
    relatedArticleSlug: "reputation-ia-agences-immobilieres",
    metaTitle: "Quelle agence ChatGPT recommande-t-il dans votre ville ?",
    metaDescription:
      "Découvrez gratuitement ce que ChatGPT, Claude et Perplexity disent de votre agence immobilière, et surveillez votre réputation dans les IA chaque semaine.",
    accent: "navy",
  },
  {
    slug: "avocats-professions-liberales",
    label: "Avocats & professions libérales",
    angle: "Que dit une IA lorsqu'un prospect demande qui vous êtes ?",
    heroHighlight: "une IA",
    heroKicker: "Scan gratuit · Avocats & professions libérales",
    heroSubtitle:
      "Avant de prendre rendez-vous, un prospect demande de plus en plus souvent à une IA : « ce cabinet est-il fiable ? », « qui contacter pour ce type de dossier ? ». Le problème : l'IA répond avec ce qu'elle trouve — votre activité peut être mal décrite, présentée comme arrêtée, ou un confrère peut être recommandé à votre place. Personne ne vous prévient.",
    painExamples: [
      {
        quote: "Il semblerait que ce cabinet ait cessé son activité, aucune information récente n'est disponible.",
        highlight: "cessé son activité",
        note: "Une IA a laissé entendre qu'un professionnel indépendant avait arrêté son activité, sans preuve récente.",
      },
      {
        quote: "Pour ce type de dossier, mieux vaut consulter un cabinet plus expérimenté dans ce domaine.",
        highlight: "un cabinet plus expérimenté",
        note: "Une IA a orienté l'utilisateur vers un concurrent plutôt que vers le professionnel interrogé.",
      },
    ],
    faqItems: [
      {
        question: "Est-ce réservé aux avocats, ou aussi pour d'autres professions libérales ?",
        answer:
          "Les deux. Avocats, experts-comptables, notaires, architectes, consultants indépendants : toute profession dont un prospect se renseigne en ligne avant un premier contact.",
      },
      {
        question: "Une IA peut-elle vraiment donner un avis sur la compétence d'un professionnel ?",
        answer:
          "Elle ne donne pas un avis au sens propre, mais formule une réponse qui ressemble à une recommandation — et qui peut orienter un prospect vers un confrère plutôt que vers vous, sans base vérifiée.",
      },
      {
        question: "Mes informations professionnelles restent-elles confidentielles ?",
        answer: "Oui. Vos informations et vos rapports ne sont jamais partagés, et vous pouvez supprimer votre compte à tout moment.",
      },
      {
        question: "Combien de temps prend la mise en place complète ?",
        answer:
          "Une dizaine de minutes pour valider votre fiche de vérité et choisir les questions à surveiller. Le scan gratuit, lui, donne un résultat immédiat.",
      },
    ],
    relatedArticleSlug: "reputation-ia-professions-liberales",
    metaTitle: "Que dit une IA quand un prospect demande qui vous êtes ?",
    metaDescription:
      "Découvrez gratuitement ce que ChatGPT, Claude et Perplexity disent de votre cabinet, et surveillez votre réputation dans les IA chaque semaine.",
    accent: "teal",
  },
  {
    slug: "consultants-coachs-agences",
    label: "Consultants, coachs & agences",
    angle: "Êtes-vous visible lorsqu'un prospect cherche un expert avec une IA ?",
    heroHighlight: "une IA",
    heroKicker: "Scan gratuit · Consultants, coachs & agences",
    heroSubtitle:
      "Avant de vous contacter, un client potentiel demande de plus en plus à ChatGPT ou Perplexity : « qui sont les meilleurs consultants dans ce domaine ? », « recommande-moi un expert pour... ». Le problème : l'IA répond avec ce qu'elle trouve — votre positionnement peut être mal résumé, votre expertise minimisée, ou un confrère cité à votre place. Personne ne vous prévient.",
    painExamples: [
      {
        quote:
          "Ce consultant est surtout reconnu pour son expertise en transformation digitale, un domaine qu'il a quitté depuis plusieurs années.",
        highlight: "un domaine qu'il a quitté depuis plusieurs années",
        note: "Une IA a attribué à un consultant une spécialité abandonnée depuis 3 ans, faute d'information à jour.",
      },
      {
        quote: "Pour ce type d'accompagnement, il existe des cabinets plus reconnus sur ce créneau spécifique.",
        highlight: "des cabinets plus reconnus",
        note: "Une IA a orienté le prospect vers un concurrent plutôt que vers le consultant interrogé.",
      },
    ],
    faqItems: [
      {
        question: "Ça s'applique aussi aux coachs indépendants, pas seulement aux cabinets ?",
        answer:
          "Oui, à toute personne ou structure dont l'expertise se vend sur la base d'une réputation — coach, consultant solo, agence, cabinet de conseil.",
      },
      {
        question: "Je peux demander moi-même à ChatGPT ce qu'il pense de moi, non ?",
        answer:
          "Oui, ponctuellement. Mais il faudrait le refaire chaque semaine, sur plusieurs IA, avec les bonnes questions, et repérer une nuance parfois discrète dans la façon dont votre expertise est décrite.",
      },
      {
        question: "Qu'est-ce que Dopaguard fait concrètement quand une erreur est détectée ?",
        answer:
          "Vous recevez l'extrait exact de ce que l'IA a dit, la vérité attendue que vous avez validée, et une recommandation concrète pour corriger la source.",
      },
      {
        question: "Puis-je résilier à tout moment ?",
        answer: "Oui, sans engagement de durée, directement depuis votre espace client.",
      },
    ],
    relatedArticleSlug: "reputation-ia-services-entreprises",
    metaTitle: "Êtes-vous visible quand un prospect cherche un expert via une IA ?",
    metaDescription:
      "Découvrez gratuitement ce que ChatGPT, Claude et Perplexity disent de votre expertise, et surveillez votre réputation dans les IA chaque semaine.",
    accent: "lime",
  },
];

export function getVerticalBySlug(slug: string): VerticalMeta | undefined {
  return VERTICALS.find((vertical) => vertical.slug === slug);
}
