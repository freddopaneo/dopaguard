// Conclusion du rapport de scan gratuit, adaptée aux vrais chiffres du visiteur.
// Un constat generique convainc mal : c'est le fait de lui renvoyer SES nombres
// ("11 reponses sur 15") qui rend la suite credible.
//
// Contrainte d'honnetete : ne promettre que ce que l'abonnement livre reellement
// -- reinterrogation hebdomadaire des memes questions, alerte quand une reponse
// change, score hebdomadaire. Le tableau de bord n'affiche pas aujourd'hui de
// courbe de visibilite distincte : ne rien laisser croire de tel ici.

interface ClosingPitchProps {
  reliability: number | null;
  visibility: number | null;
  unknownCount: number;
  usableCount: number;
}

interface Diagnosis {
  title: string;
  body: React.ReactNode;
  /** Passerelle vers Dopageo : uniquement quand le frein est la visibilité. */
  showDopageoBridge?: boolean;
}

function buildDiagnosis({ reliability, visibility, unknownCount, usableCount }: ClosingPitchProps): Diagnosis {
  const plural = unknownCount > 1;

  // Cas 1 : les IA ne connaissent pas l'entreprise. C'est le constat qui prime,
  // meme si la fiabilite est bonne -- on ne peut pas etre mal cite si on n'est
  // jamais cite.
  if (visibility !== null && visibility < 50) {
    return {
      title: "Le problème n'est pas ce que les IA disent de vous. C'est qu'elles ne vous connaissent pas.",
      body: (
        <>
          Sur les {usableCount} réponses analysées, {unknownCount} montre{plural ? "nt" : ""} une IA qui admet ne pas
          avoir d&apos;information fiable sur vous. Concrètement : quand un futur client demande une recommandation
          dans votre domaine, votre nom ne sort pas. Ce n&apos;est pas une faute de votre part — mais la place que vous
          n&apos;occupez pas, quelqu&apos;un d&apos;autre l&apos;occupe.
        </>
      ),
      // Constater l'invisibilite releve de la surveillance (Dopaguard) ; la corriger
      // releve de l'optimisation (Dopageo). On oriente sans sortir de notre role.
      showDopageoBridge: true,
    };
  }

  // Cas 2 : les IA parlent de l'entreprise, mais se trompent.
  if (reliability !== null && reliability < 80) {
    return {
      title: "Les IA parlent de vous — et une partie de ce qu'elles disent est à corriger.",
      body: (
        <>
          Les écarts détectés plus haut ne sont pas des détails : ce sont les phrases exactes que lit un client
          potentiel avant de vous contacter. Une information fausse ne se corrige pas toute seule, et personne ne vous
          préviendra qu&apos;elle circule.
        </>
      ),
    };
  }

  // Cas 3 : tout va bien aujourd'hui -- l'argument devient la volatilite.
  return {
    title: "Aujourd'hui, tout va bien. C'est précisément le moment où l'on cesse de regarder.",
    body: (
      <>
        Ce résultat est une bonne nouvelle — mais il décrit aujourd&apos;hui, pas le mois prochain. Un avis client, un
        article, une mise à jour de modèle, un concurrent qui soigne sa présence : il suffit d&apos;un de ces
        changements pour que la réponse ne soit plus la même.
      </>
    ),
  };
}

export function ScanClosingPitch(props: ClosingPitchProps) {
  const { title, body, showDopageoBridge } = buildDiagnosis(props);

  return (
    <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl bg-dopaguard-navy p-10 text-center">
      <h2 className="max-w-xl text-2xl font-bold text-white sm:text-3xl">{title}</h2>

      <p className="max-w-lg text-sm leading-relaxed text-white/70">{body}</p>

      <p className="max-w-lg text-sm font-medium leading-relaxed text-white">
        Ce que vous venez de voir est une photo, prise aujourd&apos;hui. Dopaguard repose ces mêmes questions chaque
        semaine, à 3 à 5 IA selon votre formule, et vous alerte dès qu&apos;une réponse change — en bien comme en mal.
      </p>

      <a
        href="/#tarifs"
        className="mt-2 rounded-lg bg-dopaguard-lime px-6 py-3.5 text-sm font-semibold text-dopaguard-navy transition-all hover:brightness-95"
      >
        Démarrer l&apos;essai de 14 jours →
      </a>
      <p className="text-xs text-white/40">Sans engagement, résiliable en un clic.</p>

      {showDopageoBridge && (
        <p className="mt-5 max-w-lg border-t border-white/10 pt-5 text-xs leading-relaxed text-white/50">
          Dopaguard surveille ce que les IA disent de vous. Pour travailler la cause — être mieux identifié et
          recommandé par ces mêmes IA —, c&apos;est le métier de{" "}
          <a
            href="https://dopageo.ai"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-dopaguard-lime underline underline-offset-2"
          >
            Dopageo
          </a>
          , notre solution dédiée au positionnement.
        </p>
      )}
    </div>
  );
}
