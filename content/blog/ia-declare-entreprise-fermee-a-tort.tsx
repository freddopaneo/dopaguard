export default function ArticleBody() {
  return (
    <>
      <p>
        Un client tape une question dans ChatGPT ou dans Gemini pour savoir s&apos;il peut encore vous confier son
        dossier, passer commande ou prendre rendez-vous. La réponse tombe : votre entreprise aurait fermé, cessé son
        activité, ou ne serait plus joignable. C&apos;est faux. Vous êtes toujours ouvert, toujours actif, peut-être
        même en pleine croissance. Mais ce client-là ne le saura jamais, parce qu&apos;il ne va pas vous appeler pour
        vérifier une information qu&apos;il croit déjà acquise. Ce scénario, IA dit entreprise fermée, n&apos;est pas
        une anecdote parmi d&apos;autres anomalies de réputation : c&apos;est, dans la classification des risques que
        nous utilisons chez Dopaguard, le cas le plus grave qui existe. Comprendre pourquoi, comment cela arrive, et
        surtout comment s&apos;en prémunir, est essentiel pour toute entreprise dont une partie de la clientèle
        s&apos;informe désormais via une IA générative avant de vous contacter.
      </p>

      <h2 className="font-semibold text-dopaguard-navy">Pourquoi cette erreur est classée critique</h2>
      <p>
        Toutes les erreurs que peut commettre une IA en parlant de votre entreprise ne se valent pas. Un horaire
        légèrement inexact, une adresse mal formulée, une gamme de prix approximative : ce sont des imprécisions
        gênantes, mais un client motivé peut les corriger de lui-même en visitant votre site ou en vous contactant.
        L&apos;annonce d&apos;une fermeture, elle, agit différemment. Un chatgpt entreprise fermée à tort ne produit
        pas une hésitation chez le client, il produit un renoncement immédiat. Personne ne prend le temps de vérifier
        qu&apos;une entreprise annoncée comme fermée est en réalité ouverte : on passe simplement au résultat suivant,
        au concurrent suivant, à la solution suivante. L&apos;opportunité commerciale ne se perd pas parce que le
        client a été mal informé et a décidé malgré tout de venir voir par lui-même : elle se perd silencieusement,
        sans qu&apos;aucune trace ne remonte jamais jusqu&apos;à vous.
      </p>
      <p>
        Cette erreur possède une deuxième caractéristique qui la rend redoutable : elle est quasiment impossible à
        détecter depuis votre propre point de vue. Vous vérifiez régulièrement votre messagerie, vos avis en ligne,
        peut-être même votre positionnement dans les moteurs de recherche classiques. Mais il ne viendrait à l&apos;idée
        de presque personne de demander un jour à une IA générative : « suis-je toujours considéré comme ouvert ? ».
        Pourquoi le feriez-vous, puisque vous savez pertinemment que vous êtes en activité ? C&apos;est précisément
        cet angle mort qui rend l&apos;anomalie si dangereuse : elle se maintient et s&apos;aggrave tant que personne,
        de l&apos;intérieur, n&apos;a de raison de la chercher. Une erreur qu&apos;on ne pense jamais à vérifier est
        une erreur qui peut durer des mois.
      </p>

      <h2 className="font-semibold text-dopaguard-navy">D&apos;où vient ce type d&apos;erreur</h2>
      <p>
        Il est important de le préciser : dans la grande majorité des cas, une IA n&apos;invente pas une fermeture par
        pur hasard. Elle s&apos;appuie, souvent maladroitement, sur des signaux réels mais mal interprétés ou devenus
        obsolètes. Plusieurs mécanismes génériques expliquent ce type de dérive, sans qu&apos;il soit nécessaire
        d&apos;imaginer une malveillance quelconque.
      </p>
      <ul className="list-disc pl-5">
        <li>
          Des informations éparses et contradictoires en ligne : une fiche d&apos;annuaire à jour, une autre laissée à
          l&apos;abandon, un ancien site jamais désindexé qui affiche encore une adresse ou un statut périmé. Face à
          ce brouillage, une IA peut retenir la version la moins favorable, sans disposer d&apos;un moyen fiable de
          trancher entre les sources.
        </li>
        <li>
          Un article ancien évoquant une fermeture, un déménagement ou un changement de nom qui n&apos;a en réalité
          jamais eu lieu, ou qui a depuis été annulé ou inversé. Imaginons un cabinet indépendant qui avait un temps
          envisagé de céder son activité, projet finalement abandonné : si cette information ancienne reste plus
          visible que la suite des événements, une IA peut s&apos;y accrocher comme si elle décrivait la situation
          actuelle.
        </li>
        <li>
          La simple absence de signaux récents. Une IA générative construit ses réponses à partir de ce qu&apos;elle
          parvient à retrouver sur une entreprise. Quand aucune mention récente, aucun avis frais, aucune activité en
          ligne visible ne vient confirmer que vous êtes toujours en fonctionnement, certains modèles comblent ce
          silence par une supposition erronée plutôt que par une réponse prudente du type « information non
          confirmée ».
        </li>
      </ul>
      <p>
        Dans les trois cas, la logique est la même : l&apos;IA ne fabrique pas une fermeture de toutes pièces, elle
        extrapole à partir d&apos;un manque ou d&apos;une contradiction qu&apos;elle ne sait pas résoudre autrement.
      </p>

      <h2 className="font-semibold text-dopaguard-navy">Pourquoi les petites structures sont les plus exposées</h2>
      <p>
        Ce risque ne touche pas toutes les entreprises de façon égale. Plus une structure dispose d&apos;une empreinte
        en ligne large, récente et cohérente, plus une IA dispose de signaux positifs pour contrebalancer une source
        douteuse ou une absence d&apos;information. À l&apos;inverse, un artisan, un cabinet indépendant, un commerce
        de proximité ou une petite entreprise de service qui n&apos;a pas mis à jour sa fiche depuis longtemps, qui
        reçoit peu d&apos;avis récents, ou dont la présence en ligne repose sur une poignée de pages figées depuis des
        années, offre beaucoup moins de matière pour être « rassuré ». Avec un footprint numérique réduit, la moindre
        source ambiguë ou périmée prend proportionnellement plus de poids dans la réponse générée. C&apos;est une
        situation profondément injuste : ce sont souvent les structures les plus modestes en moyens marketing, celles
        qui ont le moins de temps à consacrer à leur présence numérique, qui sont statistiquement les plus exposées à
        ce genre d&apos;anomalie critique.
      </p>

      <h2 className="font-semibold text-dopaguard-navy">Comment réduire ce risque en pratique</h2>
      <p>
        Il n&apos;existe pas de garantie absolue contre ce type d&apos;erreur, mais plusieurs habitudes simples
        réduisent nettement sa probabilité et sa durée de vie si elle survient malgré tout.
      </p>
      <ul className="list-disc pl-5">
        <li>
          Garder ses canaux officiels actifs et cohérents entre eux : fiche d&apos;établissement, site web, réseaux
          sociaux professionnels. Une information récente et identique partout est le signal le plus simple à
          interpréter correctement pour une IA.
        </li>
        <li>
          Vérifier et corriger régulièrement les anciennes mentions en ligne qui pourraient laisser entendre, même
          involontairement, un changement de statut, d&apos;adresse ou d&apos;activité qui n&apos;est plus
          d&apos;actualité.
        </li>
        <li>
          Encourager un flux régulier d&apos;avis clients récents, qui constituent l&apos;un des signaux les plus
          directs qu&apos;une activité est toujours bien vivante.
        </li>
        <li>
          Mettre à jour proactivement toute information ayant pu circuler sur un projet de fermeture, de cession ou
          de déménagement qui a finalement été abandonné ou modifié, afin qu&apos;aucune trace ambiguë ne subsiste
          plus longtemps que nécessaire.
        </li>
      </ul>
      <p>
        Ces gestes ne suppriment pas le risque, mais ils réduisent le nombre de zones d&apos;ombre dans lesquelles une
        IA pourrait piocher une conclusion erronée.
      </p>

      <h2 className="font-semibold text-dopaguard-navy">Pourquoi une alerte immédiate, et pas un simple digest hebdomadaire</h2>
      <p>
        Chez Dopaguard, la fiche de vérité que vous validez sert de référence face à laquelle chaque réponse générée
        par ChatGPT, Claude, Gemini, Perplexity ou Mistral est comparée, semaine après semaine, via une interrogation
        régulière de 3 à 5 IA selon votre formule. La plupart des écarts détectés remontent dans un digest
        hebdomadaire : suffisant, car leur impact reste limité et ne justifie pas une notification instantanée. Ce
        cas précis est différent, et il est classé critique dans notre système d&apos;alerte pour une raison très
        concrète : chaque jour où une IA continue d&apos;affirmer à tort qu&apos;une entreprise est fermée est un jour
        de clients potentiels détournés sans retour possible. Attendre le digest de la semaine reviendrait à laisser
        l&apos;erreur produire ses effets plusieurs jours de plus, sans justification, alors qu&apos;un signalement
        immédiat permet d&apos;agir dans l&apos;heure : corriger une fiche, publier un signal d&apos;activité récent,
        ou simplement documenter la situation pour la suivre de près. C&apos;est tout le sens du scan gratuit de 3
        minutes proposé par Dopaguard, sans carte bancaire, puis d&apos;une surveillance hebdomadaire via les formules
        Essentiel, Pro ou Agence : détecter ce genre d&apos;anomalie le plus tôt possible, plutôt que de la découvrir
        des semaines plus tard, quand un nombre indéterminé de clients ont déjà tourné les talons sans jamais vous en
        parler.
      </p>
    </>
  );
}
