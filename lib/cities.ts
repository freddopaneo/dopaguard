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

  // Deuxième lot : villes et stations à forte densité hôtelière et de restauration
  // (tourisme balnéaire, montagne, patrimoine, congrès), au-delà des 20 plus grandes
  // villes de France par population deja couvertes ci-dessus.
  { slug: "cannes", name: "Cannes", identity: "ville de festivals et de congrès, forte densité hôtelière haut de gamme sur la Croisette" },
  { slug: "antibes", name: "Antibes", identity: "station balnéaire de la Côte d'Azur, ports de plaisance et tourisme estival" },
  { slug: "saint-tropez", name: "Saint-Tropez", identity: "village de la Côte d'Azur devenu haut lieu du tourisme de luxe, très forte densité de restaurants et d'hôtels" },
  { slug: "biarritz", name: "Biarritz", identity: "station balnéaire historique du Pays basque, spot de surf réputé et ville de congrès" },
  { slug: "deauville", name: "Deauville", identity: "station balnéaire normande, festival du cinéma américain, hippodrome et casino" },
  { slug: "arcachon", name: "Arcachon", identity: "station balnéaire du bassin d'Arcachon, tourisme ostréicole et balnéaire" },
  { slug: "saint-malo", name: "Saint-Malo", identity: "cité corsaire fortifiée, tourisme patrimonial et liaisons ferries vers les îles anglo-normandes" },
  { slug: "annecy", name: "Annecy", identity: "ville au bord de son lac alpin, tourisme quatre saisons entre lac et montagne" },
  { slug: "chamonix-mont-blanc", name: "Chamonix-Mont-Blanc", identity: "capitale historique de l'alpinisme, tourisme de montagne toute l'année" },
  { slug: "avignon", name: "Avignon", identity: "cité des papes, l'un des plus grands festivals de théâtre d'Europe" },
  { slug: "aix-en-provence", name: "Aix-en-Provence", identity: "ville d'art et de festival, tourisme et gastronomie provençale" },
  { slug: "carcassonne", name: "Carcassonne", identity: "cité médiévale fortifiée classée à l'UNESCO, forte affluence touristique" },
  { slug: "colmar", name: "Colmar", identity: "capitale du vignoble alsacien, tourisme patrimonial et route des vins" },
  { slug: "ajaccio", name: "Ajaccio", identity: "préfecture de la Corse-du-Sud, tourisme insulaire et liaisons maritimes et aériennes" },
  { slug: "bayonne", name: "Bayonne", identity: "cœur du Pays basque, gastronomie et fêtes traditionnelles reconnues" },
  { slug: "pau", name: "Pau", identity: "porte des Pyrénées, tourisme de montagne et ville de congrès" },
  { slug: "chambery", name: "Chambéry", identity: "préfecture de la Savoie, tourisme de montagne et carrefour alpin" },
  { slug: "metz", name: "Metz", identity: "patrimoine architectural et pôle de congrès du Grand Est" },
  { slug: "nancy", name: "Nancy", identity: "capitale historique de la Lorraine, patrimoine Art nouveau" },
  { slug: "caen", name: "Caen", identity: "porte d'entrée de la Normandie, tourisme mémoriel et patrimonial" },
  { slug: "amiens", name: "Amiens", identity: "ville de la cathédrale gothique classée à l'UNESCO, tourisme patrimonial de Picardie" },
  { slug: "tours", name: "Tours", identity: "porte d'entrée du Val de Loire et de ses châteaux, tourisme patrimonial" },
  { slug: "perpignan", name: "Perpignan", identity: "porte de la Catalogne française, tourisme entre mer et montagne" },
  { slug: "clermont-ferrand", name: "Clermont-Ferrand", identity: "ville de congrès au pied des volcans d'Auvergne, tourisme nature" },
  { slug: "besancon", name: "Besançon", identity: "citadelle classée à l'UNESCO, tourisme patrimonial de Franche-Comté" },
];

export function getCityBySlug(slug: string): CityMeta | undefined {
  return CITIES.find((city) => city.slug === slug);
}
