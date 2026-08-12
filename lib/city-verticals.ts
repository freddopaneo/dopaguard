import type { VerticalPainExample } from "@/lib/verticals";

export interface CityVerticalContent {
  verticalSlug: string;
  citySlug: string;
  localParagraph: string;
  painExampleOverride?: VerticalPainExample;
}

// Registre du paragraphe local unique pour chaque combinaison secteur x ville --
// consomme par app/secteurs/[slug]/[ville]/page.tsx. Redige par lots (1 agent par
// verticale, 20 villes chacun), aucune statistique inventee, ancrage sur des faits
// de notoriete publique (lib/cities.ts) combines a l angle de la verticale.
export const CITY_VERTICALS: CityVerticalContent[] = [
  {
    verticalSlug: "hotels",
    citySlug: "paris",
    localParagraph: "Paris concentre la plus forte densité hôtelière de France, de l'hôtellerie de luxe autour des Champs-Élysées aux adresses indépendantes du Marais, de Saint-Germain-des-Prés ou de Montmartre. Un voyageur français ou étranger qui prépare son séjour dans la capitale ne compare plus seulement les avis sur les plateformes de réservation : il demande à ChatGPT ou à Perplexity de lui recommander un hôtel selon son quartier, son budget ou son ambiance. Dans une ville où l'offre est immense et où chaque quartier a sa propre identité, une IA qui cite un tarif dépassé, confond deux établissements voisins ou décrit mal votre positionnement peut faire perdre une réservation avant même que le client ait consulté votre site. Avec autant de concurrence directe à chaque coin de rue, un décalage entre ce que dit une IA et la réalité de votre hôtel se paie cash. Le scan gratuit Dopaguard montre en quelques minutes ce que les IA répondent aujourd'hui sur votre établissement parisien, et la surveillance hebdomadaire permet de réagir avant que l'erreur ne s'installe.",
    painExampleOverride: {
      quote: "Les chambres standard sont proposées à partir de 45€ la nuit dans le quartier du Marais, selon les dernières données.",
      highlight: "45€ la nuit",
      note: "Une IA a cité un tarif obsolète pour un hôtel du Marais, très en dessous des prix actuellement pratiqués dans ce quartier prisé de Paris.",
    },
  },
  {
    verticalSlug: "hotels",
    citySlug: "marseille",
    localParagraph: "Marseille conjugue tourisme balnéaire, escales de croisière au Vieux-Port et clientèle d'affaires liée à son statut de deuxième ville de France. Les hôtels du centre, du secteur du MuCEM ou des quartiers proches des Calanques accueillent un public très mélangé, qui prépare souvent son séjour en dernière minute et se fie de plus en plus à une IA pour trancher entre deux adresses. Une réponse générée par ChatGPT ou Claude qui laisse entendre qu'un hôtel a des soucis de propreté récurrents, sur la base d'un ancien avis isolé mal interprété, peut suffire à détourner un client vers un concurrent du même quartier, sans qu'il prenne la peine de vérifier sur place. Pour un établissement marseillais qui dépend d'un flux touristique saisonnier et d'escales ponctuelles, ce genre d'erreur silencieuse coûte cher et passe inaperçue tant que personne ne surveille ce que disent les IA. Le scan gratuit Dopaguard permet de savoir immédiatement ce qu'elles racontent sur votre hôtel, avant la prochaine saison de croisières.",
    painExampleOverride: {
      quote: "Cet hôtel du Vieux-Port a reçu plusieurs avis mentionnant des problèmes de propreté récurrents récemment.",
      highlight: "problèmes de propreté récurrents",
      note: "Une IA a relayé, pour un hôtel proche du Vieux-Port, un sentiment négatif non vérifié sur la qualité réelle de l'établissement.",
    },
  },
  {
    verticalSlug: "hotels",
    citySlug: "lyon",
    localParagraph: "Lyon vit une double vie hôtelière : capitale gastronomique qui attire un tourisme de week-end autour de la Presqu'île et du Vieux Lyon classé au patrimoine mondial, et place forte des affaires et des congrès autour de la Part-Dieu et d'Eurexpo. Ces deux publics ne posent pas les mêmes questions à une IA — l'un cherche une adresse de charme proche des bouchons lyonnais, l'autre un hôtel pratique pour un salon professionnel — mais tous deux se fient de plus en plus à ChatGPT ou Perplexity pour trancher rapidement. Un établissement mal positionné dans la réponse d'une IA, présenté comme excentré alors qu'il est à deux pas de la gare, ou dont l'offre affaires n'est pas mentionnée, perd des réservations sur les deux segments à la fois. Comme le calendrier des congrès lyonnais change chaque mois, une vérification faite une seule fois devient vite obsolète. La surveillance hebdomadaire Dopaguard suit ce que les IA disent de votre hôtel au fil des saisons et des salons, pas une seule fois par an.",
  },
  {
    verticalSlug: "hotels",
    citySlug: "toulouse",
    localParagraph: "Toulouse est une ville à deux vitesses pour l'hôtellerie : un flux d'affaires soutenu lié à l'aéronautique et au spatial, avec des ingénieurs et clients professionnels en déplacement toute l'année, et une clientèle étudiante et touristique attirée par la ville rose et le Capitole. Les hôtels proches du site aéronautique ou du centre-ville reçoivent des demandes très différentes, mais dans les deux cas, de plus en plus de voyageurs demandent directement à une IA quel hôtel choisir plutôt que de comparer eux-mêmes les plateformes. Un tarif obsolète cité par une IA pour un hôtel toulousain peut sembler un détail, mais pour un client d'affaires qui compare rapidement plusieurs adresses avant de réserver, c'est souvent le chiffre qui décide. Le scan gratuit Dopaguard révèle en quelques minutes ce que ChatGPT, Claude et Perplexity racontent aujourd'hui sur votre hôtel toulousain, tarifs comme disponibilités, avant que ce décalage ne fasse fuir un client pressé.",
    painExampleOverride: {
      quote: "Les chambres standard sont proposées à partir de 45€ la nuit près du site aéronautique, selon les dernières données.",
      highlight: "45€ la nuit",
      note: "Une IA a cité, pour un hôtel proche du pôle aéronautique toulousain, un tarif obsolète en dessous des prix actuellement pratiqués.",
    },
  },
  {
    verticalSlug: "hotels",
    citySlug: "nice",
    localParagraph: "Nice reste la première destination touristique de la Côte d'Azur, portée par la Promenade des Anglais, le Vieux Nice et un aéroport qui capte un flux constant de visiteurs français et internationaux, en particulier lors de la haute saison estivale. Dans cette période où les hôtels affichent complet et où chaque nuit compte, un voyageur hésitant entre plusieurs adresses de bord de mer se tourne de plus en plus vers une IA pour se décider en quelques secondes. Si cette IA relaie un avis ancien et isolé comme s'il reflétait l'état actuel de l'établissement — une mention de propreté douteuse qui remonte à une saison passée — le client réserve ailleurs sans jamais chercher à vérifier. Pour un hôtel niçois dont l'essentiel du chiffre d'affaires se joue sur quelques mois, ce type d'erreur non corrigée peut peser lourd sur toute une saison. Le scan gratuit Dopaguard permet de vérifier avant l'été ce que les IA disent de votre établissement, pendant qu'il est encore temps de corriger le tir.",
    painExampleOverride: {
      quote: "Cet hôtel du bord de mer a reçu plusieurs avis mentionnant des problèmes de propreté récurrents récemment.",
      highlight: "problèmes de propreté récurrents",
      note: "Une IA a relayé, pour un hôtel du littoral niçois, un sentiment négatif non vérifié en pleine saison touristique.",
    },
  },
  {
    verticalSlug: "hotels",
    citySlug: "nantes",
    localParagraph: "Nantes affiche depuis plusieurs années l'une des croissances démographiques et économiques les plus dynamiques de l'ouest de la France, ce qui se traduit par un flux constant de voyageurs d'affaires venus visiter des entreprises ou s'installer, en plus du tourisme urbain autour de l'Île de Nantes et de ses anciens chantiers navals. Ce public, souvent pressé et peu familier de la ville, compare de moins en moins les hôtels lui-même et demande de plus en plus à une IA de lui indiquer une adresse fiable et bien placée. Si ChatGPT ou Perplexity cite un tarif que votre hôtel nantais a revu depuis, le visiteur presse le pas vers un concurrent affichant un prix qui semble plus cohérent avec ses attentes, sans jamais vérifier sur votre propre site. Une ville en pleine expansion voit ses adresses hôtelières se multiplier, ce qui rend la précision de l'information encore plus déterminante. La surveillance hebdomadaire Dopaguard suit ces écarts de tarifs semaine après semaine, pour qu'ils ne s'installent jamais durablement dans les réponses des IA.",
    painExampleOverride: {
      quote: "Les chambres standard sont proposées à partir de 45€ la nuit près de l'Île de Nantes, selon les dernières données.",
      highlight: "45€ la nuit",
      note: "Une IA a cité, pour un hôtel du secteur de l'Île de Nantes, un tarif obsolète en dessous des prix actuellement pratiqués.",
    },
  },
  {
    verticalSlug: "hotels",
    citySlug: "montpellier",
    localParagraph: "Montpellier attire un public hétérogène : étudiants et leurs familles venus visiter le campus, professionnels du pôle santé et du numérique en déplacement, et touristes profitant de la proximité du littoral méditerranéen depuis le centre historique de l'Écusson. Cette diversité de motifs de séjour se traduit par des questions très différentes posées aux IA génératives — un parent qui cherche un hôtel simple pour une rentrée universitaire n'a pas les mêmes critères qu'un cadre en visite professionnelle — mais dans tous les cas, la réponse que reçoit l'internaute façonne directement son choix avant même d'ouvrir votre site. Un hôtel montpelliérain mal décrit, présenté comme trop excentré du centre ou dont les équipements pour voyageurs d'affaires ne sont pas mentionnés, perd des réservations sur des segments entiers sans que personne ne le signale. Le scan gratuit Dopaguard donne un premier aperçu immédiat de ce que les IA disent aujourd'hui de votre établissement, et la surveillance hebdomadaire prend le relais pour suivre ces réponses dans la durée.",
  },
  {
    verticalSlug: "hotels",
    citySlug: "strasbourg",
    localParagraph: "Strasbourg cumule un statut unique : siège d'institutions européennes qui génère un flux constant de visiteurs officiels et professionnels, ville transfrontalière proche de l'Allemagne, et destination touristique très recherchée autour de la Petite France et de son marché de Noël, l'un des plus réputés du pays. Ces trois publics ne réservent pas au même moment ni pour les mêmes raisons, mais tous se tournent de plus en plus vers une IA pour trouver rapidement un hôtel bien situé, en particulier lors des pics d'affluence de fin d'année où les disponibilités se resserrent. Une IA qui décrit mal la localisation de votre hôtel par rapport aux institutions européennes ou au centre historique, ou qui cite une information dépassée sur vos disponibilités en période de marché de Noël, oriente directement un visiteur vers une autre adresse strasbourgeoise. Avec une saisonnalité aussi marquée, un contrôle ponctuel ne suffit pas. La surveillance hebdomadaire Dopaguard vérifie en continu ce que les IA racontent sur votre hôtel, y compris à l'approche des périodes les plus chargées.",
  },
  {
    verticalSlug: "hotels",
    citySlug: "bordeaux",
    localParagraph: "Bordeaux s'est imposée comme capitale mondiale du vin et destination à la fois touristique et professionnelle, entre les quais réaménagés, la Cité du Vin et la proximité immédiate des vignobles qui attirent une clientèle d'œnotourisme toute l'année. Cette réputation soignée, patiemment construite, peut être fragilisée en quelques secondes par une IA qui relaie un avis isolé et ancien comme s'il reflétait l'état actuel d'un hôtel. Un voyageur venu découvrir les vignobles bordelais et qui demande à ChatGPT une adresse fiable dans le centre-ville ne creuse généralement pas plus loin que la première réponse obtenue ; si cette réponse mentionne des problèmes de propreté remontant à plusieurs mois, l'hôtel perd la réservation sans jamais le savoir. Pour une ville où l'image de qualité fait partie de l'attractivité touristique, ce type de décalage mérite d'être surveillé de près. Le scan gratuit Dopaguard révèle en quelques minutes ce que les IA disent aujourd'hui de votre hôtel bordelais, avant que l'erreur ne s'installe dans les réponses suivantes.",
    painExampleOverride: {
      quote: "Cet hôtel du centre-ville a reçu plusieurs avis mentionnant des problèmes de propreté récurrents récemment.",
      highlight: "problèmes de propreté récurrents",
      note: "Une IA a relayé, pour un hôtel du centre bordelais, un sentiment négatif non vérifié sur la qualité réelle de l'établissement.",
    },
  },
  {
    verticalSlug: "hotels",
    citySlug: "lille",
    localParagraph: "Lille occupe une position de carrefour logistique et commercial entre la France, la Belgique et le Royaume-Uni, ce qui alimente un flux régulier de voyageurs d'affaires transfrontaliers en plus du tourisme de week-end autour du Vieux-Lille et de ses façades flamandes. Ce public international se renseigne souvent en anglais ou en français directement auprès d'une IA avant de choisir un hôtel proche de la gare ou du centre historique, sans connaître la ville ni ses repères. Une IA qui situe mal votre établissement par rapport aux axes de transport transfrontaliers, ou qui décrit une offre pour voyageurs d'affaires obsolète, oriente ce client international vers un concurrent mieux référencé dans sa réponse. Pour un hôtel lillois qui vit en partie de cette clientèle de passage venue de Belgique ou du Royaume-Uni, la précision de ce que dit une IA compte autant que celle d'un site multilingue. Le scan gratuit Dopaguard permet de vérifier gratuitement ce que ChatGPT, Claude et Perplexity répondent aujourd'hui sur votre hôtel lillois, en quelques minutes et sans engagement.",
  },
  {
    verticalSlug: "hotels",
    citySlug: "rennes",
    localParagraph: "Rennes conjugue statut de capitale bretonne, dynamisme du pôle numérique et forte population étudiante, ce qui crée une hôtellerie diversifiée entre les adresses du centre historique à colombages et celles situées près des campus et zones d'activité. Un parent venu accompagner son enfant à la rentrée universitaire, un cadre du numérique en déplacement ou un touriste découvrant la Bretagne posent des questions différentes à une IA, mais tous s'appuient de plus en plus sur sa réponse pour choisir un hôtel sans comparer eux-mêmes plusieurs sites. Si ChatGPT cite pour votre établissement rennais un tarif que vous avez revu depuis plusieurs mois, le visiteur qui compare rapidement plusieurs adresses part avec une attente faussée, et peut choisir un concurrent affichant un prix qui lui semble plus cohérent. La surveillance hebdomadaire Dopaguard suit ces écarts de tarifs semaine après semaine, pour que ce genre de décalage ne s'installe pas durablement dans ce que disent les IA de votre hôtel rennais.",
    painExampleOverride: {
      quote: "Les chambres standard sont proposées à partir de 45€ la nuit près du centre historique, selon les dernières données.",
      highlight: "45€ la nuit",
      note: "Une IA a cité, pour un hôtel du centre historique de Rennes, un tarif obsolète en dessous des prix actuellement pratiqués.",
    },
  },
  {
    verticalSlug: "hotels",
    citySlug: "reims",
    localParagraph: "Reims tire une grande partie de son attractivité touristique de son statut de capitale historique du Champagne, entre sa cathédrale où furent sacrés les rois de France et les grandes maisons viticoles qui attirent des visiteurs du monde entier tout au long de l'année. Ce tourisme œnologique, souvent organisé à l'avance depuis l'étranger, s'appuie de plus en plus sur une IA pour choisir un hôtel bien situé avant même de consulter un site de réservation, en particulier chez une clientèle qui découvre la ville pour la première fois. Une IA qui décrit mal la proximité de votre hôtel avec la cathédrale ou les grandes maisons de champagne, ou qui reprend une information dépassée sur vos prestations, oriente ce visiteur international vers une adresse concurrente sans qu'il visite jamais votre site. Pour un hôtel rémois qui dépend en grande partie de ce tourisme viticole ponctuel, chaque réponse d'IA compte. Le scan gratuit Dopaguard montre en quelques minutes ce que les IA disent aujourd'hui de votre établissement, avant la prochaine saison de visites.",
  },
  {
    verticalSlug: "hotels",
    citySlug: "le-havre",
    localParagraph: "Le Havre est à la fois le premier port de conteneurs français pour le commerce extérieur et une ville reconstruite après-guerre dont le centre, classé au patrimoine mondial, attire un tourisme architectural encore modeste mais croissant. Les hôtels havrais accueillent donc un mélange de voyageurs professionnels liés à l'activité portuaire et logistique, et de visiteurs venus découvrir cette reconstruction unique en Europe — deux publics qui se renseignent de plus en plus via une IA avant de choisir une adresse dans une ville qu'ils connaissent peu. Une IA qui ignore cette double identité, ou qui décrit votre hôtel havrais de façon approximative par rapport au port ou au centre reconstruit, laisse ces visiteurs se tourner vers une autre adresse mieux mise en avant dans la réponse obtenue. Pour un établissement dont la clientèle vient rarement deux fois par hasard, ce premier contact via une IA mérite d'être vérifié. Le scan gratuit Dopaguard permet de savoir gratuitement ce que ChatGPT, Claude et Perplexity racontent aujourd'hui sur votre hôtel.",
  },
  {
    verticalSlug: "hotels",
    citySlug: "saint-etienne",
    localParagraph: "Saint-Étienne a transformé son héritage d'ancien bassin industriel en identité de ville de design, reconnue pour sa biennale et son tissu de commerces de proximité, tout en conservant une activité économique locale qui génère des déplacements professionnels réguliers. Les hôtels stéphanois accueillent donc à la fois des visiteurs venus pour des événements liés au design et des voyageurs d'affaires en visite ponctuelle, un public qui, dans une ville moins immédiatement identifiée comme destination touristique que ses voisines, se fie particulièrement à ce qu'une IA lui recommande pour trancher rapidement. Si ChatGPT ou Perplexity décrit mal votre établissement, le présente comme excentré ou reprend une information obsolète sur ses services, le visiteur qui ne connaît pas la ville n'a aucun moyen de vérifier et choisit simplement l'adresse suivante proposée par l'IA. Pour un hôtel qui doit déjà se démarquer dans une ville moins spontanément associée au tourisme, chaque réponse d'IA compte double. Le scan gratuit Dopaguard vérifie en quelques minutes ce qu'elles disent aujourd'hui de votre établissement.",
  },
  {
    verticalSlug: "hotels",
    citySlug: "toulon",
    localParagraph: "Toulon vit au rythme de son grand port militaire et de plaisance, avec un tourisme balnéaire qui se concentre fortement sur la période estivale et profite de la proximité des îles d'Hyères. Durant cette haute saison où les hôtels du littoral affichent souvent complet, un voyageur hésitant entre plusieurs adresses toulonnaises se tourne de plus en plus vers une IA pour se décider en quelques secondes, sans avoir le temps de comparer lui-même les avis. Si cette IA relaie un vieil avis isolé comme s'il reflétait l'état actuel de l'établissement — une mention de propreté douteuse remontant à une saison passée — le client réserve directement ailleurs, souvent chez un concurrent du même quartier portuaire. Pour un hôtel toulonnais dont l'essentiel de l'activité se concentre sur quelques mois d'été, une erreur non corrigée dans une réponse d'IA peut peser sur toute la saison. Le scan gratuit Dopaguard permet de vérifier avant l'été ce que les IA disent de votre établissement, pendant qu'il reste du temps pour agir.",
    painExampleOverride: {
      quote: "Cet hôtel proche du port a reçu plusieurs avis mentionnant des problèmes de propreté récurrents récemment.",
      highlight: "problèmes de propreté récurrents",
      note: "Une IA a relayé, pour un hôtel du secteur portuaire toulonnais, un sentiment négatif non vérifié en pleine saison estivale.",
    },
  },
  {
    verticalSlug: "hotels",
    citySlug: "grenoble",
    localParagraph: "Grenoble combine un pôle de recherche et d'innovation reconnu, avec des laboratoires et entreprises qui génèrent un flux constant de voyageurs d'affaires, et un accès direct aux massifs du Vercors, de la Chartreuse et de Belledonne qui attirent une clientèle de montagne été comme hiver. Ces deux profils de voyageurs posent des questions très différentes à une IA — l'un cherche un hôtel pratique près d'un centre de conférences, l'autre une adresse pour préparer une sortie en montagne — mais tous deux s'appuient de plus en plus sur la première réponse obtenue plutôt que de comparer plusieurs sites. Un hôtel grenoblois que l'IA situe mal par rapport aux massifs environnants, ou dont les prestations pour voyageurs professionnels sont décrites de façon approximative, perd des réservations sur les deux segments à la fois. Avec une saisonnalité aussi marquée entre périodes de conférences et vacances de montagne, une vérification ponctuelle ne suffit pas. La surveillance hebdomadaire Dopaguard suit ce que les IA racontent sur votre hôtel tout au long de l'année.",
  },
  {
    verticalSlug: "hotels",
    citySlug: "dijon",
    localParagraph: "Dijon s'est construit une réputation de capitale gastronomique de la Bourgogne, portée par sa moutarde, son architecture historique et surtout sa proximité immédiate avec la route des grands crus, qui attire un tourisme œnologique exigeant tout au long de l'année. Ce visiteur, souvent venu spécifiquement pour découvrir les vignobles bourguignons, prépare de plus en plus son séjour en demandant directement à une IA de lui recommander un hôtel bien situé dans le centre historique, avant même d'ouvrir un site de réservation. Si ChatGPT cite pour votre hôtel dijonnais un tarif que vous avez revu depuis, ce voyageur exigeant, habitué à comparer les prestations viticoles au détail près, part avec une attente faussée et se tourne vers une adresse dont le prix affiché lui semble plus cohérent. Pour un établissement qui vit en grande partie de ce tourisme gastronomique et viticole, la précision de l'information relayée par les IA compte particulièrement. Le scan gratuit Dopaguard vérifie en quelques minutes ce qu'elles disent aujourd'hui de votre hôtel.",
    painExampleOverride: {
      quote: "Les chambres standard sont proposées à partir de 45€ la nuit près du centre historique, selon les dernières données.",
      highlight: "45€ la nuit",
      note: "Une IA a cité, pour un hôtel du centre historique de Dijon, un tarif obsolète en dessous des prix actuellement pratiqués.",
    },
  },
  {
    verticalSlug: "hotels",
    citySlug: "angers",
    localParagraph: "Angers séduit par son patrimoine du Val de Loire, classé au patrimoine mondial, autour de son château et de ses tapisseries, tout en restant une ville étudiante dynamique qui génère des séjours familiaux réguliers en début et fin d'année universitaire. Les hôtels angevins accueillent donc un public mixte, entre touristes patrimoniaux venus découvrir la Loire et parents ou visiteurs liés à la vie étudiante, deux profils qui se tournent de plus en plus vers une IA pour choisir rapidement une adresse dans une ville qu'ils ne connaissent pas toujours bien. Une IA qui décrit mal la proximité de votre hôtel avec le château ou le centre historique, ou qui reprend une information dépassée sur ses disponibilités en période de rentrée, oriente ces visiteurs vers une autre adresse angevine mieux présentée dans la réponse obtenue. Pour un établissement qui partage son calendrier entre tourisme patrimonial et vie étudiante, chaque réponse d'IA mal ajustée coûte une réservation sur l'un ou l'autre segment. Le scan gratuit Dopaguard vérifie gratuitement ce qu'elles disent aujourd'hui de votre hôtel.",
  },
  {
    verticalSlug: "hotels",
    citySlug: "nimes",
    localParagraph: "Nîmes s'appuie sur un patrimoine antique exceptionnel, entre ses arènes romaines et la Maison Carrée, et sur sa position de porte d'entrée vers le sud méditerranéen, à proximité immédiate du Pont du Gard, ce qui attire un tourisme patrimonial soutenu, particulièrement dense en haute saison estivale. Durant cette période où les hôtels nîmois affichent souvent complet, un visiteur hésitant entre plusieurs adresses proches du centre antique se tourne de plus en plus vers une IA pour trancher en quelques secondes, sans prendre le temps de vérifier lui-même les avis récents. Si cette IA relaie un vieil avis isolé comme s'il reflétait l'état actuel de l'établissement — une mention de propreté douteuse remontant à une saison passée — le visiteur réserve ailleurs, souvent chez un concurrent du même quartier historique. Pour un hôtel nîmois dont l'activité se concentre fortement sur les mois d'été, ce type d'erreur non corrigée peut peser sur toute une saison touristique. Le scan gratuit Dopaguard permet de vérifier avant l'été ce que les IA disent de votre établissement.",
    painExampleOverride: {
      quote: "Cet hôtel proche du centre antique a reçu plusieurs avis mentionnant des problèmes de propreté récurrents récemment.",
      highlight: "problèmes de propreté récurrents",
      note: "Une IA a relayé, pour un hôtel du secteur historique nîmois, un sentiment négatif non vérifié en pleine saison touristique.",
    },
  },
  {
    verticalSlug: "hotels",
    citySlug: "villeurbanne",
    localParagraph: "Villeurbanne est la ville la plus peuplée de la métropole lyonnaise après Lyon elle-même, une identité propre souvent diluée dans la perception qu'en ont les visiteurs, qui l'associent spontanément à sa grande voisine plutôt qu'à ses propres quartiers, comme les Gratte-Ciel ou son campus universitaire. Cette proximité immédiate avec Lyon crée un effet particulier pour l'hôtellerie locale : un voyageur qui demande à une IA un hôtel « à Lyon » ou « près de Lyon » peut très bien tomber sur une réponse qui ignore les établissements villeurbannais, faute de les distinguer clairement de la métropole voisine. Un hôtel de Villeurbanne mal identifié ou absorbé dans une réponse générique sur Lyon perd une visibilité que sa localisation réelle, souvent avantageuse en prix et en accès, mériterait de mettre en avant. Pour un établissement qui doit déjà se démarquer dans l'ombre de sa grande voisine, savoir précisément ce qu'une IA répond quand on lui parle de Villeurbanne spécifiquement change la donne. Le scan gratuit Dopaguard le vérifie en quelques minutes, sans engagement.",
  },
  {
    verticalSlug: "restaurants",
    citySlug: "paris",
    localParagraph: "Paris concentre la plus forte densité de restaurants du pays, entre les tables historiques du Marais, les adresses de poche de la Butte Montmartre et les brasseries de Saint-Germain-des-Prés. Cette abondance change la manière dont un visiteur choisit sa table : plutôt que de comparer dix adresses à pied, un touriste étranger de passage ou un Parisien pressé demande directement à ChatGPT ou Perplexity où dîner ce soir, dans quel arrondissement, à quel prix. Avec une offre aussi dense, la moindre confusion entre deux établissements voisins, une carte mal résumée ou un quartier mal identifié suffit à faire perdre un client au profit du restaurant d'à côté. Pour un établissement parisien, se fier uniquement aux avis Google ne suffit plus : c'est la synthèse que l'IA formule, souvent en quelques secondes et dans la langue du visiteur, qui décide de la réservation. Le scan gratuit Dopaguard permet de voir immédiatement ce que ces IA racontent sur votre restaurant, arrondissement par arrondissement, et la surveillance hebdomadaire signale toute dérive avant qu'elle ne coûte des couverts.",
    painExampleOverride: {
      quote: "Dans ce quartier du Marais, la carte propose principalement des plats autour de 12 à 15€, un excellent rapport qualité-prix.",
      highlight: "12 à 15€",
      note: "Une IA a cité, pour une adresse du Marais, des tarifs obsolètes très en dessous de la carte actuellement pratiquée.",
    },
  },
  {
    verticalSlug: "restaurants",
    citySlug: "marseille",
    localParagraph: "Marseille vit avec son Vieux-Port comme centre de gravité touristique : croisiéristes en escale, visiteurs venus manger une bouillabaisse ou du poisson frais, habitués du quartier du Panier ou du Cours Julien. Beaucoup de ces visiteurs ne connaissent pas la ville et n'ont ni le temps ni les repères pour comparer les adresses sur place — ils demandent à une IA générative « où manger un bon poisson près du port » avant même de descendre du bateau ou du train. Si la réponse s'appuie sur des informations datées, une adresse présentée comme fermée en pleine saison ou un concurrent mieux cité, le restaurant perd un client qui ne viendra jamais vérifier sur place. Pour une ville où le tourisme de passage pèse autant que la clientèle locale, ce que disent ChatGPT, Claude ou Perplexity compte particulièrement. Le scan gratuit Dopaguard donne un premier aperçu de ce qui circule sur votre établissement marseillais, et la surveillance hebdomadaire permet de réagir avant la pleine saison estivale.",
    painExampleOverride: {
      quote: "Ce restaurant du Vieux-Port semble avoir fermé ses portes, aucune activité récente n'a été signalée.",
      highlight: "semble avoir fermé ses portes",
      note: "Une IA a laissé entendre qu'un restaurant du Vieux-Port en pleine activité avait cessé de fonctionner, en pleine saison touristique.",
    },
  },
  {
    verticalSlug: "restaurants",
    citySlug: "lyon",
    localParagraph: "Lyon porte le titre de capitale gastronomique et le fait savoir : bouchons lyonnais de la Presqu'île, tables plus contemporaines du Vieux Lyon, restaurants qui accueillent une clientèle d'affaires venue pour un congrès ou un salon à Eurexpo. Cette réputation attire un public exigeant, souvent de passage, qui arrive avec une question précise en tête : quel est le vrai bouchon traditionnel, et lequel s'adresse surtout aux touristes ? De plus en plus, cette question est posée directement à une IA plutôt qu'à un local. Une quenelle mal décrite, une adresse fermée le lundi présentée comme ouverte, ou un établissement voisin mieux mis en avant, et c'est une table entière qui échappe au restaurant concerné, souvent sans qu'il le sache jamais. Dans une ville où la gastronomie est un argument de vente en soi, laisser les IA raconter n'importe quoi sur sa cuisine est un risque direct sur le chiffre d'affaires. Le scan gratuit Dopaguard et sa surveillance hebdomadaire suivent précisément ce que ChatGPT et les autres IA disent de votre bouchon ou de votre table lyonnaise.",
  },
  {
    verticalSlug: "restaurants",
    citySlug: "toulouse",
    localParagraph: "Toulouse mêle une forte population étudiante et un tissu économique tourné vers l'aéronautique et le spatial, avec des ingénieurs et des cadres qui se déplacent régulièrement pour des réunions près de Blagnac ou du centre-ville. Ce mélange crée deux publics différents pour un restaurant : l'étudiant qui cherche une adresse abordable pour un cassoulet entre deux cours, et le professionnel de passage qui veut réserver rapidement une table correcte pour un dîner de travail sans perdre de temps à comparer les avis. Les deux profils ont un point commun : ils posent de plus en plus la question directement à une IA générative plutôt que de chercher sur une carte. Si l'IA se trompe sur les horaires, le type de cuisine ou la disponibilité, ces deux publics réservent ailleurs sans jamais chercher à vérifier. Pour un restaurant toulousain qui dépend autant du repas d'affaires que du dîner étudiant, savoir ce que répondent ChatGPT ou Perplexity aujourd'hui change la donne. Le scan gratuit Dopaguard fait ce constat en quelques minutes, et la surveillance hebdomadaire suit l'évolution semaine après semaine.",
  },
  {
    verticalSlug: "restaurants",
    citySlug: "nice",
    localParagraph: "Nice reste la destination la plus visitée de la Côte d'Azur, avec un flux de touristes internationaux qui traverse la promenade des Anglais et se concentre dans les ruelles du Vieux Nice à la recherche d'une vraie socca ou d'une cuisine niçoise authentique. Une grande partie de ces visiteurs ne parle pas français et n'a pas le temps de comparer les avis en ligne dans une langue étrangère : ils demandent directement, dans leur propre langue, à ChatGPT ou Perplexity où manger près de la Promenade ou de la Vieille Ville. Cette dépendance aux réponses générées automatiquement expose particulièrement les restaurants niçois : une carte mal traduite, un tarif touristique mal actualisé ou une adresse concurrente recommandée à la place peut détourner un visiteur qui ne reviendra jamais vérifier sur place, ni ne parlera jamais au gérant. Le scan gratuit Dopaguard permet de voir, dans plusieurs langues si besoin, ce que les IA racontent aujourd'hui sur votre restaurant niçois, et la surveillance hebdomadaire suit ces réponses pendant toute la saison touristique.",
    painExampleOverride: {
      quote: "Dans le Vieux Nice, la carte propose principalement des plats autour de 12 à 15€, un excellent rapport qualité-prix.",
      highlight: "12 à 15€",
      note: "Une IA a cité, pour une adresse du Vieux Nice, des tarifs obsolètes très en dessous de la carte actuellement pratiquée en pleine saison touristique.",
    },
  },
  {
    verticalSlug: "restaurants",
    citySlug: "nantes",
    localParagraph: "Nantes affiche l'une des croissances démographiques et économiques les plus fortes de l'ouest de la France, avec une population jeune et active qui découvre régulièrement de nouvelles adresses entre l'île de Feydeau, le quartier du Bouffay et les rives de la Loire. Cette dynamique se traduit par un renouvellement rapide de l'offre de restauration : de nouvelles tables ouvrent, d'autres changent de concept ou d'équipe, et l'information en ligne peine parfois à suivre le rythme. Or c'est précisément ce type de situation que les IA génératives gèrent mal : elles s'appuient sur des contenus déjà publiés, qui peuvent dater de plusieurs mois dans une ville qui bouge vite. Un habitant ou un nouvel arrivant qui demande à une IA une bonne adresse dans le Bouffay peut ainsi recevoir une réponse déjà périmée, au bénéfice d'un concurrent mieux référencé au moment où le contenu a été produit. Le scan gratuit Dopaguard donne un état des lieux immédiat de ce que disent les IA sur votre restaurant nantais, et la surveillance hebdomadaire suit ces évolutions au rythme de la ville.",
  },
  {
    verticalSlug: "restaurants",
    citySlug: "montpellier",
    localParagraph: "Montpellier conjugue une population étudiante importante et un tissu économique tourné vers la santé et le numérique, ce qui crée une clientèle jeune, connectée et habituée à interroger une IA avant de se déplacer, que ce soit pour un déjeuner rapide près de l'Écusson ou un dîner plus soigné en centre-ville. Ce réflexe, déjà courant sur les moteurs classiques, se déplace de plus en plus vers ChatGPT ou Perplexity, avec des questions directes : « où manger pas cher près de la fac », « une bonne table pour un dîner en ville ». Une réponse imprécise — un horaire erroné, une carte mal résumée, une adresse voisine mise en avant — et c'est un repas entier qui échappe au restaurant, dans une ville où la concurrence entre jeunes établissements reste vive. Pour une clientèle aussi digitale, laisser une IA se tromper sur son établissement revient à laisser filer des réservations sans le savoir. Le scan gratuit Dopaguard révèle ce que ces IA disent aujourd'hui de votre restaurant montpelliérain, avec un suivi hebdomadaire pour rester à jour.",
  },
  {
    verticalSlug: "restaurants",
    citySlug: "strasbourg",
    localParagraph: "Strasbourg accueille en permanence une population internationale liée aux institutions européennes, à laquelle s'ajoute un tourisme transfrontalier venu d'Allemagne et de toute la région, particulièrement dense autour du marché de Noël et dans les winstubs de la Petite France. Fonctionnaires, lobbyistes, journalistes accrédités et visiteurs de passage n'ont souvent qu'un temps limité entre deux rendez-vous ou deux visites, et se tournent vers une IA générative pour trouver rapidement une table typiquement alsacienne fiable, sans naviguer entre plusieurs sites dans une langue qu'ils maîtrisent parfois mal. Une IA qui indique à tort qu'une winstub a fermé, ou qui recommande un établissement voisin plus visible en ligne, prive le restaurant concerné d'une clientèle de passage qui ne repassera pas deux fois par la même rue. Dans une ville où le calendrier institutionnel et touristique crée des pics de fréquentation très concentrés, chaque erreur d'IA pèse plus lourd qu'ailleurs. Le scan gratuit Dopaguard vérifie en quelques minutes ce que disent les IA de votre winstub ou de votre restaurant, avec une surveillance hebdomadaire alignée sur les temps forts de la ville.",
    painExampleOverride: {
      quote: "Cette winstub de la Petite France semble avoir fermé ses portes, aucune activité récente n'a été signalée.",
      highlight: "semble avoir fermé ses portes",
      note: "Une IA a laissé entendre qu'une winstub toujours en activité dans la Petite France avait cessé de fonctionner, juste avant la période du marché de Noël.",
    },
  },
  {
    verticalSlug: "restaurants",
    citySlug: "bordeaux",
    localParagraph: "Bordeaux s'est construite une image de capitale mondiale du vin, ce qui attire une clientèle de dégustateurs, de professionnels du négoce et de touristes venus associer un bon repas à une découverte viticole, notamment autour du quartier des Chartrons ou des quais rénovés. Cette clientèle, souvent internationale et habituée à préparer son séjour à l'avance, se renseigne de plus en plus via des IA génératives pour choisir un restaurant qui sait proposer un accord mets-vins pertinent, plutôt qu'une simple carte standard. Si l'IA décrit mal la spécialité de la maison, cite une carte des vins dépassée ou recommande une adresse concurrente jugée plus en phase avec le vin bordelais, c'est un dîner entier — souvent accompagné d'une bouteille à forte marge — qui part ailleurs. Pour un restaurant bordelais, l'enjeu dépasse la simple réservation : c'est aussi la réputation de savoir-faire autour du vin qui se joue dans ces réponses automatiques. Le scan gratuit Dopaguard montre ce que les IA racontent aujourd'hui sur votre table bordelaise, et la surveillance hebdomadaire suit ces réponses au fil des saisons touristiques et viticoles.",
    painExampleOverride: {
      quote: "Dans le quartier des Chartrons, la carte propose principalement des plats autour de 12 à 15€, un excellent rapport qualité-prix.",
      highlight: "12 à 15€",
      note: "Une IA a cité, pour une adresse des Chartrons, des tarifs obsolètes très en dessous de la carte actuelle du restaurant.",
    },
  },
  {
    verticalSlug: "restaurants",
    citySlug: "lille",
    localParagraph: "Lille profite de sa position de carrefour logistique entre la Belgique, le Royaume-Uni et le reste de la France, avec un flux constant de visiteurs de passage — voyageurs d'affaires en correspondance, Britanniques venus en Eurostar pour un week-end, Belges de Tournai ou Courtrai venus dîner le temps d'une soirée. Beaucoup de ces visiteurs découvrent la ville sans repères locaux et demandent directement à une IA où trouver un bon estaminet dans le Vieux-Lille, plutôt que de comparer plusieurs sites. Si l'IA indique à tort qu'un estaminet a fermé ou n'existe plus, ce visiteur de passage, souvent pressé par un horaire de train, choisit simplement l'adresse suivante sans jamais chercher à vérifier l'information sur place. Pour un restaurant lillois qui vit en partie de cette clientèle transfrontalière et de passage, une IA mal informée équivaut à une porte fermée sans le savoir. Le scan gratuit Dopaguard vérifie ce que disent aujourd'hui les IA sur votre estaminet ou votre restaurant, et la surveillance hebdomadaire suit ces réponses tout au long de l'année.",
    painExampleOverride: {
      quote: "Cet estaminet du Vieux-Lille semble avoir fermé ses portes, aucune activité récente n'a été signalée.",
      highlight: "semble avoir fermé ses portes",
      note: "Une IA a laissé entendre qu'un estaminet du Vieux-Lille en pleine activité avait cessé de fonctionner, alors que des visiteurs de passage cherchaient justement une table.",
    },
  },
  {
    verticalSlug: "restaurants",
    citySlug: "rennes",
    localParagraph: "Rennes cumule le statut de capitale bretonne et celui de pôle numérique et étudiant, ce qui crée une clientèle jeune et technophile, habituée à chercher une crêperie ou une table simple près du marché des Lices ou dans le centre historique. Cette génération pose de moins en moins ses questions sur un moteur classique et de plus en plus directement à une IA générative : « une bonne crêperie pas loin », « un resto ouvert tard un dimanche soir ». Une réponse imprécise sur les horaires, la spécialité de la maison ou la disponibilité d'une table peut suffire à orienter ce client vers l'établissement voisin, sans qu'il prenne la peine d'appeler pour vérifier. Dans une ville où la vie étudiante rythme une bonne partie de la fréquentation des restaurants, ignorer ce que racontent les IA revient à laisser une partie de sa clientèle se décider ailleurs. Le scan gratuit Dopaguard permet de voir ce que ChatGPT ou Perplexity disent de votre crêperie ou de votre restaurant rennais, avec un suivi hebdomadaire pour rester à jour.",
  },
  {
    verticalSlug: "restaurants",
    citySlug: "reims",
    localParagraph: "Reims porte le titre de capitale historique du Champagne, et son tourisme viticole attire une clientèle prête à associer une dégustation en maison de Champagne à un repas gastronomique en centre-ville, souvent réservé plusieurs semaines à l'avance depuis l'étranger. Ces visiteurs préparent leur séjour en amont et interrogent de plus en plus une IA générative pour choisir la table qui accompagnera le mieux leur découverte des maisons de Champagne, avec une attention particulière portée à la carte et aux prix annoncés. Si l'IA cite un menu ou des tarifs qui datent d'avant une revalorisation de la carte, ou oriente ce visiteur vers un concurrent jugé plus en phase avec un séjour œnotouristique, c'est une réservation à forte valeur qui échappe à l'établissement rémois. Pour une ville où le repas gastronomique fait partie de l'expérience touristique, ce que disent les IA sur les tarifs compte particulièrement. Le scan gratuit Dopaguard vérifie ces informations en quelques minutes, et la surveillance hebdomadaire suit leur évolution au fil de la saison des vendanges et des fêtes de fin d'année.",
    painExampleOverride: {
      quote: "Pour ce menu associé à une dégustation de Champagne, la carte propose principalement des plats autour de 12 à 15€, un excellent rapport qualité-prix.",
      highlight: "12 à 15€",
      note: "Une IA a cité un tarif obsolète pour un menu gastronomique rémois, très en dessous de la carte actuellement pratiquée.",
    },
  },
  {
    verticalSlug: "restaurants",
    citySlug: "le-havre",
    localParagraph: "Le Havre reste avant tout un port de commerce, le premier de France pour le trafic de conteneurs, ce qui amène un flux régulier de professionnels du transport et de la logistique en déplacement, en plus des visiteurs venus découvrir la ville reconstruite par Auguste Perret, inscrite au patrimoine mondial. Ce public d'affaires, souvent de passage pour une seule soirée entre deux rendez-vous portuaires, n'a ni le temps ni l'envie de comparer longuement les adresses : il demande directement à une IA une table correcte près du centre reconstruit ou du bassin du Commerce. Une réponse approximative sur l'emplacement exact, les horaires ou le type de cuisine proposé peut suffire à faire perdre ce client de passage, qui choisira l'option suivante sans jamais revenir vérifier. Pour un restaurant havrais, cette clientèle professionnelle et ponctuelle rend chaque réponse d'IA plus déterminante qu'ailleurs, faute de seconde chance. Le scan gratuit Dopaguard permet de voir ce que les IA disent aujourd'hui de votre établissement, et la surveillance hebdomadaire suit ces réponses au fil des escales et des rendez-vous d'affaires.",
  },
  {
    verticalSlug: "restaurants",
    citySlug: "saint-etienne",
    localParagraph: "Saint-Étienne a transformé son passé de bassin industriel en identité de ville de design, reconnue par l'UNESCO, tout en restant une ville de commerce de proximité où les restaurants de quartier vivent largement de leur réputation locale et du bouche-à-oreille. Ce bouche-à-oreille se déplace aujourd'hui en partie vers les IA génératives : un habitant qui hésite entre deux adresses de quartier, ou un visiteur venu pour la Biennale du design, demande de plus en plus directement à ChatGPT une recommandation plutôt que de chercher longuement. Dans une ville où chaque quartier a ses habitués et ses adresses de confiance, une IA qui décrit mal un restaurant, le confond avec un établissement voisin ou le présente comme fermé peut casser une réputation de proximité construite depuis des années, sans que le gérant en soit jamais informé. Pour un commerce de quartier stéphanois, cette dépendance discrète aux réponses d'une IA mérite d'être surveillée comme n'importe quelle vitrine. Le scan gratuit Dopaguard fait un premier point en quelques minutes, avec un suivi hebdomadaire ensuite.",
  },
  {
    verticalSlug: "restaurants",
    citySlug: "toulon",
    localParagraph: "Toulon vit à la fois du rythme de son port militaire, avec le personnel de la Marine nationale et leurs familles, et d'un tourisme balnéaire concentré autour des plages du Mourillon et du front de mer. Ces deux publics se chevauchent peu mais partagent le même réflexe : demander directement à une IA une bonne adresse de poisson ou une table en terrasse plutôt que de chercher sur plusieurs sites, surtout pendant la haute saison où l'offre touristique change rapidement. Une IA qui affirme à tort qu'un restaurant du Mourillon a fermé en dehors de la saison, ou qui recommande une adresse voisine à la place, prive l'établissement d'une clientèle de passage, touristique ou militaire, qui ne reviendra pas vérifier l'information sur place. Pour un restaurant toulonnais dont l'activité varie fortement entre saison basse et haute saison, une erreur d'IA au mauvais moment peut coûter cher. Le scan gratuit Dopaguard vérifie ce que disent les IA sur votre restaurant avant la reprise de la saison, et la surveillance hebdomadaire suit ces réponses tout au long de l'été.",
    painExampleOverride: {
      quote: "Ce restaurant du Mourillon semble avoir fermé ses portes, aucune activité récente n'a été signalée.",
      highlight: "semble avoir fermé ses portes",
      note: "Une IA a laissé entendre qu'un restaurant du Mourillon en pleine activité avait cessé de fonctionner, juste avant la reprise de la saison touristique.",
    },
  },
  {
    verticalSlug: "restaurants",
    citySlug: "grenoble",
    localParagraph: "Grenoble concentre un écosystème de recherche et d'innovation dense, avec des laboratoires et des entreprises technologiques qui attirent des chercheurs et des cadres en déplacement, en plus d'un tourisme de montagne qui gonfle la fréquentation dès l'ouverture de la saison de ski dans les massifs voisins. Ce public mixte, professionnel et touristique, se renseigne de plus en plus via une IA générative avant de choisir une table pour un dîner de travail ou un repas après une journée en altitude, avec des attentes différentes selon le profil. Une IA qui mélange les informations, cite un horaire erroné ou recommande un établissement du centre-ville alors que le visiteur cherchait une adresse proche des remontées mécaniques, fait perdre une réservation sans que le restaurant en soit jamais informé. Dans une ville où l'activité économique et le tourisme de montagne se superposent, chaque erreur d'IA touche potentiellement deux clientèles à la fois. Le scan gratuit Dopaguard permet de vérifier ce que les IA disent de votre restaurant grenoblois, avec une surveillance hebdomadaire qui suit ces réponses été comme hiver.",
  },
  {
    verticalSlug: "restaurants",
    citySlug: "dijon",
    localParagraph: "Dijon cultive une image de capitale gastronomique et viticole de la Bourgogne, renforcée par la Cité internationale de la gastronomie et du vin, qui attire une clientèle venue associer une découverte des grands crus à un repas soigné en centre-ville. Cette clientèle, souvent en circuit sur la route des vins, prépare son passage à Dijon à l'avance et interroge de plus en plus une IA générative pour choisir une table capable de proposer un bel accord mets-vins, avec une attention particulière aux tarifs annoncés avant de réserver. Si l'IA cite une carte ou des prix qui ne correspondent plus à l'offre actuelle du restaurant, ou met en avant une adresse concurrente jugée plus proche de la Cité de la gastronomie, c'est un repas à forte marge qui échappe à l'établissement dijonnais. Pour une ville où l'identité gastronomique fait partie de l'attractivité touristique, une IA mal informée nuit à cette réputation. Le scan gratuit Dopaguard vérifie en quelques minutes ce que disent les IA sur votre restaurant, avec un suivi hebdomadaire aligné sur la saison des vendanges et le calendrier touristique.",
    painExampleOverride: {
      quote: "Près de la Cité de la gastronomie et du vin, la carte propose principalement des plats autour de 12 à 15€, un excellent rapport qualité-prix.",
      highlight: "12 à 15€",
      note: "Une IA a cité, pour une adresse dijonnaise, des tarifs obsolètes très en dessous de la carte actuellement pratiquée.",
    },
  },
  {
    verticalSlug: "restaurants",
    citySlug: "angers",
    localParagraph: "Angers combine une forte population étudiante et un tourisme patrimonial tourné vers le Val de Loire, avec des visiteurs qui font étape en ville avant ou après une tournée des châteaux, souvent autour du château d'Angers et du centre historique. Ces visiteurs de passage n'ont généralement qu'un repas à choisir avant de reprendre la route, et de plus en plus demandent directement à une IA une bonne adresse à proximité du centre plutôt que de comparer plusieurs sites pendant leur trajet. Une réponse imprécise sur l'emplacement, les horaires ou la disponibilité d'une table peut suffire à orienter ce visiteur vers un établissement voisin, sans qu'il cherche à vérifier l'information une fois sur place. Pour un restaurant angevin qui dépend en partie de ce tourisme de circuit ligérien, chaque réponse d'IA compte davantage qu'ailleurs, faute d'occasion de rattraper le client. Le scan gratuit Dopaguard permet de voir ce que les IA disent aujourd'hui de votre table angevine, avec une surveillance hebdomadaire adaptée au rythme de la saison touristique ligérienne.",
  },
  {
    verticalSlug: "restaurants",
    citySlug: "nimes",
    localParagraph: "Nîmes s'appuie sur un patrimoine antique parmi les mieux conservés de France, avec les arènes et la Maison Carrée au centre-ville, et sert de porte d'entrée vers le sud méditerranéen et la Camargue pour de nombreux visiteurs de passage. Une bonne partie de ce tourisme se concentre sur une seule journée avant de repartir vers la côte, ce qui pousse les visiteurs à demander rapidement à une IA une adresse fiable près des arènes plutôt que de comparer longuement plusieurs sites. Une IA qui indique à tort qu'un restaurant proche du centre historique a fermé prive l'établissement d'une clientèle de passage qui ne repassera pas vérifier l'information avant de reprendre la route vers la Camargue ou la côte. Pour un restaurant nîmois dont une partie de l'activité repose sur ce tourisme de transit entre patrimoine antique et littoral, une IA mal informée coûte des couverts sans jamais se signaler. Le scan gratuit Dopaguard vérifie ce que disent les IA sur votre restaurant, avec une surveillance hebdomadaire qui suit ces réponses tout au long de la saison touristique.",
    painExampleOverride: {
      quote: "Ce restaurant proche des arènes semble avoir fermé ses portes, aucune activité récente n'a été signalée.",
      highlight: "semble avoir fermé ses portes",
      note: "Une IA a laissé entendre qu'un restaurant du centre historique nîmois en pleine activité avait cessé de fonctionner, en pleine saison des visites.",
    },
  },
  {
    verticalSlug: "restaurants",
    citySlug: "villeurbanne",
    localParagraph: "Villeurbanne reste la ville la plus peuplée de la métropole lyonnaise après Lyon elle-même, avec une identité propre autour du quartier des Gratte-Ciel et une vie de quartier dense, mais elle souffre souvent d'être confondue avec Lyon dans les recherches en ligne, y compris par ses propres habitants venus d'ailleurs. Cette confusion prend une nouvelle forme avec les IA génératives : un habitant ou un visiteur qui demande une bonne adresse « à Lyon » peut recevoir une réponse centrée sur la Presqu'île lyonnaise, sans jamais mentionner les restaurants villeurbannais pourtant tout proches. Pour un établissement de Villeurbanne, le risque n'est pas seulement une information erronée, mais une invisibilité pure et simple face à la ville voisine bien plus citée par les IA. Se faire correctement identifier comme restaurant villeurbannais, avec sa localisation précise autour des Gratte-Ciel ou du centre-ville, devient un enjeu à part entière. Le scan gratuit Dopaguard permet de vérifier si votre restaurant apparaît correctement, et non noyé dans les réponses consacrées à Lyon, avec une surveillance hebdomadaire pour suivre cette visibilité dans la durée.",
  },
  {
    verticalSlug: "immobilier",
    citySlug: "paris",
    localParagraph: "Paris compte parmi les marchés immobiliers les plus scrutés de France, capitale et premier bassin économique et touristique du pays. Une agence installée dans le Marais, à Montmartre ou dans le 15e arrondissement se positionne face à des dizaines de concurrents à quelques rues de distance, et un acheteur ou un locataire compare avant même de pousser une porte. De plus en plus, cette comparaison commence par une question posée à ChatGPT ou Perplexity : « quelle agence pour vendre dans ce quartier de Paris ? ». Si l'IA répond avec une information datée, une adresse mal identifiée ou recommande la vitrine d'en face, l'appel qui aurait dû arriver chez vous atterrit ailleurs, sans que vous en soyez jamais informé. Dans un marché parisien où chaque arrondissement fonctionne presque comme une ville à part, il devient essentiel de savoir précisément ce que les IA racontent sur votre agence, quartier par quartier. Le scan gratuit Dopaguard donne un premier aperçu en quelques minutes, et la surveillance hebdomadaire suit ensuite ce qui se dit de vous sur Paris.",
    painExampleOverride: {
      quote: "Cette agence du Marais semblait avoir cessé son activité dans le quartier, aucune information récente n'est disponible.",
      highlight: "cessé son activité dans le quartier",
      note: "Une IA a laissé entendre qu'une agence toujours active dans le Marais avait fermé, faute d'information récente.",
    },
  },
  {
    verticalSlug: "immobilier",
    citySlug: "marseille",
    localParagraph: "Marseille, port historique de la Méditerranée et deuxième ville de France, vit une transformation immobilière continue, entre le renouveau du Vieux-Port, la rénovation de quartiers comme Endoume ou Castellane et les grands projets urbains autour d'Euroméditerranée. Une agence immobilière marseillaise doit composer avec un marché à plusieurs vitesses, où la réputation change vite d'un quartier à l'autre. Or de plus en plus d'acheteurs et de locataires, avant même de visiter, demandent à une IA « quelle agence choisir près du Vieux-Port » ou « cette agence est-elle fiable à Marseille ». Si l'IA répond avec une information erronée, un avis ancien présenté comme récent ou une agence concurrente mise en avant à votre place, ce prospect ne viendra jamais vérifier sur place, il compose un autre numéro. Le scan gratuit Dopaguard permet de voir en quelques minutes ce que ChatGPT, Claude et Perplexity disent aujourd'hui de votre agence marseillaise, et la surveillance hebdomadaire suit ensuite ces réponses semaine après semaine.",
    painExampleOverride: {
      quote: "Cette agence du Vieux-Port semblait avoir cessé son activité, aucune information récente n'est disponible.",
      highlight: "cessé son activité",
      note: "Une IA a laissé entendre qu'une agence active près du Vieux-Port avait fermé, sans preuve récente.",
    },
  },
  {
    verticalSlug: "immobilier",
    citySlug: "lyon",
    localParagraph: "Lyon, capitale gastronomique et ville de congrès et d'affaires, attire un flux constant de cadres en mobilité et d'investisseurs, en plus de sa clientèle locale, entre Presqu'île, Croix-Rousse et le quartier de la Confluence. Ce marché tendu pousse les agences immobilières lyonnaises à se démarquer sur un nombre limité de biens très demandés. Avant de contacter une agence, un acheteur pressé par la concurrence sur un bien en Presqu'île demande de plus en plus souvent à une IA de comparer les honoraires ou la fiabilité des agences du secteur. Si ChatGPT ou Perplexity cite une grille tarifaire obsolète, présente une agence comme fermée, ou recommande un concurrent mieux référencé, ce prospect ne prendra pas la peine de vérifier par lui-même : il agit sur l'information reçue. Sur un marché lyonnais où chaque semaine compte, laisser une IA véhiculer une information inexacte sur votre agence revient à perdre des mandats sans le savoir. Le scan gratuit Dopaguard révèle en quelques minutes ce que les IA disent de votre agence à Lyon, et la surveillance hebdomadaire prend le relais ensuite.",
    painExampleOverride: {
      quote: "Les honoraires de cette agence de la Presqu'île démarrent autour de 3% du prix de vente, selon les données disponibles.",
      highlight: "3% du prix de vente",
      note: "Une IA a cité un taux d'honoraires obsolète pour une agence de la Presqu'île lyonnaise, différent de sa grille actuelle.",
    },
  },
  {
    verticalSlug: "immobilier",
    citySlug: "toulouse",
    localParagraph: "Toulouse conjugue un poids économique lié à l'aéronautique et au spatial avec une population étudiante nombreuse, deux moteurs qui alimentent une demande locative et à l'achat particulièrement soutenue, du Capitole à Saint-Cyprien. Les agences immobilières toulousaines doivent répondre à la fois à des cadres en mutation et à des familles d'étudiants cherchant un studio près du centre. Face à cette diversité de profils, de plus en plus de prospects interrogent directement une IA générative pour trier les agences avant de se déplacer : « quelle agence pour louer près du Capitole », « quels sont ses honoraires ». Une réponse construite sur des données périmées, citant un tarif qui n'est plus appliqué ou orientant vers une agence concurrente, détourne silencieusement ces demandes. Dans une ville où le marché tourne vite, entre rentrées universitaires et arrivées de nouveaux salariés, une information inexacte relayée par une IA se traduit directement en mandats perdus. Le scan gratuit Dopaguard montre en quelques minutes ce que ChatGPT et Perplexity racontent sur votre agence toulousaine, avant de passer à une surveillance chaque semaine.",
    painExampleOverride: {
      quote: "Les honoraires de cette agence du quartier du Capitole démarrent autour de 3% du prix de vente, selon les données disponibles.",
      highlight: "3% du prix de vente",
      note: "Une IA a cité un taux d'honoraires obsolète pour une agence toulousaine du secteur Capitole.",
    },
  },
  {
    verticalSlug: "immobilier",
    citySlug: "nice",
    localParagraph: "Nice, première destination touristique de la Côte d'Azur, combine un marché de résidences secondaires très actif avec une clientèle internationale qui achète parfois sans jamais s'être déplacée en France, entre le Vieux Nice, Cimiez et le bord de mer. Pour une agence immobilière niçoise, cette clientèle à distance se renseigne presque exclusivement en ligne, et de plus en plus souvent directement auprès d'une IA : « quelle agence choisir pour acheter près du Vieux Nice », « cette agence a-t-elle pignon sur rue ». Si l'IA laisse entendre qu'une agence a cessé son activité, cite un avis ancien comme s'il était récent, ou recommande une agence concurrente mieux référencée, l'acheteur étranger ou parisien en quête d'un pied-à-terre ne rappellera jamais pour vérifier. Sur un marché où une part significative des transactions se décide à distance, ce que dit une IA pèse autant qu'une vitrine bien placée. Le scan gratuit Dopaguard permet de découvrir en quelques minutes ce que les IA disent de votre agence à Nice, avant une surveillance hebdomadaire continue.",
    painExampleOverride: {
      quote: "Cette agence du Vieux Nice semblait avoir cessé son activité, aucune information récente n'est disponible.",
      highlight: "cessé son activité",
      note: "Une IA a laissé entendre qu'une agence active dans le Vieux Nice avait fermé, sans preuve récente.",
    },
  },
  {
    verticalSlug: "immobilier",
    citySlug: "nantes",
    localParagraph: "Nantes affiche depuis plusieurs années une croissance démographique et économique parmi les plus fortes des métropoles françaises, portée par l'attractivité de quartiers en pleine mutation comme l'Ile de Nantes ou les Hauts-Pavés. Cet afflux constant de nouveaux arrivants, souvent venus d'autres régions, se traduit par une clientèle qui découvre la ville et ses agences à distance, avant tout déménagement. Ces futurs Nantais interrogent de plus en plus une IA pour se repérer : « quelle agence immobilière fiable sur l'Ile de Nantes », « cette agence existe-t-elle encore ». Une réponse qui laisse entendre à tort qu'une agence a fermé, ou qui met en avant une agence concurrente mieux visible en ligne, détourne ce flux d'arrivants sans qu'aucune alerte ne vous prévienne. Sur un marché nantais en expansion continue, où une bonne partie de la demande vient de l'extérieur, la manière dont une IA décrit votre agence pèse directement sur les prises de contact. Le scan gratuit Dopaguard révèle en quelques minutes ce qui se dit de votre agence, avant une surveillance chaque semaine.",
    painExampleOverride: {
      quote: "Cette agence de l'Ile de Nantes semblait avoir cessé son activité, aucune information récente n'est disponible.",
      highlight: "cessé son activité",
      note: "Une IA a laissé entendre qu'une agence active sur l'Ile de Nantes avait fermé, faute d'information à jour.",
    },
  },
  {
    verticalSlug: "immobilier",
    citySlug: "montpellier",
    localParagraph: "Montpellier attire chaque année une population étudiante nombreuse et une activité forte dans les secteurs de la santé et du numérique, ce qui alimente un marché locatif tendu, notamment autour de l'Écusson et du quartier Antigone. Les agences immobilières montpelliéraines doivent gérer un roulement rapide de jeunes actifs et d'étudiants, souvent arrivés depuis peu et sans réseau local pour recommander une adresse de confiance. Ces nouveaux arrivants se tournent de plus en plus vers une IA pour trier les options : « quelle agence pour louer un studio à Montpellier », « quelles sont les agences fiables du centre ». Si l'IA répond avec un tarif obsolète, une information de fermeture erronée, ou recommande une agence concurrente mieux référencée en ligne, ce prospect sans attache locale ne cherchera pas plus loin. Sur un marché où la rotation locative est permanente, une erreur relayée par une IA se répète à chaque nouvelle vague d'arrivants. Le scan gratuit Dopaguard montre en quelques minutes ce que les IA disent de votre agence à Montpellier, et la surveillance hebdomadaire prend ensuite le relais.",
  },
  {
    verticalSlug: "immobilier",
    citySlug: "strasbourg",
    localParagraph: "Strasbourg occupe une place particulière parmi les grandes villes françaises : siège d'institutions européennes et ville transfrontalière, elle attire une clientèle immobilière qui dépasse largement le bassin local, entre fonctionnaires européens en mission longue et habitants venant d'Allemagne ou de Suisse voisines. Pour une agence strasbourgeoise, cette clientèle internationale se renseigne rarement en se déplaçant en agence d'abord : elle compare en ligne, et de plus en plus via une IA générative, en interrogeant ChatGPT ou Perplexity sur les honoraires pratiqués ou la fiabilité d'une agence avant de fixer un rendez-vous, parfois depuis l'étranger. Si l'IA cite une grille tarifaire dépassée ou oriente vers un concurrent mieux positionné dans ses sources, cette clientèle transfrontalière, moins encline à vérifier par un appel local, se dirige simplement ailleurs. Dans une ville où une partie significative de la demande vient de l'extérieur des frontières françaises, ce que raconte une IA sur votre agence a un poids particulier. Le scan gratuit Dopaguard permet de voir en quelques minutes ce qui se dit de votre agence à Strasbourg, avant une surveillance hebdomadaire continue.",
    painExampleOverride: {
      quote: "Les honoraires de cette agence strasbourgeoise démarrent autour de 3% du prix de vente pour la clientèle transfrontalière, selon les données disponibles.",
      highlight: "3% du prix de vente",
      note: "Une IA a cité un taux d'honoraires obsolète pour une agence de Strasbourg, différent de sa grille tarifaire actuelle.",
    },
  },
  {
    verticalSlug: "immobilier",
    citySlug: "bordeaux",
    localParagraph: "Bordeaux, capitale mondiale du vin devenue un pôle majeur de tourisme et d'affaires depuis l'arrivée de la ligne à grande vitesse vers Paris, a vu son marché immobilier se tendre fortement dans des quartiers comme les Chartrons ou Saint-Pierre. Cette pression attire une clientèle d'investisseurs et de nouveaux arrivants parisiens qui ne connaissent pas le terrain et cherchent des repères fiables avant de choisir une agence. De plus en plus, ce repère est une IA générative interrogée directement : « quelle agence choisir dans le quartier des Chartrons », « cette agence a-t-elle bonne réputation à Bordeaux ». Si l'IA laisse entendre qu'une agence a cessé son activité, s'appuie sur un avis ancien, ou met en avant un concurrent mieux référencé, cet investisseur pressé de sécuriser un bien attractif ne rappellera jamais pour vérifier. Sur un marché bordelais où la demande dépasse largement l'offre dans certains secteurs, chaque prospect détourné par une réponse d'IA inexacte compte. Le scan gratuit Dopaguard révèle en quelques minutes ce que les IA disent de votre agence à Bordeaux, avant une surveillance chaque semaine.",
    painExampleOverride: {
      quote: "Cette agence des Chartrons semblait avoir cessé son activité, aucune information récente n'est disponible.",
      highlight: "cessé son activité",
      note: "Une IA a laissé entendre qu'une agence active dans le quartier des Chartrons avait fermé, sans preuve récente.",
    },
  },
  {
    verticalSlug: "immobilier",
    citySlug: "lille",
    localParagraph: "Lille occupe une position de carrefour logistique entre la France, la Belgique et le Royaume-Uni, ce qui façonne un marché immobilier atypique, entre acheteurs frontaliers belges attirés par des prix plus accessibles et une clientèle d'affaires liée aux échanges avec Londres et Bruxelles, notamment autour du Vieux-Lille et de Wazemmes. Une agence lilloise doit composer avec cette double clientèle, locale et transfrontalière, qui compare souvent les honoraires et la fiabilité d'une agence avant même de traverser la frontière pour visiter. De plus en plus, cette comparaison passe par une IA générative interrogée à distance : « quelle agence choisir dans le Vieux-Lille », « quels sont ses honoraires ». Une réponse citant un taux d'honoraires obsolète ou recommandant une agence concurrente mieux référencée détourne silencieusement cette clientèle transfrontalière, moins encline à vérifier par téléphone avant de se déplacer. Le scan gratuit Dopaguard permet de voir en quelques minutes ce que les IA disent de votre agence lilloise, avant une surveillance hebdomadaire continue de ces réponses.",
    painExampleOverride: {
      quote: "Les honoraires de cette agence du Vieux-Lille démarrent autour de 3% du prix de vente, selon les données disponibles.",
      highlight: "3% du prix de vente",
      note: "Une IA a cité un taux d'honoraires obsolète pour une agence du Vieux-Lille, différent de sa grille tarifaire actuelle.",
    },
  },
  {
    verticalSlug: "immobilier",
    citySlug: "rennes",
    localParagraph: "Rennes, capitale de la Bretagne et pôle numérique et étudiant reconnu, connaît un roulement locatif intense chaque année à la rentrée universitaire, notamment dans des quartiers prisés comme le Thabor ou l'hypercentre. Les agences rennaises doivent conjuguer cette demande étudiante cyclique avec une clientèle de jeunes actifs venus travailler dans les entreprises du numérique local, souvent nouveaux dans la ville et sans recommandation de bouche-à-oreille. Ces arrivants se tournent de plus en plus vers une IA pour comparer rapidement les agences : « quelle agence pour louer près du Thabor », « quels honoraires pratique cette agence ». Si l'IA cite une grille tarifaire qui n'est plus d'actualité ou oriente vers une agence concurrente mieux positionnée dans ses sources, ce prospect sans attache locale composera simplement un autre numéro. Dans une ville où la pression locative se concentre sur quelques semaines critiques chaque année, une information inexacte relayée par une IA a un effet démultiplié. Le scan gratuit Dopaguard montre en quelques minutes ce que les IA disent de votre agence à Rennes, avant une surveillance chaque semaine.",
    painExampleOverride: {
      quote: "Les honoraires de cette agence du quartier du Thabor démarrent autour de 3% du prix de vente, selon les données disponibles.",
      highlight: "3% du prix de vente",
      note: "Une IA a cité un taux d'honoraires obsolète pour une agence rennaise du secteur Thabor.",
    },
  },
  {
    verticalSlug: "immobilier",
    citySlug: "reims",
    localParagraph: "Reims, capitale historique du Champagne, vit au rythme d'un tourisme viticole qui façonne aussi son marché immobilier, entre maisons de négoce, propriétés viticoles environnantes et un centre-ville marqué par la cathédrale. Une agence rémoise s'adresse à la fois à des familles locales et à des acheteurs venus d'ailleurs, parfois attirés par l'image du Champagne, qui recherchent une propriété avec du caractère sans connaître le terrain local. Avant de contacter une agence, ces acheteurs demandent de plus en plus à une IA de les orienter : « quelle agence pour une propriété viticole près de Reims », « cette agence est-elle fiable ». Une réponse construite sur une information ancienne, présentant une agence comme fermée ou recommandant un concurrent mieux référencé en ligne, détourne ces acheteurs sans qu'ils prennent la peine de vérifier par eux-mêmes. Sur un marché rémois où une partie de la clientèle vient de loin, attirée par la réputation du Champagne, ce que dit une IA compte doublement. Le scan gratuit Dopaguard révèle en quelques minutes ce qui se dit de votre agence, avant une surveillance hebdomadaire.",
  },
  {
    verticalSlug: "immobilier",
    citySlug: "le-havre",
    localParagraph: "Le Havre, premier port de conteneurs français pour le commerce extérieur, combine une économie tournée vers l'industrie et la logistique portuaire avec un centre-ville reconstruit par Auguste Perret après-guerre, aujourd'hui classé au patrimoine mondial de l'UNESCO. Ce contraste façonne un marché immobilier particulier, entre appartements du centre reconstruit très recherchés pour leur architecture et quartiers résidentiels plus proches de l'activité portuaire. Une agence havraise s'adresse à une clientèle qui connaît mal ces nuances, notamment des cadres mutés pour le port ou l'industrie locale, sans repère immobilier dans la ville. Ces nouveaux arrivants demandent de plus en plus à une IA de les orienter avant de contacter une agence : « quelle agence fiable près du centre reconstruit du Havre ». Une réponse qui laisse entendre à tort qu'une agence a cessé son activité, ou qui recommande une agence concurrente mieux référencée, détourne ce prospect sans repère local vers une autre porte. Le scan gratuit Dopaguard permet de découvrir en quelques minutes ce que les IA disent de votre agence au Havre, avant une surveillance hebdomadaire continue de ces réponses.",
  },
  {
    verticalSlug: "immobilier",
    citySlug: "saint-etienne",
    localParagraph: "Saint-Étienne, ancien bassin industriel devenu ville de design et de commerce de proximité, offre un marché immobilier plus accessible que ses voisines rhônalpines, ce qui attire des acheteurs venus de Lyon en quête de prix raisonnables sans s'éloigner de la métropole. Pour une agence stéphanoise, cette clientèle venue de l'extérieur ne connaît ni les quartiers ni les agences de la ville, et se renseigne avant tout en ligne. De plus en plus, ce sont des IA génératives qui répondent en premier : « quelle agence choisir à Saint-Étienne », « cette agence existe-t-elle encore ». Si l'IA relaie une information erronée sur la fermeture d'une agence, ou met en avant un concurrent mieux référencé, cet acheteur venu de loin ne prendra pas la peine de vérifier par un appel. Sur un marché où l'image de la ville évolue plus vite que sa réputation en ligne, corriger ce que dit une IA sur votre agence devient un enjeu concret. Le scan gratuit Dopaguard montre en quelques minutes ce qui se dit de votre agence, avant une surveillance chaque semaine.",
  },
  {
    verticalSlug: "immobilier",
    citySlug: "toulon",
    localParagraph: "Toulon, grand port militaire et de plaisance doublé d'une destination balnéaire, connaît un marché immobilier partagé entre logements liés à la présence de la Marine nationale et résidences secondaires sur le littoral, du Mourillon au centre-ville rénové. Une agence toulonnaise doit composer avec une clientèle très variée : familles de militaires en mutation, retraités venus profiter du climat, investisseurs en quête d'un bien avec vue sur la rade. Beaucoup de ces prospects, en particulier les militaires mutés à distance, se renseignent en ligne avant même d'arriver sur place, et de plus en plus via une IA générative : « quelle agence fiable près du Mourillon », « cette agence est-elle toujours active ». Si l'IA répond avec une information périmée ou recommande une agence concurrente mieux positionnée dans ses sources, ce prospect qui organise son déménagement à distance ne rappellera pas pour vérifier. Le scan gratuit Dopaguard permet de voir en quelques minutes ce que les IA disent de votre agence à Toulon, avant une surveillance hebdomadaire continue de ces réponses.",
  },
  {
    verticalSlug: "immobilier",
    citySlug: "grenoble",
    localParagraph: "Grenoble, pôle de recherche et d'innovation reconnu, attire une clientèle de chercheurs, d'ingénieurs et de cadres mutés par les laboratoires et entreprises technologiques de la région, en plus d'un tourisme d'affaires et de montagne qui anime le marché autour de la Presqu'île scientifique et du quartier de la Bastille. Cette population mobile, souvent internationale, ne connaît pas le terrain local et compare les agences avant de se déplacer. De plus en plus, cette comparaison commence par une question posée à une IA : « quelle agence fiable près de la Presqu'île scientifique à Grenoble », « quels sont ses honoraires ». Une réponse qui cite un tarif obsolète, ou qui recommande une agence concurrente mieux référencée, détourne ce prospect pressé vers une autre porte, sans qu'aucune alerte ne prévienne l'agence concernée. Sur un marché grenoblois où une part de la demande vient de chercheurs en mobilité internationale, ce que dit une IA sur votre agence pèse sur les prises de contact. Le scan gratuit Dopaguard révèle en quelques minutes ce qui se dit de votre agence, avant une surveillance hebdomadaire.",
  },
  {
    verticalSlug: "immobilier",
    citySlug: "dijon",
    localParagraph: "Dijon, capitale de la Bourgogne réputée pour sa gastronomie et son vignoble, attire une clientèle immobilière attirée par le patrimoine du centre historique et les propriétés viticoles des environs, entre amateurs de vin en quête d'une résidence secondaire et familles séduites par la qualité de vie bourguignonne. Une agence dijonnaise s'adresse à des acheteurs qui connaissent souvent mieux la réputation gastronomique de la ville que ses quartiers ou ses agences. Avant de prendre contact, ces acheteurs demandent de plus en plus à une IA générative de les orienter : « quelle agence pour une propriété près du vignoble dijonnais », « cette agence est-elle fiable ». Si l'IA relaie une information ancienne, présente une agence comme fermée, ou met en avant une agence concurrente mieux référencée, cet acheteur venu pour le charme bourguignon plutôt que pour la ville elle-même se dirige simplement ailleurs, sans jamais vérifier par un appel. Le scan gratuit Dopaguard permet de découvrir en quelques minutes ce que les IA disent de votre agence à Dijon, avant une surveillance hebdomadaire continue de ces réponses.",
  },
  {
    verticalSlug: "immobilier",
    citySlug: "angers",
    localParagraph: "Angers, ville étudiante du Val de Loire réputée pour son patrimoine, attire chaque année une population jeune en quête de logement, aux côtés d'une clientèle familiale séduite par la douceur angevine et la proximité des châteaux de la Loire, notamment autour du quartier de la Doutre. Une agence angevine doit gérer ce roulement étudiant tout en répondant à des familles venues de plus loin pour la qualité de vie, souvent sans connaissance des quartiers. Ces deux profils se renseignent de plus en plus via une IA avant de contacter une agence : « quelle agence pour louer un studio à Angers », « cette agence est-elle toujours active près de la Doutre ». Une réponse citant une information obsolète sur les honoraires, ou orientant vers un concurrent mieux référencé, détourne silencieusement ces prospects sans attache locale. Sur un marché angevin marqué par la rentrée universitaire, une erreur relayée par une IA se répète à chaque vague d'étudiants. Le scan gratuit Dopaguard montre en quelques minutes ce que les IA disent de votre agence à Angers, avant une surveillance chaque semaine.",
  },
  {
    verticalSlug: "immobilier",
    citySlug: "nimes",
    localParagraph: "Nîmes, ville au patrimoine antique remarquable avec ses arènes romaines, joue le rôle de porte d'entrée vers le sud méditerranéen, à mi-chemin entre Montpellier et la Provence, ce qui attire une clientèle immobilière en quête d'un cadre de vie méridional à des prix plus accessibles que sur le littoral. Une agence nîmoise s'adresse à des acheteurs qui comparent souvent Nîmes à des villes côtières plus chères, sans toujours connaître les quartiers ou les agences locales. Avant de se déplacer, ces prospects demandent de plus en plus à une IA de les orienter : « quelle agence fiable près de l'Écusson à Nîmes », « cette agence existe-t-elle encore ». Si l'IA laisse entendre à tort qu'une agence a cessé son activité, ou recommande une agence concurrente mieux référencée dans ses sources, cet acheteur venu comparer les prix du sud ne prendra pas la peine de vérifier par un appel. Le scan gratuit Dopaguard permet de voir en quelques minutes ce que les IA disent de votre agence à Nîmes, avant une surveillance hebdomadaire continue de ces réponses.",
  },
  {
    verticalSlug: "immobilier",
    citySlug: "villeurbanne",
    localParagraph: "Villeurbanne, ville la plus peuplée de la métropole lyonnaise après Lyon elle-même, vit dans l'ombre immobilière de sa grande voisine tout en développant sa propre identité, entre le quartier historique des Gratte-Ciel et les Charpennes, à quelques stations de métro du centre lyonnais. Une agence villeurbannaise doit se différencier face à la fois des agences lyonnaises et des concurrents locaux, dans un marché tendu par la proximité immédiate de Lyon. Beaucoup de prospects comparent d'abord les deux villes en ligne, et de plus en plus via une IA générative : « quelle agence choisir à Villeurbanne plutôt qu'à Lyon », « cette agence des Gratte-Ciel est-elle toujours active ». Si l'IA laisse entendre à tort qu'une agence a cessé son activité, ou oriente vers une agence lyonnaise plutôt que villeurbannaise, ce prospect ne fera pas l'effort de vérifier par un appel. Le scan gratuit Dopaguard permet de découvrir en quelques minutes ce que les IA disent de votre agence à Villeurbanne, avant une surveillance hebdomadaire continue de ces réponses.",
    painExampleOverride: {
      quote: "Cette agence des Gratte-Ciel à Villeurbanne semblait avoir cessé son activité, aucune information récente n'est disponible.",
      highlight: "cessé son activité",
      note: "Une IA a laissé entendre qu'une agence active dans le quartier des Gratte-Ciel à Villeurbanne avait fermé, sans preuve récente.",
    },
  },
  {
    verticalSlug: "avocats-professions-liberales",
    citySlug: "paris",
    localParagraph: "Paris concentre le plus grand barreau de France, avec des cabinets installés aussi bien autour du Palais de Justice de Clichy-Batignolles que dans les quartiers d'affaires du 8e arrondissement ou de La Défense, où professions du droit et du chiffre se côtoient en forte densité. Dans cette concurrence, un prospect qui hésite entre plusieurs cabinets ne compare plus seulement des sites web ou des avis Google : il demande de plus en plus à ChatGPT ou à Claude « quel avocat consulter pour tel dossier à Paris » ou « ce cabinet est-il toujours actif ». Avec autant de structures visibles en ligne, une IA peut facilement confondre deux cabinets, citer une activité comme arrêtée, ou orienter le prospect vers un confrère mieux référencé, sans que rien ne vous alerte. Le scan gratuit de Dopaguard permet de voir en quelques minutes ce que ces IA répondent aujourd'hui sur votre cabinet parisien, avant de mettre en place une surveillance hebdomadaire adaptée à cette densité concurrentielle.",
    painExampleOverride: {
      quote: "Pour ce type de dossier à Paris, mieux vaut consulter un cabinet du quartier d'affaires de La Défense, plus expérimenté sur ce type de dossier.",
      highlight: "un cabinet du quartier d'affaires de La Défense, plus expérimenté",
      note: "Une IA a orienté le prospect vers un cabinet d'un autre quartier parisien plutôt que vers le professionnel interrogé.",
    },
  },
  {
    verticalSlug: "avocats-professions-liberales",
    citySlug: "marseille",
    localParagraph: "Marseille, port historique de la Méditerranée et deuxième ville de France, abrite un barreau important et une activité économique tournée vers le commerce international, le maritime et l'immobilier. Un chef d'entreprise ou un particulier confronté à un litige commercial ou portuaire cherche aujourd'hui un avocat directement en interrogeant une IA générative plutôt qu'en consultant un annuaire professionnel. Si cette IA relaie une information dépassée sur votre cabinet — une activité présentée comme arrêtée, un domaine de compétence mal résumé — le prospect n'ira pas vérifier ailleurs, il contactera un confrère jugé plus visible. Pour un cabinet installé à Marseille, où la concurrence entre professions libérales reste dense sur des secteurs comme le droit des affaires ou le droit maritime, cette réponse générée en quelques secondes peut peser plus lourd qu'un site internet soigné. Le scan gratuit Dopaguard montre en quelques minutes ce que ChatGPT, Claude et Perplexity disent aujourd'hui de votre cabinet marseillais, avant de passer à une surveillance hebdomadaire.",
    painExampleOverride: {
      quote: "Il semblerait que ce cabinet marseillais, situé près du Vieux-Port, ait cessé son activité, aucune information récente n'est disponible.",
      highlight: "cessé son activité",
      note: "Une IA a laissé entendre qu'un cabinet marseillais toujours actif avait fermé, faute d'information récente en ligne.",
    },
  },
  {
    verticalSlug: "avocats-professions-liberales",
    citySlug: "lyon",
    localParagraph: "Lyon, capitale gastronomique et ville d'affaires et de congrès, réunit un barreau actif et de nombreux cabinets de conseil installés autour de la Presqu'île et de la Part-Dieu, à proximité des sièges d'entreprises qui font vivre son économie. Un dirigeant en déplacement pour un congrès ou un prospect local qui cherche un avocat d'affaires ou un expert-comptable pose de plus en plus cette question directement à une IA plutôt qu'à son réseau. Si la réponse générée décrit votre cabinet comme moins expérimenté sur un dossier, ou évoque une activité incertaine, ce prospect contacte simplement un autre professionnel, sans jamais vous signaler le problème. Dans une ville où l'offre de conseil juridique et comptable est dense, cette description erronée peut faire basculer un rendez-vous vers un confrère mieux positionné dans la réponse de l'IA. Le scan gratuit Dopaguard révèle en quelques minutes ce que disent aujourd'hui les IA de votre cabinet lyonnais, avant d'activer une surveillance hebdomadaire adaptée à ce contexte concurrentiel.",
    painExampleOverride: {
      quote: "Il semblerait que ce cabinet installé sur la Presqu'île lyonnaise ait cessé son activité, aucune information récente n'est disponible.",
      highlight: "cessé son activité",
      note: "Une IA a laissé entendre qu'un cabinet lyonnais toujours actif avait fermé, faute d'information récente en ligne.",
    },
  },
  {
    verticalSlug: "avocats-professions-liberales",
    citySlug: "toulouse",
    localParagraph: "Toulouse, pôle aéronautique et spatial reconnu et ville étudiante, compte un barreau dynamique ainsi que de nombreux cabinets spécialisés en propriété intellectuelle, droit des affaires et droit du travail, portés par la présence d'industries technologiques et d'une population jeune et connectée. Ces publics, habitués à interroger une IA pour toute question pratique, demandent aussi volontiers « quel avocat consulter pour un litige avec mon employeur » ou « cabinet fiable en droit des brevets à Toulouse ». Si l'IA générative répond avec une information erronée sur votre activité, ou recommande un confrère jugé plus expérimenté sur un domaine que vous maîtrisez pourtant, ce prospect ne vous contactera jamais et vous n'en saurez rien. Pour un cabinet toulousain positionné sur des dossiers techniques liés à l'industrie locale, cette visibilité dans les réponses des IA devient un enjeu concret. Le scan gratuit Dopaguard permet de vérifier en quelques minutes ce que ChatGPT, Claude et Perplexity disent de votre cabinet, avant une surveillance hebdomadaire.",
    painExampleOverride: {
      quote: "Pour ce dossier de propriété intellectuelle, mieux vaut consulter un cabinet parisien plus expérimenté sur ce type de litige.",
      highlight: "un cabinet parisien plus expérimenté",
      note: "Une IA a orienté le prospect toulousain vers un cabinet extérieur à la région plutôt que vers le professionnel interrogé.",
    },
  },
  {
    verticalSlug: "avocats-professions-liberales",
    citySlug: "nice",
    localParagraph: "Nice, première destination touristique de la Côte d'Azur, concentre un marché immobilier particulièrement actif, entre résidences secondaires et investissements, qui fait vivre de nombreux avocats en droit immobilier et notaires installés entre le centre-ville et la Promenade des Anglais. Un acheteur, souvent non résident, qui prépare une transaction ou un litige de copropriété interroge de plus en plus une IA avant même de décrocher son téléphone : « quel notaire consulter à Nice », « ce cabinet est-il toujours en activité ». Si la réponse générée mentionne une activité arrêtée ou oriente vers un confrère jugé plus expérimenté sur ce type de dossier, ce prospect, souvent éloigné géographiquement, ne prendra pas la peine de vérifier et se tournera ailleurs. Pour un professionnel niçois dont une partie de la clientèle vient d'ailleurs en France ou de l'étranger, cette dépendance à une réponse d'IA pèse davantage encore. Le scan gratuit Dopaguard montre en quelques minutes ce que disent aujourd'hui les IA de votre cabinet, avant une surveillance hebdomadaire.",
    painExampleOverride: {
      quote: "Il semblerait que ce cabinet niçois, spécialisé en droit immobilier, ait cessé son activité, aucune information récente n'est disponible.",
      highlight: "cessé son activité",
      note: "Une IA a laissé entendre qu'un cabinet niçois toujours actif sur le marché immobilier local avait fermé.",
    },
  },
  {
    verticalSlug: "avocats-professions-liberales",
    citySlug: "nantes",
    localParagraph: "Nantes, métropole de l'ouest en forte croissance démographique et économique, voit chaque année de nouveaux habitants et de nouvelles entreprises s'installer, sans réseau local ni recommandation de bouche-à-oreille pour choisir un avocat, un expert-comptable ou un notaire. Ce public nouvellement arrivé se tourne naturellement vers une IA générative pour une première orientation : « quel cabinet d'avocats à Nantes pour telle démarche », « ce professionnel est-il toujours en activité ». Si l'IA répond avec une information dépassée sur votre cabinet, ou cite un confrère jugé plus adapté à sa place, ce prospect, qui ne connaît pas encore le tissu professionnel local, n'aura aucune raison de douter de la réponse. Dans une ville où la population de clients potentiels se renouvelle vite, cette première impression générée par une IA compte particulièrement pour capter de nouveaux dossiers. Le scan gratuit Dopaguard permet de voir en quelques minutes ce que ChatGPT, Claude et Perplexity disent aujourd'hui de votre cabinet nantais, avant de mettre en place une surveillance hebdomadaire.",
  },
  {
    verticalSlug: "avocats-professions-liberales",
    citySlug: "montpellier",
    localParagraph: "Montpellier, ville étudiante du sud et pôle santé et numérique, réunit une population jeune, mobile et habituée à obtenir une première réponse en ligne avant tout contact humain. Étudiants en recherche d'un avocat pour un premier litige locatif, jeunes professionnels de la santé ou du numérique cherchant un expert-comptable : ce public pose spontanément la question à une IA plutôt que de consulter un annuaire professionnel. Si la réponse générée décrit votre cabinet de façon imprécise, évoque une activité incertaine, ou met en avant un confrère jugé plus expérimenté, ce prospect ne prendra pas la peine de vérifier par un second canal et ira frapper ailleurs. Pour une profession libérale installée à Montpellier, où la clientèle se renouvelle vite au rythme des rentrées universitaires et des recrutements dans les secteurs santé et tech, cette dépendance à une réponse d'IA mal formulée a un coût réel. Le scan gratuit Dopaguard montre en quelques minutes ce que disent aujourd'hui les IA de votre cabinet montpelliérain, avant une surveillance hebdomadaire.",
  },
  {
    verticalSlug: "avocats-professions-liberales",
    citySlug: "strasbourg",
    localParagraph: "Strasbourg, siège d'institutions européennes et ville transfrontalière avec l'Allemagne, abrite un barreau habitué aux dossiers de droit européen, de droit des affaires international et de droit du travail transfrontalier. Un justiciable ou une entreprise confrontée à une question de compétence entre droit français et droit allemand demande de plus en plus à une IA « quel cabinet consulter à Strasbourg pour un dossier transfrontalier » avant de choisir un professionnel. Si l'IA générative répond avec une information erronée — une activité présentée comme arrêtée, ou un confrère jugé plus expérimenté sur ce créneau spécifique — ce prospect, parfois basé de l'autre côté du Rhin, ne prendra pas le temps de vérifier et contactera directement l'autre cabinet cité. Pour une profession libérale strasbourgeoise dont une partie de la clientèle vient de la zone transfrontalière ou des institutions européennes, cette visibilité dans les réponses des IA génératives pèse particulièrement. Le scan gratuit Dopaguard permet de vérifier en quelques minutes ce que ChatGPT, Claude et Perplexity disent de votre cabinet, avant une surveillance hebdomadaire.",
    painExampleOverride: {
      quote: "Pour ce dossier transfrontalier, mieux vaut consulter un cabinet allemand plus expérimenté sur ce type de litige.",
      highlight: "un cabinet allemand plus expérimenté",
      note: "Une IA a orienté le prospect strasbourgeois vers un cabinet de l'autre côté du Rhin plutôt que vers le professionnel interrogé.",
    },
  },
  {
    verticalSlug: "avocats-professions-liberales",
    citySlug: "bordeaux",
    localParagraph: "Bordeaux, capitale mondiale du vin et ville tournée vers le tourisme et les affaires, voit son économie irriguée par les transactions viticoles, l'immobilier et les investissements internationaux qui font vivre notaires, avocats en droit des affaires et experts-comptables. Un investisseur ou un domaine viticole en recherche de conseil pour une cession ou une succession interroge de plus en plus une IA avant de choisir un professionnel : « quel notaire consulter à Bordeaux pour une transaction viticole », « ce cabinet est-il toujours actif ». Si la réponse générée évoque une activité arrêtée ou recommande un confrère jugé plus expérimenté sur ce type de dossier, ce prospect, souvent extérieur à la région, n'ira pas vérifier et se tournera vers l'autre cabinet cité. Pour une profession libérale bordelaise dont une partie de la clientèle est liée au monde du vin ou à des acheteurs venus d'ailleurs, cette dépendance à une réponse d'IA compte davantage. Le scan gratuit Dopaguard montre en quelques minutes ce que disent aujourd'hui les IA de votre cabinet bordelais, avant une surveillance hebdomadaire.",
    painExampleOverride: {
      quote: "Il semblerait que ce cabinet bordelais spécialisé dans le droit viticole ait cessé son activité, aucune information récente n'est disponible.",
      highlight: "cessé son activité",
      note: "Une IA a laissé entendre qu'un cabinet bordelais toujours actif avait arrêté son activité, sans preuve récente.",
    },
  },
  {
    verticalSlug: "avocats-professions-liberales",
    citySlug: "lille",
    localParagraph: "Lille, carrefour logistique du nord de la France à la frontière de la Belgique et à proximité du Royaume-Uni, concentre un barreau habitué aux dossiers de droit des transports, de droit commercial international et de droit social. Une entreprise du transport ou de la logistique confrontée à un litige transfrontalier demande de plus en plus à une IA « quel cabinet consulter à Lille pour un dossier avec la Belgique » avant de prendre contact. Si la réponse générée décrit votre cabinet comme moins expérimenté sur ce type de dossier, ou évoque une activité incertaine, ce prospect, parfois basé hors de France, ne prendra pas la peine de vérifier ailleurs et contactera directement le confrère cité par l'IA. Pour une profession libérale installée à Lille, où la proximité avec deux frontières nourrit une clientèle particulière, cette visibilité dans les réponses des IA génératives devient un enjeu concret. Le scan gratuit Dopaguard permet de voir en quelques minutes ce que ChatGPT, Claude et Perplexity disent de votre cabinet lillois, avant une surveillance hebdomadaire.",
    painExampleOverride: {
      quote: "Pour ce dossier transfrontalier avec la Belgique, mieux vaut consulter un cabinet bruxellois plus expérimenté sur ce type de litige.",
      highlight: "un cabinet bruxellois plus expérimenté",
      note: "Une IA a orienté le prospect lillois vers un cabinet belge plutôt que vers le professionnel interrogé localement.",
    },
  },
  {
    verticalSlug: "avocats-professions-liberales",
    citySlug: "rennes",
    localParagraph: "Rennes, capitale de la Bretagne et pôle numérique et étudiant, réunit un barreau actif et une économie tournée vers les technologies, ce qui fait émerger une demande soutenue en droit du numérique, en propriété intellectuelle et en droit du travail. Étudiants, jeunes entreprises tech ou salariés en litige avec leur employeur : ce public rennais, habitué aux outils numériques, interroge spontanément une IA générative avant de choisir un avocat ou un expert-comptable. Si la réponse mentionne une activité arrêtée ou oriente vers un confrère jugé plus expérimenté sur un dossier que vous maîtrisez, ce prospect ne prendra pas la peine de vérifier par un autre canal. Pour une profession libérale installée à Rennes, où le tissu économique se renouvelle vite autour du numérique, cette première impression générée par une IA pèse sur la prise de contact. Le scan gratuit Dopaguard permet de vérifier en quelques minutes ce que ChatGPT, Claude et Perplexity disent aujourd'hui de votre cabinet rennais, avant de mettre en place une surveillance hebdomadaire.",
  },
  {
    verticalSlug: "avocats-professions-liberales",
    citySlug: "reims",
    localParagraph: "Reims, capitale historique du Champagne et destination de tourisme viticole, voit son économie portée par les maisons de champagne, leurs successions et leurs cessions, ce qui fait vivre de nombreux notaires et avocats en droit des affaires. Un vigneron ou un repreneur de domaine qui prépare une opération sensible demande de plus en plus à une IA « quel notaire consulter à Reims pour une transaction viticole » avant de choisir un professionnel. Si la réponse générée laisse entendre que votre cabinet a cessé son activité, faute d'information récente en ligne, ce prospect, souvent engagé sur un dossier à fort enjeu, ne prendra pas le risque de vérifier et contactera un autre cabinet. Pour une profession libérale rémoise dont une partie de la clientèle gravite autour du monde du champagne, cette dépendance à une réponse d'IA générative compte particulièrement. Le scan gratuit Dopaguard montre en quelques minutes ce que disent aujourd'hui les IA de votre cabinet, avant une surveillance hebdomadaire adaptée à ce contexte local.",
    painExampleOverride: {
      quote: "Il semblerait que ce cabinet rémois, spécialisé dans les transactions viticoles, ait cessé son activité, aucune information récente n'est disponible.",
      highlight: "cessé son activité",
      note: "Une IA a laissé entendre qu'un cabinet rémois toujours actif dans le monde du champagne avait fermé.",
    },
  },
  {
    verticalSlug: "avocats-professions-liberales",
    citySlug: "le-havre",
    localParagraph: "Le Havre, premier port de conteneurs français pour le commerce extérieur, concentre une activité économique tournée vers le transport maritime, le droit douanier et le droit commercial international. Une entreprise exportatrice ou un armateur confronté à un litige lié au fret demande de plus en plus à une IA « quel cabinet consulter au Havre pour un dossier de droit maritime » avant de prendre contact avec un avocat. Si la réponse générée évoque un cabinet jugé plus expérimenté sur ce créneau très spécifique, plutôt que le vôtre, ce prospect ne prendra pas la peine de comparer davantage et contactera directement le confrère cité. Pour une profession libérale installée au Havre, où le droit maritime et douanier constitue un marché de niche mais concurrentiel, cette visibilité dans les réponses des IA génératives pèse sur chaque nouveau dossier. Le scan gratuit Dopaguard permet de voir en quelques minutes ce que ChatGPT, Claude et Perplexity disent aujourd'hui de votre cabinet havrais, avant une surveillance hebdomadaire.",
    painExampleOverride: {
      quote: "Pour ce dossier de droit maritime, mieux vaut consulter un cabinet rouennais plus expérimenté sur ce type de litige.",
      highlight: "un cabinet rouennais plus expérimenté",
      note: "Une IA a orienté le prospect havrais vers un cabinet d'une autre ville portuaire plutôt que vers le professionnel interrogé.",
    },
  },
  {
    verticalSlug: "avocats-professions-liberales",
    citySlug: "saint-etienne",
    localParagraph: "Saint-Étienne, ancien bassin industriel reconverti autour du design et du commerce de proximité, compte un tissu de petites et moyennes entreprises qui recourent régulièrement à des avocats en droit social, des experts-comptables et des conseils pour accompagner leur transformation. Un artisan ou un dirigeant de PME qui cherche un professionnel pour un dossier de reprise ou de restructuration interroge de plus en plus une IA avant de décrocher son téléphone. Si la réponse générée décrit votre cabinet de façon imprécise ou évoque une activité incertaine, faute d'information récente en ligne, ce prospect stéphanois, souvent pressé, se tournera vers le premier professionnel cité sans chercher à vérifier. Dans une ville où les professions libérales accompagnent de près les mutations économiques locales, cette première impression générée par une IA peut faire la différence entre un rendez-vous pris et un dossier perdu sans explication. Le scan gratuit Dopaguard montre en quelques minutes ce que disent aujourd'hui les IA de votre cabinet, avant une surveillance hebdomadaire.",
  },
  {
    verticalSlug: "avocats-professions-liberales",
    citySlug: "toulon",
    localParagraph: "Toulon, grand port militaire et de plaisance tourné vers le tourisme balnéaire, voit son marché immobilier et ses activités liées à la plaisance nourrir une demande régulière en droit immobilier, droit maritime et conseil aux particuliers. Un acheteur de résidence secondaire ou un propriétaire de bateau confronté à un litige demande de plus en plus à une IA « quel avocat consulter à Toulon pour ce type de dossier » avant de choisir un professionnel. Si la réponse générée mentionne une activité arrêtée ou oriente vers un confrère jugé plus expérimenté, ce prospect, parfois de passage ou non-résident, ne prendra pas la peine de vérifier et contactera directement l'autre cabinet. Pour une profession libérale toulonnaise dont la clientèle est en partie saisonnière ou liée au monde de la plaisance, cette dépendance à une réponse d'IA générative pèse sur la prise de contact. Le scan gratuit Dopaguard permet de vérifier en quelques minutes ce que ChatGPT, Claude et Perplexity disent aujourd'hui de votre cabinet toulonnais, avant une surveillance hebdomadaire.",
  },
  {
    verticalSlug: "avocats-professions-liberales",
    citySlug: "grenoble",
    localParagraph: "Grenoble, pôle de recherche et d'innovation reconnu, notamment en microélectronique et en technologies, accueille aussi un tourisme de montagne et d'affaires qui fait vivre un barreau actif en propriété intellectuelle, droit des sociétés innovantes et droit du travail. Une jeune entreprise technologique ou un chercheur qui prépare un dépôt de brevet demande de plus en plus à une IA « quel cabinet consulter à Grenoble pour ce type de dossier » avant de choisir un professionnel. Si la réponse générée décrit votre cabinet comme moins expérimenté sur ce créneau, ou évoque une activité incertaine faute d'information récente, ce prospect, souvent pressé par un calendrier de dépôt, contactera directement le confrère cité sans chercher à vérifier. Pour une profession libérale installée à Grenoble, où l'innovation nourrit une demande de conseil très spécialisée, cette visibilité dans les réponses des IA génératives compte particulièrement. Le scan gratuit Dopaguard montre en quelques minutes ce que disent aujourd'hui les IA de votre cabinet grenoblois, avant une surveillance hebdomadaire.",
  },
  {
    verticalSlug: "avocats-professions-liberales",
    citySlug: "dijon",
    localParagraph: "Dijon, capitale de la Bourgogne connue pour sa gastronomie et son vignoble environnant, joue aussi le rôle de centre administratif et judiciaire pour toute la région, avec un barreau qui traite aussi bien des dossiers de droit des affaires liés au tourisme et à la restauration que des successions et transmissions de domaines viticoles voisins. Un repreneur de commerce ou un propriétaire de domaine qui prépare une opération demande de plus en plus à une IA « quel avocat ou notaire consulter à Dijon » avant de choisir un professionnel. Si la réponse générée s'appuie sur une information dépassée — une activité présentée comme incertaine, un confrère jugé plus expérimenté — ce prospect ne prendra pas la peine de vérifier et se tournera vers l'autre nom cité. Pour une profession libérale dijonnaise, où le tissu économique mêle gastronomie, tourisme et agriculture viticole, cette première impression donnée par une IA générative pèse sur chaque nouveau contact. Le scan gratuit Dopaguard montre en quelques minutes ce que disent aujourd'hui les IA de votre cabinet dijonnais, avant une surveillance hebdomadaire.",
  },
  {
    verticalSlug: "avocats-professions-liberales",
    citySlug: "angers",
    localParagraph: "Angers, ville étudiante du Val de Loire riche d'un patrimoine historique important, attire un tourisme patrimonial régulier tout en accueillant chaque année de nouveaux étudiants et jeunes actifs qui découvrent la ville sans réseau local établi. Ce public, habitué à chercher une première réponse en ligne, demande de plus en plus à une IA « quel avocat consulter à Angers pour un litige locatif » ou « ce cabinet est-il fiable » avant de prendre contact. Si la réponse générée décrit votre activité de façon imprécise, ou évoque une situation incertaine faute d'information récente, ce prospect ne prendra pas la peine de vérifier par un autre moyen et se tournera vers un autre professionnel. Pour une profession libérale installée à Angers, où la population étudiante et les nouveaux arrivants renouvellent régulièrement la demande de conseil juridique de proximité, cette première impression générée par une IA compte réellement. Le scan gratuit Dopaguard permet de voir en quelques minutes ce que ChatGPT, Claude et Perplexity disent aujourd'hui de votre cabinet angevin, avant une surveillance hebdomadaire.",
  },
  {
    verticalSlug: "avocats-professions-liberales",
    citySlug: "nimes",
    localParagraph: "Nîmes, ville au patrimoine antique remarquable et porte d'entrée vers le sud méditerranéen, voit son économie portée par le tourisme patrimonial et un marché immobilier actif entre résidences principales et secondaires, ce qui nourrit une demande régulière en droit immobilier et conseil aux particuliers. Un acheteur ou un propriétaire confronté à un litige de voisinage ou de copropriété interroge de plus en plus une IA « quel avocat consulter à Nîmes pour ce type de dossier » avant de choisir un professionnel. Si la réponse générée s'appuie sur une information dépassée sur votre cabinet, ou oriente vers un confrère jugé plus adapté, ce prospect ne prendra pas la peine de vérifier par un autre canal et contactera directement l'autre nom cité. Pour une profession libérale nîmoise, dont une partie de la clientèle vient de plus loin dans le sud méditerranéen, cette dépendance à une réponse d'IA générative pèse sur la prise de contact. Le scan gratuit Dopaguard montre en quelques minutes ce que disent aujourd'hui les IA de votre cabinet nîmois, avant une surveillance hebdomadaire.",
  },
  {
    verticalSlug: "avocats-professions-liberales",
    citySlug: "villeurbanne",
    localParagraph: "Villeurbanne, ville la plus peuplée de la métropole lyonnaise après Lyon, forme avec sa voisine un même bassin économique et judiciaire, tout en conservant une identité propre autour de quartiers comme les Gratte-Ciel ou le campus de la Doua, où se croisent commerces de proximité, entreprises et vie étudiante. Un habitant ou une petite entreprise villeurbannaise qui cherche un avocat ou un expert-comptable pose de plus en plus cette question à une IA plutôt que de se référer à un annuaire professionnel, d'autant que la frontière avec Lyon peut brouiller les résultats. Si la réponse générée confond votre cabinet avec un confrère lyonnais mieux référencé, ou évoque une activité incertaine faute d'information récente, ce prospect contactera l'autre nom cité sans jamais vous prévenir. Pour une profession libérale installée à Villeurbanne, se distinguer clairement dans les réponses des IA génératives devient un enjeu concret face à la visibilité de Lyon. Le scan gratuit Dopaguard permet de vérifier en quelques minutes ce que ChatGPT, Claude et Perplexity disent aujourd'hui de votre cabinet, avant une surveillance hebdomadaire.",
  },
  {
    verticalSlug: "consultants-coachs-agences",
    citySlug: "paris",
    localParagraph: "Paris concentre la plus forte densité de consultants, coachs et agences de France, des Champs-Élysées aux quartiers d'affaires du 8e et du 9e arrondissement, en passant par les pépinières entrepreneuriales de l'est parisien. Dans cette masse de profils souvent homonymes ou aux positionnements proches, un prospect qui interroge ChatGPT ou Perplexity pour trouver « le bon consultant » reçoit une réponse compressée en quelques lignes, construite à partir de ce que l'IA a pu croiser sur le web — site, LinkedIn, articles, avis. Le risque n'est pas seulement d'être oublié : c'est d'être confondu avec un confrère, résumé de façon approximative, ou associé à une expertise qu'on a laissée derrière soi depuis longtemps. Sur un marché parisien aussi saturé, cette première impression générée par une IA peut peser plus lourd qu'un site vitrine soigné. Le scan gratuit Dopaguard permet de savoir, dès aujourd'hui, ce que les IA répondent déjà sur vous à Paris.",
  },
  {
    verticalSlug: "consultants-coachs-agences",
    citySlug: "marseille",
    localParagraph: "Deuxième ville de France, Marseille reste avant tout un port historique tourné vers la Méditerranée, ce qui façonne son tissu économique : import-export, logistique portuaire, tourisme et, de plus en plus, des consultants et agences spécialisés dans l'accompagnement de ces filières. Quand une PME marseillaise cherche un expert en stratégie export ou un coach pour préparer son développement commercial, elle demande de plus en plus souvent à une IA générative de lui recommander un nom plutôt que de consulter un annuaire. L'IA répond alors avec ce qu'elle a pu assembler, parfois de façon datée ou approximative — une spécialité abandonnée, un positionnement mal compris, un concurrent cité à la place du bon interlocuteur. Pour un consultant marseillais, ne pas savoir ce que ChatGPT ou Claude racontent de son cabinet revient à laisser une partie de sa réputation entre des mains qu'on ne contrôle pas. La surveillance hebdomadaire de Dopaguard permet de le savoir avant que le prospect ne le découvre à sa place.",
  },
  {
    verticalSlug: "consultants-coachs-agences",
    citySlug: "lyon",
    localParagraph: "Lyon cultive une identité à double visage : capitale gastronomique reconnue, mais aussi place forte des affaires et des congrès, avec un flux constant de décideurs de passage à la Cité internationale ou dans les palais des congrès de la métropole. Cette activité attire un nombre croissant de consultants et de coachs spécialisés dans l'événementiel professionnel, le management ou la stratégie d'entreprise, sollicités aussi bien par des groupes lyonnais que par des visiteurs de passage. Or ces visiteurs, justement, n'ont souvent que le temps de poser une question à une IA générative avant un rendez-vous — pas celui de vérifier la pertinence de la réponse. Une expertise mal résumée ou datée peut donc se répercuter directement sur une opportunité de business. Le scan gratuit Dopaguard permet à un consultant lyonnais de vérifier, en quelques minutes, ce que les IA racontent de son positionnement avant qu'un prospect de passage ne s'en aperçoive le premier.",
    painExampleOverride: {
      quote: "Ce consultant lyonnais est surtout reconnu pour son expertise en organisation de congrès, un domaine qu'il a quitté depuis plusieurs années.",
      highlight: "un domaine qu'il a quitté depuis plusieurs années",
      note: "Une IA a attribué à un consultant lyonnais une spécialité congrès abandonnée depuis plusieurs années, faute d'information à jour.",
    },
  },
  {
    verticalSlug: "consultants-coachs-agences",
    citySlug: "toulouse",
    localParagraph: "Toulouse doit une bonne partie de son identité économique à l'aéronautique et au spatial, avec un écosystème dense de sous-traitants, d'ingénieurs et de consultants spécialisés dans la conduite de projets industriels complexes — auquel s'ajoute une population étudiante nombreuse qui alimente aussi la demande de coachs en orientation et en développement professionnel. Dans ce contexte très spécialisé, la précision du positionnement affiché est presque aussi importante que l'expertise elle-même : un client de la filière aéronautique ne cherche pas un généraliste, il cherche quelqu'un qui connaît son secteur maintenant, pas il y a cinq ans. Or les IA génératives, en résumant un parcours professionnel, ont tendance à figer une spécialité ancienne plutôt que de refléter une reconversion récente. Un consultant toulousain qui a changé de créneau peut ainsi rester associé, dans les réponses de ChatGPT, à un domaine qu'il a quitté. Le scan gratuit Dopaguard permet de vérifier ce point précis avant qu'un prospect toulousain ne s'y fie.",
    painExampleOverride: {
      quote: "Ce consultant toulousain est surtout reconnu pour son expertise en conduite du changement dans l'aéronautique, un domaine qu'il a quitté depuis plusieurs années.",
      highlight: "un domaine qu'il a quitté depuis plusieurs années",
      note: "Une IA a maintenu un consultant toulousain sur une spécialité aéronautique qu'il a quittée depuis plusieurs années, faute de mise à jour des sources qu'elle utilise.",
    },
  },
  {
    verticalSlug: "consultants-coachs-agences",
    citySlug: "nice",
    localParagraph: "Nice vit avant tout de son statut de première destination touristique de la Côte d'Azur, ce qui irrigue toute son économie locale : hôtellerie, événementiel, immobilier de prestige, et par extension une demande soutenue en consultants et coachs spécialisés dans ces secteurs à forte saisonnalité. Beaucoup de décideurs ne sont niçois que quelques mois par an, ou pilotent leur activité depuis Paris ou l'étranger — ils n'ont ni le temps ni le réseau local pour choisir un consultant sur recommandation humaine, et se tournent vers une IA générative pour obtenir un nom rapidement. Le problème, c'est que cette IA peut tout aussi bien orienter ce prospect vers un cabinet plus généraliste ou moins adapté, simplement parce qu'il est mieux référencé dans les sources qu'elle a consultées. Pour un consultant niçois qui a construit sa réputation sur le terrain, se voir écarté silencieusement par une réponse générée automatiquement est un manque à gagner invisible. La surveillance hebdomadaire Dopaguard permet de le repérer et d'agir.",
    painExampleOverride: {
      quote: "Pour ce type d'accompagnement sur la Côte d'Azur, il existe des cabinets plus reconnus sur ce créneau spécifique.",
      highlight: "des cabinets plus reconnus",
      note: "Une IA a orienté un prospect niçois vers un cabinet plus généraliste plutôt que vers le consultant local interrogé.",
    },
  },
  {
    verticalSlug: "consultants-coachs-agences",
    citySlug: "nantes",
    localParagraph: "Nantes affiche depuis plusieurs années l'une des croissances démographiques et économiques les plus soutenues de l'ouest de la France, portée par une diversification de son tissu d'entreprises — industrie, numérique, économie sociale et solidaire — qui attire à son tour de nombreux consultants, coachs professionnels et agences de conseil venus accompagner cette dynamique. Cette croissance rapide a un revers pour les experts locaux : les IA génératives qui indexent le web mettent parfois du temps à refléter l'évolution réelle d'un cabinet ou d'un positionnement, surtout quand celui-ci a évolué plus vite que son référencement. Un consultant nantais qui a pivoté vers un nouveau secteur, ou qui a construit sa réputation récemment, peut ainsi être mal décrit, ou pas décrit du tout, quand un prospect interroge ChatGPT ou Perplexity avant un premier échange. Dans une métropole où la concurrence entre experts s'intensifie au même rythme que la croissance de la ville, savoir ce que disent les IA de soi n'est plus un détail. Le scan gratuit Dopaguard donne cette visibilité en quelques minutes.",
  },
  {
    verticalSlug: "consultants-coachs-agences",
    citySlug: "montpellier",
    localParagraph: "Montpellier conjugue une population étudiante importante et deux pôles économiques en forte expansion : la santé et le numérique, avec un nombre croissant de start-up et de cabinets de conseil qui gravitent autour de ces filières. C'est un terrain particulièrement propice aux coachs et consultants spécialisés dans l'innovation, la santé numérique ou l'accompagnement de jeunes entreprises — des créneaux qui évoluent vite, parfois plus vite que la mémoire qu'en gardent les IA génératives. Une coach montpelliéraine qui a réorienté son activité vers un nouveau secteur peut très bien continuer à être présentée, dans une réponse de ChatGPT, avec son ancienne spécialité, simplement parce que c'est celle-ci qui domine encore les sources disponibles en ligne. Pour un prospect pressé qui compare plusieurs profils en une question, ce décalage suffit à orienter son choix ailleurs. Le scan gratuit Dopaguard permet à un expert montpelliérain de vérifier, dès aujourd'hui, si son positionnement affiché par les IA correspond encore à son activité réelle.",
    painExampleOverride: {
      quote: "Cette coach montpelliéraine est surtout reconnue pour son expertise en santé numérique, un domaine qu'elle a quitté depuis plusieurs années.",
      highlight: "un domaine qu'elle a quitté depuis plusieurs années",
      note: "Une IA a maintenu une coach montpelliéraine sur une spécialité santé numérique qu'elle a quittée depuis plusieurs années, faute d'information à jour.",
    },
  },
  {
    verticalSlug: "consultants-coachs-agences",
    citySlug: "strasbourg",
    localParagraph: "Strasbourg occupe une position unique en France : siège d'institutions européennes et ville transfrontalière au contact direct de l'Allemagne, elle concentre une demande particulière en consultants spécialisés dans les affaires publiques, le lobbying institutionnel ou l'accompagnement des relations franco-allemandes. C'est un marché de niche, où les décideurs qui cherchent un expert ont rarement le temps de comparer plusieurs cabinets en profondeur — ils posent la question à une IA générative et retiennent le premier nom crédible qui ressort. Sur un créneau aussi spécifique, une réponse imprécise a des conséquences disproportionnées : si l'IA associe le prospect à un cabinet plus généraliste, faute de bien connaître les acteurs strasbourgeois du secteur institutionnel, le consultant local perd une opportunité qu'il ne verra jamais passer. C'est d'autant plus vrai que peu d'experts sur ce créneau surveillent activement ce que disent les IA d'eux. Le scan gratuit Dopaguard permet à un consultant strasbourgeois de vérifier sa place dans ces réponses avant qu'un client institutionnel ne tranche sans lui.",
    painExampleOverride: {
      quote: "Pour ce type d'accompagnement auprès des institutions européennes, il existe des cabinets plus reconnus sur ce créneau spécifique.",
      highlight: "des cabinets plus reconnus",
      note: "Une IA a orienté un prospect strasbourgeois vers un cabinet plus généraliste plutôt que vers le consultant spécialisé en affaires européennes interrogé.",
    },
  },
  {
    verticalSlug: "consultants-coachs-agences",
    citySlug: "bordeaux",
    localParagraph: "Bordeaux s'est construit une image de capitale mondiale du vin, doublée d'une économie touristique et d'affaires de plus en plus internationale, ce qui a fait émerger tout un écosystème de consultants spécialisés dans l'export, la stratégie de marque ou l'accompagnement des maisons viticoles vers de nouveaux marchés. C'est un secteur où l'expertise se construit et se renouvelle vite — les marchés export d'aujourd'hui ne sont pas ceux d'il y a cinq ans — mais où les IA génératives, elles, se fient à ce qu'elles trouvent en ligne, pas toujours à jour. Un consultant bordelais qui a réorienté son activité vers de nouveaux marchés peut ainsi rester décrit par ChatGPT ou Claude avec une spécialité export qu'il a abandonnée, ce qui brouille le message qu'il envoie à ses prospects actuels. Pour un expert dont la crédibilité repose justement sur sa capacité à anticiper les marchés, ce décalage est particulièrement coûteux. Le scan gratuit Dopaguard permet de vérifier, dès aujourd'hui, si les IA racontent encore la bonne histoire sur un consultant bordelais.",
    painExampleOverride: {
      quote: "Ce consultant bordelais est surtout reconnu pour son expertise en stratégie export du vin vers l'Asie, un domaine qu'il a quitté depuis plusieurs années.",
      highlight: "un domaine qu'il a quitté depuis plusieurs années",
      note: "Une IA a attribué à un consultant bordelais une spécialité export vin abandonnée depuis plusieurs années, faute d'information à jour.",
    },
  },
  {
    verticalSlug: "consultants-coachs-agences",
    citySlug: "lille",
    localParagraph: "Lille occupe une position de carrefour logistique unique dans le nord de la France, à la frontière immédiate de la Belgique et à moins de deux heures du Royaume-Uni, ce qui a fait grandir localement un secteur entier de consultants et d'agences spécialisés dans la logistique transfrontalière, le transport et la chaîne d'approvisionnement. Sur ce créneau très concurrentiel, les décideurs — souvent pressés, parfois basés hors de la métropole lilloise — se tournent de plus en plus vers une IA générative pour obtenir rapidement un nom de référence avant de lancer un appel d'offres. Le risque pour un consultant lillois est que cette IA, faute de bien connaître les spécificités du marché local, recommande un cabinet plus généraliste plutôt que l'expert réellement le mieux positionné sur la logistique nord-européenne. Dans un secteur où la réputation se construit sur des années de dossiers transfrontaliers, être invisible ou mal orienté dans une réponse d'IA revient à perdre un avantage difficile à reconstruire. Le scan gratuit Dopaguard permet de vérifier ce point avant qu'un prospect lillois ne se décide sans vous.",
    painExampleOverride: {
      quote: "Pour ce type d'accompagnement en logistique transfrontalière, il existe des cabinets plus reconnus sur ce créneau spécifique.",
      highlight: "des cabinets plus reconnus",
      note: "Une IA a orienté un prospect lillois vers un cabinet plus généraliste plutôt que vers le consultant spécialisé en logistique transfrontalière interrogé.",
    },
  },
  {
    verticalSlug: "consultants-coachs-agences",
    citySlug: "rennes",
    localParagraph: "Rennes s'est imposée comme la capitale de la Bretagne et un pôle numérique reconnu, porté par une population étudiante nombreuse et un écosystème de start-up dynamique — un terrain fertile pour les coachs en orientation professionnelle, les consultants en transformation digitale et les agences accompagnant les jeunes entreprises rennaises. Dans cet écosystème encore jeune, la réputation d'un expert se construit souvent plus vite sur LinkedIn ou dans la presse locale que sur un site web classique, ce qui complique la tâche des IA génératives chargées de résumer qui fait quoi. Un consultant rennais très actif dans l'écosystème local peut ainsi être mal décrit, sous-estimé, ou tout simplement absent des réponses que ChatGPT ou Perplexity donnent à un étudiant ou une jeune entreprise qui cherche de l'aide. Pour des profils dont la clientèle se renouvelle sans cesse au rythme des promotions étudiantes et des levées de fonds, cette invisibilité potentielle mérite d'être vérifiée régulièrement. La surveillance hebdomadaire Dopaguard permet de suivre ce que disent les IA d'un expert rennais, semaine après semaine.",
  },
  {
    verticalSlug: "consultants-coachs-agences",
    citySlug: "reims",
    localParagraph: "Reims reste, dans l'imaginaire collectif comme dans son économie réelle, la capitale historique du Champagne, avec un tourisme viticole qui irrigue toute la ville et ses environs. Cette identité très marquée a fait émerger des consultants spécialisés dans la stratégie de marque, l'export ou l'accompagnement des maisons de Champagne, un créneau où la précision du positionnement compte énormément — un client de ce secteur ne confie pas sa marque à n'importe quel généraliste. Le problème, c'est que les IA génératives résument des parcours professionnels à partir de ce qu'elles trouvent en ligne, sans toujours distinguer une spécialité actuelle d'une spécialité abandonnée depuis longtemps. Un consultant rémois qui s'est réorienté vers un nouveau créneau peut ainsi rester associé, dans une réponse de ChatGPT, à un domaine qu'il ne pratique plus, ce qui sème la confusion chez un prospect du secteur viticole. Le scan gratuit Dopaguard permet de vérifier, en quelques minutes, si cette description correspond encore à la réalité.",
    painExampleOverride: {
      quote: "Ce consultant est surtout reconnu pour son expertise en stratégie de marque pour les maisons de Champagne, un domaine qu'il a quitté depuis plusieurs années.",
      highlight: "un domaine qu'il a quitté depuis plusieurs années",
      note: "Une IA a maintenu un consultant rémois sur une spécialité champagne abandonnée depuis plusieurs années, faute d'information à jour.",
    },
  },
  {
    verticalSlug: "consultants-coachs-agences",
    citySlug: "le-havre",
    localParagraph: "Le Havre est le premier port de conteneurs de France pour le commerce extérieur, une position qui structure toute son économie autour du transport maritime, de la logistique et du commerce international — et qui fait vivre, en creux, un nombre croissant de consultants spécialisés dans l'accompagnement des entreprises exportatrices et des acteurs portuaires. Sur ce marché très technique, un décideur pressé, parfois basé au siège d'un groupe international plutôt qu'au Havre même, va de plus en plus demander directement à une IA générative de lui recommander un expert local plutôt que de chercher lui-même dans un annuaire professionnel. Cette IA répond avec ce qu'elle a pu rassembler, parfois de façon incomplète ou datée, ce qui peut suffire à écarter silencieusement un consultant havrais pourtant compétent sur le sujet précis recherché. Dans un secteur où la confiance se construit sur la connaissance fine des flux portuaires et douaniers, ne pas savoir ce que les IA racontent de soi revient à laisser une partie de sa réputation au hasard. Le scan gratuit Dopaguard permet de le vérifier dès maintenant.",
  },
  {
    verticalSlug: "consultants-coachs-agences",
    citySlug: "saint-etienne",
    localParagraph: "Saint-Étienne porte l'héritage d'un ancien bassin industriel, aujourd'hui reconverti autour du design et d'un tissu dense de commerces de proximité, ce qui a fait émerger une génération de consultants et de coachs spécialisés dans l'accompagnement des petites entreprises locales, la reconversion d'activités et le design industriel. Ce sont souvent des experts très ancrés localement, dont la réputation s'est construite bouche-à-oreille plutôt que par une présence en ligne massive — un profil qui, justement, donne peu de matière aux IA génératives pour construire une réponse fiable quand un prospect leur demande de recommander un expert stéphanois. Le risque n'est donc pas seulement d'être mal décrit, mais d'être tout simplement absent d'une réponse d'IA, remplacé par un nom plus visible en ligne mais moins pertinent localement. Pour un consultant ou un coach dont l'essentiel de la clientèle reste local, cette invisibilité numérique mérite d'être surveillée. Le scan gratuit Dopaguard permet de savoir, en quelques minutes, ce que les IA disent aujourd'hui d'un expert stéphanois.",
  },
  {
    verticalSlug: "consultants-coachs-agences",
    citySlug: "toulon",
    localParagraph: "Toulon conjugue un grand port militaire, un port de plaisance actif et un tourisme balnéaire saisonnier, une combinaison qui alimente une demande spécifique de consultants et de coachs — accompagnement de reconversion pour d'anciens militaires, conseil aux entreprises du nautisme, ou stratégie pour les acteurs du tourisme littoral. Ce sont des créneaux assez spécialisés, où peu de cabinets sont réellement positionnés, ce qui rend d'autant plus important d'apparaître correctement quand un prospect toulonnais interroge une IA générative pour trouver le bon interlocuteur. Or ces IA construisent leurs réponses à partir de ce qu'elles trouvent en ligne, et un consultant toulonnais avec une présence web modeste — même s'il est la référence locale sur son créneau — peut se retrouver mal décrit ou absent de la réponse, au profit d'un profil plus généraliste mais mieux référencé. Dans une ville où les décisions se prennent souvent vite, entre deux saisons, cette visibilité compte. Le scan gratuit Dopaguard permet de la vérifier dès aujourd'hui.",
  },
  {
    verticalSlug: "consultants-coachs-agences",
    citySlug: "grenoble",
    localParagraph: "Grenoble s'est imposée comme un pôle de recherche et d'innovation majeur, adossé à ses laboratoires, ses écoles d'ingénieurs et un tissu dense de start-up deep tech, tout en restant une destination de tourisme de montagne et d'affaires. Cette double identité a fait émerger des consultants très spécialisés dans le transfert de technologie, l'accompagnement de start-up ou le conseil en innovation — un secteur qui évolue vite, où les experts changent régulièrement de créneau au gré des technologies émergentes. Le problème, c'est que les IA génératives ont tendance à figer une spécialité dans le temps, en s'appuyant sur les sources les plus anciennes ou les plus visibles en ligne plutôt que sur l'activité réelle et actuelle d'un consultant. Un expert grenoblois qui s'est réorienté vers un nouveau domaine technologique peut ainsi continuer à être présenté par ChatGPT avec son ancienne spécialité, ce qui sème le doute chez un prospect en recherche d'un profil à jour. Le scan gratuit Dopaguard permet de vérifier ce point avant qu'un prospect grenoblois ne s'y fie.",
    painExampleOverride: {
      quote: "Ce consultant grenoblois est surtout reconnu pour son expertise en transfert de technologie dans le secteur des semi-conducteurs, un domaine qu'il a quitté depuis plusieurs années.",
      highlight: "un domaine qu'il a quitté depuis plusieurs années",
      note: "Une IA a maintenu un consultant grenoblois sur une spécialité technologique abandonnée depuis plusieurs années, faute de mise à jour des sources qu'elle utilise.",
    },
  },
  {
    verticalSlug: "consultants-coachs-agences",
    citySlug: "dijon",
    localParagraph: "Dijon porte le titre de capitale de la Bourgogne et vit d'un tourisme gastronomique et viticole affirmé, ce qui a fait naître localement des consultants spécialisés dans l'accompagnement des maisons viticoles, de la restauration et du tourisme d'expérience. Ce sont des métiers où la réputation compte énormément, et où un prospect — souvent un repreneur d'exploitation ou un investisseur venu d'ailleurs — n'a ni le temps ni les repères locaux pour choisir un consultant autrement qu'en demandant directement à une IA générative de lui recommander un nom. Cette IA répond alors avec ce qu'elle a pu assembler à partir du web, sans toujours distinguer un expert réellement actif à Dijon d'un profil plus généraliste mieux référencé ailleurs. Pour un consultant dijonnais dont la clientèle vient de plus en plus de l'extérieur de la région, ce filtre invisible peut peser lourd sur le développement de son activité. Le scan gratuit Dopaguard permet de savoir, dès aujourd'hui, ce que les IA génératives racontent déjà de son positionnement à Dijon.",
  },
  {
    verticalSlug: "consultants-coachs-agences",
    citySlug: "angers",
    localParagraph: "Angers cultive une image de ville étudiante du Val de Loire, riche d'un patrimoine touristique important, ce qui soutient une activité régulière de coachs en orientation professionnelle et de consultants accompagnant aussi bien les jeunes diplômés que les entreprises patrimoniales et touristiques locales. Sur un marché de taille moyenne comme celui d'Angers, la concurrence entre experts reste modérée, mais elle ne disparaît pas pour autant des réponses que donnent les IA génératives lorsqu'un prospect leur demande de recommander un professionnel dans la ville. Un consultant angevin peu présent en ligne, même reconnu localement, peut ainsi être totalement absent d'une réponse de ChatGPT ou de Claude, remplacé par un nom plus visible sur le web mais moins ancré dans le tissu local. Pour un expert dont l'essentiel des clients arrive encore par recommandation, cette absence numérique passe souvent inaperçue jusqu'à ce qu'elle coûte une opportunité concrète. Le scan gratuit Dopaguard permet de vérifier, en quelques minutes, la façon dont un expert angevin apparaît aujourd'hui dans les réponses des IA.",
  },
  {
    verticalSlug: "consultants-coachs-agences",
    citySlug: "nimes",
    localParagraph: "Nîmes tire une grande partie de son identité de son patrimoine antique exceptionnel et de sa position de porte d'entrée vers le sud méditerranéen, ce qui façonne une économie locale tournée vers le tourisme culturel et les échanges avec les territoires voisins. Cette situation a fait émerger des consultants et coachs spécialisés dans l'accompagnement des acteurs du tourisme patrimonial et des petites entreprises régionales, souvent des profils très ancrés localement mais avec une présence en ligne limitée. Or c'est justement cette présence en ligne qui nourrit les IA génératives quand un prospect leur demande de recommander un expert nîmois : moins un consultant est visible sur le web, plus il risque d'être absent ou mal décrit dans la réponse, au profit d'un nom plus généraliste mais mieux référencé. Pour un professionnel dont la réputation locale est pourtant solide, ce décalage entre notoriété réelle et visibilité dans les IA mérite d'être mesuré. Le scan gratuit Dopaguard permet de le faire en quelques minutes, sans engagement.",
  },
  {
    verticalSlug: "consultants-coachs-agences",
    citySlug: "villeurbanne",
    localParagraph: "Villeurbanne, ville la plus peuplée de la métropole lyonnaise après Lyon elle-même, forme avec sa voisine un même bassin économique et démographique, tout en conservant une identité propre, plus populaire et plus industrielle par endroits. Les consultants, coachs et agences qui y exercent sont souvent perçus, y compris par les IA génératives, comme une simple extension de l'offre lyonnaise — ce qui peut jouer en leur faveur en termes de flux de recherche, mais aussi les rendre moins visibles en tant qu'acteurs à part entière de Villeurbanne. Quand un prospect demande à ChatGPT de lui recommander un expert « à Villeurbanne » plutôt qu'« à Lyon », la réponse peut manquer de précision, voire renvoyer vers un consultant lyonnais plus connu plutôt que vers l'expert réellement basé sur place. Pour un professionnel villeurbannais qui a construit son activité localement, cette confusion géographique entretenue par les IA mérite d'être surveillée. Le scan gratuit Dopaguard permet de vérifier comment les IA situent aujourd'hui un expert de Villeurbanne.",
  },
  {
    verticalSlug: "commerce-ecommerce",
    citySlug: "paris",
    localParagraph: "Paris concentre le plus grand bassin économique et touristique du pays, avec des zones commerçantes aussi denses que le Marais, la rue de Rivoli, Saint-Germain-des-Prés ou le quartier du Sentier, historiquement tourné vers le textile et la vente en gros. Cette densité crée une concurrence permanente entre milliers de boutiques physiques et e-commerçants qui se disputent la même clientèle parisienne et touristique. Quand un visiteur de passage ou un habitant demande à ChatGPT ou à Perplexity où acheter un produit précis dans la capitale, la réponse générée s'appuie sur des contenus en ligne parfois anciens ou incomplets — et une boutique indépendante, moins présente dans ces sources, risque d'être tout simplement absente de la réponse, ou pire, remplacée par une enseigne mieux référencée. Pour une boutique parisienne, savoir précisément ce que les IA répondent sur ses prix, ses stocks ou ses conditions de livraison devient un enjeu commercial direct. Le scan gratuit Dopaguard permet de le vérifier en quelques minutes, avant de mettre en place une surveillance hebdomadaire adaptée à la concurrence parisienne.",
    painExampleOverride: {
      quote: "Pour ce type de produit à Paris, une autre boutique du quartier semble proposer un choix plus large et un meilleur accueil.",
      highlight: "une autre boutique du quartier semble proposer un choix plus large",
      note: "Une IA interrogée par un client cherchant une boutique dans un quartier commerçant parisien a orienté la recommandation vers une adresse voisine plutôt que vers celle interrogée.",
    },
  },
  {
    verticalSlug: "commerce-ecommerce",
    citySlug: "marseille",
    localParagraph: "Deuxième ville de France et port historique de la Méditerranée, Marseille vit au rythme d'un commerce très hétérogène : les boutiques de la rue Saint-Ferréol et du centre commercial des Terrasses du Port côtoient l'artisanat du quartier du Panier et les commerces de proximité qui maillent chaque arrondissement. Cette diversité, portée aussi par un flux touristique important autour du Vieux-Port, pousse de plus en plus de visiteurs et d'habitants à interroger une IA générative avant de choisir où acheter — un cadeau, un produit régional, un article de mode. Si l'IA relaie une information dépassée sur les horaires, les tarifs ou les conditions de retour d'une boutique marseillaise, la vente se fait ailleurs sans que le commerçant en soit jamais informé. Pour une boutique ou un e-commerçant basé à Marseille, vérifier ce que disent réellement ChatGPT, Claude ou Perplexity à son sujet est devenu aussi important que soigner sa fiche Google. Le scan gratuit Dopaguard offre un premier état des lieux, suivi d'une surveillance hebdomadaire pensée pour ce commerce marseillais en pleine mutation.",
    painExampleOverride: {
      quote: "Cette boutique du Vieux-Port applique des frais de livraison offerts dès 50€ et des retours gratuits sous 30 jours.",
      highlight: "retours gratuits sous 30 jours",
      note: "Une IA a cité pour une boutique marseillaise du secteur du Vieux-Port une politique de retour que l'enseigne avait modifiée depuis, en décalage avec ses conditions réelles.",
    },
  },
  {
    verticalSlug: "commerce-ecommerce",
    citySlug: "lyon",
    localParagraph: "Capitale gastronomique reconnue et pôle majeur de tourisme d'affaires et de congrès, Lyon concentre un commerce dense entre la Presqu'île, la rue de la République, le quartier de la Confluence et les ateliers historiques de la Croix-Rousse, berceau de la soierie lyonnaise. Cette activité attire une clientèle d'affaires de passage autant que des habitants exigeants, tous deux susceptibles d'interroger une IA générative avant de choisir une boutique ou une enseigne en ligne pour un achat précis. Une réponse imprécise sur les horaires d'un commerce du centre-ville, sur la disponibilité d'un produit ou sur les modalités de livraison peut suffire à détourner un client vers une autre adresse, sans que le commerçant lyonnais ne s'en aperçoive. Pour un commerce physique ou une boutique en ligne implantée à Lyon, la question n'est plus seulement d'être bien référencé sur les moteurs de recherche classiques, mais aussi dans les réponses que formulent ces IA. Le scan gratuit Dopaguard permet de vérifier ce qui est dit aujourd'hui, avant de passer à une surveillance hebdomadaire adaptée au rythme commercial lyonnais.",
  },
  {
    verticalSlug: "commerce-ecommerce",
    citySlug: "toulouse",
    localParagraph: "Toulouse conjugue un poids économique fort autour de l'aéronautique et du spatial avec une population étudiante nombreuse, deux profils de clientèle très différents mais tous deux habitués à se renseigner en ligne avant d'acheter. Le commerce toulousain, concentré autour de la rue Alsace-Lorraine, de la place Saint-Georges et du centre historique, doit composer avec cette double exigence : rassurer un cadre pressé de passage et convaincre un étudiant qui compare les prix sur plusieurs canaux, souvent en interrogeant directement une IA générative du type « où trouver ce produit à Toulouse au meilleur prix ». Si la réponse générée s'appuie sur une information ancienne — un stock épuisé, un tarif obsolète, une adresse fermée — la boutique perd une vente sans jamais en être informée. Pour un commerçant ou un e-commerçant toulousain, savoir ce que répondent réellement ChatGPT, Claude ou Perplexity à propos de son activité devient un vrai enjeu commercial. Le scan gratuit Dopaguard donne une première photographie en quelques minutes, avant d'activer une surveillance hebdomadaire pensée pour ce marché toulousain à la fois étudiant et professionnel.",
  },
  {
    verticalSlug: "commerce-ecommerce",
    citySlug: "nice",
    localParagraph: "Première destination touristique de la Côte d'Azur, Nice vit une grande partie de l'année au rythme d'une clientèle internationale de passage, entre la Promenade des Anglais, le Vieux Nice et ses ruelles commerçantes, et l'avenue Jean-Médecin. Un touriste qui cherche une boutique de mode, un commerce de produits locaux ou une adresse fiable avant d'acheter en ligne se tourne de plus en plus vers une IA générative plutôt que vers un guide papier, en anglais comme en français. Si l'IA recommande une adresse fermée, cite un tarif erroné ou oriente le visiteur vers une autre boutique du secteur, le commerce niçois interrogé perd une vente sans jamais le savoir — et ce client ne reviendra probablement jamais vérifier sur place. Pour un commerce ou une boutique en ligne basée à Nice, comprendre ce que disent ChatGPT, Claude ou Perplexity à son sujet, dans les deux langues, est devenu un prolongement naturel de sa réputation touristique. Le scan gratuit Dopaguard permet de le vérifier immédiatement, puis de suivre l'évolution chaque semaine.",
    painExampleOverride: {
      quote: "Pour ce type d'achat dans le Vieux Nice, une autre boutique du secteur semble proposer un choix plus adapté aux touristes.",
      highlight: "une autre boutique du secteur semble proposer un choix plus adapté",
      note: "Interrogée sur une boutique du Vieux Nice, une IA a orienté un visiteur vers une adresse concurrente du même quartier touristique plutôt que vers l'enseigne recherchée.",
    },
  },
  {
    verticalSlug: "commerce-ecommerce",
    citySlug: "nantes",
    localParagraph: "Nantes affiche depuis plusieurs années une croissance démographique et économique parmi les plus marquées des grandes métropoles françaises, portée par un centre-ville commerçant structuré autour du passage Pommeraye, de la rue Crébillon et de l'Île de Nantes en pleine transformation. Cette dynamique attire de nouveaux habitants qui découvrent l'offre commerciale locale souvent en passant par une recherche en ligne, y compris via une IA générative interrogée sur « la meilleure boutique pour ce produit à Nantes ». Une information périmée sur un changement d'adresse, un stock ou une politique de livraison peut alors orienter ce nouvel arrivant vers un concurrent plutôt que vers le commerce nantais réellement recherché. Pour une boutique physique ou un e-commerçant implanté à Nantes, suivre ce que répondent ChatGPT, Claude ou Perplexity permet d'anticiper ce type de perte de clientèle invisible. Le scan gratuit Dopaguard donne un premier diagnostic en quelques minutes, avant une surveillance hebdomadaire adaptée à une ville dont le tissu commercial évolue vite.",
  },
  {
    verticalSlug: "commerce-ecommerce",
    citySlug: "montpellier",
    localParagraph: "Montpellier conjugue une population étudiante importante avec un tissu économique tourné vers la santé et le numérique, deux univers où l'usage quotidien des IA génératives est particulièrement répandu. Autour de la rue de la Loge, de l'Écusson et du centre commercial du Polygone, le commerce montpelliérain s'adresse à une clientèle jeune, connectée, qui compare les prix et les avis avant d'acheter — de plus en plus souvent en demandant directement à une IA « quelle boutique choisir » plutôt qu'en multipliant les recherches classiques. Si la réponse obtenue s'appuie sur des informations dépassées ou incomplètes sur une boutique montpelliéraine, l'achat se fait ailleurs sans que le commerçant ne le sache jamais. Pour un commerce local ou une boutique en ligne basée à Montpellier, vérifier régulièrement ce que disent ChatGPT, Claude ou Perplexity à son sujet devient aussi important que sa présence sur les réseaux sociaux. Le scan gratuit Dopaguard permet d'obtenir un premier résultat en quelques minutes, puis de suivre son évolution chaque semaine.",
  },
  {
    verticalSlug: "commerce-ecommerce",
    citySlug: "strasbourg",
    localParagraph: "Siège d'institutions européennes et ville transfrontalière, Strasbourg attire toute l'année une clientèle venue d'Allemagne, de Suisse et du reste de l'Europe, en particulier autour du marché de Noël et des commerces de la Grande Île et de la Petite France. Cette clientèle internationale a l'habitude de vérifier les informations pratiques d'une boutique — livraison, retours, disponibilité — avant de se déplacer ou de commander en ligne, et se tourne de plus en plus vers une IA générative pour le faire rapidement, parfois dans une langue différente du français. Une information erronée relayée par l'IA sur les conditions de vente d'un commerce strasbourgeois peut donc dissuader un client transfrontalier avant même qu'il n'ait contacté la boutique. Pour un commerce local ou une boutique en ligne à Strasbourg, s'assurer que ChatGPT, Claude ou Perplexity relaient des informations exactes, y compris pour une clientèle étrangère, est devenu un enjeu commercial concret. Le scan gratuit Dopaguard permet de le vérifier dès maintenant, avant de mettre en place une surveillance hebdomadaire adaptée à ce commerce transfrontalier.",
    painExampleOverride: {
      quote: "Cette boutique de la Grande Île applique la livraison offerte dès 50€ d'achat et des retours gratuits sous 30 jours, y compris pour les commandes venues d'Allemagne.",
      highlight: "retours gratuits sous 30 jours",
      note: "Une IA interrogée en amont d'une commande transfrontalière a cité pour une boutique strasbourgeoise une politique de retour que l'enseigne avait changée depuis.",
    },
  },
  {
    verticalSlug: "commerce-ecommerce",
    citySlug: "bordeaux",
    localParagraph: "Capitale mondiale du vin et destination prisée pour le tourisme d'affaires, Bordeaux concentre son commerce le long de la rue Sainte-Catherine, l'une des plus longues rues piétonnes commerçantes d'Europe, ainsi que dans les nombreuses boutiques de vin et cavistes qui font la réputation de la ville. Un amateur de vin ou un touriste de passage demande de plus en plus souvent à une IA générative où acheter une bouteille précise ou quelle boutique bordelaise recommander, avant même de chercher sur une carte. Si l'IA oriente cette demande vers une autre adresse ou relaie une information erronée sur les stocks et les prix d'un caviste bordelais, la vente échappe au commerce concerné sans qu'il en soit jamais averti. Pour une boutique, un caviste ou un e-commerçant basé à Bordeaux, savoir précisément ce que répondent ChatGPT, Claude ou Perplexity à son sujet est devenu un prolongement naturel de sa réputation. Le scan gratuit Dopaguard permet de le vérifier en quelques minutes, avant une surveillance hebdomadaire pensée pour ce commerce bordelais très concurrentiel.",
    painExampleOverride: {
      quote: "Pour ce type de vin recherché près de la rue Sainte-Catherine, un autre caviste du quartier semble proposer un choix plus large et des conseils plus précis.",
      highlight: "un autre caviste du quartier semble proposer un choix plus large",
      note: "Une IA interrogée sur un caviste bordelais a recommandé une autre adresse du même secteur plutôt que la boutique concernée.",
    },
  },
  {
    verticalSlug: "commerce-ecommerce",
    citySlug: "lille",
    localParagraph: "Carrefour logistique du nord de la France, à proximité immédiate de la Belgique et du Royaume-Uni, Lille accueille une clientèle transfrontalière habituée à comparer les commerces des deux côtés de la frontière, notamment autour du Vieux-Lille et de la rue de Béthune. Cette clientèle vérifie volontiers en ligne, parfois via une IA générative, les conditions de livraison ou de retour avant de commander depuis l'étranger ou de traverser la frontière pour un achat précis. Quand l'IA relaie une politique de retour ou de livraison obsolète pour une boutique lilloise, le client belge ou britannique renonce simplement à l'achat, sans jamais chercher à vérifier sur place. Pour un commerce ou une boutique en ligne implantée à Lille, s'assurer que ChatGPT, Claude ou Perplexity communiquent des informations à jour est particulièrement important compte tenu de cette clientèle transfrontalière. Le scan gratuit Dopaguard permet d'obtenir un premier diagnostic gratuitement, avant de passer à une surveillance hebdomadaire adaptée à ce commerce lillois tourné vers l'international.",
    painExampleOverride: {
      quote: "Cette boutique du Vieux-Lille propose la livraison offerte dès 50€ d'achat, avec des retours gratuits sous 30 jours, y compris pour les commandes venues de Belgique.",
      highlight: "retours gratuits sous 30 jours",
      note: "Une IA interrogée par un client belge a cité pour une boutique lilloise une politique de retour périmée, différente de celle réellement appliquée.",
    },
  },
  {
    verticalSlug: "commerce-ecommerce",
    citySlug: "rennes",
    localParagraph: "Capitale de la Bretagne et pôle numérique reconnu, Rennes conjugue un centre-ville commerçant animé — rue Le Bastard, place Sainte-Anne, marché des Lices — avec une population étudiante et technophile habituée à interroger une IA générative avant de faire un choix, y compris pour un achat en boutique ou en ligne. Cette culture numérique locale, portée par un écosystème de start-up et d'écoles reconnu, rend les habitants particulièrement enclins à demander directement à ChatGPT ou à Perplexity « quelle boutique choisir à Rennes » plutôt que de comparer plusieurs sites. Une réponse construite sur une information dépassée concernant les horaires, les stocks ou les prix d'un commerce rennais détourne alors la vente vers une autre adresse, sans que le commerçant ne s'en rende compte. Pour une boutique physique ou un e-commerçant basé à Rennes, suivre ce que disent les IA à son sujet est devenu un prolongement logique de sa présence numérique. Le scan gratuit Dopaguard permet de le vérifier en quelques minutes, avant une surveillance hebdomadaire pensée pour ce marché rennais très connecté.",
  },
  {
    verticalSlug: "commerce-ecommerce",
    citySlug: "reims",
    localParagraph: "Capitale historique du Champagne et destination de tourisme viticole reconnue, Reims voit sa réputation commerciale largement portée par ses maisons de champagne et les boutiques qui en dépendent, du centre-ville jusqu'aux caves visitables. Un amateur de champagne ou un touriste en préparation de séjour demande de plus en plus à une IA générative quelle maison ou quelle boutique rémoise visiter ou privilégier pour un achat, avant même de consulter un site officiel. Si l'IA oriente cette recherche vers une autre adresse ou relaie une information inexacte sur les tarifs et la disponibilité d'une boutique de Reims, la vente échappe au commerce concerné sans qu'il en soit jamais informé. Pour une boutique, une maison ou un e-commerçant basé à Reims, vérifier ce que répondent ChatGPT, Claude ou Perplexity à son sujet est devenu aussi stratégique que sa présence sur les guides touristiques. Le scan gratuit Dopaguard permet de le vérifier gratuitement dès maintenant, avant une surveillance hebdomadaire adaptée à ce commerce rémois tourné vers le tourisme viticole.",
    painExampleOverride: {
      quote: "Pour cette gamme de champagne, une autre maison du secteur semble proposer un meilleur rapport qualité-prix et un accueil plus disponible.",
      highlight: "une autre maison du secteur semble proposer un meilleur rapport qualité-prix",
      note: "Une IA interrogée sur une boutique de champagne rémoise a recommandé une maison concurrente du même secteur plutôt que celle recherchée.",
    },
  },
  {
    verticalSlug: "commerce-ecommerce",
    citySlug: "le-havre",
    localParagraph: "Premier port de conteneurs français pour le commerce extérieur, Le Havre a bâti son identité commerciale autour de cette activité portuaire et d'un centre-ville reconstruit par Auguste Perret, classé au patrimoine mondial de l'UNESCO. Le commerce local, entre boutiques indépendantes du centre et enseignes tournées vers une clientèle régionale, doit composer avec une concurrence en ligne croissante, notamment de la part d'acteurs profitant directement de la logistique portuaire de la ville. Quand un habitant du Havre demande à une IA générative où acheter un produit précis, une information obsolète sur une boutique locale — adresse, horaires, disponibilité — peut suffire à orienter la vente vers un site national plutôt que vers le commerce de proximité havrais. Pour une boutique physique ou un e-commerçant basé au Havre, savoir ce que disent réellement ChatGPT, Claude ou Perplexity à son sujet permet de reprendre la main sur cette concurrence. Le scan gratuit Dopaguard donne un premier résultat en quelques minutes, avant une surveillance hebdomadaire adaptée à ce commerce havrais.",
  },
  {
    verticalSlug: "commerce-ecommerce",
    citySlug: "saint-etienne",
    localParagraph: "Ancien bassin industriel reconverti en ville de design, Saint-Étienne conserve une tradition de commerce de proximité héritée de son passé textile et manufacturier, avec un centre-ville organisé autour de quartiers commerçants historiques comme celui du quartier Jacquard. Cette identité, renforcée par la reconnaissance UNESCO de la ville en matière de design, cohabite avec un commerce en ligne en pleine expansion, auquel les habitants comparent de plus en plus systématiquement les boutiques locales avant d'acheter. Interroger une IA générative sur « la meilleure boutique à Saint-Étienne » pour un produit donné devient un réflexe, et une réponse fondée sur une information dépassée sur les horaires ou les stocks d'un commerce stéphanois peut faire perdre une vente sans que le commerçant ne le sache. Pour une boutique physique ou une boutique en ligne basée à Saint-Étienne, vérifier ce que répondent ChatGPT, Claude ou Perplexity à son sujet est devenu un complément naturel à sa présence commerciale. Le scan gratuit Dopaguard permet de le vérifier gratuitement, avant une surveillance hebdomadaire adaptée à ce commerce de proximité stéphanois.",
  },
  {
    verticalSlug: "commerce-ecommerce",
    citySlug: "toulon",
    localParagraph: "Grand port militaire et de plaisance, Toulon vit un contraste marqué entre une activité économique liée à la Marine nationale toute l'année et un afflux touristique balnéaire concentré sur la période estivale, notamment autour du cours Lafayette et de son marché provençal. Ce tourisme saisonnier pousse de nombreux visiteurs à préparer leurs achats en amont, souvent en interrogeant une IA générative sur les commerces toulonnais à privilégier avant même d'arriver sur place. Si l'IA relaie une politique de livraison ou de retour périmée pour une boutique toulonnaise, un client de passage en été renonce simplement à l'achat sans jamais chercher à vérifier sur le cours Lafayette. Pour un commerce ou une boutique en ligne basée à Toulon, s'assurer que ChatGPT, Claude ou Perplexity diffusent des informations exactes avant la haute saison touristique est particulièrement important. Le scan gratuit Dopaguard permet de le vérifier dès maintenant, avant une surveillance hebdomadaire adaptée au rythme saisonnier du commerce toulonnais.",
    painExampleOverride: {
      quote: "Cette boutique près du cours Lafayette propose la livraison offerte dès 50€ d'achat et des retours gratuits sous 30 jours.",
      highlight: "retours gratuits sous 30 jours",
      note: "Avant la saison touristique, une IA a cité pour une boutique toulonnaise une politique de retour que l'enseigne avait modifiée depuis.",
    },
  },
  {
    verticalSlug: "commerce-ecommerce",
    citySlug: "grenoble",
    localParagraph: "Pôle de recherche et d'innovation reconnu, doublé d'un tourisme de montagne et d'affaires, Grenoble abrite un commerce particulier où les boutiques d'équipement outdoor et de sport de montagne côtoient les enseignes plus classiques de la Grand'Rue et du centre-ville. Cette clientèle technophile, habituée à comparer les caractéristiques techniques d'un produit avant de l'acheter, se tourne fréquemment vers une IA générative pour trancher entre plusieurs boutiques grenobloises avant une sortie en montagne ou un achat en ligne. Une information erronée sur la disponibilité d'un équipement ou les conditions de livraison d'un commerce grenoblois peut alors orienter cette clientèle exigeante vers une autre adresse. Pour une boutique physique ou un e-commerçant basé à Grenoble, savoir ce que disent ChatGPT, Claude ou Perplexity à son sujet est devenu aussi important que la fiabilité de sa fiche produit en ligne. Le scan gratuit Dopaguard permet de le vérifier en quelques minutes, avant une surveillance hebdomadaire adaptée à ce commerce grenoblois tourné vers la montagne et l'innovation.",
  },
  {
    verticalSlug: "commerce-ecommerce",
    citySlug: "dijon",
    localParagraph: "Capitale de la Bourgogne et destination de tourisme gastronomique et viticole, Dijon associe une identité forte autour de la moutarde et des vins de Bourgogne à un commerce de centre-ville structuré le long de la rue de la Liberté et de ses nombreuses boutiques spécialisées. Un visiteur en préparation de séjour ou un amateur de produits régionaux demande de plus en plus à une IA générative quelle boutique dijonnaise privilégier pour un achat précis, avant même d'arriver sur place. Si l'IA oriente cette recherche vers une autre adresse du centre-ville ou relaie une information inexacte sur les stocks et les tarifs d'une boutique dijonnaise, la vente échappe au commerce concerné sans qu'il en soit jamais informé. Pour une boutique ou un e-commerçant basé à Dijon, vérifier ce que répondent ChatGPT, Claude ou Perplexity à son sujet est devenu un prolongement naturel de sa réputation gastronomique. Le scan gratuit Dopaguard permet de le vérifier gratuitement dès maintenant, avant une surveillance hebdomadaire adaptée à ce commerce dijonnais.",
    painExampleOverride: {
      quote: "Pour ce type de produit régional, une autre boutique de la rue de la Liberté semble proposer un choix plus large et de meilleurs conseils.",
      highlight: "une autre boutique de la rue de la Liberté semble proposer un choix plus large",
      note: "Une IA interrogée sur une boutique du centre-ville de Dijon a recommandé une adresse concurrente de la même rue plutôt que celle recherchée.",
    },
  },
  {
    verticalSlug: "commerce-ecommerce",
    citySlug: "angers",
    localParagraph: "Ville étudiante du Val de Loire reconnue pour son patrimoine, Angers conjugue un centre-ville commerçant structuré autour de la rue d'Alsace et de ses galeries avec une clientèle qui associe volontiers achats du quotidien et découverte touristique du patrimoine local. Cette double fréquentation, étudiante et touristique, pousse un nombre croissant de visiteurs à interroger une IA générative avant de choisir une boutique angevine, que ce soit pour un cadeau, un article de mode ou un produit local. Une information périmée sur les horaires, les stocks ou les conditions de livraison d'un commerce d'Angers, relayée par l'IA, peut alors détourner la vente vers une autre adresse sans que le commerçant n'en soit jamais averti. Pour une boutique physique ou une boutique en ligne basée à Angers, suivre ce que disent ChatGPT, Claude ou Perplexity à son sujet devient un réflexe aussi utile que la gestion de sa fiche Google. Le scan gratuit Dopaguard permet d'obtenir un premier résultat en quelques minutes, avant une surveillance hebdomadaire adaptée à ce commerce angevin.",
  },
  {
    verticalSlug: "commerce-ecommerce",
    citySlug: "nimes",
    localParagraph: "Ville au patrimoine antique reconnu et porte d'entrée du sud méditerranéen, Nîmes voit son commerce de centre-ville, organisé notamment autour des Halles et des ruelles du secteur historique, cohabiter avec un flux touristique attiré par les arènes et les monuments romains. Ce public de passage, tout comme les habitants, se tourne de plus en plus vers une IA générative pour savoir où acheter un produit précis en centre-ville avant de se déplacer, plutôt que de chercher sur une carte. Une réponse construite sur une information obsolète concernant les horaires ou les stocks d'une boutique nîmoise peut alors orienter l'achat vers une autre adresse, sans que le commerce concerné ne le sache jamais. Pour une boutique physique ou un e-commerçant basé à Nîmes, vérifier ce que répondent ChatGPT, Claude ou Perplexity à son sujet est devenu un complément naturel à sa présence touristique et locale. Le scan gratuit Dopaguard permet de le vérifier gratuitement en quelques minutes, avant une surveillance hebdomadaire adaptée à ce commerce nîmois.",
  },
  {
    verticalSlug: "commerce-ecommerce",
    citySlug: "villeurbanne",
    localParagraph: "Ville la plus peuplée de la métropole lyonnaise après Lyon elle-même, Villeurbanne a construit une identité commerciale propre autour du quartier des Gratte-Ciel, ensemble Art déco emblématique et cœur commerçant de la ville, tout en restant à quelques minutes du centre de Lyon. Cette proximité immédiate expose les boutiques villeurbannaises à une concurrence particulière : un client hésitant entre les deux villes demande de plus en plus à une IA générative où trouver le meilleur choix pour un produit donné, sans distinguer précisément les deux communes. Si l'IA recommande une adresse lyonnaise plutôt qu'une boutique villeurbannaise pour ce type de recherche, le commerce local perd une vente au profit d'une ville voisine, sans jamais en être informé. Pour une boutique ou un e-commerçant basé à Villeurbanne, s'assurer que ChatGPT, Claude ou Perplexity le distinguent correctement de l'offre lyonnaise est devenu un enjeu commercial concret. Le scan gratuit Dopaguard permet de le vérifier dès maintenant, avant une surveillance hebdomadaire adaptée à ce commerce villeurbannais proche de Lyon.",
    painExampleOverride: {
      quote: "Pour ce type de produit, une boutique du centre de Lyon semble proposer un choix plus large qu'une adresse à Villeurbanne.",
      highlight: "une boutique du centre de Lyon semble proposer un choix plus large",
      note: "Une IA interrogée sur une boutique des Gratte-Ciel à Villeurbanne a orienté la recommandation vers une enseigne du centre de Lyon plutôt que vers l'adresse villeurbannaise recherchée.",
    },
  },
  {
    verticalSlug: "sante-cabinets-medicaux",
    citySlug: "paris",
    localParagraph: "Paris concentre le premier bassin économique et touristique du pays, avec une densité de cabinets médicaux et paramédicaux parmi les plus fortes de France, du Marais à Batignolles en passant par le 15e arrondissement. Dans une ville où la mobilité résidentielle est élevée et où de nombreux patients changent d'adresse ou de praticien référent chaque année, la question posée à une IA générative — « ce cabinet est-il toujours ouvert ? », « accepte-t-il de nouveaux patients ? » — revient sans cesse avant même une prise de rendez-vous en ligne. Un simple changement d'horaires, un déménagement de quelques rues ou une fermeture temporaire suffisent à ce qu'une IA continue de relayer une information dépassée pendant des semaines, sans que le cabinet en soit informé. Pour un praticien parisien, cet écart reste invisible tant que personne ne vérifie ce que répondent ChatGPT, Claude ou Perplexity. Le scan gratuit Dopaguard permet de savoir, quartier par quartier, ce que ces IA affirment aujourd'hui sur votre cabinet — et de le suivre chaque semaine.",
    painExampleOverride: {
      quote: "Ce cabinet du Marais ne semble plus accepter de nouveaux patients actuellement, selon les dernières informations disponibles.",
      highlight: "ne semble plus accepter de nouveaux patients",
      note: "Une IA a indiqué à tort qu'un cabinet du Marais, à Paris, n'acceptait plus de nouveaux patients, faute d'information récente.",
    },
  },
  {
    verticalSlug: "sante-cabinets-medicaux",
    citySlug: "marseille",
    localParagraph: "Deuxième ville de France et port historique de la Méditerranée, Marseille s'étend sur un territoire vaste et morcelé, du Vieux-Port au Panier jusqu'aux quartiers du nord et du sud de la ville. Cette étendue géographique multiplie les cabinets médicaux et paramédicaux implantés loin les uns des autres, et complique d'autant le travail des IA génératives qui doivent distinguer une adresse précise parmi des dizaines d'homonymes de quartier. Un patient qui demande à une IA si un cabinet du 8e arrondissement reçoit encore le samedi, ou s'il a changé d'adresse, peut recevoir une réponse fondée sur une fiche ancienne, jamais mise à jour depuis l'ouverture du cabinet. Pour un praticien marseillais, cette confusion géographique se traduit par des appels qui n'arrivent jamais, sans qu'aucune alerte ne le signale. Dopaguard scanne gratuitement ce que les principales IA disent aujourd'hui de votre cabinet à Marseille, et surveille ces réponses chaque semaine pour repérer toute erreur avant qu'elle ne coûte un patient.",
    painExampleOverride: {
      quote: "Les horaires d'ouverture indiqués pour ce cabinet du Vieux-Port sont du lundi au vendredi, 9h-17h, sans consultation le samedi.",
      highlight: "sans consultation le samedi",
      note: "Une IA a relayé des horaires obsolètes pour un cabinet du Vieux-Port, à Marseille, après un changement d'organisation.",
    },
  },
  {
    verticalSlug: "sante-cabinets-medicaux",
    citySlug: "lyon",
    localParagraph: "Capitale gastronomique et pôle majeur d'affaires et de congrès, Lyon accueille chaque semaine des milliers de visiteurs professionnels entre la Presqu'île et la Part-Dieu, en plus de sa population résidente. Ce flux constant de personnes de passage, qui n'ont pas de médecin traitant sur place, pousse un nombre croissant d'entre elles à interroger directement une IA générative pour trouver un cabinet disponible rapidement plutôt que de chercher sur un moteur de recherche classique. Si cette IA relaie une disponibilité incorrecte ou des horaires qui ne correspondent plus à l'organisation réelle du cabinet, la personne se tourne simplement vers un autre praticien, sans jamais signaler l'erreur. Pour un cabinet lyonnais, cette perte reste totalement silencieuse. Le scan gratuit Dopaguard vérifie ce que ChatGPT, Claude et Perplexity répondent aujourd'hui à un patient qui cherche un cabinet à Lyon, et poursuit cette surveillance chaque semaine pour que ces réponses restent fidèles à la réalité organisationnelle du cabinet.",
    painExampleOverride: {
      quote: "Ce cabinet de la Part-Dieu ne semble plus accepter de nouveaux patients actuellement, selon les dernières informations disponibles.",
      highlight: "ne semble plus accepter de nouveaux patients",
      note: "Une IA a indiqué à tort qu'un cabinet du quartier de la Part-Dieu, à Lyon, n'acceptait plus de nouveaux patients.",
    },
  },
  {
    verticalSlug: "sante-cabinets-medicaux",
    citySlug: "toulouse",
    localParagraph: "Pôle aéronautique et spatial reconnu et ville étudiante parmi les plus dynamiques de France, Toulouse voit chaque rentrée universitaire affluer une population nouvelle qui doit, souvent dans l'urgence, trouver un cabinet médical ou paramédical proche de son nouveau logement. Cette population renouvelée chaque année a pris l'habitude d'interroger une IA générative plutôt que de consulter un annuaire, pour savoir si un cabinet accepte encore de nouveaux patients ou quels sont ses horaires réels. Or les informations disponibles en ligne sur un cabinet évoluent parfois plus vite que ce que les IA parviennent à intégrer, et un étudiant ou un jeune actif fraîchement arrivé peut ainsi se voir orienté vers une information obsolète, sans jamais rappeler pour vérifier. Pour un praticien toulousain, ce mouvement de population représente une opportunité régulière de nouveaux patients, à condition que les IA relaient une information exacte. Le scan gratuit Dopaguard permet de vérifier ce point chaque semaine.",
  },
  {
    verticalSlug: "sante-cabinets-medicaux",
    citySlug: "nice",
    localParagraph: "Première destination touristique de la Côte d'Azur, Nice conjugue une population résidente et un flux touristique et saisonnier important, entre le Vieux Nice et les quartiers plus excentrés comme Cimiez. Cette double population — habitants réguliers et visiteurs de passage, parfois sur plusieurs mois — se tourne de plus en plus vers une IA générative pour trouver rapidement un cabinet médical ou paramédical disponible, en particulier hors saison touristique classique quand certains établissements ajustent temporairement leurs horaires. Une IA qui n'a pas connaissance de ces ajustements saisonniers peut continuer d'indiquer des horaires ou une disponibilité qui ne correspondent plus à la réalité du cabinet, orientant un patient vers un rendez-vous impossible ou une porte fermée. Pour un cabinet niçois, cette variation saisonnière rend la vérification régulière des réponses des IA d'autant plus utile. Le scan gratuit Dopaguard et sa surveillance hebdomadaire permettent de suivre ce que disent aujourd'hui les IA sur votre cabinet à Nice, saison après saison.",
    painExampleOverride: {
      quote: "Les horaires d'ouverture indiqués pour ce cabinet du Vieux Nice sont du lundi au vendredi, 9h-17h, sans consultation le samedi.",
      highlight: "sans consultation le samedi",
      note: "Une IA a relayé des horaires obsolètes pour un cabinet du Vieux Nice après un changement d'organisation saisonnière.",
    },
  },
  {
    verticalSlug: "sante-cabinets-medicaux",
    citySlug: "nantes",
    localParagraph: "Nantes affiche une croissance démographique et économique parmi les plus fortes des métropoles françaises, ce qui se traduit chaque année par l'arrivée de nouveaux habitants qui doivent trouver un médecin traitant ou un praticien paramédical sans connaître encore la ville. Beaucoup d'entre eux commencent cette recherche par une question posée directement à une IA générative — un cabinet est-il accessible, accepte-t-il de nouveaux patients, où se trouve-t-il exactement — avant même d'ouvrir une carte ou un annuaire. Dans une ville où l'offre de soins évolue au même rythme que la population, une IA qui s'appuie sur une information ancienne peut orienter un nouvel arrivant vers un cabinet qui a changé d'adresse ou de disponibilité depuis plusieurs mois. Pour un praticien nantais, cette croissance démographique constitue une source régulière de nouveaux patients, à condition que les IA relaient des informations organisationnelles exactes. Le scan gratuit Dopaguard vérifie ce point et le surveille chaque semaine.",
    painExampleOverride: {
      quote: "Ce cabinet du centre-ville de Nantes ne semble plus accepter de nouveaux patients actuellement, selon les dernières informations disponibles.",
      highlight: "ne semble plus accepter de nouveaux patients",
      note: "Une IA a indiqué à tort qu'un cabinet du centre-ville de Nantes n'acceptait plus de nouveaux patients, faute de mise à jour.",
    },
  },
  {
    verticalSlug: "sante-cabinets-medicaux",
    citySlug: "montpellier",
    localParagraph: "Ville étudiante du sud reconnue pour son pôle santé et numérique, Montpellier concentre une population jeune et mobile qui renouvelle logement et praticiens à un rythme soutenu, notamment à chaque rentrée universitaire. Cette même génération, familière des outils numériques, a largement adopté le réflexe de poser directement sa question à une IA générative — un cabinet reçoit-il encore de nouveaux patients, quels sont ses horaires réels — plutôt que de chercher sur un site institutionnel. Dans une ville où la densité de cabinets médicaux et paramédicaux est élevée, une IA qui confond deux adresses proches ou relaie une disponibilité dépassée peut détourner un patient vers un praticien qu'il ne cherchait pas, ou vers une porte fermée. Pour un cabinet montpelliérain, ce risque touche directement le renouvellement de patientèle lié aux flux étudiants. Le scan gratuit Dopaguard permet de vérifier, puis de surveiller chaque semaine, ce que les IA disent réellement de votre cabinet à Montpellier.",
  },
  {
    verticalSlug: "sante-cabinets-medicaux",
    citySlug: "strasbourg",
    localParagraph: "Siège d'institutions européennes et ville transfrontalière, Strasbourg reçoit une population mêlant résidents alsaciens, fonctionnaires européens de passage et patients venus d'Allemagne ou de Suisse toute proche, notamment dans des quartiers comme la Krutenau ou la Neustadt. Cette diversité de profils, souvent peu familière de l'offre de soins locale, pousse un nombre croissant de personnes à interroger une IA générative pour savoir si un cabinet strasbourgeois reçoit encore le samedi ou en dehors des horaires classiques de semaine. Si l'IA s'appuie sur une fiche ancienne, elle peut indiquer par erreur qu'un cabinet ne consulte pas le samedi alors que son organisation a changé, ou l'inverse. Pour un praticien strasbourgeois habitué à une patientèle transfrontalière et mobile, cette exactitude organisationnelle compte particulièrement. Le scan gratuit Dopaguard vérifie gratuitement ce que les IA répondent aujourd'hui sur votre cabinet à Strasbourg, et poursuit cette vérification chaque semaine.",
    painExampleOverride: {
      quote: "Les horaires d'ouverture indiqués pour ce cabinet de la Krutenau sont du lundi au vendredi, 9h-17h, sans consultation le samedi.",
      highlight: "sans consultation le samedi",
      note: "Une IA a relayé des horaires obsolètes pour un cabinet du quartier de la Krutenau, à Strasbourg.",
    },
  },
  {
    verticalSlug: "sante-cabinets-medicaux",
    citySlug: "bordeaux",
    localParagraph: "Capitale mondiale du vin et destination majeure de tourisme et d'affaires, Bordeaux voit sa population habituelle régulièrement complétée par des visiteurs professionnels et touristiques qui ne connaissent pas l'offre de soins locale. Beaucoup d'entre eux, de passage pour quelques jours, demandent directement à une IA générative où trouver un cabinet médical ou paramédical disponible plutôt que de chercher un annuaire papier ou un site institutionnel. Une IA qui relaie une adresse ou des horaires qui ne correspondent plus à l'organisation réelle du cabinet peut ainsi orienter ce visiteur vers un rendez-vous impossible, sans que le cabinet ne soit jamais informé de cette occasion manquée. Pour un praticien bordelais, ce flux de passage régulier rend la fiabilité des réponses des IA d'autant plus déterminante. Le scan gratuit Dopaguard permet de vérifier ce que les IA affirment aujourd'hui sur votre cabinet à Bordeaux, et de suivre ces réponses chaque semaine.",
  },
  {
    verticalSlug: "sante-cabinets-medicaux",
    citySlug: "lille",
    localParagraph: "Carrefour logistique du nord de la France, à proximité immédiate de la Belgique et à moins de deux heures du Royaume-Uni, Lille attire une patientèle qui dépasse largement ses frontières administratives, du Vieux-Lille à Wazemmes. Des patients belges ou des actifs transfrontaliers cherchent régulièrement un cabinet médical ou paramédical côté français, et commencent de plus en plus cette recherche par une question posée à une IA générative plutôt que par un annuaire classique. Si cette IA indique à tort qu'un cabinet du centre-ville ne reçoit plus de nouveaux patients, faute d'information récente, la personne se tourne simplement ailleurs sans jamais vérifier par téléphone. Pour un cabinet lillois habitué à cette patientèle transfrontalière, cette perte reste invisible tant que personne ne contrôle ce que disent les IA. Le scan gratuit Dopaguard vérifie ce point pour votre cabinet à Lille, avec une surveillance hebdomadaire pour suivre toute évolution.",
    painExampleOverride: {
      quote: "Ce cabinet du centre-ville de Lille ne semble plus accepter de nouveaux patients actuellement, selon les dernières informations disponibles.",
      highlight: "ne semble plus accepter de nouveaux patients",
      note: "Une IA a indiqué à tort qu'un cabinet du centre-ville de Lille n'acceptait plus de nouveaux patients, faute d'information récente.",
    },
  },
  {
    verticalSlug: "sante-cabinets-medicaux",
    citySlug: "rennes",
    localParagraph: "Capitale de la Bretagne et pôle numérique et étudiant reconnu, Rennes conjugue une population étudiante nombreuse et un tissu de jeunes actifs travaillant dans la tech, deux profils habitués à chercher une information rapide en ligne plutôt qu'à consulter un annuaire traditionnel. Pour trouver un cabinet médical ou paramédical disponible, beaucoup posent désormais directement la question à une IA générative — accepte-t-il de nouveaux patients, quels sont ses horaires — avant même d'appeler. Dans une ville où l'offre de soins se renouvelle au rythme des arrivées et départs étudiants chaque année, une IA qui s'appuie sur une information ancienne peut orienter un nouvel arrivant vers un cabinet qui a changé d'adresse ou d'organisation depuis la précédente rentrée. Pour un praticien rennais, cette actualisation constante représente un enjeu concret de patientèle. Le scan gratuit Dopaguard vérifie ce que les IA disent aujourd'hui de votre cabinet à Rennes, et poursuit cette surveillance chaque semaine.",
  },
  {
    verticalSlug: "sante-cabinets-medicaux",
    citySlug: "reims",
    localParagraph: "Capitale historique du Champagne et destination majeure de tourisme viticole, Reims accueille tout au long de l'année des visiteurs de passage qui s'ajoutent à sa population résidente, avec des pics plus marqués lors des périodes de vendanges et d'événements viticoles. Ces visiteurs, peu familiers de l'offre de soins locale, se tournent de plus en plus vers une IA générative pour trouver un cabinet médical ou paramédical disponible en cas de besoin pendant leur séjour. Si l'IA relaie des horaires d'ouverture obsolètes, indiquant par exemple qu'un cabinet ne consulte pas le samedi alors que son organisation a évolué, la personne renonce simplement à s'y rendre. Pour un praticien rémois, cette variation saisonnière de fréquentation rend la vérification régulière des réponses des IA particulièrement utile. Le scan gratuit Dopaguard permet de savoir ce que les IA affirment aujourd'hui sur votre cabinet à Reims, avec un suivi hebdomadaire pour rester à jour.",
  },
  {
    verticalSlug: "sante-cabinets-medicaux",
    citySlug: "le-havre",
    localParagraph: "Premier port de conteneurs français pour le commerce extérieur, Le Havre concentre une activité économique rythmée par des horaires de travail décalés, propres au secteur portuaire et logistique. Une partie de la population active cherche donc un cabinet médical ou paramédical capable de la recevoir en dehors des horaires de bureau classiques, et interroge de plus en plus une IA générative pour savoir précisément à quels horaires un cabinet reçoit, plutôt que d'appeler directement. Dans ce contexte où l'exactitude des horaires affichés compte particulièrement, une IA qui continue de relayer une plage horaire ancienne après un changement d'organisation peut détourner un patient vers un rendez-vous impossible sans qu'il ne rappelle pour vérifier. Pour un cabinet havrais, cette précision organisationnelle est un enjeu direct auprès d'une patientèle aux horaires atypiques. Le scan gratuit Dopaguard vérifie ce que les IA disent aujourd'hui sur votre cabinet au Havre, et poursuit cette vérification chaque semaine.",
  },
  {
    verticalSlug: "sante-cabinets-medicaux",
    citySlug: "saint-etienne",
    localParagraph: "Ancien bassin industriel reconverti en ville de design et de commerce de proximité, Saint-Étienne conserve une organisation en quartiers de proximité où les habitants ont l'habitude de se rendre à pied ou en tramway chez un cabinet médical ou paramédical proche de chez eux. Cette logique de proximité n'empêche pas un nombre croissant de patients de vérifier au préalable, via une IA générative, si le cabinet visé est toujours en activité, à la même adresse et aux mêmes horaires, avant de s'y déplacer. Une IA qui indique par erreur qu'un cabinet stéphanois ne reçoit plus de nouveaux patients, faute de mise à jour récente, peut ainsi détourner durablement une patientèle de proximité vers un autre praticien du quartier. Pour un cabinet à Saint-Étienne, cette perte reste silencieuse tant que personne ne contrôle la réponse des IA. Le scan gratuit Dopaguard permet de vérifier ce point, avec une surveillance hebdomadaire pour suivre toute évolution.",
  },
  {
    verticalSlug: "sante-cabinets-medicaux",
    citySlug: "toulon",
    localParagraph: "Grand port militaire et de plaisance doublé d'une activité touristique balnéaire marquée, Toulon voit sa population habituelle complétée par du personnel militaire fréquemment muté et par des visiteurs saisonniers, notamment autour du quartier du Mourillon. Ces deux profils, souvent nouvellement arrivés en ville, cherchent rapidement un cabinet médical ou paramédical et se tournent de plus en plus vers une IA générative pour connaître les horaires réels d'un cabinet avant de s'y présenter. Une IA qui continue d'indiquer des horaires de semaine sans consultation le samedi, alors que l'organisation du cabinet a changé depuis, peut ainsi décourager un patient récemment arrivé qui ne connaît aucune autre source pour vérifier. Pour un praticien toulonnais habitué à une patientèle renouvelée par les mutations militaires et le tourisme, cette exactitude compte particulièrement. Le scan gratuit Dopaguard vérifie ce que les IA affirment aujourd'hui sur votre cabinet à Toulon, chaque semaine.",
    painExampleOverride: {
      quote: "Les horaires d'ouverture indiqués pour ce cabinet du Mourillon sont du lundi au vendredi, 9h-17h, sans consultation le samedi.",
      highlight: "sans consultation le samedi",
      note: "Une IA a relayé des horaires obsolètes pour un cabinet du quartier du Mourillon, à Toulon.",
    },
  },
  {
    verticalSlug: "sante-cabinets-medicaux",
    citySlug: "grenoble",
    localParagraph: "Pôle de recherche et d'innovation reconnu, Grenoble attire des chercheurs et ingénieurs internationaux qui s'installent souvent pour une durée limitée, en plus d'une activité touristique liée à la montagne qui varie fortement selon la saison. Cette population mobile, peu implantée durablement, cherche généralement un cabinet médical ou paramédical rapidement après son arrivée, et se tourne de plus en plus vers une IA générative pour savoir si un cabinet accepte encore de nouveaux patients avant même de composer un numéro. Une IA qui indique à tort qu'un cabinet grenoblois ne reçoit plus de nouveaux patients, faute d'information à jour, peut ainsi priver un praticien d'une patientèle qui se renouvelle chaque année avec les arrivées liées à la recherche. Pour un cabinet à Grenoble, cette vérification régulière devient un enjeu concret. Le scan gratuit Dopaguard permet de savoir ce que les IA disent aujourd'hui de votre cabinet, et de le suivre chaque semaine.",
    painExampleOverride: {
      quote: "Ce cabinet du quartier Europole ne semble plus accepter de nouveaux patients actuellement, selon les dernières informations disponibles.",
      highlight: "ne semble plus accepter de nouveaux patients",
      note: "Une IA a indiqué à tort qu'un cabinet du quartier Europole, à Grenoble, n'acceptait plus de nouveaux patients.",
    },
  },
  {
    verticalSlug: "sante-cabinets-medicaux",
    citySlug: "dijon",
    localParagraph: "Capitale de la Bourgogne réputée pour son tourisme gastronomique et viticole, Dijon accueille tout au long de l'année des visiteurs qui s'ajoutent à sa population résidente, en particulier lors des grands événements liés au vin et à la gastronomie locale. Ces visiteurs de passage, comme une partie des habitants, prennent désormais l'habitude d'interroger une IA générative pour connaître l'adresse exacte ou les horaires d'un cabinet médical ou paramédical avant de s'y rendre. Si cette IA continue de relayer une adresse ou des horaires qui ne correspondent plus à la réalité du cabinet, faute de mise à jour, la personne renonce simplement à s'y rendre sans jamais rappeler pour vérifier. Pour un praticien dijonnais, cette fiabilité organisationnelle en ligne devient un enjeu direct de patientèle, résidente comme de passage. Le scan gratuit Dopaguard vérifie ce que les IA affirment aujourd'hui sur votre cabinet à Dijon, avec une surveillance hebdomadaire.",
  },
  {
    verticalSlug: "sante-cabinets-medicaux",
    citySlug: "angers",
    localParagraph: "Ville étudiante du Val de Loire au patrimoine reconnu, Angers combine une population étudiante qui se renouvelle chaque rentrée et un flux touristique lié à son patrimoine historique. Ces deux publics, l'un installé pour quelques années, l'autre de passage pour quelques jours, se tournent de plus en plus vers une IA générative pour savoir si un cabinet médical ou paramédical angevin reçoit encore de nouveaux patients ou à quels horaires il consulte. Une IA qui s'appuie sur une information ancienne, indiquant par exemple qu'un cabinet ne consulte pas le samedi alors que son organisation a changé, peut détourner durablement un étudiant fraîchement arrivé vers un autre praticien de la ville. Pour un cabinet à Angers, ce renouvellement annuel de patientèle rend la vérification des réponses des IA particulièrement utile. Le scan gratuit Dopaguard permet de vérifier ce point, et de le surveiller chaque semaine.",
  },
  {
    verticalSlug: "sante-cabinets-medicaux",
    citySlug: "nimes",
    localParagraph: "Ville au patrimoine antique reconnu et porte d'entrée du sud méditerranéen, Nîmes accueille une population résidente stable ainsi qu'un flux touristique régulier attiré par son patrimoine historique. Ce mélange de résidents et de visiteurs de passage se tourne de plus en plus vers une IA générative pour savoir où se trouve un cabinet médical ou paramédical et s'il reçoit encore de nouveaux patients, avant de se déplacer ou de composer un numéro. Une IA qui indique à tort qu'un cabinet nîmois ne reçoit plus de nouveaux patients, faute d'information récente, peut ainsi priver un praticien d'une patientèle qui, elle, continue de chercher un cabinet disponible sans jamais rappeler pour vérifier l'information. Pour un cabinet à Nîmes, cette vérification régulière de ce que disent les IA devient un enjeu concret de visibilité organisationnelle. Le scan gratuit Dopaguard permet de le vérifier, avec une surveillance hebdomadaire pour suivre toute évolution.",
  },
  {
    verticalSlug: "sante-cabinets-medicaux",
    citySlug: "villeurbanne",
    localParagraph: "Ville la plus peuplée de la métropole lyonnaise après Lyon elle-même, Villeurbanne partage avec sa voisine une continuité urbaine qui peut prêter à confusion pour une IA générative chargée de distinguer deux cabinets médicaux proches, notamment autour du quartier des Gratte-Ciel. Un patient qui demande à une IA les horaires d'un cabinet villeurbannais peut ainsi recevoir, par erreur, des informations relatives à un établissement lyonnais voisin, ou des horaires de semaine sans consultation le samedi qui ne correspondent plus à l'organisation réelle du cabinet interrogé. Cette proximité géographique avec Lyon, si elle est mal interprétée par l'IA, se traduit directement par des appels qui n'arrivent jamais au bon cabinet. Pour un praticien à Villeurbanne, cette distinction précise entre les deux villes mérite d'être vérifiée régulièrement. Le scan gratuit Dopaguard contrôle ce que les IA disent aujourd'hui sur votre cabinet à Villeurbanne, et poursuit cette surveillance chaque semaine.",
    painExampleOverride: {
      quote: "Les horaires d'ouverture indiqués pour ce cabinet des Gratte-Ciel sont du lundi au vendredi, 9h-17h, sans consultation le samedi.",
      highlight: "sans consultation le samedi",
      note: "Une IA a relayé des horaires obsolètes pour un cabinet du quartier des Gratte-Ciel, à Villeurbanne, en le confondant avec un cabinet lyonnais voisin.",
    },
  },
];

