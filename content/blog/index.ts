import type { ComponentType } from "react";
import ReputationIaGuideCompletTpePme from "./reputation-ia-guide-complet-tpe-pme";
import CommentSavoirCeQueChatgptDitDeVotreEntreprise from "./comment-savoir-ce-que-chatgpt-dit-de-votre-entreprise";
import CinqErreursIaGenerativesEntreprises from "./5-erreurs-ia-generatives-entreprises";
import PourquoiVerificationPonctuelleNeSuffitPas from "./pourquoi-verification-ponctuelle-ne-suffit-pas";
import ChatgptGeminiPerplexityComparatifEntreprises from "./chatgpt-gemini-perplexity-comparatif-entreprises";
import ReputationIaProfessionsLiberales from "./reputation-ia-professions-liberales";
import ReputationIaHotellerieRestauration from "./reputation-ia-hotellerie-restauration";
import ReputationIaCommerceEcommerce from "./reputation-ia-commerce-ecommerce";
import ReputationIaServicesEntreprises from "./reputation-ia-services-entreprises";
import ReputationIaAgencesImmobilieres from "./reputation-ia-agences-immobilieres";
import ReputationIaCabinetsMedicaux from "./reputation-ia-cabinets-medicaux";
import ChatgptInventeInformationsEntrepriseQueFaire from "./chatgpt-invente-informations-entreprise-que-faire";
import CorrigerErreurFactuelleIaEntreprise from "./corriger-erreur-factuelle-ia-entreprise";
import IaDeclareEntrepriseFermeeATort from "./ia-declare-entreprise-fermee-a-tort";
import ConcurrentRecommandeALaPlaceDeMonEntreprise from "./concurrent-recommande-a-la-place-de-mon-entreprise";
import FicheDeVeriteInformationsEntrepriseIa from "./fiche-de-verite-informations-entreprise-ia";
import ImportanceRapiditeAlerteReputationIa from "./importance-rapidite-alerte-reputation-ia";
import EReputationClassiqueVsReputationIaGenerative from "./e-reputation-classique-vs-reputation-ia-generative";
import CoutMauvaiseReputationIaEntreprise from "./cout-mauvaise-reputation-ia-entreprise";
import AuditerGratuitementReputationIa3Minutes from "./auditer-gratuitement-reputation-ia-3-minutes";

// Registre slug -> composant de contenu. Doit rester synchrone avec
// lib/blog/articles.ts (un slug de chaque côté) -- vérifié par un test simple à la
// construction (voir app/blog/[slug]/page.tsx, notFound() si l'un des deux manque).
export const ARTICLE_COMPONENTS: Record<string, ComponentType> = {
  "reputation-ia-guide-complet-tpe-pme": ReputationIaGuideCompletTpePme,
  "comment-savoir-ce-que-chatgpt-dit-de-votre-entreprise": CommentSavoirCeQueChatgptDitDeVotreEntreprise,
  "5-erreurs-ia-generatives-entreprises": CinqErreursIaGenerativesEntreprises,
  "pourquoi-verification-ponctuelle-ne-suffit-pas": PourquoiVerificationPonctuelleNeSuffitPas,
  "chatgpt-gemini-perplexity-comparatif-entreprises": ChatgptGeminiPerplexityComparatifEntreprises,
  "reputation-ia-professions-liberales": ReputationIaProfessionsLiberales,
  "reputation-ia-hotellerie-restauration": ReputationIaHotellerieRestauration,
  "reputation-ia-commerce-ecommerce": ReputationIaCommerceEcommerce,
  "reputation-ia-services-entreprises": ReputationIaServicesEntreprises,
  "reputation-ia-agences-immobilieres": ReputationIaAgencesImmobilieres,
  "reputation-ia-cabinets-medicaux": ReputationIaCabinetsMedicaux,
  "chatgpt-invente-informations-entreprise-que-faire": ChatgptInventeInformationsEntrepriseQueFaire,
  "corriger-erreur-factuelle-ia-entreprise": CorrigerErreurFactuelleIaEntreprise,
  "ia-declare-entreprise-fermee-a-tort": IaDeclareEntrepriseFermeeATort,
  "concurrent-recommande-a-la-place-de-mon-entreprise": ConcurrentRecommandeALaPlaceDeMonEntreprise,
  "fiche-de-verite-informations-entreprise-ia": FicheDeVeriteInformationsEntrepriseIa,
  "importance-rapidite-alerte-reputation-ia": ImportanceRapiditeAlerteReputationIa,
  "e-reputation-classique-vs-reputation-ia-generative": EReputationClassiqueVsReputationIaGenerative,
  "cout-mauvaise-reputation-ia-entreprise": CoutMauvaiseReputationIaEntreprise,
  "auditer-gratuitement-reputation-ia-3-minutes": AuditerGratuitementReputationIa3Minutes,
};
