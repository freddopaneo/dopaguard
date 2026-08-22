export default function ArticleBody() {
  return (
    <>
      <p>
        Un client demande à ChatGPT si votre cabinet propose telle prestation, Perplexity affirme un tarif qui n&apos;existe plus, Gemini attribue une spécialité à votre entreprise que vous n&apos;avez jamais revendiquée. Comment savoir, objectivement, que ces réponses posent problème ? La question paraît simple, mais elle cache un point aveugle que beaucoup d&apos;approches de surveillance de la réputation en IA ignorent : on ne peut pas repérer un écart si l&apos;on n&apos;a jamais défini, noir sur blanc, ce qui est vrai. C&apos;est exactement le rôle d&apos;une fiche de vérité entreprise.
      </p>

      <h2 className="font-semibold text-dopaguard-navy">Détecter une erreur suppose d&apos;avoir défini la vérité au préalable</h2>
      <p>
        Le mot « erreur » suppose un point de comparaison. Sans référence, une réponse d&apos;IA n&apos;est ni vraie ni fausse : elle est simplement une phrase de plus, qui semble plausible parce qu&apos;un modèle de langage l&apos;a formulée avec assurance. C&apos;est là que le bât blesse. Les IA génératives ne consultent pas une fiche officielle de votre entreprise avant de répondre : elles recomposent une réponse à partir de fragments trouvés sur le web, d&apos;anciennes pages indexées, d&apos;avis clients, de mentions tierces, parfois contradictoires ou obsolètes. Le résultat peut sonner juste tout en étant partiellement ou totalement faux.
      </p>
      <p>
        Une surveillance qui se contente de lire les réponses des IA sans grille de référence ne peut donc évaluer que la forme : le ton est-il positif, l&apos;entreprise est-elle citée, la réponse semble-t-elle cohérente. Elle ne peut pas dire si un tarif mentionné correspond à la réalité, si une prestation citée existe vraiment, ou si un concurrent est présenté à tort comme votre partenaire. Pour transformer une lecture impressionniste en vérification factuelle, il faut d&apos;abord écrire, de façon structurée, ce qui constitue la vérité sur votre entreprise. C&apos;est le principe même de la fiche de vérité : elle ne cherche pas à deviner ce qui est correct, elle le fixe en amont, une bonne fois, avec la personne la mieux placée pour le savoir — le dirigeant lui-même.
      </p>

      <h2 className="font-semibold text-dopaguard-navy">Ce que couvre une fiche de vérité entreprise</h2>
      <p>
        Pour qu&apos;une telle fiche serve réellement de base de comparaison, elle doit être suffisamment précise et concrète, sans pour autant devenir un document juridique interminable. Dans une démarche de suivi de la présence sur les IA, on retrouve généralement quelques catégories incontournables&nbsp;:
      </p>
      <ul className="list-disc pl-5">
        <li>Le statut et l&apos;activité réels de l&apos;entreprise : forme juridique, zone d&apos;intervention, ce qu&apos;elle fait précisément et ce qu&apos;elle ne fait pas.</li>
        <li>L&apos;offre et les services proposés, décrits avec assez de détail pour distinguer ce qui est inclus de ce qui ne l&apos;est pas.</li>
        <li>Les faits tarifaires : fourchettes de prix, modalités, éventuelles conditions, plutôt que des chiffres vagues sujets à interprétation.</li>
        <li>Les dirigeants et personnes clés, avec leur rôle exact, pour éviter les confusions de titre ou d&apos;identité.</li>
        <li>Les différenciateurs réels de l&apos;entreprise, ceux qui la distinguent effectivement, et non des formules marketing génériques.</li>
        <li>Les concurrents connus, pour repérer les cas où une IA confondrait l&apos;entreprise avec un acteur tiers ou attribuerait par erreur ses caractéristiques à un concurrent.</li>
        <li>Ce qui ne doit jamais être affirmé : promesses non tenues, certifications non obtenues, activités abandonnées, ou toute allégation qui exposerait l&apos;entreprise si une IA la répétait à un prospect.</li>
      </ul>
      <p>
        Ce dernier point mérite une attention particulière. Il ne s&apos;agit pas seulement de corriger des approximations, mais d&apos;identifier à l&apos;avance les affirmations qui, si elles étaient reprises par une IA face à un client potentiel, poseraient un problème réel : une promesse de délai irréaliste, une certification périmée, un service arrêté depuis longtemps mais encore mentionné sur d&apos;anciennes pages indexées. Lister ces interdits explicites donne à la vérification un objectif clair : repérer non seulement les erreurs factuelles, mais aussi les affirmations dangereuses.
      </p>

      <h2 className="font-semibold text-dopaguard-navy">Pourquoi une référence explicite vaut mieux qu&apos;une surveillance vague</h2>
      <p>
        Beaucoup d&apos;initiatives de suivi de l&apos;e-réputation se limitent à interroger périodiquement une IA et à lire le résultat « à l&apos;œil ». Cette approche a ses limites : elle repose sur la mémoire et le jugement ponctuel de la personne qui lit, elle ne garde pas de trace comparable d&apos;une semaine à l&apos;autre, et elle a tendance à ne remarquer que les erreurs les plus flagrantes, en laissant passer des glissements plus discrets — un tarif légèrement erroné, une nuance sur l&apos;offre, une confusion avec un concurrent proche.
      </p>
      <p>
        Disposer d&apos;informations exactes IA entreprise consignées quelque part change la nature de l&apos;exercice. Chaque réponse générée par ChatGPT, Claude, Gemini, Perplexity ou Mistral peut être confrontée point par point à la fiche de vérité, plutôt que jugée dans l&apos;absolu. On passe d&apos;une question floue — « est-ce que cette réponse a l&apos;air correcte ? » — à une question précise et vérifiable — « cette réponse contredit-elle tel fait validé, ou reprend-elle telle affirmation explicitement interdite ? ». C&apos;est cette bascule qui rend la démarche exploitable dans la durée, y compris pour quelqu&apos;un qui n&apos;a pas le temps de tout relire en détail chaque semaine.
      </p>

      <h2 className="font-semibold text-dopaguard-navy">Une fiche de vérité doit rester à jour pour garder son utilité</h2>
      <p>
        Ce mécanisme n&apos;a de valeur que si la référence elle-même reste fiable. Une entreprise évolue : nouveaux tarifs, nouvelle offre, arrivée ou départ d&apos;un associé, nouveau concurrent qui apparaît sur le marché. Une fiche de vérité figée au moment de l&apos;onboarding, jamais retouchée, devient progressivement un mauvais outil de comparaison : elle peut même finir par signaler comme anomalie une information qui est en réalité devenue exacte, ou à l&apos;inverse laisser passer un écart réel parce que la fiche elle-même est dépassée.
      </p>
      <p>
        Autrement dit, une fiche de vérité entreprise obsolète n&apos;est guère plus utile qu&apos;une absence de fiche : elle donne un faux sentiment de sécurité tout en produisant des comparaisons faussées. Maintenir cette fiche à jour n&apos;est donc pas une formalité administrative secondaire, c&apos;est une condition de fonctionnement de tout le dispositif de détection. C&apos;est pour cette raison qu&apos;un tel document doit pouvoir être révisé facilement dès qu&apos;un changement survient dans l&apos;entreprise, plutôt que rester un artefact figé du jour de la mise en place.
      </p>

      <h2 className="font-semibold text-dopaguard-navy">De la référence factuelle à une détection d&apos;anomalies concrète</h2>
      <p>
        C&apos;est en combinant ces deux éléments — une fiche de vérité précise et régulièrement tenue à jour, et une interrogation répétée des principales IA génératives — que la détection d&apos;anomalies devient réellement actionnable. Plutôt qu&apos;un rapport générique sur le ton des mentions ou leur fréquence, on obtient des alertes qui pointent un écart précis&nbsp;: tel prix cité ne correspond plus à la grille tarifaire validée, telle prestation évoquée n&apos;existe pas dans l&apos;offre réelle, tel dirigeant est mal identifié, ou pire, une affirmation explicitement classée comme interdite a été reprise par une IA dans une réponse destinée à un prospect.
      </p>
      <p>
        Cette logique — fiche de vérité validée par l&apos;entreprise dès l&apos;onboarding, puis interrogation hebdomadaire de plusieurs IA pour confronter leurs réponses à cette référence — déplace le travail de surveillance d&apos;une lecture subjective vers une comparaison factuelle. Elle permet de traiter chaque alerte pour ce qu&apos;elle est réellement : non pas une impression désagréable, mais un écart mesurable entre ce qu&apos;une IA affirme et ce que l&apos;entreprise a elle-même déclaré comme vrai.
      </p>

      <p>
        Au fond, la fiche de vérité n&apos;est qu&apos;une application d&apos;un principe assez simple : on ne corrige bien que ce que l&apos;on a d&apos;abord défini avec précision. Que l&apos;on adopte un outil dédié ou que l&apos;on construise sa propre grille en interne, prendre le temps de formaliser ce qui est vrai sur son entreprise reste le préalable indispensable à toute vérification sérieuse de ce que les IA en disent.
      </p>
    </>
  );
}
