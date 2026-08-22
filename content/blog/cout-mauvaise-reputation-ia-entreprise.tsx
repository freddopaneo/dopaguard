export default function ArticleBody() {
  return (
    <>
      <p>
        Une entreprise sait généralement chiffrer ce qui lui coûte cher : un litige, une panne, une campagne
        publicitaire ratée. Elle a beaucoup plus de mal à chiffrer ce qui ne lui coûte apparemment rien, parce que
        rien n&apos;apparaît jamais nulle part. C&apos;est exactement la situation créée par une réponse erronée
        donnée par une IA générative à propos d&apos;une entreprise. Le coût mauvaise réputation IA ne se lit sur
        aucun relevé bancaire, ne figure dans aucun tableau de bord marketing, et pourtant il existe bel et bien. Cet
        article ne va pas inventer un montant ni un pourcentage pour rendre ce coût plus impressionnant : il va plutôt
        expliquer, de façon rigoureuse, pourquoi ce coût est structurellement invisible, comment il se manifeste
        concrètement, pourquoi il s&apos;aggrave silencieusement dans le temps, et comment le mettre en balance
        honnêtement avec le coût, lui parfaitement connu, d&apos;une surveillance régulière.
      </p>

      <h2 className="font-semibold text-dopaguard-navy">Pourquoi ce coût ne peut, par nature, jamais être tracé</h2>
      <p>
        Toute entreprise dispose d&apos;outils pour comprendre d&apos;où viennent ses clients : Google Analytics pour
        le trafic web, un CRM pour l&apos;origine des leads, parfois une question posée directement en caisse ou au
        téléphone. Ces outils ont un point commun : ils ne peuvent mesurer que ce qui s&apos;est produit, jamais ce
        qui ne s&apos;est pas produit. Un client qui n&apos;a jamais pris contact ne laisse aucune trace dans aucun de
        ces systèmes. Or c&apos;est précisément ce qui se passe quand une IA générative donne une réponse erronée ou
        défavorable à propos d&apos;une entreprise : la personne qui posait la question à ChatGPT, Claude, Gemini,
        Perplexity ou Mistral ne devient jamais un contact, jamais une visite, jamais une ligne dans un tableau. Il
        n&apos;existe aucun mécanisme, ni technique ni comptable, capable de relier a posteriori une vente qui
        n&apos;a pas eu lieu à une conversation IA qui s&apos;est déroulée ailleurs, sans qu&apos;aucune notification
        ne soit envoyée à l&apos;entreprise concernée. L&apos;impact erreur IA entreprise ne produit donc jamais de
        ligne « vente perdue attribuée à » : il produit simplement une absence, et une absence ne s&apos;analyse pas
        comme un échec visible. C&apos;est cette asymétrie qui rend le sujet difficile à prendre au sérieux tant
        qu&apos;on ne l&apos;a pas clairement posé : ce n&apos;est pas que le coût soit faible, c&apos;est qu&apos;il
        est structurellement conçu pour ne jamais apparaître dans les instruments de mesure habituels d&apos;une
        entreprise.
      </p>

      <h2 className="font-semibold text-dopaguard-navy">Les formes concrètes que prend ce coût invisible</h2>
      <p>
        Ce raisonnement resterait abstrait s&apos;il ne décrivait pas des situations précises. Il en existe
        principalement deux, assez différentes dans leur mécanique mais identiques dans leur effet final.
      </p>
      <ul className="list-disc pl-5">
        <li>
          Le client redirigé vers un concurrent : la personne pose une question sur une catégorie d&apos;activité,
          l&apos;IA cite un ou plusieurs noms, et l&apos;entreprise concernée n&apos;en fait pas partie, ou apparaît
          après un concurrent présenté de façon plus favorable, plus précise ou simplement plus rassurante. La
          décision se prend souvent avant même que l&apos;entreprise ait eu une chance d&apos;être comparée
          directement.
        </li>
        <li>
          Le client qui renonce purement et simplement : l&apos;IA affirme, à tort, que l&apos;entreprise est fermée,
          ne propose plus tel service, ne dessert plus telle zone, ou ne correspond pas au besoin exprimé. Dans ce
          cas, il n&apos;y a même pas de mise en concurrence : la personne abandonne l&apos;idée avant d&apos;aller
          plus loin, convaincue par une information qui semblait faire autorité alors qu&apos;elle était simplement
          inexacte.
        </li>
      </ul>
      <p>
        Dans les deux cas, la personne n&apos;a strictement aucune raison de recontacter l&apos;entreprise pour
        signaler ce qu&apos;elle vient de lire ou d&apos;entendre. Elle ne se perçoit pas comme un témoin d&apos;une
        erreur : elle se perçoit comme quelqu&apos;un qui vient de recevoir une réponse claire à sa question. C&apos;est
        cette apparente évidence, du point de vue de l&apos;utilisateur, qui referme la boucle et empêche tout retour
        d&apos;information vers l&apos;entreprise concernée.
      </p>

      <h2 className="font-semibold text-dopaguard-navy">Pourquoi ce coût s&apos;aggrave silencieusement avec le temps</h2>
      <p>
        Un dernier élément change la nature du problème : une réponse erronée n&apos;est presque jamais un incident
        isolé. Une fois qu&apos;une IA a construit une représentation inexacte d&apos;une entreprise à partir de ses
        sources, cette même représentation a de fortes chances d&apos;être servie à d&apos;autres personnes qui
        posent une question similaire dans les semaines qui suivent, tant que rien ne vient corriger la source du
        problème. Ce n&apos;est donc pas une erreur ponctuelle affectant une seule personne, mais un scénario qui peut
        se rejouer un nombre indéterminé de fois, à l&apos;identique, sans qu&apos;aucun signal d&apos;alerte ne se
        déclenche naturellement. Chaque répétition est individuellement invisible pour les raisons déjà évoquées, mais
        la somme de ces répétitions, elle, est bien réelle : elle représente un flux continu de mises en relation qui
        n&apos;ont jamais eu lieu. Plus une entreprise met de temps à détecter ce type d&apos;anomalie, plus le nombre
        de personnes ayant reçu la même information erronée grandit, sans qu&apos;aucun mécanisme correctif ne se
        déclenche de lui-même. Le coût mauvaise réputation IA n&apos;est donc pas un montant fixe qu&apos;on pourrait
        constater une fois : c&apos;est une fonction du temps pendant lequel une erreur reste non corrigée. La
        question pertinente n&apos;est pas « combien cela coûte-t-il une fois », mais « combien de temps cette
        situation peut-elle durer avant d&apos;être repérée ».
      </p>

      <h2 className="font-semibold text-dopaguard-navy">Comparer honnêtement le coût de ne pas savoir et le coût de savoir</h2>
      <p>
        Face à un coût qu&apos;on ne peut ni chiffrer précisément ni tracer individuellement, la tentation est de
        conclure qu&apos;il ne mérite pas d&apos;attention, faute de preuve chiffrée. Ce raisonnement inverse en
        réalité la logique du risque : ce n&apos;est pas parce qu&apos;un danger est difficile à mesurer qu&apos;il est
        faible, c&apos;est justement parce qu&apos;il est difficile à mesurer qu&apos;il persiste sans jamais être
        traité. La comparaison honnête à faire n&apos;est donc pas entre un montant hypothétique de pertes et le prix
        d&apos;un abonnement : elle est entre le coût de ne pas savoir, indéterminé et potentiellement cumulatif, et
        le coût de savoir, lui parfaitement connu et fixe. C&apos;est ce second terme que Dopaguard rend concret : un
        scan gratuit de 3 minutes pour obtenir un premier état des lieux, puis un suivi hebdomadaire construit autour
        d&apos;une fiche de vérité validée par l&apos;entreprise elle-même, à laquelle chaque réponse générée par les
        IA est comparée semaine après semaine. Les formules Essentiel à 69 euros par mois, Pro à 149 euros par mois et
        Agence à 349 euros par mois correspondent à des niveaux de surveillance croissants selon le nombre d&apos;IA
        suivies et de marques concernées. Ce prix ne prétend compenser aucune perte précise : il représente le coût de
        transformer une incertitude permanente en un fait vérifié régulièrement, avec des alertes envoyées dès
        qu&apos;une anomalie apparaît plutôt que découverte des mois plus tard, par hasard ou par un client
        mécontent.
      </p>

      <h2 className="font-semibold text-dopaguard-navy">Gérer un risque qu&apos;on ne peut pas mesurer autrement qu&apos;en le surveillant</h2>
      <p>
        Un risque qui ne produit aucune trace exploitable ne peut pas être géré par les méthodes habituelles de
        mesure et de correction a posteriori : il n&apos;y a rien à corriger a posteriori, puisqu&apos;il n&apos;y a
        jamais eu de signal déclenchant une réaction. La seule façon rationnelle de traiter ce type de risque est donc
        de le rendre visible avant qu&apos;il ne produise ses effets, plutôt que d&apos;espérer qu&apos;il ne se
        produira pas ou qu&apos;un client finira par le signaler spontanément. C&apos;est tout l&apos;enjeu d&apos;une
        détection proactive et régulière : elle ne cherche pas à réparer une perte déjà survenue et invisible, elle
        cherche à interrompre la répétition d&apos;une erreur avant qu&apos;elle n&apos;ait eu le temps de se
        multiplier auprès de dizaines de personnes différentes. Pour une entreprise, la question n&apos;est donc pas
        de savoir si un tel incident se produira un jour, mais combien de temps il pourrait durer sans être repéré si
        personne ne vérifie ce que les IA racontent, semaine après semaine. C&apos;est une différence de posture
        simple mais décisive : subir un risque qu&apos;on ne voit pas, ou choisir de le surveiller pour pouvoir agir
        au moment où il apparaît.
      </p>
    </>
  );
}
