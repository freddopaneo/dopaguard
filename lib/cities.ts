export interface CityMeta {
  slug: string;
  name: string;
  /** Ancrage factuel court, jamais de statistique chiffrée inventée. */
  identity: string;
}

// Registre des 20 plus grandes villes de France (par population), utilisé par les
// pages géographiques secteur x ville (app/secteurs/[slug]/[ville]/page.tsx) et par
// lib/city-verticals.ts pour construire le paragraphe local de chaque combinaison.
export const CITIES: CityMeta[] = [
  { slug: "paris", name: "Paris", identity: "capitale, premier bassin économique et touristique du pays" },
  { slug: "marseille", name: "Marseille", identity: "port historique de la Méditerranée, deuxième ville de France" },
  { slug: "lyon", name: "Lyon", identity: "capitale gastronomique, forte activité affaires et congrès" },
  { slug: "toulouse", name: "Toulouse", identity: "pôle aéronautique et spatial, ville étudiante" },
  { slug: "nice", name: "Nice", identity: "première destination touristique de la Côte d'Azur" },
  { slug: "nantes", name: "Nantes", identity: "métropole de l'ouest, forte croissance démographique et économique" },
  { slug: "montpellier", name: "Montpellier", identity: "ville étudiante du sud, pôle santé et numérique" },
  { slug: "strasbourg", name: "Strasbourg", identity: "siège d'institutions européennes, ville transfrontalière" },
  { slug: "bordeaux", name: "Bordeaux", identity: "capitale mondiale du vin, tourisme et affaires" },
  { slug: "lille", name: "Lille", identity: "carrefour logistique du nord, proximité Belgique et Royaume-Uni" },
  { slug: "rennes", name: "Rennes", identity: "capitale de la Bretagne, pôle numérique et étudiant" },
  { slug: "reims", name: "Reims", identity: "capitale historique du Champagne, tourisme viticole" },
  { slug: "le-havre", name: "Le Havre", identity: "premier port de conteneurs français pour le commerce extérieur" },
  { slug: "saint-etienne", name: "Saint-Étienne", identity: "ancien bassin industriel, ville de design et de commerce de proximité" },
  { slug: "toulon", name: "Toulon", identity: "grand port militaire et de plaisance, tourisme balnéaire" },
  { slug: "grenoble", name: "Grenoble", identity: "pôle de recherche et d'innovation, tourisme de montagne et d'affaires" },
  { slug: "dijon", name: "Dijon", identity: "capitale de la Bourgogne, tourisme gastronomique et viticole" },
  { slug: "angers", name: "Angers", identity: "ville étudiante du Val de Loire, tourisme patrimonial" },
  { slug: "nimes", name: "Nîmes", identity: "patrimoine antique, porte d'entrée du sud méditerranéen" },
  { slug: "villeurbanne", name: "Villeurbanne", identity: "ville la plus peuplée de la métropole lyonnaise après Lyon" },
];

export function getCityBySlug(slug: string): CityMeta | undefined {
  return CITIES.find((city) => city.slug === slug);
}
