export default function ArticleBody() {
  return (
    <>
      <p>
        Deux clients potentiels s&apos;intéressent à votre entreprise le même jour. Le premier ouvre ChatGPT et pose
        sa question : la réponse décrit une activité que vous avez arrêtée il y a deux ans et cite une adresse que
        vous avez quittée. Le second pose exactement la même question, quelques heures plus tard, et obtient une
        description à jour, cohérente avec votre site actuel. Ni l&apos;un ni l&apos;autre ne saura jamais pourquoi.
        Vous non plus, si vous ne l&apos;avez pas vérifié. Cette différence n&apos;a rien d&apos;un caprice : elle
        tient à une caractéristique propre à ce type d&apos;assistant, à savoir qu&apos;une même question peut être
        traitée de deux façons très différentes selon le mode dans lequel la conversation se déroule. Et cette
        caractéristique a une conséquence directe et souvent sous-estimée pour un dirigeant : vérifier une seule
        fois, dans un seul mode, ne prouve à peu près rien.
      </p>

      <h2 className="font-semibold text-dopaguard-navy">Deux façons très différentes de construire une réponse</h2>
      <p>
        ChatGPT peut, selon le mode, répondre à partir de ce qu&apos;il a appris pendant son entraînement, ou aller
        chercher de l&apos;information sur le web au moment même où on l&apos;interroge. Ce sont deux régimes de
        réponse qui n&apos;ont pas grand-chose en commun du point de vue de ce qui vous concerne. Dans le premier
        cas, la réponse s&apos;appuie sur une mémoire constituée à un moment donné : elle est fluide, assurée,
        souvent bien tournée, mais elle décrit un état du monde qui date de la période où le modèle a été entraîné.
        Si votre entreprise a changé de nom, de local, d&apos;offre ou de positionnement depuis, rien ne garantit
        que ce changement soit reflété. Dans le second cas, la réponse est construite à partir de pages consultées
        sur le moment : elle reflète davantage ce qui est publié en ligne aujourd&apos;hui, avec la fraîcheur que
        cela suppose, mais aussi les défauts de ce qui traîne sur le web à votre sujet, y compris une fiche
        d&apos;annuaire abandonnée ou un vieil article encore bien référencé.
      </p>
      <p>
        Il serait présomptueux de prétendre décrire précisément la logique interne qui décide de basculer d&apos;un
        régime à l&apos;autre : ces mécanismes appartiennent à l&apos;éditeur et évoluent au fil des versions. Ce
        qu&apos;un dirigeant peut constater, en revanche, est parfaitement observable de l&apos;extérieur : il
        arrive qu&apos;une même question, posée dans deux conversations différentes, produise deux réponses dont
        l&apos;une semble figée sur un état ancien et l&apos;autre nettement plus actuelle. Ce n&apos;est pas une
        anomalie à signaler, c&apos;est une propriété du fonctionnement de l&apos;outil, avec laquelle il faut
        composer.
      </p>

      <h2 className="font-semibold text-dopaguard-navy">Comment reconnaître de quel régime relève une réponse</h2>
      <p>
        Sans accéder aux coulisses du modèle, quelques indices permettent souvent de se faire une idée de la nature
        de la réponse qu&apos;on a sous les yeux.
      </p>
      <ul className="list-disc pl-5">
        <li>
          La présence ou l&apos;absence de références vers des pages consultées. Une réponse qui renvoie vers des
          sources identifiables a de fortes chances de s&apos;appuyer sur le web au moment de la question ; une
          réponse formulée sans aucune référence relève plus probablement de la mémoire d&apos;entraînement.
        </li>
        <li>
          La fraîcheur des éléments cités. Une réponse qui mentionne un changement récent, une publication des
          dernières semaines ou un élément qui n&apos;existait pas il y a peu s&apos;appuie forcément sur autre
          chose qu&apos;une mémoire figée.
        </li>
        <li>
          Le type d&apos;erreur constaté. Une information périmée mais qui a été exacte à une époque évoque plutôt
          une mémoire ancienne ; une reprise fidèle d&apos;une page obsolète encore en ligne évoque plutôt une
          lecture du web actuel.
        </li>
        <li>
          Le degré de précision. Une réponse très générique, qui pourrait s&apos;appliquer à n&apos;importe quelle
          entreprise de votre secteur, suggère souvent que le modèle comble un manque plutôt qu&apos;il ne restitue
          une source précise.
        </li>
      </ul>
      <p>
        Ces indices ne constituent jamais une preuve, et il ne faut pas les transformer en certitude. Ils suffisent
        néanmoins à faire comprendre l&apos;essentiel : ce que vous lisez à un instant donné n&apos;est pas « la
        position de ChatGPT sur votre entreprise », c&apos;est une réponse parmi plusieurs possibles.
      </p>

      <h2 className="font-semibold text-dopaguard-navy">Le piège du test unique</h2>
      <p>
        C&apos;est là que la difficulté devient concrète pour un dirigeant. Le réflexe naturel, quand on entend
        parler de réputation dans les IA, consiste à ouvrir ChatGPT un soir, à taper le nom de son entreprise, à
        lire la réponse, et à en tirer une conclusion. Si la réponse est correcte, le soulagement est immédiat et
        le sujet se referme aussitôt : tout va bien, l&apos;IA me connaît, on passe à autre chose. Le problème,
        c&apos;est que cette conclusion repose sur un seul point de mesure, obtenu dans un seul régime de réponse,
        sur une seule formulation, à un seul moment. Rien n&apos;indique que le client qui posera la même question
        demain, depuis un autre appareil et dans une autre conversation, obtiendra la même chose.
      </p>
      <p>
        Le cas inverse existe aussi, et il est tout aussi trompeur. Un dirigeant tombe sur une réponse erronée,
        s&apos;en alarme, et en conclut que « ChatGPT raconte n&apos;importe quoi » sur son entreprise, alors
        qu&apos;il vient peut-être d&apos;observer une réponse construite sur une mémoire ancienne, pendant
        qu&apos;une réponse plus actuelle circule par ailleurs. Dans les deux sens, le raisonnement est le même et
        l&apos;erreur est la même : on généralise un instantané. Or un instantané ne dit rien de la stabilité de ce
        qui se dit de vous, ni de la proportion de vos prospects qui verront l&apos;une ou l&apos;autre version.
      </p>
      <p>
        Cette incertitude a une implication pratique qu&apos;il vaut mieux accepter d&apos;emblée : ce n&apos;est
        pas une réponse unique qu&apos;il faut chercher à obtenir, mais une vision d&apos;ensemble de ce que ChatGPT
        est susceptible de dire de vous selon les circonstances. La bonne question n&apos;est pas « qu&apos;a
        répondu l&apos;IA ce soir-là », c&apos;est « quelles sont les versions de mon entreprise qui circulent, et
        laquelle risque le plus d&apos;atterrir devant un client ».
      </p>

      <h2 className="font-semibold text-dopaguard-navy">Une méthode de vérification qui tient compte de cette variabilité</h2>
      <p>
        Puisqu&apos;une réponse isolée ne prouve rien, l&apos;objectif d&apos;une vérification manuelle est de
        multiplier les points de mesure plutôt que d&apos;en chercher un seul qui serait « le bon ».
      </p>
      <ul className="list-disc pl-5">
        <li>
          Posez la même question dans plusieurs conversations distinctes plutôt que d&apos;enchaîner les questions
          dans un même fil, où l&apos;échange précédent influence forcément la suite.
        </li>
        <li>
          Variez les formulations : une question factuelle (« que sais-tu de [nom] à [ville] ? »), une question de
          recommandation, une question sur vos tarifs ou vos horaires. Chaque angle peut mobiliser des ressources
          différentes et faire apparaître une version différente de votre entreprise.
        </li>
        <li>
          Notez à chaque fois la date, la formulation employée, la présence ou l&apos;absence de sources citées, et
          la réponse obtenue. C&apos;est en comparant ces relevés entre eux, et non en lisant une réponse isolée,
          que les écarts significatifs deviennent visibles.
        </li>
        <li>
          Recommencez à intervalles réguliers. Une information exacte ce mois-ci peut redevenir approximative le
          mois suivant, sans qu&apos;aucun événement visible de votre côté ne l&apos;explique, simplement parce que
          les modèles évoluent et que ce qui est publié en ligne à votre sujet change.
        </li>
      </ul>
      <p>
        Cette méthode fonctionne, mais elle a un coût évident : répétée sérieusement, sur plusieurs formulations et
        dans la durée, elle demande une régularité que très peu de dirigeants parviennent à tenir au-delà des
        premières semaines. C&apos;est précisément la limite de la vérification manuelle sur ce sujet particulier :
        ce n&apos;est pas l&apos;effort d&apos;un test qui pose problème, c&apos;est celui de la répétition.
      </p>

      <h2 className="font-semibold text-dopaguard-navy">Remplacer l&apos;instantané par une série de mesures</h2>
      <p>
        C&apos;est exactement ce que le scan gratuit de Dopaguard permet de faire en premier lieu : interroger 3 IA
        en 3 minutes, sans carte bancaire, pour sortir du test unique et voir d&apos;emblée si ce que vous avez lu
        un soir dans ChatGPT se confirme ailleurs ou relève d&apos;un cas isolé. Un premier constat obtenu sur
        plusieurs modèles vaut toujours mieux qu&apos;une impression tirée d&apos;une seule conversation.
      </p>
      <p>
        Mais sur ce sujet précis, c&apos;est surtout la répétition qui a de la valeur. Parce qu&apos;une réponse
        peut varier selon le mode dans lequel elle est produite, un seul relevé, aussi complet soit-il, reste un
        point isolé sur une courbe qu&apos;on ne voit pas. La surveillance hebdomadaire de Dopaguard repose sur ce
        principe : chaque semaine, les mêmes questions sont reposées aux IA suivies selon votre formule, et chaque
        réponse est comparée à une fiche de vérité que vous avez validée vous-même. Les écarts remontent dans un
        digest hebdomadaire, avec une alerte immédiate pour les cas les plus critiques. L&apos;intérêt n&apos;est
        pas de savoir ce que ChatGPT a répondu un mardi soir, mais de voir apparaître ce qu&apos;un test unique ne
        montrera jamais : une version ancienne de votre entreprise qui refait surface régulièrement, une
        information exacte qui se dégrade au fil des semaines, ou au contraire une correction qui finit par
        s&apos;installer durablement dans les réponses.
      </p>
    </>
  );
}
