export default function ArticleBody() {
  return (
    <>
      <p>
        Un client tape le nom de votre entreprise dans Perplexity avant de vous appeler. La réponse cite bien votre
        activité, votre secteur, presque tout semble juste, sauf un détail : l&apos;adresse mentionnée est celle d&apos;un
        établissement du même réseau situé à trois cents kilomètres, ou l&apos;avis négatif évoqué concerne en réalité
        une entreprise homonyme installée dans une autre ville, ou encore la structure décrite est celle qui existait
        avant un rachat survenu deux ans plus tôt. L&apos;IA n&apos;a rien inventé : chacune des informations citées est
        vraie quelque part. Simplement, elle ne s&apos;applique pas à vous. C&apos;est ce qu&apos;on appelle une
        confusion d&apos;entités, et c&apos;est un cas à part dans les erreurs que peut commettre une IA générative à
        propos d&apos;une entreprise : ni une pure invention, ni une simple approximation, mais un mélange entre deux
        réalités qui existent bel et bien, l&apos;une vous concernant, l&apos;autre non.
      </p>

      <h2 className="font-semibold text-dopaguard-navy">Un cas distinct de l&apos;hallucination et de l&apos;erreur factuelle simple</h2>
      <p>
        Il est utile de distinguer clairement ce phénomène des deux autres types d&apos;anomalies les plus courants.
        Une hallucination pure, c&apos;est quand une IA affirme un fait qui n&apos;existe nulle part : un service que
        vous n&apos;avez jamais proposé, un avis qui n&apos;a jamais été publié. Une erreur factuelle simple, c&apos;est
        une imprécision isolée sur une information vous concernant réellement : un horaire mal retranscrit, une
        fourchette de prix approximative. La confusion d&apos;entités est différente des deux : l&apos;information
        citée par l&apos;IA est exacte, vérifiable, et rattachée à une entité bien réelle. Le problème, c&apos;est que
        cette entité n&apos;est pas la vôtre. L&apos;IA a mélangé deux choses qui existent chacune séparément, sans
        qu&apos;aucune des deux ne soit fausse en elle-même.
      </p>

      <h2 className="font-semibold text-dopaguard-navy">Les trois cas de figure les plus fréquents</h2>
      <p>
        Cette confusion prend généralement l&apos;une de ces trois formes.
      </p>
      <ul className="list-disc pl-5">
        <li>
          <strong>L&apos;homonymie pure.</strong> Deux entreprises portent un nom identique ou très proche, parfois
          dans des secteurs d&apos;activité totalement différents, parfois dans des villes éloignées l&apos;une de
          l&apos;autre. Une IA qui ne dispose pas d&apos;un moyen fiable de distinguer les deux peut piocher une
          information appartenant à l&apos;homonyme et l&apos;attribuer à vous, ou inversement mélanger vos deux
          identités dans une même réponse.
        </li>
        <li>
          <strong>Le réseau ou la franchise.</strong> Vous faites partie d&apos;un réseau, d&apos;une franchise, d&apos;une
          enseigne présente dans plusieurs villes. L&apos;IA, qui a du mal à isoler les informations propres à chaque
          établissement, attribue à votre point de vente précis un horaire, un avis client, un problème signalé ou une
          caractéristique qui appartiennent en réalité à un autre établissement du même réseau. Le nom de l&apos;enseigne
          est le bon ; l&apos;établissement décrit ne l&apos;est pas.
        </li>
        <li>
          <strong>Le changement de structure.</strong> Un rachat, une fusion, un déménagement, un changement de nom :
          ces évolutions ne se propagent pas instantanément dans ce que les IA savent de vous. Le modèle continue de
          mélanger l&apos;ancienne structure et la nouvelle, en citant par exemple un ancien dirigeant, une ancienne
          adresse ou une ancienne raison sociale aux côtés d&apos;informations à jour, comme si les deux entités
          n&apos;en formaient toujours qu&apos;une.
        </li>
      </ul>

      <h2 className="font-semibold text-dopaguard-navy">Pourquoi c&apos;est particulièrement difficile à repérer soi-même</h2>
      <p>
        Une fermeture annoncée à tort saute aux yeux : l&apos;affirmation est claire, binaire, facile à identifier dès
        qu&apos;on lit la réponse. Une confusion d&apos;entités est d&apos;une tout autre nature. Elle se glisse souvent
        de façon discrète, au milieu d&apos;une réponse par ailleurs globalement correcte : le secteur d&apos;activité
        est le bon, le ton est cohérent, plusieurs détails concordent réellement avec votre entreprise. Un seul élément
        détonne, noyé dans un texte qui, à première lecture, semble juste. Pour un dirigeant qui parcourt rapidement une
        réponse d&apos;IA, ce genre de détail erroné passe facilement inaperçu, précisément parce qu&apos;il n&apos;est
        pas entouré d&apos;éléments manifestement faux qui alerteraient la vigilance. C&apos;est cette discrétion qui
        rend le risque insidieux : un client, lui, n&apos;a aucun moyen de savoir que cette adresse ou cet avis
        appartient en réalité à une autre entité, et il agit sur la base d&apos;une information qu&apos;il croit
        exacte.
      </p>

      <h2 className="font-semibold text-dopaguard-navy">Comment détecter ce type de confusion</h2>
      <p>
        Face à ce risque, la meilleure approche consiste à demander à l&apos;IA des précisions différenciantes sur
        votre entreprise, plutôt qu&apos;une description générale susceptible de rester correcte en surface.
      </p>
      <ul className="list-disc pl-5">
        <li>
          Demandez l&apos;adresse exacte de votre établissement, et pas seulement la ville ou le quartier : une
          confusion avec un autre établissement du même réseau se révèle souvent à ce niveau de détail.
        </li>
        <li>
          Demandez le nom du dirigeant ou du responsable de votre structure : c&apos;est l&apos;un des marqueurs les
          plus fiables pour distinguer une entreprise d&apos;une autre, notamment après un rachat ou un changement de
          structure.
        </li>
        <li>
          Demandez l&apos;année de création ou la date d&apos;un événement marquant, si cette information est
          pertinente pour votre activité : un mélange entre l&apos;ancienne et la nouvelle structure y apparaît souvent
          clairement.
        </li>
        <li>
          Comparez systématiquement chaque élément de la réponse à la réalité de votre entreprise précise, et pas
          seulement à l&apos;impression générale que la réponse est correcte : c&apos;est ce niveau de vérification,
          détail par détail, qui permet de repérer une confusion d&apos;entités plutôt que de la laisser passer.
        </li>
      </ul>
      <p>
        Reposer ces questions différenciantes sur plusieurs IA (ChatGPT, Claude, Gemini, Perplexity, Mistral) permet
        aussi de voir si la confusion se répète d&apos;un modèle à l&apos;autre ou si elle reste isolée à un seul
        outil, ce qui donne une première indication sur l&apos;ampleur réelle du problème.
      </p>

      <h2 className="font-semibold text-dopaguard-navy">Le rôle de la fiche de vérité dans ce type de détection</h2>
      <p>
        Chez Dopaguard, la fiche de vérité que vous validez sert précisément de référence pour ce genre de cas. Elle
        ne se limite pas à décrire votre activité en général : elle consigne les faits précis de votre structure —
        adresse exacte, dirigeant, éléments qui vous distinguent d&apos;un homonyme, d&apos;un autre établissement du
        même réseau ou d&apos;une ancienne structure avant rachat. C&apos;est cette précision qui permet, lors du
        jugement automatique de chaque réponse générée par les IA surveillées, de repérer un mélange d&apos;entités là
        où une lecture rapide n&apos;y verrait qu&apos;une réponse globalement correcte. Le scan gratuit de 3 minutes,
        sans carte bancaire, offre un premier repérage rapide de ce type d&apos;anomalie, avant qu&apos;une surveillance
        hebdomadaire via les formules Essentiel, Pro ou Agence ne prenne le relais pour vérifier, semaine après
        semaine, que chaque IA parle bien de vous, et de vous seul.
      </p>
    </>
  );
}
