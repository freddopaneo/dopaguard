export default function ArticleBody() {
  return (
    <>
      <p>
        Un client potentiel hésite entre trois prestataires dans votre secteur. Plutôt que de comparer des sites web pendant une heure, il ouvre ChatGPT et tape une seule question. La réponse qu&apos;il reçoit en dix secondes va largement orienter sa décision. Vous n&apos;étiez pas dans la pièce, vous ne saurez jamais ce qui a été dit, et pourtant cette conversation vient peut-être de vous coûter un contrat.
      </p>
      <h2 className="font-semibold text-dopaguard-navy">Pourquoi ce que dit une IA de vous compte déjà</h2>
      <p>
        De plus en plus de décisions d&apos;achat commencent par une question posée à une IA plutôt qu&apos;à un moteur de recherche. Un particulier qui cherche un artisan, un acheteur B2B qui présélectionne des fournisseurs, un journaliste qui vérifie une information : tous demandent de plus en plus souvent leur avis à ChatGPT, Claude, Gemini ou Perplexity avant même de visiter votre site. Ces outils ne se contentent pas de lister des liens, ils formulent une réponse tranchée, avec un ton, des recommandations et parfois des jugements de valeur.
      </p>
      <p>
        Le problème, c&apos;est que ces réponses ne sont pas toujours exactes. Une IA peut citer un ancien tarif, décrire une activité que vous avez abandonnée il y a deux ans, orienter l&apos;utilisateur vers un concurrent qu&apos;elle juge plus adapté, ou tout simplement inventer un détail qui n&apos;a jamais existé chez vous. Et contrairement à un avis Google, vous ne recevez aucune notification quand cela se produit. Se demander que dit ChatGPT de mon entreprise n&apos;est donc plus une curiosité, c&apos;est devenu un réflexe de gestion de réputation aussi basique que de surveiller ses avis clients.
      </p>
      <h2 className="font-semibold text-dopaguard-navy">La méthode manuelle : quelles questions poser</h2>
      <p>
        La bonne nouvelle, c&apos;est que vérifier réputation ChatGPT ne demande aucun outil particulier pour commencer. Ouvrez chaque IA séparément (ChatGPT, Claude, Gemini, Perplexity, Mistral si vous êtes dans un secteur francophone très ciblé) et posez des variantes de ces questions, une par une, sans donner de contexte supplémentaire pour rester le plus proche possible de ce que verrait un vrai prospect :
      </p>
      <ul className="list-disc pl-5">
        <li>Que sais-tu de l&apos;entreprise [nom] à [ville] ?</li>
        <li>Recommanderais-tu [nom] pour [votre activité] ? Pourquoi ?</li>
        <li>Quels sont les tarifs et horaires de [nom] ?</li>
        <li>Quels sont les concurrents de [nom] dans [votre secteur] à [ville] ?</li>
        <li>Quels sont les points faibles ou les avis négatifs sur [nom] ?</li>
      </ul>
      <p>
        Notez systématiquement la date, l&apos;IA interrogée et la réponse exacte, idéalement dans un tableau simple. C&apos;est fastidieux, mais c&apos;est la seule façon de comparer dans le temps et de repérer un changement.
      </p>
      <h2 className="font-semibold text-dopaguard-navy">Ce qu&apos;il faut repérer dans les réponses</h2>
      <p>
        Une fois les réponses obtenues, l&apos;enjeu est de savoir quoi chercher. En pratique, les anomalies qui méritent votre attention se rangent presque toujours dans l&apos;une de ces cinq catégories.
      </p>
      <ul className="list-disc pl-5">
        <li>Erreur factuelle : mauvaise adresse, mauvais horaires, tarif erroné, activité mal décrite.</li>
        <li>Sentiment négatif : la réponse évoque des problèmes de qualité, de service ou de fiabilité sans que vous sachiez d&apos;où vient cette perception.</li>
        <li>Concurrent recommandé à votre place, ou cité en meilleure alternative sans justification claire.</li>
        <li>Hallucination : un détail inventé de toutes pièces, comme un service que vous ne proposez pas ou un avis client qui n&apos;existe pas.</li>
        <li>Information datée : un ancien nom d&apos;entreprise, une adresse que vous avez quittée, une offre qui n&apos;est plus d&apos;actualité.</li>
      </ul>
      <p>
        Une réponse peut cumuler plusieurs de ces problèmes en quelques phrases. C&apos;est particulièrement vrai pour les hallucinations, qui sont difficiles à repérer si vous ne connaissez pas parfaitement chaque détail de votre propre communication publique au fil du temps.
      </p>
      <h2 className="font-semibold text-dopaguard-navy">Pourquoi le faire à la main chaque semaine n&apos;est pas réaliste</h2>
      <p>
        Le vrai problème n&apos;est pas de poser ces questions une fois. C&apos;est de les reposer régulièrement. Les modèles sont mis à jour, réentraînés, connectés à des sources web changeantes : une réponse correcte aujourd&apos;hui peut se dégrader dans trois semaines sans aucun signal extérieur. Pour véritablement surveiller votre image, il faudrait interroger cinq IA différentes, avec cinq à dix questions chacune, chaque semaine, comparer chaque réponse à la précédente, et repérer les écarts qui comptent parmi ceux qui ne comptent pas.
      </p>
      <p>
        Multipliez cela par 52 semaines par an et vous obtenez plusieurs centaines de requêtes à formuler, lire et archiver manuellement, sans compter le temps passé à se souvenir de ce qui avait été dit la fois précédente. Pour un dirigeant de TPE ou un indépendant qui gère déjà son activité, son marketing et sa relation client, ce suivi passe presque toujours à la trappe après quelques semaines de bonne volonté, précisément au moment où une erreur ou un sentiment négatif s&apos;installe durablement dans les réponses des IA.
      </p>
      <h2 className="font-semibold text-dopaguard-navy">L&apos;approche automatisée : fiche de vérité et contrôle hebdomadaire</h2>
      <p>
        C&apos;est ce constat qui a conduit à automatiser la démarche plutôt que de la répéter à la main. Le principe repose sur une fiche de vérité : un document de référence sur votre entreprise (activité, zone d&apos;intervention, tarifs, positionnement, différenciateurs) que vous validez vous-même, et qui sert de base de comparaison objective à chaque vérification.
      </p>
      <p>
        Chaque semaine, le système interroge automatiquement de trois à cinq IA selon le plan choisi, avec un jeu de questions couvrant les mêmes angles que la méthode manuelle décrite plus haut, puis confronte chaque réponse à votre fiche de vérité. Si un écart critique apparaît, une alerte est envoyée immédiatement plutôt que d&apos;attendre la fin de la semaine. Pour le reste, un digest hebdomadaire résume l&apos;ensemble des observations, qu&apos;elles soient rassurantes ou qu&apos;elles nécessitent une action de votre part.
      </p>
      <p>
        Dopaguard propose un scan gratuit de trois minutes, sans carte bancaire, pour se faire une première idée de ce que disent déjà les IA de votre activité. Au-delà de ce premier aperçu, le plan Essentiel à 69€ par mois surveille trois IA, le plan Pro à 149€ par mois ajoute deux IA supplémentaires ainsi qu&apos;un suivi d&apos;un concurrent, et le plan Agence à 349€ par mois permet de gérer jusqu&apos;à dix marques avec des rapports en marque blanche, pensé pour les agences et consultants qui accompagnent plusieurs clients.
      </p>
      <p>
        Que vous choisissiez de vérifier ces réponses vous-même une fois de temps en temps ou de mettre en place un contrôle régulier, l&apos;essentiel est de ne plus laisser cette question sans réponse. Ce que les IA racontent de votre entreprise circule déjà, avec ou sans votre regard dessus.
      </p>
    </>
  );
}