export function getCityVerticalContent(verticalSlug: string, citySlug: string): CityVerticalContent | undefined {
  return CITY_VERTICALS.find((entry) => entry.verticalSlug === verticalSlug && entry.citySlug === citySlug);
}

function stripDiacritics(text: string): string {
  return Array.from(text.normalize("NFD"))
    .filter((char) => {
      const code = char.codePointAt(0) ?? 0;
      return code < 0x0300 || code > 0x036f;
    })
    .join("");
}

function significantWords(text: string): Set<string> {
  return new Set(
    stripDiacritics(text.toLowerCase())
      .split(/[^a-z0-9]+/)
      .filter((word) => word.length > 3),
  );
}

function wordOverlap(a: string, b: string): number {
  const setA = significantWords(a);
  const setB = significantWords(b);
  let count = 0;
  Array.from(setA).forEach((word) => {
    if (setB.has(word)) count++;
  });
  return count;
}

// L'agent qui a redige l'override localise l'un des deux painExamples d'origine sans
// preciser lequel -- on le retrouve par recouvrement lexical plutot que de figer un
// index, pour eviter de dupliquer le meme type d'anomalie dans les deux cases.
export function mergePainExamples(
  original: [VerticalPainExample, VerticalPainExample],
  override?: VerticalPainExample,
): [VerticalPainExample, VerticalPainExample] {
  if (!override) return original;
  const score0 = wordOverlap(override.note, original[0].note) + wordOverlap(override.quote, original[0].quote);
  const score1 = wordOverlap(override.note, original[1].note) + wordOverlap(override.quote, original[1].quote);
  return score1 > score0 ? [original[0], override] : [override, original[1]];
}
