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
    metaTitle: "Surveillance réputation IA — Hôtels",
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
    metaTitle: "Surveillance réputation IA — Restaurants",
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
    metaTitle: "Surveillance réputation IA — Immobilier",
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
    metaTitle: "Surveillance réputation IA — Avocats & professions libérales",
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
    metaTitle: "Surveillance réputation IA — Consultants, coachs & agences",
    metaDescription:
      "Découvrez gratuitement ce que ChatGPT, Claude et Perplexity disent de votre expertise, et surveillez votre réputation dans les IA chaque semaine.",
    accent: "lime",
  },
  {
    slug: "commerce-ecommerce",
    label: "Commerce & e-commerce",
    angle: "Quelle boutique en ligne l'IA recommande-t-elle à votre place ?",
    heroHighlight: "l'IA",
    heroKicker: "Scan gratuit · Commerce & e-commerce",
    heroSubtitle:
      "Avant d'acheter, de plus en plus de clients demandent directement à une IA : « quelle boutique choisir pour ce produit ? », « ce site est-il fiable ? ». Quand l'IA se trompe — un tarif obsolète, une politique de livraison périmée, une enseigne concurrente recommandée à votre place — le client n'ira jamais vérifier sur votre site, il achète ailleurs.",
    painExamples: [
      {
        quote: "Les frais de livraison standard sont offerts dès 50€ d'achat, et les retours sont gratuits sous 30 jours.",
        highlight: "retours sont gratuits sous 30 jours",
        note: "Une IA a cité une politique de retour que la boutique a modifiée depuis, en décalage avec les conditions réellement appliquées.",
      },
      {
        quote: "Pour ce type de produit, une autre enseigne semble proposer un meilleur rapport qualité-prix et un service plus réactif.",
        highlight: "une autre enseigne semble proposer un meilleur rapport qualité-prix",
        note: "Une IA a orienté un client potentiel vers une enseigne concurrente plutôt que vers la boutique interrogée.",
      },
    ],
    faqItems: [
      {
        question: "Est-ce que ça concerne les petites boutiques, pas seulement les grandes enseignes ?",
        answer:
          "Particulièrement. Une petite boutique en ligne, même excellente, part avec un désavantage face aux enseignes très médiatisées, mieux représentées dans les contenus que les IA consultent — d'où l'intérêt de savoir précisément ce qui se dit d'elle.",
      },
      {
        question: "Une IA peut-elle vraiment influencer une décision d'achat ?",
        answer:
          "De plus en plus. Un client qui demande « quelle boutique choisir pour ce produit » reçoit une réponse formulée avec assurance, qui peut orienter son choix avant même qu'il visite un site.",
      },
      {
        question: "Que se passe-t-il si Dopaguard détecte un tarif ou une information erronée ?",
        answer:
          "Vous recevez une alerte avec l'extrait exact de ce que l'IA a dit, la vérité attendue que vous avez validée, et une recommandation pour corriger la source.",
      },
      {
        question: "Combien de temps avant de voir un premier résultat ?",
        answer:
          "Le scan gratuit donne un résultat en quelques minutes. La surveillance hebdomadaire démarre dès la semaine suivant votre inscription.",
      },
    ],
    relatedArticleSlug: "reputation-ia-commerce-ecommerce",
    metaTitle: "Surveillance réputation IA — Commerce & e-commerce",
    metaDescription:
      "Découvrez gratuitement ce que ChatGPT, Claude et Perplexity disent de votre boutique en ligne, et surveillez votre réputation dans les IA chaque semaine.",
    accent: "navy",
  },
  {
    slug: "sante-cabinets-medicaux",
    label: "Santé & cabinets médicaux",
    angle: "Que répond une IA quand un patient cherche votre cabinet ?",
    heroHighlight: "une IA",
    heroKicker: "Scan gratuit · Santé & cabinets médicaux",
    heroSubtitle:
      "Avant d'appeler, un patient demande de plus en plus à une IA : « ce cabinet est-il ouvert le samedi ? », « accepte-t-il de nouveaux patients ? ». Quand l'IA répond à tort que le cabinet est fermé ou complet, l'appel qui aurait dû avoir lieu n'a jamais lieu — et personne ne vous prévient.",
    painExamples: [
      {
        quote: "Ce cabinet ne semble plus accepter de nouveaux patients actuellement, selon les dernières informations disponibles.",
        highlight: "ne semble plus accepter de nouveaux patients",
        note: "Une IA a indiqué à tort qu'un cabinet en activité n'acceptait plus de nouveaux patients, faute d'information récente.",
      },
      {
        quote: "Les horaires d'ouverture indiqués sont du lundi au vendredi, 9h-17h, sans consultation le samedi.",
        highlight: "sans consultation le samedi",
        note: "Une IA a relayé des horaires obsolètes après un changement d'organisation du cabinet.",
      },
    ],
    faqItems: [
      {
        question: "Est-ce que Dopaguard analyse du contenu médical ou clinique ?",
        answer:
          "Non, jamais. Dopaguard se limite strictement aux informations pratiques et organisationnelles — horaires, adresse, coordonnées, disponibilité pour de nouveaux patients — jamais au contenu médical.",
      },
      {
        question: "Ça concerne quels types de professionnels de santé ?",
        answer:
          "Médecins, dentistes, kinésithérapeutes, et plus largement tout cabinet médical ou paramédical dont des patients se renseignent en ligne avant de prendre contact.",
      },
      {
        question: "Que se passe-t-il si une IA affirme à tort que mon cabinet est fermé ?",
        answer:
          "Vous recevez une alerte avec l'extrait exact de ce que l'IA a dit, la vérité attendue que vous avez validée, et une recommandation pour corriger la source.",
      },
      {
        question: "Combien de temps avant de voir un premier résultat ?",
        answer:
          "Le scan gratuit donne un résultat en quelques minutes. La surveillance hebdomadaire démarre dès la semaine suivant votre inscription.",
      },
    ],
    relatedArticleSlug: "reputation-ia-cabinets-medicaux",
    metaTitle: "Surveillance réputation IA — Santé & cabinets médicaux",
    metaDescription:
      "Découvrez gratuitement ce que ChatGPT, Claude et Perplexity disent de votre cabinet médical, et surveillez vos informations pratiques dans les IA chaque semaine.",
    accent: "teal",
  },
  {
    slug: "artisans-batiment",
    label: "Artisans du bâtiment",
    angle: "Quel artisan une IA recommande-t-elle pour vos travaux ?",
    heroHighlight: "une IA",
    heroKicker: "Scan gratuit · Artisans du bâtiment",
    heroSubtitle:
      "Avant d'appeler, un client demande de plus en plus à une IA : « quel plombier ou quel électricien recommandez-vous près de chez moi ? », souvent en urgence. Quand l'IA se trompe — un artisan déclaré indisponible, un numéro obsolète, le concurrent d'en face recommandé à votre place — l'appel qui aurait dû arriver ne vient jamais.",
    painExamples: [
      {
        quote: "Cet artisan ne semble plus intervenir dans ce secteur, aucune disponibilité récente n'a été signalée.",
        highlight: "ne semble plus intervenir dans ce secteur",
        note: "Une IA a laissé entendre qu'un artisan toujours en activité avait cessé d'intervenir dans sa zone, faute d'information récente.",
      },
      {
        quote: "Pour une intervention en urgence, un autre professionnel du secteur semble plus rapidement disponible.",
        highlight: "un autre professionnel du secteur semble plus rapidement disponible",
        note: "Une IA a orienté un client vers un concurrent plutôt que vers l'artisan interrogé, sur un métier où l'urgence pèse fortement dans la décision.",
      },
    ],
    faqItems: [
      {
        question: "Est-ce adapté à un artisan indépendant, pas seulement aux entreprises du bâtiment structurées ?",
        answer:
          "Oui, en particulier. Un artisan seul n'a pas de service marketing pour surveiller ce que les IA disent de lui — Dopaguard le fait à sa place.",
      },
      {
        question: "Les IA sont-elles vraiment consultées pour trouver un artisan ?",
        answer:
          "De plus en plus, notamment en urgence (fuite d'eau, panne électrique), où le client veut une réponse immédiate plutôt que de comparer plusieurs sites.",
      },
      {
        question: "Que se passe-t-il si Dopaguard détecte une erreur sur ma disponibilité ou ma zone d'intervention ?",
        answer:
          "Vous recevez une alerte avec l'extrait exact de ce que l'IA a dit, la vérité attendue que vous avez validée, et une recommandation pour corriger la source.",
      },
      {
        question: "Combien de temps avant de voir un premier résultat ?",
        answer:
          "Le scan gratuit donne un résultat en quelques minutes. La surveillance hebdomadaire démarre dès la semaine suivant votre inscription.",
      },
    ],
    relatedArticleSlug: "reputation-ia-guide-complet-tpe-pme",
    metaTitle: "Surveillance réputation IA — Artisans du bâtiment",
    metaDescription:
      "Découvrez gratuitement ce que ChatGPT, Claude et Perplexity disent de votre entreprise du bâtiment, et surveillez votre réputation dans les IA chaque semaine.",
    accent: "lime",
  },
  {
    slug: "coiffure-beaute-bien-etre",
    label: "Coiffure, beauté & bien-être",
    angle: "Quel salon une IA recommande-t-elle à votre place ?",
    heroHighlight: "une IA",
    heroKicker: "Scan gratuit · Coiffure, beauté & bien-être",
    heroSubtitle:
      "Avant de prendre rendez-vous, de plus en plus de clients demandent à une IA : « quel salon recommandez-vous pour... ? » — une décision souvent impulsive, où la confiance immédiate compte double. Quand l'IA se trompe — un avis ancien présenté comme récent, un salon concurrent mis en avant à votre place — le rendez-vous se prend ailleurs, sans que vous le sachiez jamais.",
    painExamples: [
      {
        quote: "Ce salon a reçu plusieurs retours mentionnant un accueil décevant ces derniers temps.",
        highlight: "un accueil décevant ces derniers temps",
        note: "Une IA a relayé un avis ancien et isolé comme s'il reflétait l'ambiance actuelle du salon.",
      },
      {
        quote:
          "Pour ce type de prestation, un autre établissement du quartier semble bénéficier d'un meilleur bouche-à-oreille récemment.",
        highlight: "un autre établissement du quartier semble bénéficier d'un meilleur bouche-à-oreille",
        note: "Une IA a orienté un client potentiel vers un établissement concurrent plutôt que vers celui interrogé.",
      },
    ],
    faqItems: [
      {
        question: "Ça concerne quels types d'établissements ?",
        answer:
          "Salons de coiffure, instituts de beauté, spas, salles de sport, praticiens du bien-être — tout établissement dont la clientèle se décide en partie sur la réputation perçue.",
      },
      {
        question: "Une IA peut-elle vraiment influencer une prise de rendez-vous ?",
        answer:
          "De plus en plus. Une réponse formulée avec assurance par une IA peut orienter le choix d'un client avant même qu'il consulte votre site ou vos avis.",
      },
      {
        question: "Que se passe-t-il si Dopaguard détecte un avis obsolète relayé par une IA ?",
        answer:
          "Vous recevez une alerte avec l'extrait exact de ce que l'IA a dit, la vérité attendue que vous avez validée, et une recommandation pour corriger la source.",
      },
      {
        question: "Combien de temps avant de voir un premier résultat ?",
        answer:
          "Le scan gratuit donne un résultat en quelques minutes. La surveillance hebdomadaire démarre dès la semaine suivant votre inscription.",
      },
    ],
    relatedArticleSlug: "chatgpt-dit-du-mal-de-mon-entreprise-sentiment-negatif",
    metaTitle: "Surveillance réputation IA — Coiffure, beauté & bien-être",
    metaDescription:
      "Découvrez gratuitement ce que ChatGPT, Claude et Perplexity disent de votre salon, et surveillez votre réputation dans les IA chaque semaine.",
    accent: "teal",
  },
  {
    slug: "garages-automobile",
    label: "Garages & automobile",
    angle: "Quel garage une IA recommande-t-elle près de chez vous ?",
    heroHighlight: "une IA",
    heroKicker: "Scan gratuit · Garages & automobile",
    heroSubtitle:
      "Avant de confier leur véhicule, de plus en plus d'automobilistes demandent à une IA : « quel garage recommandez-vous pour... ? ». Quand l'IA se trompe — un garage déclaré fermé, des tarifs obsolètes, un concurrent recommandé à votre place — le client prend rendez-vous ailleurs sans jamais vous appeler.",
    painExamples: [
      {
        quote: "Ce garage semble avoir cessé son activité à cette adresse, aucune information récente n'est disponible.",
        highlight: "semble avoir cessé son activité",
        note: "Une IA a laissé entendre qu'un garage en pleine activité avait fermé, faute d'information récente.",
      },
      {
        quote: "Les tarifs de révision de ce garage démarrent autour de 80€, selon les données disponibles.",
        highlight: "démarrent autour de 80€",
        note: "Une IA a cité un tarif obsolète, en décalage avec la grille tarifaire actuelle du garage.",
      },
    ],
    faqItems: [
      {
        question: "Ça s'applique aussi aux garages indépendants, pas seulement aux réseaux de marque ?",
        answer:
          "Oui, en particulier. Un garage indépendant n'a pas de service communication pour surveiller ce que les IA disent de lui — Dopaguard le fait à sa place.",
      },
      {
        question: "Les IA sont-elles vraiment consultées pour trouver un garage ?",
        answer:
          "De plus en plus, notamment pour un dépannage ou une réparation urgente, où le client veut une réponse rapide plutôt que de comparer plusieurs avis.",
      },
      {
        question: "Que se passe-t-il si Dopaguard détecte une erreur sur mes tarifs ou ma disponibilité ?",
        answer:
          "Vous recevez une alerte avec l'extrait exact de ce que l'IA a dit, la vérité attendue que vous avez validée, et une recommandation pour corriger la source.",
      },
      {
        question: "Combien de temps avant de voir un premier résultat ?",
        answer:
          "Le scan gratuit donne un résultat en quelques minutes. La surveillance hebdomadaire démarre dès la semaine suivant votre inscription.",
      },
    ],
    relatedArticleSlug: "ia-declare-entreprise-fermee-a-tort",
    metaTitle: "Surveillance réputation IA — Garages & automobile",
    metaDescription:
      "Découvrez gratuitement ce que ChatGPT, Claude et Perplexity disent de votre garage, et surveillez votre réputation dans les IA chaque semaine.",
    accent: "navy",
  },
  {
    slug: "veterinaires",
    label: "Vétérinaires",
    angle: "Que répond une IA quand un propriétaire cherche votre cabinet ?",
    heroHighlight: "une IA",
    heroKicker: "Scan gratuit · Vétérinaires",
    heroSubtitle:
      "Avant d'appeler, un propriétaire d'animal demande de plus en plus à une IA : « ce cabinet vétérinaire est-il ouvert le week-end ? », « accepte-t-il les urgences ? ». Quand l'IA répond à tort que le cabinet est fermé ou complet, l'appel qui aurait dû avoir lieu n'a jamais lieu.",
    painExamples: [
      {
        quote:
          "Ce cabinet vétérinaire ne semble plus prendre de nouveaux patients actuellement, selon les dernières informations disponibles.",
        highlight: "ne semble plus prendre de nouveaux patients",
        note: "Une IA a indiqué à tort qu'un cabinet en activité n'acceptait plus de nouveaux animaux, faute d'information récente.",
      },
      {
        quote: "Les horaires d'ouverture indiqués sont du lundi au vendredi, sans permanence le week-end.",
        highlight: "sans permanence le week-end",
        note: "Une IA a relayé des horaires obsolètes après un changement d'organisation du cabinet.",
      },
    ],
    faqItems: [
      {
        question: "Est-ce que Dopaguard analyse du contenu vétérinaire ou clinique ?",
        answer:
          "Non, jamais. Dopaguard se limite strictement aux informations pratiques et organisationnelles — horaires, adresse, coordonnées, disponibilité pour de nouveaux patients — jamais au contenu clinique.",
      },
      {
        question: "Ça concerne quels types de structures ?",
        answer:
          "Cabinets vétérinaires indépendants, cliniques, et plus largement toute structure dont des propriétaires d'animaux se renseignent en ligne avant de prendre contact.",
      },
      {
        question: "Que se passe-t-il si une IA affirme à tort que mon cabinet est fermé ou complet ?",
        answer:
          "Vous recevez une alerte avec l'extrait exact de ce que l'IA a dit, la vérité attendue que vous avez validée, et une recommandation pour corriger la source.",
      },
      {
        question: "Combien de temps avant de voir un premier résultat ?",
        answer:
          "Le scan gratuit donne un résultat en quelques minutes. La surveillance hebdomadaire démarre dès la semaine suivant votre inscription.",
      },
    ],
    relatedArticleSlug: "reputation-ia-cabinets-medicaux",
    metaTitle: "Surveillance réputation IA — Vétérinaires",
    metaDescription:
      "Découvrez gratuitement ce que ChatGPT, Claude et Perplexity disent de votre cabinet vétérinaire, et surveillez vos informations pratiques dans les IA chaque semaine.",
    accent: "lime",
  },
  {
    slug: "reseaux-franchises",
    label: "Réseaux & franchises multi-sites",
    angle: "Vos établissements disent-ils tous la même chose aux IA ?",
    heroHighlight: "les IA",
    heroKicker: "Scan gratuit · Réseaux & franchises multi-sites",
    heroSubtitle:
      "Chaque établissement d'un réseau a sa propre existence aux yeux d'une IA générative : un client qui demande « ce point de vente est-il ouvert ? » obtient une réponse propre à cette adresse, pas au réseau dans son ensemble. Un établissement mal représenté, ce sont des clients perdus sur ce site précis — sans que le siège ne s'en aperçoive, faute de vue d'ensemble.",
    painExamples: [
      {
        quote: "Ce point de vente du réseau semble avoir fermé, aucune activité récente n'est visible à cette adresse.",
        highlight: "semble avoir fermé",
        note: "Une IA a confondu un établissement du réseau avec un autre point de vente proche, ou n'a pas intégré une réouverture récente.",
      },
      {
        quote: "Les horaires de ce point de vente sont ceux du siège national, qui peuvent différer de l'agence locale.",
        highlight: "ceux du siège national",
        note: "Une IA a appliqué à un établissement précis une information valable pour le réseau dans son ensemble, sans distinguer les spécificités locales.",
      },
    ],
    faqItems: [
      {
        question: "Combien d'établissements Dopaguard peut-il surveiller à la fois ?",
        answer:
          "Jusqu'à 10 marques ou points de vente distincts avec la formule Agence, chacun avec sa propre fiche de vérité et son propre suivi hebdomadaire.",
      },
      {
        question: "Peut-on avoir des rapports en marque blanche pour chaque site ou client final ?",
        answer:
          "Oui, la formule Agence inclut des rapports en marque blanche — utile pour une centrale qui veut restituer un suivi propre à chaque franchisé ou point de vente.",
      },
      {
        question: "Un problème détecté sur un établissement remonte-t-il automatiquement aux autres ?",
        answer:
          "Non : chaque établissement est surveillé et alerté indépendamment, pour ne jamais masquer un problème local derrière une vue d'ensemble rassurante.",
      },
      {
        question: "Combien de temps avant de voir un premier résultat ?",
        answer:
          "Le scan gratuit donne un résultat en quelques minutes. La surveillance hebdomadaire démarre dès la semaine suivant votre inscription.",
      },
    ],
    relatedArticleSlug: "cout-mauvaise-reputation-ia-entreprise",
    metaTitle: "Surveillance réputation IA — Réseaux & franchises multi-sites",
    metaDescription:
      "Surveillez ce que ChatGPT, Claude et Perplexity disent de chacun de vos établissements, avec des rapports en marque blanche pour vos franchisés ou points de vente.",
    accent: "navy",
  },
];

export function getVerticalBySlug(slug: string): VerticalMeta | undefined {
  return VERTICALS.find((vertical) => vertical.slug === slug);
}
