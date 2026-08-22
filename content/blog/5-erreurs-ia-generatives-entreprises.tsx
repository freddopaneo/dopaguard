export default function ArticleBody() {
  return (
    <>
      <p>
        De plus en plus de décisions d&apos;achat commencent par une question posée à une IA plutôt qu&apos;à un
        moteur de recherche. Un prospect ouvre ChatGPT, Claude, Gemini ou Perplexity et demande simplement « quel est
        le meilleur cabinet comptable près de chez moi » ou « que penser de telle entreprise ». La réponse qu&apos;il
        reçoit devient, pour lui, la vérité. Le problème, c&apos;est que cette vérité n&apos;est pas toujours exacte.
        Une erreur IA entreprise peut prendre plusieurs formes, plus ou moins visibles, plus ou moins dommageables.
        Certaines sont de simples approximations, d&apos;autres relèvent carrément de la fabrication d&apos;informations
        qui n&apos;existent pas. Voici les cinq types d&apos;anomalies les plus fréquents que l&apos;on observe lorsqu&apos;on
        surveille ce que les IA génératives racontent sur une entreprise, avec pour chacune un exemple illustratif et
        les raisons pour lesquelles elle mérite d&apos;être prise au sérieux.
      </p>

      <h2 className="font-semibold text-dopaguard-navy">1. L&apos;erreur factuelle</h2>
      <p>
        C&apos;est la catégorie la plus courante et la plus insidieuse, parce qu&apos;elle ressemble à une réponse
        parfaitement normale. L&apos;IA cite un tarif qui n&apos;est plus d&apos;actualité, une adresse que
        l&apos;entreprise a quittée depuis longtemps, ou pire, confond son activité avec celle d&apos;une structure
        homonyme. Imaginons un artisan qui a déménagé son atelier il y a deux ans : une IA interrogée sur son adresse
        pourrait encore indiquer l&apos;ancien local, orientant des clients vers un lieu vide. Ou imaginons un cabinet
        indépendant proposant du conseil en gestion de patrimoine, qu&apos;une IA pourrait décrire à tort comme un
        cabinet d&apos;expertise comptable pure, parce que son nom ou son secteur prête à confusion avec un
        concurrent voisin.
      </p>
      <p>
        Ce type de chatgpt erreur factuelle a un coût direct : un client qui se déplace au mauvais endroit, un
        prospect qui abandonne parce que le tarif annoncé lui semble trop élevé alors qu&apos;il a changé depuis, ou
        simplement une image brouillée de ce que fait réellement l&apos;entreprise. Contrairement à une page web
        obsolète que l&apos;on peut corriger soi-même, une réponse générée par une IA échappe totalement au contrôle
        du dirigeant tant qu&apos;il ne sait pas qu&apos;elle existe.
      </p>

      <h2 className="font-semibold text-dopaguard-navy">2. Le sentiment négatif relayé comme récent</h2>
      <p>
        Les modèles de langage s&apos;appuient sur des données glanées à des moments différents, sans toujours
        indiquer clairement leur ancienneté. Résultat : un avis client négatif, publié il y a plusieurs années et
        depuis largement compensé par des retours positifs, peut ressurgir dans une réponse comme s&apos;il reflétait
        la situation actuelle. Imaginons un restaurant qui a connu un incident de service ponctuel signalé dans un
        commentaire en ligne, puis qui a corrigé le problème et enchaîné les avis élogieux depuis : une IA pourrait
        malgré tout résumer sa réputation autour de cet épisode isolé, en donnant l&apos;impression qu&apos;il
        s&apos;agit d&apos;un problème structurel et actuel.
      </p>
      <p>
        L&apos;enjeu ici n&apos;est pas la véracité brute de l&apos;information à l&apos;instant où elle a été
        publiée, mais sa pertinence aujourd&apos;hui. Une entreprise qui a progressé mérite que son image progresse
        avec elle. Quand une IA fige une réputation dans le passé, elle prive l&apos;entreprise du bénéfice de ses
        efforts récents, sans qu&apos;aucune alerte ne prévienne le dirigeant que cette perception erronée circule.
      </p>

      <h2 className="font-semibold text-dopaguard-navy">3. Le concurrent recommandé sans raison objective</h2>
      <p>
        Certaines réponses orientent discrètement l&apos;utilisateur vers une autre entreprise, sans justification
        claire. Ce n&apos;est pas forcément malveillant : cela peut résulter d&apos;un déséquilibre dans les données
        disponibles, un concurrent ayant davantage de présence en ligne, davantage d&apos;avis, ou un site mieux
        structuré pour être compris par un modèle de langage. Imaginons deux salons de coiffure situés dans la même
        rue : si l&apos;un des deux a une fiche plus riche en informations vérifiables, une IA interrogée sur « le
        meilleur salon du quartier » pourrait le mettre en avant, alors même que rien n&apos;indique objectivement
        une différence de qualité.
      </p>
      <p>
        Pour l&apos;entreprise ignorée, la conséquence est un manque à gagner invisible : elle ne perd pas un client
        qu&apos;elle a mal servi, elle perd un client qui n&apos;a même jamais entendu parler d&apos;elle parce que
        la conversation s&apos;est arrêtée avant. C&apos;est précisément le type d&apos;anomalie qu&apos;un plan
        intégrant le suivi d&apos;un concurrent permet de détecter tôt, avant qu&apos;elle ne devienne une habitude
        installée dans les réponses des IA.
      </p>

      <h2 className="font-semibold text-dopaguard-navy">4. L&apos;hallucination pure</h2>
      <p>
        C&apos;est la forme la plus spectaculaire d&apos;erreur, et la plus difficile à anticiper : l&apos;IA invente
        une information de toutes pièces. Une hallucination IA entreprise peut prendre la forme d&apos;un service que
        l&apos;entreprise n&apos;a jamais proposé, d&apos;une certification qu&apos;elle ne détient pas, d&apos;un
        prix obtenu, ou même d&apos;une adresse et d&apos;un numéro de téléphone qui n&apos;existent pas mais qui
        sonnent parfaitement plausibles. Imaginons une petite agence de communication qu&apos;une IA décrirait comme
        spécialisée dans un domaine précis qu&apos;elle n&apos;a jamais pratiqué, simplement parce que ce domaine est
        statistiquement associé aux entreprises portant un nom similaire.
      </p>
      <p>
        Le danger de l&apos;hallucination, c&apos;est qu&apos;elle ne provient d&apos;aucune source identifiable : on ne
        peut pas la corriger à la racine, on peut seulement la détecter au moment où elle apparaît dans une réponse et
        agir en conséquence, par exemple en enrichissant les informations disponibles sur l&apos;entreprise pour
        réduire le risque que le modèle « comble les vides » avec des inventions.
      </p>

      <h2 className="font-semibold text-dopaguard-navy">5. L&apos;information datée</h2>
      <p>
        Une entreprise change : nouveaux horaires, nouvelle gamme de services, nouvelle équipe, nouveau positionnement
        tarifaire. Ce qui était vrai il y a un an ne l&apos;est peut-être plus, mais les IA génératives n&apos;ont
        aucune raison de le savoir si personne ne le leur signale explicitement quelque part sur le web. Imaginons un
        indépendant qui proposait autrefois des prestations en présentiel uniquement, et qui a depuis ouvert une
        offre à distance : une IA interrogée sur ses modalités pourrait continuer à ne mentionner que
        l&apos;ancienne formule, faisant passer l&apos;entreprise pour moins flexible qu&apos;elle ne l&apos;est
        réellement.
      </p>
      <p>
        Cette catégorie est particulièrement sournoise parce qu&apos;elle ne contient aucune erreur au sens strict :
        l&apos;information était juste, un jour. Mais une IA qui ne rafraîchit pas sa compréhension d&apos;une
        entreprise aussi vite que celle-ci évolue finit par diffuser une version dépassée d&apos;elle-même, invisible
        pour le dirigeant tant qu&apos;il ne se met pas lui-même à la place de ses prospects.
      </p>

      <h2 className="font-semibold text-dopaguard-navy">Comment s&apos;en protéger</h2>
      <p>
        Ces cinq anomalies partagent un point commun : elles se produisent hors de portée du dirigeant, dans des
        conversations qu&apos;il ne voit jamais, avec des interlocuteurs qu&apos;il ne peut pas corriger a posteriori.
        C&apos;est exactement le vide que Dopaguard est conçu pour combler. Le principe est simple : une fiche de
        vérité validée par le client sert de référence, puis 3 à 5 IA selon le plan choisi sont interrogées chaque
        semaine sur l&apos;entreprise pour comparer leurs réponses à cette référence. Dès qu&apos;une anomalie
        critique est détectée, une alerte immédiate est envoyée ; le reste des observations est regroupé dans un
        digest hebdomadaire, pour garder une vision d&apos;ensemble sans être submergé de notifications.
      </p>
      <p>
        Concrètement, le plan Essentiel à 69€ par mois couvre 3 IA, suffisant pour une majorité de TPE qui veulent
        simplement savoir ce que disent les assistants les plus utilisés. Le plan Pro à 149€ par mois ajoute deux IA
        supplémentaires et surveille en plus un concurrent, ce qui permet de repérer les cas où l&apos;IA recommande
        quelqu&apos;un d&apos;autre. Le plan Agence à 349€ par mois est pensé pour les professionnels qui gèrent
        plusieurs marques ou plusieurs clients, avec jusqu&apos;à 10 entreprises suivies en marque blanche. Dans tous
        les cas, un scan gratuit de 3 minutes, sans carte bancaire, permet de voir en un instant si son entreprise
        fait déjà l&apos;objet d&apos;une erreur factuelle, d&apos;une hallucination ou d&apos;une information
        périmée dans les réponses des IA génératives.
      </p>
      <p>
        Attendre qu&apos;un client mentionne une réponse étrange obtenue sur ChatGPT n&apos;est plus une stratégie
        tenable à mesure que ces outils deviennent le premier réflexe de recherche. Surveiller activement ce que les
        IA disent d&apos;une entreprise, semaine après semaine, permet de reprendre la main sur un narratif qui,
        sinon, se construit sans personne aux commandes.
      </p>
    </>
  );
}
