export default function ArticleBody() {
  return (
    <>
      <p>
        Une IA générative peut se mettre à raconter n&apos;importe quoi sur votre entreprise sans prévenir : un
        tarif erroné, un service que vous n&apos;offrez plus, une adresse fausse, un statut juridique confondu avec
        celui d&apos;un homonyme. Ce n&apos;est pas l&apos;erreur elle-même qui détermine son impact, c&apos;est sa
        durée de vie. Une IA se trompe à votre sujet un lundi ; si personne ne le remarque, elle continuera de se
        tromper de la même façon des semaines, parfois des mois plus tard, devant chaque nouvelle personne qui pose
        la question. C&apos;est tout l&apos;enjeu d&apos;une alerte réputation IA bien conçue : réduire au minimum
        le temps entre l&apos;apparition d&apos;un problème et sa détection, pour que la correction intervienne
        avant que le préjudice ne s&apos;accumule.
      </p>

      <h2 className="font-semibold text-dopaguard-navy">
        Chaque jour d&apos;exposition est un jour de prospects potentiellement mal informés
      </h2>
      <p>
        ChatGPT, Claude, Gemini, Perplexity ou Mistral sont interrogés en continu par des personnes qui cherchent un
        prestataire, comparent des options ou veulent simplement vérifier une information avant de se déplacer ou
        d&apos;acheter. Chacune de ces conversations est invisible pour vous : vous ne recevez ni notification, ni
        copie, ni indice qu&apos;elle a eu lieu. Si l&apos;IA décrit mal votre activité, ce n&apos;est pas un
        incident isolé qui se produit une fois puis disparaît, c&apos;est un message qui se répète à l&apos;identique
        à chaque nouvelle requête, tant que rien n&apos;a changé dans la façon dont le modèle a mémorisé ou reconstruit
        l&apos;information. Une erreur détectée le jour même touche, dans le pire des cas, une poignée de personnes.
        La même erreur non détectée pendant six semaines peut avoir été servie à des dizaines ou des centaines de
        personnes, sans qu&apos;aucune d&apos;elles ne vous en informe directement. Le coût ne se mesure donc pas à
        la gravité de l&apos;erreur au moment où elle apparaît, mais à sa durée cumulée d&apos;exposition. C&apos;est
        pour cette raison que la réactivité réputation entreprise face aux IA génératives ne peut pas être traitée
        comme un sujet secondaire ou occasionnel : chaque jour qui passe sans vérification est un jour de plus où
        des décisions se prennent sur une base potentiellement fausse.
      </p>

      <h2 className="font-semibold text-dopaguard-navy">
        Sans surveillance dédiée, la découverte tient presque toujours du hasard
      </h2>
      <p>
        Posez-vous la question suivante : comment sauriez-vous aujourd&apos;hui qu&apos;une IA générative donne une
        information incorrecte sur votre entreprise ? Dans l&apos;immense majorité des cas, la réponse honnête est
        qu&apos;il n&apos;existe aucun mécanisme pour le savoir. Personne dans l&apos;entreprise n&apos;a pour
        mission de poser quotidiennement les mêmes questions que poserait un client à ChatGPT ou à Perplexity. Les
        deux seuls scénarios réalistes de découverte sont les suivants.
      </p>
      <ul className="list-disc pl-5">
        <li>
          Un client ou un prospect mentionne, en passant, qu&apos;une IA lui a dit telle ou telle chose sur vous —
          souvent bien après avoir déjà pris sa décision sur cette base.
        </li>
        <li>
          Personne ne le mentionne jamais, parce que ceux qui ont reçu une information erronée ont simplement changé
          de prestataire ou renoncé, sans juger utile de vous en parler.
        </li>
      </ul>
      <p>
        Dans les deux cas, l&apos;entreprise est en position purement réactive et souvent tardive. Elle n&apos;a pas
        les moyens de vérifier régulièrement ce que disent plusieurs IA à la fois, ni le temps de comparer ces
        réponses à la réalité de son activité. Ce n&apos;est pas un manque de vigilance de la part des dirigeants,
        c&apos;est simplement qu&apos;aucun outil interne n&apos;est conçu pour ce type de suivi. Sans un mécanisme
        automatisé qui interroge les IA à intervalles réguliers et compare leurs réponses à une référence fiable, la
        découverte d&apos;un problème reste une question de chance, pas de méthode.
      </p>

      <h2 className="font-semibold text-dopaguard-navy">
        Tout n&apos;a pas la même urgence : la distinction entre critique et standard
      </h2>
      <p>
        Une fois qu&apos;on accepte l&apos;idée d&apos;une surveillance régulière, une deuxième question se pose :
        faut-il traiter chaque écart avec la même urgence ? La réponse est non, et c&apos;est précisément pour cela
        que Dopaguard distingue deux niveaux de gravité. Une anomalie critique — une IA qui affirme que
        l&apos;entreprise a fermé, qui invente une accusation grave, qui indique une adresse ou un numéro de contact
        totalement faux, ou qui associe la marque à une controverse inexistante — appelle une alerte immédiate par
        email, parce que chaque heure supplémentaire d&apos;exposition aggrave le préjudice potentiel. À
        l&apos;inverse, une imprécision mineure — une formulation un peu datée, un horaire légèrement approximatif,
        un ton plus neutre que souhaité — n&apos;a pas besoin de déclencher une notification en urgence. Elle peut
        parfaitement attendre le digest hebdomadaire, qui rassemble l&apos;ensemble des observations de la semaine
        sans surcharger l&apos;attention du dirigeant. Cette distinction n&apos;est pas cosmétique : elle protège à
        la fois contre le risque de réagir trop tard sur ce qui compte vraiment, et contre la fatigue d&apos;alerte
        qui finirait par faire ignorer toutes les notifications si chaque écart mineur déclenchait le même signal
        que les cas graves.
      </p>

      <h2 className="font-semibold text-dopaguard-navy">
        Une fois alerté, que faire concrètement
      </h2>
      <p>
        Recevoir une alerte n&apos;est utile que si elle débouche sur une réponse structurée. La première étape
        consiste à vérifier l&apos;information : relire précisément ce que l&apos;IA a répondu, dans quel contexte,
        et confirmer qu&apos;il s&apos;agit bien d&apos;un écart avec la réalité de l&apos;entreprise plutôt que
        d&apos;une formulation maladroite mais globalement correcte. La deuxième étape consiste à comprendre la cause
        probable : la fiche de vérité comparée à la réponse permet souvent d&apos;identifier d&apos;où vient
        l&apos;erreur — une information obsolète encore présente en ligne, un avis ancien mal interprété, une
        confusion avec un concurrent ou un homonyme, ou une mise à jour récente du modèle qui a changé sa manière de
        sélectionner ses sources. La troisième étape, quand elle est possible, consiste à agir sur cette cause :
        corriger une fiche d&apos;établissement, publier une information plus claire et plus récente à l&apos;endroit
        où l&apos;IA semble s&apos;être appuyée, répondre à un avis problématique, ou simplement documenter le
        changement pour suivre son effet la semaine suivante. Toutes les anomalies ne se corrigent pas
        instantanément — certaines dépendent de la vitesse à laquelle les modèles réabsorbent une information mise à
        jour — mais l&apos;essentiel est d&apos;avoir engagé l&apos;action le plus tôt possible plutôt que de
        découvrir le problème après qu&apos;il a déjà produit ses effets.
      </p>

      <h2 className="font-semibold text-dopaguard-navy">
        Le passage d&apos;un hasard incertain à une détection en quelques jours
      </h2>
      <p>
        Le vrai changement qu&apos;apporte une détection automatisée et continue n&apos;est pas seulement
        qu&apos;elle repère des erreurs : c&apos;est qu&apos;elle transforme la temporalité de la découverte. Sans
        surveillance, le scénario le plus probable est « peut-être un jour, par hasard, si un client en parle » —
        et souvent, ce jour n&apos;arrive jamais. Avec une interrogation hebdomadaire de plusieurs IA à la fois,
        comparée systématiquement à une fiche de vérité validée, le scénario devient « au plus tard dans les
        prochains jours, de façon fiable ». C&apos;est cette différence de délai qui change la nature du risque : une
        entreprise qui sait, en quelques jours, qu&apos;une IA la décrit mal peut agir pendant que l&apos;exposition
        reste limitée. Une entreprise qui ne le découvre que par hasard, des mois plus tard, a déjà laissé le
        problème produire tous ses effets. Le scan gratuit de 3 minutes proposé par Dopaguard permet de mesurer en
        quelques instants où en est votre situation actuelle ; les formules Essentiel, Pro et Agence prennent ensuite
        le relais avec un suivi hebdomadaire automatisé, une alerte immédiate en cas d&apos;anomalie critique et un
        digest pour le reste, afin que la rapidité de réaction ne dépende plus de la chance, mais d&apos;un
        mécanisme qui tourne chaque semaine, que vous y pensiez ou non.
      </p>
    </>
  );
}
