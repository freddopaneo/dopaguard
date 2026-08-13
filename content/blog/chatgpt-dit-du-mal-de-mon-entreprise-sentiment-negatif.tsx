export default function ArticleBody() {
  return (
    <>
      <p>
        Un dirigeant tape, un soir ou entre deux rendez-vous, une question toute simple dans ChatGPT : &laquo; que
        penses-tu de [nom de son entreprise] ? &raquo;. Il ne s&apos;attend pas à grand-chose, peut-être une
        description neutre, quelques lignes factuelles. Mais la réponse qui s&apos;affiche a un ton qu&apos;il
        n&apos;avait pas anticipé : elle évoque des &laquo; problèmes récurrents &raquo;, cite un avis client
        mécontent comme s&apos;il résumait l&apos;expérience générale, ou termine par une phrase qui, sans le dire
        frontalement, laisse entendre qu&apos;un concurrent ferait tout aussi bien, voire mieux. Rien dans cette
        réponse n&apos;est une erreur grossière. Aucune adresse fausse, aucune fermeture inventée, aucun fait qui
        saute aux yeux comme manifestement erroné. Et c&apos;est précisément ce qui rend le moment déstabilisant :
        le dirigeant vient de découvrir, par lui-même, qu&apos;une IA parle de son entreprise avec un ton qui, à la
        place d&apos;un prospect, lui donnerait envie d&apos;aller voir ailleurs.
      </p>

      <h2 className="font-semibold text-dopaguard-navy">Un problème de ton, pas un fait à corriger</h2>
      <p>
        La plupart des anomalies que surveille Dopaguard se traitent comme des erreurs factuelles : une IA affirme
        quelque chose de faux, on peut le signaler, le documenter, parfois le corriger à la source. Le sentiment
        négatif isolé est d&apos;une autre nature, et c&apos;est ce qui le rend particulièrement inconfortable à
        traiter. Il n&apos;y a rien de &laquo; faux &raquo; à signaler formellement. L&apos;avis client négatif que
        l&apos;IA a repris existe peut-être réellement, l&apos;article de presse qu&apos;elle mentionne a peut-être
        bel et bien été publié. Le problème n&apos;est pas l&apos;exactitude d&apos;un fait isolé, c&apos;est la
        façon dont l&apos;IA a pondéré et interprété l&apos;ensemble des sources disponibles pour aboutir à une
        tonalité globale défavorable.
      </p>
      <p>
        Cette nuance change tout dans la manière d&apos;y répondre. Face à une fermeture annoncée à tort, on sait
        ce qu&apos;il faut corriger et où. Face à un ton défavorable, il n&apos;existe pas de bouton &laquo;
        rectifier &raquo; unique, parce que ce n&apos;est pas une donnée isolée qui a basculé, mais un équilibre
        entre plusieurs signaux, positifs et négatifs, que l&apos;IA a synthétisé à sa manière. C&apos;est un
        terrain plus flou, mais qui n&apos;en est pas moins réel pour autant : un prospect qui lit une réponse au
        ton dissuasif ne fait pas la différence entre une erreur factuelle et une question d&apos;interprétation,
        il retient simplement l&apos;impression générale qu&apos;on vient de lui donner de vous.
      </p>

      <h2 className="font-semibold text-dopaguard-navy">D&apos;où vient un ton défavorable</h2>
      <p>
        Sans qu&apos;il soit nécessaire d&apos;imaginer une quelconque malveillance ni un dérèglement du modèle,
        plusieurs mécanismes courants expliquent qu&apos;une IA formule une réponse au ton négatif sur une
        entreprise par ailleurs solide.
      </p>
      <ul className="list-disc pl-5">
        <li>
          Un avis client ancien et isolé, mais rédigé de façon détaillée et mémorable, peut être repris par l&apos;IA
          comme représentatif de l&apos;expérience générale, alors même qu&apos;il ne reflète qu&apos;un cas
          particulier survenu il y a longtemps et jamais reproduit depuis.
        </li>
        <li>
          Un article de presse négatif, même ponctuel ou déjà ancien, pèse parfois plus lourd dans la synthèse que
          l&apos;ensemble des retours positifs plus récents mais plus dispersés : un contenu bien rédigé et bien
          indexé a souvent plus de poids qu&apos;une multitude d&apos;avis positifs épars sur plusieurs
          plateformes.
        </li>
        <li>
          L&apos;absence de contenu positif récent pour contrebalancer. Quand rien de frais ne vient rééquilibrer la
          synthèse, un contenu ancien et défavorable reste la source la plus visible que l&apos;IA a sous la main,
          et elle s&apos;en sert par défaut.
        </li>
      </ul>
      <p>
        Dans les trois cas, l&apos;IA ne &laquo; ment &raquo; pas au sens strict : elle synthétise ce qu&apos;elle
        trouve, avec les biais de pondération qui sont les siens. Le résultat n&apos;en reste pas moins un ton qui,
        pour un prospect, agit exactement comme une mauvaise première impression.
      </p>

      <h2 className="font-semibold text-dopaguard-navy">Ne pas paniquer sur une seule réponse</h2>
      <p>
        La première chose à savoir, avant même de chercher une solution, c&apos;est qu&apos;une réponse isolée ne
        constitue pas une preuve. Le ton d&apos;une IA générative peut varier sensiblement d&apos;un modèle à
        l&apos;autre, et même d&apos;une reformulation à l&apos;autre au sein d&apos;un même modèle : &laquo; que
        penses-tu de mon entreprise &raquo; et &laquo; recommanderais-tu cette entreprise &raquo; peuvent produire
        deux réponses au ton sensiblement différent, posées le même jour au même outil. Un dirigeant qui découvre
        un ton défavorable dans une seule réponse, sous le coup de l&apos;émotion, a tendance à généraliser
        immédiatement ce qu&apos;il vient de lire à &laquo; ce que pensent les IA &raquo; de son entreprise, alors
        qu&apos;il n&apos;a en réalité observé qu&apos;un seul point de mesure parmi beaucoup d&apos;autres possibles.
      </p>
      <p>
        La bonne démarche consiste à vérifier si ce ton se confirme sur plusieurs IA et plusieurs formulations avant
        de le considérer comme un vrai signal. Si ChatGPT, Claude, Gemini et Perplexity convergent tous vers une
        appréciation mitigée, avec des reformulations différentes de la même question, c&apos;est un signal
        cohérent qui mérite qu&apos;on s&apos;y attarde. Si en revanche une seule IA, sur une seule formulation,
        produit un ton défavorable pendant que les autres restent neutres ou positives, il s&apos;agit probablement
        d&apos;un cas isolé plutôt que d&apos;une tendance de fond. C&apos;est tout l&apos;intérêt de comparer
        plusieurs IA plutôt que de se fier à une seule question posée à un seul outil : cela transforme une
        impression brute, potentiellement trompeuse, en un constat qu&apos;on peut réellement interpréter.
      </p>

      <h2 className="font-semibold text-dopaguard-navy">Voir en une fois si le signal se confirme</h2>
      <p>
        C&apos;est exactement ce que permet le scan gratuit proposé par Dopaguard : interroger plusieurs IA en une
        seule fois, en trois minutes, sans carte bancaire, pour savoir si le ton défavorable découvert en tapant
        une question dans ChatGPT se confirme ailleurs ou s&apos;il n&apos;était qu&apos;un cas isolé propre à ce
        modèle et à cette formulation précise. Plutôt que de rester avec une impression anxiogène née d&apos;une
        seule réponse, ce constat donne une vision d&apos;ensemble sur laquelle il devient possible de raisonner
        calmement.
      </p>
      <p>
        Et parce qu&apos;un ton favorable aujourd&apos;hui peut se dégrader dans quelques semaines, sans qu&apos;aucun
        événement particulier ne le déclenche visiblement de votre côté, la surveillance hebdomadaire de Dopaguard
        interroge régulièrement ChatGPT, Claude, Gemini, Perplexity et Mistral selon la formule choisie, et alerte
        si un ton négatif apparaît ou se répète d&apos;une semaine à l&apos;autre. L&apos;objectif n&apos;est pas de
        traquer chaque variation mineure d&apos;humeur d&apos;un modèle, mais de repérer le moment où une impression
        isolée devient une tendance installée, pour pouvoir agir avant qu&apos;elle ne s&apos;ancre durablement dans
        ce que les IA racontent de vous.
      </p>
    </>
  );
}
