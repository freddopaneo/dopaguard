export default function ArticleBody() {
  return (
    <>
      <p>
        Un acheteur prépare une short-list de prestataires. Il travaille dans un environnement professionnel où
        l&apos;assistant intégré à ses outils est Claude, et il lui pose la question la plus banale qui soit : « que
        sais-tu de cette entreprise ? ». La réponse qu&apos;il obtient ne contient aucune erreur. Elle ne contient
        rien du tout. Quelque chose comme : « je n&apos;ai pas d&apos;informations vérifiées sur cette société ». Il
        passe au nom suivant sur sa liste. Vous ne saurez jamais que vous avez été consulté, et encore moins que
        vous avez été écarté — non pas à cause de ce qu&apos;une IA a dit de vous, mais à cause de ce qu&apos;elle
        n&apos;a pas su en dire. C&apos;est la particularité de Claude, et elle mérite qu&apos;on s&apos;y arrête :
        c&apos;est l&apos;IA la plus susceptible de révéler que vous n&apos;existez pas pour elle.
      </p>

      <h2 className="font-semibold text-dopaguard-navy">La prudence est le trait de caractère de Claude</h2>
      <p>
        Chaque IA générative a une manière propre de gérer ce qu&apos;elle ignore. Certaines comblent le vide :
        confrontées à un nom qu&apos;elles reconnaissent mal, elles produisent une réponse plausible en s&apos;appuyant
        sur des entreprises au nom voisin, sur le secteur d&apos;activité supposé, ou sur ce qu&apos;on trouve
        généralement dans ce type de contexte. D&apos;autres cherchent en direct sur le web et rapportent ce
        qu&apos;elles trouvent, y compris quand ce qu&apos;elles trouvent concerne quelqu&apos;un d&apos;autre. Claude,
        lui, a plutôt tendance à s&apos;abstenir : quand il n&apos;a pas d&apos;élément fiable, il le dit.
      </p>
      <p>
        Ce n&apos;est pas une impression. C&apos;est ce que nous observons dans les scans réalisés via Dopaguard,
        où les mêmes questions sont posées simultanément à ChatGPT, Claude et Perplexity au sujet de la même
        entreprise. Sur les analyses effectuées à ce jour, Claude déclare ne pas disposer d&apos;information vérifiée
        environ <strong>deux fois et demie plus souvent</strong> que Perplexity, et sensiblement plus souvent que
        ChatGPT. À l&apos;inverse, Perplexity — qui interroge le web en direct et trouve donc presque toujours
        quelque chose à répondre — produit de très loin le plus d&apos;écarts factuels des trois.
      </p>
      <p>
        Une précision d&apos;honnêteté sur ce chiffre : il porte sur quelques dizaines d&apos;entreprises, en majorité
        des PME et TPE françaises peu médiatisées. Ce n&apos;est pas une étude, c&apos;est un ordre de grandeur tiré
        de notre propre usage, et il ne prétend pas décrire le comportement de ces IA sur des marques mondialement
        connues. Il décrit en revanche assez bien ce qui se passe quand on interroge une IA sur une entreprise
        ordinaire — c&apos;est-à-dire sur la vôtre.
      </p>
      <p>
        Il y a une logique derrière cette différence : une IA qui s&apos;abstient de répondre se trompe moins. C&apos;est
        une bonne nouvelle pour l&apos;exactitude. Ce n&apos;en est pas une pour votre visibilité.
      </p>

      <h2 className="font-semibold text-dopaguard-navy">Une réponse vide n&apos;est pas une réponse neutre</h2>
      <p>
        On a naturellement tendance à considérer que le pire scénario est celui de l&apos;erreur : une IA qui vous
        déclare fermé, qui vous prête un litige imaginaire, qui recommande un concurrent à votre place. C&apos;est
        exact du point de vue de la gravité. Ça ne l&apos;est pas du point de vue de la fréquence : le cas le plus
        courant, de très loin, n&apos;est pas qu&apos;on dise du mal de vous, c&apos;est qu&apos;on ne dise rien.
      </p>
      <p>
        Et le silence n&apos;est jamais lu comme du silence. Quand un interlocuteur obtient « je n&apos;ai pas
        d&apos;informations vérifiées sur cette entreprise », il n&apos;en conclut pas que l&apos;IA a une lacune. Il
        en conclut, sans même le formuler, que vous êtes une petite structure, récente, ou peu établie. C&apos;est un
        jugement implicite, formé en deux secondes, sur lequel vous n&apos;avez aucune prise puisque vous
        n&apos;assistez pas à la conversation. La comparaison est d&apos;autant plus cruelle qu&apos;elle est
        immédiate : si le concurrent qu&apos;il tape juste après vous, lui, obtient trois paragraphes détaillés,
        l&apos;écart de crédibilité est creusé avant même que quiconque ait regardé vos offres respectives.
      </p>
      <p>
        Ce mécanisme existe sur toutes les IA. Claude le rend simplement plus visible que les autres, parce
        qu&apos;au lieu de masquer son ignorance derrière une réponse générique, il l&apos;énonce clairement. C&apos;est
        pour cette raison qu&apos;il constitue un excellent révélateur : si Claude ne sait rien dire de vous, c&apos;est
        rarement un problème propre à Claude, c&apos;est le signe qu&apos;il n&apos;existe pas assez de matière
        vérifiable à votre sujet en ligne.
      </p>

      <h2 className="font-semibold text-dopaguard-navy">Deux problèmes très différents qu&apos;on confond systématiquement</h2>
      <p>
        C&apos;est ici que se joue l&apos;erreur d&apos;interprétation la plus fréquente, et la plus coûteuse en
        décisions. « Les IA se trompent sur moi » et « les IA ne me connaissent pas » sont deux diagnostics distincts,
        qui n&apos;appellent pas du tout les mêmes actions.
      </p>
      <p>
        Le premier est un problème de <strong>fiabilité</strong>. De l&apos;information circule à votre sujet, mais
        elle est fausse, périmée ou tendancieuse. La réponse consiste à identifier précisément l&apos;écart, à
        remonter à la source qui l&apos;alimente, et à publier une information exacte et datée qui la contredise.
      </p>
      <p>
        Le second est un problème de <strong>visibilité</strong>. Rien de faux ne circule, parce que rien ne circule.
        Aucune correction n&apos;a de sens ici : il n&apos;y a rien à corriger. La réponse consiste à produire de la
        matière factuelle et structurée là où les IA vont la chercher — page « à propos » précise et datée, mentions
        cohérentes de votre activité, informations pratiques harmonisées partout où elles apparaissent, présence dans
        les sources qui font autorité dans votre secteur.
      </p>
      <p>
        Confondre les deux conduit à des efforts mal dirigés : passer des mois à surveiller des erreurs qui
        n&apos;existent pas, alors que le vrai sujet est l&apos;absence pure et simple. C&apos;est précisément la
        raison pour laquelle Dopaguard affiche ces deux mesures séparément, et jamais fondues dans une note unique :
        une entreprise irréprochable mais inconnue et une entreprise visible mais mal décrite n&apos;ont pas le même
        problème, et méritent d&apos;être traitées différemment.
      </p>

      <h2 className="font-semibold text-dopaguard-navy">Ce qu&apos;il faut faire concrètement</h2>
      <ul className="list-disc pl-5">
        <li>
          Posez à Claude la question dans sa forme la plus neutre — « que sais-tu de l&apos;entreprise [nom] à
          [ville] ? » — sans lui fournir vous-même le contexte. Dès que vous précisez l&apos;activité ou le site, vous
          lui soufflez la réponse et le test perd tout intérêt.
        </li>
        <li>
          Notez ce que déclenche exactement une réponse vide : est-ce votre nom seul, ou votre nom associé à votre
          métier ? Beaucoup d&apos;entreprises sont identifiables sur l&apos;un et invisibles sur l&apos;autre, ce qui
          indique très précisément où porter l&apos;effort.
        </li>
        <li>
          Faites le même test sur un concurrent direct de taille comparable. C&apos;est le seul moyen de savoir si
          votre absence est normale dans votre secteur ou si elle vous est propre — et donc si vous avez un vrai
          retard à combler.
        </li>
        <li>
          Distinguez rigoureusement, dans ce que vous relevez, les erreurs factuelles et les absences. Ce sont deux
          listes séparées, avec deux plans d&apos;action séparés.
        </li>
        <li>
          Recommencez à intervalle régulier en gardant la trace de la date et de la formulation employée. Sans cet
          historique, vous ne saurez pas dire si une réponse a évolué ou si c&apos;est votre question qui a changé.
        </li>
      </ul>
      <p>
        Ce dernier point est celui qui cède en premier dans la pratique. Le test initial se fait volontiers, parce
        qu&apos;il est motivé par la curiosité. Sa répétition, elle, ne repose sur rien : tant qu&apos;aucun incident
        ne survient, rien ne vient rappeler qu&apos;il faudrait regarder à nouveau.
      </p>

      <h2 className="font-semibold text-dopaguard-navy">Où se situe Claude dans la surveillance Dopaguard</h2>
      <p>
        Claude fait partie des trois IA interrogées par le scan gratuit de trois minutes, sans carte bancaire, aux
        côtés de ChatGPT et Perplexity — et il est présent dans toutes les formules. Le rapport que vous recevez
        distingue explicitement ce que les IA disent d&apos;inexact à votre sujet et ce qu&apos;elles ne savent tout
        simplement pas en dire, pour la raison développée plus haut : ces deux constats n&apos;appellent pas la même
        réponse.
      </p>
      <p>
        Un point de transparence, tant qu&apos;on y est : Claude occupe une double place dans Dopaguard. Il est
        surveillé comme les autres IA, et c&apos;est également lui qui compare les réponses reçues à votre fiche de
        vérité pour repérer les écarts. Cette fiche, c&apos;est vous qui la validez — la référence reste donc la
        vôtre, jamais celle d&apos;une IA. Ensuite, le principe ne varie pas d&apos;une IA à l&apos;autre : chaque
        réponse est comparée semaine après semaine à cette référence, les écarts remontent dans un digest
        hebdomadaire, et les anomalies les plus graves déclenchent une alerte immédiate.
      </p>
    </>
  );
}
