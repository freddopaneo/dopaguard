export default function ArticleBody() {
  return (
    <>
      <p>
        Un client potentiel demande à ChatGPT : « quel est le meilleur [votre métier] à [votre ville] ? ». La
        réponse cite deux, trois, parfois cinq entreprises du secteur. La vôtre n&apos;y figure pas. Pas en mal,
        pas en bien : elle n&apos;existe simplement pas pour l&apos;IA à ce moment-là. Aucune erreur n&apos;a été
        commise à proprement parler, aucun fait inexact n&apos;a été énoncé sur vous. Vous êtes juste absent de
        la conversation, comme si vous n&apos;étiez jamais entré dans le champ de vision du modèle. C&apos;est
        ce que nous appelons l&apos;invisibilité pure, et d&apos;après ce que nous observons chez Dopaguard en
        analysant la couverture de contenu de nos clients, c&apos;est probablement le problème le plus fréquent
        que rencontrent les petites entreprises face aux IA génératives, bien plus fréquent qu&apos;une véritable
        erreur factuelle.
      </p>

      <h2 className="font-semibold text-dopaguard-navy">Pourquoi l&apos;absence est différente d&apos;une erreur</h2>
      <p>
        Une erreur factuelle, aussi gênante soit-elle, a une caractéristique rassurante : elle se voit. L&apos;IA
        affirme quelque chose de faux, d&apos;identifiable, de corrigeable. Une fois repérée, elle peut être
        signalée, expliquée, contredite par de meilleures sources. L&apos;invisibilité pure ne fonctionne pas de
        cette façon. Il n&apos;y a rien à corriger, parce qu&apos;il n&apos;y a rien de faux qui a été dit. Il
        n&apos;y a même rien à repérer au sens habituel du terme, puisqu&apos;une absence ne produit aucun signal
        d&apos;alerte spontané. Personne ne vous écrit pour vous dire « ChatGPT ne vous a pas mentionné » comme
        on pourrait vous signaler un avis négatif ou une information erronée.
      </p>
      <p>
        C&apos;est précisément ce qui rend ce problème plus grave à long terme qu&apos;une erreur isolée. Une
        erreur, une fois identifiée, appelle une action concrète et se règle en général assez vite. Une absence,
        elle, peut durer des mois, voire des années, sans qu&apos;aucun signal ne vienne jamais l&apos;interrompre.
        Chaque semaine, un certain nombre de clients potentiels posent une question de recommandation à une IA
        générative, obtiennent une liste qui ne vous inclut pas, et passent au premier nom cité sans jamais
        savoir que vous existiez comme option. Cette perte d&apos;opportunités ne laisse aucune trace : pas de
        plainte, pas de mauvais avis, pas de réclamation. Juste des clients qui ne sont jamais venus, et que vous
        ne pouvez pas compter parce que vous ignorez qu&apos;ils ont posé la question.
      </p>

      <h2 className="font-semibold text-dopaguard-navy">D&apos;où vient cette invisibilité</h2>
      <p>
        Il n&apos;existe pas une cause unique à ce phénomène, et il serait présomptueux de prétendre décrire
        exactement le fonctionnement interne de chaque modèle. Plusieurs facteurs, souvent cumulés, augmentent
        néanmoins la probabilité qu&apos;une entreprise reste hors du champ des réponses génératives.
      </p>
      <ul className="list-disc pl-5">
        <li>
          Une présence en ligne trop restreinte : peu de pages, peu de mentions dans des annuaires ou des médias
          locaux, peu d&apos;avis. Moins il existe de contenu associant votre nom à votre activité et à votre
          zone géographique, moins une IA a de matière pour vous inclure spontanément dans une réponse.
        </li>
        <li>
          Un contenu insuffisant pour construire une réponse : même quand une entreprise existe en ligne, un
          site vitrine minimal ou une fiche jamais enrichie donne peu d&apos;éléments concrets à synthétiser. Une
          IA a tendance à privilégier ce qu&apos;elle peut décrire avec assurance.
        </li>
        <li>
          Une entreprise récente, dont l&apos;empreinte numérique n&apos;a pas encore eu le temps de s&apos;étoffer
          : peu d&apos;historique, peu d&apos;avis accumulés, peu de mentions externes.
        </li>
        <li>
          Des concurrents nettement mieux représentés dans les sources que le modèle consulte ou a mémorisées :
          plus d&apos;avis récents, une présence homogène sur plusieurs plateformes, davantage de contenu
          indexable. Dans une liste forcément limitée, ce sont ces acteurs mieux documentés qui occupent les
          places disponibles.
        </li>
      </ul>
      <p>
        Dans la plupart des cas, il ne s&apos;agit donc pas d&apos;un jugement de valeur sur la qualité réelle de
        votre activité, mais d&apos;un déséquilibre dans la quantité et la clarté de ce qui se dit de vous en
        ligne par rapport à d&apos;autres acteurs de votre secteur.
      </p>

      <h2 className="font-semibold text-dopaguard-navy">Comment détecter ce problème</h2>
      <p>
        La seule façon fiable de savoir si votre entreprise souffre d&apos;invisibilité pure est de poser
        directement la question qu&apos;un client potentiel poserait. Ouvrez plusieurs IA génératives et
        formulez une demande de recommandation réaliste : « quel est le meilleur [votre métier] à [votre ville] »,
        « peux-tu me recommander un [votre métier] près de [votre quartier] », ou toute variante que vos clients
        pourraient réellement taper. Regardez ensuite si votre entreprise apparaît dans la réponse, sous quelle
        forme, et à quel rang par rapport aux autres noms cités.
      </p>
      <p>
        Il est important de répéter cet exercice sur plusieurs IA, et pas seulement sur une seule. ChatGPT,
        Claude, Gemini, Perplexity et Mistral ne s&apos;appuient pas exactement sur les mêmes sources ni les
        mêmes mécanismes, et il n&apos;est pas rare qu&apos;une entreprise soit citée par l&apos;une et absente
        des réponses des autres. Une vérification isolée sur un seul outil, un seul jour, ne donne qu&apos;un
        aperçu partiel d&apos;une situation qui peut varier d&apos;un modèle à l&apos;autre et évoluer dans le
        temps à mesure que le contenu disponible en ligne change.
      </p>

      <h2 className="font-semibold text-dopaguard-navy">Ce que Dopaguard permet de vérifier</h2>
      <p>
        C&apos;est exactement ce que propose le scan gratuit de Dopaguard : interroger 3 IA génératives en 3
        minutes, sans carte bancaire, pour voir concrètement si votre entreprise ressort dans ce type de question
        de recommandation, ou si elle en est absente. Ce premier constat suffit souvent à révéler un problème
        que rien d&apos;autre n&apos;aurait signalé, parce que l&apos;invisibilité, à la différence d&apos;une
        fausse accusation ou d&apos;une erreur factuelle, ne s&apos;améliore jamais toute seule si personne ne
        s&apos;en aperçoit. Une entreprise absente aujourd&apos;hui des réponses génératives a toutes les chances
        de le rester demain, tant qu&apos;aucune action n&apos;est entreprise et qu&apos;aucun suivi ne permet de
        mesurer si la situation évolue.
      </p>
      <p>
        C&apos;est pour cette raison qu&apos;un scan ponctuel, utile pour prendre la mesure du problème, gagne à
        être complété par une surveillance hebdomadaire. Les formules Essentiel, Pro et Agence interrogent
        régulièrement 3 à 5 IA selon la formule choisie, ce qui permet de suivre, semaine après semaine, si votre
        entreprise commence à apparaître dans les réponses de recommandation, sur quels modèles, et par rapport
        à quels concurrents. Sans ce suivi dans la durée, une invisibilité qui s&apos;améliore progressivement
        grâce à vos efforts de contenu resterait tout aussi invisible que le problème initial : vous n&apos;auriez
        aucun moyen de savoir que la situation change, faute d&apos;avoir jamais reposé la question.
      </p>
    </>
  );
}
